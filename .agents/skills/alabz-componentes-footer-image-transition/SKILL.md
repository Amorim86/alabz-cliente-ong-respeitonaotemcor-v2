---
name: alabz-componentes-footer-image-transition
description: Integra uma fotografia entre a secao final e o footer com fades graduais, sem bordas, cortes ou marcas visiveis de inicio e fim. Use ao criar ou ajustar uma imagem-ponte antes do footer, CTA final fotografico ou transicao suave de secoes.
---

# Transicao de Imagem no Footer

## Objetivo

Crie uma ponte fotografica entre a ultima secao de conteudo e o footer. A imagem deve parecer continuar sob as duas regioes: ela surge suavemente a partir da cor da secao anterior e desaparece sem emenda na cor exata do footer.

Use esta skill quando o pedido mencionar imagem no footer, imagem de transicao, blend, fade, conexao entre secoes, CTA fotografico final, ou a eliminacao de uma linha visivel acima do footer.

## Regras inegociaveis

- Nao exiba borda, divisor, frame, faixa, marca ou texto que denuncie o inicio ou o fim da imagem.
- Use a cor real da secao anterior e a cor real do footer nos fades. Nunca use preto, branco ou uma cor aproximada por conveniencia.
- Preserve a arquitetura JSX interna de `Footer.tsx`. Ajuste somente o wrapper anterior, os estilos do wrapper ou uma borda externa que esteja produzindo a emenda.
- Nao coloque um painel opaco colorido sobre a foto, a menos que o briefing o exija explicitamente. Prefira contraste pela regiao escura da imagem, overlay discreto e sombra de texto.
- Mantenha a imagem no fluxo visual do fim da pagina; ela nao pode parecer um banner isolado ou uma nova secao desconectada.
- Em mobile, a transicao continua obrigatoria. Reenquadre a foto com `object-position`; nao esconda a imagem para contornar o layout.

## Fluxo de implementacao

### 1. Ler a composicao existente

1. Inspecione a secao imediatamente anterior, o CTA final e o `Footer` para descobrir cores, espacamentos e possiveis bordas.
2. Abra a imagem e identifique onde estao o assunto principal e as areas naturalmente escuras que suportam texto.
3. Confirme que o asset existe em `public/`. Quando vier de `/.tmp`, mova-o para o local definitivo do cliente antes de referenciar no codigo.
4. Defina tokens locais ou variaveis CSS para as duas cores de fusao:

```css
.footer-transition {
  --transition-top: var(--color-section-background);
  --transition-footer: var(--color-footer-bg);
}
```

### 2. Montar as camadas

Use um wrapper `relative isolate overflow-hidden` com a mesma cor do footer. A ordem obrigatoria de camadas e:

1. imagem absoluta, cobrindo toda a area;
2. fade superior que sai da cor da secao anterior para transparente;
3. fade inferior que vai de transparente para a cor do footer;
4. CTA e conteudo em primeiro plano.

Exemplo de estrutura adaptavel:

```tsx
<section className="footer-transition relative isolate overflow-hidden bg-[var(--color-footer-bg)]">
  <img
    src="/assets/cliente/footer-transition.png"
    alt=""
    className="footer-transition__image absolute inset-0 h-full w-full object-cover"
    loading="lazy"
  />
  <div className="footer-transition__fade-top absolute inset-x-0 top-0 z-[1] pointer-events-none" />
  <div className="footer-transition__fade-bottom absolute inset-x-0 bottom-0 z-[1] pointer-events-none" />

  <div className="footer-transition__content relative z-10 mx-auto w-full max-w-[1400px] px-4 md:px-12">
    {/* CTA final */}
  </div>
</section>
```

```css
.footer-transition__fade-top {
  height: clamp(5rem, 16vw, 12rem);
  background: linear-gradient(to bottom, var(--transition-top) 0%, transparent 100%);
}

.footer-transition__fade-bottom {
  height: clamp(12rem, 31vw, 24rem);
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--transition-footer) 78%
  );
}
```

Os valores sao ponto de partida. Ajuste a altura dos fades pela leitura da imagem e pela viewport; o resultado visual vale mais que repetir numeros.

### 3. Posicionar foto e CTA

- Use `object-position` para manter o veiculo, pessoa ou produto no lugar correto em desktop e mobile.
- Quando o assunto precisar aparecer mais abaixo sem deslocar todo o layout, aumente a altura interna da imagem (`height: calc(100% + ...)`) e mantenha `object-position: center top`. Nao use `transform: scale()` nem deslocamentos globais arbitrarios.
- Posicione o CTA pela estrutura normal da secao, com espacamento responsivo. O titulo e a acao devem cair sobre uma regiao escura e legivel, sem sobrepor o assunto principal.
- Caso seja preciso sombrear a foto, use um overlay transparente e progressivo. Ele deve reforcar o contraste, nunca criar um retangulo perceptivel.
- Mantenha a transicao como uma secao natural; nao use altura rigida de viewport.

### 4. Remover a emenda

Revise todos os elementos que tocam a transicao:

- remova `border-top`, sombras duras ou fundos concorrentes que revelem a troca para o footer;
- confirme que o final do fade inferior chega a `var(--transition-footer)` antes do footer comecar;
- se a secao anterior tiver outro fundo, o fade superior deve comecar exatamente nele;
- nao use uma imagem com cantos arredondados, borda ou `overflow` que corte a fusao;
- preserve o fundo solido original do footer depois da area fotografica.

## Responsividade e acessibilidade

- Use `alt=""` para imagem puramente decorativa. Quando a imagem explicar o CTA, escreva um alt objetivo.
- Garanta contraste suficiente entre copy, botao e fotografia em todas as larguras.
- Aplique foco visivel no CTA e mantenha area de toque adequada.
- Em telas estreitas, troque o enquadramento antes de reduzir drasticamente a tipografia ou esconder conteudo.
- Verifique que a secao nao cria overflow horizontal.

## Validacao obrigatoria

1. Confirme pelo HTTP local que a imagem retorna `200`.
2. Reinicie o servidor Next apos troca ou migracao de asset e faca recarga forcada no navegador para evitar CSS ou imagem em cache.
3. Inspecione screenshots reais em `1920x1080`, `1365x768` e `390x844`.
4. Em cada viewport, confirme visualmente:
   - nao existe linha, faixa ou borda entre secao, imagem e footer;
   - o fade superior absorve a imagem na secao anterior;
   - o fade inferior termina na cor precisa do footer;
   - CTA permanece legivel, sem painel opaco desnecessario;
   - o assunto da imagem fica bem enquadrado e nao invade o texto;
   - `document.documentElement.scrollWidth <= window.innerWidth`.
5. Rode `npx tsc --noEmit` e `npm run build` antes de concluir a entrega.

## Antipadroes

- Inserir um banner retangular entre a pagina e o footer.
- Aplicar gradiente com cores genericas que nao coincidem com os fundos reais.
- Deixar `border-t`, shadow ou espaco vazio revelando a troca entre elementos.
- Resolver enquadramento com `scale`, altura fixa de viewport ou ocultacao da imagem no mobile.
- Recriar ou reestruturar `Footer.tsx` para acomodar a foto.
