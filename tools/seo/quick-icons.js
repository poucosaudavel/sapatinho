// Gera os ícones dos cartões «Escolhas rápidas»: site/img/icons/<nome>.svg (64×64).
// Usa os desenhos de tools/seo/images/art.js (mais alguns pequenos feitos aqui).
// Uso: node tools/seo/quick-icons.js [--png DIR]   (com --png guarda também PNG, para rever)
// Os ícones não levam texto: um SVG aberto por <img> não carrega as fontes do site.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'site', 'img', 'icons');

// Corre dentro da página do molde, onde art.js já está carregado (C, g, star, mug, sock...).
function defineIcons() {
  const paperCard = (x, y, r, sym) => g(x, y, 1, r, `<rect x="-46" y="-64" width="92" height="128" rx="10" fill="${C.paper}" stroke="${C.line}" stroke-width="4"/>` + sym);
  window.ICONS = {
    chocolate: () => chocolate(200, 110),
    meias: () => g(-30, 0, 1, -8, sock(C.leaf, C.paper)) + g(30, 6, 1, 6, sock(C.ember, C.paper)),
    vela: () => candle({ h: 120 }),
    caderno: () => shadow(70) + `<rect x="-62" y="-170" width="124" height="170" rx="8" fill="${C.green}"/>` +
      `<rect x="-36" y="-170" width="98" height="170" rx="8" fill="#000" opacity=".08"/>` +
      `<rect x="-20" y="-126" width="62" height="34" rx="4" fill="${C.paper}"/>` +
      `<path d="M30 -170V0" stroke="${C.gold}" stroke-width="8"/>` +
      Array.from({ length: 6 }, (_, i) => `<rect x="-74" y="${-158 + i * 27}" width="26" height="9" rx="4.5" fill="${C.mint2}"/>`).join(''),
    cha: () => mug({ c: C.green, deco: 'star', steam: true }) +
      `<path d="M-30 -94L-56 -46" stroke="${C.ink}" stroke-width="3"/><rect x="-74" y="-48" width="34" height="38" rx="4" fill="${C.gold}"/>`,
    pato: () => duck(1),
    caneca: () => mug({ c: C.ember, deco: 'heart' }),
    'caneca-bigode': () => mug({ c: C.gold, deco: 'tache', st: C.mint2 }),
    'caneca-viagem': () => shadow(46) + `<path d="M-38 -150H38L30 0H-30Z" fill="${C.blue}"/>` +
      `<path d="M10 -150H38L30 0H6Z" fill="#000" opacity=".1"/>` +
      `<rect x="-38" y="-96" width="76" height="34" fill="${C.paper}" opacity=".9"/>` + g(0, -79, 1, 0, star(11, C.ember)) +
      `<rect x="-46" y="-172" width="92" height="26" rx="9" fill="${C.ink}"/><rect x="-20" y="-182" width="40" height="14" rx="6" fill="${C.ink}"/>`,
    cartas: () => paperCard(-34, -70, -14, heart(22, C.ember)) + paperCard(34, -70, 12, spade(22, C.ink)),
    puzzle: () => {
      const p = 'M-60 -60H-14C-14 -84 14 -84 14 -60H60V-14C84 -14 84 14 60 14V60H14C14 36 -14 36 -14 60H-60V14C-36 14 -36 -14 -60 -14Z';
      return g(-6, -72, 1, -8, `<path d="${p}" fill="${C.ember}"/><path d="${p}" fill="none" stroke="${C.emberD}" stroke-width="4"/>`) +
        g(92, -42, .55, 14, `<path d="${p}" fill="${C.gold}"/>`);
    },
    especiarias: () => g(-46, 0, 1, 0, spiceJar(C.ember)) + g(26, 0, 1, 0, spiceJar(C.gold, C.woodD)) + g(92, 0, .8, 0, spiceJar(C.leaf)),
    garrafa: () => bottle(C.blue),
    termica: () => shadow(44) + `<rect x="-40" y="-200" width="80" height="200" rx="16" fill="${C.mint2}"/>` +
      `<rect x="12" y="-200" width="28" height="200" rx="14" fill="#000" opacity=".1"/>` +
      `<rect x="-40" y="-150" width="80" height="10" fill="${C.green}"/><rect x="-40" y="-40" width="80" height="10" fill="${C.green}"/>` +
      `<rect x="-44" y="-236" width="88" height="44" rx="10" fill="${C.green}"/><rect x="-44" y="-236" width="88" height="10" rx="5" fill="#000" opacity=".12"/>`,
    molho: () => shadow(34) + `<path d="M-28 -110Q-28 -130 -12 -140V-178H12V-140Q28 -130 28 -110V-8Q28 0 20 0H-20Q-28 0 -28 -8Z" fill="${C.ember}"/>` +
      `<rect x="-16" y="-196" width="32" height="24" rx="5" fill="${C.ink}"/>` +
      `<rect x="-28" y="-96" width="56" height="54" fill="${C.paper}"/>` +
      `<path d="M-14 -56C-10 -78 4 -86 14 -88C16 -82 12 -80 8 -78C4 -66 -4 -58 -14 -56Z" fill="${C.ember}"/><path d="M8 -80l6 -10" stroke="${C.leaf}" stroke-width="4" stroke-linecap="round"/>`,
    candeeiro: () => shadow(60) + `<rect x="-56" y="-16" width="112" height="16" rx="8" fill="${C.ink}"/>` +
      `<path d="M-30 -14L10 -120L66 -90" fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<circle cx="10" cy="-120" r="10" fill="${C.mint2}"/>` +
      g(66, -90, 1, 30, `<path d="M-34 0L-20 -34H20L34 0Z" fill="${C.ember}"/><ellipse cx="0" cy="2" rx="22" ry="8" fill="${C.goldL}"/>`),
    mapa: () => {
      let s = shadow(100) + `<path d="M-100 -150L-34 -170L34 -150L100 -170V-20L34 0L-34 -20L-100 0Z" fill="${C.paper}"/>` +
        `<path d="M-34 -170V-20L34 0V-150Z" fill="${C.paper2}"/>` +
        `<path d="M-80 -120C-60 -140 -30 -110 -40 -90C-50 -70 -70 -80 -80 -60Z" fill="${C.leafL}"/>` +
        `<path d="M10 -130C40 -140 70 -120 60 -96C50 -76 30 -90 14 -80C0 -90 -4 -116 10 -130Z" fill="${C.gold}"/>` +
        `<path d="M40 -60C60 -66 80 -54 72 -40C64 -30 50 -36 40 -30Z" fill="${C.leafL}"/>`;
      return s + dashed('M-70 -40Q-10 -20 20 -70', C.ember, 5) + g(20, -66, .55, 0, pin(1, C.ember));
    },
    dados: () => shadow(100) + g(-46, -50, 1, -12, dice(90, 5, C.ember)) + g(50, -46, 1, 10, dice(90, 3, C.paper)),
    manta: () => {
      const id = uid('mt');
      let st = '';
      for (let x = -120; x < 130; x += 40) st += `<rect x="${x}" y="-160" width="14" height="170" fill="${C.paper}" opacity=".35"/>`;
      for (let y = -140; y < 10; y += 40) st += `<rect x="-130" y="${y}" width="260" height="12" fill="${C.paper}" opacity=".3"/>`;
      return shadow(110) + `<defs><clipPath id="${id}"><rect x="-110" y="-150" width="220" height="150" rx="16"/></clipPath></defs>` +
        `<rect x="-110" y="-150" width="220" height="150" rx="16" fill="${C.ember}"/><g clip-path="url(#${id})">${st}` +
        `<rect x="-110" y="-104" width="220" height="10" fill="#000" opacity=".12"/><rect x="-110" y="-54" width="220" height="10" fill="#000" opacity=".12"/></g>`;
    },
    planta: () => plant(),
    bigode: () => tacheGlasses(1),
    cabo: () => {
      const end = (x, y, r, c) => g(x, y, 1, r, `<rect x="-14" y="-34" width="28" height="40" rx="6" fill="${c}"/><rect x="-8" y="-50" width="16" height="18" rx="3" fill="${C.mint2}"/>`);
      return `<path d="M0 30C0 -10 -70 -20 -70 -80M0 30C0 -20 0 -40 0 -86M0 30C0 -10 70 -20 70 -80" fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/>` +
        `<path d="M0 30V80" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/>` +
        end(-70, -80, -10, C.ember) + end(0, -88, 0, C.gold) + end(70, -80, 10, C.leaf) +
        `<rect x="-18" y="70" width="36" height="48" rx="8" fill="${C.ink}"/><rect x="-12" y="114" width="24" height="16" rx="3" fill="${C.mint2}"/>`;
    },
    termometro: () => `<path d="M38 -10L150 -150" stroke="${C.mint2}" stroke-width="12" stroke-linecap="round"/>` +
      `<circle cx="0" cy="0" r="62" fill="${C.ember}"/><circle cx="0" cy="0" r="46" fill="${C.paper}"/>` +
      `<rect x="-30" y="-20" width="60" height="30" rx="5" fill="${C.night3}"/><rect x="-22" y="-12" width="44" height="14" rx="2" fill="${C.leafL}" opacity=".8"/>` +
      `<circle cx="-14" cy="28" r="7" fill="${C.ink}"/><circle cx="14" cy="28" r="7" fill="${C.ink}"/>`,
    lanterna: () => `<path d="M-96 -10C-96 -70 96 -70 96 -10" fill="none" stroke="${C.ink}" stroke-width="18" stroke-linecap="round"/>` +
      `<path d="M-96 -10C-96 30 96 30 96 -10" fill="none" stroke="${C.night3}" stroke-width="18" stroke-linecap="round"/>` +
      `<rect x="-44" y="-30" width="88" height="62" rx="14" fill="${C.ember}"/><circle cx="0" cy="1" r="21" fill="${C.goldL}"/><circle cx="0" cy="1" r="11" fill="${C.paper}"/>` +
      `<path d="M-30 52L-44 84M0 56V92M30 52L44 84" stroke="${C.gold}" stroke-width="8" stroke-linecap="round"/>`,
    gorro: () => shadow(80) + `<path d="M-80 -40C-80 -150 80 -150 80 -40Z" fill="${C.ember}"/>` +
      Array.from({ length: 5 }, (_, i) => `<path d="M${-48 + i * 24} -46C${-50 + i * 24} -90 ${-40 + i * 22} -120 ${-24 + i * 12} -134" fill="none" stroke="${C.emberD}" stroke-width="5" opacity=".6"/>`).join('') +
      `<rect x="-88" y="-50" width="176" height="50" rx="12" fill="${C.paper}"/>` +
      Array.from({ length: 8 }, (_, i) => `<path d="M${-74 + i * 21} -42V-8" stroke="${C.line}" stroke-width="6" stroke-linecap="round"/>`).join('') +
      `<circle cx="0" cy="-146" r="26" fill="${C.paper}"/>`,
    calendario: () => {
      let s = shadow(90) + `<rect x="-90" y="-170" width="180" height="170" rx="14" fill="${C.paper}" stroke="${C.line}" stroke-width="4"/>` +
        `<path d="M-90 -156Q-90 -170 -76 -170H76Q90 -170 90 -156V-120H-90Z" fill="${C.ember}"/>`;
      for (let i = 0; i < 3; i++) s += `<rect x="${-46 + i * 46 - 6}" y="-186" width="12" height="30" rx="6" fill="${C.ink}"/>`;
      for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) {
        const cx = -60 + i * 40, cy = -92 + j * 34;
        s += (j === 2 && i === 2) ? `<circle cx="${cx}" cy="${cy}" r="15" fill="${C.gold}"/>` : `<rect x="${cx - 9}" y="${cy - 7}" width="18" height="14" rx="3" fill="${C.mint}"/>`;
      }
      return s;
    },
    livro: () => bookStack([[170, 34, C.green], [150, 30, C.ember, 8], [160, 32, C.blue, -6]]) +
      `<path d="M62 -96V-150Q62 -164 48 -164H14" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>` +
      `<rect x="52" y="-104" width="20" height="14" rx="4" fill="${C.ink}"/>` +
      g(10, -164, 1, 0, `<path d="M-22 -10H18L28 14H-32Z" fill="${C.gold}"/><path d="M-26 18L-52 70H48L24 18Z" fill="${C.goldL}" opacity=".4"/>`),
  };
}

function render(name) {
  const NS = 'http://www.w3.org/2000/svg';
  const box = document.getElementById('c');
  box.innerHTML = `<svg xmlns="${NS}" width="2000" height="2000"><g id="ic">${ICONS[name]()}</g></svg>`;
  const b = document.getElementById('ic').getBBox();
  const pad = Math.max(b.width, b.height) * 0.06;
  const side = Math.max(b.width, b.height) + pad * 2;
  const x = b.x + b.width / 2 - side / 2, y = b.y + b.height / 2 - side / 2;
  const f = n => +n.toFixed(1);
  // Ids únicos por ficheiro (clip-path), para não colidirem se um dia ficarem inline.
  const inner = ICONS[name]().replace(/\b(id="|url\(#)([a-z]+)(\d+)/g, `$1${name.replace(/\W/g, '')}-$2$3`);
  return `<svg xmlns="${NS}" viewBox="${f(x)} ${f(y)} ${f(side)} ${f(side)}" width="64" height="64">${inner}</svg>\n`;
}

(async () => {
  const args = process.argv.slice(2);
  const i = args.indexOf('--png');
  const pngDir = i >= 0 ? path.resolve(args[i + 1]) : null;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 600, height: 600 } });
  await page.goto('file://' + path.join(__dirname, 'images', 'template.html'));
  await page.evaluate(defineIcons);
  const names = await page.evaluate(() => Object.keys(ICONS));
  fs.mkdirSync(OUT, { recursive: true });
  if (pngDir) fs.mkdirSync(pngDir, { recursive: true });
  for (const n of names) {
    const svg = await page.evaluate(render, n);
    const file = path.join(OUT, n + '.svg');
    fs.writeFileSync(file, svg);
    if (pngDir) {
      const p2 = await browser.newPage({ viewport: { width: 128, height: 128 } });
      await p2.setContent(`<body style="margin:0;background:#efe6d4">${svg.replace('width="64" height="64"', 'width="128" height="128"')}</body>`);
      await p2.screenshot({ path: path.join(pngDir, n + '.png') });
      await p2.close();
    }
    console.log(path.relative(ROOT, file), (fs.statSync(file).size / 1024).toFixed(1) + ' KB');
  }
  await browser.close();
  console.log(names.length, 'ícones');
})().catch(e => { console.error(e); process.exit(1); });
