# INFRAESTRUTURA E INTEGRALIDADE DO SISTEMA LEGADO (PHP / LOCAWEB)

> **AVISO CRÍTICO DE OPERAÇÃO:**
> O sistema PHP legado da ONG Respeito Não Tem Cor está em produção ativa, atendendo usuários, administradores e voluntários reais. A sua infraestrutura de roteamento e proxy reverso é **imutável** e não pode ser modificada por tarefas de refatoração do site institucional Next.js.

---

## 1. DADOS DE ENDEREÇAMENTO E AMBIENTE

* **Domínio Público Principal:** `https://www.respeito.org.br/sistema/`
* **Origem Direta Locaweb (Contingência / Emergência):** `https://respeito1.websiteseguro.com/sistema/`
* **Baseline de Homologação de Infraestrutura:** Commit `b95940e94ae3b95beffca3dffebaa2bfde4ddbbf`
* **Hospedagem de Origem:** Servidor Nginx/Apache + PHP 7.4.33 / MySQL da Locaweb.

---

## 2. ARQUITETURA DE INTEGRAÇÃO E ROTEAMENTO

```
[ Navegador do Usuário ]
          │ (https://www.respeito.org.br/sistema/...)
          ▼
[ Vercel Edge Network (Routing Layer - vercel.json) ]
          │ (External Reverse Proxy)
          ▼
[ Servidor Locaweb (respeito1.websiteseguro.com) ]
          │
          ▼
[ PHP 7.4 / MySQL Legado ]
```

1. **Proxy Transparente (Reverse Proxy):** A Vercel intercepta requisições para `/sistema`, `/sistema/*` e `/login.php` e repassa para a Locaweb sem que a aplicação Next.js seja invocada.
2. **Sessões e Cookies (`PHPSESSID`):** O cookie `PHPSESSID` é emitido pelo PHP da Locaweb com `path=/` e transita de forma transparente através do proxy da Vercel.
3. **Hardening de Cache:** As rotas do legado possuem cabeçalhos `Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0` e a diretiva da Vercel `x-vercel-enable-rewrite-caching: 0` para garantir que respostas dinâmicas e formulários não fiquem retidos em cache no Edge.

---

## 3. PLANO DE CONTINGÊNCIA E EMERGÊNCIA

* Em caso de indisponibilidade pontual na camada Edge da Vercel ou falha no roteamento do site institucional, o acesso direto via **`https://respeito1.websiteseguro.com/sistema/`** permanece totalmente funcional e isolado.
* **Dependência da Hospedagem Locaweb:** O código PHP e o banco de dados MySQL permanecem fisicamente armazenados na infraestrutura da Locaweb. Qualquer alteração ou cancelamento da hospedagem Locaweb exigirá o planejamento prévio da migração completa da base de dados e do código PHP.

---

## 4. DIRETRIZES DE MANUTENÇÃO E REGRAS RESERVADAS

* **Rotas Reservadas:** As rotas `/sistema`, `/sistema/*` e `/login.php` são reservadas ao sistema legado PHP.
* **Proibição em Refatorações:** Nenhuma tarefa de atualização do Next.js, App Router, estilização ou limpeza de código pode modificar ou remover as regras de roteamento dessas rotas contidas em `vercel.json`.
* **Mecanismos de Proteção Automática:**
  - Validador Semântico Local: `npm run validate:legacy-system`
  - Proteção de Build: `prebuild` no `package.json`
  - Esteira de CI: GitHub Actions workflow `.github/workflows/protect-legacy-system.yml`
