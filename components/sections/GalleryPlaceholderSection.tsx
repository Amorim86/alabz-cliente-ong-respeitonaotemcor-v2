"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const PLACEHOLDERS = [
  { title: "Acolhimento", label: "Imagem a definir" },
  { title: "Oficinas", label: "Imagem a definir" },
  { title: "Comunidade", label: "Imagem a definir" },
  { title: "Eventos", label: "Imagem a definir" },
  { title: "Rede de apoio", label: "Imagem a definir" },
  { title: "Território", label: "Imagem a definir" },
];

export default function GalleryPlaceholderSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = PLACEHOLDERS[activeIndex];

  useEffect(() => {
    const autoplayId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % PLACEHOLDERS.length);
    }, 4000);

    return () => window.clearInterval(autoplayId);
  }, []);

  const goToIndex = (nextIndex: number) => {
    setActiveIndex(((nextIndex % PLACEHOLDERS.length) + PLACEHOLDERS.length) % PLACEHOLDERS.length);
  };

  return (
    <section className="relative hidden w-full overflow-hidden bg-[#F7F4EA] py-8 md:py-10 lg:flex lg:h-[calc(100dvh-var(--header-height))] lg:min-h-0 lg:items-center lg:py-6" id="galeria" tabIndex={-1}>
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-12">
        <div className="mx-auto mb-5 max-w-[920px] text-center">
          <span className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-[0.34em] text-[var(--color-accent)] md:text-sm">
            Galeria
          </span>
          <p className="mx-auto mt-3 max-w-[760px] px-2 text-balance text-sm leading-relaxed text-[var(--foreground)]/72 md:px-0 md:text-[15px]">
            Espaço reservado para registros reais das ações, encontros, oficinas e momentos da ONG.
          </p>
          <div className="mx-auto mt-4 h-1 w-24 bg-[var(--color-secondary)]" />
        </div>

        <div className="mx-auto max-w-[1320px] border border-[var(--color-primary)]/10 bg-white/70 p-2.5 shadow-[0_16px_48px_rgba(8,29,66,0.10)] backdrop-blur-sm md:p-3">
          <div className="overflow-hidden bg-[var(--color-primary)] shadow-[0_14px_36px_rgba(8,29,66,0.18)]">
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#081D42]/55 via-transparent to-[#081D42]/15" />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-black/30 to-transparent" />

              <div className="absolute left-3 top-3 z-20 inline-flex items-center border border-white/18 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md md:left-4 md:top-4 md:text-[11px]">
                Galeria de fotos
              </div>

              <div className="absolute right-3 top-3 z-20 border border-white/18 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md md:right-4 md:top-4 md:text-[11px]">
                {String(activeIndex + 1).padStart(2, "0")} / {String(PLACEHOLDERS.length).padStart(2, "0")}
              </div>

              <button
                type="button"
                onClick={() => goToIndex(activeIndex - 1)}
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 border border-white/18 bg-white/12 p-2 text-white transition-transform duration-200 hover:-translate-x-0.5 hover:bg-white/20 md:left-4 md:p-3"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => goToIndex(activeIndex + 1)}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 border border-white/18 bg-white/12 p-2 text-white transition-transform duration-200 hover:translate-x-0.5 hover:bg-white/20 md:right-4 md:p-3"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="relative flex aspect-[16/9] max-h-[52vh] w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(245,207,0,0.22),rgba(255,255,255,0.06))] text-center md:max-h-[56vh] lg:aspect-[21/8] lg:max-h-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_55%)]" aria-hidden="true" />
                <div className="relative z-10 max-w-[26rem] px-8">
                  <p className="font-utility text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-secondary)]">
                    {activeImage.label}
                  </p>
                  <h3 className="mt-3 font-display text-4xl font-extrabold uppercase leading-none text-white md:text-6xl">
                    {activeImage.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="border-t border-white/8 bg-[#061633]/90 px-3 pb-2.5 pt-2.5 md:px-4">
              <div className="mx-auto flex max-w-full items-center justify-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {PLACEHOLDERS.map((image, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={`${image.title}-dock-${index}`}
                      type="button"
                      onClick={() => goToIndex(index)}
                      className={`group relative h-12 w-[82px] shrink-0 overflow-hidden border transition-[transform,opacity,background-color,border-color] duration-200 md:h-14 md:w-[96px] ${
                        isActive
                          ? "scale-[1.06] border-[var(--color-secondary)] bg-white/12"
                          : "border-white/10 bg-white/5 opacity-80 hover:-translate-y-1 hover:opacity-100"
                      }`}
                      aria-label={`Ir para placeholder ${index + 1}`}
                    >
                      <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,207,0,0.30),rgba(255,255,255,0.04))]" />
                      <span className="relative z-10 flex h-full items-center justify-center px-2 text-center text-[9px] font-bold uppercase tracking-[0.12em] text-white/78">
                        {image.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
