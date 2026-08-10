<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Regras Absolutas e Inegociáveis de Operação

## 🚨 CRITICAL IMMUTABLE INFRASTRUCTURE — ONG LEGACY /sistema

- **SISTEMA EM PRODUÇÃO REAL**: O sistema PHP legado da ONG Respeito Não Tem Cor está ativo em produção, utilizado por usuários e gestores reais com dados em tempo real.
- **HOMOLOGAÇÃO DEFINITIVA**: O fluxo de autenticação, login, navegação, cookies de sessão (`PHPSESSID`) e rotas para `/sistema` e `/login.php` foi 100% homologado.
- **ROTAS RESERVADAS**: As rotas `/sistema`, `/sistema/*` e `/login.php` pertencem **exclusivamente** ao sistema legado PHP hospedado na Locaweb (`respeito1.websiteseguro.com`).
- **PROIBIÇÃO DE ALTERAÇÃO**: Modificar as regras do `vercel.json` correspondentes a essas rotas pode PARAR imediatamente a operação da ONG.
- **SEM AUTORIZAÇÃO IMPLÍCITA**: Nenhum agente de IA possui autorização implícita para alterar essas regras.
- **PEDIDOS GENÉRICOS NÃO AUTORIZAM ALTERAÇÃO**: Tarefas de refatoração geral, "limpeza", "simplificação", "modernização", "migração para Next.js", "normalização de URLs", ou reformulação visual do site institucional **NÃO INCLUEM** autorização para alterar o contrato do sistema legado.
- **PARADA OBRIGATÓRIA**: Se uma tarefa exigir modificação desse contrato, o agente DEVE PARAR IMEDIATAMENTE e solicitar autorização explícita do usuário.
- **VETO DE CORREÇÃO AUTOMÁTICA**: Nunca altere automaticamente as rotas do legado para tentar "corrigir" supostos problemas sem aprovação prévia e explícita do usuário.
- **PROTEÇÃO GITHUB**: A branch main é protegida por GitHub Ruleset e qualquer alteração de produção deve passar por Pull Request e obrigatoriamente ser aprovada pelo status check `Validate Immutable Legacy Routes`.

## Deploy de Infraestrutura
É estritamente proibido usar a Vercel CLI ou tentar criar/nomear projetos diretamente na Vercel. O fluxo de deploy é 100% focado no repositório.

## Padronização e Nomenclatura de Skills (Visíveis vs. Invisíveis)
Quaisquer novas skills criadas a partir de agora na Alabz devem seguir estritamente o padrão de nomenclatura com prefixo para fins de organização no menu slash `/`:
1. **`alabz-design-`**: Relacionadas a design, identidade visual, tipografia, estilos e engenharia de frontend.
2. **`alabz-componentes-`**: Seções, componentes e blocos visuais prontos de layout.
3. **`alabz-lapidacao-`**: Processos de qualidade, homologação, refinamento e pré-deploy.

Skills internas, utilitárias ou embutidas que são executadas silenciosamente de forma automatizada por outras skills (como as ferramentas de checklist em cascata) não devem receber os prefixos e devem ser registradas na lista de exclusão do arquivo `.agents/skills.json` sob a chave `"exclude"`, impedindo que poluam o menu de comandos slash.

## Controle de Versão e Fluxo Automático de Publicação (Main Protegida)
O fluxo direto de commit e publicação na `main` (`git push origin main`) foi **EXTINTO** e **PROIBIDO**. O GitHub agora possui um Branch Ruleset ATIVO que exige Pull Request obrigatório, impedindo pushes diretos na `main`.

A regra de exibição de "VersionBadge" na UI permanece DEFINITIVAMENTE REVOGADA; não crie ou exiba elementos visuais de versão na interface.

O agente NÃO DEVE fazer commit/push espontaneamente. A intenção de publicar deve ser explícita. No entanto, se o usuário fornecer comandos explícitos, o agente deve assumir a complexidade de forma invisível.

### Fluxo Automático de Publicação (Gatilhos: "push" ou "push main")
Quando o usuário disser claramente "push" ou "push main", isso NÃO significa push direto, mas sim **PUBLICAÇÃO AUTOMÁTICA EM PRODUÇÃO PELO FLUXO PROTEGIDO**. O agente NÃO deve apresentar menus adicionais nem exigir que o usuário lembre comandos Git.

O fluxo que você DEVE executar autonomamente:
1. **Status**: Executar `git status` e identificar a branch atual.
2. **Checklists Pré-Deploy**: Executar TODOS os checklists (SEO, responsividade, build, assets, integridade visual, media) definidos neste AGENTS.md.
3. **Validação Obrigatória**: Executar obrigatoriamente `npm run validate:legacy-system`, `npm run test:legacy-validator` e `npm run build`. Se qualquer validação falhar: PARAR. NÃO publicar. Informar o erro. Nunca tente contornar a proteção.
4. **Isolamento de Branch**: Se estiver trabalhando na `main`, crie uma branch de trabalho (ex: `chore/descricao`, `feat/descricao`), PRESERVANDO todas as alterações locais e commits locais ainda não publicados (crie a branch a partir do HEAD atual). NUNCA descarte trabalho nem resete sem necessidade.
5. **Stage Seletivo**: Fazer stage (`git add`) SOMENTE dos arquivos pertinentes à tarefa.
6. **Commit Descritivo**: Criar commit com mensagem clara e detalhada.
7. **Push da Branch**: Fazer push SOMENTE da branch de trabalho. O agente NUNCA deve tentar push direto para origin main.
8. **Pull Request Automático**: Abrir PR da branch de trabalho para a `main` (usar GitHub CLI `gh pr create` etc.).
9. **Status Check**: Aguardar o check obrigatório `Validate Immutable Legacy Routes` ficar em status `SUCCESS`. Se a branch ficar behind a main, atualizar de forma segura e revalidar.
10. **Merge Automático**: Como não há exigência de aprovações (approvals = 0), após o SUCCESS dos checks, faça o merge do PR autonomamente. O pedido de "push" já engloba a aprovação de merge.
11. **Limpeza**: Após o merge, faça o checkout para a `main`, puxe a versão mais atual (`pull --ff-only`), exclua as branches locais e remotas da tarefa e garanta a working tree limpa.
12. **Relatório**: Ao final, relate ao usuário: a branch utilizada, mensagem de commit, hash, número/URL do PR, resultado do `Validate Immutable Legacy Routes`, confirmação do merge, hash final da main e o git status final.

### Comandos com Significado Específico
Se o usuário pedir:
- **"commit local"**: apenas execute o commit local, sem publicação.
- **"homologação"**: mantenha o fluxo/envio exclusivamente para a branch de homologação.
- **"não publique"**: não faça push.
- **"abra PR mas não faça merge"**: crie a branch, PR, aguarde os checks e pare, não faça o merge.

**PROIBIÇÕES ABSOLUTAS**: O agente nunca deve fazer push direto para a `main`, usar `--force` na `main`, tentar bypass do Ruleset, alterar a configuração do validador legado no Github ou alterar o `vercel.json` para facilitar a passagem nos checks de proteção. Trate todas as proteções como inegociáveis. Investigue falhas sem remover as travas.



## Otimização de Mídia
Sempre que for solicitado o uso de animações pesadas ou conversão de keyframes de vídeo para as landing pages, o agente deve recomendar e deixar à mão o seguinte comando correlato:
```bash
ffmpeg -i hero-flow-original.mp4 -vf "scale=1920:1080,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 18 -g 1 -keyint_min 1 -sc_threshold 0 -bf 0 -movflags +faststart -an hero-flow.mp4
```

### Protocolo Avançado de Compressão de Imagens (Blindagem Anti-Quebra)
Quando o usuário solicitar a compressão de imagens, o agente DEVE seguir este protocolo atômico e exato para evitar quebra de referências (404) e perda de qualidade em áreas nobres:

1. **Ingestão de Arquivos (`/.tmp`):** Todos os arquivos de mídia enviados pelo usuário para o projeto estarão sempre na pasta raiz `/.tmp`. O agente deve processá-los a partir dali, movendo para o local correto no projeto (ex: `/public`) e executando a compressão necessária.
2. **Recursividade Obrigatória:** Qualquer script de conversão de imagens na pasta `public/` DEVE obrigatoriamente varrer TODAS as subpastas de forma recursiva. Nunca limite a varredura apenas à raiz.
3. **Substituição Condicional no Código:** É ESTRITAMENTE PROIBIDO fazer um `replace` global cego ("trocar tudo de .png para .webp") nos arquivos `.tsx`. O agente deve atualizar as referências no código APENAS para os arquivos que ele efetivamente conseguiu converter e que existam fisicamente como `.webp`. 
4. **Proteção da Hero Section (Alta Fidelidade):** Imagens de abertura (Hero Section, fundos de tela inteira, fotos executivas) não devem passar pelo rolo compressor de 90%. Para imagens C-Level e da primeira dobra, mantenha os originais pesados (PNG) ou use qualidade de `98%` no WebP. 
5. **Limpeza e Relatório Final:** Ao finalizar o processo de compressão, **efetue a limpeza imediata deletando todos os arquivos originais (.png, .jpg, etc)** que viraram .webp e foram aprovados/substituídos com sucesso no código. Em seguida, gere um relatório detalhado da economia de espaço gerada.

### Blindagem Mínima de Assets e Primeira Dobra
As correções aprendidas em outros projetos devem ser consideradas parte do template, porque elas evitam que assets sumam após o push e que a primeira dobra fique quebrada em produção.

1. Antes de qualquer push de projeto novo ou de troca de mídia, valide se todo `src`, `url`, `backgroundImage` e `image` apontam para arquivos que realmente existem em `public/`.
2. Se uma imagem foi convertida para WebP, atualize todas as referências do projeto antes de publicar. Não deixe o código apontando para `png/jpg/jpeg` que já não existem.
3. Quando uma seção depende de imagem crítica de abertura, use um modo explícito de enquadramento no componente, com pelo menos três estados documentados:
   - `open-full`: abre sem corte relevante.
   - `crop-bottom`: corta a base para fechar o viewport.
   - `crop-top`: corta o topo para fechar o viewport.
4. Em headers com hero escura, o estado transparente no topo e o estado sólido ao rolar devem ser legíveis sem depender de contorno pesado nas letras. Prefira contraste real de fundo, peso de fonte adequado e logo com renderização original.
5. Sempre valide os assets críticos via HTTP local antes do push: hero, logo, galeria, fachada dia/noite e toda imagem de CTA principal devem responder `200`.
6. Depois de migração de mídia ou limpeza pesada de arquivos, reinicie o servidor local para evitar leitura de estado antigo e confira o resultado no navegador antes de publicar.

Essa blindagem é o mínimo para que novos projetos nascidos deste template não repitam o problema de "funcionou localmente, mas sumiu no site".

### PROTEÇÃO DE COMPONENTES CORE (HEADER E FOOTER PADRÃO ALABZ)
É ESTRITAMENTE PROIBIDO recriar, deletar ou sobrescrever a arquitetura interna (JSX) dos componentes `Header.tsx` e `Footer.tsx` ao receber mockups ou briefings para novos sites, a menos que o usuário exija explicitamente a "destruição do header/footer base".
Esses componentes já foram modularizados para ter o Menu Sanduíche correto, o PacmanSignature, ícones sociais isolados e a assinatura "Desenvolvido por".
Ao adaptar o template para um novo cliente, limite-se a alterar: as cores (classes do Tailwind), a logo no `siteConfig` e os links de navegação. MANTENHA A ESTRUTURA INTACTA.

## Servidor Local e Teste Mobile
Logo na primeira interação (recebimento do briefing) de um projeto, você DEVE proativamente oferecer ao usuário a ativação do servidor local para iniciar os trabalhos. 
Sempre que subir o ambiente local de um projeto, você DEVE expor o servidor para a rede local (ex: usando `next dev -H 0.0.0.0` se necessário) e me fornecer no chat duas informações de forma explícita:
1) O caminho local exato identificando a porta e a versão (ex: `http://localhost:PORTA` - [Nome do Projeto/Versão]) para evitar conflito de abas.
2) O link de IP da rede local (ex: `http://192.168.X.X:PORTA`) para eu acessar e validar o layout no smartphone.

## Arquitetura de Features e Roteamento

### Centralização para Novas Rotas e Contrato Legado Intocável
Para **NOVAS** rotas do site institucional, use a arquitetura Next.js apropriada (como `next.config.ts`).
No entanto, o **`vercel.json` atual é uma EXCEÇÃO CRÍTICA EXISTENTE**. Ele contém o contrato homologado do sistema legado (`/sistema`, `/sistema/*`, `/login.php`). Estas regras DEVEM continuar no `vercel.json`.
NUNCA mova essas regras legadas para o `next.config.ts`, `middleware.ts` ou `proxy.ts`. NUNCA as reescreva, normalize, simplifique ou remova. Novas rotas institucionais NÃO autorizam alterações nesse contrato.

### Proxy Invisível (Rewrites)
Para rodar projetos Vercel separados como se fossem pastas do domínio principal (ex: app externo no `alabz.com.br/tableau`), use obrigatoriamente a função `rewrites()` para mascarar a URL.

### Domínios Legados (Redirects)
Para capturar subdomínios antigos e redirecionar para rotas limpas, use a função `redirects()` com validação de host (código permanente 308).

### Proibição Vercel UI
Não tente resolver redirects entre projetos via painel da Vercel. A resolução é sempre 100% via código.

<RULE[Checklist Pré-Deploy] SEO de>
Antes de autorizar o primeiro deploy em produção de qualquer novo projeto gerado por este template, você DEVE proativamente:
A) Ajustar os arquivos sitemap.ts e robots.ts substituindo o placeholder pelo domínio real do projeto.
B) Instruir o usuário a fazer o deploy e testar as rotas .xml e .txt no navegador.
C) Fornecer o passo a passo exato para o usuário adicionar a URL completa do sitemap no painel do Google Search Console.
D) Validar obrigatoriamente se o favicon do projeto (em `app/icon.png` ou `app/favicon.ico`) é perfeitamente quadrado, possui dimensões com múltiplos de 48px (ex: `192x192` ou `512x512`), é uma imagem personalizada real da marca do cliente (não sendo um placeholder padrão do Next.js/Vercel) e é gerada sem erros no HTML.
</RULE[Checklist de SEO Pré-Deploy]>

### REGRA DE VERSIONAMENTO E SEGURANÇA (VIBECODING)
É terminantemente proibido alterar as rotas do Next.js ou criar subpastas para versionamento (ex: /cliente/v1). O projeto deve rodar sempre na rota raiz.
O versionamento do aplicativo deve ser mantido estritamente no código através de uma constante textual (ex: `const APP_VERSION = 'v1'`), sem a criação ou exibição de qualquer elemento visual de versão (badge/indicador) na interface do usuário (UI). A versão inicial será sempre a v1.
Sempre que o agente realizar uma alteração estrutural grande ou refatoração pesada, ele DEVE autonomamente propor a atualização dessa constante para v2, v3, etc.
FLUXO DE SEGURANÇA GIT: Toda vez que o usuário aprovar uma versão e a constante for ser atualizada (ex: mudando da v1 para a v2), o agente DEVE parar imediatamente e oferecer a ação: 'Deseja que eu crie uma branch isolada para esta versão validada (ex: release/v1) e faça o commit/push antes de começarmos a mexer no código para a próxima versão?'. Só avance para alterar o código após a resposta do usuário.

### REGRA DE LARGURA DE SEÇÕES E GRID (LAYOUT FLUIDO)
É terminantemente proibido o uso da classe nativa `container` do Tailwind ou limitadores apertados como `max-w-5xl`, `max-w-6xl` e `max-w-7xl` para as seções principais do layout. Isso causa espremimento do conteúdo em telas maiores.
Para todas as seções globais (`<section>`) do site, você DEVE adotar a seguinte estrutura de grid expansivo e responsivo:
1. O wrapper principal deve usar `w-full max-w-[1400px]` (ou até `max-w-[1600px]` se o design pedir mais respiro).
2. O wrapper sempre deve ser centralizado horizontalmente com `mx-auto`.
3. Deve existir respiro lateral nativo de segurança para dispositivos móveis usando `px-4 md:px-12` ou semelhante.
**Exemplo Obrigatório de Wrapper de Seção:**
```tsx
<section className="relative w-full overflow-hidden">
  <div className="mx-auto w-full px-4 md:px-12 max-w-[1400px]">
    {/* Conteúdo da seção */}
  </div>
</section>
```

### REGRA DE GRIDS DE CARDS E PROTEÇÃO CONTRA COLISÕES
Grades de serviços, benefícios, diferenciais, equipe, portfólio ou qualquer coleção de cards DEVEM ser dimensionadas pela largura mínima real que o conteúdo suporta, e não apenas por breakpoints genéricos de dispositivo.

1. **Capacidade antes da quantidade:** É proibido forçar cinco colunas em 1365×768 sem comprovar que a largura disponível comporta `5 × largura mínima do card + 4 × gap + paddings laterais`. Se essa soma ultrapassar a largura interna do wrapper, use quatro ou três colunas. Cinco colunas devem ficar reservadas para a largura em que a fórmula realmente couber.
2. **Padrão reutilizável:** Prefira CSS Grid com uma largura mínima configurável por seção. O valor de `--card-min` deve considerar o maior título, a descrição, o padding interno e os elementos fixos do card; ele não pode ser reduzido apenas para fazer mais colunas caberem.
   ```css
   .cards-grid {
     --card-min: 16rem;
     --card-gap: 1.5rem;
     display: grid;
     grid-template-columns: repeat(
       auto-fit,
       minmax(min(100%, var(--card-min)), 1fr)
     );
     gap: var(--card-gap);
   }
   ```
3. **Integridade da célula:** O grid deve usar faixas equivalentes a `minmax(0, 1fr)` e cada card deve possuir `min-w-0`. Textos longos devem usar quebra segura (`overflow-wrap: anywhere` quando necessária) sem reduzir a fonte a ponto de prejudicar a leitura.
4. **Fluxo vertical:** Título, descrição, CTA e demais conteúdos devem permanecer no fluxo normal, preferencialmente com `flex flex-col`. É proibido posicionar título ou descrição de forma absoluta quando isso puder causar sobreposição.
5. **Altura resiliente:** Cards não podem ter altura fixa se o conteúdo puder crescer. Quando a composição exigir alinhamento visual, use `min-height` e permita expansão. `overflow-hidden` não pode ser usado para esconder texto, colisões ou diferenças legítimas de altura.
6. **Breakpoints pelo conteúdo:** Breakpoints explícitos são permitidos quando documentam a largura mínima validada do componente. Em mobile, a grade deve ser uma coluna; em larguras intermediárias, deve reduzir colunas antes que cards, títulos ou gaps fiquem comprimidos.

### REGRA DE FUSÃO SUAVE DE IMAGEM E DESIGN (BLEND/FADE LAYOUT)
Para layouts que utilizam uma imagem ocupando uma lateral da seção e conteúdo textual na outra, é obrigatório aplicar um efeito de fusão (blend/fade) suave para que a imagem se misture gradualmente com a cor de fundo da seção, evitando linhas divisórias secas e amadoras.

#### Diretrizes de Implementação:
1. **Container da Imagem**: Deve ser `relative` e dimensionado corretamente (ex: `w-full md:w-1/2` em layouts bipartidos).
2. **Tag da Imagem**: A imagem (seja `<img>` ou `<Image>` do Next.js) deve usar as classes `w-full h-full object-cover`.
3. **Div de Overlay Absoluto**: Posicionada na borda onde a imagem encontra o fundo da seção:
   - Se a imagem está na **esquerda** (transição para a direita): use `absolute inset-y-0 right-0 w-24 md:w-48`.
   - Se a imagem está na **direita** (transição para a esquerda): use `absolute inset-y-0 left-0 w-24 md:w-48`.
   - Classes obrigatórias no overlay: `pointer-events-none z-10`.
4. **Gradiente do Fundo**: O gradiente na div de overlay deve ir de `transparent` até a **cor exata de fundo** da seção (`COR_DE_FUNDO`).
   - Transição para a direita: `bg-gradient-to-r from-transparent to-COR_DE_FUNDO` (ex: `to-[#FDFBF7]` ou `to-white`).
   - Transição para a esquerda: `bg-gradient-to-l from-transparent to-COR_DE_FUNDO`.

#### Modelos de Disposição do Texto:
1. **Texto Alinhado (Colunas Dedicadas)**: O texto fica em sua própria coluna limpa, sem invadir a imagem.
2. **Texto Deslocado (Offset/Sobreposição)**: O texto é deslocado horizontalmente (ex: margem negativa ou posicionamento absoluto) para se sobrepor suavemente à borda fundida da imagem, criando um layout editorial premium.

**Exemplo Prático (Imagem na Esquerda com Fusão para a Direita, Fundo `#FDFBF7`):**
```tsx
<section className="relative w-full overflow-hidden bg-[#FDFBF7] py-16 md:py-24">
  <div className="mx-auto w-full px-4 md:px-12 max-w-[1400px]">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      
      {/* Container da Imagem com Efeito de Fusão */}
      <div className="relative col-span-1 md:col-span-6 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
        <img 
          src="/exemplo-paes.jpg" 
          alt="Café e Padaria Caseira" 
          className="w-full h-full object-cover"
        />
        {/* Overlay do Gradiente de Fusão (suaviza a transição da esquerda para a direita) */}
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 pointer-events-none z-10 bg-gradient-to-r from-transparent to-[#FDFBF7]" />
      </div>

      {/* Conteúdo Textual (Opção: Alinhado na sua Coluna) */}
      <div className="col-span-1 md:col-span-6 md:pl-8 flex flex-col justify-center">
        <h2 className="text-3xl md:text-5xl font-serif text-[#3D1A1A] mb-6">
          Uma pausa gostosa muda o ritmo do dia.
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
          Seja para tomar um café, encontrar alguém ou levar suas escolhas favoritas para casa.
        </p>
      </div>

      {/* Opção (Texto Deslocado/Offset): Caso queira que o texto sobreponha suavemente a fusão, 
          basta aplicar classes como md:-ml-12 md:z-20 no container de texto. */}
    </div>
  </div>
</section>
```

### DIRETRIZ E TEMPLATE: HERO SECTION PREMIUM (C-LEVEL)
Sempre que for solicitada a criação ou edição de uma seção Hero (especialmente para perfis executivos/C-Level), você deve seguir o seguinte template padrão para que a seção nasça pronta sem necessidade de re-explicação:
- **Objetivo**: Criar um Hero Section cinematográfico com o carrossel de imagens rotacionando diretamente no background e ocupando no mínimo a altura dinâmica disponível da tela (`min-h-dvh` ou cálculo equivalente), sem altura rígida, bordas ou contêineres limitadores.
- **Comportamento**: Carrossel automático (crossfade suave a cada 3 segundos), sem setas ou pontos de paginação visíveis.
- **Transições de Slide (Efeito Ken Burns)**: Use Framer Motion (`motion.div` ou `motion.img`) para gerenciar a troca de slides. As imagens ativas devem fazer um zoom contínuo e suave (ex: de `scale(1.02)` a `scale(1.10)` em `5s`) e crossfade de opacidade de `1.5s` para uma transição fluida, evitando transições secas em CSS puro que conflitam com estilos nativos do Next.js.
- **Efeito Mouse Parallax (Alta Performance)**: 
  - Sempre vincule os eventos de pointer (`onPointerMove` e `onPointerLeave`) diretamente no elemento React da `<section>` do Hero, eliminando listeners globais no `window` e checagens constantes de `getBoundingClientRect()` que causam travamento (layout thrashing).
  - Limite a movimentação do parallax a valores sutis em JS (máximo `24px` horizontal e `12px` vertical).
  - No CSS, utilize transições suaves com curva amortecida de inércia: `transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);`.
- **Layout & Texto**: O texto C-Level e os CTAs principais ficam posicionados à esquerda, ocupando cerca de 8 colunas do grid principal (ex: `col-span-12 lg:col-span-8`).
- **Blend de Fusão**: Aplicar efeito de fusão suave de 2/3 à esquerda (gradiente escuro da cor de fundo para transparente) para integrar invisivelmente a foto à direita com a área de texto, garantindo contraste e legibilidade absolutos.

### PORTABILIDADE DE HERO E SEÇÕES EM DESKTOP
Para garantir que a Hero apareça integralmente assim que o site abrir, sem deixar sobra visual na parte de baixo da viewport, e para manter a mesma leitura em notebooks e Full HD, aplique estas regras:
1. A Hero não deve nascer abaixo do header fixo; o header permanece sobreposto e conta dentro da altura visual da primeira dobra.
2. A imagem principal da Hero deve ocupar `100dvh` no eixo vertical quando a composição pedir abertura integral.
3. O conteúdo textual da Hero deve receber apenas `padding-top: calc(var(--header-height) + espacamento)` para evitar colisão com o header, sem empurrar a seção inteira para baixo.
4. A imagem da Hero deve preferir `object-position: center bottom` quando a base da imagem precisa continuar visível em diferentes alturas de tela.
5. Se uma seção de destaque precisar fechar a tela inteira em desktop, aplique `min-height: 100dvh` em `@media (min-width: 1024px)` e controle o respiro no wrapper interno, não na altura da própria seção.
6. Evite compactar a Hero ou a seção de destaque reduzindo demais imagens, textos ou cards; compacte primeiro os espaçamentos internos.
7. Remova qualquer `padding-top` global em `main` que empurre a página inteira para baixo por causa do header, porque isso quebra a primeira dobra.
8. Sempre avise o usuário que, quando o header tiver fundo sólido, alguns pixels do topo da Hero ficarão ocultos atrás dele por efeito de sobreposição visual, e isso é esperado.
9. Quando o objetivo for preencher o viewport inteiro sem sobrar nada embaixo, a Hero pode usar enquadramento com corte na base da imagem e foco no topo, preservando a leitura da composição.

```css
.hero-section {
  min-height: 100dvh;
}

.hero-image {
  object-position: center bottom;
}

.hero-image--top-focus {
  object-position: center top;
}

.hero-content {
  min-height: 100dvh;
  padding-top: calc(var(--header-height) + 2rem);
  padding-bottom: 2rem;
}

@media (min-width: 1024px) {
  .feature-section {
    min-height: 100dvh;
  }

  .feature-section > .section-shell {
    min-height: 100dvh;
    padding-top: calc(var(--header-height) + 1.5rem);
    padding-bottom: 1.5rem;
  }
}
```


### REGRA DE APLICAÇÃO DE FONTES DINÂMICAS (UI-UX-PRO-MAX)
Toda vez que o design system for gerado pelo comando `/alabz-design-ui-ux-pro-max` ou `/alabz-design-frontend` com base em um briefing, você DEVE:
1. Substituir a diretiva `@import url(...)` localizada na PRIMEIRA LINHA do arquivo `app/globals.css` pelo novo link de importação sugerido pelo gerador.
2. Atualizar as variáveis `--font-display` e `--font-body` no bloco `:root` de `app/globals.css` usando o nome exato da fonte importada do Google Fonts (ex: `'Outfit', sans-serif` ou `'Lora', serif`).
3. Nunca manter ou declarar nomes de fontes proprietárias (como 'Satoshi') que não existam no escopo do Google Fonts importado.

## 🚫 PROTOCOLO ANTI-GENERICISMO E DETECÇÃO DE FALLBACK FAJUTO (UI/UX)
É terminantemente proibido realizar entregas mecanizadas ou layouts com "cara de IA genérica / SaaS de tecnologia" para clientes que possuem negócios físicos, artesanais, rústicos, de lazer, saúde holística ou gastronomia regional.

### 1. Gatilho de Alerta de Fallback da CLI
Sempre que rodar a CLI `.agents/alabz-design-ui-ux-pro-max/scripts/search.py` e o resultado sugerido for o estilo "Glassmorphism" ou "SaaS Dashboard" (ou similares voltados a software/tecnologia) para negócios que claramente demandam apelo físico, emocional e calor humano, o agente deve entrar em estado de Alerta de Incompatibilidade.

### 2. Ação Obrigatória de Pivotagem
Caso o Alerta de Incompatibilidade seja ativado, o agente fica PROIBIDO de implementar as cores e tipografias de fallback de forma direta no globals.css. Em vez disso, deve obrigatoriamente:
1. Parar a execução automatizada.
2. Alertar explicitamente o usuário no chat de que a busca automatizada da CLI resultou em uma estrutura inadequada para o tom de voz da marca daquele nicho específico.
3. Propor ativamente e utilizar as seguintes skills alternativas para conceituar um design system manual e curado:
   - `/alabz-design-taste`: Para definir uma especificação de design semântico e tipografia anti-genérica premium com alma.
   - `/alabz-design-frontend` ou `/ux-front-end-architect`: Para estruturar a hierarquia de composição rústica, contraste, e sensação humana acolhedora.

### 3. Curadoria Tipográfica Obrigatória (Sem Fontes de Robô)
Negócios físicos e acolhedores não usam fontes corporativas frias (como 'Plus Jakarta Sans', 'Inter' ou 'Satoshi') in conjunto com serifas urbanas formais (como 'Playfair Display') de maneira padrão.
- Se o nicho é acolhedor/artesanal/campo/gastronômico: Priorize soft-serifs quentes (ex: 'Fraunces', 'Lora') combinadas com sem-serifas geométricas amigáveis (ex: 'Outfit', 'Urbanist') ou fontes display com alma (ex: 'Bricolage Grotesque').
- Justifique conceitualmente no plano de implementação a escolha de cada fonte sob a perspectiva de tom de voz da marca, e não sob a ótica de "estilo genérico de ferramenta".

### REGRA DE ALTURA DE VIEWPORT E COMPACTAÇÃO DE ALTURA (RESILIÊNCIA EM LAPTOPS E MOBILE)
Para evitar que layouts quebrem, transbordem (overflow) ou exibam barras de rolagem desnecessárias em telas curtas (como laptops compactos 1366x768) ou com zoom de acessibilidade aplicado, siga estas regras:
1. **Banimento de Altura Viewport Rígida:** É terminantemente proibido o uso de `h-screen`, `h-[100vh]` ou `height: 100vh` fixo para as seções principais do layout.
2. **Padrão de Seção em Viewport:** Toda seção principal deve nascer com a classe explícita `.section-viewport`, equivalente a `min-height: calc(100dvh - var(--header-height))`. Isso garante uma tela útil completa sem impedir que a seção cresça. É proibido alcançar esse comportamento por seletor global de `section`.
3. **Exceções de Altura Natural:** Faixas auxiliares, indicadores, grupos de cards imediatamente abaixo do Hero ou outras composições aprovadas com altura natural devem declarar explicitamente `.section-natural`. Footer não é seção de viewport. A exceção deve constar no design contract do cliente.
4. **Compactação opt-in para telas curtas:** Qualquer compactação deve ser autorizada explicitamente no componente por uma classe como `.laptop-compact`. É proibido criar media query que altere globalmente `section`, `h1`, `h2`, `h3`, `.relative.w-full`, utilitários `.py-*`, `.mb-*`, `.my-*` ou seletores genéricos equivalentes.
   ```css
   @media (max-height: 800px) and (min-width: 1024px) {
     .laptop-compact {
       --compact-space-block: clamp(2.5rem, 6vh, 5rem);
       --compact-content-gap: clamp(1rem, 2.5vh, 2rem);
     }

     .laptop-compact__content {
       padding-block: var(--compact-space-block);
       gap: var(--compact-content-gap);
     }
   }
   ```
5. **Escopo e preservação:** A classe opt-in deve afetar apenas o componente que a declara. Não reduza automaticamente Header, Hero ou faixa de indicadores por causa da altura da viewport; preserve a composição aprovada em Full HD, salvo variante responsiva específica aprovada no design contract do cliente.
6. **Proibições de mascaramento:** Não use `transform: scale()`, fontes minúsculas, `overflow: hidden` para ocultar falhas, larguras fixas maiores que a viewport ou deslocamentos arbitrários para forçar o encaixe.
7. **Proteção da identidade:** A adaptação de laptop deve preservar copy, paleta, fontes, imagens e arquitetura visual. Mude apenas distribuição, fluxo, quantidade de colunas ou espaçamento explicitamente autorizado.

### CHECKLIST DE ACEITE RESPONSIVO (OBRIGATÓRIO)
Antes de considerar uma interface pronta, valide em navegador real nas viewports `1920×1080`, `1365×768` e `390×844`. Não aprove apenas por leitura do código.

1. Confirme `document.documentElement.scrollWidth <= window.innerWidth` em todas as três viewports.
2. Inspecione com `getBoundingClientRect()` Header, logo, navegação, grupo direito, grids e todos os cards relevantes.
3. Confirme que nenhum card intersecta outro, que nenhum texto está cortado ou sobreposto e que cards podem crescer verticalmente.
4. No desktop, confirme diferença máxima de `0,5px` entre os centros verticais da faixa do Header e de logo, navegação e grupo direito; confirme também a navegação a no máximo `0,5px` do centro horizontal da viewport.
5. No mobile, confirme logo à esquerda e botão sanduíche à direita, ambos no centro vertical da faixa.
6. Compare screenshots das três viewports e confirme que Hero e faixa imediatamente abaixo mantêm a proporção e a hierarquia aprovadas, sem compactação automática por altura.
7. Verifique o console sem erros e execute `npx tsc --noEmit` e `npm run build` antes da entrega de código. Registre no relatório as medidas obtidas, screenshots e arquivos alterados.

### REGRA DE COMPORTAMENTO DE MODAIS E POPUPS (RESILIÊNCIA E ACESSIBILIDADE)
Ao criar ou editar qualquer componente de modal, popup ou janela flutuante, você DEVE garantir o seguinte comportamento:
1. **Bloqueio de Scroll de Fundo:** Ao abrir o popup, trave o scroll da página aplicando `document.body.style.overflow = 'hidden'`. Restaure para o comportamento normal ao fechar.
2. **Fechamento pelo Teclado:** Registre um event listener para fechar o popup imediatamente quando a tecla `Esc` (Escape) for pressionada.
3. **Layout de Duas Colunas no Desktop/Laptop:** Em vez de empilhar todas as informações do modal verticalmente (o que o torna excessivamente comprido, exigindo rolagem), expanda a largura máxima do modal (ex: `max-w-2xl` ou `max-w-3xl`) em telas de desktop/laptop e separe o conteúdo em duas colunas paralelas (`grid grid-cols-1 md:grid-cols-2`). No mobile, mantenha o empilhamento padrão.

### REGRA DE RECURSOS OPCIONAIS (FORMULÁRIOS & COOKIE BANNER/LGPD & GA4/GTM)
Durante a construção de novos sites ou páginas a partir deste template base, o agente **DEVE obrigatoriamente ofertar (perguntar)** ao usuário se os seguintes recursos adicionais serão ativados para o projeto:
1. **Trabalhe Conosco (Formulário de Recrutamento)**:
   - Se **ativado**: Garanta a presença do componente `FormTrabalheConosco` e a rota correspondente de submissão na API (`/api/forms/submit`) conectada ao Resend com suporte a anexos diretos de arquivos. **O agente deve obrigatoriamente perguntar qual é o e-mail do destinatário que receberá os currículos para configurá-lo na variável de ambiente `CONTRATANTE_EMAIL`.**
   - Se **desativado**: O recurso deve ser desabilitado e as páginas de teste correspondentes (`/teste-forms`) removidas antes do deploy de produção.
2. **Consentimento de Cookies (Banner LGPD)**:
   - Se **ativado**: O componente `<CookieBanner />` deve ser integrado no layout principal (`app/layout.tsx`) e a rota correspondente de registro de consentimento (`cookies_consent`) mantida ativa na API.
   - Se **desativado**: O componente do banner deve ser completamente removido de `app/layout.tsx` para otimizar o carregamento e evitar chamadas de rede redundantes.
3. **Métricas e Tráfego (Google Analytics 4 / Google Tag Manager)**:
   - Se **desativado**: Remova `<AnalyticsLoader />` de `app/layout.tsx` para evitar carregamento desnecessário de scripts do Next.js.

### OS INEGOCIÁVEIS DA ALABZ (REGRAS DE CONSTRUÇÃO)
Independentemente da macroestrutura, tema ou componente escolhido, TODOS os projetos devem NASCER com:
1. **Usabilidade Mobile Absoluta:** O layout jamais pode estourar a tela horizontalmente (sem overflow de caracteres). Elementos devem ser reempilhados e fontes redimensionadas para garantir leitura perfeita em telas pequenas.
2. **Menu Sanduíche Mobile:** Qualquer Navbar escolhida DEVE colapsar para um menu sanduíche funcional no mobile (o estilo visual pode variar, mas o padrão de interação é obrigatório).
3. **Assinatura Footer Alabz:** Independentemente do archetype de Footer escolhido, a base extrema inferior do footer DEVE conter obrigatoriamente: "Desenvolvido por Alabz" acompanhado da sua logo e da animação do Pacman.
4. **Ícone Flutuante do WhatsApp:** Todo projeto deve nascer obrigatoriamente com o componente de botão flutuante do WhatsApp ativo e globalmente visível.

### PROTOCOLO DE ONBOARDING VISUAL — REGRA ABSOLUTA (COM BLOQUEIO DE CÓDIGO)

> [!IMPORTANT]
> **VETO DE ESCRITA DE CÓDIGO PRECOCE:** É terminantemente proibido criar arquivos de seções (`components/sections/*`) ou alterar o layout da página principal (`app/page.tsx`) sem que o Amorim tenha escolhido uma das 3 macroestruturas, aprovado o mockup/wireframe correspondente e o arquivo `.alabz/design-contract.md` tenha sido criado. O agente que violar esta regra e pular direto para a codificação de layout falhará com as regras do projeto.

Antes de iniciar qualquer codificação de um novo projeto cliente, o agente DEVE seguir estritamente estes passos:

#### Passo 1 — Leitura do Briefing
Absorva todos os insumos fornecidos: logo, assets, copy, paleta de identidade, referências visuais, nicho, público-alvo e objetivos do projeto.

#### Passo 2 — Consulta ao Log Central
Leia `E:\_Antigravity Pro\.alabz\projects-log.json`. Use os dados para sugerir direções frescas e evitar monotonia estrutural, mas permita e acate solicitações explícitas do usuário para reutilizar combinações de sucesso de projetos anteriores.

#### Passo 3 — Seleção das 3 Opções
Com base no briefing e no log, selecione 3 macroestruturas do catálogo em `.agents/skills/alabz-design-frontend/references/macrostructures.md` que sejam adequadas ao nicho e estruturalmente diferentes entre si.

#### Passo 4 — Apresentação e Pergunta (OBRIGATÓRIO)
Apresente as 3 macroestruturas com wireframe ASCII resumido de cada uma. Em seguida, pergunte EXPLICITAMENTE:
> "Qual dessas direções estruturais faz mais sentido para este projeto?
> E como você quer validar antes de codar?
> **A** — Wireframe estrutural no chat
> **B** — Mockup visual gerado no chat
> **C** — Evoluir no Stitch antes de começar o código"

#### Passo 5 — Execução da Validação Escolhida
> [!CAUTION]
> **RESTRIÇÃO DO STITCHMCP:** É expressamente proibido fazer chamadas de ferramentas do `StitchMCP` (como `list_projects`, `create_project`, etc.) proativamente nas fases de planejamento (Passos 1 a 4). Só acione o `StitchMCP` se o usuário escolher expressamente a **Opção C** no Passo 4 ou se ele ordenar diretamente no chat.

- **A:** Gere wireframe ASCII detalhado seção a seção. Aguarde aprovação.
- **B:** Use `generate_image` para criar mockup visual com branding do cliente. Aguarde aprovação.
- **C:** Use o StitchMCP para gerar screens da proposta. Compartilhe o link. Aguarde aprovação.

#### Passo 6 — Criação do Design Contract
Após aprovação EXPLÍCITA do Amorim, crie `.alabz/design-contract.md` na raiz do projeto com a estrutura completa aprovada. O contrato é LEI — nenhuma seção pode divergir sem nova aprovação explícita.

#### Passo 7 — Registro no Log
Após a primeira entrega (deploy de homologação), grave a entrada no log central `E:\_Antigravity Pro\.alabz\projects-log.json`.


### REGRA DE COMPOSIÇÃO: ZPATTERN-MINI (ESTRUTURA COMPACTA DE CTA)
Ao criar ou editar seções finais de chamada para ação compostas por uma faixa de CTA e uma faixa de fatos/benefícios:
1. **Unificação de Seção:** Sempre consolide ambas as faixas em uma única seção lógica (section-natural), eliminando quebras desnecessárias.
2. **Layout dos Cards de Benefício:** Prefira layout horizontal (lex-row items-center justify-center gap-5) com texto alinhado à esquerda para os cards de fatos. Isso evita o alongamento vertical excessivo e mantém a mesma altura proporcional da faixa de chamada superior.
3. **Simetria de Padding:** Aplique exatamente a mesma densidade vertical (ex: py-8) em ambas as faixas para que pareçam partes do mesmo bloco visual homogêneo.


