"use client";

import { HandHeart, Scale, UsersRound } from "lucide-react";
import { motion } from "framer-motion";

const PILLARS = [
  {
    icon: UsersRound,
    title: "Escuta e acolhimento",
    description: "Espaços seguros para falar, ser ouvida e encontrar apoio emocional e social."
  },
  {
    icon: Scale,
    title: "Orientação e direitos",
    description: "Apoio jurídico e encaminhamentos para garantir o acesso a direitos e políticas públicas."
  },
  {
    icon: HandHeart,
    title: "Fortalecimento",
    description: "Oficinas, grupos de apoio e formações para promover autoestima, autonomia e protagonismo."
  },
  {
    icon: UsersRound,
    title: "Rede e comunidade",
    description: "Conexão com serviços, parceiros e oportunidades que transformam realidades."
  }
];

export default function ComoAcolhemosSection() {
  return (
    <section
      className="como-acolhemos section-natural relative flex scroll-mt-[4.5rem] w-full items-center overflow-hidden bg-[var(--color-secondary)] lg:h-[30%] lg:min-h-0"
      id="como-acolhemos"
    >
      <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col items-center justify-center gap-5 px-4 py-12 text-center md:px-12 lg:gap-3 lg:py-3">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl font-semibold uppercase leading-none text-[var(--color-primary)] md:text-4xl lg:text-[clamp(1.7rem,2vw,2.5rem)]">
            Como Acolhemos
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[var(--color-primary)]/78 lg:text-xs">
            Escuta, cuidado e orientação para quem mais precisa.
          </p>
        </motion.div>

        <div className="grid w-full grid-cols-1 justify-items-center gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.08 }}
              className="group flex max-w-[15rem] min-w-0 flex-col items-center justify-start text-center"
            >
              <div
                className="mb-3 flex h-14 w-14 items-center justify-center rounded-full text-[var(--color-primary)] transition-colors duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-secondary)] lg:h-12 lg:w-12"
              >
                <pillar.icon className="h-11 w-11 transition-colors duration-300 ease-out md:h-12 md:w-12 lg:h-10 lg:w-10" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-base font-extrabold uppercase leading-tight tracking-[0.05em] text-[var(--color-primary)] lg:text-sm">
                {pillar.title}
              </h3>
              <p className="como-acolhemos__description mt-2 text-sm font-medium leading-snug text-[var(--color-primary)]/82 lg:mt-1 lg:text-[0.72rem]">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
