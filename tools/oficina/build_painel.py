"""Gera site/painel/oficina/index.html a partir de tools/oficina/oficina.html (a mesma Oficina 3D do artifact).

No painel, a página lê os dados de /api/stats (com a palavra-passe do painel) em vez da base de dados do artifact,
e carrega o three.js de /painel/vendor/ porque a CSP do site só aceita scripts do próprio site.
Correr depois de mudar tools/oficina/oficina.html: python3 tools/oficina/build_painel.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
src = (ROOT / "tools/oficina/oficina.html").read_text(encoding="utf-8")
src = src.replace("https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js", "/painel/vendor/three.min.js")
src = src.replace("https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js", "/painel/vendor/OrbitControls.js")
assert "cdn.jsdelivr.net" not in src
head = ('<!doctype html>\n<html lang="pt-PT">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<meta name="robots" content="noindex, nofollow">\n<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n</head>\n<body>\n')
bar = ('<style>.ptabs{position:relative;z-index:5;height:48px;display:flex;align-items:center;gap:12px;background:#120c08;border-bottom:1px solid rgba(244,239,230,.14);'
       'padding-left:max(16px, env(safe-area-inset-left,0px));padding-right:max(16px, env(safe-area-inset-right,0px))}'
       '.ptabs .lg{font-family:"Fredoka",system-ui,sans-serif;font-weight:600;color:#f4efe6;text-decoration:none;margin-right:auto}'
       '.ptabs nav{display:inline-flex;gap:4px;padding:4px;border-radius:999px;background:rgba(244,239,230,.08);border:1px solid rgba(244,239,230,.14)}'
       '.ptabs nav a{padding:6px 16px;border-radius:999px;font:600 14px "Fredoka",system-ui,sans-serif;color:#f4efe6;text-decoration:none}'
       '.ptabs nav a[aria-current="page"]{background:#f2c14e;color:#1b120c}.ptabs nav a:focus-visible{outline:2px solid #f2c14e;outline-offset:2px}'
       '.app{height:calc(100% - 48px)}@media (max-width:820px){.app{height:auto}}</style>'
       '<div class="ptabs"><a class="lg" href="/">Sapatinho.</a><nav aria-label="Painel"><a href="/painel/">Números</a><a href="/painel/oficina/" aria-current="page">Agentes</a></nav></div>\n')
src = src.replace('<div class="app">', bar + '<div class="app">', 1)
out = ROOT / "site/painel/oficina/index.html"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(head + src + "\n</body>\n</html>\n", encoding="utf-8")
print("escrito", out.relative_to(ROOT))
