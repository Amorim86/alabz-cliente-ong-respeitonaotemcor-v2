"use client";

import { motion } from "framer-motion";
import { HeartPulse, ShieldCheck, BookOpenCheck, Recycle, ArrowRight } from "lucide-react";

const IMAGE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23001f3f'/%3E%3Cstop offset='.58' stop-color='%230b274b'/%3E%3Cstop offset='1' stop-color='%23f2bd22'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Cpath d='M120 450 C230 340 310 390 410 280 C505 178 606 210 704 126' fill='none' stroke='%23f2bd22' stroke-width='18' stroke-linecap='round' opacity='.72'/%3E%3Ccircle cx='204' cy='210' r='58' fill='%23f2bd22' opacity='.85'/%3E%3C/svg%3E";

const PROJETOS = [
  {
    category: "SAÚDE E ACOLHIMENTO",
    icon: HeartPulse,
    items: [
      "Atendimento psicológico e psicopedagógico",
      "Assistência social (entrega de alimentos, agasalhos)",
      "Assistência ao imigrante",
      "Assistência jurídica",
      "Nutricionista e grupos terapêuticos"
    ],
    image: "/images/orientacao-juridica.webp",
  },
  {
    category: "PROTEÇÃO SOCIAL",
    icon: ShieldCheck,
    items: [
      "Distribuição de cestas básicas",
      "Acolhimento e suporte familiar",
      "Apoio a mulheres vítimas de violência doméstica",
      "Atendimento emergencial e doações"
    ],
    image: "/images/protecao-social.webp",
  },
  {
    category: "EDUCAÇÃO E CULTURA",
    icon: BookOpenCheck,
    items: [
      "Acompanhamento infantil",
      "Roda Livros",
      "Aulas de canto",
      "Jiu-jitsu para crianças",
      "Português para imigrantes"
    ],
    image: "/images/educacao-roda-livro.webp",
  },
  {
    category: "SUSTENTABILIDADE",
    icon: Recycle,
    items: [
      "Brechó Solidário",
      "Varal Solidário",
      "Curadoria e reutilização consciente"
    ],
    image: "/images/sustentabilidade-brecho.webp",
  },
];

export default function ProjetosFrentesSection() {
  return (
    <section
      className="laptop-compact relative flex w-full flex-col justify-center overflow-hidden bg-[var(--color-primary)] py-14 md:py-20 lg:py-16 min-h-[calc(100dvh-var(--header-height))]"
      id="projetos"
    >
      {/* Elementos Decorativos de Fundo */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[var(--color-secondary)]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />

      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-4 md:px-12">
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center text-white md:mb-12 lg:mb-10"
        >
          <p className="font-utility text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-secondary)]">
            Ações e frentes comunitárias
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide md:text-5xl lg:text-4xl">
            Projetos e Frentes de Atuação
          </h2>
          <p className="mx-auto mt-2.5 max-w-2xl text-xs font-medium text-white/80 sm:text-sm md:text-base">
            Desenvolvemos iniciativas contínuas focadas na autonomia, proteção social e promoção da dignidade humana.
          </p>
        </motion.div>

        {/* Grade Responsiva dos 4 Cards de Projetos */}
        <div className="mb-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:mb-12 lg:grid-cols-4 lg:gap-6">
          {PROJETOS.map((projeto, index) => (
            <motion.div
              key={projeto.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl border-2 border-[var(--color-secondary)]/50 bg-[var(--color-secondary)] shadow-lg hover:shadow-2xl hover:border-white transition-all duration-300"
            >
              {/* Recipiente da Imagem - Expandido com Proporção Ampla */}
              <div className="relative h-48 w-full overflow-hidden border-b-4 border-[var(--color-primary)] bg-[var(--color-primary)] sm:h-52 md:h-56 lg:h-52">
                <img
                  src={projeto.image}
                  alt={projeto.category}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.src = IMAGE_FALLBACK;
                  }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/80 via-black/20 to-transparent" />
                
                {/* Badge com Ícone da Categoria */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-[var(--color-primary)]/90 px-3 py-1.5 backdrop-blur-md shadow-md border border-[var(--color-secondary)]/40">
                  <projeto.icon className="h-4 w-4 text-[var(--color-secondary)]" strokeWidth={2.2} />
                  <span className="font-utility text-[10px] font-bold uppercase tracking-wider text-[var(--color-secondary)]">
                    {projeto.category.split(" ")[0]}
                  </span>
                </div>
              </div>

              {/* Corpo do Card */}
              <div className="flex flex-grow flex-col justify-between bg-[var(--color-secondary)] p-5 md:p-6 lg:p-5">
                <div>
                  <h3 className="mb-3 border-b-2 border-[#081D42]/18 pb-2 font-display text-sm font-black uppercase tracking-wider text-[#081D42] md:text-base lg:text-[0.95rem]">
                    {projeto.category}
                  </h3>
                  <ul className="space-y-2.5 text-xs font-semibold leading-snug text-[#081D42]/90 md:text-sm lg:text-[0.78rem]">
                    {projeto.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTAs da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-4 sm:flex-row lg:gap-5"
        >
          <a
            href="https://wa.me/5541998824878?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20como%20posso%20apoiar%20um%20projeto%20da%20ONG."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 rounded-full bg-[var(--color-secondary)] px-8 py-3.5 text-center font-display text-xs font-extrabold uppercase tracking-wider text-[var(--color-primary)] shadow-lg transition-all duration-300 hover:bg-white hover:scale-105 lg:py-3"
          >
            <span>Quero apoiar um projeto</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="https://wa.me/5541998824878?text=Ol%C3%A1%2C%20preciso%20de%20atendimento%20ou%20orienta%C3%A7%C3%A3o%20social."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-center font-display text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-white hover:text-[var(--color-primary)] hover:scale-105 lg:py-3"
          >
            <span>Preciso de atendimento</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
