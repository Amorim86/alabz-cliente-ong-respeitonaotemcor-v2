"use client";

import { Flag, Heart, Users } from "lucide-react";
import { motion } from "framer-motion";

const HIGHLIGHTS = [
  {
    icon: Heart,
    title: "Acolhimento e superação",
    text: "Uma trajetória pessoal marcada pela resiliência e pela vontade de garantir que outras mulheres não caminhem sozinhas.",
  },
  {
    icon: Users,
    title: "Grupo As Blacks",
    text: "Criação do coletivo para promover empoderamento, formação e suporte mútuo para a comunidade negra.",
  },
  {
    icon: Flag,
    title: "Marcha do Orgulho Negro",
    text: "Idealização do movimento que celebra a identidade, a luta pela igualdade e a mobilização social.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.38, ease: "easeOut" as const },
};

export default function AboutFounderSection() {
  return (
    <section
      id="fundadora"
      className="laptop-compact relative w-full scroll-mt-[4.5rem] overflow-hidden bg-[#FDFBF7] py-12 md:py-16 lg:flex lg:h-[calc(100dvh-var(--header-height))] lg:min-h-0 lg:items-center lg:py-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/founder_bg.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.32]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_32%,rgba(245,207,0,0.16),transparent_26%),linear-gradient(90deg,#FDFBF7_0%,rgba(253,251,247,0.92)_44%,rgba(253,251,247,0.46)_70%,rgba(253,251,247,0.12)_100%)]" />
      </div>

      <div className="founder-grid relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-4 md:px-12 lg:grid-cols-12 lg:gap-8">
        <motion.div {...reveal} className="lg:col-span-7 lg:pr-8">
          <p className="mb-3 font-utility text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Sobre a fundadora
          </p>
          <h2 className="font-display text-4xl font-bold leading-[0.98] text-[var(--color-primary)] md:text-5xl lg:text-[clamp(2.5rem,4.1vw,4.8rem)]">
            Negra Dirce
          </h2>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-[var(--foreground)]/78 md:text-lg lg:text-[0.96rem]">
            Mulher negra, mãe e ativista, Negra Dirce transformou sua própria história de superação em um legado de acolhimento e emancipação para milhares de pessoas em São José dos Pinhais.
          </p>

          <blockquote className="mt-5 max-w-[58ch] border-l-2 border-[var(--color-secondary)] pl-4 font-display text-xl font-medium leading-tight text-[var(--color-primary)] lg:text-[1.3rem]">
            A delicadeza aqui não diminui a luta: ela mostra que cuidado também é força.
          </blockquote>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:mt-5">
            {HIGHLIGHTS.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.32, ease: "easeOut", delay: index * 0.05 }}
                className="flex min-w-0 items-start gap-3 sm:block"
              >
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-secondary)] sm:mb-2 sm:mt-0" strokeWidth={1.8} />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[var(--color-primary)]">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--foreground)]/70">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 border-t border-[var(--color-primary)]/12 pt-5 text-center">
            <div className="h-[76px] w-[76px] shrink-0 overflow-hidden rounded-full border-2 border-[var(--color-secondary)] bg-[var(--color-primary)] shadow-[0_10px_24px_rgba(8,29,66,0.12)] lg:hidden">
              <img
                src="/images/fundadora/fundadora2.webp"
                alt="Rosto de Negra Dirce"
                className="h-full w-full object-cover scale-[1.78]"
                style={{ objectPosition: "50% 10%" }}
              />
            </div>
            <div className="flex min-w-0 flex-col items-center">
              <img
                src="/images/assinatura-dirce.png"
                alt="Assinatura de Dirce Almeida dos Santos"
                className="h-auto w-[317px] max-w-full object-contain"
              />
              <p className="mt-1 font-utility text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]/68">
                Fundadora — Respeito não tem cor
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.42, ease: "easeOut", delay: 0.08 }}
          className="founder-scene relative hidden overflow-hidden lg:col-span-5 lg:block lg:h-[min(38rem,calc(100dvh-var(--header-height)-4rem))] lg:self-center"
        >
          <img
            src="/images/fundadora/fundadora2.webp"
            alt="Negra Dirce, fundadora da ONG Respeito Não Tem Cor"
            className="founder-portrait absolute inset-0 h-full w-full object-contain object-bottom"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FDFBF7] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
