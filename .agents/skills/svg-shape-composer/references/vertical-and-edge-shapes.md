# 📐 Divisores Verticais e Bordas da Página (Vertical & Edge Shapes)

Divisores verticais e formas de bordas da página enquadram o layout lateralmente, criando uma transição orgânica entre colunas ou na borda da tela.

---

## ⛔ Práticas Proibidas (Anti-Patterns)
* **NUNCA** usar a propriedade CSS `clip-path: path("...")` com coordenadas absolutas de pixel (ex: `L 190 900`) para elementos decorativos de altura dinâmica, pois a forma terminará em uma linha horizontal reta se a seção for mais alta que o limite do path.
* **NUNCA** usar caminhos fixados que distorçam de forma inaceitável em telas de celular.

---

## 🟢 Receita Recomendada: SVG Inline Responsivo com Altura Fluida

Para garantir que a forma dourada ou lateral acompanhe toda a extensão da seção e seja cortada perfeitamente pela transição ondulada da seção seguinte, substitua o elemento CSS por um **SVG Inline** com redimensionamento inteligente.

### 1. Marcação HTML do SVG Inline
```html
<section class="plain-language">
  <!-- O SVG substitui a div clássica .gold-edge -->
  <svg class="gold-edge" viewBox="0 0 190 900" preserveAspectRatio="none" aria-hidden="true">
    <path d="M 190 0 L 190 900 L 0 900 C 80 730 20 600 90 440 C 155 290 40 170 0 0 Z" fill="var(--gold)"></path>
  </svg>
  
  <div class="section-wrap">
    <!-- Conteúdo da seção -->
  </div>
</section>
```

### 2. Especificação CSS de Controle de Dimensões
```css
.gold-edge {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;                       /* OBRIGATÓRIO: estica por todo o container */
  width: clamp(70px, 12vw, 190px);    /* Largura responsiva fluida */
  pointer-events: none;               /* Evita bloquear cliques em botões próximos */
  z-index: 1;                         /* Fica atrás do texto/conteúdo da seção */
}

/* Ajuste Responsivo em Mobile */
@media (max-width: 900px) {
  .gold-edge {
    width: 45px;                      /* Mais fina no mobile */
  }
}
```

---

## 💡 Por que este método funciona?
1. **`preserveAspectRatio="none"`:** Permite que o SVG estique verticalmente de forma fluida até `100%` da altura da seção `.plain-language`, independentemente se ela tem 500px ou 1500px de altura. A curva se adapta dinamicamente sem quebrar.
2. **Conexão com a Próxima Seção:** Como o elemento decorativo agora chega de fato até o rodapé (`bottom: 0`), quando a próxima seção se sobrepuser via margem negativa (`margin-top: -60px`) e aplicar a máscara em onda, ela cortará de forma contínua tanto o fundo da seção quanto o próprio SVG dourado, criando uma conexão perfeita sem faixas retas.

---

## 🟢 Receita Recomendada: Separador Vertical de Colunas (Split-Panel Divider)

Para separar duas colunas ou painéis adjacentes com uma curva ondulada vertical em layouts divididos (split-screen):

### 1. Estrutura HTML do Split Panel
```html
<div class="split-container">
  <div class="panel panel-left dark">
    <!-- Conteúdo da Esquerda -->
  </div>
  <div class="panel panel-right light">
    <!-- Conteúdo da Direita -->
  </div>
  <!-- O divisor é um elemento absoluto posicionado no centro -->
  <div class="vertical-divider from-right" aria-hidden="true"></div>
</div>
```

### 2. Especificação CSS
```css
.split-container {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;
  overflow: hidden;
}

.vertical-divider {
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  width: 170px;
  background: #f7f5ef;                /* Deve ser a mesma cor do painel da direita */
  pointer-events: none;

  /* Máscara com SVG rotacionado verticalmente */
  -webkit-mask-image: url("./assets/shapes/waves-vertical.svg");
  -webkit-mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-image: url("./assets/shapes/waves-vertical.svg");
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
}

/* Divisor centralizado alinhado à esquerda do painel direito */
.vertical-divider.from-right {
  left: 50%;
  transform: translateX(-1px);
}

/* Caso a onda precise vir da esquerda (painel escuro avança sobre o claro) */
.vertical-divider.from-left {
  right: 50%;
  transform: translateX(1px);
  background: #080808;                /* Deve ser a mesma cor do painel da esquerda */
}

/* Responsividade: Mobile empilha os painéis e oculta o divisor vertical */
@media (max-width: 900px) {
  .split-container {
    grid-template-columns: 1fr;
  }
  .vertical-divider {
    display: none;                    /* Oculta o divisor na vertical empilhada */
  }
}
```

*Dica de Rotação:* Se não possuir um arquivo de SVG vertical dedicado, você pode rotacionar a máscara horizontal padrão via CSS (`transform: rotate(90deg)`) ou criar um wrapper SVG que faça a translação/rotação no código do próprio arquivo.

