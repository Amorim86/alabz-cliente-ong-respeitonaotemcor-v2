"use client";

import { motion } from "framer-motion";

const IMAGE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23001f3f'/%3E%3Cstop offset='.58' stop-color='%230b274b'/%3E%3Cstop offset='1' stop-color='%23f2bd22'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Cpath d='M120 450 C230 340 310 390 410 280 C505 178 606 210 704 126' fill='none' stroke='%23f2bd22' stroke-width='18' stroke-linecap='round' opacity='.72'/%3E%3Ccircle cx='204' cy='210' r='58' fill='%23f2bd22' opacity='.85'/%3E%3C/svg%3E";

const PROJETOS = [
  {
    title: "ACOLHER PARA VIVER",
    description: "Acolhimento psicológico e social para mulheres vítimas de violência e suas famílias.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "JUVENTUDE QUE TRANSFORMA",
    description: "Formação, cultura e protagonismo para jovens negros e negras da nossa comunidade.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "GERAÇÃO DE RENDA",
    description: "Cursos profissionalizantes, apoio ao empreendedorismo e economia solidária.",
    image: IMAGE_FALLBACK,
  },
  {
    title: "CULTURA E IDENTIDADE",
    description: "Valorização da ancestralidade, arte, memória e resistência do povo negro.",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "TERRITÓRIO VIVO",
    description: "Ações socioambientais e cuidado coletivo com o território onde vivemos.",
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?auto=format&fit=crop&q=80&w=400",
  },
];

export default function ProjetosFrentesSection() {
  return (
    <section className="laptop-compact relative flex w-full overflow-hidden bg-[var(--color-primary)] py-12 md:py-16 lg:min-h-[calc(100dvh-var(--header-height))] lg:items-center lg:py-8" id="projetos">
      <div className="container-alabz relative z-10 flex w-full flex-col items-center">
        <div className="mb-10 text-center text-white lg:mb-6">
          <h2 className="mb-3 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl lg:text-[clamp(2rem,3vw,3.25rem)]">
            Projetos e Frentes de Atuação
          </h2>
          <p className="text-base text-white/80 font-medium max-w-2xl mx-auto">
            Atuamos em diferentes frentes para transformar vidas e fortalecer nossa comunidade.
          </p>
        </div>

        <div className="mb-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:mb-7 lg:grid-cols-5 lg:gap-4">
          {PROJETOS.map((projeto, index) => (
            <motion.div
              key={projeto.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col bg-[var(--color-secondary)] overflow-hidden border border-[var(--color-secondary)] hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="relative w-full aspect-square overflow-hidden border-b-[3px] border-white bg-[var(--color-primary)] sm:aspect-[4/3] lg:aspect-[5/3]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-primary),#0b274b_55%,var(--color-secondary))]" />
                <img
                  src={projeto.image}
                  alt={projeto.title}
                  className="relative z-10 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.src = IMAGE_FALLBACK;
                  }}
                />
              </div>

              <div className="flex flex-grow flex-col bg-[var(--color-secondary)] p-5 lg:p-3.5">
                <h3 className="mb-2 text-[0.85rem] font-bold uppercase tracking-wide text-[#111111] lg:text-[0.72rem]">
                  {projeto.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#111111]/85 lg:text-[0.68rem]">
                  {projeto.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <a
            href="#contato"
            className="inline-block border border-white text-white px-8 py-3.5 font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-[var(--color-primary)] transition-colors"
          >
            Conheça Todos os Projetos
          </a>
        </div>
      </div>
    </section>
  );
}
