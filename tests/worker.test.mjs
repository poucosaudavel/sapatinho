// Testes locais da API (sem rede, sem Brevo, sem Cloudflare). Correr: node --test tests/
import { test } from "node:test";
import assert from "node:assert/strict";
import worker, { create, confirm, encode, sign } from "../worker/worker.js";

function setup() {
  const store = new Map();
  const sent = [];
  let failNext = false;
  globalThis.fetch = async (_u, o) => {
    if (failNext) { failNext = false; return new Response("{}", { status: 500 }); }
    sent.push(JSON.parse(o.body));
    return new Response('{"messageId":"x"}', { status: 201 });
  };
  const env = {
    BREVO_API_KEY: "chave-de-teste-".repeat(3),
    STATS_TOKEN: "senha-do-painel",
    STATS: {
      get: async (k, t) => { const v = store.get(k); return v == null ? null : t === "json" ? JSON.parse(v) : v; },
      put: async (k, v) => { store.set(k, v); },
      delete: async (k) => { store.delete(k); },
      list: async ({ prefix }) => ({ keys: [...store.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })) }),
    },
  };
  return { store, sent, env, failNext: () => { failNext = true; } };
}

const O = { Origin: "https://sapatinho-natal.pt" };
let ipN = 0;
const req = (path, body, h = {}) => new Request("https://sapatinho-natal.pt" + path, {
  method: "POST",
  headers: { "Content-Type": "application/json", "CF-Connecting-IP": "10.0.0." + (ipN++ % 250), ...h },
  body: JSON.stringify(body),
});
const people = (names) => names.map((n, i) => ({ n, e: `p${i}@exemplo.pt` }));

test("sorteio normal: 3 convites, links assinados, email cifrado", async () => {
  const { env, sent } = setup();
  const r = await worker.fetch(req("/api/create", { g: "Família Silva", l: 20, people: people(["Ana", "Rui", "Eva"]) }, O), env);
  assert.equal(r.status, 200);
  const j = await r.json();
  assert.equal(j.links.length, 3);
  assert.equal(sent.length, 3);
  for (const x of j.links) {
    assert.match(x.link, /\/r\/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
    assert.ok(!decodeURIComponent(x.link).includes("@"), "o email não pode ir legível no link");
  }
});

test("pedidos sem Origin do site são recusados", async () => {
  const { env } = setup();
  const r = await worker.fetch(req("/api/create", { g: "Natal", people: people(["A", "B", "C"]) }), env);
  assert.equal(r.status, 403);
});

test("nomes e grupo: aceita nomes reais, recusa sites, emails e telefones", async () => {
  const { env } = setup();
  for (const [g, n] of [["Natal da Família 2026 🎄", ["Inês", "João Pedro", "D'Artagnan"]], ["Escritório 3ºA", ["Ana M. Silva", "Zé-Manel", "Mãe ❤️"]], ["Amigos", ["constructor", "toString", "Ana"]]]) {
    const r = await create({ g, people: people(n) }, env, req("/", {}));
    assert.ok(r.ok, g);
  }
  const bad = [["premio.online", ["A", "B", "C"]], ["Natal", ["bit.ly/abc", "B", "C"]], ["Natal", ["EVIL.RU", "B", "C"]], ["xn--80ak6aa92e.ru", ["A", "B", "C"]], ["Natal", ["evil。com", "B", "C"]], ["Liga 912 345 678", ["A", "B", "C"]], ["Natal", ["__proto__", "B", "C"]], ["Natal", ["a@b", "B", "C"]]];
  for (const [g, n] of bad) {
    await assert.rejects(create({ g, people: people(n) }, env, req("/", {})), (e) => e.status === 400, `${g} / ${n[0]}`);
  }
});

test("limite de 10 sorteios por IP por dia", async () => {
  const { env } = setup();
  let last;
  for (let i = 0; i < 11; i++) last = await worker.fetch(req("/api/create", { g: "G" + i, people: people(["A", "B", "C"]) }, { ...O, "CF-Connecting-IP": "9.9.9.9" }), env);
  assert.equal(last.status, 429);
});

test("segundo email: uma vez por link em 12 h; uma falha do Brevo não bloqueia nova tentativa", async () => {
  const s = setup();
  const r = await create({ g: "Teste", people: people(["A", "B", "C"]) }, s.env, req("/", {}));
  const code = r.links[0].link.split("/r/")[1];
  s.sent.length = 0;
  s.failNext();
  await assert.rejects(confirm({ code }, s.env));
  await confirm({ code }, s.env);
  await confirm({ code }, s.env);
  assert.equal(s.sent.length, 1);
});

test("links antigos com email em claro (campo e) continuam a funcionar", async () => {
  const s = setup();
  const code = await sign(encode({ v: 2, g: "Antigo", l: 10, d: null, n: "Ana", t: "Rui", p: ["Ana", "Rui", "Eva"], e: "ana@exemplo.pt" }), s.env);
  await confirm({ code }, s.env);
  assert.equal(s.sent[0].to[0].email, "ana@exemplo.pt");
});

test("links adulterados são recusados", async () => {
  const s = setup();
  const r = await create({ g: "Teste", people: people(["A", "B", "C"]) }, s.env, req("/", {}));
  const code = r.links[0].link.split("/r/")[1];
  const [enc, sig] = code.split(".");
  await assert.rejects(confirm({ code: enc.slice(0, -2) + "AA." + sig }, s.env));
  await assert.rejects(confirm({ code: enc }, s.env));
});

test("painel: só com a senha certa", async () => {
  const { env } = setup();
  const get = (h) => worker.fetch(new Request("https://sapatinho-natal.pt/api/stats", { headers: h }), env);
  assert.equal((await get({ Authorization: "Bearer errada" })).status, 401);
  assert.equal((await get({ Authorization: "Bearer senha-do-painel" })).status, 200);
});

test("segundo email: 3 ideias dentro do limite, com link para o site e nunca para lojas", async () => {
  for (const [l, label] of [[3, "até 5 €"], [12, "até 10 €"], [25, "até 20 €"], [null, "de prendas"]]) {
    const s = setup();
    const code = await sign(encode({ v: 2, g: "G", l, d: null, n: "Ana", t: "Rui", p: ["Ana", "Rui", "Eva"], e: "a@exemplo.pt" }), s.env);
    await confirm({ code }, s.env);
    const html = s.sent[0].htmlContent;
    assert.ok(html.includes("Três ideias " + label), `${l}: ${label}`);
    assert.equal((html.match(/<li /g) || []).length, 3);
    assert.ok(!/amazon|tag=/i.test(html), "sem links de lojas no email");
  }
});
