#!/usr/bin/env bash
# Publica o site no Cloudflare Pages (projeto sapatinho-natal).
# 1) gera as páginas a partir de tools/seo, 2) copia site/ para dist/,
# 3) aplica a parte privada (private/aplicar.py) se existir, 4) faz o deploy.
set -euo pipefail
cd "$(dirname "$0")/.."
python3 tools/seo/build.py
rm -rf dist && cp -r site dist
if [ -f private/aplicar.py ]; then
  python3 private/aplicar.py dist
elif [ "$(date +%Y%m%d)" -lt 20261226 ]; then
  echo "ERRO: falta a pasta private/. Sem ela, o deploy apagava páginas privadas que estão online." >&2
  echo "Põe a pasta private/ na raiz do projeto e volta a correr." >&2
  exit 1
fi
npx wrangler@4 pages deploy dist --project-name sapatinho-natal --branch main --commit-dirty=true
