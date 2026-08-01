---
name: alabz-design-ui-ux-pro-max
description: Skill de Inteligência Visual e Design System. Analisa briefings para gerar paletas de cores calibradas, combinações de fontes dinâmicas e layouts sob medida usando o ui-ux-pro-max local.
---

# ONBOARDING ESTÉTICO & COMANDO `/ui-ux-pro-max`

Esta skill integra a base de dados do `ui-ux-pro-max` diretamente nas fases iniciais de desenvolvimento do template base (Fase 1 e Fase 2), além de responder ao comando manual do usuário.

---

## 0. Consulta Consultiva ao Log de Projetos

Antes de rodar a CLI e gerar o design system, leia `E:\_Antigravity Pro\.alabz\projects-log.json` (um nível acima do projeto atual).
Use os dados para sugerir direções frescas e evitar monotonia estrutural nas 3 opções que apresentará no Onboarding Visual, mas permita e acate solicitações explícitas do usuário para reutilizar combinações de sucesso de projetos anteriores.
Registre a entrada após a aprovação do Design Contract.

## Preset N-Alabz-Premium (Nav Padrão do Ecossistema)

O Header Premium Alabz é um archetype nomeado `N-Alabz-Premium`:
- Layout tripartite: Logo (esquerda) · Links centralizados · Redes sociais + CTA (direita)
- Sem limitador de largura no container do header (100% fluido, ~20px margem lateral)
- Menu sanduíche mobile com fundo de alta opacidade + blur
- Ícones de redes sociais com hover suave
- Linha divisória entre redes sociais e botão CTA
- Degrada OBRIGATORIAMENTE para um menu sanduíche no mobile (Inegociável)

Este preset deve ser sugerido como opção padrão nos projetos Alabz, mas pode ser substituído por qualquer N1-N13 se o briefing justificar.

---

## 1. Ativação Automática (No Onboarding do Briefing)
Ao iniciar a criação de um novo site a partir do briefing/nicho do cliente, você é OBRIGADO a executar a inicialização do design system **antes de começar qualquer escrita de layout**:

1. Analise o nicho do produto ou o briefing do cliente.
2. Identifique os termos-chave que melhor descrevem a atmosfera do site (ex: "Clínica de Estética de Luxo", "SaaS Financeiro minimalista").
3. Execute silenciosamente a CLI Python local de geração de design system:
   ```bash
   python .agents/ui-ux-pro-max/scripts/search.py "<termos_chave>" --design-system --persist -p "<NomeDoProjeto>"
   ```
4. O script gerará a pasta `design-system` com o arquivo `MASTER.md` contendo todos os tokens visuais.
5. Siga as instruções do **Passo 3: Aplicação dos Tokens no globals.css** detalhadas abaixo.
6. Apresente ao usuário no chat o changelog inicial de design system com a paleta, tipografia recomendada e link do Google Fonts, pedindo confirmação para iniciar a Fase 1 (Estrutura e UX).

---

## 2. Comando Manual: `/ui-ux-pro-max <briefing_ou_nicho>`
Se o usuário digitar o comando `/ui-ux-pro-max` seguido de uma query em qualquer momento do desenvolvimento, você deve:

1. Assumir o papel de Arquiteto de Software e Designer de Interface especialista em Design Systems.
2. Rodar imediatamente a CLI local com a query fornecida:
   ```bash
   python .agents/ui-ux-pro-max/scripts/search.py "<briefing_ou_nicho>" --design-system --persist
   ```
3. Ler o arquivo `design-system/MASTER.md` gerado.
4. Aplicar os tokens gerados no `globals.css` conforme as instruções a seguir.
5. Exibir uma apresentação elegante em Markdown detalhando:
   *   A paleta de cores aplicada (com cores hexadecimais).
   *   O par de fontes escolhido (título e corpo) e o motivo da escolha para aquele nicho.
   *   Um checklist rápido de pré-entrega e anti-patterns a serem evitados no projeto.

---

## 3. Aplicação dos Tokens no `globals.css` (Tailwind v4)

Assim que o arquivo `design-system/MASTER.md` for gerado, você deve ler as especificações de cores e tipografias recomendadas e atualizar o arquivo [globals.css](file:///E:/_Antigravity%20Pro/alabz-template-base/app/globals.css) de forma cirúrgica:

1. **Importação do Google Fonts**:
   No topo do arquivo `app/globals.css`, antes da diretiva `@import "tailwindcss";` ou logo após, adicione o `@import url(...)` exato fornecido no `MASTER.md` sob a chave de tipografia.
   *   *Exemplo:* `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&family=Satoshi&display=swap');`

2. **Substituição de Variáveis `:root`**:
   Atualize as seguintes variáveis do bloco `:root` no `app/globals.css` com os valores correspondentes extraídos do `MASTER.md`:
   *   `--color-primary`: Cor primária sugerida.
   *   `--color-secondary`: Cor secundária sugerida.
   *   `--color-accent`: Cor de destaque (CTA).
   *   `--font-display`: Nome da família de fonte de títulos (ex: `'Playfair Display', serif`).
   *   `--font-body`: Nome da família de fonte do corpo (ex: `'Satoshi', sans-serif`).
   *   `--color-footer-bg`: Cor de fundo do rodapé (calibre uma cor que se destaque da cor de fundo padrão da página, geralmente um tom mais profundo e fechado da paleta, para destacar a marca do desenvolvedor).
   *   `--color-footer-text`: Cor do texto do rodapé (claro para fundo escuro, ou escuro para fundo claro).

3. **Garantia de Tema**:
   Não altere a diretiva `@theme inline` que mapeia as variáveis para o Tailwind, pois ela está configurada para ler estes valores do `:root`. Isso garante que as classes Tailwind `bg-brand-primary`, `bg-brand-accent` e `font-display` se adaptem instantaneamente às novas especificações de cores e tipografia.

---

## 🚫 PROTOCOLO ANTI-GENERICISMO E DETECÇÃO DE FALLBACK FAJUTO (UI/UX)

É terminantemente proibido realizar entregas mecanizadas ou layouts com "cara de IA genérica / SaaS de tecnologia" para clientes que possuem negócios físicos, artesanais, rústicos, de lazer, saúde holística ou gastronomia regional.

### 1. Gatilho de Alerta de Fallback da CLI
Sempre que rodar a CLI `.agents/ui-ux-pro-max/scripts/search.py` e o resultado sugerido for o estilo "Glassmorphism" ou "SaaS Dashboard" (ou similares voltados a software/tecnologia) para negócios que claramente demandam apelo físico, emocional e calor humano, o agente deve entrar em estado de Alerta de Incompatibilidade.

### 2. Ação Obrigatória de Pivotagem
Caso o Alerta de Incompatibilidade seja ativado, o agente fica PROIBIDO de implementar as cores e tipografias de fallback de forma direta no globals.css. Em vez disso, deve obrigatoriamente:
1. Parar a execução automatizada.
2. Alertar explicitamente o usuário no chat de que a busca automatizada da CLI resultou em uma estrutura inadequada para o tom de voz da marca daquele nicho específico.
3. Propor ativamente e utilizar as seguintes skills alternativas para conceituar um design system manual e curado:
   - `/taste-design`: Para definir uma especificação de design semântico e tipografia anti-genérica premium com alma.
   - `/frontend-design` ou `/ux-front-end-architect`: Para estruturar a hierarquia de composição rústica, contraste, e sensação humana acolhedora.

### 3. Curadoria Tipográfica Obrigatória (Sem Fontes de Robô)
Negócios físicos e acolhedores não usam fontes corporativas frias (como 'Plus Jakarta Sans', 'Inter' ou 'Satoshi') em conjunto com serifas urbanas formais (como 'Playfair Display') de maneira padrão.
- Se o nicho é acolhedor/artesanal/campo/gastronômico: Priorize soft-serifs quentes (ex: 'Fraunces', 'Lora') combinadas com sem-serifas geométricas amigáveis (ex: 'Outfit', 'Urbanist') ou fontes display com alma (ex: 'Bricolage Grotesque').
- Justifique conceitualmente no plano de implementação a escolha de cada fonte sob a perspectiva de tom de voz da marca, e não sob a ótica de "estilo genérico de ferramenta".
