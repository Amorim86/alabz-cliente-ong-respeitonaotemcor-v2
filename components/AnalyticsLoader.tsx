"use client";

import { useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

const STORAGE_KEY = "alabz_cookies_accepted";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function AnalyticsLoader() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // 1. Checa se o usuário já aceitou cookies anteriormente
    const consent = localStorage.getItem(STORAGE_KEY);
    if (consent === "true") {
      setAccepted(true);
    }

    // 2. Escuta o evento customizado disparado pelo CookieBanner em caso de aceite em tempo real
    const handleConsentAccepted = () => {
      setAccepted(true);
    };

    window.addEventListener("alabz_cookies_accepted", handleConsentAccepted);
    return () => {
      window.removeEventListener("alabz_cookies_accepted", handleConsentAccepted);
    };
  }, []);

  // Só injeta se houver consentimento
  if (!accepted) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager (GTM) */}
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}

      {/* Google Analytics 4 (GA4) */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
