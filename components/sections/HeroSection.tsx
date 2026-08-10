"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGES = [
  "/images/hero-3.webp",
  "/images/hero-2.webp",
];

const PILL_TAGS = [
  "Luta Antirracista",
  "Acolhimento",
  "Empoderamento",
  "Transformação",
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const { width, height, left, top } = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 24; // max 24px
    const y = ((e.clientY - top) / height - 0.5) * 12; // max 12px
    setParallax({ x, y });
  };

  const handlePointerLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-dvh w-full flex-col justify-center overflow-hidden bg-[#081D42] text-[#F7F4EA]"
    >
      {/* Background Mobile Dedicado (hero-mobile.webp) */}
      <div className="absolute inset-0 z-0 block lg:hidden overflow-hidden">
        <img
          src="/images/hero-mobile.webp"
          alt="ONG Respeito Não Tem Cor Mobile"
          className="h-full w-full object-cover object-top"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Overlay escuro em mobile para manter leitura nítida do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081D42] via-[#081D42]/80 to-[#081D42]/40 pointer-events-none" />
      </div>

      {/* Background Carousel Desktop com Efeito Ken Burns & Parallax */}
      <div 
        className="absolute inset-0 z-0 hidden lg:block overflow-hidden transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={HERO_IMAGES[currentImageIndex]}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 5.5, ease: "easeOut" },
            }}
            className="absolute inset-0 h-full w-full"
          >
            <picture className="block h-full w-full">
              <source media="(min-width: 1024px)" srcSet={HERO_IMAGES[currentImageIndex]} />
              <img
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                alt="ONG Respeito Não Tem Cor - Atividades e Apoio Comunitário"
                style={{ objectPosition: "center" }}
                className="h-full w-full object-cover"
              />
            </picture>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlays de Fusão / Blend Layout (Gradiente da esquerda para a direita e de baixo para cima) */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#081D42] via-[#081D42]/85 to-transparent lg:w-3/4 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#081D42] via-transparent to-[#081D42]/40 pointer-events-none" />



      {/* Conteúdo Textual Clássico (Esquerda) */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-center px-4 pt-[calc(var(--header-height)+2rem)] pb-12 md:px-12 lg:py-24">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 flex flex-col items-start lg:col-span-8">
            
            {/* Chapeu / Anchor Brand */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F5CF00]/40 bg-[#F5CF00]/10 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#F5CF00] animate-pulse" />
              <span className="font-display text-xs font-bold uppercase tracking-widest text-[#F5CF00]">
                Respeito Não Tem Cor
              </span>
            </div>

            {/* H1 Principal */}
            <h1 className="mb-6 font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-md">
              Acolhimento <br className="hidden sm:inline" />
              que <span className="text-[#F5CF00]">ganha voz</span>
            </h1>

            {/* Pilares / Badges em linha */}
            <div className="mb-8 flex flex-wrap items-center gap-2 sm:gap-3">
              {PILL_TAGS.map((tag, idx) => (
                <span
                  key={tag}
                  className="rounded-lg bg-white/10 px-3 py-1.5 font-utility text-xs font-semibold text-[#F7F4EA] backdrop-blur-sm md:text-sm"
                >
                  {tag}
                  {idx < PILL_TAGS.length - 1 && <span className="ml-2.5 text-[#F5CF00]/60">•</span>}
                </span>
              ))}
            </div>

            {/* Subtexto Descritivo curto */}
            <p className="mb-10 max-w-2xl font-utility text-base leading-relaxed text-[#F7F4EA]/90 md:text-lg">
              Promovemos a igualdade racial, o apoio social e a transformação comunitária.
              Junte-se à nossa causa por uma sociedade mais justa e inclusiva.
            </p>

            {/* CTAs de Ação */}
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
              <a
                href="https://wa.me/5541998824878?text=Ol%C3%A1%2C%20preciso%20de%20atendimento%20e%20orienta%C3%A7%C3%A3o%20da%20ONG."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#F5CF00] px-8 py-4 font-display text-xs font-bold uppercase tracking-wider text-[#081D42] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e6c100] hover:shadow-xl md:text-sm"
              >
                🤝 Preciso de atendimento
              </a>
              <a
                href="#contribua"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-white/10 px-8 py-4 font-display text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#081D42] hover:shadow-xl md:text-sm"
              >
                💛 Quero apoiar um projeto
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
