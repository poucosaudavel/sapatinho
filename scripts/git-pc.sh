#!/usr/bin/env bash
# git no PC do Diogo sem precisar de autorização para apagar ficheiros.
# A pasta ligada não deixa apagar, e o git deixa ficheiros .lock para trás.
# Este script muda-os de nome (mudar de nome é permitido) e depois corre o git.
# Uso: bash scripts/git-pc.sh pull   |   bash scripts/git-pc.sh status   |   ...
cd "$(dirname "$0")/.." || exit 1
if ! pgrep -x git >/dev/null 2>&1; then
  mkdir -p .git/stale
  for f in .git/*.lock .git/refs/heads/*.lock .git/objects/*.lock .git/objects/*/*.lock; do
    [ -e "$f" ] && mv "$f" ".git/stale/$(basename "$f")-$(date +%s%N)"
  done
fi
git -c pull.rebase=false -c pull.ff=only -c gc.auto=0 -c maintenance.auto=false "$@"
