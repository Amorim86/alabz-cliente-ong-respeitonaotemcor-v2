---
name: pre-deploy
description: Comando de pré-deploy para blindagem e execução das 5 skills estratégicas em cascata antes da publicação.
---

# Comando de Pré-Deploy (/pre-deploy)

Se o usuário digitar `/pre-deploy` em qualquer momento ou acionar esta skill, você deve imediatamente:

1. **Alinhamento de Funcionalidades (CTA & Cookies/LGPD)**: Antes de iniciar a blindagem em cascata, confirme com o usuário ou valide na base de código se o projeto necessita de formulários de captação (CTA) e/ou banner de consentimento de cookies (LGPD):
   - **Formulários de CTA**: Valide se a skill `/formulario-cta` foi executada, se os formulários específicos foram gerados com o `clienteId` correto do projeto e se as variáveis de ambiente necessárias estão devidamente listadas/mapeadas.
   - **Trabalhe Conosco & Resend**: Validar se o formulário de captação de currículos (`FormTrabalheConosco`) está ativo no projeto (quando aplicável), com a mensagem de e-mail amigável devidamente configurada com anexo direto de arquivos em `lib/resend.ts`. Durante o desenvolvimento de um novo projeto usando este template, o agente deve **proativamente perguntar ao usuário** se ele deseja habilitar ou desativar este recurso de candidatura.
   - **Consentimento de Cookies & Google Analytics (GA4 / GTM)**: Garanta que os componentes `CookieBanner` e `AnalyticsLoader` estejam ativos em `app/layout.tsx`.
     - **Pergunta ao Usuário**: O agente deve perguntar ao usuário se deseja ativar a aferição de tráfego via Google Analytics 4 (`NEXT_PUBLIC_GA_ID`) e/ou GTM (`NEXT_PUBLIC_GTM_ID`).
     - **Configuração no Vercel**: Se ativado, instruir o usuário a cadastrar a respectiva variável (ex: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`) nas configurações de Environment Variables do projeto na Vercel.
     - **Como Testar**:
       1. Acesse a página do site (local ou produção).
       2. Abra o console do desenvolvedor (`F12`) e vá na aba **Network / Rede**.
       3. Garanta que o Cookie Banner esteja visível (se necessário, limpe o LocalStorage e recarregue). Nenhum script do Google deve estar rodando.
       4. Clique em **Aceitar** no banner.
       5. Verifique se os arquivos de script carregados na rede agora incluem domínios do `googletagmanager.com`.
       6. Digite `dataLayer` no console e valide se os objetos contendo as instruções do `gtag` e da respectiva tag configurada foram disparados com sucesso.
2. **Execução em Cascata**: Executar as 5 skills estratégicas silenciosamente e em sequência:
   - `seo-metadata-architect` (Garantir injeção de `metadataBase`, favicon e Open Graph/Twitter card para visualização em compartilhamentos)
   - `analytics-tag-integrator`
   - `conversion-microcopy`
   - `lead-capture-guardian`
   - `mobile-touch-optimizer`
3. **Bloqueio de Layout**: Bloquear absolutamente qualquer modificação visual de layout (preservar design, cores, fontes, grid e Tailwind).
4. **Changelog**: Exibir um **CHANGELOG DE BLINDAGEM** detalhado no chat informando tudo o que foi configurado e injetado.
5. **Finalização**: Pausar a execução e declarar a aplicação pronta para deploy na Vercel.

