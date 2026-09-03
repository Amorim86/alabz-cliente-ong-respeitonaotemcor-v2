"use client";

import { useEffect, useState } from "react";
import { captureTrafficSource } from "@/lib/utm";
import {
  getCookieConsent,
  setCookieConsent,
  revokeConsentAndReload,
  OPEN_BANNER_EVENT,
} from "@/lib/cookieConsent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Captura as UTMs e Referrer da URL no carregamento inicial
    captureTrafficSource();

    // Checa se o usuário já tomou uma decisão de consentimento anteriormente
    const consent = getCookieConsent();
    if (consent === null) {
      // Delay suave para exibição inicial não agressiva
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }

    // Escuta evento para reabertura sob demanda ("Gerenciar cookies")
    const handleOpenBanner = () => {
      setVisible(true);
    };

    window.addEventListener(OPEN_BANNER_EVENT, handleOpenBanner);
    return () => {
      window.removeEventListener(OPEN_BANNER_EVENT, handleOpenBanner);
    };
  }, []);

  const handleAccept = () => {
    setCookieConsent(true);
    setVisible(false);
  };

  const handleDecline = () => {
    const previousConsent = getCookieConsent();
    if (previousConsent === "granted") {
      // Se o usuário já havia concedido consentimento e agora está recusando/revogando:
      // Atualiza Consent Mode para denied, limpa cookies do GA e recarrega a página
      revokeConsentAndReload();
    } else {
      setCookieConsent(false);
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <div 
      className="fixed bottom-6 left-6 right-6 mx-auto max-w-[560px] z-[9999] border border-[#F5CF00]/30 bg-[#081D42]/95 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.6)] rounded-lg animate-fade-in-up"
      role="status"
      aria-live="polite"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 4px 12px rgba(245, 207, 0, 0.15);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 4px 20px rgba(245, 207, 0, 0.45), 0 0 15px rgba(245, 207, 0, 0.25);
            transform: scale(1.025);
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2.2s infinite ease-in-out;
        }
      `}} />

      {/* Luz decorativa dourada sutil de fundo */}
      <div className="absolute top-0 right-20 w-48 h-full bg-[#F5CF00]/10 blur-[35px] pointer-events-none rounded-full" />

      {/* Wrapper fluido de conteúdo */}
      <div className="w-full px-6 py-5 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
        
        {/* Conteúdo de Texto à esquerda */}
        <div className="flex flex-col gap-1.5 flex-1 text-left">
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            Vamos falar dos cookies 🍪
          </h4>
          <p className="text-xs text-[#F7F4EA]/80 leading-relaxed font-utility">
            Utilizamos cookies essenciais para o funcionamento da ONG Respeito Não Tem Cor.
            <br />
            Gostaríamos de melhorar e personalizar a sua experiência no nosso site, mas somente se você permitir.
          </p>
        </div>

        {/* Botões de Ação à direita (Empilhados verticalmente) */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0 self-end md:self-auto min-w-[120px]">
          <button
            onClick={handleAccept}
            className="w-full px-5 py-2.5 rounded-sm bg-[#F5CF00] hover:bg-[#e6c100] text-[#081D42] font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_4px_12px_rgba(245,207,0,0.25)] cursor-pointer flex items-center justify-center min-w-[110px] animate-pulse-glow"
          >
            Aceitar
          </button>

          <button
            onClick={handleDecline}
            className="px-4 py-1.5 text-[11px] font-utility text-[#F7F4EA]/60 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Recusar
          </button>
        </div>

      </div>
    </div>
  );
}
