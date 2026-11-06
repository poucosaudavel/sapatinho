# KPIs e objetivos do Sapatinho até 20 dez 2026

Gerido pelo gestor (`/gestor`). Revê-se **todas as segundas-feiras** com os números que o Diogo enviar. Atualizado a 30 out 2026.

Regra: só há metas com número quando há dados reais por trás. As metas de resultado ficam «a definir» até haver a primeira medição; os valores do `seo.md` são estimativas e estão marcados como tal.

Estado: **em linha**, **em risco** (a meta falha se nada mudar), **falhou**, **cumprido**, **sem dados**.

## 1. Trabalho (depende de nós; metas firmes)

| KPI | Meta | Prazo | Atual (30 out) | Estado |
| --- | --- | --- | --- | --- |
| Páginas novas ou melhoradas publicadas no site | 8 (/criar, engraçadas, 20 €, 15 €, colegas no guia da empresa, última hora, homem, mulher) | 15 nov | 3 prontas (/criar, engraçadas, 20 €), à espera do deploy | em linha |
| Dessas páginas, com indexação pedida no Search Console | 8 de 8, no dia em que são publicadas | 15 nov | 0 | em linha |
| Dias com publicações agendadas no Meta | todos os dias de 31 out a 20 dez (51 dias) | nov: 2 nov; dez: ~21 nov | sem dados | sem dados |
| Links reais de outros sites para o Sapatinho | 10 a 15 | 30 nov | sem dados | sem dados |
| Revisão de preços em todos os guias | feita | 1 dez | por fazer | em linha |

## 2. Resultados (dependem do Google e das pessoas)

| KPI | Fonte (quem envia) | Meta | Prazo | Atual | Estado |
| --- | --- | --- | --- | --- | --- |
| Cliques do Google | Search Console (Diogo) | cerca de 1 000 entre 1 e 20 dez (**estimativa** do `seo.md`; revê-se a 16 nov) | 20 dez | 20 cliques, 492 impressões, CTR 4,1 %, posição 12,7 (28 out a 3 nov; lido a 5 e 6 nov). Antes: 9 / 276 (26 out–1 nov), 16 / 383 (27 out–2 nov) | em linha (cedo) |
| Pesquisas na primeira página (posição média ≤ 10) | Search Console (Diogo) | 10 (**estimativa** do `seo.md`; revê-se a 16 nov) | 1 dez | 4 (28 out–3 nov): «prendas engraçadas até 5€» 8,5 (4 cliques), «prendas amigo secreto engraçadas» 9,0, «roleta amigo secreto» 9,3, «roleta de amigo secreto» 7,3. «prendas amigo secreto» 44,7; guia de ideias 39,1 | em linha (cedo) |
| Sorteios feitos por semana | `/painel` (Diogo) | a definir a 16 nov, a partir das semanas de novembro | 20 dez | 5 nov (painel): 10 sorteios no total, 51 convites, 5,1 pessoas por sorteio. 6 nov: +1 sorteio de teste (descontar) | sem dados (meta a 16 nov) |
| Convites abertos e sorteados (sorteados ÷ convites) | `/painel` (Diogo) | a definir a 16 nov | 20 dez | 5 nov: 73 % (37 de 51) | sem dados (meta a 16 nov) |
| Cliques nos links da Amazon | Amazon Associados (Diogo) | a definir a 16 nov | 20 dez | 6 nov: 2 cliques em novembro (3 nos últimos 30 dias), 0 pedidos | sem dados (meta a 16 nov) |
| Ganhos de afiliados | Amazon Associados (Diogo) | a definir a 16 nov | 20 dez | 6 nov: 0,00 € (Amazon). Awin: 0 lojas aceites, 9 pendentes. Aviso fiscal da Amazon por concluir | em risco |
| Cliques no link (bio, stories, Facebook) | Meta Business Suite (Diogo) | a definir a 16 nov | 20 dez | 6 nov: seguidores FB 1, IG 1; 0 cliques em ligações no FB (29 out–4 nov; 37 visualizações, 63 visitas) | em risco |

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

## Histórico

- 30 out: KPIs criados. Ainda sem números de base; pedidos ao Diogo os dados atuais do Search Console, `/painel` e Amazon.
- 31 out a 6 nov (rotina das 10:40, leituras diárias no Chrome do PC; fonte entre parênteses):
  - Google (Search Console, 7 dias): 1 nov 5 cliques / 113 impressões / posição 15,3; 2 nov 7 / 168 / 14,5; 3 nov 9 / 276 / 14,1; 4 nov 16 / 383 / 13,8; 5 nov 20 / 492 / 12,7 (28 out–3 nov); 6 nov sem atualização do Google.
  - Sorteios (`/painel`, total): 1 nov 4 (17 convites); 2 nov 5 (24); 3 nov 7 (30); 4 nov 8 (40); 5 nov 10 (51, 73 % sortearam). 6 nov sem dados (domínio em baixo até ~11:00) e 1 sorteio de teste às 15:07.
  - Amazon (Associados): 2 cliques em novembro, 0 €. Meta: FB 1 seguidor; IG 0 até 4 nov, 1 desde 5 nov; 0 cliques em ligações.
  - Emails de backlinks (Gmail sapatinhonatal): 22 enviados, 7 lembretes, 5 agendados, 0 respostas até 6 nov.
- 6 nov: passagem da rotina das 10:40 para o gestor do PC.
