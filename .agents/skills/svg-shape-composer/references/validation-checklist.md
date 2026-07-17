# 🧪 Checklist de Validação de QA (Validation Checklist)

Antes de autorizar o commit, push ou deploy de qualquer alteração de transições ou shape dividers, o desenvolvedor ou agente **DEVE** realizar esta rotina de testes.

---

## 📋 Lista de Verificação Obrigatória

### 1. Prevenção de Rolagem Horizontal (Horizontal Scroll Check)
* [ ] Verifique se o elemento divisor ou a seção pai possui `overflow-x: hidden` ou `overflow: hidden`.
* [ ] Certifique-se de que a barra de rolagem horizontal **não** aparece em nenhuma largura de tela (de 320px a 2560px).
* [ ] *Teste rápido no console:* Execute `document.documentElement.scrollHeight > window.innerHeight` e garanta que não há larguras vazias transbordando a janela.

### 2. Validação dos Arquivos SVG (Silent WebKit Failure Check)
* [ ] Abra o arquivo SVG de máscara (em `assets/shapes/` ou `svg-shape-library/`).
* [ ] Certifique-se de que a tag `<svg>` contém atributos de dimensão física explícitos (ex: `width="1200" height="600"` ou viewBox correspondente).
* [ ] Certifique-se de que o path possui preenchimento sólido (ex: `fill="#000"` ou `fill="black"`).
* *Por que isso é crítico?* O Chrome, Safari e outros navegadores WebKit/Blink falham silenciosamente na renderização de máscaras CSS (`mask-image`) se o arquivo SVG não tiver dimensões declaradas, renderizando uma barra reta em vez da curva.

### 3. Responsividade Visual em Mobile (Mobile Height Discipline)
* [ ] Verifique se o divisor encolhe em telas menores usando Media Queries.
* [ ] Altura ideal Desktop: **100px a 140px**.
* [ ] Altura ideal Mobile: **50px a 80px**.
* [ ] Garanta que a margem negativa (`margin-top` ou `margin-bottom`) da seção correspondente seja ajustada em sincronia perfeita com a nova altura da máscara para não cobrir botões ou textos.

### 4. Acessibilidade Semântica (A11y Check)
* [ ] Todos os divisores decorativos devem ter o atributo `aria-hidden="true"`.
* [ ] Garanta que nenhum divisor decorativo possua foco de teclado (`tabindex`) ou tags semânticas ativas (`a`, `button`, etc.) que confundam leitores de tela.

### 5. Suporte a Reduced Motion (Reduced Motion Check)
* [ ] Caso existam micro-movimentos nos divisores, garanta a desativação se o usuário preferir menos movimento:
```css
@media (prefers-reduced-motion: reduce) {
  .organic-blob, .layer-wave {
    animation: none !important;
    transform: none !important;
  }
}
```
