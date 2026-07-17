"use client";

import { useEffect, useState, useRef } from "react";

const REVIEWS = [
  { name: "João Silva", text: "Um verdadeiro refúgio de paz. A atenção aos detalhes em cada espaço e o atendimento acolhedor superaram todas as expectativas." },
  { name: "Maria Fernanda", text: "A melhor escolha para relaxar e se reconectar. O ambiente integrado com a natureza traz uma sensação única de tranquilidade." },
  { name: "Carlos Eduardo", text: "Recomendo a todos que buscam privacidade e bem-estar. A infraestrutura é primorosa e a gastronomia é excepcional." }
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Alternância de avaliações
    const cycleReview = () => {
      setIsFadingOut(true);
      
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % REVIEWS.length;
        setCurrentIndex(nextIndex);
        setDisplayedText(""); 
        setIsFadingOut(false);
        
        // Efeito Typewriter Dinâmico
        const textToType = REVIEWS[nextIndex].text;
        const textLength = textToType.length;
        const stepMs = Math.max(16, Math.floor(2448 / Math.max(1, textLength)));
        let charIndex = 0;
        
        if (typingRef.current) clearInterval(typingRef.current);
        
        typingRef.current = setInterval(() => {
          setDisplayedText((prev) => prev + textToType.charAt(charIndex));
          charIndex++;
          if (charIndex >= textLength) {
            if (typingRef.current) clearInterval(typingRef.current);
          }
        }, stepMs);

      }, 380); // Fade out duration
    };

    const intervalId = setInterval(cycleReview, 6000);
    
    // Digitação Inicial
    const initialText = REVIEWS[currentIndex].text;
    const textLength = initialText.length;
    const stepMs = Math.max(16, Math.floor(2448 / Math.max(1, textLength)));
    let charIndex = 0;
    typingRef.current = setInterval(() => {
      setDisplayedText((prev) => prev + initialText.charAt(charIndex));
      charIndex++;
      if (charIndex >= textLength) {
        if (typingRef.current) clearInterval(typingRef.current);
      }
    }, stepMs);

    return () => {
      clearInterval(intervalId);
      if (typingRef.current) clearInterval(typingRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <section className="section-viewport relative w-full overflow-hidden bg-background py-16 md:py-24 flex items-center" id="avaliacoes">
      <div className="container-alabz">
        
        <div className="grid grid-cols-1 max-[960px]:grid-cols-1 min-[961px]:grid-cols-[minmax(360px,0.82fr)_minmax(0,1.18fr)] gap-8 items-stretch">
          
          {/* Coluna Esquerda: Texto */}
          <div className="flex flex-col justify-center text-center min-[961px]:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Aprovado por quem importa.
            </h2>
            <h3 className="text-xl md:text-2xl text-foreground/80 font-medium mb-4">
              A excelência confirmada por nossos clientes.
            </h3>
            <p className="text-base text-foreground/70 leading-relaxed text-justify">
              Não acredite apenas na nossa palavra. Veja o que dizem as pessoas que já experimentaram o nosso serviço. Mantemos o mais alto padrão de qualidade para garantir a sua satisfação absoluta.
            </p>
          </div>

          {/* Coluna Direita: Mídias e Avaliação */}
          <div className="grid grid-cols-1 max-[960px]:grid-cols-1 min-[961px]:grid-cols-2 gap-4 items-stretch min-[961px]:min-h-[clamp(250px,28vw,320px)] max-[960px]:h-auto">
            
            {/* Imagem de Enquadramento */}
            <div className="overflow-hidden border border-[var(--line)] bg-zinc-900 rounded-xl relative h-[250px] min-[961px]:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600" 
                alt="Ambiente" 
                className="absolute inset-0 object-cover"
                style={{ width: "140%", height: "100%", maxWidth: "none", marginLeft: "-20%", objectPosition: "50% 48%" }}
              />
            </div>

            {/* Card de Avaliação Dinâmico */}
            <div 
              className={`bg-[#0E0E0D]/95 border border-[var(--gold-border)] rounded-xl p-[14px_16px] flex flex-col gap-2 max-[960px]:min-h-[320px] transition-all duration-[380ms] ease-out ${isFadingOut ? "opacity-15 translate-y-1" : "opacity-100 translate-y-0"}`}
            >
              {/* Badge de Nota */}
              <div className="grid grid-cols-[auto_1fr] gap-3 p-[10px_12px] border border-white/10 bg-white/5 rounded-lg relative overflow-hidden">
                {/* Efeito Shimmer */}
                <div className="absolute inset-0 z-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-130%]" style={{ animation: 'badgeShine 4.8s ease-in-out infinite' }} />
                
                <div className="relative z-10 flex items-center justify-center">
                  <span className="text-[33px] font-bold text-white font-display leading-none">4,9</span>
                </div>
                <div className="relative z-10 flex flex-col justify-center">
                  <div className="text-[var(--gold-border)] text-lg tracking-widest" style={{ animation: 'starsPulse 2s ease-in-out infinite' }}>
                    ★★★★★
                  </div>
                  <span className="text-[12.5px] font-bold text-white uppercase tracking-wider mt-0.5">
                    319 AVALIAÇÕES NO GOOGLE
                  </span>
                </div>
              </div>

              {/* Corpo da Avaliação */}
              <div className="mt-4 flex flex-col flex-1 min-[961px]:min-h-[7.8em]">
                <h3 className="text-base font-bold text-white mb-2">{REVIEWS[currentIndex].name}</h3>
                <p className="text-[0.95rem] leading-relaxed text-zinc-300">
                  {displayedText}
                  <span className="animate-pulse font-bold text-[var(--gold-border)]">|</span>
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
