# Sapatinho

**Amigo secreto online, grátis e por email.** Em produção em [sapatinho-natal.pt](https://sapatinho-natal.pt).

> **EN:** A free Secret Santa web app for Portuguese users. The organiser enters names and emails, the server draws the pairs and emails each participant a personal signed link. Static site on Cloudflare Pages, a small Cloudflare Worker API, transactional email through Brevo, and no database: each result is encoded and signed inside the participant's own link.

![Pré-visualização](site/og.jpg)

## O que faz

1. Quem organiza escreve o nome do grupo, o limite da prenda, a data da troca e os participantes (nome e email). Pode também indicar pares que não se podem tirar um ao outro, como casais ou irmãos.
2. O servidor faz o sorteio, garantindo que ninguém se tira a si próprio e que as exclusões são respeitadas, e envia a cada pessoa um convite por email.
3. Cada participante abre o seu link, carrega em "Sortear" e vê o resultado numa roleta animada.
4. Depois de sortear, recebe um segundo email com o nome que lhe saiu, para confirmar sempre que quiser.
5. Quem organiza fica com um link próprio para reenviar convites. Essa página não mostra os resultados; quem organiza só veria o resultado de alguém se abrisse o link dessa pessoa.

## Arquitetura

```
Navegador ──► Cloudflare Pages (site estático: site/)
     │
     └──► sapatinho-natal.pt/api/*  ──►  Cloudflare Worker (worker/worker.js)
                                              │
                                              └──► Brevo (envio de email)
```

- **Sem base de dados.** O resultado de cada participante vai no próprio link, codificado e assinado com HMAC-SHA256. Um link alterado à mão é rejeitado pelo servidor.
- **Privacidade por desenho.** Cada link só revela o resultado do seu dono. A página de quem organiza não mostra quem tirou quem (tem os links de todos, para reenviar convites, mas não os abre).
- **Email cifrado dentro do link.** O email de cada participante só serve para enviar o segundo email e vai no próprio link cifrado com AES-GCM: só o servidor o consegue ler. Ao abrir o link, a página tira o código do endereço (fica só `/r`), para não ficar no histórico nem nas estatísticas.
- **Só contagens anónimas.** O Worker guarda, num Workers KV, contagens por dia (sorteios, convites, quem já sorteou, faixa do limite, tamanho do grupo), sem nomes nem emails. Uma página privada (`/painel`) mostra-as através de `GET /api/stats`, protegido por um segredo.
- **Proteção contra abusos:**
  - origem dos pedidos verificada no Worker
  - limite de 3 a 30 participantes por sorteio
  - validação dos emails
  - regra de rate limiting na Cloudflare
- **Email autenticado.** O domínio tem SPF, DKIM e DMARC, para os emails chegarem à caixa de entrada.

## SEO

- 11 guias em português de Portugal: regras, como fazer o sorteio, roleta, ideias de prendas por preço (até 5 € e até 10 €), pistas, Black Friday, crianças, à distância e na empresa
- Dados estruturados schema.org: `WebApplication`, `Organization`, `Article`, `FAQPage` e `BreadcrumbList`
- `sitemap.xml` e `robots.txt`, com as páginas privadas dos sorteios fora do índice
- Imagem e texto de pré-visualização para WhatsApp e redes sociais

Os guias são gerados a partir de `tools/seo/content.py`.

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `site/` | Site estático: página inicial, criar sorteio, página do sorteio, link de organizador e guias |
| `worker/worker.js` | API: `POST /api/create` (sorteio e convites), `POST /api/confirm` (email com o resultado) e `GET /api/stats` (contagens anónimas) |
| `tools/seo/` | Gerador dos guias, do sitemap, dos dados estruturados e dos ícones |
| `marketing/` | Conteúdo das redes sociais (publicações e stories) e gerador das imagens |
| `tests/` | Testes da API, sem rede: `node --test tests/*.test.mjs` |
| `scripts/` | Deploy do site e da API com Wrangler |
| `.claude/` | Agentes do Claude Code: `seo` e `social-media` (ver `CLAUDE.md`) |

## Correr localmente

```bash
cd site
python3 -m http.server 8000
# abre http://localhost:8000
```

Criar sorteios precisa do Worker com o segredo `BREVO_API_KEY` configurado. O painel precisa também do segredo `STATS_TOKEN` e de um namespace KV ligado como `STATS`. Nenhuma chave fica neste repositório.

## Tecnologia

HTML, CSS e JavaScript sem frameworks · Cloudflare Pages, Workers, KV, Email Routing e Rate Limiting · Brevo (email transacional) · Python (gerador de páginas)
