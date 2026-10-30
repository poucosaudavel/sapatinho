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

    if (req.method === "GET" && url.pathname.endsWith("/api/stats")) return stats(req, env, json);
    if (req.method !== "POST") return json({ error: "Método não permitido." }, 405);
    // Só o próprio site pode criar sorteios ou pedir emails (pedidos sem Origin são recusados).
    if (!ALLOWED_ORIGINS.includes(origin)) return json({ error: "Origem não permitida." }, 403);
    if (!env.BREVO_API_KEY) return json({ error: "O envio de emails ainda não está configurado." }, 503);

    let body;
    try { body = await req.json(); } catch { return json({ error: "Pedido inválido." }, 400); }

    try {
      if (url.pathname.endsWith("/api/create")) return json(await create(body, env, req));
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
async function create(b, env, req) {
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
  if (hasLink(g) || ps.some((p) => hasLink(p.n))) throw fail("O nome do grupo e os nomes não podem ter endereços de sites.");
  for (const p of ps) if (!nameOk(p.n)) throw fail(`O nome «${p.n}» só pode ter letras, números, espaços, hífens e apóstrofos.`);
  if (!groupOk(g)) throw fail("O nome do grupo só pode ter letras, números, espaços e pontuação simples (sem endereços de sites, emails ou telefones).");
  const names = ps.map((p) => p.n);
  await guardCreate(env, req, names.length);
  const blocked = Object.create(null);
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
    const code = await sign(encode({ v: 2, g, l, d, n: p.n, t: m[p.n], p: names, x: await sealEmail(p.e, env) }), env);
    links.push({ n: p.n, e: p.e, link: `${SITE}/r/${code}` });
  }

  const messages = links.map((x) => ({
    to: [{ email: x.e, name: x.n }],
    subject: `${x.n}, estás no amigo secreto «${g}»`,
    htmlContent: inviteHtml({ n: x.n, g, l, d, link: x.link, count: names.length }),
    textContent: inviteText({ n: x.n, g, l, d, link: x.link }),
  }));
  await sendBatch(messages, env);
  await count(env, { emails: names.length, sorteios: 1, convites: names.length, ["limite_" + bucket(l)]: 1, ["grupo_" + size(names.length)]: 1, ["exclusoes_" + (Object.keys(blocked).length ? "sim" : "nao")]: 1 });
  return { ok: true, links };
}

/* ---------- confirm ---------- */
async function confirm(b, env) {
  const code = String(b.code || "");
  const o = await verify(code, env);
  if (!o || !(o.x || o.e)) throw fail("Link inválido.", 400);
  // o.x = email cifrado (links novos); o.e = email em claro (links criados antes de 29 out 2026)
  const email = o.x ? await openEmail(o.x, env) : o.e;
  if (!email) throw fail("Link inválido.", 400);
  // O mesmo link só pede o segundo email uma vez em cada 12 horas (evita encher a caixa de alguém).
  const mark = env.STATS ? "c:" + (await tag("confirm:" + code, env)) : null;
  if (mark && (await env.STATS.get(mark))) return { ok: true };
  await reserve(env, 1, CONFIRM_CAP);
  if (mark) { try { await env.STATS.put(mark, "1", { expirationTtl: 43200 }); } catch {} }
  try {
  await sendBatch([{
    to: [{ email, name: o.n }],
    subject: `${o.n}, já sabes quem te saiu · ${o.g}`,
    htmlContent: confirmHtml(o, `${SITE}/r/${code}`),
    textContent: confirmText(o, `${SITE}/r/${code}`),
  }], env);
  } catch (e) { if (mark) { try { await env.STATS.delete(mark); } catch {} } throw e; }
  await count(env, { emails: 1, sorteados: 1 });
  return { ok: true };
}

/* ---------- draw ---------- */
function rnd(n) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
function draw(names, blocked) {
  for (let attempt = 0; attempt < 5000; attempt++) {
    const r = names.slice();
    for (let i = r.length - 1; i > 0; i--) { const j = rnd(i + 1); [r[i], r[j]] = [r[j], r[i]]; }
    if (names.every((g, i) => g !== r[i] && !(blocked[g] && blocked[g].has(r[i])))) {
      const m = Object.create(null); names.forEach((g, i) => (m[g] = r[i])); return m;
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

/* ---------- email cifrado dentro do link (AES-GCM) ----------
   O email só serve para enviar o segundo email. Vai cifrado no próprio link:
   só este servidor o consegue ler, e não fica guardado em lado nenhum. */
async function emailKey(env) {
  const raw = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("sapatinho-email:" + env.BREVO_API_KEY));
  return crypto.subtle.importKey("raw", raw, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}
async function sealEmail(email, env) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await emailKey(env), new TextEncoder().encode(email)));
  const out = new Uint8Array(12 + ct.length); out.set(iv, 0); out.set(ct, 12);
  return toB64url(out);
}
async function openEmail(sealed, env) {
  try {
    const b = fromB64url(sealed);
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b.slice(0, 12) }, await emailKey(env), b.slice(12));
    return new TextDecoder().decode(pt);
  } catch { return null; }
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
<p style="margin:0;font-size:13px;color:#5f6d66">Guarda segredo! Guarda este email para confirmares quando precisares.</p>
<div style="margin:24px 0 0;padding:16px 18px;background:#efe6d4;border-radius:4px">
<div style="font-family:Georgia,serif;font-size:19px;margin:0 0 6px">Sem ideias para a prenda?</div>
<p style="margin:0 0 8px;font-size:14px">Juntámos sugestões ${o.l ? `até ${esc(o.l)} €` : "por preço"} e por tipo de pessoa.</p>
<a href="${esc(ideasUrl(o.l))}" style="color:#c8452c;font-weight:bold;font-size:14px">Ver ideias de prendas →</a>
</div>`);
}
function ideasUrl(l) {
  const n = parseFloat(l) || 0;
  const tier = !n ? "" : n <= 5 ? "#ate-5" : n <= 10 ? "#ate-10" : n <= 15 ? "#ate-15" : n <= 20 ? "#ate-20" : "#ate-50";
  return `${SITE}/ideias-de-prendas-amigo-secreto/?utm_source=email&utm_medium=confirmacao${tier}`;
}
function confirmText(o, link) {
  return `${o.n}, o teu amigo secreto é: ${o.t}\n\nGrupo: ${o.g}${o.l ? `\nLimite da prenda: ${o.l} €` : ""}${o.d ? `\nTroca de prendas: ${fmtDate(o.d)}` : ""}\n\nVer o teu sorteio: ${link}\n\nGuarda segredo!\n\nSem ideias para a prenda? ${ideasUrl(o.l)}\n\nSapatinho · sapatinho-natal.pt`;
}

/* ---------- anonymous counters (no names, no emails) ---------- */
const bucket = (l) => !l ? "sem" : l <= 5 ? "5" : l <= 10 ? "10" : l <= 15 ? "15" : l <= 20 ? "20" : l <= 30 ? "30" : "mais";
const size = (n) => n <= 5 ? "3a5" : n <= 10 ? "6a10" : n <= 20 ? "11a20" : "21a30";
async function count(env, inc) {
  if (!env.STATS) return;
  try {
    const key = "d:" + new Date().toISOString().slice(0, 10);
    const cur = (await env.STATS.get(key, "json")) || {};
    for (const [k, v] of Object.entries(inc)) cur[k] = (cur[k] || 0) + v;
    await env.STATS.put(key, JSON.stringify(cur));
  } catch (e) { /* counting must never break a draw */ }
}
/* ---------- proteção contra abusos ---------- */
// Endereços de sites no nome do grupo ou nos nomes transformariam os convites em publicidade ou burla.
const hasLink = (s) => /(https?:|www\.|[a-z0-9-]+\.(pt|com|net|org|io|br|info|xyz|me|co|eu|link|site|shop|app|top|click)\b)/i.test(s);
const DAILY_EMAILS = 260;      // o plano gratuito do Brevo envia 300 emails por dia; deixamos margem para os segundos emails
const CONFIRM_CAP = 295;       // os segundos emails podem usar a margem até perto dos 300
const CREATES_PER_IP = 10;     // sorteios por dia a partir do mesmo endereço IP
async function tag(text, env) {  // HMAC curto e irreversível, para não guardar o texto original
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode("sapatinho-tag:" + env.BREVO_API_KEY), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toB64url(new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(text))).slice(0, 12));
}
async function guardCreate(env, req, n) {
  if (!env.STATS) return;
  const day = new Date().toISOString().slice(0, 10);
  const ip = req.headers.get("CF-Connecting-IP") || "";
  if (!ip) { await reserve(env, n, DAILY_EMAILS); return; }
  // Guardamos só um código irreversível do IP, durante 24 horas, para contar sorteios por dia.
  const key = "ip:" + day + ":" + (await tag(ip + "|" + day, env));
  const used = parseInt((await env.STATS.get(key)) || "0", 10);
  if (used >= CREATES_PER_IP) throw fail("Já criaste muitos sorteios hoje. Tenta outra vez amanhã.", 429);
  await env.STATS.put(key, String(used + 1), { expirationTtl: 86400 });
  await reserve(env, n, DAILY_EMAILS);
}
// Quota diária do Brevo: os emails contam-se ANTES de enviar (reserva), para que um envio que falhe a meio
// ou pedidos seguidos não passem o limite. Chave "q:<dia>" só com um número; apaga-se sozinha em 2 dias.
async function reserve(env, n, cap) {
  if (!env.STATS) return;
  const key = "q:" + new Date().toISOString().slice(0, 10);
  const used = parseInt((await env.STATS.get(key)) || "0", 10);
  if (used + n > cap) throw fail("Hoje já enviámos todos os emails que podemos. Tenta outra vez amanhã.", 429);
  await env.STATS.put(key, String(used + n), { expirationTtl: 172800 });
}
// Nomes: letras (com acentos), números, espaços, hífen, apóstrofo, ponto e emojis. Nada de "/", "@", ":"
// nem "palavra.palavra" (que o Gmail transforma em link) nem números de telefone.
const linkish = (s) => /[\p{L}\p{N}][.。．｡][\p{L}\p{N}]{2}/u.test(s) || /\d{6}/.test(s.replace(/[\s.\-()]/g, ""));
const nameOk = (s) => /^[\p{L}\p{M}\p{N}\p{Extended_Pictographic}\u200d\ufe0f' .\-]{1,30}$/u.test(s) && !linkish(s);
const groupOk = (s) => /^[\p{L}\p{M}\p{N}\p{Extended_Pictographic}\u200d\ufe0f' .,!?&()ºª:\-]{1,60}$/u.test(s) && !linkish(s);
async function sameSecret(a, b) {
  const enc = new TextEncoder(), ha = await crypto.subtle.digest("SHA-256", enc.encode(a)), hb = await crypto.subtle.digest("SHA-256", enc.encode(b));
  const x = new Uint8Array(ha), y = new Uint8Array(hb); let d = 0; for (let i = 0; i < x.length; i++) d |= x[i] ^ y[i]; return d === 0;
}
async function stats(req, env, json) {
  const auth = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!env.STATS_TOKEN || !env.STATS || !auth || !(await sameSecret(auth, env.STATS_TOKEN))) return json({ error: "Sem acesso." }, 401);
  const list = await env.STATS.list({ prefix: "d:" });
  const days = [];
  for (const k of list.keys) days.push({ dia: k.name.slice(2), ...((await env.STATS.get(k.name, "json")) || {}) });
  days.sort((a, b) => a.dia.localeCompare(b.dia));
  return json({ days });
}

export { create, confirm, encode, decode, sign, verify, draw };
