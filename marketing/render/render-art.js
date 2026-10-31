// Publicações ilustradas do feed (1080x1350 JPG), com os desenhos dos guias do site.
// Uso: node marketing/render/render-art.js marketing/content/art-nov.json marketing/extra/art-nov [data ...]
// Gera <data>-<n>.jpg por slide e o LEIA.md com as legendas prontas a colar.
// Os modelos de slide estão em template-art.html (art-cover, art-figure, art-icons, art-text).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');

const [src, outDir, ...only] = process.argv.slice(2);
if (!src || !outDir) { console.error('uso: node render-art.js <conteudo.json> <pasta> [data ...]'); process.exit(1); }
const posts = JSON.parse(fs.readFileSync(src, 'utf8')).posts;
const DOW = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const MES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const nice = d => { const x = new Date(d + 'T12:00:00Z'); return `${DOW[x.getUTCDay()]}, ${x.getUTCDate()} ${MES[x.getUTCMonth()]}`; };

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 1400 } });
  await p.goto('file://' + path.resolve(__dirname, 'template-art.html'));
  await p.evaluate(() => Promise.all([document.fonts.load('40px Gloock'), document.fonts.load('600 20px Inst'), document.fonts.load('500 20px Inst'), document.fonts.load('700 20px Inst')]));
  let n = 0, bad = 0;
  for (const post of posts) {
    post.files = post.slides.map((_, i) => `${post.date}-${i + 1}.jpg`);
    if (only.length && !only.includes(post.date)) continue;
    for (const [i, sl] of post.slides.entries()) {
      await p.evaluate(({ sl, i, t }) => slide(sl, i, t), { sl, i, t: post.slides.length });
      await p.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map(im => im.complete ? 0 : new Promise(r => { im.onload = im.onerror = r; }))]));
      const issues = await p.evaluate(() => check().concat([...document.images].filter(im => !im.naturalWidth).map(im => 'imagem em falta: ' + im.src)));
      if (issues.length) { bad++; console.log('PROBLEMA', post.files[i], issues.join('; ')); }
      const el = await p.$('#c');
      await el.screenshot({ path: path.join(outDir, post.files[i]), type: 'jpeg', quality: 90 });
      n++;
    }
  }
  await b.close();
  // LEIA.md
  let md = `# Publicações ilustradas · novembro 2026\n\n${posts.length} publicações para o feed do Instagram e do Facebook (a mesma nas duas redes), uma a cada 2 dias às 17:00, **além** das que já estão agendadas (12:30 e 20:30). Usam as ilustrações dos guias do site.\n\nNo Instagram, carrega as imagens pela ordem indicada (carrossel) e a legenda diz «link na bio». No Facebook, acrescenta o link no fim da legenda.\n\nGerado por \`node marketing/render/render-art.js marketing/content/art-nov.json marketing/extra/art-nov\` a partir de \`marketing/content/art-nov.json\`.\n\n`;
  for (const [k, post] of posts.entries()) {
    md += `## ${k + 1}. ${nice(post.date)} · ${post.time} · ${post.slides[0].title}\n\n`;
    md += `**Data e hora:** ${post.date} às ${post.time}\n\n`;
    md += `**Imagens, por esta ordem:** ${post.files.map(f => '`' + f + '`').join(', ')}\n\n`;
    md += `**Legenda (copiar tudo, incluindo as hashtags):**\n\n\`\`\`\n${post.caption}\n\n${post.hashtags}\n\`\`\`\n\n`;
    md += `**Link (no fim da legenda no Facebook):** ${post.link}\n\n`;
  }
  fs.writeFileSync(path.join(outDir, 'LEIA.md'), md);
  console.log('imagens:', n, bad ? `com problemas: ${bad}` : 'sem problemas');
})().catch(e => { console.error(e); process.exit(1); });
