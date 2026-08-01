"use client";

import { Eye, HeartHandshake, Target } from "lucide-react";
import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    icon: Target,
    title: "Missão",
    text: "Promover acolhimento, proteção e desenvolvimento da população negra."
  },
  {
    icon: Eye,
    title: "Visão",
    text: "Uma sociedade justa, antirracista e acolhedora, com dignidade e oportunidades."
  },
  {
    icon: HeartHandshake,
    title: "Valores",
    text: "Respeito, equidade, escuta ativa, ancestralidade e amor à comunidade."
  }
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.32, ease: "easeOut" as const }
};

export default function QuemSomosSection() {
  return (
    <section
      className="section-natural relative flex scroll-mt-[4.5rem] w-full items-center overflow-hidden bg-[#F7F4EA] lg:h-[70%] lg:min-h-0"
      id="quem-somos"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--color-primary)]/10" />
      <div className="absolute left-0 top-0 hidden h-full w-[18vw] bg-[var(--color-secondary)]/70 lg:block" />

      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1400px] grid-cols-1 gap-8 px-4 py-14 md:px-12 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-3">
        <motion.div
          {...reveal}
          className="group relative min-h-[320px] overflow-hidden border border-[var(--color-primary)]/10 bg-white lg:col-span-4 lg:h-full lg:min-h-0"
        >
          <img
            src="/images/microfone.webp"
            alt="Negra Dirce discursando no microfone"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/42 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 max-w-[14rem] border-l-2 border-[var(--color-secondary)] pl-4 text-white">
            <p className="font-utility text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
              Acolhimento que ganha voz
            </p>
            <p className="mt-2 text-sm leading-snug">
              Uma história coletiva, construída pela escuta e pela presença.
            </p>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.34, ease: "easeOut", delay: 0.04 }}
          className="lg:col-span-5"
        >
          <p className="font-utility text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Quem Somos
          </p>
          <h2 className="mt-3 max-w-2xl text-4xl font-semibold uppercase leading-[1.02] text-[var(--color-primary)] md:text-5xl lg:text-[clamp(2rem,3vw,4.15rem)]">
            Respeito começa quando alguém é ouvido.
          </h2>

          <div className="mt-5 max-w-2xl space-y-3 text-base leading-relaxed text-[var(--foreground)]/74 md:text-lg lg:text-[clamp(0.8rem,0.88vw,1.05rem)]">
            <p>
              Fundada em 2019 sob a liderança de Negra Dirce, a ONG Respeito Não Tem Cor é uma instituição dedicada à garantia de direitos, dignidade e desenvolvimento comunitário.
            </p>
            <p>
              Nossa missão se estrutura no acolhimento de famílias em vulnerabilidade, promovendo projetos sociais transformadores nas áreas de educação, cultura, assistência social e saúde emocional.
            </p>
            <p className="border-l-2 border-[var(--color-secondary)] pl-4 font-semibold text-[var(--color-primary)]">
              Acreditamos que acolher é abrir caminhos para a dignidade, a equidade e o fortalecimento de toda a comunidade.
            </p>
          </div>
        </motion.div>

        <motion.aside
          {...reveal}
          transition={{ duration: 0.36, ease: "easeOut", delay: 0.07 }}
          className="grid grid-cols-1 gap-5 border-y border-[var(--color-primary)]/12 py-5 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1 lg:gap-3 lg:border-y-0 lg:border-l lg:py-0 lg:pl-7"
        >
          {PRINCIPLES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.04 * index }}
              className="group flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left"
            >
              <div
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-full text-[var(--color-primary)] transition-colors duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-secondary)] lg:mb-2 lg:h-10 lg:w-10"
              >
                <item.icon className="h-10 w-10 transition-colors duration-300 lg:h-8 lg:w-8" strokeWidth={1.65} />
              </div>
              <h3 className="font-display text-base font-semibold uppercase tracking-[0.06em] text-[var(--color-primary)] lg:text-sm">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--foreground)]/68 lg:text-xs">
                {item.text}
              </p>
            </motion.div>
          ))}

          <a
            href="#fundadora"
            className="hidden"
          >
            Conheça a história
          </a>
        </motion.aside>
      </div>
    </section>
  );
}
