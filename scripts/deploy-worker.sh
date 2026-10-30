#!/usr/bin/env bash
# Publica a API (Cloudflare Worker sapatinho-api). Os secrets (BREVO_API_KEY, STATS_TOKEN)
# ficam no Cloudflare e não são tocados por este deploy.
set -euo pipefail
cd "$(dirname "$0")/../worker"
node --check worker.js
npx wrangler@4 deploy
