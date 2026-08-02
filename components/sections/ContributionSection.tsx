"use client";

import { Check, Copy, HeartHandshake } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

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
      className="laptop-compact relative flex w-full overflow-hidden bg-[#F7F4EA] py-8 md:py-16 lg:min-h-[calc(100dvh-var(--header-height))] lg:items-center lg:py-8"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--color-primary)]/10" />
      <img
        src="/images/maocoração.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-18vw] top-8 z-0 h-auto w-[82vw] max-w-[360px] object-contain opacity-[0.14] lg:hidden"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-0 px-4 md:px-12 lg:grid-cols-12 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative order-2 mx-auto hidden w-full max-w-md justify-center lg:order-1 lg:col-span-5 lg:flex"
        >
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-secondary)]/30 blur-3xl" />
          <img
            src="/images/maocoração.webp"
            alt="Mão segurando um coração"
            className="relative z-10 h-auto w-full max-w-[360px] object-contain drop-shadow-[0_24px_44px_rgba(0,31,63,0.18)] lg:max-w-[290px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
          className="order-1 lg:order-2 lg:col-span-7"
        >
          <p className="font-utility text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Contribua com a nossa rede
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-3xl font-bold uppercase leading-[1.02] text-[var(--color-primary)] md:text-5xl lg:mt-3 lg:text-[clamp(2rem,3.4vw,3.2rem)]">
            Toda ajuda vira cuidado chegando mais longe.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--foreground)]/72 md:text-lg lg:mt-4 lg:text-[0.92rem]">
            Quando alguém contribui, uma porta continua aberta: para escutar,
            orientar, acolher e fortalecer quem precisa reconstruir caminhos com
            dignidade. Escolha um valor ou doe via PIX — o gesto pode ser simples,
            mas o impacto é profundamente humano.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-2 lg:mt-5 lg:gap-3">
            {CONTRIBUTIONS.map((item) => (
              <a
                key={item.value}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center justify-between gap-2 rounded-xl border border-[var(--color-primary)]/12 bg-white/92 px-3 py-3 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:shadow-xl lg:gap-4 lg:rounded-2xl lg:bg-white lg:px-4 lg:py-3"
              >
                <span className="flex min-w-0 flex-col">
                  <span className="font-display text-lg font-semibold text-[var(--color-primary)] transition-colors duration-300 group-hover:text-[var(--color-secondary)] lg:text-xl">
                    {item.value}
                  </span>
                  <span className="mt-0.5 text-[11px] font-semibold leading-tight text-[var(--foreground)]/68 transition-colors duration-300 group-hover:text-white/86 lg:mt-1 lg:text-sm">
                    {item.label}
                  </span>
                </span>
                <HeartHandshake className="h-5 w-5 shrink-0 text-[var(--color-accent)] transition-colors duration-300 group-hover:text-[var(--color-secondary)] lg:h-6 lg:w-6" strokeWidth={1.8} />
              </a>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-[var(--color-primary)]/12 bg-[var(--color-primary)] p-4 text-white shadow-[0_22px_60px_rgba(0,31,63,0.16)] lg:mt-4 lg:rounded-2xl lg:p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between lg:gap-4">
              <div>
                <p className="font-utility text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
                  Qualquer valor via PIX
                </p>
                <p className="mt-1 text-xs text-white/72 lg:mt-2 lg:text-sm">
                  Chave CNPJ: <span className="font-semibold text-white">{PIX_KEY}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={copyPixKey}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-secondary)] px-4 py-2.5 text-xs font-bold text-[var(--color-primary)] transition-transform duration-300 hover:-translate-y-0.5 lg:px-5 lg:py-3 lg:text-sm"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Chave copiada" : "Doar qualquer valor via PIX"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
