// Sapatinho API — Cloudflare Worker
// Routes (mounted at sapatinho-natal.pt/api/*):
//   POST /api/create   { g, l, d, people:[{n,e}], pairs:[[a,b]] } -> draws, emails invites, returns links
//   POST /api/confirm  { code }                                    -> emails the participant their result
// Secret required: BREVO_API_KEY (Settings -> Variables and Secrets)

const SITE = "https://sapatinho-natal.pt";
const SENDER = { name: "Sapatinho", email: "sorteio@sapatinho-natal.pt" };
const REPLY_TO = { name: "Sapatinho", email: "ajuda@sapatinho-natal.pt" };
const MAX_PEOPLE = 30;
const ALLOWED_ORIGINS = [SITE, "https://www.sapatinho-natal.pt", "https://sapatinho-natal.pages.dev"];
const MESES = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const origin = req.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : SITE,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json; charset=utf-8" } });

    if (req.method !== "POST") return json({ error: "Método não permitido." }, 405);
    if (origin && !ALLOWED_ORIGINS.includes(origin)) return json({ error: "Origem não permitida." }, 403);
    if (!env.BREVO_API_KEY) return json({ error: "O envio de emails ainda não está configurado." }, 503);

    let body;
    try { body = await req.json(); } catch { return json({ error: "Pedido inválido." }, 400); }

    try {
      if (url.pathname.endsWith("/api/create")) return json(await create(body, env));
      if (url.pathname.endsWith("/api/confirm")) return json(await confirm(body, env));
      return json({ error: "Não encontrado." }, 404);
    } catch (e) {
      return json({ error: e.userMessage || "Ocorreu um erro. Tenta outra vez daqui a pouco." }, e.status || 500);
    }
  },
};

function fail(msg, status = 400) { const e = new Error(msg); e.userMessage = msg; e.status = status; return e; }
const clean = (s, max) => String(s ?? "").replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
const isEmail = (e) => /^[^\s@<>()",;:]{1,64}@[A-Za-z0-9.-]{1,253}\.[A-Za-z]{2,}$/.test(e);

/* ---------- create ---------- */
async function create(b, env) {
  const g = clean(b.g, 60) || "Amigo secreto";
  let l = parseInt(b.l, 10); l = l > 0 && l <= 1000 ? l : null;
  const d = /^\d{4}-\d{2}-\d{2}$/.test(b.d || "") ? b.d : null;
  const people = Array.isArray(b.people) ? b.people : [];
  if (people.length < 3) throw fail("Precisas de pelo menos 3 participantes.");
  if (people.length > MAX_PEOPLE) throw fail(`O máximo é ${MAX_PEOPLE} participantes.`);

  const ps = people.map((p) => ({ n: clean(p.n, 30), e: clean(p.e, 120).toLowerCase() }));
  const seen = new Set(), seenE = new Set();
  for (const p of ps) {
    if (!p.n) throw fail("Há participantes sem nome.");
    if (!isEmail(p.e)) throw fail(`O email de ${p.n} não parece válido.`);
    const k = p.n.toLowerCase();
    if (seen.has(k)) throw fail(`Há nomes repetidos: ${p.n}.`);
    if (seenE.has(p.e)) throw fail(`O email ${p.e} aparece mais do que uma vez.`);
    seen.add(k); seenE.add(p.e);
  }
  const names = ps.map((p) => p.n);
  const blocked = {};
  for (const pair of Array.isArray(b.pairs) ? b.pairs.slice(0, 40) : []) {
    const [a, c] = [clean(pair?.[0], 30), clean(pair?.[1], 30)];
    if (names.includes(a) && names.includes(c) && a !== c) {
      (blocked[a] ||= new Set()).add(c); (blocked[c] ||= new Set()).add(a);
    }
  }
  const m = draw(names, blocked);
  if (!m) throw fail("Com estas restrições não há forma de fazer o sorteio. Remove um dos pares ou junta mais pessoas.");

  const links = [];
  for (const p of ps) {
    const code = await sign(encode({ v: 2, g, l, d, n: p.n, t: m[p.n], p: names, e: p.e }), env);
    links.push({ n: p.n, e: p.e, link: `${SITE}/r/${code}` });
  }

  const messages = links.map((x) => ({
    to: [{ email: x.e, name: x.n }],
    subject: `${x.n}, estás no amigo secreto «${g}»`,
    htmlContent: inviteHtml({ n: x.n, g, l, d, link: x.link, count: names.length }),
    textContent: inviteText({ n: x.n, g, l, d, link: x.link }),
  }));
  await sendBatch(messages, env);
  return { ok: true, links };
}

/* ---------- confirm ---------- */
async function confirm(b, env) {
  const code = String(b.code || "");
  const o = await verify(code, env);
  if (!o || !o.e) throw fail("Link inválido.", 400);
  await sendBatch([{
    to: [{ email: o.e, name: o.n }],
    subject: `${o.n}, já sabes quem te saiu · ${o.g}`,
    htmlContent: confirmHtml(o, `${SITE}/r/${code}`),
    textContent: confirmText(o, `${SITE}/r/${code}`),
  }], env);
  return { ok: true };
}

/* ---------- draw ---------- */
function rnd(n) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
function draw(names, blocked) {
  for (let attempt = 0; attempt < 5000; attempt++) {
    const r = names.slice();
    for (let i = r.length - 1; i > 0; i--) { const j = rnd(i + 1); [r[i], r[j]] = [r[j], r[i]]; }
    if (names.every((g, i) => g !== r[i] && !(blocked[g] && blocked[g].has(r[i])))) {
      const m = {}; names.forEach((g, i) => (m[g] = r[i])); return m;
    }
  }
  return null;
}

/* ---------- encoding (must match /sapatinho.js) ---------- */
function toB64url(bytes) { let s = ""; for (const b of bytes) s += String.fromCharCode(b); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
function fromB64url(str) { str = str.replace(/-/g, "+").replace(/_/g, "/"); while (str.length % 4) str += "="; const s = atob(str); return Uint8Array.from(s, (c) => c.charCodeAt(0)); }
function encode(obj) {
  const data = new TextEncoder().encode(JSON.stringify(obj));
  const key = new Uint8Array(6); crypto.getRandomValues(key);
  const out = new Uint8Array(6 + data.length); out.set(key, 0);
  for (let i = 0; i < data.length; i++) out[6 + i] = data[i] ^ key[i % 6] ^ ((i * 31) & 255);
  return toB64url(out);
}
function decode(str) {
  try {
    const b = fromB64url(str); const key = b.slice(0, 6), data = b.slice(6), out = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) out[i] = data[i] ^ key[i % 6] ^ ((i * 31) & 255);
    const o = JSON.parse(new TextDecoder().decode(out));
    return o && o.v === 2 ? o : null;
  } catch { return null; }
}
async function hmacKey(env) {
  return crypto.subtle.importKey("raw", new TextEncoder().encode("sapatinho:" + env.BREVO_API_KEY), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
async function sign(enc, env) {
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(env), new TextEncoder().encode(enc));
  return enc + "." + toB64url(new Uint8Array(sig).slice(0, 12));
}
async function verify(code, env) {
  const [enc, sig] = code.split(".");
  if (!enc || !sig || code.length > 4000) return null;
  const expect = await sign(enc, env);
  if (expect !== code) return null;
  return decode(enc);
}

/* ---------- Brevo ---------- */
async function sendBatch(messages, env) {
  for (const msg of messages) {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ sender: SENDER, replyTo: REPLY_TO, ...msg }),
    });
    if (!res.ok) throw fail("Não foi possível enviar os emails agora. Tenta outra vez daqui a pouco.", 502);
  }
}

/* ---------- email templates ---------- */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmtDate = (iso) => { if (!iso) return ""; const [, mo, da] = iso.split("-"); return `${parseInt(da, 10)} de ${MESES[parseInt(mo, 10) - 1]}`; };
function frame(inner) {
  return `<!doctype html><html lang="pt-PT"><body style="margin:0;background:#0f2a22;padding:32px 12px;font-family:Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px">
<tr><td style="padding:0 4px 18px;font-family:Georgia,serif;font-size:26px;color:#f7f1e6">Sapatinho<span style="color:#d9a441">.</span></td></tr>
<tr><td style="background:#f7f1e6;border-radius:6px;border-top:6px solid #c8452c;padding:30px 28px;color:#1d2a25;font-size:16px;line-height:1.55">${inner}</td></tr>
<tr><td style="padding:18px 4px 0;font-size:12px;color:#8fa59a">Recebeste este email porque alguém te incluiu num amigo secreto em sapatinho-natal.pt. Dúvidas: responde a este email.</td></tr>
</table></td></tr></table></body></html>`;
}
const details = (l, d) => [l ? `Limite da prenda: <b>${l} €</b>` : "", d ? `Troca de prendas: <b>${esc(fmtDate(d))}</b>` : ""].filter(Boolean).join("<br>");
function button(href, label) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0"><tr><td style="background:#c8452c;border-radius:4px"><a href="${esc(href)}" style="display:inline-block;padding:14px 22px;color:#ffffff;text-decoration:none;font-weight:bold">${esc(label)}</a></td></tr></table>`;
}
function inviteHtml({ n, g, l, d, link, count }) {
  return frame(`<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#5f6d66;font-weight:bold">${esc(g)}</div>
<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:28px;line-height:1.15;margin:8px 0 14px">Olá, ${esc(n)}! Está na hora de sortear.</h1>
<p style="margin:0 0 10px">Estás no amigo secreto <b>${esc(g)}</b>, com ${count} participantes. Carrega no botão para descobrires quem te saiu.</p>
<p style="margin:0">${details(l, d)}</p>
${button(link, "Sortear o meu amigo secreto")}
<p style="margin:0;font-size:13px;color:#5f6d66">Este link é só teu. Não o reencaminhes a ninguém. Depois de sortear, enviamos-te outro email com o nome, para confirmares sempre que quiseres.</p>`);
}
function inviteText({ n, g, l, d, link }) {
  return `Olá, ${n}!\n\nEstás no amigo secreto «${g}».${l ? `\nLimite da prenda: ${l} €.` : ""}${d ? `\nTroca de prendas: ${fmtDate(d)}.` : ""}\n\nAbre o teu link pessoal para sortear:\n${link}\n\nEste link é só teu. Não o reencaminhes.\n\nSapatinho · sapatinho-natal.pt`;
}
function confirmHtml(o, link) {
  return frame(`<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#5f6d66;font-weight:bold">${esc(o.g)}</div>
<p style="margin:10px 0 4px">${esc(o.n)}, o teu amigo secreto é</p>
<div style="font-family:Georgia,serif;font-size:40px;line-height:1.1;color:#c8452c;margin:0 0 16px">${esc(o.t)}</div>
<p style="margin:0">${details(o.l, o.d)}</p>
${button(link, "Ver o meu sorteio")}
<p style="margin:0;font-size:13px;color:#5f6d66">Guarda segredo! Guarda este email para confirmares quando precisares.</p>`);
}
function confirmText(o, link) {
  return `${o.n}, o teu amigo secreto é: ${o.t}\n\nGrupo: ${o.g}${o.l ? `\nLimite da prenda: ${o.l} €` : ""}${o.d ? `\nTroca de prendas: ${fmtDate(o.d)}` : ""}\n\nVer o teu sorteio: ${link}\n\nGuarda segredo!\n\nSapatinho · sapatinho-natal.pt`;
}

export { create, confirm, encode, decode, sign, verify, draw };
