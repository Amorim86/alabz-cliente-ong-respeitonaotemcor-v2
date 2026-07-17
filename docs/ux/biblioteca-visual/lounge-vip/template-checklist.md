# Checklist de Validação - Lounge VIP

Use esta checklist para garantir a qualidade premium e a integridade de qualquer Lounge VIP criado antes de enviá-lo ao cliente.

---

## 🔗 1. Integridade de Links & Destinos

- [ ] **Redirecionamento do Slider:** Ao tocar em qualquer área do slider de previews, o usuário é redirecionado para a URL de produção final do cliente?
- [ ] **Abertura em Nova Aba:** O link do slider e da logo da Alabz abrem com `target="_blank"` para não fechar o Lounge?
- [ ] **Link de Conversão do WhatsApp:**
  - [ ] O número do telefone possui DDI (`55`), DDD (2 dígitos) e o número correto?
  - [ ] A mensagem automática contém o nome da marca do cliente corretamente personalizado?
  - [ ] A mensagem foi codificada usando `encodeURIComponent` para evitar erros de acentuação/espaços?
- [ ] **Link de Conversão de E-mail:**
  - [ ] O destinatário do e-mail é válido?
  - [ ] O assunto e o corpo do e-mail citam a marca do cliente corretamente?

---

## 🖼️ 2. Qualidade Visual & Assets

- [ ] **Capturas de Tela (Previews):**
  - [ ] As imagens em `imagens/` são capturas reais do site do cliente?
  - [ ] A resolução é nítida e não há placeholders (imagens de banco de dados genéricas ou wireframes)?
  - [ ] Os nomes de arquivo correspondem exatamente aos referenciados no HTML (ex: `preview1.png`, `preview2.png`, etc.)?
- [ ] **Logo/Header:** O arquivo de cabeçalho (`header.png`) está legível e posicionado adequadamente no topo?

---

## 🖥️ 3. Responsividade & Interatividade

- [ ] **Animação de Partículas:** O sistema de partículas em Canvas está renderizando suavemente sem causar lentidão perceptível no navegador?
- [ ] **Comportamento Mobile:**
  - [ ] O letreiro (Marquee) roda sem cortar e sem travar em telas pequenas?
  - [ ] O tamanho do texto `.client-greeting` se adapta bem a celulares (usando `clamp()` e sem quebrar em múltiplas linhas estranhas)?
  - [ ] O slider de previews mantém uma proporção correta no celular, permitindo o toque fácil?
  - [ ] Os botões de contato se ajustam a uma coluna única no celular?

---

## 🚀 4. Performance & SEO

- [ ] **Meta Tags:** O título da página (`<title>`) e o favicon (`<link rel="icon">`) estão configurados corretamente com os dados da Alabz?
- [ ] **Otimização de Assets:** As imagens do slider estão otimizadas e comprimidas (de preferência em formato `.png` ou `.webp` leve) para garantir um carregamento quase instantâneo?
- [ ] **Limpeza de Console:** Ao carregar a página e interagir com ela, não há erros de JavaScript ou requisições HTTP falhas no Console do desenvolvedor?
