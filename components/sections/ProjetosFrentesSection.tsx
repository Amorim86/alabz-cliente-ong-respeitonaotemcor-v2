"use client";

import { motion } from "framer-motion";

const IMAGE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23001f3f'/%3E%3Cstop offset='.58' stop-color='%230b274b'/%3E%3Cstop offset='1' stop-color='%23f2bd22'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Cpath d='M120 450 C230 340 310 390 410 280 C505 178 606 210 704 126' fill='none' stroke='%23f2bd22' stroke-width='18' stroke-linecap='round' opacity='.72'/%3E%3Ccircle cx='204' cy='210' r='58' fill='%23f2bd22' opacity='.85'/%3E%3C/svg%3E";

const PROJETOS = [
  {
    category: "SAÚDE E ACOLHIMENTO",
    items: [
      "Atendimento psicológico",
      "Apoio a mulheres vítimas de violência doméstica"
    ],
    image: "/images/atendimento-psicologico.webp",
  },
  {
    category: "PROTEÇÃO SOCIAL",
    items: [
      "Distribuição de cestas básicas",
      "Assistência social",
      "Acolhimento e orientação para imigrantes",
      "Varal Solidário"
    ],
    image: "/images/doacao-cestas.webp",
  },
  {
    category: "EDUCAÇÃO E CULTURA",
    items: [
      "Acompanhamento infantil",
      "Roda Livros",
      "Aulas de canto",
      "Jiu-jitsu para crianças",
      "Português para imigrantes"
    ],
    image: "/images/educacao-livros.webp",
  },
  {
    category: "SUSTENTABILIDADE",
    items: [
      "Brechó"
    ],
    image: "/images/brecho-roupas.webp",
  },
];

export default function ProjetosFrentesSection() {
  return (
    <section
      className="laptop-compact relative flex w-full flex-col justify-center overflow-hidden bg-[var(--color-primary)] py-10 md:py-14 lg:h-[calc(100dvh-var(--header-height))] lg:min-h-0 lg:py-4"
      id="projetos"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-4 md:px-12">
        <div className="mb-6 text-center text-white lg:mb-3">
          <p className="font-utility text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            Ações e frentes comunitárias
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold uppercase tracking-wide md:text-5xl lg:text-[clamp(1.8rem,2.6vw,2.8rem)]">
            Projetos e Frentes de Atuação
          </h2>
          <p className="mx-auto mt-1.5 max-w-xl text-xs text-white/80 font-medium sm:text-sm lg:text-[0.82rem]">
            Desenvolvemos iniciativas contínuas focadas na autonomia, proteção social e promoção da dignidade.
          </p>
        </div>

        <div className="mb-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-4 lg:grid-cols-4 lg:gap-5">
          {PROJETOS.map((projeto, index) => (
            <motion.div
              key={projeto.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col overflow-hidden rounded-xl border border-[var(--color-secondary)] bg-[var(--color-secondary)] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden border-b-[3px] border-white bg-[var(--color-primary)] lg:h-28">
                <img
                  src={projeto.image}
                  alt={projeto.category}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.src = IMAGE_FALLBACK;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="flex flex-grow flex-col bg-[var(--color-secondary)] p-4 lg:p-3.5">
                <h3 className="mb-2 whitespace-nowrap border-b border-[#111111]/15 pb-1.5 text-xs font-extrabold uppercase tracking-wider text-[#111111] lg:text-[0.78rem]">
                  {projeto.category}
                </h3>
                <ul className="space-y-1.5 text-[11px] leading-relaxed text-[#111111]/85 lg:text-[0.72rem]">
                  {projeto.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="font-bold text-[var(--color-primary)]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:gap-4">
          <a
            href="https://wa.me/554198824878?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20como%20posso%20apoiar%20um%20projeto%20da%20ONG."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-[var(--color-secondary)] px-7 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] shadow-md transition-colors hover:bg-white lg:py-2.5"
          >
            Quero apoiar um projeto
          </a>
          <a
            href="https://wa.me/554198824878?text=Ol%C3%A1%2C%20preciso%20de%20atendimento%20ou%20orienta%C3%A7%C3%A3o%20social."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border-2 border-white px-7 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-[var(--color-primary)] lg:py-2.5"
          >
            Preciso de atendimento
          </a>
        </div>
      </div>
    </section>
  );
}
