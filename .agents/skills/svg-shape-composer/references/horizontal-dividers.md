# 🌅 Divisores Horizontais (Horizontal Dividers)

Divisores horizontais são transições onduladas, curvas ou angulares aplicadas para separar visualmente duas seções horizontais empilhadas.

---

## ⛔ Práticas Proibidas (Anti-Patterns)
* **NUNCA** usar pontes ou divs vazias intermediárias (`<div class="bridge">`) que quebram o fluxo semântico do HTML.
* **NUNCA** usar pseudo-elementos (`::before` / `::after`) fora dos limites da seção quando esta possui `overflow: hidden`, pois o navegador cortará o shape e gerará uma barra reta silenciosa.
* **NUNCA** repetir imagens de fundo para simular encaixe.

---

## 🟢 Receita Recomendada: Máscara CSS no Container de Destino

A abordagem ideal é aplicar a máscara combinando o SVG e um gradiente linear diretamente no container da seção de baixo. Isso faz com que todo o conteúdo da seção de baixo (textos, imagens, fundos) seja cortado de forma coordenada pela curva.

### 1. Estrutura HTML Semântica e Limpa
```html
<section class="section-above">
  <!-- Conteúdo sem divisores ou interferências -->
</section>

<section class="section-below">
  <!-- O divisor é aplicado por CSS diretamente nesta seção -->
  <div class="section-wrap">
    <!-- Conteúdo da seção -->
  </div>
</section>
```

### 2. Especificação CSS de Máscara Combinada
```css
.section-below {
  position: relative;
  z-index: 3;                 /* Garante sobreposição sobre a seção acima */
  margin-top: -60px;          /* Altura da sobreposição (overlap) */
  background: #0a0a0a;        /* Cor de fundo da seção */

  /* 1. Camada de Máscara SVG + 2. Gradiente para manter o corpo opaco */
  -webkit-mask-image: 
    url("./assets/shapes/waves.svg"), 
    linear-gradient(to bottom, transparent 60px, #000 60px);
  -webkit-mask-size: 100% 61px, 100% 100%;
  -webkit-mask-position: top, top;
  -webkit-mask-repeat: no-repeat, no-repeat;

  mask-image: 
    url("./assets/shapes/waves.svg"), 
    linear-gradient(to bottom, transparent 60px, #000 60px);
  mask-size: 100% 61px, 100% 100%;
  mask-position: top, top;
  mask-repeat: no-repeat, no-repeat;
}

/* Responsividade: Reduzir a altura da onda em telas menores */
@media(max-width: 900px) {
  .section-below {
    margin-top: -40px;
    -webkit-mask-image: 
      url("./assets/shapes/waves.svg"), 
      linear-gradient(to bottom, transparent 40px, #000 40px);
    -webkit-mask-size: 100% 41px, 100% 100%;
    
    mask-image: 
      url("./assets/shapes/waves.svg"), 
      linear-gradient(to bottom, transparent 40px, #000 40px);
    mask-size: 100% 41px, 100% 100%;
  }
}
```

---

## 💡 Por que este método funciona?
1. **Opaque Body Preservation:** O gradiente linear (`linear-gradient(to bottom, transparent Xpx, #000 Xpx)`) garante que apenas os primeiros `X` pixels (altura da onda) sejam mascarados pelo SVG, mantendo o restante do container totalmente opaco e protegido de cortes.
2. **Corte Coordenado de Elementos Filhos:** Qualquer elemento decorativo ou imagem que toque a borda superior do container `.section-below` será cortado harmonicamente seguindo a onda.
3. **Hardware Acceleration:** O uso de `mask-image` é altamente otimizado por navegadores modernos em comparação com clip-path complexos aplicados em múltiplos filhos.

---

## 🌀 Integração com Efeito Paralaxe (Parallax Backgrounds)

Como a máscara é aplicada nas bordas do próprio container externo (e não na imagem em si), o container funciona como uma janela estática de recorte. Qualquer movimento aplicado à imagem de fundo correrá por trás da curva do SVG de forma contínua.

### Receita de Paralaxe CSS Simples (Fundo Fixo)
```css
.section-below {
  /* ... regras da máscara CSS combinada ... */
  background-image: url("./assets/barber-tools.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* ADICIONADO: a imagem fica fixa em relação à viewport, deslizando atrás da máscara */
}
```

*Nota de UX:* Para dispositivos móveis (como iOS), o `background-attachment: fixed` costuma ser desativado pelo navegador. Garanta que o layout continue limpo e legível mesmo quando a imagem se comportar de forma estática (comportamento padrão de fallback).

