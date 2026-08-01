---
name: alabz-componentes-formulario-cta
description: >
  Configura e implementa um formulário CTA (Call-to-Action) dentro do motor multi-tenant Alabz.
  Ativa quando o usuário precisar adicionar um formulário a um projeto de cliente —
  seja de contato, orçamento, currículo ou cookies. Conduz uma entrevista estruturada
  (grill-me) para levantar todos os requisitos antes de gerar o componente visual,
  configurar notificações via Resend e documentar o destino dos dados no Firestore.
---

# Skill: Formulário CTA

## Objetivo

Guiar o Agente no processo de **levantamento e implementação de um formulário CTA**
dentro de um projeto de cliente gerado a partir do `alabz-template-base`.

O motor central (`POST /api/forms/submit`) e a integração com Resend já estão
implementados no template e são imutáveis. Esta skill define **o que vai em cima
deles**: o componente visual, os campos, o `form_type`, o `clienteId`, as variáveis
de ambiente necessárias por projeto e o comportamento pós-envio.

> **Sobre o destino dos dados:** Todas as submissions ficam na coleção `/submissions`
> do Firebase `alabz-sites-formularios`, filtráveis pelo campo `clienteId`.
> Não há painel de administração exposto — o acesso é direto pelo Firebase Console.

---

## Quando esta skill é ativada

- Usuário menciona "formulário", "form", "captação", "contato", "orçamento",
  "currículo", "trabalhe conosco", "cookies" em contexto de projeto de cliente.
- Usuário pede para "configurar", "criar" ou "implementar" um formulário.
- Usuário invoca `/formulario-cta` ou chama a skill pelo nome.

---

## Protocolo de Execução

### FASE 1 — Grill-Me (Entrevista Estruturada)

Conduzir **uma pergunta por vez**, aguardando a resposta antes de prosseguir.
Usar `ask_question` quando a pergunta tiver opções predefinidas.

#### Bloco A — Identificação do Contexto

**A1.** Qual é o `clienteId` (slug) deste projeto?
- Formato: letras minúsculas, hífens, sem espaços. Ex: `dr-joao-silva`, `padaria-dona-maria`.
- Sugerir baseado no nome do cliente se o usuário não souber.

**A2.** Qual `form_type` melhor descreve o objetivo deste formulário?
*(Múltipla escolha se o projeto tiver mais de um formulário.)*

- `primeiro_contato` — visitante quer falar com o cliente (gera link WhatsApp + notificação por e-mail)
- `orcamento` — visitante pede orçamento (gera página de proposta em `/propostas/[id]` + notificação por e-mail)
- `trabalhe_conosco` — candidato envia currículo (salva arquivo no Storage + notificação por e-mail)
- `cookies_consent` — registro de consentimento LGPD (auditoria interna, sem notificação)
- `customizado` — tipo novo, fora dos 4 padrões (requer extensão da rota — alinhar escopo antes)

#### Bloco B — Campos do Formulário

**B1.** Quais campos o formulário deve ter?
Liste um por linha. Ex: Nome, E-mail, Telefone, Mensagem.

Sugestões por tipo:
- `primeiro_contato` → Nome, E-mail, Telefone, Mensagem
- `orcamento` → Nome, E-mail, Telefone, Serviço desejado, Prazo, Orçamento estimado, Observações
- `trabalhe_conosco` → Nome, Cargo desejado, LinkedIn, Mensagem, Currículo (arquivo)
- `cookies_consent` → nenhum campo visível — apenas botão de aceite

**B2.** Algum campo é obrigatório? Quais?
*(O Agente deve sugerir `required` baseado no form_type se o usuário não especificar.)*

**B3.** Há campos de seleção (dropdown, radio, checkbox)?
Se sim, quais são as opções de cada um?

#### Bloco C — Notificação por E-mail (Resend)

> O Resend já está integrado no motor. Só precisa das variáveis de ambiente corretas.

**C1.** O contratante deve receber um **e-mail automático** quando alguém preencher o form?
- Sim → confirmar `CONTRATANTE_EMAIL` e `RESEND_FROM_EMAIL` para este projeto
- Não → o campo `RESEND_API_KEY` pode ser omitido na Vercel deste projeto

**C2.** [Se sim em C1] Qual o e-mail **remetente** (from) que o contratante vai ver?
- Ex: `Site do Dr. João <noreply@drjoao.com.br>` (requer domínio verificado no Resend)
- Ou usar o remetente padrão do Resend para testes iniciais (`onboarding@resend.dev`)

**C3.** [Apenas para `primeiro_contato`]
O contratante tem WhatsApp? Confirmar o número (`CONTRATANTE_WHATSAPP`) para este projeto.

#### Bloco D — Posição e Visual no Site

**D1.** Onde no site este formulário aparece?
- Seção dedicada na home (ex: `#contato`)
- Página própria (ex: `/contato`, `/orcamento`)
- Modal/popup acionado por botão CTA
- Rodapé

**D2.** Existe algum briefing visual específico?
Ex: fundo escuro, campos lado a lado no desktop, estilo minimalista.
*(Se não houver, o Agente adota o design system do projeto.)*

**D3.** Qual o texto do botão de envio?
Sugestões por tipo:
- `primeiro_contato` → "Enviar mensagem", "Falar com a equipe"
- `orcamento` → "Solicitar orçamento", "Ver minha proposta"
- `trabalhe_conosco` → "Enviar candidatura"
- `cookies_consent` → "Aceitar e continuar"

#### Bloco E — Comportamento Pós-Envio

**E1.** O que acontece na tela após o envio bem-sucedido?
- Mensagem de sucesso inline (substitui o form)
- Redirecionamento para outra página
- Abrir o WhatsApp automaticamente (para `primeiro_contato`)
- Abrir a página da proposta automaticamente (para `orcamento`)
- Nada visível (para `cookies_consent`)

**E2.** Proteção anti-spam necessária?
- Não por enquanto
- Sim, leve → implementar honeypot field (campo oculto que bots preenchem)
- Sim, robusto → integrar Cloudflare Turnstile (CAPTCHA invisível)

---

### FASE 2 — Síntese e Confirmação

Após o Grill-Me, apresentar resumo estruturado:

```markdown
## Resumo do Formulário CTA

- **Cliente (clienteId):** [slug]
- **Tipo (form_type):** [tipo]
- **Campos:** [lista com indicação de required]
- **Notificação Resend:** Sim → [email destino] | Não
- **Remetente (from):** [email ou padrão Resend]
- **Canal WhatsApp:** [número com DDI] | Não configurado
- **Posição no site:** [resposta D1]
- **Botão de envio:** "[texto]"
- **Pós-envio:** [comportamento]
- **Anti-spam:** [solução]

### Variáveis de ambiente a adicionar na Vercel deste projeto:
| Variável | Valor |
|---|---|
| FIREBASE_SERVICE_ACCOUNT_KEY | [compartilhada — copiar do template] |
| FIREBASE_STORAGE_BUCKET | [compartilhada — copiar do template] |
| CONTRATANTE_WHATSAPP | [número se aplicável] |
| CONTRATANTE_EMAIL | [e-mail do contratante] |
| RESEND_API_KEY | [chave do Resend se notificação ativada] |
| RESEND_FROM_EMAIL | [remetente se notificação ativada] |
```

Perguntar: **"Posso prosseguir com a implementação?"**
Aguardar aprovação antes de gerar qualquer código.

---

### FASE 3 — Implementação

Após aprovação, implementar nesta ordem:

1. **Documentar variáveis de ambiente** — listar o que o usuário precisa adicionar
   na Vercel do projeto do cliente. Nunca alterar o template base.

2. **Componente de formulário** — criar em `components/forms/Form[NomeDoTipo].tsx`:
   - Client Component (`'use client'`)
   - Estado via `useState`: campos + loading + resultado + erro
   - Validação client-side antes do fetch (campos required com feedback visual)
   - Submit: `POST /api/forms/submit` com `clienteId` vindo de `@/config/site.ts`
   - Estados: idle → loading → success → error (cada um com UI própria)
   - Acessibilidade: `aria-label`, `aria-required`, `aria-live` no status
   - Se `trabalhe_conosco` com arquivo: converter para Base64 antes do envio
     usando `FileReader.readAsDataURL()`

3. **Integração no layout** — adicionar o componente na posição definida (D1):
   - Seção na home → criar `components/sections/[Nome]Section.tsx` e importar em `app/page.tsx`
   - Página própria → criar `app/[rota]/page.tsx`
   - Modal → criar componente com controle de estado no pai

4. **Comportamento pós-envio** (conforme E1):
   - Sucesso inline: substituir form por card de confirmação com animação suave
   - Abrir WhatsApp: `window.open(contato.whatsapp_url, '_blank')`
   - Abrir proposta: `router.push(proposta_url)`

5. **Anti-spam** (se solicitado em E2):
   - Honeypot: campo `<input name="website" tabIndex={-1} style={{display:'none'}} />`
     — se vier preenchido, retornar 200 falso sem gravar no Firestore

---

### FASE 4 — Checklist de Entrega

- [ ] Componente renderiza sem erros no dev server
- [ ] Submit válido → resposta 200 no DevTools (aba Network)
- [ ] Submit com campos vazios → mensagens de erro aparecem inline
- [ ] Documento criado na coleção `/submissions` do Firestore com status `success`
- [ ] Se `primeiro_contato`: WhatsApp abre com texto pré-preenchido correto
- [ ] Se `orcamento`: `/propostas/[id]` abre e exibe os dados corretamente
- [ ] Se `trabalhe_conosco` com arquivo: URL pública do currículo funciona
- [ ] Se Resend ativo: e-mail chegou na caixa do contratante em até 1 minuto
- [ ] Formulário funciona corretamente no mobile (layout, teclado virtual, envio)

---

## Referências Técnicas

| Recurso | Caminho |
|---|---|
| Motor da API | `app/api/forms/submit/route.ts` |
| Singleton Firebase | `lib/firebase-admin.ts` |
| Singleton Resend | `lib/resend.ts` |
| Config do cliente | `config/site.ts` (fonte do `clienteId`) |
| Página de proposta | `app/propostas/[id]/page.tsx` |
| Lab de testes | `app/teste-forms/page.tsx` |
| Coleção Firestore | `/submissions` (filtrar por `clienteId`) |
| Storage path | `clientes/{clienteId}/curriculos/{submissionId}_{fileName}` |

## Variáveis de Ambiente — Referência Completa

| Variável | Escopo | Obrigatória para |
|---|---|---|
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Compartilhada | Todos os form_types |
| `FIREBASE_STORAGE_BUCKET` | Compartilhada | `trabalhe_conosco` com arquivo |
| `CONTRATANTE_WHATSAPP` | Por cliente | `primeiro_contato` (WhatsApp) |
| `CONTRATANTE_EMAIL` | Por cliente | Notificação por e-mail (Resend) |
| `RESEND_API_KEY` | Por cliente | Notificação automática ativa |
| `RESEND_FROM_EMAIL` | Por cliente | Remetente do e-mail automático |
