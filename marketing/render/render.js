const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1700, height: 2000 } });
  await p.goto('file://' + path.resolve(__dirname, 'template.html'));
  await p.evaluate(() => document.fonts.ready);
  let n = 0;
  for (const j of jobs) {
    await p.evaluate(j => { if (j.kind === 'feed') feed(j.data, j.idx, j.total, j.seed); else if (j.kind === 'story') story(j.data, j.seed); else if (j.kind === 'profile') profile(); else cover(); }, j);
    await p.evaluate(() => document.fonts.ready);
    const over = await p.evaluate(() => { const b = document.querySelector('.box'); return b ? (b.scrollHeight > b.clientHeight + 2) : false; });
    if (over) console.log('OVERFLOW', j.out);
    fs.mkdirSync(path.dirname(j.out), { recursive: true });
    const el = await p.$('#c');
    await el.screenshot({ path: j.out, type: j.out.endsWith('.png') ? 'png' : 'jpeg', quality: j.out.endsWith('.png') ? undefined : 88 });
    n++;
  }
  console.log('rendered', n); await b.close();
})();
