"use client";

import { ShoppingBag, HeartHandshake, RefreshCw } from "lucide-react";

const BENEFITS = [
  {
    icon: RefreshCw,
    title: "Doações de Peças Novas e Usadas",
    description:
      "Recebemos roupas novas e usadas provenientes de doações da comunidade e de parceiros.",
  },
  {
    icon: ShoppingBag,
    title: "Comercialização Acessível",
    description:
      "As peças passam por curadoria e são comercializadas no brechó comunitário a preços acessíveis.",
  },
  {
    icon: HeartHandshake,
    title: "Manutenção da Instituição",
    description:
      "A renda arrecadada contribui diretamente para o pagamento de despesas operacionais e a continuidade das atividades da ONG.",
  },
];

export default function BrechoSection() {
  return (
    <section
      id="brecho"
      className="laptop-compact relative flex w-full flex-col justify-center overflow-hidden bg-[#F7F4EA] py-10 md:py-14 lg:h-[calc(100dvh-var(--header-height))] lg:min-h-0 lg:py-4"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col px-4 md:px-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Text Content */}
          <div className="flex flex-col justify-center text-center lg:col-span-6 lg:text-left">
            <p className="font-utility text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-accent)] text-center lg:text-left">
              Sustentabilidade e Autonomia
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold uppercase leading-tight text-[var(--color-primary)] md:text-5xl lg:text-[clamp(1.8rem,2.7vw,2.9rem)] text-center lg:text-left">
              Brechó
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-[var(--foreground)]/78 sm:text-sm md:text-base lg:text-[0.86rem] text-center lg:text-left">
              O <strong>Brechó</strong> é uma importante frente de sustentabilidade da ONG Respeito Não Tem Cor. Tanto a compra quanto a doação de roupas e móveis são formas diretas de apoiar nossa causa e fortalecer a manutenção das nossas atividades sociais.
            </p>

            <div className="mt-4 space-y-2.5 lg:mt-4">
              {BENEFITS.map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-xl border border-[var(--color-primary)]/10 bg-white/70 p-3 shadow-sm lg:p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)] text-[var(--color-secondary)] lg:h-7 lg:w-7">
                    <item.icon className="h-4 w-4 lg:h-3.5 lg:w-3.5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-primary)] lg:text-[0.78rem]">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--foreground)]/70 lg:text-[0.7rem]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row lg:mt-4">
              <a
                href="https://wa.me/5541998824878?text=Ol%C3%A1%2C%20gostaria%20de%20doar%20itens%20para%20o%20Brech%C3%B3%20Solid%C3%A1rio."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary)]/90 lg:py-2.5"
              >
                👕 Quero Doar Roupas ou Móveis
              </a>
              <a
                href="#contato"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-primary)] bg-transparent px-6 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] transition-colors duration-300 hover:bg-[var(--color-primary)] hover:text-white lg:py-2.5"
              >
                📍 Como Chegar ao Brechó
              </a>
            </div>
          </div>

          {/* Visual Container with smooth blend */}
          <div className="relative h-[300px] overflow-hidden rounded-2xl border border-[var(--color-primary)]/15 shadow-2xl md:h-[380px] lg:col-span-6 lg:h-full lg:max-h-[380px] lg:min-h-[300px]">
            <img
              src="/images/brecho-roupas.webp"
              alt="Fachada da ONG e Brechó"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-black/40 p-4 text-white backdrop-blur-md lg:bottom-5 lg:left-5 lg:right-5">
              <p className="font-utility text-[9px] font-bold uppercase tracking-widest text-[var(--color-secondary)] lg:text-[10px]">
                Visite Nossa Sede
              </p>
              <p className="mt-0.5 text-xs font-medium leading-relaxed lg:text-sm">
                R. Alm. Alexandrino, 2032 — Afonso Pena, São José dos Pinhais — PR
              </p>
              <p className="mt-1 text-[11px] text-white/75 lg:text-xs">
                Aberto à comunidade. Venha garimpar e apoiar diretamente nossas ações sociais!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
