# Sapatinho · guia para o Claude Code

Site grátis de amigo secreto por email, em português de Portugal: https://sapatinho-natal.pt
Dono: Diogo (não é programador; explica as coisas em linguagem simples e em português de Portugal).

## Estrutura

| Pasta | O que é |
| --- | --- |
| `site/` | Site estático (Cloudflare Pages, projeto `sapatinho-natal`). `sorteio.html` e `r.html` são a página do sorteio (iguais). `_headers` tem a CSP. `_redirects` envia `/r/*` para `r.html`. |
| `tools/seo/` | Gerador das páginas de conteúdo: `content.py` (texto dos guias), `build.py` (página inicial, FAQ, privacidade, sitemap, robots, dados estruturados). |
| `worker/` | API (Cloudflare Worker `sapatinho-api`, rota `sapatinho-natal.pt/api/*`): `POST /api/create`, `POST /api/confirm`, `GET /api/stats`. |
| `marketing/` | Redes sociais: `brief.md` (voz e regras), `content/part*.json` (publicações e stories até 20 dez), `render/` (gera as imagens), `build_cal.py` (calendário). |
| `tests/` | Testes locais da API: `node --test tests/*.test.mjs` |
| `scripts/` | `deploy-site.sh` e `deploy-worker.sh` |
| `gestao/` | `tarefas.md`: quem faz o quê e o quadro de tarefas até 20 dez (gerido pelo `/gestor`). |
| `private/` | **Não está no Git.** Páginas e notas privadas do Diogo. As regras estão em `CLAUDE.local.md` (também fora do Git). |

Agentes em `.claude/agents/`: `seo` (Google e conteúdo do site) e `social-media` (Facebook e Instagram).

**Gestor do projeto:** o comando `/gestor` põe o Claude a coordenar a equipa. Lê o quadro `gestao/tarefas.md`, entrega as tarefas ao `seo` e ao `social-media`, revê o trabalho contra as regras abaixo e diz ao Diogo o que precisa dele. É um comando e não um agente porque, no Claude Code, só a conversa principal consegue chamar os outros agentes.

## Como funciona (resumo técnico)

- Quem organiza preenche `/criar`. O worker faz o sorteio, assina cada link (`/r/<payload>.<HMAC>`) e envia os convites pelo Brevo.
- O payload é JSON ofuscado (XOR + base64url, **não é cifra**): grupo, limite, data, nome, quem saiu, lista de nomes. O email vai cifrado com AES-GCM no campo `x`. Links antigos (antes de 29 out 2026) têm o email em claro no campo `e` e têm de continuar a funcionar.
- Não há base de dados. O KV `STATS` guarda só: contagens anónimas por dia (`d:`), quota diária de emails (`q:`), código HMAC do IP por dia (`ip:`, 24 h) e marca de confirmação por link (`c:`, 12 h).
- As chaves de assinatura e de cifra derivam de `BREVO_API_KEY`. Mudar essa chave invalida todos os links já enviados.
- Brevo grátis: 300 emails/dia. O worker recusa sorteios acima de 260 emails/dia (`DAILY_EMAILS`) e segundos emails acima de 295.

## Deploy

Antes da primeira vez, o Diogo corre `npx wrangler@4 login` (o Claude nunca faz logins nem mexe em senhas).

- Site: `scripts/deploy-site.sh` (gera as páginas, aplica `private/` e publica). **Se `private/` não existir antes de 26 dez 2026, o script recusa**: publicar sem ela apagava páginas privadas que estão online.
- API: corre primeiro `node --test tests/*.test.mjs`, depois `scripts/deploy-worker.sh`.
- Depois de um deploy, confirma no site real (página alterada, `/r` com um link de teste, `/api/create` com nome inválido devolve 400).
- Faz deploy só quando o Diogo pedir ou aprovar. **Exceção:** o `/gestor` tem aprovação permanente do Diogo (30 out 2026) para juntar PRs e publicar o site e a API sozinho, seguindo as verificações de `.claude/commands/gestor.md`.

## Regras que não se quebram

1. **Conteúdo privado:** o que está em `private/` e em `CLAUDE.local.md` nunca vai para o GitHub, para o site público nem para as redes sociais. Nunca fazer commit dessas pastas nem de `LINKS-PRIVADO.txt`, e não copiar nada delas para ficheiros versionados.
2. **Só email.** O site envia os resultados por email. Não mencionar WhatsApp como forma de envio.
3. **Honestidade sobre privacidade.** A página de quem organiza **não mostra** os resultados, mas quem organiza tem os links de todos. Nunca escrever "quem organiza não vê / não consegue ver". Escrever "a página de quem organiza não mostra quem tirou quem". Não inventar números, testemunhos nem avaliações.
4. **Emails de teste** só para `sapatinhonatal+<algo>@gmail.com`. Nunca para o email pessoal do Diogo nem para pessoas reais.
5. **Secrets:** nunca escrever, pedir nem guardar chaves, senhas ou tokens. O Diogo mete-os no Cloudflare (`BREVO_API_KEY`, `STATS_TOKEN`).
6. **Segurança da API:** qualquer mudança no worker tem de manter: verificação de Origin; validação de nomes e grupo (`nameOk`, `groupOk`); reserva da quota antes de enviar; marca de 12 h antes de enviar; `Object.create(null)` no sorteio; escapar tudo nos emails. Corre os testes.
7. **Página do sorteio:** todos os campos do link passam por `Sap.safe()` e `esc()`. Só se aceitam links com assinatura (`código.assinatura`). Mantém a CSP em `site/_headers`.

## Escrita

- Português de Portugal: prenda, telemóvel, "tu". Nunca português do Brasil.
- Aspas «assim». Frases curtas e concretas, sem jargão de marketing.
- Links da Amazon (afiliado) com `rel="sponsored nofollow"`. Tag de afiliado: `sapatinhonata-21` (`AMAZON_TAG` em `tools/seo/build.py`).

## Datas importantes

- Pico de pesquisa de «amigo secreto» em Portugal: 30 nov a 10 dez. Conteúdo novo importante só até 15 nov.
- Redes sociais: 31 out a 20 dez.
- 26 dez 2026: `private/` deixa de ser precisa (ver `CLAUDE.local.md`).

## Pendentes conhecidos

- Brevo: o histórico de emails apaga-se ao fim de 1 mês e as pré-visualizações (conteúdo) não são guardadas. O registo de cliques (links reescritos para `sendibt3.com`) não se pode desligar no plano grátis; pode contribuir para os emails irem para o spam.
- Os limites guardados no KV não são atómicos. Já existe a regra de limite de pedidos do Cloudflare «Limite envio Sapatinho» (caminho contém `/api/`, 4 pedidos por 10 s por IP, bloqueio de 10 s; é a única permitida no plano grátis), que trava rajadas de um só IP. Rajadas de muitos IPs ao mesmo tempo ainda podem passar a quota; a solução completa seria um Durable Object.
- Separar a chave dos links de `BREVO_API_KEY` (novo secret `LINK_SECRET`, aceitando a chave antiga para verificar).
