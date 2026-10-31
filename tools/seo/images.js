// Gera as ilustrações dos guias: site/img/<slug>/<nome>.webp (+ capa.jpg para as redes sociais).
// Uso: node tools/seo/images.js            (todas)
//      node tools/seo/images.js <slug> ... (só alguns guias)
//      node tools/seo/images.js --png DIR  (também guarda PNG em DIR, para rever)
// Os desenhos estão em tools/seo/images/art.js. Depois corre python3 tools/seo/build.py.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'site', 'img');
const WEBP_Q = 0.8, JPG_Q = 82;

(async () => {
  const args = process.argv.slice(2);
  let pngDir = null;
  const i = args.indexOf('--png');
  if (i >= 0) { pngDir = path.resolve(args[i + 1]); args.splice(i, 2); fs.mkdirSync(pngDir, { recursive: true }); }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  await page.goto('file://' + path.join(__dirname, 'images', 'template.html'));
  await page.evaluate(() => Promise.all([document.fonts.load('40px Gloock'), document.fonts.load('600 20px Inst')]));
  const jobs = (await page.evaluate(() => list())).filter(j => !args.length || args.includes(j.slug));
  const rows = [];
  for (const j of jobs) {
    const size = await page.evaluate(j => draw(j.slug, j.name), j);
    await page.evaluate(() => document.fonts.ready);
    const el = await page.$('#c svg');
    const png = await el.screenshot({ type: 'png' });
    const dir = path.join(OUT, j.slug);
    fs.mkdirSync(dir, { recursive: true });
    if (pngDir) fs.writeFileSync(path.join(pngDir, `${j.slug}--${j.name}.png`), png);
    // WebP pelo próprio Chromium (canvas.toDataURL), sem ferramentas extra.
    const webp = await page.evaluate(async ({ b64, q }) => {
      const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
      const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
      c.getContext('2d').drawImage(img, 0, 0);
      return c.toDataURL('image/webp', q).split(',')[1];
    }, { b64: png.toString('base64'), q: WEBP_Q });
    const wf = path.join(dir, j.name + '.webp');
    fs.writeFileSync(wf, Buffer.from(webp, 'base64'));
    const row = { file: path.relative(ROOT, wf), w: size.w, h: size.h, kb: Math.round(fs.statSync(wf).size / 1024) };
    if (j.name === 'capa') {
      const jf = path.join(dir, 'capa.jpg');
      await el.screenshot({ path: jf, type: 'jpeg', quality: JPG_Q });
      row.jpg_kb = Math.round(fs.statSync(jf).size / 1024);
    }
    rows.push(row);
  }
  await browser.close();
  for (const r of rows) console.log(`${r.file}  ${r.w}x${r.h}  ${r.kb} KB${r.jpg_kb ? `  (jpg ${r.jpg_kb} KB)` : ''}${r.kb > 120 ? '  ACIMA DE 120 KB' : ''}`);
  console.log(rows.length, 'imagens');
})().catch(e => { console.error(e); process.exit(1); });
