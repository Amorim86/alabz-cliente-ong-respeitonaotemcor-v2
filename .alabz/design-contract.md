# Design Contract — ONG Respeito Não Tem Cor

## Estado e referência aprovada

- Referência visual principal: `.tmp/Direção visual.png`.
- Direção: editorial comunitária, territorial e antirracista; intensa sem parecer campanha eleitoral ou instituição corporativa.
- Tese visual: **Acolhimento que ganha voz.**
- Implementação incremental: cada bloco será validado antes da próxima alteração.

## Elementos preservados

- A arquitetura interna dos componentes core `Header.tsx` e `Footer.tsx`.
- O Hero atual com três SVGs permanece intocado até a última etapa do projeto.
- Conteúdo institucional só será apresentado como confirmado quando houver fonte ou validação do cliente.

## Sistema visual

- Azul profundo: `#081D42`.
- Amarelo mobilização: `#F5CF00`.
- Azul aberto: `#1655B8`.
- Laranja marcha: `#E8661C`, usado seletivamente.
- Branco de papel: `#F7F4EA`.
- Preto tinta: `#171717`.
- Títulos: `Anybody`, com largura e peso de cartaz.
- Corpo: `Alegreya Sans`, com leitura humanista.
- Informações operacionais: `IBM Plex Mono`, em baixa dose.
- Superfícies foscas, blocos cromáticos sólidos, recortes e marcas discretas de impressão; sem glassmorphism, neon ou brilho tecnológico.

## Estrutura narrativa aprovada

1. Header institucional.
2. Hero — editar por último.
3. Quem Somos — composição editorial semelhante ao mockup, com fotografia real, texto e missão/visão/valores.
4. Como Acolhemos — faixa mais minimalista, direta e de leitura rápida.
5. Projetos e Frentes de Atuação.
6. Fundadora e história da liderança, sem separá-la do trabalho coletivo.
7. Vozes da Comunidade.
8. Localização e contato.
9. Como Apoiar e CTA final, condicionados à confirmação dos canais oficiais.
10. Footer padrão Alabz.

## Comportamento responsivo

- Seções globais usam wrapper fluido `w-full max-w-[1400px] mx-auto px-4 md:px-12` ou equivalente.
- Cards respeitam largura mínima real do conteúdo e podem crescer verticalmente.
- Mobile sem overflow horizontal, com logo à esquerda e menu sanduíche à direita.
- Validação obrigatória em `1920×1080`, `1365×768` e `390×844` antes da entrega final.

## Etapas de validação

1. Header e tipografia global.
2. Quem Somos e Como Acolhemos.
3. Demais seções, assets reais e conteúdo confirmado.
4. Hero.
5. Homologação responsiva, acessibilidade, assets, TypeScript e build.
