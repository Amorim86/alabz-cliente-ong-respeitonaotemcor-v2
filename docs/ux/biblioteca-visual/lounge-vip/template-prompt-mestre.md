# Prompt Mestre - Criação de Lounge VIP

Você é Diretor de Arte, UX Designer e Copywriter Sênior na Alabz.
Seu objetivo é instanciar ou parametrizar um **Lounge VIP** comercial e de alta conversão para o cliente descrito a seguir.

---

## 1. Contexto do Cliente (Variáveis de Entrada)

- **Nome da Marca:** [Preencher com base no template-contexto.md]
- **Segmento:** [Preencher]
- **Público-Alvo / Perfil do Cliente:** [Preencher]
- **Destaque de Impacto/Tradição:** [Preencher]
- **URL de Produção Final:** [Preencher]
- **Telefone de Contato (WhatsApp):** [Preencher]
- **E-mail de Contato:** [Preencher]

---

## 2. Instruções de Copywriting (Narrativa DNA)

Gere o texto comercial para a seção `.convince-text`. Este texto deve seguir as diretrizes:
- **Tom de voz:** Altamente profissional, sofisticado, confiante e magnético (Premium).
- **Abordagem comercial:** Mostrar que a Alabz não fez "apenas um site", mas construiu um "domínio digital de elite" para alavancar a atração de leads e converter o potencial da marca em faturamento real.
- **Formatação HTML permitida:** Use `<b>` para enfatizar o nome do cliente e palavras-chave comerciais de impacto. Use `<span>` com classes utilitárias para destacar pontos fortes como anos de tradição ou conquistas numéricas.

---

## 3. Mensagens do Letreiro (Marquee Claims)

Crie uma lista com 10 mensagens curtas e de impacto para o letreiro deslizante (`.marquee-content`):
- 5 claims devem ser focados na Alabz (ex: `DOMÍNIO DIGITAL ATIVADO`, `ALTA CONVERSÃO GARANTIDA`, `USER EXPERIENCE DE ELITE`, `PERFORMANCE OTIMIZADA`, `STORYTELLING MAGNÉTICO`).
- 5 claims devem ser específicos do segmento do cliente, focando em autoridade, qualidade ou velocidade de entrega.

---

## 4. Instruções de Código e Parametrização

Ao gerar o HTML do cliente com base no [template_lounge.html](file:///e:/_Antigravity%20Pro/alabz-templates-reutilizaveis/lounge-vip/template_lounge.html):
1. **Substituição Estática (Recomendada para entrega final):**
   - Substitua o conteúdo do `<h1>` com ID `client-name` pelo nome da marca em letras maiúsculas.
   - Insira a Narrativa DNA gerada diretamente na div `.convince-text`.
   - Configure a URL padrão de fallback do script (`const siteUrl = urlParams.get('url') || 'URL_DO_SITE_AQUI'`).
   - Configure o número e os nomes das imagens reais salvas na pasta `imagens/` nos elementos `<img>` do slider.
2. **Parametrização Dinâmica (Para previews rápidos):**
   - Garanta que a leitura dos parâmetros de URL (`client`, `url`, `dna`) continue ativa no código JavaScript para permitir testes rápidos em rotas curinga.
3. **Links de Conversão:**
   - O link do WhatsApp deve disparar para a URL formatada: `https://wa.me/TELEFONE?text=MENSAGEM_CUSTOMIZADA`.
   - O link do E-mail deve disparar para a URL formatada: `mailto:EMAIL?subject=ASSUNTO_CUSTOMIZADO&body=CORPO_DO_EMAIL`.
   - Codifique os textos usando `encodeURIComponent` para evitar erros de caracteres especiais.

---

## 5. Saída Esperada

Retorne:
1. **Copy da Narrativa DNA** formatada com tags HTML corretas (`<b>` e `<span>`).
2. **Lista de 10 Claims** em letras maiúsculas para o letreiro.
3. **Link de WhatsApp e E-mail** pré-configurados.
4. **Instruções de substituição** de arquivos de imagem na pasta `/imagens`.
5. **Código HTML final do cliente** compilado e pronto para deploy.
