# Protocolo Lounge Alabz (Portal de Atracao)

## Objetivo
O Lounge e um portal premium de entrada para atrair clientes e validar valor antes da entrega completa do projeto.

Funciona como:
- vitrine de qualidade da Alabz
- ambiente de apresentacao por cliente
- ponte entre "preview aprovado" e "site final em producao"

## Para que serve
- Apresentar o projeto em formato premium, com narrativa e identidade visual.
- Evitar enviar direto para o site final sem contexto comercial.
- Aumentar conversao: cliente ve resultado, entende processo e clica para o site real.
- Manter controle de release: o site final pode ficar atras do Lounge ate aprovacao.

## Modelo de URL (decisao de arquitetura)
Temos dois formatos validos:

1. `alabz.com.br/[cliente]`
- Mais simples de operar no inicio.
- Melhor para concentrar SEO no dominio principal.
- Bom para fase de testes e volume alto.

2. `[cliente].alabz.com.br`
- Mais premium para apresentacao comercial.
- Passa sensacao de ambiente dedicado.
- Melhor para projetos aprovados e entregas de destaque.

Regra pratica:
- Operacao e validacao rapida: usar `alabz.com.br/[cliente]`.
- Showcase, entrega e efeito wow: usar `[cliente].alabz.com.br`.

## Fluxo esperado (usuario final)
1. Cliente acessa o Lounge (rota de entrada).
2. Cliente navega no card/slider de previews.
3. Cliente clica na thumb/imagem.
4. Clique redireciona para o site final real (URL de producao do cliente).

Resultado:
- O Lounge vira o "portal".
- O site final vira o "destino".

## Implementacao atual (neste workspace)
Local:
- `storage/sites/lounge-vip/`

Arquivos base:
- `template_lounge.html` (template mestre reutilizavel)
- `Cadori_Lounge.html` (instancia real de cliente)
- `imagens/` (logo, header e previews)

Comportamento:
- O template aceita parametros dinamicos para nome do cliente, URL final e texto.
- O slider usa previews reais.
- A area clicavel da preview aponta para o site final do cliente.

## Como implementar para novos clientes
1. Duplicar `template_lounge.html` para uma nova instancia.
2. Definir dados do cliente:
- nome exibido
- URL final do site
- copy de narrativa (DNA do cliente)
3. Subir 3 a 5 previews reais em `imagens/`.
4. Configurar o link do slider/thumb para a URL final do cliente.
5. Publicar em um dos formatos:
- `alabz.com.br/[cliente]`
- `[cliente].alabz.com.br`

## Contratos minimos de qualidade
- Thumb sempre leva para site final real (sem link quebrado).
- Previews devem ser reais do projeto (nao placeholder).
- Texto deve citar contexto real do cliente.
- CTA de contato deve estar ativo (WhatsApp ou formulario).
- Experiencia mobile deve estar valida.

## O que nao fazer
- Nao publicar Lounge com preview generico.
- Nao manter thumb sem destino final.
- Nao misturar assets de clientes diferentes na mesma pasta.
- Nao usar URL provisoria no ambiente final de apresentacao.

## Proximo passo recomendado
Padronizar um manifesto por cliente com estes campos:
- `cliente_slug`
- `lounge_url`
- `site_final_url`
- `status` (`preview`, `aprovado`, `publicado`)
- `updated_at`

Isso permite escala com rastreabilidade sem perder o padrao premium.
