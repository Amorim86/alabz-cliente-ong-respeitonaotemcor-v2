# 🎨 Blobs e Camadas Decorativas (Blobs & Decorative Shapes)

Blobs, recortes angulares e camadas de ondas sobrepostas adicionam profundidade, respiro editorial e modernidade a elementos menores como cards, chamadas de rodapé (CTAs) e seções informativas.

---

## ⛔ Práticas Proibidas (Anti-Patterns)
* **NUNCA** usar imagens estáticas rasterizadas (.jpg/.png) para formas abstratas e sólidas de fundo, pois causam pixelização e aumentam o peso da página.
* **NUNCA** aplicar movimentos rápidos ou agressivos que atrapalhem a leitura do texto.

---

## 🟢 Receitas Recomendadas

### 1. Blobs Orgânicos (Sem Arquivos SVG Externos)
Para criar formas orgânicas fluidas direto no CSS sem requisições HTTP adicionais, utilize o border-radius assimétrico combinado:

#### Código CSS
```css
.organic-blob {
  position: absolute;
  right: -50px;
  bottom: -60px;
  width: 300px;
  aspect-ratio: 1;
  background: linear-gradient(135deg, var(--gold), var(--gold2));
  
  /* Raios assimétricos para visual orgânico irregular */
  border-radius: 42% 58% 68% 32% / 44% 38% 62% 56%;
  transform: rotate(-18deg);
  opacity: 0.15;
  filter: blur(8px);
  pointer-events: none;
}
```

---

### 2. Camadas Orgânicas Sobrepostas (Organic Layering)
Criação de profundidade em rodapés ou seções de fechamento (CTA) empilhando múltiplos divisores com rotações e opacidades diferentes.

#### Código HTML
```html
<div class="layered-cta">
  <h3>Fale Conosco</h3>
  <!-- Camada 1: Fundo com opacidade menor e inclinação contrária -->
  <div class="layer-wave first" aria-hidden="true"></div>
  <!-- Camada 2: Frente com cor sólida e inclinação padrão -->
  <div class="layer-wave second" aria-hidden="true"></div>
</div>
```

#### Código CSS
```css
.layered-cta {
  position: relative;
  overflow: hidden;
  background: var(--black);
  padding: 80px 40px;
}

.layer-wave {
  position: absolute;
  bottom: -15%;
  width: 80%;
  height: 70%;
  pointer-events: none;
}

.layer-wave.first {
  right: -10%;
  background: rgba(230, 199, 106, 0.15);
  border-radius: 50% 50% 0 0;
  transform: rotate(-12deg);
}

.layer-wave.second {
  right: -20%;
  background: var(--gold);
  border-radius: 50% 50% 0 0;
  transform: rotate(8deg);
}
```

---

### 3. Recortes Angulares de Canto (Corner Swoops)
Para aplicar em cards informativos ou áreas de comparação (antes/depois).

#### Código CSS
```css
.card-split-diagonal {
  position: relative;
  overflow: hidden;
  contain: paint;
}

.card-split-diagonal::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: var(--gold);
  
  /* Recorte em formato de triângulo diagonal */
  clip-path: polygon(40% 0, 100% 0, 100% 100%, 0 100%);
  opacity: 0.85;
}
```
