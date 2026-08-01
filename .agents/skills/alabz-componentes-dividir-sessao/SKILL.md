---
name: alabz-componentes-dividir-sessao
description: Compacta duas seções adjacentes em uma única composição responsiva, preservando a hierarquia de conteúdo e ajustando proporção, tipografia e espaçamento. É ativada quando o usuário pede por comandos manuais ou em linguagem natural para "unir seções", "mesclar blocos", "dividir seção" ou expressões como "vamos unir as seções X e Y" especificando proporções como 50/50, 40/60 ou 60/40.
---

# Dividir Seção

Transforme duas seções adjacentes em uma composição única, mais compacta e sem perda de leitura. Mantenha a identidade visual existente; altere apenas estrutura, proporção, espaçamento e escala tipográfica necessários.

## Fluxo

1. Leia o componente e o CSS das duas seções. Identifique conteúdo essencial, imagem ou mídia, CTA, ordem narrativa e regras responsivas já existentes.
2. Defina o eixo da fusão:
   - Desktop: duas colunas quando ambos os blocos tiverem peso semelhante ou complementar.
   - Mobile: uma coluna, mantendo a ordem narrativa original ou a prioridade declarada pelo usuário.
   - Use empilhamento vertical somente se uma coluna não comportar o menor conteúdo legível.
3. Pergunte qual proporção o usuário prefere antes de fixar a grade: `50/50`, `40/60` ou `60/40` (a menos que ele já tenha especificado isso na chamada inicial em linguagem natural). Explique em uma frase qual lado recebe mais presença em cada opção.
4. Caso não haja resposta na instrução inicial ou subsequente, comece por `50/50` quando os blocos tiverem importância equivalente. Use `60/40` para dar maior peso ao conteúdo principal; use `40/60` para priorizar imagem, demonstração ou resultado visual.
5. Compacte de dentro para fora: reduza primeiro paddings, gaps e margens; depois ajuste tipografia apenas o necessário. Nunca escale a seção inteira com `transform` nem esconda conteúdo com `overflow`.
6. Preserve um título principal claro. Remova rótulos redundantes, repetições de mensagem e microcopy decorativa somente quando o usuário aprovar ou quando forem duplicatas evidentes.
7. Aplique fusao visual entre imagem e fundo quando a nova composição usar foto em uma lateral. Use um overlay gradual da cor exata do fundo, sem divisor seco (de acordo com a Regra de Fusão Suave do projeto).
8. Valide em `1920x1080`, `1365x768` e `390x844`: sem overflow horizontal, texto cortado, sobreposição, CTA inalcançável ou imagem sem respiro. Em laptop baixo, compacte apenas a seção com uma classe opt-in.

## Proporções

| Proporção | Uso recomendado |
| --- | --- |
| `50/50` | Dois blocos com igual importância e densidade parecida. |
| `40/60` | Mídia, processo visual ou resultado precisa dominar. |
| `60/40` | Copy, especificação, CTA ou argumento comercial precisa dominar. |

Use `minmax(0, 1fr)` em cada trilha. O bloco com texto deve ter `min-w-0` (de acordo com a regra de proteção contra colisões), quebra segura para palavras longas e altura natural. Não force uma quantidade de colunas que estreite a leitura.

## Tipografia e Ritmo

- Preserve família, peso e contraste tipográfico da página.
- Reduza fontes somente depois de esgotar espaçamentos internos. Mantenha título, corpo e CTA confortáveis em `1365x768` e `390x844`.
- Prefira `clamp()` para uma faixa pequena e controlada quando o componente precisar se adaptar; não use fonte baseada diretamente na largura da viewport.
- Use `min-height`, nunca altura fixa, quando o texto puder crescer.
- Mantenha o CTA no fluxo normal; não posicione copy essencial de forma absoluta.

## Prompt de Execução

Use este prompt ao acionar a skill:

> Una estas duas seções em uma única seção responsiva. Antes de implementar, identifique o conteúdo essencial de cada uma e me pergunte qual proporção desktop eu prefiro entre 50/50, 40/60 e 60/40 (caso eu já não tenha informado na frase de comando). Compacte espaçamentos antes de reduzir tipografia, mantenha a narrativa no mobile e valide em 1920x1080, 1365x768 e 390x844 sem overflow, cortes ou sobreposições.

## Entrega

Informe a proporção escolhida, os elementos removidos ou preservados, os arquivos alterados e o resultado da validação visual. Não faça refatorações fora das duas seções sem necessidade direta.
