# KPIs e objetivos do Sapatinho até 20 dez 2026

Gerido pelo gestor (`/gestor`). Revê-se **todas as segundas-feiras** com os números que o Diogo enviar. Atualizado a 30 out 2026; números de 12 nov 2026 (analista).

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
| Cliques do Google | Search Console (Diogo) | cerca de 1 000 entre 1 e 20 dez (**estimativa** do `seo.md`; revê-se a 16 nov) | 20 dez | 12 nov: **38 cliques**, 999 impressões, CTR 3,8 %, posição 11,4 (4–10 nov). 7 dias anteriores (28 out–3 nov): 20 / 492 → +90 % cliques. Leitura de 11 nov (3–9 nov): 39 → estável | em linha (cedo) |
| Pesquisas na primeira página (posição média ≤ 10) | Search Console (Diogo) | 10 (**estimativa** do `seo.md`; revê-se a 16 nov) | 1 dez | 4 (28 out–3 nov): «prendas engraçadas até 5€» 8,5 (4 cliques), «prendas amigo secreto engraçadas» 9,0, «roleta amigo secreto» 9,3, «roleta de amigo secreto» 7,3. «prendas amigo secreto» 44,7; guia de ideias 39,1 | em linha (cedo) |
| Sorteios feitos por semana | `/painel` (Diogo) | a definir a 16 nov, a partir das semanas de novembro | 20 dez | 12 nov (painel, sem testes): **semana 9–15 nov: 4 sorteios reais até 11 nov** (9 nov 1, 10 nov 2, 11 nov 1; 35 convites); 2–8 nov: 6. 12 nov até ~8:00: só o teste do suporte (1 sorteio, 3 convites). Total real: 14 sorteios, 86 convites | sem dados (meta a 16 nov) |
| Convites abertos e sorteados (sorteados ÷ convites) | `/painel` (Diogo) | a definir a 16 nov | 20 dez | 12 nov: total real **80 %** (69 de 86; descontados 2 sorteios de teste a 6 nov e 0 nos testes de 9 e 12 nov). O painel conta «sortearam» pelo dia em que a pessoa sorteia, não pelo dia do sorteio: a taxa por semana não se calcula com rigor | sem dados (meta a 16 nov) |
| Cliques nos links da Amazon | Amazon Associados (Diogo) | a definir a 16 nov | 20 dez | 12 nov: 11 cliques em novembro (1–12 nov), 12 nos últimos 30 dias, 0 pedidos | sem dados (meta a 16 nov) |
| Ganhos de afiliados | Amazon Associados (Diogo) | a definir a 16 nov | 20 dez | 12 nov: 0,00 € em novembro (Amazon, 0 pedidos). Awin: sem dados (pede login). Amazon mostra aviso: faltam as informações de pagamento do titular | em risco |
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
