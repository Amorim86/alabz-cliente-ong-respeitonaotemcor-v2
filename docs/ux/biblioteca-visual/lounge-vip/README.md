# Pacote Reutilizável - Lounge VIP Alabz

Este pacote serve como template base para criar, validar e manter o portal de entrada (**Lounge VIP**) para novos clientes e projetos da Alabz.

---

## 🎯 O que este pacote resolve

- **Vitrine Premium:** Apresenta previews dinâmicos do futuro site do cliente com alta sofisticação visual (efeito wow).
- **Aceleração Comercial:** Conecta o cliente à proposta de valor do projeto antes da entrega completa do domínio final.
- **Validação de Valor:** Mantém CTAs dinâmicos e contextualizados para converter feedbacks rápidos via WhatsApp e E-mail.
- **Controle de Produção:** Permite que o site real de produção fique oculto ou em manutenção até a validação definitiva pelo cliente.

---

## 📚 Ordem de Leitura Recomendada

1. **`README.md`** (este documento de diretrizes)
2. [PROTOCOLO_LOUNGE.md](file:///e:/_Antigravity%20Pro/alabz-templates-reutilizaveis/lounge-vip/PROTOCOLO_LOUNGE.md) (manual estratégico original da arquitetura do Lounge)
3. [template-contexto.md](file:///e:/_Antigravity%20Pro/alabz-templates-reutilizaveis/lounge-vip/template-contexto.md) (variáveis e ativos a preencher da marca)
4. [template-prompt-mestre.md](file:///e:/_Antigravity%20Pro/alabz-templates-reutilizaveis/lounge-vip/template-prompt-mestre.md) (prompt estruturado para geração da narrativa DNA e claims)
5. [template-checklist.md](file:///e:/_Antigravity%20Pro/alabz-templates-reutilizaveis/lounge-vip/template-checklist.md) (checklist de qualidade e validação antes da publicação)

---

## 🚫 Regras Duras

- **Links Ativos:** Os links dos botões e do slider de imagens não podem estar quebrados nem apontar para páginas inexistentes.
- **Previa Real:** Imagens do slider devem ser capturas de tela reais do projeto em desenvolvimento ou mockups de alta fidelidade aprovados. Nunca use placeholders de banco de imagens genéricas.
- **Narrativa Autêntica:** O texto de DNA comercial deve descrever pontos fortes factuais do cliente.
- **Separação de Assets:** Nunca misture ativos de imagens de marcas diferentes na mesma pasta. Cada Lounge de cliente deve possuir seu subdiretório isolado.

---

## 🛠️ Como Instanciar para um Novo Cliente

1. **Duplicação:** Duplique o arquivo [template_lounge.html](file:///e:/_Antigravity%20Pro/alabz-templates-reutilizaveis/lounge-vip/template_lounge.html) e renomeie-o para algo como `[Cliente]_Lounge.html`.
2. **Contexto:** Preencha os dados em [template-contexto.md](file:///e:/_Antigravity%20Pro/alabz-templates-reutilizaveis/lounge-vip/template-contexto.md).
3. **Copy & Prompt:** Execute o [template-prompt-mestre.md](file:///e:/_Antigravity%20Pro/alabz-templates-reutilizaveis/lounge-vip/template-prompt-mestre.md) no seu agente de IA para gerar o texto da narrativa DNA e os marquee claims ideais.
4. **Imagens:** Substitua as imagens na pasta `imagens/` pelas capturas reais do site do cliente (mantenha os tamanhos leves e otimizados).
5. **Configuração final:** Cole as informações de copy, claims e URLs finais no código do arquivo HTML duplicado.
6. **Validação:** Rode a checklist em [template-checklist.md](file:///e:/_Antigravity%20Pro/alabz-templates-reutilizaveis/lounge-vip/template-checklist.md) antes de publicar em produção.

---

## 💻 Teste e Execução Local

Você pode visualizar e interagir com o template localmente utilizando o Vite configurado na raiz do projeto:

1. A partir do diretório raiz do repositório, instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse a URL informada pelo Vite no seu navegador e navegue até a pasta `/lounge-vip` para inspecionar os arquivos [template_lounge.html](file:///e:/_Antigravity%20Pro/alabz-templates-reutilizaveis/lounge-vip/template_lounge.html) ou [Cadori_Lounge.html](file:///e:/_Antigravity%20Pro/alabz-templates-reutilizaveis/lounge-vip/Cadori_Lounge.html).
