/**
 * lib/utm.ts
 *
 * Utilitário client-side para captura de origem de tráfego (UTMs e Referrer)
 * e armazenamento em sessionStorage para enriquecer leads ou redirecionamentos.
 */

export interface TrafficSourceData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  captured_at?: string;
}

const STORAGE_KEY = 'alabz_traffic_source';

/**
 * Captura as UTMs da URL e o Referrer da sessão atual (se existirem)
 * e persiste no sessionStorage se ainda não houver nenhum dado salvo.
 */
export function captureTrafficSource(): void {
  if (typeof window === 'undefined') return;

  try {
    // Se já temos dados salvos nesta sessão, evitamos sobrescrever para manter a origem inicial
    if (sessionStorage.getItem(STORAGE_KEY)) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');
    const utmContent = params.get('utm_content');
    const utmTerm = params.get('utm_term');

    const referrer = document.referrer;
    let externalReferrer = '';

    // Apenas salva referrer se ele não pertencer ao próprio domínio atual
    if (referrer) {
      try {
        const refUrl = new URL(referrer);
        const currentUrl = new URL(window.location.href);
        if (refUrl.hostname !== currentUrl.hostname) {
          externalReferrer = referrer;
        }
      } catch {
        externalReferrer = referrer; // Fallback se falhar o parse do URL
      }
    }

    // Se encontramos qualquer UTM ou Referrer externo, salvamos
    if (utmSource || utmMedium || utmCampaign || utmContent || utmTerm || externalReferrer) {
      const data: TrafficSourceData = {
        ...(utmSource ? { utm_source: utmSource } : {}),
        ...(utmMedium ? { utm_medium: utmMedium } : {}),
        ...(utmCampaign ? { utm_campaign: utmCampaign } : {}),
        ...(utmContent ? { utm_content: utmContent } : {}),
        ...(utmTerm ? { utm_term: utmTerm } : {}),
        ...(externalReferrer ? { referrer: externalReferrer } : {}),
        captured_at: new Date().toISOString(),
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (err) {
    console.error('[UTM] Erro ao capturar origem de tráfego:', err);
  }
}

/**
 * Recupera as informações de tráfego salvas no sessionStorage.
 */
export function getTrafficSource(): TrafficSourceData | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TrafficSourceData;
  } catch {
    return null;
  }
}

/**
 * Auxiliar para injetar informações de tráfego em uma URL externa (como wa.me)
 * @param originalMessage Mensagem padrão original
 */
export function appendTrafficToWhatsAppMessage(originalMessage: string): string {
  const source = getTrafficSource();
  if (!source) return originalMessage;

  const parts: string[] = [];
  if (source.utm_source) parts.push(`Origem: ${source.utm_source}`);
  if (source.utm_campaign) parts.push(`Campanha: ${source.utm_campaign}`);
  if (!source.utm_source && source.referrer) {
    try {
      const hostname = new URL(source.referrer).hostname;
      parts.push(`Vindo de: ${hostname}`);
    } catch {
      parts.push(`Vindo de: ${source.referrer}`);
    }
  }

  if (parts.length === 0) return originalMessage;

  return `${originalMessage} (${parts.join(' | ')})`;
}
