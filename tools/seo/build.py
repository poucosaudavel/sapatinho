# -*- coding: utf-8 -*-
"""Builds the Sapatinho guide pages, sitemap and structured data into ../../site."""
import json, os, re, html
from content import PAGES, PUBLISHED, MODIFIED
import os as _os
PAGES = [p for p in PAGES if not p.get("draft") or _os.environ.get("SHOW_DRAFTS")]

import pathlib
SITE = str(pathlib.Path(__file__).resolve().parents[2] / "site")
BASE = "https://sapatinho-natal.pt"
ORG_ID = BASE + "/#organizacao"
SITE_ID = BASE + "/#site"

def ld(obj):
    s = json.dumps(obj, ensure_ascii=False, separators=(",", ":"))
    return '<script type="application/ld+json">' + s.replace("</", "<\\/") + "</script>"

def text(h):
    return html.unescape(re.sub(r"<[^>]+>", "", h)).strip()

# ---------------------------------------------------------------- afiliados
# Preenche depois da aprovação em afiliados.amazon.es (ex.: "sapatinho-21").
# Vazio = links normais, sem comissão.
AMAZON_TAG = os.environ.get("AMAZON_TAG", "")
AFF_NOTE = ('<p class="aff-note">Alguns links desta página são de afiliados: se comprares através deles, '
            'o Sapatinho pode receber uma pequena comissão, sem custo extra para ti. '
            'Como Associado da Amazon, o Sapatinho recebe por compras qualificadas.</p>')

def amz_url(q):
    from urllib.parse import quote_plus
    u = "https://www.amazon.es/s?k=" + quote_plus(q)
    return u + ("&tag=" + AMAZON_TAG if AMAZON_TAG else "")

def affiliate(body):
    """[[amz:termo de pesquisa|texto]] -> link Amazon de afiliado."""
    found = [False]
    def rep(m):
        found[0] = True
        q, label = m.group(1), m.group(2) or m.group(1)
        return f'<a href="{html.escape(amz_url(q))}" rel="sponsored nofollow noopener" target="_blank">{label}</a>'
    out = re.sub(r"\[\[amz:([^|\]]+)(?:\|([^\]]+))?\]\]", rep, body)
    return out, found[0]

def head(title, desc, canonical, og_title=None, og_desc=None, og_type="website", robots=None, jsonld=None, extra=""):
    og_title = og_title or title
    og_desc = og_desc or desc
    r = f'<meta name="robots" content="{robots}">\n' if robots else ""
    j = (ld(jsonld) + "\n") if jsonld else ""
    return f"""<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(desc)}">
{r}<link rel="canonical" href="{canonical}">
<meta name="theme-color" content="#0f2a22">
<meta property="og:type" content="{og_type}">
<meta property="og:site_name" content="Sapatinho">
<meta property="og:locale" content="pt_PT">
<meta property="og:title" content="{html.escape(og_title)}">
<meta property="og:description" content="{html.escape(og_desc)}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{BASE}/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Sapatinho, o amigo secreto da família sem papelinhos">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gloock&family=Instrument+Sans:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/styles.css?v=20261029b">
{j}{extra}"""

NAV = ('<nav aria-label="Principal"><a href="/#como-funciona">Como funciona</a>'
       '<a href="/regras-do-amigo-secreto/">Regras</a>'
       '<a href="/ideias-de-prendas-amigo-secreto/">Ideias de prendas</a>'
       '<a class="nav-cta" href="/criar">Criar sorteio</a></nav>')

HEADER = ('<header class="top">\n    <a class="logo" href="/"><img src="/favicon.svg" alt="" width="34" height="34">'
          '<b>Sapatinho<span>.</span></b></a>\n    ' + NAV + '\n  </header>')

FOOTER = """<footer class="foot rich">
    <div class="brand-col"><a class="logo" href="/"><img src="/favicon.svg" alt="" width="28" height="28"><b style="font-size:1.3rem">Sapatinho<span>.</span></b></a>
      <p>Amigo secreto online, grátis e por email. Cada pessoa recebe o seu link e descobre quem lhe saiu.</p></div>
    <div><h3>Sapatinho</h3><ul>
      <li><a href="/criar">Criar sorteio</a></li>
      <li><a href="/#entrar">Entrar no sorteio</a></li>
      <li><a href="/#como-funciona">Como funciona</a></li>
      <li><a href="/privacidade/">Privacidade</a></li>
    </ul></div>
    <div><h3>Guias</h3><ul>
""" + "\n".join(f'      <li><a href="/{p["slug"]}/">{p["short"]}</a></li>' for p in PAGES) + """
    </ul></div>
    <div class="legal"><span>© 2026 Sapatinho · sapatinho-natal.pt</span><span>Ajuda: ajuda@sapatinho-natal.pt</span></div>
  </footer>"""

CTA = """<div class="cta-box"><p><b>Pronto para sortear?</b>Cria o amigo secreto do teu grupo em dois minutos. É grátis e cada pessoa recebe o convite por email.</p><a class="btn" href="/criar">Criar sorteio</a></div>"""

ORG = {"@type": "Organization", "@id": ORG_ID, "name": "Sapatinho", "url": BASE + "/",
       "logo": {"@type": "ImageObject", "url": BASE + "/logo.png", "width": 512, "height": 512},
       "email": "ajuda@sapatinho-natal.pt"}
WEBSITE = {"@type": "WebSite", "@id": SITE_ID, "url": BASE + "/", "name": "Sapatinho",
           "alternateName": "Sapatinho · Amigo secreto online", "inLanguage": "pt-PT", "publisher": {"@id": ORG_ID}}

def page_shell(head_html, main_html, scripts=""):
    return f"""<!doctype html>
<html lang="pt-PT">
<head>
{head_html}</head>
<body>
<canvas id="snow" aria-hidden="true"></canvas>
<div class="wrap">
  {HEADER}
  <main>
{main_html}
  </main>
  {FOOTER}
</div>
<script src="/snow.js"></script>
{scripts}</body>
</html>
"""

def faq_html(faq):
    out = ['<h2 id="perguntas">Perguntas frequentes</h2>']
    for q, a in faq:
        out.append(f"<details><summary>{html.escape(q)}</summary><p>{a}</p></details>")
    return "\n".join(out)

def faq_ld(faq):
    return {"@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": text(a)}} for q, a in faq]}

def crumbs_ld(items):
    return {"@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": u} for i, (n, u) in enumerate(items)]}

BYSLUG = {p["slug"]: p for p in PAGES}

MESES = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]
def fmt_date(iso):
    y, m, d = iso.split("-")
    return f"{int(d)} de {MESES[int(m)-1]} de {y}"

def build_guide(p):
    url = f"{BASE}/{p['slug']}/"
    graph = [ORG, WEBSITE,
             {"@type": "Article", "@id": url + "#artigo", "headline": p["h1"], "description": p["description"],
              "inLanguage": "pt-PT", "datePublished": p.get("date", PUBLISHED), "dateModified": p.get("modified", p.get("date", PUBLISHED)),
              "author": {"@id": ORG_ID}, "publisher": {"@id": ORG_ID}, "image": BASE + "/og.jpg",
              "mainEntityOfPage": url, "isPartOf": {"@id": SITE_ID}},
             crumbs_ld([("Início", BASE + "/"), (p["short"], url)])]
    if p.get("faq"):
        graph.append(faq_ld(p["faq"]))
    h = head(p["title"], p["description"], url, og_title=p["h1"], og_type="article",
             jsonld={"@context": "https://schema.org", "@graph": graph})
    body, has_aff = affiliate(p["body"])
    if has_aff:
        body = AFF_NOTE + "\n" + body
    rel = "".join(f'<a href="/{s}/"><b>{BYSLUG[s]["short"]}</b><span>{BYSLUG[s]["card"]}</span></a>' for s in p["related"])
    main = f"""    <nav class="crumbs" aria-label="Estás aqui"><a href="/">Início</a><span aria-hidden="true">›</span><span>{p['short']}</span></nav>
    <div class="article-head">
      <div class="eyebrow">Guia do amigo secreto</div>
      <h1>{p['h1']}</h1>
      <p class="dek">{p['dek']}</p>
      <p class="meta">Atualizado a {fmt_date(p.get("modified", p.get("date", PUBLISHED)))}</p>
    </div>
    <article class="card article">
{body}
{faq_html(p['faq']) if p.get('faq') else ''}
{CTA}
    </article>
    <nav class="related" aria-label="Outros guias">{rel}</nav>"""
    os.makedirs(f"{SITE}/{p['slug']}", exist_ok=True)
    open(f"{SITE}/{p['slug']}/index.html", "w").write(page_shell(h, main))

PRIVACY_BODY = """
<p>Esta política explica que dados pessoais o Sapatinho trata, para quê e durante quanto tempo. O Sapatinho foi pensado para guardar o mínimo possível.</p>

<h2>Que dados tratamos</h2>
<ul>
<li><strong>Nomes e emails dos participantes,</strong> escritos por quem organiza o sorteio.</li>
<li><strong>O nome do grupo, o limite da prenda e a data da troca,</strong> se forem indicados.</li>
<li><strong>Dados técnicos de acesso</strong> (por exemplo o endereço IP), tratados pelo nosso fornecedor de alojamento para manter o site seguro e a funcionar.</li>
</ul>

<h2>Para que os usamos</h2>
<p>Usamos os nomes e os emails apenas para fazer o sorteio e enviar a cada participante o convite e, depois de sortear, o email com o resultado. Não enviamos publicidade, não vendemos dados e não os partilhamos com terceiros para fins comerciais.</p>

<h2>Onde ficam guardados</h2>
<p>O Sapatinho não tem uma base de dados com os sorteios. O resultado de cada participante fica codificado no seu link pessoal. Para enviar os emails usamos a Brevo, um serviço de envio de email, que guarda registos técnicos dos envios durante um período limitado. O site está alojado na Cloudflare.</p>
<p>No teu navegador, a página do sorteio guarda uma pequena indicação de que já sorteaste, para não repetir a animação. Essa informação fica só no teu dispositivo.</p>

<h2>Cookies</h2>
<p>O Sapatinho não usa cookies de publicidade nem de análise. Para saber quantas pessoas visitam o site usamos o Cloudflare Web Analytics, que não usa cookies e não identifica visitantes individualmente. Os nossos fornecedores podem usar cookies estritamente necessários para segurança.</p>
<p>Guardamos também contagens anónimas por dia (número de sorteios, de convites e de pessoas que já sortearam, faixa do limite da prenda e tamanho do grupo), sem nomes, emails nem resultados, para sabermos como o serviço é usado.</p>

<h2>Responsabilidade de quem organiza</h2>
<p>Quem cria um sorteio indica os emails de outras pessoas. Ao fazê-lo, confirma que essas pessoas aceitam participar e receber os emails do Sapatinho.</p>

<h2>Os teus direitos</h2>
<p>Podes pedir informação sobre os teus dados, a sua correção ou eliminação, escrevendo para <strong>ajuda@sapatinho-natal.pt</strong>. Se considerares que os teus direitos não foram respeitados, podes apresentar queixa à Comissão Nacional de Proteção de Dados (CNPD).</p>

<p class="note">Última atualização: 26 de outubro de 2026.</p>
"""

def build_privacy():
    url = BASE + "/privacidade/"
    h = head("Política de privacidade | Sapatinho", "Que dados pessoais o Sapatinho trata, para quê e durante quanto tempo, e como exercer os teus direitos.", url,
             jsonld={"@context": "https://schema.org", "@graph": [ORG, WEBSITE, crumbs_ld([("Início", BASE + "/"), ("Privacidade", url)])]})
    main = f"""    <nav class="crumbs" aria-label="Estás aqui"><a href="/">Início</a><span aria-hidden="true">›</span><span>Privacidade</span></nav>
    <div class="article-head"><h1>Política de privacidade</h1></div>
    <article class="card article">
{PRIVACY_BODY}
    </article>"""
    os.makedirs(f"{SITE}/privacidade", exist_ok=True)
    open(f"{SITE}/privacidade/index.html", "w").write(page_shell(h, main))

# ---------------------------------------------------------------- existing pages
HOME_FAQ = [
("O que é o amigo secreto?", 'É uma troca de prendas em que cada pessoa tira à sorte o nome de outra e lhe oferece uma única prenda, sem revelar quem lhe saiu até ao dia da troca. Explicamos tudo nas <a href="/regras-do-amigo-secreto/">regras do amigo secreto</a>.'),
("Como funciona o amigo secreto online por email?", 'Quem organiza escreve os nomes e os emails do grupo, o limite da prenda e a data. O Sapatinho faz o sorteio e envia a cada pessoa um convite com um link só seu. Cada um abre o link, roda a roleta e recebe um segundo email com o nome que lhe saiu. <a href="/criar">Criar sorteio</a>.'),
("O amigo secreto online é mesmo grátis?", "Sim. Criar o sorteio e enviar os convites não custa nada, não precisa de registo e não há versão paga."),
("Tem roleta?", 'Tem. Cada pessoa roda a sua <a href="/roleta-amigo-secreto/">roleta do amigo secreto</a> no telemóvel e só ela vê o nome em que a roleta pára.'),
("Dá para impedir que casais ou irmãos se tirem um ao outro?", "Sim. Ao criar o sorteio, indicas os pares que não se podem tirar e o sorteio respeita-os."),
("Posso fazer o sorteio mais do que uma vez?", "Não. O sorteio é feito uma única vez para cada participante. Se voltares a abrir o link, vês o mesmo resultado."),
("Quem organiza fica a saber os resultados?", "Não, desde que não abra os links dos outros. Cada resultado só aparece a quem abre o seu link."),
("Posso sair-me a mim próprio?", "Não. O teu nome nunca entra no teu sorteio."),
("Dá para fazer amigo secreto à distância?", 'Sim. O sorteio é por email, por isso ninguém precisa de estar junto. Vê o guia do <a href="/amigo-secreto-a-distancia/">amigo secreto à distância</a>.'),
("Não recebi o email. E agora?", "Procura na pasta de spam ou promoções por um email do Sapatinho. Se não estiver lá, pede a quem organizou para te reenviar o convite. O teu resultado não se perde."),
("Quantas pessoas podem participar?", "Entre 3 e 30 pessoas por sorteio. Para grupos maiores, como empresas, faz um sorteio por equipa."),
]

def patch_home():
    f = f"{SITE}/index.html"
    h = open(f).read()
    title = "Amigo secreto online grátis, por email · Sapatinho"
    desc = "Faz o sorteio do amigo secreto online, grátis e sem registo. Cada pessoa recebe por email o seu link pessoal e descobre quem lhe saiu. Ninguém se tira a si próprio."
    graph = [ORG, WEBSITE,
             {"@type": "WebApplication", "@id": BASE + "/#app", "name": "Sapatinho", "url": BASE + "/criar",
              "description": "Sorteio de amigo secreto online, com convites e resultados enviados por email.",
              "applicationCategory": "LifestyleApplication", "operatingSystem": "Qualquer navegador", "inLanguage": "pt-PT",
              "isAccessibleForFree": True, "offers": {"@type": "Offer", "price": "0", "priceCurrency": "EUR"},
              "publisher": {"@id": ORG_ID}},
             faq_ld(HOME_FAQ)]
    newhead = head(title, desc, BASE + "/", og_title="Sapatinho · Amigo secreto sem papelinhos",
                   og_desc="Cria o amigo secreto do teu grupo. Cada pessoa recebe por email o seu link pessoal e descobre quem lhe saiu.",
                   jsonld={"@context": "https://schema.org", "@graph": graph})
    h = re.sub(r"<head>.*?<style>", "<head>\n" + newhead + "<style>", h, count=1, flags=re.S)
    h = re.sub(r'<header class="top">.*?</header>', HEADER, h, count=1, flags=re.S)
    h = re.sub(r'<footer class="foot.*?</footer>', FOOTER, h, count=1, flags=re.S)
    h = h.replace('<div class="eyebrow">Amigo secreto · Natal 2026</div>', '<div class="eyebrow">Amigo secreto online · grátis</div>')
    h = h.replace("Cria o sorteio do teu grupo e cada pessoa recebe por email o seu link pessoal para descobrir quem lhe saiu. Mais ninguém vê.",
                  "Faz o sorteio do amigo secreto online. Cada pessoa recebe por email o seu link pessoal e descobre quem lhe saiu. Mais ninguém vê.")
    # FAQ rebuilt from HOME_FAQ so it matches the structured data
    faq = "\n".join(f"        <details><summary>{html.escape(q)}</summary><p>{a}</p></details>" for q, a in HOME_FAQ)
    h = re.sub(r'<div class="faq">.*?</div>\n    </section>', '<div class="faq">\n' + faq + '\n      </div>\n    </section>', h, count=1, flags=re.S)
    # guides section before the FAQ
    if 'id="guias"' not in h:
        cards = "".join(f'<a href="/{p["slug"]}/"><b>{p["short"]}</b><span>{p["card"]}</span></a>' for p in PAGES)
        guides = f"""    <section id="guias">
      <div class="section-h">
        <div class="eyebrow">Guias</div>
        <h2>Tudo para organizar o amigo secreto</h2>
      </div>
      <nav class="related" style="max-width:none;margin:0" aria-label="Guias">{cards}</nav>
    </section>

"""
        h = h.replace('    <section id="perguntas">', guides + '    <section id="perguntas">', 1)
    else:
        cards = "".join(f'<a href="/{p["slug"]}/"><b>{p["short"]}</b><span>{p["card"]}</span></a>' for p in PAGES)
        h = re.sub(r'(<nav class="related" style="max-width:none;margin:0" aria-label="Guias">).*?(</nav>)', lambda m: m.group(1) + cards + m.group(2), h, count=1, flags=re.S)
    h = h.replace(".faq details p{color:var(--soft);margin-top:10px;max-width:60ch}",
                  ".faq details p{color:var(--soft);margin-top:10px;max-width:60ch}\n.faq details p a{color:var(--paper)}")
    open(f, "w").write(h)

def patch_criar():
    f = f"{SITE}/criar.html"
    h = open(f).read()
    title = "Criar amigo secreto online · Sorteio grátis por email | Sapatinho"
    desc = "Cria o sorteio do amigo secreto em dois minutos: escreve os nomes e os emails, define o limite da prenda e quem não se pode tirar. Grátis e sem registo."
    graph = [ORG, WEBSITE, crumbs_ld([("Início", BASE + "/"), ("Criar sorteio", BASE + "/criar")])]
    newhead = head(title, desc, BASE + "/criar", og_title="Criar um amigo secreto · Sapatinho",
                   og_desc="Escreve os nomes e os emails, carrega em sortear e cada pessoa recebe o convite. Grátis e sem registo.",
                   jsonld={"@context": "https://schema.org", "@graph": graph})
    h = re.sub(r"<head>.*?<style>", "<head>\n" + newhead + "<style>", h, count=1, flags=re.S)
    h = re.sub(r'<header class="top">.*?</header>', HEADER.replace('<a class="nav-cta" href="/criar">Criar sorteio</a>', '<a href="/#entrar">Entrar no sorteio</a>'), h, count=1, flags=re.S)
    h = re.sub(r'<footer class="foot.*?</footer>', FOOTER, h, count=1, flags=re.S)
    h = h.replace('<div class="eyebrow">Criar sorteio</div>', '<div class="eyebrow">Criar amigo secreto online</div>')
    open(f, "w").write(h)

def patch_private(path, title):
    """Draw, organiser and 404 pages: never indexed."""
    f = f"{SITE}/{path}"
    h = open(f).read()
    if 'name="robots"' not in h:
        h = h.replace("<title>", '<meta name="robots" content="noindex">\n<title>', 1)
    else:
        h = re.sub(r'<meta name="robots" content="[^"]*">', '<meta name="robots" content="noindex, nofollow">', h)
    if "theme-color" not in h:
        h = h.replace("<title>", '<meta name="theme-color" content="#0f2a22">\n<title>', 1)
    open(f, "w").write(h)

def write_404():
    h = head("Página não encontrada · Sapatinho", "Esta página não existe.", BASE + "/", robots="noindex")
    main = """    <div class="article-head" style="padding-block:60px">
      <div class="eyebrow">Erro 404</div>
      <h1>Esta página não existe</h1>
      <p class="dek">Se vieste de um convite, confirma que abriste o link completo do email.</p>
      <p><a class="btn" href="/">Voltar ao início</a></p>
    </div>"""
    open(f"{SITE}/404.html", "w").write(page_shell(h, main))

def write_sitemap():
    urls = [("/", "1.0", "weekly", MODIFIED), ("/criar", "0.9", "monthly", PUBLISHED)]
    urls += [(f"/{p['slug']}/", "0.8", "monthly", p.get("modified", p.get("date", PUBLISHED))) for p in PAGES]
    urls += [("/privacidade/", "0.3", "yearly", PUBLISHED)]
    body = "\n".join(f"  <url><loc>{BASE}{u}</loc><lastmod>{lm}</lastmod><changefreq>{c}</changefreq><priority>{pr}</priority></url>" for u, pr, c, lm in urls)
    open(f"{SITE}/sitemap.xml", "w").write(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{body}\n</urlset>\n')
    open(f"{SITE}/robots.txt", "w").write(f"""User-agent: *
Allow: /
Disallow: /r/
Disallow: /r$
Disallow: /org
Disallow: /api/
Disallow: /painel

Sitemap: {BASE}/sitemap.xml
""")

if __name__ == "__main__":
    for p in PAGES:
        build_guide(p)
    build_privacy()
    patch_home()
    patch_criar()
    for path in ["sorteio.html", "r.html", "org.html"]:
        patch_private(path, None)
    write_404()
    write_sitemap()
    print("ok")
