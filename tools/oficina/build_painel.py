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
out = ROOT / "site/painel/oficina/index.html"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(head + src + "\n</body>\n</html>\n", encoding="utf-8")
print("escrito", out.relative_to(ROOT))
