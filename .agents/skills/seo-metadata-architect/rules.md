# Regras de SEO

CABRESTO ABSOLUTO: É estritamente proibido alterar o design, cores, fontes, grid ou quebrar o Tailwind.

## Injeção de Metadata e metadataBase
1. **Uso Exclusivo da Metadata API**: Use exclusivamente a Metadata API do Next.js para injetar Open Graph, favicon e JSON-LD de LocalBusiness. Escopo 100% invisível na tela.
2. **metadataBase Mandatório**: É OBRIGATÓRIA a configuração de `metadataBase` no objeto de Metadata global (geralmente em `app/layout.tsx`).
   - Use o domínio real do cliente. Caso o domínio não esteja definido ainda, configure `https://www.SEUDOMINIO.com.br` como fallback temporário para que possa ser substituído pelo domínio oficial durante o pré-deploy.
   - Exemplo de declaração no template:
     ```typescript
     export const metadata: Metadata = {
       metadataBase: new URL("https://www.SEUDOMINIO.com.br"),
       title: "Alabz - Soluções Digitais",
       description: "Criado por Alabz®",
       // ... outras propriedades
     };
     ```
3. **Miniaturas e Favicon para Compartilhamento (Open Graph)**: Configure as propriedades `openGraph` e `twitter` incluindo imagens de miniatura (ex: `/og-image.png` ou `/thumbnail.png`) e favicon (`/icon.png`) no objeto de metadados para garantir que links compartilhados em plataformas como WhatsApp, Telegram e resultados do Google renderizem o favicon e a miniatura corretamente.
4. **Validação Rigorosa de Favicon (Google Compliance)**: O agente deve obrigatoriamente validar o arquivo de ícone (`app/icon.png` ou `app/favicon.ico`) antes do deploy:
   - **Dimensões e Proporção**: O favicon deve ser perfeitamente quadrado e ter dimensões com múltiplos de 48px (ex: `48x48`, `96x96`, `144x144`, `192x192` ou `512x512`). Resoluções recomendadas para alta qualidade: `192x192` ou `512x512`.
   - **Não-Placeholder**: Certifique-se de que o ícone padrão do Next.js/Vercel (ou qualquer ícone temporário de template) foi substituído pelo ícone oficial e personalizado do cliente.
   - **Rastreabilidade**: Verifique se a tag de favicon é gerada sem erros no HTML.
5. **Alinhamento de Domínios**: Garanta que o domínio configurado em `metadataBase` coincida 100% com as URLs indicadas nos arquivos `sitemap.ts` e `robots.ts`.

