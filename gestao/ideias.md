# Ideias do CIO

O agente `inovacao` propõe até 3 ideias por semana (à sexta). O gestor decide e regista aqui a decisão; as aprovadas entram no quadro de tarefas.

| Data | Ideia | Número que mexe | Estimativa | Esforço | Teste barato | Quem faz | Decisão | Resultado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 5 nov 2026 | **Prendas na página do resultado** (`/r`): logo a seguir ao sorteio, 3 ou 4 prendas do limite do grupo com link da Amazon, em vez de mandar para um guia (um clique a menos no melhor momento de compra). Só site, sem mexer na API. Nos emails não: as regras da Amazon proíbem links de afiliado em emails. | Receita; vendas da Amazon (precisa de 3 nos primeiros 180 dias para a conta não fechar) | Estimativa: mais cliques na Amazon do que os guias dão hoje; por medir | `produto` + `afiliados`, meio dia; sem Diogo, sem dinheiro | Uma semana com as prendas no `/r` e comparar os cliques com a semana anterior (código de seguimento próprio, ver a ideia 3) | `produto`, `afiliados`, `qa` | por decidir (proposta do Claude, a pedido do Diogo) | |
| 5 nov 2026 | **Cada convidado vira organizador:** no `/r`, uma frase e um botão «Organiza o sorteio de outro grupo» (trabalho, amigos, a outra família). | Sorteios por semana | Estimativa: alguns sorteios novos por cada dezena de convidados; por medir | `produto`, 1 a 2 horas | Contar quantos `/criar` vêm do `/r` (parâmetro `utm` no link) durante uma semana | `produto`, `qa` | por decidir (proposta do Claude, a pedido do Diogo) | |
| 5 nov 2026 | **Saber de onde vem cada venda:** 2 ou 3 códigos de seguimento novos na Amazon (guias, página do resultado, redes sociais) para cortar o que não vende. | Receita (decidir com dados) | Não mexe sozinha: permite medir as outras | Diogo, 5 minutos no painel da Amazon (definição da conta dele); depois `afiliados` troca os códigos | Ver os relatórios da Amazon por código ao fim de uma semana | Diogo, `afiliados` | por decidir; precisa do Diogo (proposta do Claude, a pedido do Diogo) | |
| 5 nov 2026 | **Lojas da Awin:** comparar a comissão das lojas aprovadas com a da Amazon e usar a melhor nas páginas com mais visitas. | Receita | por medir | `afiliados`, 2 horas | Uma página com a loja da Awin durante uma semana | `afiliados` | por decidir (proposta do Claude, a pedido do Diogo) | |

## Para depois do Natal

- **Lista de desejos** (proposta do Claude, 5 nov): cada pessoa escreve 3 ideias e quem a tirou recebe-as. É o que mais faria voltar ao site e comprar, mas muda a API e o caminho dos dados; não arriscar antes do pico.
- **Mais datas além do Natal** (proposta do Claude, 5 nov): amigo secreto de Páscoa, de fim de curso e de empresa ao longo do ano.
- **Não recomendado:** anúncios (com poucas visitas rendem quase nada e estragam a página).
