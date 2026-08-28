# Diagnóstico Técnico de Carregamento de Imagens — ONG Respeito Não Tem Cor

**Projeto:** `alabz-cliente-ong-respeitonaotemcor-v2`  
**Ambiente Auditado:** Localhost (`http://localhost:3000`)  
**Data:** 28/08/2026  
**Status do Código:** 100% Preservado (Nenhuma alteração de código ou infraestrutura foi realizada).

---

## 1. Resumo Executivo

Esta auditoria mapeou todo o pipeline de entrega, renderização e ciclo de vida de imagens no site institucional da **ONG Respeito Não Tem Cor**.

### Principais Constatações:
1. **Zero Consumo de Vercel Image Optimization (`next/image`):** O projeto utiliza exclusivamente tags HTML nativas `<img>` e `<picture>` com assets pré-otimizados em WebP servidos diretamente da pasta `public/`. Não há nenhuma requisição para `/_next/image` nem custos de computação de transformação em borda.
2. **Vazamento do Hero Mobile em Desktop:** No carregamento inicial do Desktop (1365x768), a imagem mobile (`hero-mobile-v2.webp`) é baixada desnecessariamente devido ao uso de `loading="eager"` + `fetchPriority="high"` dentro de uma `<div>` com `block lg:hidden`. O *Preload Scanner* do navegador antecipa a requisição antes da avaliação completa do CSS responsivo.
3. **Comportamento da Galeria:** A seção da Galeria possui 22 itens cadastrados. No DOM, são montados simultaneamente **44 elementos `<img>`** (22 nos slides do carrossel principal + 22 na barra de miniaturas/thumbnails). Como todos possuem `loading="lazy"`, **zero imagens da galeria são requisitadas na carga inicial sem scroll**. Porém, ao rolar a página até a galeria, todos os 22 arquivos WebP são baixados de uma vez.
4. **Isolamento de Infraestrutura e Legado:** As rotas `/sistema`, `/login.php`, `vercel.json` e o proxy reverso permanecem 100% isolados e intocados.

---

## 2. Total de Imagens e Mídias Encontradas

### Mapeamento Completo por Componente

| Seção / Componente | Arquivo Fonte | Qtd Tags `<img>` no DOM | Tags Utilizadas | Loading | FetchPriority | Decoding | Variantes Mobile/Desktop no DOM |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Header (Logo)** | `components/layout/Header.tsx` | 1 | `<img>` | Padrão (Eager) | Padrão | Padrão | Única (`favicon-sem-fundo.webp`) |
| **Hero Section** | `components/sections/HeroSection.tsx` | 2 | `<img>` + `<picture>` | `eager` (Mob) / Padrão (Desk) | `high` (Mob) / Padrão (Desk) | Padrão | Dupla no DOM (`hero-mobile-v2.webp` + `roda_livro-v2.webp`) |
| **Quem Somos** | `components/sections/QuemSomosSection.tsx` | 1 | `<img>` | `lazy` | Padrão | `async` | Única (`faixada dia.webp`) |
| **Como Acolhemos** | `components/sections/ComoAcolhemosSection.tsx` | 0 | *Nenhuma (Ícones Lucide)* | — | — | — | — |
| **Projetos e Frentes** | `components/sections/ProjetosFrentesSection.tsx` | 4 | `<img>` | `lazy` | Padrão | `async` | 4 cards com imagens distintas |
| **Brechó Solidário** | `components/sections/BrechoSection.tsx` | 1 | `<img>` | `lazy` | Padrão | `async` | Única (`brecho-roupas.webp`) |
| **Origem (Fundadora)** | `components/sections/AboutFounderSection.tsx` | 4 | `<img>` | `lazy` | Padrão | `async` | Duplicada no DOM: avatar mobile `fundadora2.webp` + desktop portrait `fundadora2.webp` + bg `founder_bg.jpeg` + assinatura PNG |
| **Depoimentos** | `components/sections/ReviewsSection.tsx` | 0 | *Nenhuma (Texto e CSS)* | — | — | — | — |
| **Galeria da ONG** | `components/sections/GalleryPlaceholderSection.tsx` | 44 | `<img>` | `lazy` | Padrão | `async` | 22 slides principais + 22 thumbnails montados |
| **Contribuição** | `components/sections/ContributionSection.tsx` | 2 | `<img>` | `lazy` | Padrão | `async` | Duplicada no DOM: mobile bg `maocoração.webp` + desktop column `maocoração.webp` |
| **Localização** | `components/sections/LocationSection.tsx` | 2 | `<img>` | `lazy` | Padrão | `async` | `faixada dia.webp` + `faixada noite.webp` (crossfade) |
| **Convite Visita** | `components/sections/VisitInvitationSection.tsx` | 1 | `<img>` | `lazy` | Padrão | `async` | Única (`footer.webp`) |
| **Footer** | `components/Footer.tsx` | 2 | `<img>` | `lazy` | Padrão | `async` | Logo Alabz (`Logofooter 1.webp`) + Logo ONG |

* **Total de elementos `<img>` presentes no DOM:** **64 elementos**.
* **Total de elementos com `loading="lazy"`:** **61 elementos**.
* **Total de elementos com `loading="eager"` / `fetchPriority="high"`:** **1 elemento** (`hero-mobile-v2.webp`).
* **Total de elementos sem atributo de loading explícito:** **2 elementos** (Logo do Header e spacer 1x1 GIF do `<picture>` no Hero).

---

## 3. Estratégia Atual do Hero

* **Estrutura JSX:**
  * **Variante Mobile:** `<img src="/images/hero-mobile-v2.webp" loading="eager" fetchPriority="high" />` dentro de `<div className="block lg:hidden">`.
  * **Variante Desktop:** `<picture><source media="(min-width: 1024px)" srcSet="/images/roda_livro-v2.webp" /><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" /></picture>` dentro de `<div className="hidden lg:block">`.
* **Comportamento Observado:**
  * **No Mobile (390x844):** Baixa apenas `hero-mobile-v2.webp`. O `<picture>` com media query impede o download de `roda_livro-v2.webp`.
  * **No Desktop (1365x768):** O navegador baixa **AMBAS as imagens** (`hero-mobile-v2.webp` e `roda_livro-v2.webp`). Isso ocorre porque `fetchPriority="high"` e `loading="eager"` instruem o *browser preload scanner* a iniciar a requisição imediatamente antes de calcular se o seletor `.hidden.lg:block` ou `lg:hidden` oculta o elemento.

---

## 4. Estratégia Atual das Seções Abaixo da Dobra

* Todas as imagens das seções institucionais possuem `loading="lazy"` e `decoding="async"`.
* **Antecipação da 2ª dobra (Quem Somos):** A imagem `faixada dia.webp` está localizada a ~800px do topo. Como os navegadores modernos (Chrome/Edge) aplicam uma margem de lookahead de ~1000px a 1250px para `loading="lazy"`, ela é requisitada já na carga inicial ou imediatamente no primeiro micro-scroll.
* **Demais seções (Projetos, Brechó, Fundadora, Contribuição, Localização, Rodapé):** O lazy loading nativo funciona conforme esperado; os assets só são solicitados pela rede à medida que o usuário se aproxima de cada seção.

---

## 5. Estratégia Atual da Galeria

* **Volume de Conteúdo:** 22 imagens de alta resolução cadastradas em `GALLERY_ITEMS`.
* **Montagem no DOM:**
  * **Carrossel Principal:** Renderiza todos os 22 slides simultaneamente em um container `flex` com movimentação via `framer-motion` (`x`).
  * **Miniaturas (Thumbnails):** Renderiza uma barra com todas as 22 miniaturas de uma vez.
  * **Total no DOM:** 44 tags `<img>`.
* **Carga Inicial (Sem Scroll):** **Zero requisições**. O `loading="lazy"` nativo segura todas as 44 tags até que o usuário chegue na seção `#galeria`.
* **Carga ao Atingir a Seção:** Ao rolar até a galeria, o navegador dispara o download de **todas as 22 imagens** de uma vez só. Como o carrossel e as miniaturas compartilham as mesmas URLs, o navegador reutiliza o cache em memória para as miniaturas, gerando 22 requests de rede (e não 44).
* **Filtros por Categoria:** Ao clicar em uma categoria (ex: "Oficinas" ou "Rede de Apoio"), o componente apenas altera o índice ativo (`setIndex`), mantendo todos os 22 itens montados no DOM.
* **Modal / Lightbox Fullscreen:** Utiliza renderização condicional `{isFullscreen && (...)}` via `<AnimatePresence>`. O modal só monta sua imagem no DOM quando é ativamente aberto pelo usuário. **Não faz preload oculto.**

---

## 6. Uso de `next/image` vs `<img>` vs `<picture>`

* **`next/image`:** **0% de adoção**. Nenhuma página ou componente importa `next/image`.
* **`<picture>`:** **1 ocorrência** (`components/sections/HeroSection.tsx` para o background desktop com media query).
* **`<img>` nativo:** **98% de adoção** (63 elementos).
* **Impacto:** Os arquivos são servidos diretamente pelo servidor web estático com zero latência de recompressão on-the-fly e zero consumo de limite do Vercel Image Optimization.

---

## 7. Quantidade de `/_next/image` por Carga Inicial

* **Total de chamadas `/_next/image`:** **0 (zero)**.

---

## 8. Quantidade de `/_next/image` após Scroll Completo

* **Total de chamadas `/_next/image`:** **0 (zero)**.

---

## 9. Benchmark Desktop (1365×768)

*Ambiente: Google Chrome Headless via Chrome DevTools Protocol (CDP) em `http://localhost:3000`.*

| Métrica | Cenário 1: Carga Inicial (Sem Scroll) | Cenário 2: Scroll Completo até o Rodapé |
| :--- | :---: | :---: |
| **Total de Requisições de Rede** | 37 requests | 72 requests |
| **Requisições de Imagens** | 9 requests (inclui ícones internos) | 43 requests |
| **Chamadas para `/_next/image`** | 0 | 0 |
| **Total Transferido (Bytes codificados)** | 10.2 KB *(HTML/CSS/JS base)* | 18.7 KB *(transferência HTTP local)* |
| **Imagens Requisitadas pela Aplicação** | 4 imagens (`favicon`, `hero-mobile-v2`, `roda_livro-v2`, `faixada dia`) | 27 imagens únicas (Hero + Seções + 22 da Galeria + Footer) |
| **Tags `<img>` no DOM** | 64 | 64 |
| **Tags com `loading="lazy"`** | 61 | 61 |
| **Tags com `loading="eager"` / `high`** | 1 | 1 |

---

## 10. Benchmark Mobile (390×844)

*Ambiente: Emulação iPhone Mobile via Chrome DevTools Protocol (CDP) em `http://localhost:3000`.*

| Métrica | Cenário 1: Carga Inicial (Sem Scroll) | Cenário 2: Scroll Completo até o Rodapé |
| :--- | :---: | :---: |
| **Total de Requisições de Rede** | 75 requests | 88 requests |
| **Requisições de Imagens** | 13 requests | 41 requests |
| **Chamadas para `/_next/image`** | 0 | 0 |
| **Total Transferido (Bytes codificados)** | 9.9 KB | 15.9 KB |
| **Imagens Requisitadas pela Aplicação** | 3 imagens (`favicon`, `hero-mobile-v2`, `faixada dia`) | 26 imagens únicas |
| **Tags `<img>` no DOM** | 64 | 64 |
| **Tags com `loading="lazy"`** | 61 | 61 |
| **Tags com `loading="eager"` / `high`** | 1 | 1 |

---

## 11. Multiplicadores de Requests Encontrados

1. **Vazamento do Hero Mobile em Telas Desktop:** A imagem `hero-mobile-v2.webp` é baixada no Desktop por conta do `loading="eager"` + `fetchPriority="high"` na tag `<img>` oculta por classe CSS.
2. **Duplicação de Nós no DOM para Responsividade:**
   * `AboutFounderSection.tsx`: `fundadora2.webp` existe no container mobile (circular) e no container desktop (portrait completo).
   * `ContributionSection.tsx`: `maocoração.webp` existe na marca d'água mobile e na coluna visual desktop.
3. **Disparo Simultâneo na Galeria:** Ao atingir a seção `#galeria`, 22 imagens de alta resolução disparam requisições de rede ao mesmo tempo porque todos os 22 slides e 22 miniaturas já estão inseridos no DOM com `loading="lazy"`.

---

## 12. Pontos Já Bem Otimizados

* 🟢 **Formato Moderno WebP Padronizado:** Quase a totalidade das fotos (hero, seções, 22 imagens da galeria) está em formato WebP de alta eficiência (pesos médios entre 130 KB e 380 KB).
* 🟢 **Zero Overhead de Image Optimizer Server-Side:** Ao não utilizar `next/image`, o site não consome cotas de servidor e elimina processamento dinâmico em tempo de execução.
* 🟢 **Controle de Lightbox:** O modal de tela cheia da galeria não consome recursos nem monta imagens enquanto está fechado.
* 🟢 **Blindagem de Seções Leves:** Seções como "Como Acolhemos" e "Depoimentos" não possuem imagens pesadas, dependendo exclusivamente de tipografia e ícones vetoriais.

---

## 13. Pontos Potencialmente Problemáticos

1. **Assets Órfãos / Sobras Antigas em `public/images/`:**
   * Existem arquivos SVG antigos e não utilizados (`hero 2.svg`, `hero 3.svg`, `hero4.svg`, `heromob1.svg`, `heromob2.svg`) que somam **mais de 22 MB** de espaço no repositório.
   * Existem versões antigas de heros (`hero2.webp`, `hero3.webp`, `hero4.webp`, `heromob1.webp`, `heromob2.webp`, `hero-mobile.webp`) não referenciadas no código.
2. **Nome de Arquivo com Caracteres Especiais:**
   * O arquivo `public/images/maocoração.webp` contém caracteres não-ASCII (`ç` e `ã`), gerando requisições com escape `%C3%A7%C3%A3o` que podem falhar em servidores estáticos sensíveis a encoding.
3. **Foto de Fundo em JPEG na Seção Origem:**
   * O arquivo `public/images/founder_bg.jpeg` (255 KB) ainda está em formato JPEG original e poderia ser WebP.

---

## 14. Riscos de Alteração

* **Risco Baixo:** Limpeza de assets órfãos em `public/` (validando previamente com script se não há referências no código).
* **Risco Baixo:** Renomear `maocoração.webp` para `mao-coracao.webp` (ajustando referências).
* **Risco Médio:** Alterar o mecanismo de montagem da Galeria para *windowing* / *virtualização* (deve-se manter rigorosamente o swipe/drag do Framer Motion e a navegação por teclado).
* **Risco Alto (VETO):** Qualquer alteração em rotas legadas, Vercel rewrites ou arquivos fora do escopo de frontend.

---

## 15. Recomendações Priorizadas

### 🟢 Alto Impacto / Baixo Risco
1. **Unificar o Hero em um único `<picture>`:**
   * Substituir a divisão de duas `<div>` (`block lg:hidden` vs `hidden lg:block`) por um único elemento `<picture>` com `<source media="(max-width: 1023px)" srcset="/images/hero-mobile-v2.webp">` e `<source media="(min-width: 1024px)" srcset="/images/roda_livro-v2.webp">`.
   * **Benefício:** Elimina 100% o download da imagem mobile em telas de notebook e desktop.
2. **Normalizar Nome de Asset (`maocoração.webp`):**
   * Renomear para `mao-coracao.webp` e atualizar em `ContributionSection.tsx`.

### 🟡 Médio Impacto / Baixo Risco
1. **Virtualização Leve / Janelamento na Galeria:**
   * Em vez de montar os 22 slides de uma vez, carregar no DOM apenas o slide ativo e os adjacentes imediatos (`[index - 1, index, index + 1]`), montando os demais conforme a navegação.
2. **Limpeza de Assets Órfãos em `public/images/`:**
   * Mover os SVGs legados pesados (~22 MB) para quarentena e posterior remoção segura.

### ⚪ Baixo Impacto
1. **Conversão de `founder_bg.jpeg`:**
   * Converter para `founder_bg.webp` para economizar ~150 KB adicionais.

---

## 16. Confirmação Explícita de Isolamento

> [!IMPORTANT]
> **Garantia de Integridade e Isolamento:**
> * Nenhum arquivo de código da aplicação (`.tsx`, `.ts`, `.json`, `.css`) foi alterado durante esta auditoria.
> * Nenhuma rota de infraestrutura (`vercel.json`, `/sistema`, `/login.php`, rewrites, proxies, DNS, Locaweb) foi tocada ou modificada.
> * O sistema legado de produção permanece 100% íntegro e inalterado.
