"use client";

import { ShoppingBag, HeartHandshake, RefreshCw } from "lucide-react";

const BENEFITS = [
  {
    icon: RefreshCw,
    title: "Economia Circular",
    description:
      "Roupas, calçados e utensílios em ótimo estado ganham novo ciclo de uso com preços acessíveis para a comunidade.",
  },
  {
    icon: HeartHandshake,
    title: "Manutenção dos Projetos",
    description:
      "100% da arrecadação é revertida diretamente para manter nossas atividades de acolhimento, cursos e assistência.",
  },
  {
    icon: ShoppingBag,
    title: "Doações Continuadas",
    description:
      "Recebemos doações de roupas, calçados e itens para a casa. O que não vai ao brechó é doado no Varal Solidário.",
  },
];

export default function BrechoSection() {
  return (
    <section
      id="brecho"
      className="relative w-full scroll-mt-[4.5rem] overflow-hidden bg-[#F7F4EA] py-16 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col px-4 md:px-12">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-12">
          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="font-utility text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Sustentabilidade e Autonomia
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase leading-tight text-[var(--color-primary)] md:text-5xl">
              Brechó Solidário
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--foreground)]/78 md:text-lg">
              O <strong>Brechó Solidário da ONG Respeito Não Tem Cor</strong> é uma das nossas principais frentes de autossustentabilidade. Por meio da venda de itens doados a preços acessíveis, geramos recursos vitais para custear a manutenção da nossa sede, comprar insumos para oficinas e dar suporte emergencial a famílias atendidas.
            </p>

            <div className="mt-8 space-y-4">
              {BENEFITS.map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-white/70 border border-[var(--color-primary)]/10 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)] text-[var(--color-secondary)]">
                    <item.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--foreground)]/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/554198824878?text=Ol%C3%A1%2C%20gostaria%20de%20doar%20itens%20para%20o%20Brech%C3%B3%20Solid%C3%A1rio."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary)]/90 text-center"
              >
                👕 Quero Doar Roupas ou Móveis
              </a>
              <a
                href="#contato"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-primary)] bg-transparent px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] transition-colors duration-300 hover:bg-[var(--color-primary)] hover:text-white text-center"
              >
                📍 Como Chegar ao Brechó
              </a>
            </div>
          </div>

          {/* Visual Container with smooth blend */}
          <div className="lg:col-span-6 relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-primary)]/15">
            <img
              src="/images/faixada noite.webp"
              alt="Fachada da ONG e Brechó Solidário"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white">
              <p className="font-utility text-[10px] font-bold uppercase tracking-widest text-[var(--color-secondary)]">
                Visite Nossa Sede
              </p>
              <p className="mt-1 text-sm font-medium leading-relaxed">
                R. Alm. Alexandrino, 2032 — Afonso Pena, São José dos Pinhais — PR
              </p>
              <p className="mt-2 text-xs text-white/75">
                Aberto à comunidade. Venha garimpar e apoiar diretamente nossas ações sociais!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
