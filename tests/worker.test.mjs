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
  const ok = await get({ Authorization: "Bearer senha-do-painel" });
  assert.equal(ok.status, 200);
  assert.equal((await ok.json()).oficina, null);
  await env.STATS.put("oficina", JSON.stringify({ agentes: { seo: { estado: "trabalhar" } } }));
  assert.equal((await (await get({ Authorization: "Bearer senha-do-painel" })).json()).oficina.agentes.seo.estado, "trabalhar");
  const bad = await (await get({ Authorization: "Bearer errada" })).json();
  assert.equal(bad.oficina, undefined);
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

const mail30 = (k) => Array.from({ length: 30 }, (_, i) => ({ n: "P" + k + "x" + i, e: `p${k}x${i}@exemplo.pt` }));

test("um só IP não esgota a quota do site: no máximo 90 convites por dia", async () => {
  const { env } = setup();
  const ip = { ...O, "CF-Connecting-IP": "7.7.7.7" };
  for (let i = 0; i < 3; i++) assert.equal((await worker.fetch(req("/api/create", { g: "G" + i, people: mail30(i) }, ip), env)).status, 200);
  assert.equal((await worker.fetch(req("/api/create", { g: "G9", people: people(["A", "B", "C"]) }, ip), env)).status, 429);
  // outra pessoa continua a conseguir criar
  assert.equal((await worker.fetch(req("/api/create", { g: "Outro", people: people(["A", "B", "C"]) }, { ...O, "CF-Connecting-IP": "8.8.8.8" }), env)).status, 200);
});

test("sorteio impossível não gasta quota nem limite do IP", async () => {
  const { env, store } = setup();
  const r = await worker.fetch(req("/api/create", { g: "G", people: people(["A", "B", "C"]), pairs: [["A", "B"], ["A", "C"]] }, O), env);
  assert.equal(r.status, 400);
  assert.equal([...store.keys()].filter((k) => k.startsWith("q:") || k.startsWith("ip2:")).length, 0);
});

test("segundos emails têm contador próprio e não bloqueiam a criação de sorteios", async () => {
  const s = setup();
  const day = new Date().toISOString().slice(0, 10);
  await s.env.STATS.put("qc:" + day, "55");
  const code = await sign(encode({ v: 2, g: "G", l: 10, d: null, n: "Ana", t: "Rui", p: ["Ana", "Rui", "Eva"], e: "a@exemplo.pt" }), s.env);
  await assert.rejects(confirm({ code }, s.env, req("/", {})), (e) => e.status === 429);
  const r = await worker.fetch(req("/api/create", { g: "Novo", people: people(["A", "B", "C"]) }, O), s.env);
  assert.equal(r.status, 200);
});

test("segundos emails: no máximo 20 por IP por dia", async () => {
  const s = setup();
  const ip = { "CF-Connecting-IP": "6.6.6.6" };
  for (let i = 0; i < 20; i++) {
    const code = await sign(encode({ v: 2, g: "G", l: 10, d: null, n: "Ana" + i, t: "Rui", p: ["Ana", "Rui", "Eva"], e: `a${i}@exemplo.pt` }), s.env);
    await confirm({ code }, s.env, req("/", {}, ip));
  }
  const code = await sign(encode({ v: 2, g: "G", l: 10, d: null, n: "Zé", t: "Rui", p: ["Zé", "Rui", "Eva"], e: "z@exemplo.pt" }), s.env);
  await assert.rejects(confirm({ code }, s.env, req("/", {}, ip)), (e) => e.status === 429);
  await confirm({ code }, s.env, req("/", {}, { "CF-Connecting-IP": "5.5.5.5" }));
});

test("LINK_SECRET: links novos com a chave própria; links antigos (chave do Brevo) continuam a funcionar", async () => {
  const antigo = setup();
  const r1 = await create({ g: "Antes", people: people(["A", "B", "C"]) }, antigo.env, req("/", {}));
  const codeAntigo = r1.links[0].link.split("/r/")[1];
  // o mesmo worker, agora com LINK_SECRET
  const s = setup();
  s.env.LINK_SECRET = "segredo-dos-links-de-teste";
  await confirm({ code: codeAntigo }, s.env, req("/", {}));
  assert.equal(s.sent.length, 1, "link antigo continua a enviar o segundo email");
  assert.equal(s.sent[0].to[0].email, "p0@exemplo.pt");
  const r2 = await create({ g: "Depois", people: people(["A", "B", "C"]) }, s.env, req("/", {}));
  const codeNovo = r2.links[1].link.split("/r/")[1];
  await confirm({ code: codeNovo }, s.env, req("/", {}));
  assert.equal(s.sent.at(-1).to[0].email, "p1@exemplo.pt");
  // um link novo não é aceite só com a chave do Brevo (prova que usa a chave própria)
  await assert.rejects(confirm({ code: codeNovo }, antigo.env, req("/", {})));
  // com LINK_SECRET errado, o link novo é recusado
  const outro = setup(); outro.env.LINK_SECRET = "outro";
  await assert.rejects(confirm({ code: codeNovo }, outro.env, req("/", {})));
});

test("chave dos links guardada no KV (cfg:link_secret) funciona como LINK_SECRET", async () => {
  const antigo = setup();
  const r1 = await create({ g: "Antes", people: people(["A", "B", "C"]) }, antigo.env, req("/", {}));
  const codeAntigo = r1.links[0].link.split("/r/")[1];
  const s = setup();
  await s.env.STATS.put("cfg:link_secret", "x".repeat(40));
  await confirm({ code: codeAntigo }, s.env, req("/", {}));
  assert.equal(s.sent.at(-1).to[0].email, "p0@exemplo.pt");
  const r2 = await create({ g: "Depois", people: people(["A", "B", "C"]) }, s.env, req("/", {}));
  const codeNovo = r2.links[2].link.split("/r/")[1];
  await confirm({ code: codeNovo }, s.env, req("/", {}));
  assert.equal(s.sent.at(-1).to[0].email, "p2@exemplo.pt");
  await assert.rejects(confirm({ code: codeNovo }, antigo.env, req("/", {})));
});
