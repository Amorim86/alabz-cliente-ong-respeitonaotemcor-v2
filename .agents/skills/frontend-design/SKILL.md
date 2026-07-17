---
name: frontend-design
description: Skill para analisar, especificar e orientar interfaces front-end com foco em composicao, harmonia visual, responsividade, acessibilidade e implementacao consistente. Use quando o pedido envolver layout, hierarquia, tipografia, cor, espacamento, componentes, motion, WordPress, assets, revisao de UI/UX ou conversao de tela para codigo.
---

# Frontend Design

## Visao Geral

Use esta skill para transformar um briefing, screenshot, HTML, CSS, JS ou pagina existente em direcao visual e implementacao clara. Ela ajuda a ler a interface como sistema: composicao, ritmo, atmosfera, hierarquia, comportamento responsivo e qualidade de entrega.

## Quando Usar

- Analisar uma pagina, tela, dashboard ou site inteiro
- Criar ou refinar uma landing page, portfolio, pagina institucional ou dashboard
- Reescrever uma interface que ficou rigida, generica ou quadrada
- Ajustar hero sections, layers de texto e imagem, tipografia e espacamento
- Melhorar responsividade sem mudar a identidade visual base
- Converter HTML/CSS/JS estatico em WordPress theme ou estrutura modular
- Integrar assets, caminhos e referencias corretas no projeto

## Casos Prioritarios

Os pedidos abaixo sao particularmente relevantes para esta skill:

- Website breakdown e review estruturado
- Hero com texto ao fundo e sujeito em primeiro plano
- Ajustes de tipografia hero, hierarquia e posicionamento
- Correcoes de responsividade em mobile e tablet
- Conversao para WordPress com preservacao visual
- Integracao de pasta `/assets` e deteccao de recursos novos
- Atualizacoes de dimensoes sem alterar o design base

## Fonte de Verdade Local

Se o workspace tiver contratos visuais proprios, leia-os antes de decidir a saida final.

- `docs/ux/CONTEXT_PACK.md`
- `docs/ux/AGENTE_DIRETOR_DE_ARTE.md`
- `docs/ux/CHECKLIST_VISUAL.md`
- `docs/ux/biblioteca-visual/style-notes.md`
- `docs/ux/biblioteca-visual/99 - Tipografia/style-notes.md`
- `docs/ux/biblioteca-visual/00 - Universal/style-notes.md`
- `docs/ux/biblioteca-visual/01 - Ecommerce/style-notes.md`

Use esses arquivos como referencia prioritaria quando estiver trabalhando nesta base.

## Caminho De Analise

Quando receber uma referencia, prompt ou site existente:

1. Identifique o objetivo real da interface.
2. Separe estrutura, estilo, comportamento e conteudo.
3. Defina o que e intocavel e o que pode ser ajustado.
4. Escolha uma direcao estetica clara, sem genericos vagos.
5. Transforme o pedido em componentes, regras e responsividade.
6. Se houver mais de uma interpretacao possivel, declare a suposicao mais segura.

## Principios De Trabalho

- Comece pela composicao, nao pelo detalhe.
- Defina foco, respiro, acento, densidade e ritmo antes de falar de estilos.
- Trate identidade de marca como ancora, nao como prisao.
- Prefira direcao clara a lista mecanica de itens.
- Preserve rastreabilidade entre estrutura, conteudo e imagem quando existir artefato de origem.
- Nao invente secoes, metricas, provas ou identidades que nao estejam sustentadas pelos dados.

## Direcao Visual

Escolha uma direcao estetica forte e coerente com o contexto. Exemplos de familias possiveis:

- editorial / magazine
- luxury / refined
- industrial / utilitarian
- minimal / precise
- playful / expressive
- brutalist / raw
- organic / natural
- retro-futuristic

Prefira uma unica direcao bem executada em vez de mistura morna de estilos.

## Processo

1. Entenda o objetivo da tela e o contexto do projeto.
2. Identifique sinais confiaveis de marca, conteudo e hierarquia.
3. Descreva a estrutura da interface em termos de composicao e fluxo visual.
4. Liste os blocos essenciais e a funcao de cada um.
5. Explicite tipografia, cor, espacamento, cards, botoes, imagens e responsividade.
6. Aponte riscos, ambiguidades e ajustes necessarios para implementacao.

## Modos De Saida

### 1. Analise de design

Use quando o usuario pede breakdown, review ou especificacao visual.

Entregue:
- estrutura da pagina
- ordem de secoes
- navegacao
- tipografia
- sistema de cor
- ritmo e espacamento
- tratamento de imagem
- cards e blocos
- CTAs
- responsividade
- acessibilidade
- riscos e ambiguidade

### 2. Implementacao de frontend

Use quando o usuario pede codigo ou alteracao real.

Entregue:
- implementacao funcional
- HTML, CSS, JS, React ou WordPress conforme o caso
- preservacao do design pedido
- responsividade consistente
- validacao de assets e caminhos
- observacoes objetivas sobre o que mudou

### 3. Conversao de tema / refatoracao

Use quando o pedido for migrar uma pagina para WordPress, ajustar um layout existente ou manter a aparencia enquanto a estrutura muda.

Prioridades:
- nao alterar o design sem necessidade
- modularizar sem quebrar o visual
- manter navegacao, hero e secoes coerentes
- preservar conteudo e ordem visual
- usar a menor mudanca possivel para atingir o objetivo

## Formato de Saida Esperado

Quando o pedido for analise ou especificacao, responda com uma estrutura curta e consistente:

- Visao geral
- Layout structure
- Section order
- Navigation
- Typography
- Color system
- Spacing and rhythm
- Image treatment
- Cards and content blocks
- Buttons and CTAs
- Responsive strategy
- Accessibility notes
- Implementation notes
- Risks and ambiguities

## Regras

- Evite respostas lineares demais; descreva a relacao entre as partes da interface.
- Evite checklist sem direcao; cada item deve ter funcao clara.
- Evite genericos como clean, modern ou premium sem explicar o que isso significa na pratica.
- Mantenha a resposta util para designer e desenvolvedor.
- Se faltar informacao critica, declare a suposicao de forma explicita.
- Se o pedido vier com referencia visual, trate a referencia como fonte principal, nao como inspiracao vaga.
- Se houver conflito entre beleza e funcionalidade, preserve a leitura e a usabilidade.
- Se o pedido for sensivel a layout ou dimensao, altere apenas o necessario.

## Saida Ideal

Uma leitura profissional, precisa e acionavel, pronta para orientar criacao, revisao ou implementacao de front-end.

## Referências e Catálogos (OBRIGATÓRIO)
Ao trabalhar na criação de layouts, utilize os seguintes catálogos localizados na pasta `references/`:
1. `macrostructures.md`: Catálogo de 21 macroestruturas. Consulte para escolher a base do layout.
2. `component-cookbook.md`: Catálogo de 50 archetypes (Headers, Heroes, Footers, etc). Consulte para escolher a variação dos componentes.
3. `slop-test.md`: Lista de 57 gates anti-genericismo. Consulte DURANTE a geração do código para evitar que os componentes nasçam com "cara de IA".

## Design Contract — Template
Após aprovação do onboarding visual (conforme AGENTS.md), crie `.alabz/design-contract.md` na raiz do projeto com este template preenchido:

---
# Design Contract — [Nome do Cliente]

**Data de aprovação:** YYYY-MM-DD
**Aprovado via:** [Wireframe / Mockup visual / Stitch]
**Stitch URL:** (se aplicável)

## Macrostrutura
**Nome:** [ex: Split Studio]
**Descrição:** [uma linha descrevendo o layout geral]

## Componentes Aprovados
- **Nav:** [ex: N-Alabz-Premium] -> (Garantia: Menu Sanduíche Mobile Ativo)
- **Hero:** [ex: H2 · Split Diptych]
- **Footer:** [ex: Ft5 · Statement] -> (Garantia: Assinatura Alabz + Pacman Injetada)

## Ordem das Seções
1. [Nome da seção] — [componente do arsenal ou novo]
2. [Nome da seção] — [componente do arsenal ou novo]

## Seções do Arsenal Utilizadas
- ✅ HeroSection
- ✅ Footer

## Seções do Arsenal Ignoradas neste Projeto
- ❌ HowItWorksSection
- ❌ LocationSection (cliente sem endereço físico)

## Tokens Visuais
- **Cor primária:** #______
- **Cor accent:** #______
- **Font display:** ______
- **Font body:** ______

## Contrato de Responsividade
- **Seções de viewport (`.section-viewport`):** [liste as seções principais que devem preencher ao menos o viewport disponível]
- **Exceções de altura natural (`.section-natural`):** [liste faixas auxiliares, grids extensos, rodapés ou outras exceções aprovadas]
- **Altura mensurável do Header:** [ex: `4rem`; validar o centro geométrico da faixa renderizada]
- **Breakpoint compacto do Header:** [definido pela largura real de logo + nav + ações, não por nome de dispositivo]
- **Largura mínima dos cards (`--card-min`):** [valor validado pelo conteúdo]
- **Grid validado em 1365x768:** [3 ou 4 colunas; nunca forçar 5 sem espaço real]
- **Viewports obrigatórios de validação:** 1920x1080, 1365x768 e 390x844

## Notas do Amorim
[Observações e decisões tomadas durante o onboarding]
---
