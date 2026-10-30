"""Merge content parts, add countdown stories, render images, write calendar data."""
import json, datetime as dt, subprocess, os, sys, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = f"{ROOT}/out"
parts = sorted(glob.glob(f"{ROOT}/content/part*.json"))
days = []
for p in parts:
    days += json.load(open(p))["days"]
days.sort(key=lambda d: d["date"])
DOW = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"]
XMAS = dt.date(2026, 12, 25)

import re
def q(t):
    if not isinstance(t, str): return t
    t = re.sub(r'"([^"]+)"', r'«\1»', t)
    return re.sub(r"(^|[\s(])'([^']+)'", r"\1«\2»", t)
def fixq(o):
    for k in ("title", "body", "kicker", "text", "item"):
        if k in o: o[k] = q(o[k])
    if "items" in o: o["items"] = [q(x) for x in o["items"]]
    if "options" in o: o["options"] = [q(x) for x in o["options"]]
    return o

jobs, data = [], []
seed = 1
for d in days:
    date = dt.date.fromisoformat(d["date"])
    n = (XMAS - date).days
    day = {"date": d["date"], "dow": DOW[date.weekday()], "phase": d.get("phase", ""), "feed": [], "stories": []}
    for post in d["feed"]:
        post["pillar"] = {"interacao": "interação", "ideias de prendas": "ideias"}.get(post["pillar"], post["pillar"])
        imgs = []
        tot = len(post["slides"])
        for i, sl in enumerate(post["slides"]):
            fixq(sl)
            rel = f"img/{d['date']}/{post['id'][-1]}-{i+1}.jpg"
            jobs.append({"out": f"{OUT}/{rel}", "kind": "feed", "idx": i, "total": tot, "seed": seed, "data": sl})
            imgs.append(rel)
        seed += 1
        day["feed"].append({**{k: post[k] for k in ("id", "time", "pillar", "caption", "hashtags")},
                            "link": post.get("link", ""), "images": imgs, "format": "carrossel" if tot > 1 else "imagem"})
    stories = [{"time": "08:30", "type": "contagem", "n": n}] + d["stories"]
    for j, st in enumerate(stories):
        fixq(st)
        img = None
        if st["type"] != "partilha":
            img = f"img/{d['date']}/st{j+1}.jpg"
            jobs.append({"out": f"{OUT}/{img}", "kind": "story", "seed": seed + j, "data": st})
        day["stories"].append({**st, "image": img})
    day["stories"].sort(key=lambda s: s["time"])
    data.append(day)

jobs.append({"out": f"{OUT}/img/perfil/foto-perfil.png", "kind": "profile"})
jobs.append({"out": f"{OUT}/img/perfil/capa-facebook.png", "kind": "cover"})
os.makedirs(OUT, exist_ok=True)
json.dump(jobs, open(f"{ROOT}/jobs.json", "w"), ensure_ascii=False)
json.dump({"days": data}, open(f"{OUT}/data.json", "w"), ensure_ascii=False, separators=(",", ":"))
print(len(days), "days,", sum(len(d["feed"]) for d in data), "posts,", sum(len(d["stories"]) for d in data), "stories,", len(jobs), "images")
if "--render" in sys.argv:
    subprocess.run(["node", f"{ROOT}/render/render.js", f"{ROOT}/jobs.json"], check=True)

# A página do calendário (viewer.html) lê out/data.json e as imagens em out/img.
import shutil
shutil.copy(f"{ROOT}/viewer.html", f"{OUT}/index.html")
