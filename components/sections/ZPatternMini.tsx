"use client";

import { motion, type Variants } from "framer-motion";
import { ShieldCheck, Crosshair, Award } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

export default function ZPatternMini() {
  return (
    <section className="relative w-full section-natural flex flex-col bg-[#111214]">
      {/* Faixa Superior (Escura/CTA) */}
      <div className="w-full mx-auto px-4 md:px-12 max-w-[1400px] py-10 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-2/3"
          >
            <span className="inline-block text-[var(--color-accent)] text-sm font-bold tracking-wider uppercase mb-3">
              Impacto Visual
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
              Cada Detalhe Faz <br /> A Diferença
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/3 flex md:justify-end"
          >
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--color-accent)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[var(--color-accent)]/90"
            >
              Falar com Especialista
            </a>
          </motion.div>
        </div>
      </div>

      {/* Faixa Inferior (Clara/Fatos) */}
      <div className="w-full bg-[#ecebe6]">
        <div className="w-full mx-auto max-w-[1400px]">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5"
          >
            {[
              {
                icon: <ShieldCheck className="w-6 h-6 text-[#111214]" />,
                title: "Tecnologia de Ponta",
                desc: "Equipamentos de última geração para máxima precisão."
              },
              {
                icon: <Crosshair className="w-6 h-6 text-[#111214]" />,
                title: "Segurança Total",
                desc: "Processos rigorosos para garantir estabilidade."
              },
              {
                icon: <Award className="w-6 h-6 text-[#111214]" />,
                title: "Estilo Inconfundível",
                desc: "Acabamento premium para valorizar o seu projeto."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="flex flex-row items-center justify-center gap-5 bg-[#ecebe6] px-6 py-10 md:py-16 hover:bg-white transition-colors duration-300"
              >
                <div className="shrink-0">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-[#111214] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#111214]/70 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
