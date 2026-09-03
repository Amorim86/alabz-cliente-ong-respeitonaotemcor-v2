/**
 * lib/cookieConsent.ts
 *
 * Módulo client-side de gerenciamento de consentimento de cookies (LGPD / Consent Mode v2).
 * Todas as decisões são locais (localStorage), sem chamadas de rede ou persistência em banco.
 */

export const COOKIE_STORAGE_KEY = 'alabz_cookies_accepted';
export const CONSENT_CHANGE_EVENT = 'alabz_cookies_consent_changed';
export const OPEN_BANNER_EVENT = 'alabz_open_cookie_banner';

export type ConsentStatus = 'granted' | 'denied' | null;

/**
 * Lê o estado atual do consentimento salvo no localStorage.
 */
export function getCookieConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null;
  try {
    const val = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (val === 'true') return 'granted';
    if (val === 'false') return 'denied';
    return null;
  } catch {
    return null;
  }
}

/**
 * Atualiza o consentimento local, ajusta o Consent Mode no gtag (se disponível)
 * e dispara eventos para sincronizar a interface.
 */
export function setCookieConsent(granted: boolean): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(COOKIE_STORAGE_KEY, granted ? 'true' : 'false');
  } catch (e) {
    console.warn('[CookieConsent] Falha ao gravar no localStorage:', e);
  }

  // Atualiza Google Consent Mode v2 caso gtag já esteja inicializado no window
  if (typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  }

  // Dispara eventos customizados para componentes inscritos
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, {
      detail: { consent: granted ? 'granted' : 'denied' },
    })
  );

  // Mantém retrocompatibilidade com listeners existentes
  if (granted) {
    window.dispatchEvent(new Event('alabz_cookies_accepted'));
  }
}

/**
 * Remove cookies do Google Analytics (_ga, _ga_*, _gid) nos escopos aplicáveis.
 */
export function clearGoogleAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;

  const hostname = window.location.hostname;
  const hostParts = hostname.split('.');

  const domainsToClear = ['', hostname, `.${hostname}`];
  if (hostParts.length > 2) {
    const rootDomain = `.${hostParts.slice(-2).join('.')}`;
    domainsToClear.push(rootDomain);
  }

  const pathsToClear = ['/', ''];

  const currentCookies = document.cookie.split(';');
  for (const raw of currentCookies) {
    const name = raw.split('=')[0].trim();
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid') {
      for (const domain of domainsToClear) {
        for (const path of pathsToClear) {
          const domainAttr = domain ? `; domain=${domain}` : '';
          const pathAttr = path ? `; path=${path}` : '';
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${pathAttr}${domainAttr}`;
        }
      }
    }
  }
}

/**
 * Revoga o consentimento para 'denied', limpa cookies do GA e recarrega a página.
 */
export function revokeConsentAndReload(): void {
  setCookieConsent(false);
  clearGoogleAnalyticsCookies();
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}

/**
 * Solicita a reabertura do banner de preferências de cookies.
 */
export function requestOpenBanner(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_BANNER_EVENT));
}
