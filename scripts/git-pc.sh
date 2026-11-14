#!/usr/bin/env bash
# git no PC do Diogo sem precisar de autorização para apagar ficheiros.
# A pasta ligada não deixa apagar, e o git deixa ficheiros .lock para trás.
# Este script muda-os de nome (mudar de nome é permitido) e depois corre o git.
# Uso: bash scripts/git-pc.sh pull   |   bash scripts/git-pc.sh status   |   ...
cd "$(dirname "$0")/.." || exit 1
clear_locks() {
  pgrep -x git >/dev/null 2>&1 && return
  mkdir -p .git/stale
  for f in .git/*.lock .git/refs/heads/*.lock .git/refs/remotes/origin/*.lock .git/objects/*.lock .git/objects/*/*.lock; do
    [ -e "$f" ] && mv "$f" ".git/stale/$(basename "$f")-$(date +%s%N)"
  done
}
# Cada comando git pode deixar um .lock: limpa-se antes e depois de cada um.
G() { clear_locks; git -c pull.rebase=false -c pull.ff=only -c gc.auto=0 -c maintenance.auto=false "$@"; local r=$?; clear_locks; return $r; }
clear_locks
# "pull" sem apagar: o git normal substitui ficheiros apagando-os, o que aqui falha a meio.
# Em vez disso, escrevemos cada ficheiro alterado por cima (sem apagar) e só depois mudamos o ponteiro do ramo.
if [ "$1" = "pull" ] && [ $# -eq 1 ]; then
  G fetch -q origin || exit 1
  clear_locks
  HEAD_=$(G rev-parse HEAD); NEW=$(G rev-parse origin/main)
  [ "$HEAD_" = "$NEW" ] && { echo "Já atualizado."; exit 0; }
  if ! G merge-base --is-ancestor HEAD origin/main; then
    if G merge-base --is-ancestor origin/main HEAD; then echo "Já atualizado (há commits locais por enviar)."; exit 0; fi
    echo "O PC e o GitHub divergiram: não junto sozinho. Regista e avisa." >&2; exit 2
  fi
  if ! G diff --quiet HEAD -- || ! G diff --cached --quiet; then
    for f in $(G diff --name-only HEAD); do
      if G diff --name-only HEAD origin/main | grep -qx "$f" && ! G diff --quiet origin/main -- "$f"; then echo "Alterações por guardar em $f, que também mudou no GitHub: não atualizo." >&2; exit 3; fi
    done
  fi
  G diff --name-status --no-renames HEAD origin/main | while IFS=$'\t' read -r st f; do
    case "$st" in
      D) [ -e "$f" ] && mkdir -p .git/stale/removidos && mv "$f" ".git/stale/removidos/$(echo "$f" | tr / _)-$(date +%s%N)";;
      *) mkdir -p "$(dirname "$f")"; G show "origin/main:$f" > "$f";;
    esac
  done
  G reset -q --mixed origin/main
  clear_locks
  echo "Atualizado para $(G log --oneline -1)"
  exit 0
fi
G "$@"
