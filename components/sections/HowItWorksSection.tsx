"use client";

import { motion } from "framer-motion";
import { Compass, Sparkles, Sun } from "lucide-react";

const STEPS_DATA = [
  {
    icon: Compass,
    title: "Acolhimento Exclusivo",
    description: "Sua jornada começa com uma recepção personalizada. Dedicamos tempo para compreender suas preferências e ritmo, criando uma experiência sob medida desenhada exclusivamente para você."
  },
  {
    icon: Sparkles,
    title: "Vivências Personalizadas",
    description: "Oferecemos uma curadoria especial de rituais de bem-estar, terapias relaxantes e atividades guiadas integradas à natureza, selecionadas para renovar sua energia física e mental."
  },
  {
    icon: Sun,
    title: "Integração e Harmonia",
    description: "Proporcionamos um ambiente calmo para descanso profundo e desconexão da rotina, permitindo que você leve o equilíbrio e a paz conquistados de volta para o seu dia a dia."
  }
];

export default function HowItWorksSection() {
  return (
    <section className="section-natural relative w-full overflow-hidden bg-[#FDFBF7]/35 py-20 md:py-28" id="como-funciona">
      <div className="container-alabz">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16 max-w-[800px] mx-auto">
          <span className="inline-block text-[var(--color-accent)] text-xs md:text-sm font-bold tracking-widest uppercase">
            Como Funciona
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-4 tracking-tight leading-tight">
            Uma Jornada de Cuidado e Desconexão
          </h2>
          
          {/* Linha divisória dourada */}
          <div className="w-12 h-[3px] bg-[var(--color-accent)] mx-auto my-6 rounded-full" />
          
          <p className="text-base md:text-lg text-foreground/70 max-w-[680px] mx-auto leading-relaxed">
            Uma sequência de vivências integradas para que você desfrute do melhor em conforto, privacidade e renovação integral.
          </p>
        </div>

        {/* Grid de 3 Colunas com os Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS_DATA.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                className="bg-white border border-zinc-200/50 rounded-[24px] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-zinc-300/60"
              >
                {/* Container do Ícone */}
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)]/15 text-[var(--color-accent)] flex items-center justify-center mb-6">
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Título do Card */}
                <h3 className="text-xl font-bold text-foreground mb-4 leading-snug">
                  {step.title}
                </h3>

                {/* Descrição do Card */}
                <p className="text-sm md:text-base text-foreground/75 leading-relaxed text-center">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
