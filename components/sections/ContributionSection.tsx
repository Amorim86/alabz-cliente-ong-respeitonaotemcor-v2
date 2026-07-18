"use client";

import { Check, Copy, HeartHandshake } from "lucide-react";
import { useState } from "react";

const CONTRIBUTIONS = [
  {
    value: "R$ 10,00",
    label: "Contribuir com R$ 10,00",
    href: "https://pag.ae/7ZJHSynVu",
  },
  {
    value: "R$ 20,00",
    label: "Contribuir com R$ 20,00",
    href: "https://pag.ae/7ZJHSRqb7",
  },
  {
    value: "R$ 50,00",
    label: "Contribuir com R$ 50,00",
    href: "https://pag.ae/7ZJHTbE13",
  },
  {
    value: "R$ 100,00",
    label: "Contribuir com R$ 100,00",
    href: "https://pag.ae/7ZJHTY-m7",
  },
];

const PIX_KEY = "37.267.941/0001-04";

export default function ContributionSection() {
  const [copied, setCopied] = useState(false);

  async function copyPixKey() {
    await navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <section
      id="contribua"
      className="laptop-compact relative flex w-full overflow-hidden bg-[#F7F4EA] py-14 md:py-16 lg:min-h-[calc(100dvh-var(--header-height))] lg:items-center lg:py-8"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--color-primary)]/10" />
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-4 md:px-12 lg:grid-cols-12 lg:gap-14">
        <div className="relative order-2 mx-auto flex w-full max-w-md justify-center lg:order-1 lg:col-span-5">
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-secondary)]/30 blur-3xl" />
          <img
            src="/images/maocoração.png"
            alt="Mão segurando um coração"
            className="relative z-10 h-auto w-full max-w-[360px] object-contain drop-shadow-[0_24px_44px_rgba(0,31,63,0.18)] lg:max-w-[290px]"
          />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <p className="font-utility text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Contribua com a nossa rede
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold uppercase leading-[1.02] text-[var(--color-primary)] md:text-5xl lg:text-[clamp(2rem,3.4vw,3.2rem)]">
            Toda ajuda vira cuidado chegando mais longe.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--foreground)]/72 md:text-lg lg:text-[0.92rem]">
            Quando alguém contribui, uma porta continua aberta: para escutar,
            orientar, acolher e fortalecer quem precisa reconstruir caminhos com
            dignidade. Escolha um valor ou doe via PIX — o gesto pode ser simples,
            mas o impacto é profundamente humano.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-5">
            {CONTRIBUTIONS.map((item) => (
              <a
                key={item.value}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-[var(--color-primary)]/12 bg-white px-5 py-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:shadow-xl lg:px-4 lg:py-3"
              >
                <span className="flex min-w-0 flex-col">
                  <span className="font-display text-xl font-semibold text-[var(--color-primary)] transition-colors duration-300 group-hover:text-[var(--color-secondary)]">
                    {item.value}
                  </span>
                  <span className="mt-1 text-sm font-semibold text-[var(--foreground)]/68 transition-colors duration-300 group-hover:text-white/86">
                    {item.label}
                  </span>
                </span>
                <HeartHandshake className="h-6 w-6 shrink-0 text-[var(--color-accent)] transition-colors duration-300 group-hover:text-[var(--color-secondary)]" strokeWidth={1.8} />
              </a>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-[var(--color-primary)]/12 bg-[var(--color-primary)] p-5 text-white shadow-[0_22px_60px_rgba(0,31,63,0.16)] lg:p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-utility text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
                  Qualquer valor via PIX
                </p>
                <p className="mt-2 text-sm text-white/72">
                  Chave CNPJ: <span className="font-semibold text-white">{PIX_KEY}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={copyPixKey}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-secondary)] px-5 py-3 text-sm font-bold text-[var(--color-primary)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Chave copiada" : "Doar qualquer valor via PIX"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
