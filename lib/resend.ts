/**
 * lib/resend.ts
 *
 * Singleton do cliente Resend para envio de e-mails transacionais.
 *
 * O Resend é **completamente opcional** — se RESEND_API_KEY não estiver
 * definida no projeto do cliente, todas as chamadas retornam null
 * silenciosamente e o motor de formulários segue seu fluxo normal.
 *
 * Variáveis de ambiente por projeto de cliente (Vercel):
 *   - RESEND_API_KEY     → Chave da API do Resend (obrigatória para ativar)
 *   - RESEND_FROM_EMAIL  → Remetente exibido ao contratante
 *                          Ex: "Site do Dr. João <noreply@drjoao.com.br>"
 *                          Padrão: "Alabz Forms <onboarding@resend.dev>" (apenas testes)
 *
 * Obter chave gratuita em: https://resend.com
 * Limite gratuito: 3.000 e-mails/mês, 100/dia.
 */

import { Resend } from 'resend';

// ─── Singleton com lazy initialization ───────────────────────────────────────

let resendInstance: Resend | null = null;

/**
 * Retorna o cliente Resend se RESEND_API_KEY estiver configurada.
 * Retorna null caso contrário — o motor simplesmente ignora o envio de e-mail.
 */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  if (!resendInstance) {
    resendInstance = new Resend(apiKey);
  }

  return resendInstance;
}

/**
 * Endereço remetente configurado para este projeto de cliente.
 * Requer domínio verificado no Resend para uso em produção.
 */
export function getResendFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL ?? 'Alabz Forms <onboarding@resend.dev>'
  );
}

// ─── Builder de HTML para e-mails de notificação ─────────────────────────────

interface EmailOptions {
  clienteId: string;
  form_type: string;
  payload: Record<string, unknown>;
  extras?: Record<string, string>; // links extras: proposta_url, curriculo_url
  ip?: string; // IP do remetente
}

const FORM_TYPE_LABELS: Record<string, string> = {
  primeiro_contato: 'Primeiro Contato',
  orcamento: 'Solicitação de Orçamento',
  trabalhe_conosco: 'Candidatura (Trabalhe Conosco)',
  cookies_consent: 'Consentimento de Cookies',
};

const INTERNAL_FIELDS = new Set(['file_base64', 'file_name', 'file_mime']);

/**
 * Gera o HTML do e-mail de notificação enviado ao contratante.
 * Design minimalista e legível — compatível com os principais clientes de e-mail.
 */
export function buildNotificationEmail({
  clienteId,
  form_type,
  payload,
  extras = {},
  ip,
}: EmailOptions): { subject: string; html: string } {
  const label = FORM_TYPE_LABELS[form_type] ?? form_type;

  // Customização amigável para trabalhe_conosco
  if (form_type === 'trabalhe_conosco') {
    const candidateName = String(payload.nome ?? 'Novo Talento');
    const subject = `🎉 Nova candidatura de ${candidateName} — ${clienteId}`;

    const payloadRows = Object.entries(payload)
      .filter(([key]) => !INTERNAL_FIELDS.has(key))
      .map(
        ([key, value]) => `
          <tr>
            <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#4b5563;font-size:13px;font-weight:600;width:140px;vertical-align:top;text-transform:capitalize;">
              ${key.replace(/_/g, ' ')}
            </td>
            <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#1f2937;font-size:13px;line-height:1.5;">
              ${String(value ?? '—').replace(/\n/g, '<br>')}
            </td>
          </tr>`
      )
      .join('');

    const extrasHtml = Object.entries(extras)
      .map(
        ([label, url]) => `
          <a href="${url}" style="display:inline-block;margin-top:16px;padding:10px 20px;background:#1A331E;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
            ${label} →
          </a>`
      )
      .join('');

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;max-width:100%;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">

        <!-- Header -->
        <tr>
          <td style="background:#1A331E;padding:28px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#C5A880;text-transform:uppercase;letter-spacing:0.15em;font-weight:700;">Alabz · Recrutamento</p>
            <h2 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#fff;font-family:Georgia,serif;">🎉 Nova Candidatura Recebida!</h2>
            <p style="margin:4px 0 0;font-size:13px;color:#d1d5db;">Projeto: <strong style="color:#fff;">${clienteId}</strong></p>
          </td>
        </tr>

        <!-- Mensagem de Boas-vindas -->
        <tr>
          <td style="padding:28px 28px 8px;color:#374151;font-size:14px;line-height:1.6;">
            <p style="margin:0 0 12px;font-size:16px;font-weight:600;color:#1A331E;">Olá,</p>
            <p style="margin:0;">
              Boas notícias! O candidato <strong>${candidateName}</strong> acabou de enviar o currículo pelo site para fazer parte da sua equipe no projeto <strong>${clienteId}</strong>.
            </p>
            <p style="margin:12px 0 0;">
              Confira abaixo as informações e o histórico profissional cadastrado:
            </p>
          </td>
        </tr>

        <!-- Payload -->
        <tr>
          <td style="padding:16px 28px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
              ${payloadRows || '<tr><td style="padding:12px;color:#9ca3af;font-size:13px;">Nenhuma informação adicional cadastrada.</td></tr>'}
            </table>
          </td>
        </tr>

        <!-- Extras (links de proposta, currículo etc.) -->
        ${extrasHtml ? `<tr><td style="padding:8px 28px 28px;text-align:center;">${extrasHtml}</td></tr>` : ''}

        <!-- Footer -->
        <tr>
          <td style="padding:20px 28px;background:#f9fafb;border-top:1px solid #f3f4f6;text-align:center;">
            <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.5;">
              Este é um e-mail automático gerado pelo motor de formulários da Alabz.<br>
              Os dados e o arquivo anexado foram salvos com criptografia e confidencialidade.
              ${ip ? `<br><span style="color:#9ca3af;font-size:10px;font-weight:600;">IP do remetente: ${ip}</span>` : ''}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    return { subject, html };
  }

  const subject = `📬 Novo ${label} — ${clienteId}`;

  const payloadRows = Object.entries(payload)
    .filter(([key]) => !INTERNAL_FIELDS.has(key))
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top;">
            ${key.replace(/_/g, ' ')}
          </td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#1e293b;font-size:13px;">
            ${String(value ?? '—')}
          </td>
        </tr>`
    )
    .join('');

  const extrasHtml = Object.entries(extras)
    .map(
      ([label, url]) => `
        <a href="${url}" style="display:inline-block;margin-top:12px;margin-right:8px;padding:8px 16px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:600;">
          ${label} →
        </a>`
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;max-width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1a1a1a;padding:20px 28px;">
            <p style="margin:0;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Alabz · Motor de Formulários</p>
            <p style="margin:6px 0 0;font-size:18px;font-weight:700;color:#fff;">${label}</p>
            <p style="margin:4px 0 0;font-size:13px;color:#94a3b8;">Cliente: <strong style="color:#cbd5e1;">${clienteId}</strong></p>
          </td>
        </tr>

        <!-- Payload -->
        <tr>
          <td style="padding:24px 28px 8px;">
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Dados recebidos</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
              ${payloadRows || '<tr><td style="padding:12px;color:#94a3b8;font-size:13px;">Nenhum campo adicional.</td></tr>'}
            </table>
          </td>
        </tr>

        <!-- Extras (links de proposta, currículo etc.) -->
        ${extrasHtml ? `<tr><td style="padding:8px 28px 24px;">${extrasHtml}</td></tr>` : ''}

        <!-- Footer -->
        <tr>
          <td style="padding:16px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">
              Enviado automaticamente pelo motor de formulários Alabz.<br>
              Acesse o Firebase Console para ver todos os registros em <strong>/submissions</strong>.
              ${ip ? `<br><span style="color:#94a3b8;font-size:10px;font-weight:600;">IP do remetente: ${ip}</span>` : ''}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html };
}
