// Ilustrações dos guias do Sapatinho (SVG plano, cores do site).
// Cada guia tem uma capa (1200x675) e uma ilustração para o texto (1200x800).
// Usado por tools/seo/images.js. Para ver uma imagem no navegador: draw('slug', 'capa').

const C = {
  night: '#0f2a22', night2: '#16372d', night3: '#1d4a3b', floor: '#133328',
  green: '#2f6b55', leaf: '#4f8f6f', leafL: '#78b090',
  paper: '#f7f1e6', paper2: '#efe6d4', line: '#e3d9c6', ink: '#1d2a25', muted: '#5f6d66',
  mint: '#b9c7bf', mint2: '#8fa59a',
  ember: '#c8452c', emberD: '#a8371f', emberL: '#e0745a',
  gold: '#d9a441', goldL: '#ecc777', goldD: '#b07f25',
  wood: '#b07a4a', woodD: '#8d5c33', woodL: '#d3a06c', card: '#c99b62', cardD: '#a97c46',
  skin: ['#f1c9a5', '#d9a07a', '#a46a45', '#6e4630'], hair: ['#2a1d16', '#6b3f22', '#c98f3d', '#1d2a25'],
  pink: '#e8a49a', duck: '#f2c94c', duckD: '#d9a72a', blue: '#5a87a8', blueD: '#3f6c8c',
};
let UID = 0;
const uid = p => (p || 'u') + (++UID);
const g = (x, y, s, r, inner) =>
  `<g transform="translate(${x} ${y})${r ? ` rotate(${r})` : ''}${s !== 1 ? ` scale(${s})` : ''}">${inner}</g>`;
const shadow = (rx, ry, op) => `<ellipse cx="0" cy="2" rx="${rx}" ry="${ry || Math.max(6, rx * .1)}" fill="#000" opacity="${op || .2}"/>`;
const txt = (x, y, s, fill, t, o) => `<text x="${x}" y="${y}" font-family="${(o && o.f) || 'Gloock'}" font-size="${s}" fill="${fill}" text-anchor="${(o && o.a) || 'middle'}"${o && o.w ? ` font-weight="${o.w}"` : ''}>${t}</text>`;
const rand = seed => { let s = seed; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; };

// ------------------------------------------------------------------ fundos
function bgDark(W, H, seed) {
  const id = uid('bg'), r = rand(seed || 7);
  let s = `<defs><radialGradient id="${id}" cx="50%" cy="-10%" r="95%"><stop offset="0" stop-color="${C.night3}"/><stop offset=".62" stop-color="${C.night}"/></radialGradient></defs>`;
  s += `<rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  s += `<circle cx="${W / 2}" cy="${H * .56}" r="${H * .44}" fill="${C.night2}" opacity=".85"/>`;
  for (let i = 0; i < 46; i++) { const z = 1.6 + r() * 3.6; s += `<circle cx="${(r() * W).toFixed(1)}" cy="${(r() * H * .8).toFixed(1)}" r="${z.toFixed(1)}" fill="${C.paper}" opacity="${(.12 + r() * .22).toFixed(2)}"/>`; }
  s += `<ellipse cx="${W / 2}" cy="${H * 1.1}" rx="${W * .78}" ry="${H * .26}" fill="${C.floor}"/>`;
  return s;
}
function bgLight(W, H, seed) {
  const r = rand(seed || 11);
  let s = `<rect width="${W}" height="${H}" fill="${C.paper2}"/>`;
  s += `<circle cx="${W / 2}" cy="${H * .5}" r="${H * .42}" fill="${C.paper}"/>`;
  for (let i = 0; i < 34; i++) { const z = 2 + r() * 4; s += `<circle cx="${(r() * W).toFixed(1)}" cy="${(r() * H * .82).toFixed(1)}" r="${z.toFixed(1)}" fill="${C.line}" opacity=".9"/>`; }
  s += `<ellipse cx="${W / 2}" cy="${H * 1.08}" rx="${W * .8}" ry="${H * .25}" fill="${C.line}" opacity=".75"/>`;
  return s;
}
function stripe(W) {
  const id = uid('st');
  return `<defs><pattern id="${id}" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="20" fill="${C.ember}"/><rect x="10" width="10" height="20" fill="${C.paper}"/></pattern></defs><rect width="${W}" height="10" fill="url(#${id})"/>`;
}
function brand(x, y) {
  return g(x, y, 1, 0, `<rect width="40" height="40" rx="9" fill="${C.night2}"/>` +
    g(0, 0, 40 / 64, 0, `<path d="M18 14h14v22c0 2 1 3 3 3h9a6 6 0 0 1 6 6v5H18z" fill="${C.ember}"/><rect x="18" y="12" width="14" height="7" rx="2" fill="${C.paper}"/><circle cx="46" cy="16" r="3" fill="${C.gold}"/>`) +
    `<text x="52" y="30" font-family="Gloock" font-size="28" fill="${C.paper}">Sapatinho<tspan fill="${C.gold}">.</tspan></text>`);
}

// ------------------------------------------------------------------ pequenos motivos
function star(r, c) {
  let p = '';
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; p += `${i ? 'L' : 'M'}${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`; }
  return `<path d="${p}Z" fill="${c || C.gold}"/>`;
}
const sparkle = (r, c) => `<path d="M0 ${-r}Q0 0 ${r} 0Q0 0 0 ${r}Q0 0 ${-r} 0Q0 0 0 ${-r}Z" fill="${c || C.goldL}"/>`;
function sparkles(list) { return list.map(([x, y, r, c, k]) => g(x, y, 1, 0, k === 's' ? star(r, c) : sparkle(r, c))).join(''); }
function confetti(W, H, seed, n, box) {
  const r = rand(seed), cols = [C.ember, C.gold, C.leaf, C.paper, C.emberL];
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = box ? box[0] + r() * box[2] : r() * W, y = box ? box[1] + r() * box[3] : r() * H * .7;
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${(8 + r() * 8).toFixed(0)}" height="${(4 + r() * 4).toFixed(0)}" rx="2" fill="${cols[i % cols.length]}" transform="rotate(${(r() * 180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`;
  }
  return s;
}
const dashed = (d, c, w) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w || 5}" stroke-linecap="round" stroke-dasharray="2 16"/>`;
function numBadge(n, c, tc) { return `<circle r="34" fill="${c || C.ember}"/>` + txt(0, 15, 42, tc || C.paper, n); }

function bow(b, c, d) {
  d = d || darken(c, .2);
  return `<path d="M0 0C${-b * .95} ${-b * 1.1} ${-b * 1.5} ${-b * .1} 0 0Z" fill="${c}"/>` +
    `<path d="M0 0C${b * .95} ${-b * 1.1} ${b * 1.5} ${-b * .1} 0 0Z" fill="${c}"/>` +
    `<path d="M0 0C${-b * .55} ${-b * .55} ${-b * .85} ${-b * .12} 0 0Z" fill="${d}"/>` +
    `<path d="M0 0C${b * .55} ${-b * .55} ${b * .85} ${-b * .12} 0 0Z" fill="${d}"/>` +
    `<path d="M0 0L${-b * .5} ${b * .62}L${-b * .22} ${b * .55}Z" fill="${d}"/>` +
    `<path d="M0 0L${b * .5} ${b * .62}L${b * .22} ${b * .55}Z" fill="${d}"/>` +
    `<circle r="${b * .2}" fill="${d}"/>`;
}
function darken(hex, k) {
  const n = parseInt(hex.slice(1), 16), f = v => Math.max(0, Math.round(v * (1 - k)));
  return '#' + [n >> 16, (n >> 8) & 255, n & 255].map(f).map(v => v.toString(16).padStart(2, '0')).join('');
}

// ------------------------------------------------------------------ objetos
// Todos desenhados com a origem no centro da base (assentes em y=0).
function gift(o) {
  const { w = 160, h = 130, c = C.ember, r = C.gold, lid = true, hasBow = true, pat = null, pc = C.paper, noShadow } = o || {};
  const lh = lid ? Math.max(18, h * .2) : 0, rw = Math.max(12, w * .15), id = uid('gc');
  let s = noShadow ? '' : shadow(w * .62);
  s += `<defs><clipPath id="${id}"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="4"/></clipPath></defs>`;
  s += `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="4" fill="${c}"/>`;
  if (pat === 'dots') { let d = ''; for (let yy = -h + 24; yy < -6; yy += 30) for (let xx = -w / 2 + 16 + ((yy / 30) % 2 ? 0 : 15); xx < w / 2; xx += 30) d += `<circle cx="${xx}" cy="${yy}" r="5" fill="${pc}" opacity=".55"/>`; s += `<g clip-path="url(#${id})">${d}</g>`; }
  if (pat === 'stripes') { let d = ''; for (let xx = -w / 2 - h; xx < w / 2; xx += 34) d += `<path d="M${xx} 0L${xx + h} ${-h}L${xx + h + 14} ${-h}L${xx + 14} 0Z" fill="${pc}" opacity=".35"/>`; s += `<g clip-path="url(#${id})">${d}</g>`; }
  s += `<g clip-path="url(#${id})"><rect x="${w * .2}" y="${-h}" width="${w * .3}" height="${h}" fill="#000" opacity=".1"/><rect x="${-w / 2}" y="${-h}" width="${w}" height="9" fill="#000" opacity=".16"/></g>`;
  s += `<rect x="${-rw / 2}" y="${-h}" width="${rw}" height="${h}" fill="${r}"/>`;
  if (lid) {
    s += `<rect x="${-w / 2 - 8}" y="${-h - lh}" width="${w + 16}" height="${lh}" rx="4" fill="${c}"/>`;
    s += `<rect x="${w * .2 + 8}" y="${-h - lh}" width="${w * .3}" height="${lh}" fill="#000" opacity=".08"/>`;
    s += `<rect x="${-rw / 2}" y="${-h - lh}" width="${rw}" height="${lh}" fill="${r}"/>`;
  }
  if (hasBow) s += g(0, -h - lh, 1, 0, bow(Math.max(24, w * .22), r));
  return s;
}

function stocking(o) {
  const { c = C.ember, cuff = C.paper } = o || {};
  return `<path d="M-34 -112H22V-44Q22 -30 36 -27L50 -24Q74 -19 74 3Q74 26 50 26H-6Q-38 26 -38 -6Z" fill="${c}"/>` +
    `<path d="M42 -25Q74 -19 74 3Q74 26 50 26H40Q30 0 42 -25Z" fill="${darken(c, .18)}"/>` +
    `<path d="M-38 -6Q-38 26 -6 26H2Q-4 4 -36 -22Z" fill="${darken(c, .18)}"/>` +
    g(-4, -66, 1, 0, star(13, C.gold)) +
    `<rect x="-44" y="-140" width="74" height="34" rx="9" fill="${cuff}"/>` +
    `<rect x="-44" y="-116" width="74" height="10" rx="4" fill="#000" opacity=".07"/>` +
    `<path d="M-38 -140C-38 -162 -18 -162 -18 -140" fill="none" stroke="${C.goldD}" stroke-width="5"/>`;
}

function clipboard(w, h, o) {
  const { rows = 4, wood = C.wood } = o || {};
  let s = shadow(w * .55);
  s += `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="12" fill="${wood}"/>`;
  s += `<rect x="${-w / 2 + 18}" y="${-h + 34}" width="${w - 36}" height="${h - 52}" rx="4" fill="${C.paper}"/>`;
  s += `<rect x="${-w * .2}" y="${-h - 12}" width="${w * .4}" height="44" rx="8" fill="${C.ink}"/><rect x="${-w * .12}" y="${-h - 4}" width="${w * .24}" height="14" rx="5" fill="${C.mint2}"/>`;
  const top = -h + 70, step = (h - 110) / rows;
  for (let i = 0; i < rows; i++) {
    const y = top + i * step;
    s += `<rect x="${-w / 2 + 40}" y="${y}" width="28" height="28" rx="5" fill="none" stroke="${C.mint2}" stroke-width="4"/>`;
    if (i < rows - 1) s += `<path d="M${-w / 2 + 44} ${y + 14}l8 9l16 -20" fill="none" stroke="${C.ember}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<rect x="${-w / 2 + 84}" y="${y + 8}" width="${(w - 140) * (i % 2 ? .7 : .92)}" height="12" rx="6" fill="${C.line}"/>`;
  }
  return s;
}

function book(w, h, c, o) {
  const { band = C.gold } = o || {};
  return `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="4" fill="${c}"/>` +
    `<rect x="${-w / 2 + 10}" y="${-h + 5}" width="${w - 10}" height="${h - 10}" rx="2" fill="${C.paper}"/>` +
    `<path d="M${-w / 2 + 16} ${-h * .5}H${w / 2}" stroke="${C.line}" stroke-width="2"/>` +
    `<path d="M${-w / 2 + 16} ${-h * .3}H${w / 2}M${-w / 2 + 16} ${-h * .7}H${w / 2}" stroke="${C.line}" stroke-width="2"/>` +
    `<rect x="${-w / 2}" y="${-h}" width="14" height="${h}" rx="4" fill="${darken(c, .15)}"/>` +
    `<rect x="${-w / 2 + 2}" y="${-h * .62}" width="10" height="${h * .24}" fill="${band}"/>`;
}
function bookStack(list) {
  // list: [w,h,color,dx]
  let s = shadow(list[0][0] * .6), y = 0;
  for (const [w, h, c, dx] of list) { s += g(dx || 0, y, 1, 0, book(w, h, c)); y -= h; }
  return s;
}
function bookStanding(w, h, c, title) {
  return shadow(w * .7) + `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="6" fill="${c}"/>` +
    `<rect x="${-w / 2}" y="${-h}" width="16" height="${h}" rx="6" fill="${darken(c, .18)}"/>` +
    `<rect x="${w / 2 - 8}" y="${-h + 8}" width="8" height="${h - 16}" fill="${C.paper}"/>` +
    `<rect x="${-w / 2 + 34}" y="${-h + 40}" width="${w - 62}" height="${h * .34}" rx="4" fill="none" stroke="${C.gold}" stroke-width="4"/>` +
    (title ? g(8, -h + 40 + h * .17 + 14, 1, 0, title) : '');
}

function mug(o) {
  const { c = C.ember, steam = true, deco = 'heart', st = C.mint } = o || {};
  let s = shadow(56);
  s += `<path d="M40 -76C82 -76 82 -18 40 -18" fill="none" stroke="${darken(c, .15)}" stroke-width="13"/>`;
  s += `<path d="M-46 -94H46V-12Q46 0 34 0H-34Q-46 0 -46 -12Z" fill="${c}"/>`;
  s += `<path d="M18 -94H46V-12Q46 0 34 0H18Z" fill="#000" opacity=".1"/>`;
  s += `<ellipse cx="0" cy="-94" rx="46" ry="9" fill="${darken(c, .3)}"/>`;
  if (deco === 'heart') s += `<path d="M0 -36C-22 -50 -18 -70 -6 -68C-2 -67 0 -63 0 -61C0 -63 2 -67 6 -68C18 -70 22 -50 0 -36Z" fill="${C.paper}"/>`;
  if (deco === 'star') s += g(-2, -50, 1, 0, star(17, C.paper));
  if (deco === 'tache') s += `<path d="M-30 -44C-24 -56 -8 -56 0 -48C8 -56 24 -56 30 -44C22 -48 12 -40 0 -42C-12 -40 -22 -48 -30 -44Z" fill="${C.ink}"/>`;
  if (steam) s += `<path d="M-16 -110C-26 -124 -6 -132 -16 -148M10 -112C0 -126 20 -134 10 -150" fill="none" stroke="${st}" stroke-width="6" stroke-linecap="round" opacity=".8"/>`;
  return s;
}

function football(r) {
  const id = uid('fb');
  let pent = (cx, cy, rr, rot) => { let p = ''; for (let i = 0; i < 5; i++) { const a = rot + i * 2 * Math.PI / 5; p += `${i ? 'L' : 'M'}${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`; } return p + 'Z'; };
  let s = shadow(r * .9, r * .14);
  s += `<defs><clipPath id="${id}"><circle cx="0" cy="${-r}" r="${r}"/></clipPath></defs>`;
  s += `<circle cx="0" cy="${-r}" r="${r}" fill="${C.paper}"/>`;
  let inner = `<path d="${pent(0, -r, r * .3, -Math.PI / 2)}" fill="${C.ink}"/>`;
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + i * 2 * Math.PI / 5, x1 = Math.cos(a) * r * .3, y1 = -r + Math.sin(a) * r * .3, x2 = Math.cos(a) * r * .78, y2 = -r + Math.sin(a) * r * .78;
    inner += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${C.ink}" stroke-width="${r * .05}"/>`;
    inner += `<path d="${pent(Math.cos(a) * r * 1.02, -r + Math.sin(a) * r * 1.02, r * .3, a + Math.PI / 5)}" fill="${C.ink}"/>`;
  }
  s += `<g clip-path="url(#${id})">${inner}<circle cx="${r * .45}" cy="${-r * .55}" r="${r * .9}" fill="#000" opacity=".08"/></g>`;
  s += `<circle cx="0" cy="${-r}" r="${r}" fill="none" stroke="${C.ink}" stroke-width="${r * .04}" opacity=".5"/>`;
  return s;
}

function gamepad(o) {
  const { c = C.ink, k = 1 } = o || {};
  let s = `<path d="M-92 -22C-92 -52 -62 -58 -42 -52H42C62 -58 92 -52 92 -22L104 30C108 58 80 66 66 46L46 20H-46L-66 46C-80 66 -108 58 -104 30Z" fill="${c}"/>`;
  s += `<path d="M-60 -18h12v-12h12v12h12v12h-12v12h-12v-12h-12z" fill="${C.mint2}"/>`;
  s += `<circle cx="52" cy="-28" r="9" fill="${C.gold}"/><circle cx="70" cy="-12" r="9" fill="${C.ember}"/><circle cx="34" cy="-12" r="9" fill="${C.leafL}"/><circle cx="52" cy="4" r="9" fill="${C.paper}"/>`;
  s += `<circle cx="-22" cy="8" r="12" fill="${darken(c, .3)}"/><circle cx="22" cy="8" r="12" fill="${darken(c, .3)}"/>`;
  s += `<rect x="-14" y="-30" width="10" height="5" rx="2" fill="${C.mint2}"/><rect x="4" y="-30" width="10" height="5" rx="2" fill="${C.mint2}"/>`;
  return g(0, -60 * k, k, 0, s);
}

function headphones(o) {
  const { c = C.ember, cup = C.ink } = o || {};
  return shadow(90) + `<path d="M-74 -40C-74 -170 74 -170 74 -40" fill="none" stroke="${cup}" stroke-width="16" stroke-linecap="round"/>` +
    `<path d="M-74 -46C-74 -150 74 -150 74 -46" fill="none" stroke="${C.mint2}" stroke-width="4" opacity=".6"/>` +
    `<rect x="-100" y="-80" width="44" height="80" rx="20" fill="${c}"/><rect x="56" y="-80" width="44" height="80" rx="20" fill="${c}"/>` +
    `<rect x="-66" y="-70" width="14" height="60" rx="7" fill="${cup}"/><rect x="52" y="-70" width="14" height="60" rx="7" fill="${cup}"/>` +
    `<rect x="78" y="-80" width="22" height="80" rx="11" fill="#000" opacity=".12"/>`;
}

function plant(o) {
  const { pot = '#b5603f', leaf = C.leaf, leaf2 = C.leafL } = o || {};
  let s = shadow(56);
  const lf = (a, l, c) => g(0, -82, 1, a, `<path d="M0 0C${l * .3} ${-l * .3} ${l * .25} ${-l * .85} 0 ${-l}C${-l * .25} ${-l * .85} ${-l * .3} ${-l * .3} 0 0Z" fill="${c}"/><path d="M0 0V${-l * .85}" stroke="${darken(c, .2)}" stroke-width="3"/>`);
  s += lf(-50, 90, leaf) + lf(48, 92, leaf) + lf(-18, 120, leaf2) + lf(20, 112, leaf) + lf(-80, 70, leaf2) + lf(80, 66, leaf2);
  s += `<path d="M-48 -92H48L38 0H-38Z" fill="${pot}"/><rect x="-54" y="-100" width="108" height="22" rx="5" fill="${darken(pot, .12)}"/><path d="M18 -78H48L38 0H14Z" fill="#000" opacity=".1"/>`;
  return s;
}

function candle(o) {
  const { c = C.paper, h = 120 } = o || {};
  return shadow(46) + `<rect x="-34" y="${-h}" width="68" height="${h}" rx="6" fill="${c}"/>` +
    `<rect x="10" y="${-h}" width="24" height="${h}" rx="6" fill="#000" opacity=".08"/>` +
    `<ellipse cx="0" cy="${-h}" rx="34" ry="7" fill="${darken(c, .08)}"/>` +
    `<path d="M0 ${-h - 4}V${-h - 16}" stroke="${C.ink}" stroke-width="3"/>` +
    `<path d="M0 ${-h - 58}C14 ${-h - 36} 14 ${-h - 16} 0 ${-h - 14}C-14 ${-h - 16} -14 ${-h - 36} 0 ${-h - 58}Z" fill="${C.gold}"/>` +
    `<path d="M0 ${-h - 40}C6 ${-h - 30} 6 ${-h - 18} 0 ${-h - 17}C-6 ${-h - 18} -6 ${-h - 30} 0 ${-h - 40}Z" fill="${C.ember}"/>` +
    `<rect x="-34" y="${-h * .55}" width="68" height="14" fill="${C.ember}" opacity=".85"/>`;
}

function cookie(r, o) {
  const rr = rand((o && o.seed) || 5);
  let s = `<circle r="${r}" fill="#c88a4a"/><circle r="${r * .82}" fill="#d49b5c"/>`;
  for (let i = 0; i < 6; i++) { const a = rr() * 6.28, d = rr() * r * .65; s += `<circle cx="${(Math.cos(a) * d).toFixed(1)}" cy="${(Math.sin(a) * d).toFixed(1)}" r="${(r * .1 + rr() * r * .05).toFixed(1)}" fill="#5a3418"/>`; }
  return s;
}
function plate(w) { return shadow(w * .55) + `<ellipse cx="0" cy="-8" rx="${w / 2}" ry="${w * .1}" fill="${C.paper}"/><ellipse cx="0" cy="-10" rx="${w * .36}" ry="${w * .065}" fill="${C.line}"/>`; }
function jar(o) {
  const { fill = C.ember, lid = C.gold, label = 'D' } = o || {};
  return shadow(54) + `<rect x="-50" y="-128" width="100" height="128" rx="18" fill="${C.paper}" opacity=".95"/>` +
    `<rect x="-42" y="-110" width="84" height="102" rx="12" fill="${fill}"/>` +
    `<rect x="18" y="-110" width="24" height="102" rx="10" fill="#000" opacity=".1"/>` +
    `<rect x="-54" y="-150" width="108" height="28" rx="6" fill="${lid}"/>` +
    `<path d="M-54 -150h108v8h-108z" fill="#000" opacity=".1"/>` +
    `<rect x="-34" y="-82" width="68" height="44" rx="5" fill="${C.paper}"/>` + txt(0, -50, 30, C.ink, label);
}
function chocolate(w, h) {
  let s = shadow(w * .55) + `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="6" fill="#5a3418"/>`;
  const cols = 4, rows = 2;
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) s += `<rect x="${-w / 2 + 8 + i * (w * .45 - 8) / cols}" y="${-h + 8 + j * (h - 16) / rows}" width="${(w * .45 - 8) / cols - 6}" height="${(h - 16) / rows - 6}" rx="3" fill="#6e4426"/>`;
  s += `<path d="M${-w * .05} ${-h}L${w * .02} ${-h * .7}L${-w * .06} ${-h * .45}L${w * .03} ${-h * .2}L${-w * .04} 0H${w / 2 - 6}Q${w / 2} 0 ${w / 2} -6V${-h + 6}Q${w / 2} ${-h} ${w / 2 - 6} ${-h}Z" fill="${C.ember}"/>`;
  s += `<rect x="${w * .12}" y="${-h * .66}" width="${w * .28}" height="${h * .32}" rx="4" fill="${C.gold}"/>`;
  return s;
}

function voucher(w, h, o) {
  const { c = C.ember, label = 'VALE', sub = '' } = o || {};
  let s = `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="12" fill="${C.paper}"/>`;
  s += `<path d="M${-w / 2 + 12} ${-h}H${-w / 2 + w * .32}V0H${-w / 2 + 12}Q${-w / 2} 0 ${-w / 2} -12V${-h + 12}Q${-w / 2} ${-h} ${-w / 2 + 12} ${-h}Z" fill="${c}"/>`;
  s += `<path d="M${-w / 2 + w * .32} ${-h + 8}V-8" stroke="${C.paper}" stroke-width="4" stroke-dasharray="8 8"/>`;
  s += g(-w / 2 + w * .16, -h / 2, 1, 0, star(h * .2, C.gold));
  s += txt(w * .16, -h / 2 + h * .1, h * .3, C.ink, label);
  if (sub) s += txt(w * .16, -h / 2 + h * .32, h * .12, C.muted, sub, { f: 'Inst', w: 600 });
  return s;
}
function giftCard(w, h, o) {
  const { c = C.green } = o || {};
  return `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="14" fill="${c}"/>` +
    `<rect x="${-w * .18}" y="${-h}" width="${w * .1}" height="${h}" fill="${C.gold}"/>` +
    `<rect x="${-w / 2}" y="${-h * .62}" width="${w}" height="${h * .12}" fill="${C.gold}"/>` +
    g(-w * .13, -h * .56, 1, 0, bow(h * .26, C.goldL, C.goldD)) +
    `<rect x="${w * .12}" y="${-h * .3}" width="${w * .3}" height="12" rx="6" fill="${C.paper}" opacity=".7"/>`;
}

function envelope(w, h, o) {
  const { c = C.paper, open = false, letter = null, seal = C.ember, flap, letterY = .25 } = o || {};
  const fc = flap || darken(c, .08);
  let s = shadow(w * .56);
  s += `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="8" fill="${darken(c, .14)}"/>`;
  if (open) {
    s += `<path d="M${-w / 2} ${-h}L0 ${-h * 1.72}L${w / 2} ${-h}Z" fill="${darken(c, .2)}"/>`;
    if (letter) s += g(0, -h * letterY, 1, 0, letter);
  }
  s += `<path d="M${-w / 2} ${-h}L0 ${-h * .42}L${w / 2} ${-h}V-8Q${w / 2} 0 ${w / 2 - 8} 0H${-w / 2 + 8}Q${-w / 2} 0 ${-w / 2} -8Z" fill="${c}"/>`;
  s += `<path d="M${-w / 2} -4L${-w * .06} ${-h * .5}M${w / 2} -4L${w * .06} ${-h * .5}" stroke="${darken(c, .1)}" stroke-width="3"/>`;
  if (!open) {
    s += `<path d="M${-w / 2} ${-h + 4}L0 ${-h * .36}L${w / 2} ${-h + 4}Z" fill="${fc}"/>`;
    if (seal) s += `<circle cx="0" cy="${-h * .38}" r="${h * .13}" fill="${seal}"/>` + g(0, -h * .38, 1, 0, star(h * .07, C.goldL));
  }
  return s;
}
function letterSheet(w, h, inner) {
  let s = `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="6" fill="${C.paper}" stroke="${C.line}" stroke-width="3"/>`;
  return s + (inner || '');
}

function phone(w, h, screen) {
  return shadow(w * .6) + `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="${w * .14}" fill="${C.ink}"/>` +
    `<rect x="${-w / 2 + 12}" y="${-h + 12}" width="${w - 24}" height="${h - 24}" rx="${w * .1}" fill="${C.night2}"/>` +
    `<rect x="-24" y="${-h + 22}" width="48" height="10" rx="5" fill="${C.ink}"/>` + (screen || '');
}
function laptop(w, h, screen) {
  return shadow(w * .62) + `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h - 14}" rx="14" fill="${C.ink}"/>` +
    `<rect x="${-w / 2 + 14}" y="${-h + 14}" width="${w - 28}" height="${h - 42}" rx="6" fill="${C.night2}"/>` +
    `<path d="M${-w / 2 - 50} -14H${w / 2 + 50}L${w / 2 + 30} 4H${-w / 2 - 30}Z" fill="${C.mint2}"/><rect x="-40" y="-14" width="80" height="6" rx="3" fill="${C.muted}"/>` + (screen || '');
}
function avatar(r, skin, hair, shirt) {
  return `<path d="M${-r * 1.55} ${r * 2.4}Q${-r * 1.55} ${r * 1.05} 0 ${r * 1.05}Q${r * 1.55} ${r * 1.05} ${r * 1.55} ${r * 2.4}Z" fill="${shirt}"/>` +
    `<circle r="${r}" fill="${skin}"/>` +
    `<path d="M${-r * 1.02} ${-r * .05}A${r * 1.02} ${r * 1.02} 0 0 1 ${r * 1.02} ${-r * .05}Q${r * .3} ${-r * .62} ${-r * 1.02} ${-r * .05}Z" fill="${hair}"/>` +
    `<circle cx="${-r * .34}" cy="${r * .12}" r="${r * .09}" fill="${C.ink}"/><circle cx="${r * .34}" cy="${r * .12}" r="${r * .09}" fill="${C.ink}"/>` +
    `<path d="M${-r * .3} ${r * .42}Q0 ${r * .68} ${r * .3} ${r * .42}" fill="none" stroke="${C.ink}" stroke-width="${r * .08}" stroke-linecap="round"/>`;
}
function hat() {
  return `<ellipse cx="0" cy="0" rx="130" ry="26" fill="${C.ink}"/>` +
    `<path d="M-86 -2V-150Q-86 -164 -72 -164H72Q86 -164 86 -150V-2Z" fill="${C.ink}"/>` +
    `<path d="M40 -164H72Q86 -164 86 -150V-2H40Z" fill="#000" opacity=".2"/>` +
    `<rect x="-86" y="-62" width="172" height="28" fill="${C.ember}"/>` +
    `<ellipse cx="0" cy="-164" rx="86" ry="18" fill="#0b1712"/>`;
}
function slip(w, h, name) {
  return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="4" fill="${C.paper}"/>` +
    `<path d="M${-w / 2} 0H${w / 2}" stroke="${C.line}" stroke-width="3"/>` + (name ? txt(0, -h * .1, h * .36, C.ink, name) : '');
}
function wheel(r, o) {
  const { cols = [C.ember, C.paper, C.gold, C.green, C.emberL, C.paper2, C.goldD, C.leaf], n = 8, rot = 0 } = o || {};
  let s = '';
  for (let i = 0; i < n; i++) {
    const a1 = (rot + i * 360 / n) * Math.PI / 180, a2 = (rot + (i + 1) * 360 / n) * Math.PI / 180;
    s += `<path d="M0 0L${(Math.cos(a1) * r).toFixed(1)} ${(Math.sin(a1) * r).toFixed(1)}A${r} ${r} 0 0 1 ${(Math.cos(a2) * r).toFixed(1)} ${(Math.sin(a2) * r).toFixed(1)}Z" fill="${cols[i % cols.length]}"/>`;
    const am = (a1 + a2) / 2;
    s += g((Math.cos(am) * r * .68).toFixed(1), (Math.sin(am) * r * .68).toFixed(1), 1, 0, `<circle r="${r * .07}" fill="${C.ink}" opacity=".18"/>`);
  }
  s += `<circle r="${r}" fill="none" stroke="${C.ink}" stroke-width="${r * .07}"/>`;
  for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12; s += `<circle cx="${(Math.cos(a) * r).toFixed(1)}" cy="${(Math.sin(a) * r).toFixed(1)}" r="${r * .02}" fill="${C.goldL}"/>`; }
  s += `<circle r="${r * .2}" fill="${C.ink}"/>` + star(r * .14, C.gold);
  return s;
}
function pointer(s, c) { return `<path d="M0 ${s}L${-s * .6} ${-s * .4}Q0 ${-s * .8} ${s * .6} ${-s * .4}Z" fill="${c || C.gold}"/><circle cy="${-s * .3}" r="${s * .18}" fill="${C.ink}"/>`; }

function priceTag(w, h, c, label, o) {
  const { tc = C.ink, str = C.goldD } = o || {};
  const n = h * .5;
  let s = `<path d="M${-w / 2 + n} ${-h / 2}H${w / 2 - 10}Q${w / 2} ${-h / 2} ${w / 2} ${-h / 2 + 10}V${h / 2 - 10}Q${w / 2} ${h / 2} ${w / 2 - 10} ${h / 2}H${-w / 2 + n}L${-w / 2} 0Z" fill="${c}"/>`;
  s += `<circle cx="${-w / 2 + n * .7}" cy="0" r="${h * .09}" fill="${C.night}" opacity=".85"/>`;
  s += txt(n * .4, h * .17, h * .5, tc, label);
  return s;
}
function string(d, c) { return `<path d="${d}" fill="none" stroke="${c || C.goldD}" stroke-width="4" stroke-linecap="round"/>`; }

function calendar(w, h, o) {
  const { mark = 18, month = 'DEZEMBRO' } = o || {};
  let s = shadow(w * .55);
  s += `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="14" fill="${C.paper}"/>`;
  s += `<path d="M${-w / 2} ${-h + 14}Q${-w / 2} ${-h} ${-w / 2 + 14} ${-h}H${w / 2 - 14}Q${w / 2} ${-h} ${w / 2} ${-h + 14}V${-h + 88}H${-w / 2}Z" fill="${C.ember}"/>`;
  s += txt(0, -h + 62, 34, C.paper, month, { f: 'Inst', w: 600 });
  for (let i = 0; i < 4; i++) s += `<rect x="${-w / 2 + 50 + i * (w - 100) / 3 - 6}" y="${-h - 16}" width="12" height="34" rx="6" fill="${C.ink}"/>`;
  const cols = 7, rows = 5, gx = (w - 50) / cols, gy = (h - 130) / rows;
  let d = 1;
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    if (d > 31) break;
    const cx = -w / 2 + 25 + gx * i + gx / 2, cy = -h + 110 + gy * j + gy / 2;
    if (d === mark) s += `<circle cx="${cx}" cy="${cy}" r="${Math.min(gx, gy) * .48}" fill="${C.gold}"/>`;
    if (d === mark - 7) s += `<circle cx="${cx}" cy="${cy}" r="${Math.min(gx, gy) * .44}" fill="none" stroke="${C.ember}" stroke-width="4"/>`;
    s += txt(cx, cy + gy * .17, gy * .42, d === mark ? C.ink : C.muted, d, { f: 'Inst', w: 600 });
    d++;
  }
  return s;
}

function padlock(s, o) {
  const { c = C.gold } = o || {};
  return g(0, 0, s, 0, `<path d="M-38 -80V-112A38 38 0 0 1 38 -112V-80" fill="none" stroke="${C.mint}" stroke-width="16"/>` +
    `<rect x="-60" y="-90" width="120" height="90" rx="14" fill="${c}"/><rect x="20" y="-90" width="40" height="90" rx="14" fill="#000" opacity=".1"/>` +
    `<circle cx="0" cy="-52" r="13" fill="${C.ink}"/><path d="M-6 -46H6L9 -20H-9Z" fill="${C.ink}"/>`);
}
function key(s, c) {
  c = c || C.gold;
  return g(0, 0, s, 0, `<circle cx="-70" cy="0" r="34" fill="none" stroke="${c}" stroke-width="18"/>` +
    `<rect x="-38" y="-9" width="130" height="18" rx="6" fill="${c}"/><rect x="60" y="0" width="14" height="30" rx="3" fill="${c}"/><rect x="82" y="0" width="14" height="22" rx="3" fill="${c}"/>`);
}
function chainLink(w, h, c) { return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="none" stroke="${c}" stroke-width="${h * .26}"/>`; }

function parcel(w, h) {
  let s = shadow(w * .6);
  s += `<path d="M${-w / 2} ${-h}H${w / 2}V0H${-w / 2}Z" fill="${C.card}"/>`;
  s += `<path d="M${w * .15} ${-h}H${w / 2}V0H${w * .15}Z" fill="#000" opacity=".1"/>`;
  s += `<path d="M${-w / 2 - 6} ${-h - 22}H${w / 2 + 6}V${-h}H${-w / 2 - 6}Z" fill="${C.cardD}"/>`;
  s += `<rect x="-16" y="${-h - 22}" width="32" height="${h + 22}" fill="${C.paper2}" opacity=".8"/>`;
  s += `<rect x="${w * .2}" y="${-h * .45}" width="${w * .22}" height="${h * .28}" rx="3" fill="${C.paper}"/><path d="M${w * .23} ${-h * .36}h${w * .14}M${w * .23} ${-h * .28}h${w * .1}" stroke="${C.mint2}" stroke-width="3"/>`;
  s += g(0, -h - 22, 1, 0, bow(w * .17, C.ember));
  return s;
}
function truck(w) {
  const h = w * .5;
  let s = shadow(w * .55);
  s += `<rect x="${-w / 2}" y="${-h - 20}" width="${w * .66}" height="${h}" rx="8" fill="${C.ember}"/>`;
  s += `<rect x="${-w / 2}" y="${-h - 20}" width="${w * .66}" height="14" rx="6" fill="#000" opacity=".1"/>`;
  s += g(-w / 2 + w * .33, -h * .5 - 20, 1, 0, star(h * .18, C.goldL));
  s += `<path d="M${w * .18} ${-h * .78 - 20}H${w * .36}L${w / 2} ${-h * .4 - 20}V-20H${w * .18}Z" fill="${C.emberD}"/>`;
  s += `<path d="M${w * .24} ${-h * .7 - 20}H${w * .34}L${w * .44} ${-h * .42 - 20}H${w * .24}Z" fill="${C.mint}"/>`;
  s += `<rect x="${-w / 2}" y="-26" width="${w}" height="10" rx="4" fill="${C.ink}"/>`;
  for (const x of [-w * .3, w * .3]) s += `<circle cx="${x}" cy="-12" r="${w * .1}" fill="${C.ink}"/><circle cx="${x}" cy="-12" r="${w * .045}" fill="${C.mint}"/>`;
  return s;
}
function plane(s, c) { return g(0, 0, s, 0, `<path d="M-60 0L70 -46L-14 18Z" fill="${c || C.paper}"/><path d="M-14 18L70 -46L-4 40Z" fill="${darken(c || C.paper, .12)}"/><path d="M-14 18L-4 40L4 24Z" fill="${darken(c || C.paper, .25)}"/>`); }
function pin(s, c) { return g(0, 0, s, 0, `<path d="M0 0C-12 -22 -30 -36 -30 -56A30 30 0 0 1 30 -56C30 -36 12 -22 0 0Z" fill="${c || C.ember}"/><circle cx="0" cy="-56" r="11" fill="${C.paper}"/>`); }

function teddy() {
  const b = '#a8693a', l = '#d9a77a';
  return shadow(110) +
    `<ellipse cx="-62" cy="-20" rx="38" ry="28" fill="${b}"/><ellipse cx="62" cy="-20" rx="38" ry="28" fill="${b}"/>` +
    `<ellipse cx="-62" cy="-20" rx="20" ry="15" fill="${l}"/><ellipse cx="62" cy="-20" rx="20" ry="15" fill="${l}"/>` +
    `<ellipse cx="0" cy="-90" rx="78" ry="84" fill="${b}"/><ellipse cx="0" cy="-80" rx="48" ry="54" fill="${l}"/>` +
    `<ellipse cx="-82" cy="-120" rx="26" ry="42" fill="${b}" transform="rotate(30 -82 -120)"/><ellipse cx="82" cy="-120" rx="26" ry="42" fill="${b}" transform="rotate(-30 82 -120)"/>` +
    `<circle cx="-56" cy="-268" r="30" fill="${b}"/><circle cx="56" cy="-268" r="30" fill="${b}"/><circle cx="-56" cy="-268" r="15" fill="${l}"/><circle cx="56" cy="-268" r="15" fill="${l}"/>` +
    `<circle cx="0" cy="-210" r="76" fill="${b}"/><ellipse cx="0" cy="-184" rx="36" ry="28" fill="${l}"/>` +
    `<ellipse cx="0" cy="-196" rx="12" ry="9" fill="${C.ink}"/><path d="M0 -188V-174M-12 -170Q0 -162 12 -170" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="-28" cy="-226" r="8" fill="${C.ink}"/><circle cx="28" cy="-226" r="8" fill="${C.ink}"/>` +
    `<path d="M-50 -142Q0 -122 50 -142L56 -128Q0 -106 -56 -128Z" fill="${C.ember}"/>` + g(0, -132, 1, 0, bow(26, C.ember));
}
function crayon(l, c) {
  return `<rect x="-14" y="${-l}" width="28" height="${l}" rx="4" fill="${c}"/><path d="M-14 ${-l}L0 ${-l - 34}L14 ${-l}Z" fill="${C.woodL}"/><path d="M-5 ${-l - 22}L0 ${-l - 34}L5 ${-l - 22}Z" fill="${c}"/>` +
    `<rect x="-14" y="${-l * .7}" width="28" height="${l * .4}" fill="${C.paper}" opacity=".85"/><rect x="-14" y="${-l * .62}" width="28" height="6" fill="${c}" opacity=".6"/>`;
}
function block(s, c, letter) {
  return `<rect x="${-s / 2}" y="${-s}" width="${s}" height="${s}" rx="10" fill="${c}"/><rect x="${-s / 2 + 10}" y="${-s + 10}" width="${s - 20}" height="${s - 20}" rx="6" fill="#fff" opacity=".18"/>` +
    txt(0, -s * .26, s * .6, C.paper, letter);
}

function bag(w, h, c, mark) {
  let s = shadow(w * .6);
  s += `<path d="M${-w * .22} ${-h}C${-w * .22} ${-h - w * .42} ${w * .22} ${-h - w * .42} ${w * .22} ${-h}" fill="none" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/>`;
  s += `<path d="M${-w / 2} ${-h}H${w / 2}L${w / 2 + 14} 0H${-w / 2 - 14}Z" fill="${c}"/>`;
  s += `<path d="M${w * .2} ${-h}H${w / 2}L${w / 2 + 14} 0H${w * .22}Z" fill="#000" opacity=".1"/>`;
  s += `<rect x="${-w / 2}" y="${-h}" width="${w}" height="16" fill="#000" opacity=".12"/>`;
  if (mark) s += mark;
  return s;
}
function magnifier(r, o) {
  const { glass = C.paper } = o || {};
  return `<path d="M${r * .7} ${r * .7}L${r * 1.8} ${r * 1.8}" stroke="${C.woodD}" stroke-width="${r * .34}" stroke-linecap="round"/>` +
    `<circle r="${r}" fill="${glass}" opacity=".35"/><circle r="${r}" fill="none" stroke="${C.ink}" stroke-width="${r * .14}"/>` +
    `<path d="M${-r * .5} ${-r * .3}A${r * .6} ${r * .6} 0 0 1 ${-r * .1} ${-r * .62}" fill="none" stroke="${C.paper}" stroke-width="${r * .08}" stroke-linecap="round"/>`;
}

function tacheGlasses(s, fr) {
  fr = fr || C.ink;
  return g(0, 0, s, 0,
    `<path d="M-18 -10Q0 -24 18 -10" fill="none" stroke="${fr}" stroke-width="8"/>` +
    `<path d="M-128 -16L-150 -36M128 -16L150 -36" stroke="${fr}" stroke-width="8" stroke-linecap="round"/>` +
    `<circle cx="-70" cy="0" r="56" fill="${C.paper}" opacity=".25"/><circle cx="70" cy="0" r="56" fill="${C.paper}" opacity=".25"/>` +
    `<circle cx="-70" cy="0" r="56" fill="none" stroke="${fr}" stroke-width="14"/><circle cx="70" cy="0" r="56" fill="none" stroke="${fr}" stroke-width="14"/>` +
    `<path d="M-20 -6Q0 -14 20 -6L28 64Q0 92 -28 64Z" fill="${C.pink}"/>` +
    `<path d="M-100 104C-90 70 -40 62 0 84C40 62 90 70 100 104C80 90 46 86 0 98C-46 86 -80 90 -100 104Z" fill="${C.hair[1]}"/>` +
    `<circle cx="-50" cy="-8" r="14" fill="${C.ink}"/><circle cx="50" cy="-8" r="14" fill="${C.ink}"/><circle cx="-45" cy="-13" r="5" fill="${C.paper}"/><circle cx="55" cy="-13" r="5" fill="${C.paper}"/>`);
}
function duck(s) {
  return g(0, 0, s, 0, shadow(90) +
    `<path d="M-96 -60C-96 -14 -50 0 6 0C70 0 104 -24 104 -64C104 -86 86 -90 70 -78C50 -64 20 -66 -10 -70C-50 -76 -96 -96 -96 -60Z" fill="${C.duck}"/>` +
    `<path d="M-60 -60C-40 -30 10 -30 30 -48" fill="none" stroke="${C.duckD}" stroke-width="10" stroke-linecap="round"/>` +
    `<circle cx="-24" cy="-134" r="58" fill="${C.duck}"/>` +
    `<path d="M-84 -128C-118 -128 -128 -112 -112 -104C-96 -98 -80 -106 -72 -112Z" fill="${C.ember}"/>` +
    `<circle cx="-40" cy="-148" r="9" fill="${C.ink}"/><circle cx="-37" cy="-151" r="3" fill="${C.paper}"/>`);
}
function sock(c, c2) {
  const id = uid('sk');
  const p = 'M-30 -170H30V-70Q30 -56 44 -50L70 -40Q96 -28 90 -4Q84 18 58 14L-6 2Q-36 -4 -36 -40Z';
  let st = '';
  for (let y = -150; y < 20; y += 34) st += `<rect x="-60" y="${y}" width="200" height="14" fill="${c2}"/>`;
  return `<defs><clipPath id="${id}"><path d="${p}"/></clipPath></defs><path d="${p}" fill="${c}"/><g clip-path="url(#${id})">${st}</g>` +
    `<rect x="-36" y="-186" width="72" height="26" rx="8" fill="${C.paper}"/>`;
}
function dumbbell(s, c) {
  return g(0, 0, s, 0, shadow(110, 12) + `<rect x="-90" y="-40" width="180" height="16" rx="8" fill="${C.mint2}"/>` +
    `<rect x="-104" y="-74" width="34" height="84" rx="10" fill="${c || C.ink}"/><rect x="-128" y="-62" width="28" height="60" rx="9" fill="${c || C.ink}"/>` +
    `<rect x="70" y="-74" width="34" height="84" rx="10" fill="${c || C.ink}"/><rect x="100" y="-62" width="28" height="60" rx="9" fill="${c || C.ink}"/>`);
}
function bottle(c) {
  return shadow(44) + `<rect x="-40" y="-190" width="80" height="190" rx="22" fill="${c || C.blue}"/>` +
    `<rect x="10" y="-190" width="30" height="190" rx="20" fill="#000" opacity=".1"/>` +
    `<rect x="-26" y="-222" width="52" height="36" rx="10" fill="${C.ink}"/><rect x="-12" y="-246" width="24" height="28" rx="8" fill="${C.ink}"/><circle cx="34" cy="-212" r="14" fill="none" stroke="${C.ink}" stroke-width="7"/>` +
    `<rect x="-40" y="-120" width="80" height="46" fill="${C.paper}" opacity=".9"/>` + g(0, -97, 1, 0, star(14, C.ember));
}
function pan() {
  return shadow(150, 14) + `<rect x="90" y="-44" width="170" height="22" rx="11" fill="${C.woodD}"/>` +
    `<ellipse cx="0" cy="-40" rx="120" ry="34" fill="${C.ink}"/><ellipse cx="0" cy="-46" rx="102" ry="24" fill="#2e3d37"/>` +
    `<path d="M-120 -40Q-116 0 0 0Q116 0 120 -40" fill="${C.ink}"/>` +
    `<ellipse cx="-20" cy="-48" rx="34" ry="12" fill="${C.paper}"/><ellipse cx="-16" cy="-49" rx="13" ry="7" fill="${C.gold}"/>`;
}
function spoon(l) { return `<ellipse cx="0" cy="${-l + 30}" rx="24" ry="34" fill="${C.woodL}"/><rect x="-7" y="${-l + 56}" width="14" height="${l - 56}" rx="7" fill="${C.woodL}"/>`; }
function spiceJar(c, lid) {
  return shadow(32) + `<rect x="-30" y="-100" width="60" height="100" rx="10" fill="${C.paper}" opacity=".9"/><rect x="-24" y="-78" width="48" height="72" rx="6" fill="${c}"/>` +
    `<rect x="-32" y="-118" width="64" height="24" rx="5" fill="${lid || C.ink}"/><rect x="-22" y="-56" width="44" height="22" rx="3" fill="${C.paper}"/>`;
}
function apron(c) {
  return `<path d="M-40 -260C-40 -300 40 -300 40 -260" fill="none" stroke="${C.ink}" stroke-width="8"/>` +
    `<path d="M-46 -262H46V-206L86 -190V-20Q86 0 66 0H-66Q-86 0 -86 -20V-190L-46 -206Z" fill="${c || C.ember}"/>` +
    `<path d="M-86 -186L-130 -170M86 -186L130 -170" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>` +
    `<rect x="-46" y="-120" width="92" height="64" rx="8" fill="#000" opacity=".12"/>` + g(0, -180, 1, 0, star(18, C.goldL));
}
function grill() {
  let s = shadow(170, 14);
  s += `<path d="M-60 -60L-110 0M60 -60L110 0M0 -60V0" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/>`;
  s += `<circle cx="-110" cy="-4" r="10" fill="${C.ink}"/><circle cx="110" cy="-4" r="10" fill="${C.ink}"/>`;
  s += `<path d="M-150 -170A150 110 0 0 0 150 -170Z" fill="${C.ink}"/>`;
  s += `<path d="M60 -170A150 110 0 0 1 -40 -64A150 110 0 0 0 150 -170Z" fill="#000" opacity=".25"/>`;
  s += `<rect x="-160" y="-178" width="320" height="10" rx="5" fill="${C.mint2}"/>`;
  const saus = (x, y, r) => g(x, y, 1, r, `<rect x="-58" y="-14" width="116" height="28" rx="14" fill="#9b4a2e"/><path d="M-30 -14L-38 14M0 -14L-8 14M30 -14L22 14" stroke="#6b2c18" stroke-width="5"/>`);
  s += saus(-70, -194, -4) + saus(40, -196, 6) + saus(-10, -218, 2);
  s += `<path d="M-70 -260C-82 -280 -58 -290 -70 -312M10 -262C-2 -282 22 -292 10 -314M80 -256C68 -276 92 -286 80 -308" fill="none" stroke="${C.mint}" stroke-width="6" stroke-linecap="round" opacity=".7"/>`;
  return s;
}
function tongs() { return `<path d="M0 0L-20 -230M0 0L20 -230" stroke="${C.mint2}" stroke-width="12" stroke-linecap="round"/><rect x="-14" y="-80" width="28" height="80" rx="10" fill="${C.ink}"/>`; }
function clock(r) {
  return shadow(r * .8) +
    `<path d="M${-r * .6} -${r * .2}L${-r * .9} 0M${r * .6} -${r * .2}L${r * .9} 0" stroke="${C.ink}" stroke-width="${r * .1}" stroke-linecap="round"/>` +
    `<circle cx="${-r * .62}" cy="${-r * 1.95}" r="${r * .32}" fill="${C.gold}"/><circle cx="${r * .62}" cy="${-r * 1.95}" r="${r * .32}" fill="${C.gold}"/>` +
    `<circle cx="0" cy="${-r * 1.05}" r="${r}" fill="${C.ember}"/><circle cx="0" cy="${-r * 1.05}" r="${r * .8}" fill="${C.paper}"/>` +
    Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<circle cx="${(Math.cos(a) * r * .66).toFixed(1)}" cy="${(-r * 1.05 + Math.sin(a) * r * .66).toFixed(1)}" r="${i % 3 ? r * .025 : r * .045}" fill="${C.ink}"/>`; }).join('') +
    `<path d="M0 ${-r * 1.05}V${-r * 1.6}M0 ${-r * 1.05}L${r * .36} ${-r * .82}" stroke="${C.ink}" stroke-width="${r * .07}" stroke-linecap="round"/><circle cx="0" cy="${-r * 1.05}" r="${r * .07}" fill="${C.ember}"/>` +
    `<rect x="${-r * .12}" y="${-r * 2.2}" width="${r * .24}" height="${r * .18}" rx="4" fill="${C.ink}"/>`;
}
function postcard(w, h) {
  let s = shadow(w * .55);
  s += `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="8" fill="${C.paper}"/>`;
  s += `<path d="M0 ${-h + 30}V-30" stroke="${C.line}" stroke-width="3"/>`;
  for (let i = 0; i < 4; i++) s += `<rect x="${-w / 2 + 30}" y="${-h + 50 + i * 36}" width="${w * .38 * (i === 3 ? .6 : 1)}" height="10" rx="5" fill="${C.mint}"/>`;
  for (let i = 0; i < 3; i++) s += `<rect x="30" y="${-h * .45 + i * 34}" width="${w * .36}" height="4" rx="2" fill="${C.line}"/>`;
  s += `<rect x="${w / 2 - 100}" y="${-h + 26}" width="70" height="84" rx="4" fill="${C.ember}" stroke="${C.paper}" stroke-width="4" stroke-dasharray="6 5"/>` + g(w / 2 - 65, -h + 68, 1, 0, star(20, C.goldL));
  return s;
}
function pencil(l) {
  return `<rect x="-12" y="${-l}" width="24" height="${l}" fill="${C.gold}"/><rect x="0" y="${-l}" width="12" height="${l}" fill="${C.goldD}" opacity=".5"/>` +
    `<path d="M-12 0L0 34L12 0Z" fill="${C.woodL}"/><path d="M-4 22L0 34L4 22Z" fill="${C.ink}"/>` +
    `<rect x="-12" y="${-l - 20}" width="24" height="20" rx="4" fill="${C.pink}"/><rect x="-12" y="${-l - 4}" width="24" height="8" fill="${C.mint2}"/>`;
}
function bubble(w, h, c, inner, tail) {
  const t = tail || 'l';
  return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h * .3}" fill="${c}"/>` +
    (t === 'l' ? `<path d="M${-w * .25} ${h / 2 - 2}L${-w * .36} ${h / 2 + 30}L${-w * .06} ${h / 2 - 2}Z" fill="${c}"/>` : `<path d="M${w * .25} ${h / 2 - 2}L${w * .36} ${h / 2 + 30}L${w * .06} ${h / 2 - 2}Z" fill="${c}"/>`) + (inner || '');
}
function hangTag(w, h, c, inner) {
  return `<path d="M${-w / 2} ${-h / 2 + 24}L${-w / 2 + 24} ${-h / 2}H${w / 2 - 24}L${w / 2} ${-h / 2 + 24}V${h / 2 - 8}Q${w / 2} ${h / 2} ${w / 2 - 8} ${h / 2}H${-w / 2 + 8}Q${-w / 2} ${h / 2} ${-w / 2} ${h / 2 - 8}Z" fill="${c}"/>` +
    `<circle cx="0" cy="${-h / 2 + 22}" r="9" fill="${C.night}" opacity=".7"/>` + (inner || '');
}
const heart = (s, c) => `<path d="M0 ${s * .9}C${-s * 1.2} ${s * .1} ${-s * 1.1} ${-s} ${-s * .4} ${-s * .9}C${-s * .15} ${-s * .85} 0 ${-s * .6} 0 ${-s * .45}C0 ${-s * .6} ${s * .15} ${-s * .85} ${s * .4} ${-s * .9}C${s * 1.1} ${-s} ${s * 1.2} ${s * .1} 0 ${s * .9}Z" fill="${c}"/>`;

function monitor(w, h, screen) {
  return shadow(w * .4) + `<rect x="-22" y="-70" width="44" height="70" fill="${C.mint2}"/><rect x="-70" y="-14" width="140" height="14" rx="6" fill="${C.mint2}"/>` +
    `<rect x="${-w / 2}" y="${-h - 60}" width="${w}" height="${h}" rx="14" fill="${C.ink}"/>` +
    `<rect x="${-w / 2 + 14}" y="${-h - 46}" width="${w - 28}" height="${h - 28}" rx="6" fill="${C.night3}"/>` + (screen || '');
}
function sticky(s, c, r) { return g(0, 0, 1, r || 0, `<rect x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" fill="${c}"/><rect x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s * .18}" fill="#000" opacity=".08"/><path d="M${-s * .3} ${-s * .05}H${s * .3}M${-s * .3} ${s * .15}H${s * .15}" stroke="${C.ink}" stroke-width="4" opacity=".35"/>`); }
function dice(s, n, c) {
  const P = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
  return `<rect x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" rx="${s * .18}" fill="${c || C.paper}"/><rect x="${s * .1}" y="${-s / 2}" width="${s * .4}" height="${s}" rx="${s * .18}" fill="#000" opacity=".06"/>` +
    P[n].map(([x, y]) => `<circle cx="${x * s * .27}" cy="${y * s * .27}" r="${s * .09}" fill="${c === C.ember ? C.paper : C.ink}"/>`).join('');
}
function playCard(w, h, sym, c) {
  return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="12" fill="${C.paper}" stroke="${C.line}" stroke-width="3"/>` +
    txt(-w / 2 + 22, -h / 2 + 40, 30, c, sym.l) + g(0, 8, 1, 0, sym.s) ;
}
const spade = (s, c) => `<path d="M0 ${-s}C${-s * 1.2} ${-s * .1} ${-s * .9} ${s * .8} ${-s * .1} ${s * .45}L${-s * .35} ${s}H${s * .35}L${s * .1} ${s * .45}C${s * .9} ${s * .8} ${s * 1.2} ${-s * .1} 0 ${-s}Z" fill="${c}"/>`;
function browserBar(w, h, label) {
  return `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${C.paper}"/>` +
    g(-w / 2 + h * .55, h * .26, 1, 0, padlock(h * .0042, { c: C.leaf })) +
    `<text x="${-w / 2 + h * 1.05}" y="${h * .14}" font-family="Inst" font-weight="600" font-size="${h * .36}" fill="${C.ink}">${label}</text>`;
}

// ------------------------------------------------------------------ cenas
// Cada cena desenha sobre o fundo e devolve o SVG interior.
const W1 = 1200, H1 = 675, W2 = 1200, H2 = 800, G1 = 590, G2 = 640;
const SCENES = {
  'regras-do-amigo-secreto': {
    capa: () => bgDark(W1, H1, 3) +
      g(300, G1, 1, 0, gift({ w: 210, h: 150, c: C.ember, r: C.gold, pat: 'dots' })) +
      g(455, G1, 1, 0, gift({ w: 110, h: 84, c: C.green, r: C.paper })) +
      g(650, G1 + 4, 1, -3, clipboard(270, 340, { rows: 5 })) +
      g(900, G1, 1, 0, gift({ w: 150, h: 110, c: C.gold, r: C.ember, pat: 'stripes', pc: C.paper })) +
      string(`M1015 0V210`, C.mint2) + g(1015, 400, 1.05, 6, stocking()) +
      sparkles([[180, 160, 18], [520, 120, 12], [820, 150, 22, C.gold, 's'], [1110, 520, 14], [110, 470, 10]]),
    passos: () => bgLight(W2, H2, 4) +
      dashed(`M330 420Q460 330 520 400`, C.mint2) + dashed(`M700 400Q760 330 870 420`, C.mint2) +
      g(220, G2, .9, -2, clipboard(240, 320, { rows: 4 })) +
      g(610, G2 - 20, 1, 0, envelope(250, 170, { c: C.mint, seal: C.ember })) +
      g(990, G2, 1, 0, gift({ w: 190, h: 140, c: C.ember, r: C.gold, pat: 'dots' })) +
      g(220, 230, 1, 0, numBadge(1)) + g(610, 300, 1, 0, numBadge(2)) + g(990, 330, 1, 0, numBadge(3)) +
      sparkles([[1100, 220, 16, C.gold], [420, 180, 12, C.gold], [760, 200, 14, C.ember, 's']]),
  },
  'ideias-de-prendas-amigo-secreto': {
    capa: () => bgDark(W1, H1, 8) +
      g(170, G1, 1, 0, mug({ c: C.paper, deco: 'star', st: C.mint })) +
      g(370, G1, 1, 0, gift({ w: 160, h: 130, c: C.gold, r: C.ember })) +
      g(600, G1, 1, 0, gift({ w: 240, h: 190, c: C.ember, r: C.gold, pat: 'dots' })) +
      g(830, G1, 1, 0, gift({ w: 170, h: 100, c: C.green, r: C.paper, pat: 'stripes' })) +
      g(1020, G1, 1, 0, bookStack([[150, 34, C.blue], [130, 30, C.gold, 8], [140, 32, C.ember, -6]])) +
      g(495, G1, 1, 0, gift({ w: 90, h: 64, c: C.paper, r: C.ember })) +
      sparkles([[600, 110, 26, C.gold, 's'], [300, 170, 14], [900, 160, 18], [1100, 300, 12], [110, 300, 12]]),
    'por-tipo': () => {
      let s = bgLight(W2, H2, 9);
      const cells = [
        [250, 250, g(0, 70, .78, 0, bookStack([[170, 38, C.blue], [150, 34, C.gold, 8], [160, 36, C.ember, -6]]))],
        [600, 250, g(-10, 70, 1, 0, mug({ c: C.ember }))],
        [950, 250, g(0, 50, 1, 0, gamepad({ c: C.ink }))],
        [250, 560, g(0, 75, 1, 0, football(68))],
        [600, 560, g(0, 80, .85, 0, plant())],
        [950, 560, g(0, 74, .8, 0, headphones({ c: C.ember }))],
      ];
      for (const [x, y, inner] of cells) s += `<circle cx="${x}" cy="${y}" r="135" fill="${C.paper}" stroke="${C.line}" stroke-width="4"/>` + g(x, y, 1, 0, inner);
      return s + sparkles([[425, 405, 14, C.gold], [775, 405, 14, C.ember, 's'], [1110, 110, 12, C.gold]]);
    },
  },
  'amigo-secreto-a-distancia': {
    capa: () => bgDark(W1, H1, 12) +
      dashed(`M180 330Q330 120 560 150Q820 180 1010 110`, C.mint2) +
      g(1020, 112, .9, 0, plane(1, C.paper)) +
      g(600, G1, 1, 0, laptop(440, 300,
        g(-104, -184, 1, 0, `<rect x="-96" y="-58" width="192" height="116" rx="6" fill="${C.green}"/>` + g(0, -10, 1, 0, avatar(26, C.skin[0], C.hair[2], C.ember))) +
        g(104, -184, 1, 0, `<rect x="-96" y="-58" width="192" height="116" rx="6" fill="${C.night3}"/>` + g(0, -10, 1, 0, avatar(26, C.skin[2], C.hair[0], C.gold))) +
        g(-104, -64, 1, 0, `<rect x="-96" y="-58" width="192" height="116" rx="6" fill="${C.night3}"/>` + g(0, -10, 1, 0, avatar(26, C.skin[1], C.hair[1], C.paper))) +
        g(104, -64, 1, 0, `<rect x="-96" y="-58" width="192" height="116" rx="6" fill="${C.green}"/>` + g(0, 6, .4, 0, gift({ w: 160, h: 120, c: C.ember, r: C.gold, noShadow: true }))))) +
      g(220, G1, 1, 0, gift({ w: 150, h: 120, c: C.gold, r: C.ember, pat: 'stripes' })) +
      g(180, 330, 1, 0, pin(1, C.ember)) +
      g(960, G1, 1, 0, envelope(170, 110, { c: C.paper })) +
      sparkles([[400, 110, 14], [790, 110, 12], [1120, 420, 16, C.gold, 's'], [90, 160, 12]]),
    envio: () => bgLight(W2, H2, 13) +
      dashed(`M300 330Q520 150 760 250Q900 310 1000 230`, C.ember) +
      g(1000, 228, 1.2, 0, pin(1, C.ember)) + g(300, 330, 1, 0, `<circle r="14" fill="${C.ember}"/>`) +
      g(330, G2, 1, 0, parcel(230, 180)) +
      g(820, G2, 1, 0, truck(330)) +
      sparkles([[560, 190, 14, C.gold], [130, 300, 12, C.gold, 's'], [1100, 420, 12, C.gold]]),
  },
  'amigo-secreto-na-empresa': {
    capa: () => bgDark(W1, H1, 15) +
      `<rect x="120" y="${G1 - 4}" width="960" height="22" rx="6" fill="${C.wood}"/><rect x="120" y="${G1 + 14}" width="960" height="14" fill="${C.woodD}"/>` +
      `<rect x="180" y="${G1 + 28}" width="22" height="80" fill="${C.woodD}"/><rect x="998" y="${G1 + 28}" width="22" height="80" fill="${C.woodD}"/>` +
      g(230, G1 - 4, .8, 0, plant()) +
      g(720, G1 - 4, 1, 0, monitor(380, 250, g(0, -185, 1, 0, `<rect x="-140" y="-70" width="280" height="22" rx="6" fill="${C.green}"/>` + g(0, 110, .55, 0, gift({ w: 170, h: 130, c: C.ember, r: C.gold, noShadow: true }))))) +
      g(540, 280, 1, 0, sticky(70, C.gold, -8)) + g(912, 300, 1, 0, sticky(64, C.leafL, 7)) +
      g(420, G1 - 4, 1, 0, gift({ w: 160, h: 120, c: C.ember, r: C.gold, pat: 'dots' })) +
      g(990, G1 - 4, .8, 0, mug({ c: C.paper, deco: 'star' })) +
      sparkles([[360, 140, 14], [600, 100, 18, C.gold, 's'], [1080, 180, 12], [140, 220, 12]]),
    calendario: () => bgLight(W2, H2, 16) +
      g(500, G2, 1, -2, calendar(470, 470, { mark: 18 })) +
      g(900, G2, 1, 0, gift({ w: 200, h: 150, c: C.ember, r: C.gold, pat: 'dots' })) +
      g(1080, G2, .8, 0, mug({ c: C.green, deco: 'heart', st: C.mint2 })) +
      sparkles([[870, 220, 18, C.gold, 's'], [190, 250, 14, C.gold], [1100, 300, 12, C.ember]]),
  },
  'como-fazer-sorteio-amigo-secreto': {
    capa: () => bgDark(W1, H1, 18) +
      g(340, G1, 1, 0, shadow(140, 16) + hat()) +
      g(260, 300, 1, -18, slip(110, 60)) + g(380, 250, 1, 12, slip(110, 60)) + g(320, 360, 1, 4, slip(110, 60)) +
      dashed(`M520 380Q620 300 700 380`, C.mint2) + `<path d="M690 360l18 22l-28 6z" fill="${C.mint2}"/>` +
      g(860, G1, 1, 0, phone(220, 420,
        g(0, -230, 1, 0, envelope(150, 100, { open: true, c: C.paper, letter: letterSheet(110, 120, txt(0, -54, 54, C.ember, '?')) })) +
        `<rect x="-70" y="-110" width="140" height="14" rx="7" fill="${C.mint2}"/><rect x="-50" y="-84" width="100" height="14" rx="7" fill="${C.green}"/>`)) +
      sparkles([[600, 160, 16], [1040, 180, 18, C.gold, 's'], [150, 160, 12], [1080, 480, 12]]),
    'por-email': () => bgLight(W2, H2, 19) +
      g(600, G2 - 10, 1.25, 0, envelope(340, 220, { open: true, c: C.mint, letter: letterSheet(260, 280,
        `<rect x="-100" y="-250" width="200" height="14" rx="7" fill="${C.mint}"/>` + txt(0, -130, 110, C.ember, '?') + `<rect x="-80" y="-90" width="160" height="12" rx="6" fill="${C.line}"/>`) })) +
      g(250, 330, 1, -8, bubble(130, 90, C.green, txt(0, 22, 60, C.paper, '@'))) +
      g(960, 290, 1, 6, bubble(130, 90, C.ember, txt(0, 22, 60, C.paper, '@'), 'r')) +
      sparkles([[380, 170, 16, C.gold, 's'], [840, 150, 14, C.gold], [1080, 520, 12, C.ember], [130, 560, 12, C.gold]]),
  },
  'pistas-e-mensagens-amigo-secreto': {
    capa: () => bgDark(W1, H1, 21) +
      g(560, G1, 1, -4, postcard(470, 300)) +
      g(860, G1 - 10, 1, 28, pencil(220)) +
      g(300, 200, 1, -6, bubble(150, 110, C.gold, txt(0, 30, 80, C.ink, '?'))) +
      g(930, 170, 1, 8, bubble(130, 96, C.ember, txt(0, 26, 70, C.paper, '?'), 'r')) +
      g(200, G1, 1, 0, gift({ w: 160, h: 120, c: C.green, r: C.gold })) +
      string(`M250 450Q300 470 300 500`) + g(300, 530, 1, 10, hangTag(70, 70, C.paper, g(0, 12, 1, 0, heart(14, C.ember)))) +
      sparkles([[620, 150, 16, C.gold, 's'], [1100, 380, 14], [110, 360, 12], [760, 260, 10]]),
    postal: () => bgLight(W2, H2, 22) +
      g(360, G2, 1, 0, gift({ w: 250, h: 190, c: C.ember, r: C.gold, pat: 'dots' })) +
      string(`M400 400Q480 380 520 420`) + g(540, 470, 1, 14, hangTag(120, 130, C.paper2, `<rect x="-40" y="-10" width="80" height="8" rx="4" fill="${C.mint2}"/>` + g(0, 30, 1, 0, heart(18, C.ember)))) +
      g(860, G2 - 30, 1, 5, postcard(380, 260)) +
      g(1060, G2 - 40, 1, 32, pencil(180)) +
      sparkles([[700, 220, 16, C.gold, 's'], [180, 260, 14, C.gold], [1100, 200, 12, C.ember]]),
  },
  'amigo-secreto-black-friday': {
    capa: () => bgDark(W1, H1, 24) +
      g(560, G1, 1, 0, bag(260, 290, C.paper, txt(0, -100, 150, C.ember, '%'))) +
      g(810, 260, 1, 18, priceTag(200, 90, C.gold, '-30%')) + string(`M710 230Q690 180 650 200`) +
      g(330, G1, 1, 0, gift({ w: 170, h: 130, c: C.ember, r: C.gold, pat: 'stripes' })) +
      g(890, G1, 1, 0, gift({ w: 150, h: 110, c: C.green, r: C.paper })) +
      g(1030, G1, 1, 0, gift({ w: 100, h: 74, c: C.gold, r: C.ember })) +
      sparkles([[400, 160, 14], [1000, 130, 16, C.gold, 's'], [170, 300, 12]]),
    desconto: () => bgLight(W2, H2, 25) +
      string(`M290 250Q360 200 386 392`) +
      g(560, 380, 1, -8, priceTag(520, 240, C.goldL, '') +
        txt(40, -10, 70, C.muted, '20 €') + `<path d="M-50 -30L130 -30" stroke="${C.ember}" stroke-width="10" stroke-linecap="round"/>` + txt(40, 80, 90, C.ember, '14 €')) +
      g(820, 410, 1, 0, magnifier(110)) +
      sparkles([[230, 520, 16, C.gold, 's'], [1050, 180, 14, C.gold], [960, 650, 12, C.ember]]),
  },
  'amigo-secreto-criancas': {
    capa: () => bgDark(W1, H1, 27) +
      g(600, G1, .95, 0, teddy()) +
      g(280, G1, 1, 0, shadow(110) + g(-60, 0, 1, -8, crayon(150, C.ember)) + g(-20, 0, 1, -3, crayon(170, C.gold)) + g(20, 0, 1, 3, crayon(160, C.leaf)) + g(60, 0, 1, 9, crayon(140, C.blue))) +
      g(900, G1, 1, 0, shadow(120) + g(-55, 0, 1, 0, block(100, C.ember, 'A')) + g(55, 0, 1, 0, block(100, C.blue, 'B')) + g(0, -100, 1, 0, block(100, C.green, 'C'))) +
      g(1080, G1, 1, 0, gift({ w: 100, h: 80, c: C.gold, r: C.ember })) +
      sparkles([[420, 140, 16], [780, 120, 20, C.gold, 's'], [140, 220, 12], [1080, 200, 14]]),
    'por-idade': () => {
      let s = bgLight(W2, H2, 28);
      const st = [[260, 120, C.mint], [600, 220, C.mint2], [940, 320, C.green]];
      for (const [x, h, c] of st) s += `<rect x="${x - 150}" y="${G2 - h}" width="300" height="${h}" rx="10" fill="${c}"/>`;
      s += g(260, G2 - 120, 1, 0, g(-48, 0, 1, 0, block(90, C.ember, 'A')) + g(48, 0, 1, 0, block(90, C.gold, 'B')) + g(0, -90, 1, 0, block(90, C.blue, 'C')));
      s += g(600, G2 - 220, 1, 0, g(-50, 0, 1, 0, bookStanding(120, 160, C.ember, star(18, C.gold))) + g(70, 0, 1, 0, g(-20, 0, 1, -6, crayon(130, C.gold)) + g(10, 0, 1, 0, crayon(140, C.leaf)) + g(40, 0, 1, 6, crayon(120, C.blue))));
      s += g(940, G2 - 320, 1, 0, g(-55, 0, 1, 0, football(58)) + g(70, 0, .7, 0, gamepad({ c: C.ink })));
      return s + sparkles([[130, 400, 16, C.gold, 's'], [600, 210, 14, C.gold], [1100, 140, 14, C.ember]]);
    },
  },
  'roleta-amigo-secreto': {
    capa: () => bgDark(W1, H1, 30) +
      `<path d="M600 360L560 ${G1}H640Z" fill="${C.woodD}"/><rect x="520" y="${G1 - 14}" width="160" height="20" rx="6" fill="${C.wood}"/>` +
      g(600, 330, 1, 0, wheel(235, { rot: 8 })) +
      g(600, 88, 1, 0, pointer(44, C.gold)) +
      g(250, G1, 1, 0, gift({ w: 160, h: 120, c: C.ember, r: C.gold, pat: 'dots' })) +
      g(960, G1, 1, 0, gift({ w: 140, h: 100, c: C.gold, r: C.ember })) +
      sparkles([[300, 170, 18, C.gold, 's'], [920, 150, 22, C.goldL], [1080, 360, 12], [120, 380, 12]]),
    telemovel: () => {
      const reel = `<rect x="-118" y="-410" width="236" height="300" rx="12" fill="${C.night}"/>` +
        `<rect x="-90" y="-386" width="180" height="22" rx="11" fill="${C.mint2}" opacity=".35"/><rect x="-70" y="-336" width="140" height="22" rx="11" fill="${C.mint2}" opacity=".6"/>` +
        `<rect x="-118" y="-296" width="236" height="74" fill="${C.night2}"/><path d="M-118 -296H118M-118 -222H118" stroke="${C.gold}" stroke-width="4"/>` + txt(0, -238, 64, C.gold, '?') +
        `<rect x="-70" y="-198" width="140" height="22" rx="11" fill="${C.mint2}" opacity=".6"/><rect x="-90" y="-150" width="180" height="22" rx="11" fill="${C.mint2}" opacity=".35"/>` +
        `<rect x="-90" y="-90" width="180" height="46" rx="8" fill="${C.ember}"/>` + txt(0, -58, 24, C.paper, 'Sortear', { f: 'Inst', w: 600 });
      return bgLight(W2, H2, 31) + g(600, G2 + 20, 1, 0, phone(290, 560, reel)) +
        confetti(W2, H2, 5, 18, [120, 80, 300, 420]) + confetti(W2, H2, 6, 18, [780, 80, 300, 420]) +
        g(230, G2, 1, 0, gift({ w: 170, h: 130, c: C.ember, r: C.gold, pat: 'dots' })) +
        g(970, G2, 1, 0, gift({ w: 150, h: 110, c: C.green, r: C.gold }));
    },
  },
  'prendas-amigo-secreto-ate-5-euros': {
    capa: () => bgDark(W1, H1, 33) +
      g(470, G1, 1, 0, gift({ w: 220, h: 170, c: C.ember, r: C.gold, pat: 'dots' })) +
      string(`M560 380Q640 330 690 260`) + g(740, 230, 1, 14, priceTag(190, 100, C.gold, '5 €')) +
      g(820, G1, 1, 0, plate(220) + g(-50, -30, 1, 0, cookie(42, { seed: 3 })) + g(30, -40, 1, 0, cookie(46, { seed: 9 })) + g(-8, -74, 1, 0, cookie(40, { seed: 4 }))) +
      g(220, G1, .9, 0, candle({ c: C.paper })) +
      g(1050, G1, .75, 0, jar({ fill: C.ember, label: '' })) +
      sparkles([[360, 150, 14], [600, 110, 18, C.gold, 's'], [1060, 140, 12], [120, 300, 12]]),
    'para-comer': () => bgLight(W2, H2, 34) +
      g(270, G2, 1.1, 0, jar({ fill: C.ember, label: 'D' })) +
      g(600, G2, 1, 0, plate(300) + g(-70, -34, 1, 0, cookie(56, { seed: 3 })) + g(50, -40, 1, 0, cookie(60, { seed: 9 })) + g(-10, -90, 1, 0, cookie(52, { seed: 4 }))) +
      g(940, G2, 1, -4, chocolate(280, 120)) +
      g(1010, G2 - 130, .55, 6, gift({ w: 160, h: 120, c: C.green, r: C.gold, noShadow: true })) +
      sparkles([[430, 260, 16, C.gold, 's'], [780, 230, 14, C.gold], [130, 320, 12, C.ember]]),
  },
  'prendas-amigo-secreto-ate-10-euros': {
    capa: () => bgDark(W1, H1, 36) +
      g(230, G1, 1, 0, bookStack([[190, 40, C.blue], [170, 36, C.gold, 10], [180, 38, C.paper, -6]])) +
      g(470, G1, 1, 0, mug({ c: C.ember })) +
      g(720, G1, 1, 0, gift({ w: 230, h: 170, c: C.green, r: C.gold, pat: 'stripes' })) +
      string(`M790 400Q870 360 900 290`) + g(950, 260, 1, 12, priceTag(200, 100, C.gold, '10 €')) +
      g(1040, G1, 1, 0, gift({ w: 110, h: 84, c: C.ember, r: C.paper })) +
      sparkles([[360, 160, 14], [620, 120, 18, C.gold, 's'], [1100, 160, 12], [110, 330, 12]]),
    jogos: () => bgLight(W2, H2, 37) +
      g(250, G2 - 140, 1, -12, playCard(170, 240, { l: 'A', s: heart(36, C.ember) }, C.ember)) +
      g(360, G2 - 128, 1, 5, playCard(170, 240, { l: 'K', s: spade(36, C.ink) }, C.ink)) +
      g(640, G2, 1, 0, shadow(140)) + g(600, G2 - 66, 1, -8, dice(130, 5, C.gold)) + g(740, G2 - 56, 1, 12, dice(110, 3, C.ember)) +
      g(1000, G2 - 8, 1, 0, shadow(100)) + g(1000, G2 - 8, 1, 0, gamepad({ c: C.ink, k: 1 })) +
      sparkles([[560, 200, 16, C.gold, 's'], [180, 620, 14, C.gold], [1100, 560, 12, C.ember]]),
  },
  'prendas-engracadas-amigo-secreto': {
    capa: () => bgDark(W1, H1, 39) +
      g(620, 330, 1.25, -4, tacheGlasses(1, C.gold)) +
      g(250, G1, .95, 0, duck(1)) +
      g(960, G1, 1, 0, gift({ w: 180, h: 140, c: C.ember, r: C.gold, pat: 'dots' })) +
      confetti(W1, H1, 9, 26, [100, 60, 1000, 200]) +
      sparkles([[1090, 300, 14, C.gold, 's'], [120, 200, 12]]),
    divertidas: () => bgLight(W2, H2, 40) +
      g(270, G2, 1.1, 0, duck(1)) +
      g(590, G2 - 20, 1.1, -8, sock(C.ember, C.gold)) + g(720, G2 - 10, 1.1, 10, sock(C.green, C.paper)) +
      g(980, G2, 1.2, 0, mug({ c: C.gold, deco: 'tache', st: C.mint2 })) +
      confetti(W2, H2, 3, 22, [140, 80, 920, 200]),
  },
  'prendas-amigo-secreto-ate-15-euros': {
    capa: () => bgDark(W1, H1, 42) +
      g(220, G1, .95, 0, plant()) +
      g(460, G1, 1, 0, bottle(C.blue)) +
      g(710, G1, 1, 0, gift({ w: 230, h: 170, c: C.ember, r: C.gold, pat: 'dots' })) +
      string(`M790 400Q870 360 900 290`) + g(950, 260, 1, 12, priceTag(200, 100, C.gold, '15 €')) +
      g(1040, G1, 1, 0, gift({ w: 110, h: 84, c: C.green, r: C.paper })) +
      sparkles([[350, 160, 14], [620, 120, 18, C.gold, 's'], [1100, 160, 12], [110, 330, 12]]),
    desporto: () => bgLight(W2, H2, 43) +
      g(260, G2, 1.05, 0, bottle(C.ember)) +
      g(600, G2, 1.2, 0, dumbbell(1, C.ink)) +
      g(930, G2, 1, 0, football(90)) +
      g(1100, G2, .7, 0, gift({ w: 140, h: 110, c: C.green, r: C.gold })) +
      sparkles([[420, 240, 16, C.gold, 's'], [760, 260, 14, C.gold], [130, 300, 12, C.ember]]),
  },
  'prendas-amigo-secreto-ate-20-euros': {
    capa: () => bgDark(W1, H1, 45) +
      g(250, G1, 1, 0, headphones({ c: C.ember, cup: C.paper })) +
      g(470, G1, .8, 0, bookStanding(140, 200, C.gold, star(18, C.ember))) +
      g(710, G1, 1, 0, gift({ w: 240, h: 180, c: C.green, r: C.gold, pat: 'stripes' })) +
      string(`M790 395Q870 355 900 290`) + g(950, 260, 1, 12, priceTag(200, 100, C.gold, '20 €')) +
      g(1050, G1, .8, 0, candle({ c: C.paper })) +
      sparkles([[360, 160, 14], [620, 120, 18, C.gold, 's'], [1110, 330, 12], [120, 330, 12]]),
    cozinhar: () => bgLight(W2, H2, 46) +
      g(330, G2 - 10, 1, 0, pan()) +
      g(150, G2, 1, -10, spoon(260)) +
      g(700, G2, 1, 0, spiceJar(C.ember)) + g(790, G2, 1, 0, spiceJar(C.gold, C.green)) + g(880, G2, 1, 0, spiceJar(C.leaf)) +
      g(1060, G2 - 10, .95, 0, apron(C.ember)) +
      sparkles([[560, 230, 16, C.gold, 's'], [860, 300, 14, C.gold], [200, 200, 12, C.ember]]),
  },
  'prendas-ultima-hora-amigo-secreto': {
    capa: () => bgDark(W1, H1, 48) +
      g(330, G1, 1, 0, clock(130)) +
      g(660, 430, 1, -8, voucher(380, 190, { label: 'VALE', sub: 'para uma experiência' })) +
      g(930, G1 - 6, 1, 5, giftCard(240, 150, { c: C.green })) +
      g(1110, G1, 1, 0, gift({ w: 90, h: 70, c: C.ember, r: C.gold })) +
      sparkles([[560, 160, 16, C.gold, 's'], [960, 170, 14], [130, 200, 12], [1100, 330, 12]]),
    'embrulhar-vale': () => bgLight(W2, H2, 49) +
      g(600, G2 - 20, 1.25, 0, envelope(360, 230, { open: true, c: C.ember, letterY: .6, letter: g(0, 0, .82, -4, voucher(320, 160, { label: 'VALE' })) })) +
      g(600, G2 - 120, 1, 0, bow(60, C.gold)) +
      g(230, G2, 1, 0, gift({ w: 140, h: 100, c: C.green, r: C.gold })) +
      g(990, G2, 1, 0, giftCard(200, 130, { c: C.green })) +
      sparkles([[330, 230, 16, C.gold, 's'], [900, 200, 14, C.gold], [1090, 520, 12, C.ember]]),
  },
  'prendas-amigo-secreto-homem': {
    capa: () => bgDark(W1, H1, 51) +
      g(230, G1, 1, 0, football(80)) +
      g(450, G1, .8, 0, mug({ c: C.paper, deco: 'star' })) +
      g(690, G1, 1, 0, gift({ w: 230, h: 170, c: C.ember, r: C.gold, pat: 'stripes' })) +
      g(960, G1, 1, 0, shadow(110)) + g(960, G1 - 10, 1, -6, gamepad({ c: C.paper })) +
      sparkles([[340, 160, 14], [620, 120, 18, C.gold, 's'], [1100, 200, 12], [110, 330, 12]]),
    churrasco: () => bgLight(W2, H2, 52) +
      g(560, G2, 1, 0, grill()) +
      g(870, G2, 1, 10, tongs()) +
      g(1050, G2 - 10, .9, 0, apron(C.green)) +
      g(210, G2, 1, 0, spiceJar(C.ember)) + g(300, G2, 1, 0, spiceJar(C.gold, C.green)) +
      sparkles([[300, 300, 16, C.gold, 's'], [900, 220, 14, C.gold], [1120, 160, 12, C.ember]]),
  },
  'como-funciona-o-sapatinho-privacidade': {
    capa: () => bgDark(W1, H1, 54) +
      g(600, G1 - 20, 1.3, 0, envelope(330, 220, { c: C.paper, seal: null })) +
      g(600, 470, 1.15, 0, padlock(1, { c: C.gold })) +
      g(270, 470, 1, -24, key(1, C.goldL)) +
      g(960, 170, 1, 0, browserBar(300, 64, '/r/••••.••••')) +
      g(950, 450, 1, 0, g(0, 0, 1, 35, chainLink(90, 44, C.mint)) + g(56, -30, 1, 35, chainLink(90, 44, C.mint2))) +
      sparkles([[400, 150, 14], [800, 140, 18, C.gold, 's'], [140, 260, 12], [1100, 520, 12]]),
    link: () => bgLight(W2, H2, 55) +
      g(600, 200, 1, 0, browserBar(760, 100, 'sapatinho-natal.pt/r/••••••.••••')) +
      g(600, G2, 1.05, 0, envelope(340, 220, { c: C.mint, seal: C.ember })) +
      g(240, G2 - 60, 1, -20, key(1.1, C.gold)) +
      g(960, G2 - 60, 1, 0, padlock(1.1, { c: C.gold })) +
      dashed(`M600 260V380`, C.mint2) +
      sparkles([[380, 330, 14, C.gold, 's'], [830, 340, 14, C.gold], [1100, 120, 12, C.ember]]),
  },
};

function draw(slug, name) {
  UID = 0;
  const cover = name === 'capa', W = cover ? W1 : W2, H = cover ? H1 : H2;
  let inner = SCENES[slug][name]();
  if (cover) inner += stripe(W) + brand(36, H - 64);
  document.getElementById('c').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${inner}</svg>`;
  return { w: W, h: H };
}
function list() { return Object.entries(SCENES).flatMap(([slug, v]) => Object.keys(v).map(name => ({ slug, name }))); }
