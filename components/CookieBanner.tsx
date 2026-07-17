"use client";

import { useEffect, useState } from "react";
import { captureTrafficSource } from "@/lib/utm";

const STORAGE_KEY = "alabz_cookies_accepted";
const CLIENTE_ID = "alabz"; // slug fixo da Alabz

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Captura as UTMs e Referrer da URL no carregamento inicial
    captureTrafficSource();

    // Checa se o usuário já aceitou os cookies anteriormente
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      // Pequeno delay para a experiência de carregamento ficar mais premium
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = async () => {
    setLoading(true);
    try {
      // Dispara o consentimento para o Firestore
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clienteId: CLIENTE_ID,
          form_type: "cookies_consent",
          payload: {
            accepted: true,
            version: "1.0",
            source_url: window.location.href,
          },
        }),
      });

      if (!response.ok) {
        console.warn("[CookieBanner] Erro ao salvar consentimento no Firestore:", response.statusText);
      }
    } catch (err) {
      console.error("[CookieBanner] Falha de rede ao registrar consentimento:", err);
    } finally {
      // Independente do sucesso no banco de dados, marcamos o consentimento local 
      // para não travar a experiência do usuário
      localStorage.setItem(STORAGE_KEY, "true");
      setLoading(false);
      setVisible(false);

      // Dispara o evento de aceitação para inicializar os scripts de rastreamento
      window.dispatchEvent(new Event("alabz_cookies_accepted"));
    }
  };

  const handleDecline = () => {
    // Apenas esconde e marca como recusado localmente (sessionOnly ou permanente para não incomodar)
    localStorage.setItem(STORAGE_KEY, "false");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div 
      className="fixed bottom-6 left-6 right-6 mx-auto max-w-[560px] z-[9999] border border-[#d9a928]/20 bg-[#0a0a0ae6] backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.6)] rounded-lg animate-fade-in-up"
      role="status"
      aria-live="polite"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 4px 12px rgba(217, 169, 40, 0.15);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 4px 20px rgba(217, 169, 40, 0.45), 0 0 15px rgba(217, 169, 40, 0.25);
            transform: scale(1.025);
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2.2s infinite ease-in-out;
        }
      `}} />

      {/* Luz decorativa dourada sutil de fundo */}
      <div className="absolute top-0 right-20 w-48 h-full bg-[#d9a928]/5 blur-[35px] pointer-events-none rounded-full" />

      {/* Wrapper fluido de conteúdo */}
      <div className="w-full px-6 py-5 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
        
        {/* Conteúdo de Texto à esquerda */}
        <div className="flex flex-col gap-1.5 flex-1 text-left">
          <h4 className="font-['Outfit',sans-serif] font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            Vamos falar dos cookies 🍪
          </h4>
          <p className="text-xs text-[#a49d92] leading-relaxed">
            Utilizamos cookies essenciais para o funcionamento da Alabz.
            <br />
            Gostaríamos de melhorar e personalizar a sua experiência, no nosso site, mas somente se você permitir.
          </p>
        </div>

        {/* Botões de Ação à direita (Empilhados verticalmente) */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0 self-end md:self-auto min-w-[120px]">
          <button
            onClick={handleAccept}
            disabled={loading}
            className="w-full px-5 py-2.5 rounded-sm bg-[#d9a928] hover:bg-[#b0871d] text-black font-['Outfit',sans-serif] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_4px_12px_rgba(217,169,40,0.15)] cursor-pointer disabled:opacity-50 flex items-center justify-center min-w-[110px] animate-pulse-glow"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              "Aceitar"
            )}
          </button>

          <button
            onClick={handleDecline}
            disabled={loading}
            className="px-4 py-1.5 text-[11px] font-mono text-[#a49d92] hover:text-white transition-colors duration-200 cursor-pointer disabled:opacity-50"
          >
            Recusar
          </button>
        </div>

      </div>
    </div>
  );
}
