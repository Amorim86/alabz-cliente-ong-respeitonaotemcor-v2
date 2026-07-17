"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1920"
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="inicio" className="section-viewport relative w-full overflow-hidden bg-background flex flex-col min-[961px]:flex-row-reverse animate-fade-in">
      
      {/* Imagem Direita (Carrossel com Crossfade em Opacidade Máxima) */}
      <div className="relative w-full min-[961px]:w-1/2 h-[50dvh] min-[961px]:h-auto min-[961px]:self-stretch overflow-hidden bg-background">
        {HERO_IMAGES.map((src, index) => (
          <motion.img
            key={src}
            src={src}
            alt={`Hero Background ${index + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-right z-0"
          />
        ))}
        {/* Overlay de fusão suave - Esquerda (Desktop) e Baixo (Mobile) */}
        <div className="absolute inset-y-0 left-0 w-[45%] hidden min-[961px]:block pointer-events-none z-10 bg-gradient-to-l from-transparent to-background" />
        <div className="absolute inset-x-0 bottom-0 h-[120px] min-[961px]:hidden pointer-events-none z-10 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Conteúdo Textual Esquerda */}
      <div className="w-full min-[961px]:w-1/2 flex flex-col justify-center px-6 min-[961px]:px-20 lg:px-28 py-16 min-[961px]:py-0 bg-background relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[540px] min-[961px]:ml-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight text-left">
            Um refúgio de bem-estar e tranquilidade para a sua jornada
          </h1>
          <p className="text-lg text-foreground/70 mb-10 leading-relaxed text-left">
            Descubra uma vivência exclusiva desenhada nos mínimos detalhes para acolher você, acalmar a mente e proporcionar momentos inesquecíveis.
          </p>
          <div className="flex justify-start">
            <button className="bg-brand-primary text-white px-8 py-4 rounded-full text-base font-bold hover:bg-brand-primary/90 transition-transform hover:scale-105 cursor-pointer">
              Descobrir Experiência
            </button>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
