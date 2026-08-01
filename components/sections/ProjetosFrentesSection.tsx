"use client";

import { motion } from "framer-motion";

const IMAGE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23001f3f'/%3E%3Cstop offset='.58' stop-color='%230b274b'/%3E%3Cstop offset='1' stop-color='%23f2bd22'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Cpath d='M120 450 C230 340 310 390 410 280 C505 178 606 210 704 126' fill='none' stroke='%23f2bd22' stroke-width='18' stroke-linecap='round' opacity='.72'/%3E%3Ccircle cx='204' cy='210' r='58' fill='%23f2bd22' opacity='.85'/%3E%3C/svg%3E";

const PROJETOS = [
  {
    category: "SAÚDE E ACOLHIMENTO",
    items: [
      "Atendimento psicológico gratuito",
      "Apoio a mulheres vítimas de violência",
      "Acolhimento humanizado e escuta ativa"
    ],
    image: "/images/microfone.webp",
  },
  {
    category: "PROTEÇÃO SOCIAL E INTEGRAÇÃO",
    items: [
      "Distribuição de cestas básicas",
      "Assistência social comunitária",
      "Acolhimento de imigrantes",
      "Varal Solidário (doações de roupas e móveis)"
    ],
    image: "/images/faixada dia.webp",
  },
  {
    category: "EDUCAÇÃO E CULTURA",
    items: [
      "Acompanhamento infantil",
      "Roda Livros & Incentivo à leitura",
      "Oficinas de Canto & Jiu-jitsu infantil",
      "Aulas de português para imigrantes"
    ],
    image: "/images/fundadora/fundadora2.webp",
  },
  {
    category: "SUSTENTABILIDADE",
    items: [
      "Brechó Solidário institucional",
      "Gestão de doações comunitárias",
      "Rede de apoiadores e parceiros"
    ],
    image: "/images/faixada noite.webp",
  },
];

export default function ProjetosFrentesSection() {
  return (
    <section className="laptop-compact relative flex w-full overflow-hidden bg-[var(--color-primary)] py-12 md:py-16 lg:min-h-[calc(100dvh-var(--header-height))] lg:items-center lg:py-8" id="projetos">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-4 md:px-12">
        <div className="mb-10 text-center text-white lg:mb-6">
          <p className="font-utility text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            Ações e frentes comunitárias
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl lg:text-[clamp(2rem,3vw,3.25rem)]">
            Projetos e Frentes de Atuação
          </h2>
          <p className="mt-3 text-base text-white/80 font-medium max-w-2xl mx-auto">
            Desenvolvemos iniciativas contínuas focadas na autonomia, proteção social e promoção da dignidade.
          </p>
        </div>

        <div className="mb-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:mb-7 lg:grid-cols-4 lg:gap-6">
          {PROJETOS.map((projeto, index) => (
            <motion.div
              key={projeto.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col bg-[var(--color-secondary)] overflow-hidden rounded-xl border border-[var(--color-secondary)] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden border-b-[3px] border-white bg-[var(--color-primary)]">
                <img
                  src={projeto.image}
                  alt={projeto.category}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.src = IMAGE_FALLBACK;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="flex flex-grow flex-col bg-[var(--color-secondary)] p-6">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#111111] border-b border-[#111111]/15 pb-2">
                  {projeto.category}
                </h3>
                <ul className="space-y-2 text-xs leading-relaxed text-[#111111]/85">
                  {projeto.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/554198824878?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20como%20posso%20apoiar%20um%20projeto%20da%20ONG."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--color-secondary)] text-[var(--color-primary)] px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors shadow-md text-center"
          >
            Quero apoiar um projeto
          </a>
          <a
            href="https://wa.me/554198824878?text=Ol%C3%A1%2C%20preciso%20de%20atendimento%20ou%20orienta%C3%A7%C3%A3o%20social."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-white text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-[var(--color-primary)] transition-colors text-center"
          >
            Preciso de atendimento
          </a>
        </div>
      </div>
    </section>
  );
}
