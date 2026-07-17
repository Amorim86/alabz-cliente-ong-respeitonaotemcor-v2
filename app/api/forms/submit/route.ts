/**
 * app/api/forms/submit/route.ts
 *
 * Motor Central de Formulários — Alabz Multi-Tenant
 *
 * Endpoint: POST /api/forms/submit
 *
 * Contrato de entrada:
 * {
 *   clienteId: string,              // slug do cliente, ex: "dr-joao-silva"
 *   form_type: FormType,            // tipo do formulário (ver union abaixo)
 *   payload:   Record<string, unknown>  // campos dinâmicos do formulário
 * }
 *
 * O backend é agnóstico ao conteúdo do payload — ele persiste qualquer
 * estrutura de dados e executa o fluxo correto baseado no form_type.
 */

import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { db, bucket } from '@/lib/firebase-admin';
import {
  getResendClient,
  getResendFromEmail,
  buildNotificationEmail,
} from '@/lib/resend';

// Garante renderização dinâmica — nunca cacheado estaticamente
export const dynamic = 'force-dynamic';

// ─── Types ────────────────────────────────────────────────────────────────────

type FormType =
  | 'orcamento'
  | 'primeiro_contato'
  | 'cookies_consent'
  | 'trabalhe_conosco';

interface SubmitBody {
  clienteId: string;
  form_type: FormType;
  payload: Record<string, unknown>;
}

interface ContatoResponse {
  whatsapp_url?: string;
  email_url?: string;
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const VALID_FORM_TYPES = new Set<FormType>([
  'orcamento',
  'primeiro_contato',
  'cookies_consent',
  'trabalhe_conosco',
]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Serializa o payload em texto legível para uso no WhatsApp/e-mail.
 * Ignora campos de arquivo para não poluir a mensagem.
 */
function serializePayloadAsText(
  clienteId: string,
  payload: Record<string, unknown>
): string {
  const FILE_FIELDS = new Set(['file_base64', 'file_name', 'file_mime']);

  const lines = Object.entries(payload)
    .filter(([key]) => !FILE_FIELDS.has(key))
    .map(([key, value]) => {
      const label = key.replace(/_/g, ' ');
      return `• ${label}: ${String(value ?? '—')}`;
    })
    .join('\n');

  return `Novo contato via site ${clienteId}:\n\n${lines}`;
}

/** Constrói uma NextResponse de erro padronizada. */
function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json(
    { error: message },
    { status, headers: { 'Cache-Control': 'no-store' } }
  );
}

/** Constrói uma NextResponse de sucesso padronizada. */
function successResponse(data: Record<string, unknown>): NextResponse {
  return NextResponse.json(
    { success: true, ...data },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  // ── 1. Parse do body ───────────────────────────────────────────────────────
  let body: SubmitBody;
  try {
    body = (await request.json()) as SubmitBody;
  } catch {
    return errorResponse('Body inválido. Envie um JSON bem-formado.', 400);
  }

  const { clienteId, form_type, payload } = body;

  // ── 2. Validação dos campos obrigatórios ───────────────────────────────────
  const missing: string[] = [];
  if (!clienteId || typeof clienteId !== 'string') missing.push('clienteId');
  if (!form_type || typeof form_type !== 'string') missing.push('form_type');
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    missing.push('payload');
  }

  if (missing.length > 0) {
    return errorResponse(
      `Campos obrigatórios ausentes ou inválidos: ${missing.join(', ')}`,
      400
    );
  }

  // ── 3. Validação do form_type ──────────────────────────────────────────────
  if (!VALID_FORM_TYPES.has(form_type)) {
    return errorResponse(
      `form_type inválido. Valores aceitos: ${[...VALID_FORM_TYPES].join(', ')}`,
      400
    );
  }

  // ── 4. Extração de metadados do request ───────────────────────────────────
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const userAgent = request.headers.get('user-agent') ?? 'unknown';

  // ── 5. Persistência e roteamento ──────────────────────────────────────────
  try {
    // Cria o documento base com status "pending" — sempre executado
    const submissionRef = await db.collection('submissions').add({
      clienteId,
      form_type,
      payload,
      status: 'pending',
      metadata: {
        ip,
        user_agent: userAgent,
        criado_em: FieldValue.serverTimestamp(),
      },
    });

    const submissionId = submissionRef.id;

    // ── Switch por form_type ─────────────────────────────────────────────────
    switch (form_type) {

      // ── cookies_consent ───────────────────────────────────────────────────
      // Foco exclusivo em auditoria de LGPD. Registra o consentimento e encerra.
      case 'cookies_consent': {
        await submissionRef.update({ status: 'success' });

        return successResponse({ message: 'Consentimento registrado.' });
      }

      // ── primeiro_contato ──────────────────────────────────────────────────
      // Serializa o payload em texto e gera links de contato (WhatsApp e/ou e-mail)
      // para que o contratante inicie a conversa com um clique.
      case 'primeiro_contato': {
        const contactText = serializePayloadAsText(clienteId, payload);

        const whatsappNumber = process.env.CONTRATANTE_WHATSAPP;
        const emailContato = process.env.CONTRATANTE_EMAIL;

        const contato: ContatoResponse = {};

        if (whatsappNumber) {
          contato.whatsapp_url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(contactText)}`;
        }

        if (emailContato) {
          const subject = encodeURIComponent(`Novo contato via ${clienteId}`);
          const emailBody = encodeURIComponent(contactText);
          contato.email_url = `mailto:${emailContato}?subject=${subject}&body=${emailBody}`;
        }

        await submissionRef.update({ status: 'success' });

        // Notificação por e-mail via Resend (silenciosamente ignorada se não configurado)
        const resend = getResendClient();
        const emailTo = process.env.CONTRATANTE_EMAIL;
        if (resend && emailTo) {
          const { subject, html } = buildNotificationEmail({
            clienteId,
            form_type,
            payload,
            ip,
          });
          // Fire-and-forget — não bloqueia a resposta ao visitante
          void resend.emails.send({
            from: getResendFromEmail(),
            to: emailTo,
            subject,
            html,
          });
        }

        return successResponse({ contato });
      }

      // ── orcamento ─────────────────────────────────────────────────────────
      // Persiste os dados e retorna a URL da página de proposta pública.
      // Evita geração de PDF binário — o navegador pode "Salvar como PDF" pela página.
      case 'orcamento': {
        await submissionRef.update({ status: 'success' });

        const propostaUrl = `/propostas/${submissionId}`;

        // Notificação por e-mail via Resend com link direto para a proposta
        const resendOrc = getResendClient();
        const emailToOrc = process.env.CONTRATANTE_EMAIL;
        if (resendOrc && emailToOrc) {
          const { subject, html } = buildNotificationEmail({
            clienteId,
            form_type,
            payload,
            extras: { 'Ver proposta': `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}${propostaUrl}` },
            ip,
          });
          void resendOrc.emails.send({
            from: getResendFromEmail(),
            to: emailToOrc,
            subject,
            html,
          });
        }

        return successResponse({ proposta_url: propostaUrl });
      }

      // ── trabalhe_conosco ──────────────────────────────────────────────────
      // Aceita payload com ou sem arquivo. Se houver arquivo (Base64), faz o
      // upload para o Cloud Storage e retorna a URL pública de download.
      case 'trabalhe_conosco': {
        const { file_base64, file_name, file_mime } = payload as {
          file_base64?: string;
          file_name?: string;
          file_mime?: string;
        };

        let curriculo_url: string | undefined;

        if (file_base64 && file_name && file_mime) {
          try {
            // Strip do prefixo Data URL, caso presente (ex: "data:application/pdf;base64,")
            // Suporta tanto Base64 puro quanto o formato de Data URL do browser
            const base64Clean = file_base64.replace(/^data:[^;]+;base64,/, '');
            const fileBuffer = Buffer.from(base64Clean, 'base64');

            const storagePath = `clientes/${clienteId}/curriculos/${submissionId}_${file_name}`;
            const storageFile = bucket.file(storagePath);

            // Upload do buffer com o MIME type correto
            await storageFile.save(fileBuffer, {
              metadata: { contentType: file_mime },
            });

            // Torna o arquivo publicamente legível (requer ACL fine-grained no bucket)
            await storageFile.makePublic();
            curriculo_url = storageFile.publicUrl();

            // Atualiza o documento com a URL do currículo antes de finalizar
            await submissionRef.update({ status: 'success', curriculo_url });
          } catch (storageError) {
            console.error('[Firebase Storage] Falha ao fazer upload do currículo:', storageError);
            // Salva apenas os dados cadastrais em caso de erro no storage (resiliência de template)
            await submissionRef.update({ 
              status: 'success', 
              curriculo_status: 'upload_failed',
              curriculo_erro: String(storageError) 
            });
          }
        } else {
          await submissionRef.update({ status: 'success' });
        }

        // Notificação por e-mail via Resend com anexo direto (e link caso o storage funcione)
        const resendTrab = getResendClient();
        const emailToTrab = process.env.CONTRATANTE_EMAIL;
        if (resendTrab && emailToTrab) {
          const attachments: any[] = [];
          if (file_base64 && file_name) {
            try {
              const base64Clean = file_base64.replace(/^data:[^;]+;base64,/, '');
              attachments.push({
                filename: file_name,
                content: Buffer.from(base64Clean, 'base64'),
              });
            } catch (err) {
              console.error('[Resend] Erro ao codificar anexo de e-mail:', err);
            }
          }

          const { subject, html } = buildNotificationEmail({
            clienteId,
            form_type,
            payload,
            extras: curriculo_url ? { 'Baixar currículo': curriculo_url } : {},
            ip,
          });

          void resendTrab.emails.send({
            from: getResendFromEmail(),
            to: emailToTrab,
            subject,
            html,
            ...(attachments.length > 0 ? { attachments } : {}),
          });
        }

        return successResponse({
          ...(curriculo_url ? { curriculo_url } : {}),
        });
      }

      // TypeScript exhaustive check — nunca deve ser atingido
      default: {
        const _exhaustive: never = form_type;
        void _exhaustive;
        return errorResponse('Tipo de formulário não suportado.', 400);
      }
    }
  } catch (error) {
    // Log server-side apenas — nunca expõe detalhes do erro interno ao cliente
    console.error('[POST /api/forms/submit] Erro interno:', error);
    return errorResponse('Erro interno ao processar o formulário.', 500);
  }
}

// ─── Métodos não permitidos ───────────────────────────────────────────────────

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Método não permitido. Use POST.' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}
