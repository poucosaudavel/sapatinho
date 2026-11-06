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
| 2 nov | gestor | Agendar no Meta o que falta de novembro: feed de 28 nov 20:30, 29 nov e 30 nov; stories de 29 e 30 nov | atrasado; feito a 5 nov |
| todos os dias | gestor | Agendar no Meta o que já entrou na janela de 29 dias | contínuo |
| 6 nov | gestor | Publicar o site (painel com a Oficina 3D) e a API (`/api/stats` com o estado da Oficina; **o Diogo aprovou esta publicação da API a 5 nov**), depois copiar `gestao/oficina.json` para a chave `oficina` do KV e confirmar `/painel/oficina/` | feito (5 nov, 22:20) |
| até 14 nov | Diogo | Domínio sapatinho-natal.pt: confirmar no Dominios.PT nome, NIF, morada, email e telefone (pedido do .PT de 6 nov; o domínio já foi removido uma vez a 6 nov por falta de prova e registado de novo) | à espera do Diogo (avisado a 6 nov, 15:30) |
| 6 nov | inovacao | Primeiras 3 ideias em `gestao/ideias.md` | por fazer |
| até 6 nov | outreach | Criar `gestao/backlinks.md` (fora do Git) com os 19 contactos já enviados e marcar os lembretes de 7 dias | por fazer |
| até 9 nov | seo | «Prendas para colegas» e «Amigo secreto na empresa»: focos diferentes e ligação entre as duas | por fazer |
| todas as segundas | Diogo | Enviar os números da semana (Search Console, `/painel`, Amazon, Meta); ver `gestao/kpis.md` | por fazer |
| todas as segundas | gestor | Atualizar `gestao/kpis.md` e criar tarefas para o que estiver em risco | por fazer |
| 16 nov | gestor | Pôr número nas metas «a definir» dos KPIs | por fazer |
| até 8 nov | Diogo | Registar-se na Awin | feito (aprovado) |
| até 9 nov | afiliados | Ver no painel da Awin que lojas portuguesas há (vales de experiências, livrarias, eletrónica) e propor em quais entrar; o Diogo candidata-se | por fazer |
| 3 a 9 nov | social-media | Publicações que levam às páginas novas de prendas | feito e agendado no Meta (31 out) |
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

### 6 nov 2026, 15:30 (turno da tarde)
- Os turnos das 7:44 e das 11:44 não deixaram registo (ficaram ficheiros de bloqueio do git das 11:45; limpos). O relatório da manhã não está confirmado.
- Alarme: o .PT removeu o domínio às 6:15 por falta de prova; o Diogo registou-o de novo às 10:59. Às 15:01 chegou novo pedido de validação de dados (prazo 8 a 10 dias). Diogo avisado por notificação.
- Confirmado no site real: as ideias de prenda e o convite «organiza outro sorteio» (PR #24) estão no `/r` e no `/sorteio`; o link `/s/` da família abre.
- Turno curto: sem agentes (o tempo foi para o alarme do domínio). Caixa do sapatinhonatal e Meta ficam para o turno da noite.

- 5 nov (noite): chegou o CIO (`inovacao`). A Oficina 3D passa a estar também em `/painel/oficina/`, à espera de publicação (a sessão do Cloudflare no Chrome expirou).

- 5 nov (noite): dois agentes novos, `produto` (conversão; terça) e `suporte` (ajuda e entrega dos emails; todos os dias, teste à quinta). O gestor passa a correr sozinho todos os dias às 7:44 e às 19:44.

- 5 nov: o gestor passa a CEO, com agentes novos: `outreach` (backlinks, saiu do `seo`), `analista`, `afiliados` e `qa`. Registo obrigatório no fim de cada dia de trabalho. Atrasos encontrados: Meta de 28 a 30 nov por agendar (tratado), quadro e KPIs parados desde 31 out, 19 contactos sem registo, aprovação da Awin por tratar.

- 31 out: Meta reagendado com as versões novas de 2, 3, 4, 8 e 14 nov (feed) e 4 a 8 nov (stories). O gestor passa a ser o único a agendar no Meta (o lembrete do claude.ai foi cancelado). API só com o «sim» do Diogo.
- 30 out: página «Prendas até 20 €» feita (antecipada de 6 nov); pesquisa de afiliados feita; publicações de 3 a 9 nov ajustadas às páginas novas. Tudo num PR à espera do Diogo.
- 30 out: KPIs e objetivos criados em `gestao/kpis.md`, a pedido do Diogo.
- 30 out: quadro criado a partir do plano de rentabilização até 20 dez.
- 30 out: o Diogo deu ao gestor autonomia para juntar PRs e publicar o site e a API.

### 5 nov 2026, 22:15 (Claude, com o Diogo)
- Feito: página inicial arrumada (4 guias e «Ver todos os guias»), página nova `/guias/` com os 21 guias por tema, rodapé de 26 para 6 guias. O agente `produto` passa a «UX e conversão» e é dono da arrumação do site.
- Feito: até 20 dez a tarefa agendada corre 4 vezes por dia (7:44, 11:44, 15:44, 19:44); cadência nova dos agentes em `.claude/commands/gestor.md` («Turnos»).
- Publicado: API (worker) com o `oficina` no `/api/stats` (aprovado pelo Diogo a 5 nov), pelo editor do painel do Cloudflare; confirmado `/api/create` inválido = 400 e `/api/stats` sem senha = 401. Chave `oficina` escrita no KV.
- Publicado (22:20): o site, pelo painel do Cloudflare (carregar o zip em Workers e Pages › sapatinho-natal › Create deployment). Confirmado: página inicial com «Ver todos os guias», `/guias/`, `/painel/oficina/`, sitemap e os links `/s/` da família abrem.
