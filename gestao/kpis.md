# KPIs e objetivos do Sapatinho até 20 dez 2026

Gerido pelo gestor (`/gestor`). Revê-se **todas as segundas-feiras** com os números que o Diogo enviar. Atualizado a 30 out 2026; números de 19 nov 2026 (analista).

Regra: só há metas com número quando há dados reais por trás. As metas de resultado ficam «a definir» até haver a primeira medição; os valores do `seo.md` são estimativas e estão marcados como tal.

Estado: **em linha**, **em risco** (a meta falha se nada mudar), **falhou**, **cumprido**, **sem dados**.

## 1. Trabalho (depende de nós; metas firmes)

| KPI | Meta | Prazo | Atual (30 out) | Estado |
| --- | --- | --- | --- | --- |
| Páginas novas ou melhoradas publicadas no site | 8 (/criar, engraçadas, 20 €, 15 €, colegas no guia da empresa, última hora, homem, mulher) | 15 nov | 3 prontas (/criar, engraçadas, 20 €), à espera do deploy | em linha |
| Dessas páginas, com indexação pedida no Search Console | 8 de 8, no dia em que são publicadas | 15 nov | 0 | em linha |
| Dias com publicações agendadas no Meta | todos os dias de 31 out a 20 dez (51 dias) | nov: 2 nov; dez: ~21 nov | sem dados | sem dados |
| Links reais de outros sites para o Sapatinho | 10 a 15 | 30 nov | 12 nov: **1 publicado** (TechBit, artigo de 9 nov, 4 links sem nofollow) | em risco |
| Revisão de preços em todos os guias | feita | 1 dez | por fazer | em linha |

## 2. Resultados (dependem do Google e das pessoas)

| KPI | Fonte (quem envia) | Meta | Prazo | Atual | Estado |
| --- | --- | --- | --- | --- | --- |
| Cliques do Google | Search Console (Diogo) | cerca de 1 000 entre 1 e 20 dez (**estimativa** do `seo.md`; revê-se a 16 nov) | 20 dez | 19 nov: **11–17 nov 0 cliques / 7 impressões** (dados do Search Console só até 17 nov; por dia 10 nov 4/28, 11 0/0, 12 0/0, 13 0/3, 14 0/1, 15 0/0, 16 0/3, 17 0/0). Sem recuperação. 28 dias (com dados de 25 out a 17 nov): 59 / 1,5 mil / 3,9 % / 12,1. Cloudflare 7 dias: google.com 2 páginas vistas | em linha (cedo) |
| Pesquisas na primeira página (posição média ≤ 10) | Search Console (Diogo) | 10 (**estimativa** do `seo.md`; revê-se a 16 nov) | 1 dez | 4 (28 out–3 nov): «prendas engraçadas até 5€» 8,5 (4 cliques), «prendas amigo secreto engraçadas» 9,0, «roleta amigo secreto» 9,3, «roleta de amigo secreto» 7,3. «prendas amigo secreto» 44,7; guia de ideias 39,1 | em linha (cedo) |
| Sorteios feitos por semana | `/painel` (Diogo) | a definir a 16 nov, a partir das semanas de novembro | 20 dez | 19 nov ~8:00 (painel): **semana 16–22 nov: 3 reais até agora** (16 nov 2 / 41 convites, 17 nov 1 / 9, 18 nov 0, 19 nov 1 / 3 = teste do suporte «Teste entrega 19 nov», descontado). Semana 9–15 nov: 5 reais. Total do painel 24 / 157 / 146 sortearam (93 %), com testes | sem dados (meta pelo gestor)
| Convites abertos e sorteados (sorteados ÷ convites) | `/painel` (Diogo) | a definir a 16 nov | 20 dez | 19 nov: painel **93 %** (146 de 157, com os testes; 18 nov ~7:55 94 %). Conta pelo dia em que a pessoa sorteia | sem dados (meta a 16 nov) |
| Cliques nos links da Amazon | Amazon Associados (Diogo) | a definir a 16 nov | 20 dez | 19 nov: **15 cliques em novembro** (1–18 nov: 2/11 2, 6/11 1, 7/11 2, 9/11 4, 11/11 2, 13/11 2, 15/11 1, 18/11 1), 16 nos últimos 30 dias, 0 pedidos. Por código: sem dados (não lido; o filtro devolvia 0 nas leituras anteriores) | sem dados (meta a 16 nov) |
| Ganhos de afiliados | Amazon Associados (Diogo) | a definir a 16 nov | 20 dez | 19 nov: 0,00 € em novembro (Amazon, 0 pedidos, atualizado 19 nov 02:42 CET). Awin: sem dados (não aberto) | em risco |
| Cliques no link (bio, stories, Facebook) | Meta Business Suite (Diogo) | a definir a 16 nov | 20 dez | 12 nov: cliques em ligações sem dados (não aparecem na visão geral). FB 30 dias (13 out–11 nov): 40 visualizações, 12 visualizadores, 107 visitas, 1 seguidor | em risco |

## 3. Alarmes (evitam perder visitas)

| Alarme | Fonte | Quando dispara | O que se faz |
| --- | --- | --- | --- |
| Limite do Brevo | `/painel` (emails por dia) | mais de 200 emails num dia, dois dias seguidos | O gestor avisa o Diogo para pagar o Brevo desse mês e prepara a subida de `DAILY_EMAILS` (testes + aprovação) |
| Página nova sem aparecer no Google | Search Console | 14 dias depois de publicada sem impressões | O `seo` revê a página e o Diogo volta a pedir a indexação |
| Pouco clique no Google | Search Console | página com muitas impressões e menos de 1 % de cliques | O `seo` reescreve título e descrição |

## Como se garante que se cumpre

1. **À segunda-feira** o Diogo envia (pode ser uma fotografia do ecrã): Search Console dos últimos 7 dias (cliques, impressões, pesquisas e páginas), `/painel` (sorteios e emails por dia), Amazon Associados (cliques e ganhos da semana) e Meta (alcance e cliques no link).
2. O gestor atualiza as tabelas acima e marca o estado de cada KPI.
3. Cada KPI **em risco** ou **falhou** recebe uma ação concreta no `gestao/tarefas.md`, com dono e data.
4. **16 nov:** com duas semanas de dados, o gestor põe número nas metas «a definir» e confirma ou corrige as estimativas.
5. O resumo ao Diogo diz sempre: o que está em linha, o que está em risco e o que se vai fazer.

## Medições reais (lidas pela rotina das 10:40, passadas ao gestor a 6 nov)

Só números lidos nas fontes, com a data em que foram lidos. As tabelas acima ficam para o gestor marcar estados à segunda.

| Indicador | Valor | Período | Fonte | Lido a |
| --- | --- | --- | --- | --- |
| Cliques do Google | 20 | 28 out a 3 nov | Search Console | 5 e 6 nov (não mudou) |
| Impressões | 492 | 28 out a 3 nov | Search Console | 5 e 6 nov |
| CTR média | 4,1 % | 28 out a 3 nov | Search Console | 5 e 6 nov |
| Posição média | 12,7 | 28 out a 3 nov | Search Console | 5 e 6 nov |
| Pesquisa com mais cliques | «prendas engraçadas para amigo secreto até 5€»: 4 cliques, 49 impressões, posição 8,5 | 28 out a 3 nov | Search Console | 5 nov |
| Páginas com mais impressões | /regras-do-amigo-secreto/ 87 (posição 6,4; CTR 1,1 %), /prendas-engracadas-amigo-secreto/ 85, /ideias-de-prendas-amigo-secreto/ 72 (posição 39,1) | 28 out a 3 nov | Search Console | 5 nov |
| Sorteios criados (total) | 10 | até 5 nov | `/painel` | 5 nov, 10:50 |
| Convites enviados (total) | 51 | até 5 nov | `/painel` | 5 nov |
| Pessoas que já sortearam | 37 (73 %) | até 5 nov | `/painel` | 5 nov |
| Pessoas por sorteio | 5,1 | até 5 nov | `/painel` | 5 nov |
| Sorteios por dia | 30 out: 3 · 31 out: 1 · 2 nov: 3 · 3 nov: 1 · 4 nov: 1 · 5 nov (até 10:50): 1 | 30 out a 5 nov | `/painel` | 5 nov |
| Sorteio de teste | +1 sorteio e 3 convites («Teste spam 6 nov», emails sapatinhonatal+spam1/2/3); descontar | 6 nov, 15:07 | criado pela rotina | 6 nov |
| Cliques na Amazon | 2 | novembro até 6 nov | Amazon Afiliados | 6 nov |
| Ganhos da Amazon | 0,00 € (0 pedidos) | novembro até 6 nov | Amazon Afiliados | 6 nov |
| Seguidores Facebook | 1 | 6 nov | Meta Business Suite | 6 nov |
| Seguidores Instagram | 1 | 6 nov | Meta Business Suite | 6 nov |
| Facebook: visualizações / visualizadores / interações / cliques em ligações / visitas | 37 / 9 / 0 / 0 / 63 | 29 out a 4 nov | Meta Business Suite | 5 nov |
| Instagram: visualizações / visualizadores / interações | 40 / 2 / 2 | 29 out a 4 nov | Meta Business Suite | 5 nov |
| Emails de backlinks | 22 enviados, 7 lembretes, 5 agendados, 0 respostas, 0 links | 30 out a 6 nov | Gmail sapatinhonatal | 6 nov |
| Backlinks publicados | 1 (TechBit, artigo de 9 nov, 4 links sem nofollow) | até 11 nov | Gmail sapatinhonatal + página do artigo | 11 nov, 19:50 |
| Awin | 9 lojas pendentes, 0 aprovadas, 0 recusadas | pedidos de 31 out | Awin | 5 nov |
| Teste de entrega dos convites | 3 de 3 na Caixa principal, 0 no Spam | 6 nov | Gmail sapatinhonatal | 6 nov |
| Cliques / impressões / CTR / posição (Google) | 25 / 612 / 4,1 % / 12 | 29 out a 4 nov | Search Console | 7 nov, ~7:50 |
| Pesquisa com mais cliques | «prendas engraçadas para amigo secreto até 5€»: 4 cliques, 53 impressões | 29 out a 4 nov | Search Console | 7 nov |
| Sorteios / convites / sortearam (painel, com testes) | 13 / 60 / 39 (65 %) | até 7 nov, ~7:50 | `/painel` | 7 nov |
| Sorteios reais (sem os 3 testes de 6 nov) | total 10 sorteios, 51 convites; 31 out–6 nov: 7; 6 nov: 0; 7 nov: 0 até ~7:50 | 30 out a 7 nov | `/painel` | 7 nov |
| Cliques na Amazon | 3 em novembro (4 nos últimos 30 dias), 0 pedidos, 0,00 € | até 7 nov | Amazon Afiliados | 7 nov |
| Cliques / impressões / CTR / posição (Google) | 31 / 992 / 3,1 % / 11,7 (semana anterior 26 out–1 nov: 9 / 276 / 3,3 % / 14,1) | 2 a 8 nov | Search Console | 9 nov, ~9:10 |
| Google por página (cliques / impressões / CTR / posição) | /prendas-amigo-secreto-ate-5-euros/ 8 / 145 / 5,5 % / 8,5 · /prendas-engracadas-amigo-secreto/ 6 / 134 / 4,5 % / 9,7 · /criar 5 / 40 / 12,5 % / 11,3 · /regras-do-amigo-secreto/ 0 / 166 / 0 % / 8,3 · /ideias-de-prendas-amigo-secreto/ 0 / 134 / 0 % / 28,6 · /prendas-amigo-secreto-colegas/ 2 / 71 / 2,8 % / 8,2 · /roleta-amigo-secreto/ 0 / 66 / 0 % / 8,2 | 2 a 8 nov | Search Console | 9 nov |
| CTR e posição de 4 a 8 nov (pedido do seo) | /regras-do-amigo-secreto/ 0 cliques, 130 impressões, CTR 0 %, posição 8,6 · /prendas-engracadas-amigo-secreto/ 4 / 109 / 3,7 % / 10,1 · /ideias-de-prendas-amigo-secreto/ 0 / 111 / 0 % / 27,7. Total do site 4–8 nov: 19 / 770 / 2,5 % / 11,7 | 4 a 8 nov | Search Console | 9 nov |
| Pesquisas com mais impressões | «prendas engraçadas para amigo secreto até 5€» 4 cliques / 46 / posição 9,5 · «prendas amigo secreto» 0 / 21 / 30,6 · «ideias prendas amigo secreto» 0 / 16 / 27,8 · «ideias prenda amigo secreto» 0 / 14 / 32,6 · «roleta de amigo secreto» 0 / 9 / 8,7 · «roleta amigo secreto» 0 / 8 / 9,0 · «prendas engraçadas para amigo secreto até 10€» 1 / 5 / 13,4 | 2 a 8 nov | Search Console | 9 nov |
| Páginas do sitemap sem impressões | /prendas-ultima-hora-amigo-secreto/ (publicada 31 out; 0 impressões de 26 out a 8 nov), /troca-de-prendas-natal/ (publicada 3 nov), /guias/, /como-funciona-o-sapatinho-privacidade/ | 26 out a 8 nov | Search Console + `site/sitemap.xml` | 9 nov |
| Sorteios por dia (painel, com testes) | 30 out 3 · 31 out 1 · 2 nov 3 · 3 nov 1 · 4 nov 1 · 5 nov 1 · 6 nov 3 (todos teste) · 7 e 8 nov 0. Totais do painel: 13 sorteios / 60 convites / 39 sortearam | 30 out a 8 nov | `/painel` | 9 nov, ~9:05 |
| Sorteios reais (sem os 3 testes de 6 nov, 9 convites) | 2–8 nov: 6 sorteios, 34 convites, 27 sortearam (79 %). 30 out–1 nov: 4 / 17 / 10. Total: 10 / 51 / 37 (73 %) | 30 out a 8 nov | `/painel` | 9 nov |
| Emails por dia | o painel não mostra emails por dia; convites por dia no máximo 14 (30 out); 2–8 nov no máximo 13 (2 nov) | 30 out a 8 nov | `/painel` | 9 nov |
| Amazon | 5 cliques em novembro, 0 pedidos, 0,00 €; 6 cliques nos últimos 30 dias (10 out–8 nov). Aviso fiscal por concluir | 1 a 8 nov | Amazon Afiliados (atualizado 9 nov 02:37) | 9 nov |
| Meta | FB visualizadores 8, IG alcance 4, 45 conteúdos (13 publicações FB, 20 histórias FB, 12 publicações IG). 30 dias: FB 40 visualizações, 12 visualizadores, 97 visitas, 1 interação, 1 seguidor. Cliques em ligações: sem dados | 1 a 7 nov | Meta Business Suite | 9 nov |
| Awin | sem dados: pede login do Diogo | — | Awin | 9 nov |
| Sorteios por dia (painel) | 9 nov 2 (1 real + 1 teste) · 10 nov 2 (13 convites, 13 sortearam) · 11 nov 0 até ~9:20. Totais do painel 17 / 84 / 62 (74 %); reais 13 sorteios / 72 convites | 30 out a 11 nov | `/painel` | 11 nov, ~9:20 |
| Cliques / impressões / CTR / posição (Google) | 39 / ~1,08 mil / 3,6 % / 11,4 (2–8 nov: 31 / 992 / 3,1 % / 11,7) | 3 a 9 nov | Search Console | 11 nov, ~9:25 |
| /regras-do-amigo-secreto/ | 1 clique / 189 impressões (~0,5 %) | 3 a 9 nov | Search Console | 11 nov |
| Brevo | 80 enviados, 100 % entregues, 0 % devoluções e queixas, aberturas ~53 % | 4 a 11 nov | Brevo | 11 nov, ~9:45 |
| Awin | 8 pendentes, 0 aprovadas, Worten recusada | pedidos de 31 out | Awin | 11 nov |
| Amazon | sem dados (página de erro no Chrome) | — | Amazon Afiliados | 11 nov |
| Cliques / impressões / CTR / posição (Google) | 38 / 999 / 3,8 % / 11,4 (28 out–3 nov: 20 / 492 / 4,1 % / 12,7 → +90 % cliques) | 4 a 10 nov | Search Console | 12 nov, ~7:55 |
| Google por página (cliques / impressões / CTR / posição) | /prendas-amigo-secreto-ate-5-euros/ 9 / 147 / 6,1 % / 7,9 · /prendas-engracadas-amigo-secreto/ 6 / 134 / 4,5 % / 10,0 · /ideias-de-prendas-amigo-secreto/ 4 / 146 / 2,7 % / 26,4 · /pistas-e-mensagens-amigo-secreto/ 3 / 51 / 5,9 % / 12,6 · / 3 / 40 / 7,5 % / 8,6 · /regras-do-amigo-secreto/ 2 / 172 / 1,2 % / 8,5 · /prendas-amigo-secreto-colegas/ 2 / 72 / 2,8 % / 8,1 · /roleta-amigo-secreto/ 1 / 54 / 1,9 % / 7,1 · /prendas-amigo-secreto-homem/ 0 / 42 / 0 % / 12,7 · /prendas-amigo-secreto-ate-10-euros/ 0 / 31 / 0 % / 9,9 · /prendas-amigo-secreto-ate-15-euros/ 0 / 28 / 0 % / 7,4 · /prendas-amigo-secreto-ate-20-euros/ 0 / 19 / 0 % / 4,8 · /prendas-ultima-hora-amigo-secreto/ 0 / 1 / 0 % / 8,0 | 4 a 10 nov | Search Console | 12 nov |
| Pesquisas com mais impressões | «prendas engraçadas para amigo secreto até 5€» 2 / 29 / posição 9,0 · «prendas amigo secreto» 0 / 21 / 30,4 · «ideias prendas amigo secreto» 0 / 17 / 26,3 · «ideias prenda amigo secreto» 0 / 14 / 31,7 · «ideias originais para amigo secreto» 0 / 9 / 33,9 · «roleta de amigo secreto» 0 / 8 / 8,3 · «prendas engraçadas para amigo secreto até 10€» 1 / 8 / 13,4 · «prendas para homem até 10€» 0 / 4 / 8,5 · «ideias para amigo secreto no trabalho» 0 / 4 / 9,5 · «prendas engraçadas para colegas de trabalho» 0 / 4 / 11,3 | 4 a 10 nov | Search Console | 12 nov |
| Páginas do sitemap sem impressões | /troca-de-prendas-natal/ (publicada 3 nov; 14 dias a 17 nov), /como-funciona-o-sapatinho-privacidade/. /prendas-ultima-hora-amigo-secreto/ já teve 1 impressão | 4 a 10 nov | Search Console | 12 nov |
| Indexação | 25 indexadas, 9 não indexadas: 4 bloqueadas pelo robots.txt, 3 «página alternativa com etiqueta canónica correta», 1 redirecionamento, 1 404 (validação iniciada). As 3 canónicas são /?utm_source=techbitpt, /criar?utm_source=techbitpt e /amigo-secreto-na-empresa/?utm_source=techbitpt (rastreadas a 9 nov; vêm do artigo da TechBit; o Google usa a canónica sem `?utm`, está correto) | até 12 nov | Search Console | 12 nov |
| Sorteios por dia (painel, com testes) | 9 nov 2 / 11 convites (1 teste, 3 convites) · 10 nov 2 / 13 · 11 nov 1 / 14 · 12 nov 1 / 3 (teste do suporte «Teste entrega 12 nov»). Totais do painel 19 / 101 / 71 (70 %); reais 14 sorteios / 86 convites / 69 sortearam (80 %) | 30 out a 12 nov | `/painel` | 12 nov, ~8:00 |
| Emails por dia | o painel não mostra emails por dia; convites por dia no máximo 14 (11 nov). Sem alarme do Brevo | 30 out a 12 nov | `/painel` | 12 nov |
| Amazon | 11 cliques em novembro, 0 pedidos, 0,00 €; 12 cliques nos últimos 30 dias. Aviso: faltam as informações de pagamento do titular | 1 a 12 nov | Amazon Afiliados (atualizado 12 nov) | 12 nov |
| Awin | sem dados: pede login do Diogo | — | Awin | 12 nov |
| Meta (Facebook) | 40 visualizações, 12 visualizadores, 107 visitas, 1 seguidor; cliques em ligações: sem dados | 13 out a 11 nov | Meta Business Suite | 12 nov |
| Sorteios por dia (painel, com testes) | 9 nov 2 / 11 · 10 nov 2 / 13 · 11 nov 1 / 14 · 12 nov 1 / 3 (teste do suporte) · 13 nov 0 até ~7:50. Totais do painel 19 / 101 / 72 (71 %); reais 14 sorteios / 86 convites / 69–70 sortearam (80–81 %). Semana 9–15 nov: 4 reais até agora (2–8 nov: 6) | 30 out a 13 nov | `/painel` | 13 nov, ~7:50 |
| Cliques / impressões / CTR / posição (Google) | sem atualização: 38 / 999 / 3,8 % / 11,4 (igual à leitura de 12 nov) | 4 a 10 nov (provável) | Search Console | 13 nov, ~8:05 |
| Amazon | 9 cliques, 0 pedidos, 0,00 € (6–12 nov); 12 cliques em 30 dias → 3 de 14 out a 5 nov. Filtro por código devolve 0 em todos: sem dados por código | 6 a 12 nov | Amazon Afiliados (atualizado 13 nov 03:19 CET) | 13 nov |
| Visitas ao site | 209 visitas, 244 páginas vistas. Referenciadores: direto 146, google 29, m.facebook 14, facebook 9, techbit.pt 5, mail.google.com 3, app Gmail 2, l.instagram 1. Caminhos: /r 67, / ~60, até 5 € 12, engraçadas 9, /criar 9, /painel/ 8, homem 7 | 7 dias até 13 nov | Cloudflare Web Analytics | 13 nov |
| Ideias de 6/9 nov (utm sorteio / calendario; prendas no resultado) | sem dados: não há medição de utm (painel sem origens; Cloudflare guarda caminhos sem query); o /r não tem links da Amazon | 6 a 13 nov | `/painel` + Cloudflare + Amazon | 13 nov |
| Brevo | 85 enviados, 100 % entregues, 0 % rejeitados/queixas, aberturas ~60 % | 6 a 13 nov | Brevo | 13 nov |
| Awin | sem dados: não aberto (a 12 nov pedia login) | — | Awin | 13 nov |
| Sorteios por dia (painel, com testes) | 9 nov 2 / 11 (1 teste) · 10 nov 2 / 13 · 11 nov 1 / 14 · 12 nov 1 / 3 (teste) · 13 nov 0 · 14 nov 1 / 3 (não marcado como teste) · 15 nov 0 · 16 nov 0 até ~10:00. Sortearam por dia: 14 nov 10, 15 nov 1, 16 nov 1. Totais 20 / 104 / 85 (82 %). Semana 9–15 nov: 5 reais (2–8 nov: 6). Antes das experiências (9–13 nov): 4 reais em 5 dias (0,8/dia); depois (14 nov–16 nov ~10:00): 1 em ~2,4 dias | 30 out a 16 nov | `/painel` | 16 nov, ~10:00 |
| Limite e tamanho (painel, total) | limite: até 5 € 1, até 10 € 12, até 15 € 1, até 20 € 1, sem limite 5; grupos: 3–5 12, 6–10 7, 11–20 1; 1 de 20 com exclusões | até 16 nov | `/painel` | 16 nov |
| Emails por dia | o painel não mostra emails por dia; convites por dia no máximo 14 (11 nov). Sem alarme do Brevo | 9 a 16 nov | `/painel` | 16 nov |
| Visitas ao site | 11 visitas, 13 páginas vistas nas últimas 24 h (−61 % face às 24 h anteriores, segundo a Cloudflare). As `/ir/` contam: aparecem /ir/prendas/ultima-hora/ e /ir/prendas/ideias/ (1 medição cada nas 24 h). Contagem por caminho desde 14 nov: sem dados (o Chrome deixou de responder a meio da leitura) | 15–16 nov | Cloudflare Web Analytics | 16 nov, ~10:05 |
| Search Console, Amazon (por código), Awin, Meta | sem dados: o Chrome ficou bloqueado (outro separador do grupo abriu um site bloqueado pela extensão e todas as ações falharam a partir de ~10:10) | 9 a 15 nov | — | 16 nov |
| Sorteios por dia (painel, com testes) | 17 nov **1 / 9 convites** (21 sortearam nesse dia) · 18 nov 0 até ~7:55 (sem linha). Totais do painel **23 sorteios / 154 convites / 144 sortearam (94 %)**, 6,7 pessoas por sorteio (17 nov ~8:00: 22 / 145 / 85 %) | 17 a 18 nov | `/painel` | 18 nov, ~7:55 |
| Emails por dia | o painel não mostra emails por dia; convites por dia: 41 a 16 nov, 9 a 17 nov. Sem alarme do Brevo | 16 a 18 nov | `/painel` | 18 nov |
| Visitas ao site | 200 visitas, 219 páginas vistas (últimos 3 dias, ~15 nov 8:00 a 18 nov 8:00; +25 % visitas). Caminhos: /r 107 (só até 17 nov; já não aparece nas últimas 24 h), /org 52, / 15, /ideias-de-prendas 8, /criar 8, /ir/prendas/ideias/ 5, /prendas-ultima-hora 5, /links/ 2. Últimas 24 h: 15 visitas, 18 páginas vistas (/ 4, /org 3) | 15 a 18 nov | Cloudflare Web Analytics | 18 nov, ~8:00 |
| Experiências `/ir/` (páginas vistas, 7 dias) | /ir/org/ **0** (/org 52 em 3 dias) · /ir/redes/ **0** · /ir/redes-prendas/ **0** · /ir/lembrete/ **0** · /ir/sorteio/ **0** · /links/ 4 | 11 a 18 nov | Cloudflare Web Analytics (filtro por caminho) | 18 nov, ~8:05 |
| Cliques / impressões por dia (Google) | 10 nov 4 / 28 · 11 nov 0 / 0 · 12 nov 0 / 0 · 13 nov 0 / 3 · 14 nov 0 / 1 · 15 nov 0 / 0 · 16 nov 0 / 3 · 17 nov 0 / 0. Total 4 / 35, CTR 11,4 %, posição 13,8. Sem sinal de recuperação | 10 a 17 nov | Search Console | 18 nov, ~8:10 |
| Amazon | **14 cliques em novembro**, 0 produtos pedidos, 0,00 €; 15 cliques nos últimos 30 dias, 0,00 € de comissões | 1 a 18 nov | Amazon Afiliados (atualizado 18 nov) | 18 nov |
| Sorteios por dia (painel, com testes) | 18 nov 0 / 0 (1 sorteou) · 19 nov **1 / 3** até ~8:00 (teste do suporte «Teste entrega 19 nov»; descontar). Totais do painel **24 / 157 / 146 (93 %)**, 6,5 pessoas por sorteio; sem testes de hoje 23 / 154. Semana 16–22 nov: 3 reais | 18 a 19 nov | `/painel` | 19 nov, ~7:55–8:15 |
| Emails por dia | o painel não mostra emails por dia; convites por dia: 0 a 18 nov, 3 a 19 nov (teste). Sem alarme do Brevo | 18 a 19 nov | `/painel` | 19 nov |
| Visitas ao site | **371 visitas, 401 páginas vistas** (sem bots). Referenciadores (páginas vistas): direto 324, sapatinho-natal.pt 30, www.facebook.com 17, app Gmail 15, m.facebook.com 8, www.google.com 2, techbit.pt 2, mail.google.com 1, www.ecosia.org 1, securelinks.cloud-security.net 1. **Bing, DuckDuckGo, ChatGPT: 0** (não aparecem). Caminhos: /r 128, /org 52, / 46, /criar 23, /ideias-de-prendas 16, /prendas-ultima-hora 10, /guias/ 8. Países: Portugal 217, Alemanha 108, Brasil 41, EUA 25 | 12 a 19 nov (últimos 7 dias) | Cloudflare Web Analytics | 19 nov, ~8:05 |
| Experiências `/ir/` (páginas vistas, 7 dias, filtro «path começa por /ir/») | total 9: /ir/prendas/ideias/ 5, /ir/prendas/ultima-hora/ 2, /ir/prendas/ate-5/ 1, /ir/prendas/ate-10/ 1. **/ir/redes/ 0 · /ir/redes-prendas/ 0 · /ir/lembrete/ 0 · /ir/sorteio/ 0** (logo 0 desde 17 nov) | 12 a 19 nov | Cloudflare Web Analytics | 19 nov, ~8:10 |
| Cliques / impressões por dia (Google) | 10 nov 4 / 28 · 11 nov 0 / 0 · 12 nov 0 / 0 · 13 nov 0 / 3 · 14 nov 0 / 1 · 15 nov 0 / 0 · 16 nov 0 / 3 · 17 nov 0 / 0 (18 nov ainda sem dados). Últimos 7 dias com dados (11–17 nov): 0 / 7. 28 dias: 59 / 1,5 mil / 3,9 % / 12,1. Sem recuperação | 25 out a 17 nov | Search Console | 19 nov, ~8:00 |
| Amazon | **15 cliques em novembro**, 0 pedidos, 0,00 €; 16 cliques e 0,00 € nos últimos 30 dias (20 out–18 nov). Por código: sem dados | 1 a 18 nov | Amazon Afiliados (atualizado 19 nov 02:42 CET) | 19 nov |
| Bing Webmaster Tools | abre sem login; páginas indexadas: sem dados («os dados estão a ser processados, até 48 h») | site ligado a 18 nov | Bing Webmaster Tools | 19 nov |

## Histórico

- 6 nov: secção «Medições reais» acrescentada na passagem da rotina das 10:40 para o gestor do PC.
- 30 out: KPIs criados. Ainda sem números de base; pedidos ao Diogo os dados atuais do Search Console, `/painel` e Amazon.
- 31 out a 6 nov (rotina das 10:40, leituras diárias no Chrome do PC; fonte entre parênteses):
  - Google (Search Console, 7 dias): 1 nov 5 cliques / 113 impressões / posição 15,3; 2 nov 7 / 168 / 14,5; 3 nov 9 / 276 / 14,1; 4 nov 16 / 383 / 13,8; 5 nov 20 / 492 / 12,7 (28 out–3 nov); 6 nov sem atualização do Google.
  - Sorteios (`/painel`, total): 1 nov 4 (17 convites); 2 nov 5 (24); 3 nov 7 (30); 4 nov 8 (40); 5 nov 10 (51, 73 % sortearam). 6 nov sem dados (domínio em baixo até ~11:00) e 1 sorteio de teste às 15:07.
  - Amazon (Associados): 2 cliques em novembro, 0 €. Meta: FB 1 seguidor; IG 0 até 4 nov, 1 desde 5 nov; 0 cliques em ligações.
  - Emails de backlinks (Gmail sapatinhonatal): 22 enviados, 7 lembretes, 5 agendados, 0 respostas até 6 nov.
- 6 nov: passagem da rotina das 10:40 para o gestor do PC.
- 6 nov, ~16:00 (analista): sorteios 31 out–6 nov = 8 (11 desde 30 out; 54 convites, 38 sortearam = 70 %); Amazon 30 dias: 3 cliques, 0 pedidos, 0 €; Google 28 out–3 nov: 20 cliques, 492 impressões, CTR 4,1 %, posição 12,7; Brevo 30 out–6 nov: 103 enviados, 100 % entregues, 0 devoluções e queixas (suporte). Sem alarmes. O /painel de 6 nov inclui sorteios de teste (descontar).
- 7 nov, manhã (analista): Google 29 out–4 nov: 25 cliques, 612 impressões, CTR 4,1 %, posição 12 (semana anterior 20 / 492). Painel: 13 sorteios / 60 convites, mas 6 nov = 3 sorteios / 9 convites, todos de teste; reais: 10 sorteios / 51 convites, 7 de 31 out a 6 nov, 0 a 6 nov, 0 a 7 nov até ~7:50. Amazon: 3 cliques em novembro, 0 €; aviso fiscal ainda por concluir. Sem alarmes.
- 9 nov, ~9:15 (analista, revisão de segunda): Google 2–8 nov 31 cliques / 992 impressões / CTR 3,1 % / posição 11,7 (semana anterior 9 / 276; +244 % cliques). Sorteios reais 2–8 nov: 6 (34 convites, 79 % sortearam); 0 reais a 6, 7 e 8 nov. Amazon novembro: 5 cliques, 0 €. Meta 1–7 nov: FB 8 visualizadores, IG alcance 4. Awin: sem dados (login). Alarmes: CTR 0 % em /regras-do-amigo-secreto/ (166 impressões, posição 8,3) e /roleta-amigo-secreto/ (66, 8,2); /prendas-ultima-hora-amigo-secreto/ sem impressões desde 31 out (faz 14 dias a 14 nov). Brevo e queda de cliques: sem alarme.
- 11 nov, manhã (analista): fim dos dias sem sorteios (1 real a 9 nov, 2 a 10 nov); Google 3–9 nov 39 cliques (+26 %); Amazon sem dados. Alarme: CTR ~0,5 % em /regras (189 impressões).
- 12 nov, manhã (analista, revisão de quinta): Google 4–10 nov 38 cliques / 999 impressões / CTR 3,8 % / posição 11,4 (+90 % face a 28 out–3 nov; estável face à leitura de 11 nov). Sorteios reais 9–11 nov: 4 (35 convites); total real 14 / 86 / 80 % sortearam; 12 nov só o teste do suporte (descontado). Amazon novembro 11 cliques, 0 €. Awin sem dados (login). Backlinks: 1. Alarmes: nenhum. /regras subiu para 1,2 % de CTR; /prendas-ultima-hora-amigo-secreto/ já tem 1 impressão (alarme dos 14 dias desligado); /troca-de-prendas-natal/ sem impressões (14 dias a 17 nov). Aviso canónico do Search Console: 3 URLs com ?utm_source=techbitpt, sem ação.
- 13 nov, manhã (analista, medição das ideias de 6/9 nov): sorteios reais 9–15 nov: 4 até agora (0 a 12 nov, 0 a 13 nov até ~7:50); total real 14 / 86 / 80–81 % sortearam. Google sem atualização (38 cliques, 4–10 nov). Amazon 6–12 nov: 9 cliques, 0 €; filtro por código não funciona. Ideias «organiza outro sorteio», «lembrete no calendário» e «prendas no resultado»: sem dados (não há medição de utm; o /r não tem links da Amazon). Cloudflare 7 dias: 209 visitas, 29 do Google. Sem alarmes.
- 16 nov, ~10:00–10:20 (analista, KPIs de segunda atrasados): painel lido; semana 9–15 nov 5 sorteios reais (6 na anterior, −17 %), 0 a 15 nov e 0 a 16 nov até ~10:00; total 20 / 104 / 85 (82 %). Cloudflare: as `/ir/` contam (vistas nas últimas 24 h), mas sem contagem por caminho. Search Console, Amazon, Awin e Meta: sem dados (Chrome bloqueado a meio). Privacidade: nos dados brutos da Web Analytics (API, 3 nov) aparece pelo menos um caminho `/r/<código>` completo, apesar de o painel só mostrar `/r` → para o gestor. Sem alarme do Brevo.
- 16 nov, ~12:05 (analista, Search Console sem filtros): impressões por dia 1–14 nov: 108, 108, 114, 142, 165, 175, 158, 132, 199, **28, 0, 0, 3, 1**; cliques 2, 7, 5, 5, 1, 5, 6, 3, 14, 4, 0, 0, 0, 0. Indexação (13 nov): 25 indexadas, 9 não (4 robots.txt, 3 canónica alternativa, 1 redirecionamento, 1 404). Sem ações manuais nem problemas de segurança. **Alarme: queda de impressões desde 10 nov.**
- 17 nov, ~8:00 (analista, leitura rápida e fecho das experiências de 13–16 nov): painel por dia 9–16 nov, sorteios / convites: 2 (1 teste) / 11, 2 / 13, 1 / 14, 1 teste / 3, 0 / 0, 1 / 3, 0 / 0, **2 / 41** (16 nov: grupos de 11–20 e de 21–30 pessoas); total 22 sorteios / 145 convites / 123 sortearam (85 %). Brevo 10–17 nov: 167 emails, 100 % entregues, 0 devoluções e queixas, máx. 81 a 16 nov. Google por dia 10–16 nov (cliques / impressões): 4/28, 0/0, 0/0, 0/3, 0/1, 0/0, 0/3 (posição 48 a 16 nov); 9–15 nov 18 cliques / 231 impressões (−42 % face a 2–8 nov). Amazon 30 dias (18 out–16 nov): 15 cliques, 0 pedidos, 0 €; 14–16 nov 1 clique; filtro por código devolve 0 em todos os códigos. Cloudflare 14–17 nov: /ir/grupo/, /ir/sorteio/, /ir/calendario/, /ir/guia/, /ir/emails/, /ir/exemplo/, /ir/org/ = 0; /exemplo/ 0; /org 49 a 16 nov; /ir/prendas/ideias/ 5, /ir/prendas/ultima-hora/ 2, /ir/prendas/ate-10/ 1 (15–16 nov).
- 18 nov, ~7:55–8:15 (analista): painel 23 / 154 / 144 (94 %); 17 nov 1 sorteio / 9 convites; 18 nov 0 até ~7:55. Cloudflare: /ir/org/, /ir/redes/, /ir/redes-prendas/, /ir/lembrete/, /ir/sorteio/ = 0 em 7 dias; /org 52 (3 dias); /r deixou de aparecer nas últimas 24 h. Google 10–17 nov 4 cliques / 35 impressões, sem recuperação. Amazon novembro 14 cliques, 0 €. Alarme: queda do Google continua. Brevo sem alarme.
- 19 nov, ~7:55–8:15 (analista, KPIs de quinta): painel 24 / 157 / 146 (93 %) com o teste do suporte de 19 nov (1 / 3); semana 16–22 nov 3 sorteios reais (9–15 nov: 5). Google 11–17 nov 0 cliques / 7 impressões, sem recuperação (dados só até 17 nov). Amazon novembro 15 cliques, 0 €. Cloudflare 7 dias: 371 visitas / 401 páginas vistas; google 2, ecosia 1, bing/duckduckgo/chatgpt 0. /ir/redes/, /ir/redes-prendas/, /ir/lembrete/, /ir/sorteio/ = 0 desde 17 nov. Bing Webmaster: dados ainda a processar. Alarmes: queda do Google continua; Brevo sem alarme.
