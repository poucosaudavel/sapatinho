# Quadro de tarefas do Sapatinho

Este quadro é gerido pelo gestor do projeto (`/gestor`). Os agentes e o Diogo leem-no para saber o que é deles.
Estados: **por fazer**, **em curso**, **à espera do Diogo**, **feito**. Datas em 2026.

## Quem faz o quê

| Quem | Responsabilidade | Não faz |
| --- | --- | --- |
| Gestor (`/gestor`) | Decide as tarefas da semana, entrega-as aos agentes, revê o trabalho contra as regras do `CLAUDE.md`, mantém este quadro e diz ao Diogo o que precisa dele. Trata do que não é de nenhum agente (pesquisa de afiliados, contas do Brevo, metas). | Junta PRs e publica o site e a API sozinho, só depois das verificações; nunca publica nas redes nem mexe em chaves. |
| `seo` | Páginas do site (guias, prendas, FAQ), títulos e descrições, sitemap, rotina do Search Console, textos para pedir links. | Não mexe em `worker/` nem em `private/`. |
| `social-media` | Publicações e stories do Facebook e Instagram até 20 dez, imagens, plano da semana, leitura das métricas. | Não publica nada em nome do Diogo. |
| Diogo | Corre o `/gestor` no PC, agenda no Meta, pede indexação, envia números do Search Console e do `/painel`, inscreve-se em afiliados. | |

## Tarefas

| Data | Quem | Tarefa | Estado |
| --- | --- | --- | --- |
| 3 nov | seo | /criar: título e descrição; guia de ideias liga às páginas de preço (PR #1) | à espera do Diogo: publicar e pedir indexação |
| 4 nov | seo | Página de prendas engraçadas (PR #2) | à espera do Diogo: publicar e pedir indexação |
| até 2 nov | gestor | Pesquisar programas de afiliados em Portugal (vales de experiências, lojas) | feito (`gestao/afiliados.md`) |
| 2 nov | Diogo | Agendar no Meta o resto de novembro | por fazer |
| todas as segundas | Diogo | Enviar os números da semana (Search Console, `/painel`, Amazon, Meta); ver `gestao/kpis.md` | por fazer |
| todas as segundas | gestor | Atualizar `gestao/kpis.md` e criar tarefas para o que estiver em risco | por fazer |
| 16 nov | gestor | Pôr número nas metas «a definir» dos KPIs | por fazer |
| até 8 nov | Diogo | Registar-se na Awin e mandar a lista de lojas portuguesas que aparecem (ver `gestao/afiliados.md`) | por fazer |
| 3 a 9 nov | social-media | Publicações que levam às páginas novas de prendas | feito: à espera do Diogo (agendar no Meta a 2 nov) |
| 6 nov | seo | Prendas até 20 € | à espera do Diogo: publicar e pedir indexação |
| 9 nov | seo | Prendas até 15 € | por fazer |
| 9 nov | gestor | Decidir que afiliados compensam e dizer ao Diogo | por fazer |
| 11 nov | seo | Guia da empresa: 20 ideias para colegas | por fazer |
| 12 nov | seo | Prendas de última hora | por fazer |
| 13 nov | seo | Prendas para homem | por fazer |
| 15 nov | seo | Prendas para mulher (prazo final de conteúdo novo) | por fazer |
| 10 a 16 nov | social-media | Dezembro (1 a 20) pronto a agendar | por fazer |
| meados nov | gestor | Rever metas com o Search Console e o `/painel` que o Diogo enviar | por fazer |
| 17 a 23 nov | seo | Rotina de segunda: melhorar o que está entre a 8.ª e a 20.ª posição | por fazer |
| 17 a 23 nov | gestor | «Apoia o projeto», só se o Diogo quiser | à espera do Diogo: decidir |
| ~21 nov | gestor | Agendar dezembro no Meta | a fazer (31 out, autorizado pelo Diogo) |
| 24 a 30 nov | seo | Rotina; Black Friday (27 nov) | por fazer |
| 24 a 30 nov | gestor | Ver no `/painel` os emails por dia (pagar Brevo se > 200 dois dias seguidos) | por fazer |
| 1 dez | seo | Revisão de preços em todos os guias | por fazer |
| 1 a 20 dez | seo | Rotina à segunda e à quinta | por fazer |
| 1 a 20 dez | gestor | Vigiar o limite do Brevo | por fazer |

## Notas do gestor

- 30 out: página «Prendas até 20 €» feita (antecipada de 6 nov); pesquisa de afiliados feita; publicações de 3 a 9 nov ajustadas às páginas novas. Tudo num PR à espera do Diogo.
- 30 out: KPIs e objetivos criados em `gestao/kpis.md`, a pedido do Diogo.
- 30 out: quadro criado a partir do plano de rentabilização até 20 dez.
- 30 out: o Diogo deu ao gestor autonomia para juntar PRs e publicar o site e a API.
