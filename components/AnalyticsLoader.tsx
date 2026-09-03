"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { getCookieConsent, CONSENT_CHANGE_EVENT } from "@/lib/cookieConsent";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
  };
}

function getSnapshot(): boolean {
  return getCookieConsent() === "granted";
}

function getServerSnapshot(): boolean {
  return false;
}

export default function AnalyticsLoader() {
  // Sincronização reativa e sem cascading renders com o estado de consentimento
  const isGranted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Sem consentimento concedido ou sem ID válido: zero scripts montados
  if (!isGranted || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-consent" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
          gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
