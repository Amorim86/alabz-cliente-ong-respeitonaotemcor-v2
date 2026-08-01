"use client";

import { Eye, Heart, HeartHandshake, ShieldCheck, Target, Users } from "lucide-react";
import { motion } from "framer-motion";

const VALORES_OFICIAIS = [
  {
    icon: HeartHandshake,
    title: "Acolhimento",
    text: "Recepcionar todas as pessoas para que se sintam bem tratadas, sem distinções e com respeito."
  },
  {
    icon: ShieldCheck,
    title: "Honestidade",
    text: "Agir com ética e verdade nas relações humanas e no cumprimento das obrigações."
  },
  {
    icon: Heart,
    title: "Cuidado",
    text: "Preservar a vida e contribuir para o crescimento e o desenvolvimento de cada ser humano, tratando todas as pessoas com humanidade."
  },
  {
    icon: Users,
    title: "Responsabilidade Social",
    text: "Exercer a cidadania e contribuir, por meio da educação, da cultura e da saúde, para o desenvolvimento da sociedade."
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
      className="laptop-compact relative flex w-full flex-col justify-center overflow-hidden bg-[#F7F4EA] py-10 md:py-14 lg:h-[calc(100dvh-var(--header-height))] lg:min-h-0 lg:py-4"
      id="quem-somos"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--color-primary)]/10" />
      <div className="absolute left-0 top-0 hidden h-full w-[18vw] bg-[var(--color-secondary)]/70 lg:block" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-6 px-4 md:px-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        {/* Imagem da Sede e Identidade Comunitária */}
        <motion.div
          {...reveal}
          className="group relative min-h-[280px] overflow-hidden rounded-2xl border border-[var(--color-primary)]/10 bg-white shadow-lg lg:col-span-5 lg:h-full lg:max-h-[350px] lg:min-h-[280px]"
        >
          <img
            src="/images/faixada dia.webp"
            alt="Fachada da sede da ONG Respeito Não Tem Cor"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/85 via-[var(--color-primary)]/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 border-l-4 border-[var(--color-secondary)] pl-3 text-white lg:bottom-5 lg:left-5 lg:right-5">
            <p className="font-utility text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-secondary)] lg:text-[10px]">
              Nossa Sede & Comunidade
            </p>
            <p className="mt-0.5 text-xs font-medium leading-snug lg:text-sm">
              Um espaço de portas abertas para a promoção de direitos, dignidade e desenvolvimento humano.
            </p>
          </div>
        </motion.div>

        {/* Apresentação Institucional, Missão e Visão */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.34, ease: "easeOut", delay: 0.04 }}
          className="flex flex-col justify-center lg:col-span-7"
        >
          <p className="font-utility text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Quem Somos
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold uppercase leading-tight text-[var(--color-primary)] md:text-4xl lg:text-[clamp(1.7rem,2.3vw,2.5rem)]">
            Respeito começa quando alguém é ouvido.
          </h2>

          <p className="mt-2 text-xs leading-relaxed text-[var(--foreground)]/78 sm:text-sm md:text-base lg:text-[0.88rem]">
            Fundada em 2019 sob a liderança de Negra Dirce, a <strong>ONG Respeito Não Tem Cor</strong> é uma instituição comunitária dedicada a apoiar famílias e pessoas em situação de vulnerabilidade social em São José dos Pinhais.
          </p>

          {/* Quadros Confirmados de Missão e Visão */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-3">
            <div className="rounded-xl border border-[var(--color-primary)]/12 bg-white/80 p-3.5 shadow-sm lg:p-4">
              <div className="mb-1.5 flex items-center gap-2 text-[var(--color-primary)]">
                <Target className="h-4 w-4 text-[var(--color-accent)] lg:h-5 lg:w-5" strokeWidth={2} />
                <h3 className="font-display text-xs font-bold uppercase tracking-wider lg:text-sm">Missão</h3>
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--foreground)]/76 lg:text-[0.75rem]">
                Apoiar pessoas em situação de vulnerabilidade, promovendo acolhimento, desenvolvimento humano e qualidade de vida. Criamos oportunidades por meio da educação, da cultura e da saúde.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--color-primary)]/12 bg-white/80 p-3.5 shadow-sm lg:p-4">
              <div className="mb-1.5 flex items-center gap-2 text-[var(--color-primary)]">
                <Eye className="h-4 w-4 text-[var(--color-accent)] lg:h-5 lg:w-5" strokeWidth={2} />
                <h3 className="font-display text-xs font-bold uppercase tracking-wider lg:text-sm">Visão</h3>
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--foreground)]/76 lg:text-[0.75rem]">
                Consolidar a ONG como referência no apoio a pessoas em situação de vulnerabilidade, ampliando o acesso democrático à educação, à cultura e à proteção da vida.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Seção dos 4 Valores Institucionais Confirmados */}
      <div className="relative z-10 mx-auto mt-6 w-full max-w-[1400px] px-4 md:px-12 lg:mt-4">
        <div className="border-t border-[var(--color-primary)]/12 pt-4 lg:pt-3">
          <p className="mb-3 text-center font-utility text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--color-accent)] lg:mb-2 lg:text-[10px]">
            Nossos Valores Fundamentais
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {VALORES_OFICIAIS.map((valor, index) => (
              <motion.div
                key={valor.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex flex-col rounded-xl border border-[var(--color-primary)]/12 bg-white p-3.5 shadow-sm lg:p-3"
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] lg:h-7 lg:w-7">
                  <valor.icon className="h-4 w-4 text-[var(--color-primary)] lg:h-3.5 lg:w-3.5" strokeWidth={1.8} />
                </div>
                <h4 className="font-display text-xs font-bold uppercase tracking-wide text-[var(--color-primary)] lg:text-[0.78rem]">
                  {valor.title}
                </h4>
                <p className="mt-1 text-[11px] leading-relaxed text-[var(--foreground)]/70 lg:text-[0.7rem]">
                  {valor.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
