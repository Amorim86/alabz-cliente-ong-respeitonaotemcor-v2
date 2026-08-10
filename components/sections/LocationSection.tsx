"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HOURS = [
  { label: "Segunda a sexta", value: "08h — 18h" },
  { label: "Sábado", value: "Atendimento sob orientação" },
  { label: "Domingos/Feriados", value: "Fechado" },
];

export default function LocationSection() {
  const [showNight, setShowNight] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNight((prev) => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="location-section section-natural relative w-full overflow-visible bg-[#F7F4EA] py-12 md:py-16 lg:h-[calc(100dvh-var(--header-height))] lg:min-h-0 lg:py-8"
      id="contato"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(242,189,34,0.22),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.52),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[18vh] bg-[linear-gradient(to_bottom,transparent_0%,rgba(247,244,234,0.82)_65%,#F7F4EA_100%)]" />

      <div className="location-section__grid relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-stretch gap-8 px-4 md:px-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.78fr)] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="location-section__copy flex flex-col justify-between"
        >
          <p className="font-utility text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
            Venha conhecer nossa casa
          </p>

          <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.07em] text-[var(--color-primary)]">
            Rua Almirante Alexandrino, 2032
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--foreground)]/78 md:text-[1.02rem] lg:text-[0.92rem]">
            Afonso Pena, São José dos Pinhais — PR. Um espaço de escuta,
            orientação e acolhimento comunitário para quem precisa chegar,
            conversar e encontrar uma rede.
          </p>

          <dl className="mt-5 w-full max-w-3xl text-sm md:text-[0.96rem] lg:mt-4 lg:text-[0.84rem]">
            {HOURS.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 border-b border-[var(--color-primary)]/14 py-3 lg:py-2"
              >
                <dt className="font-semibold text-[var(--foreground)]/72">
                  {item.label}
                </dt>
                <dd className="text-right font-extrabold text-[var(--color-primary)]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-4">
            <a
              href="https://maps.google.com/?q=Rua+Almirante+Alexandrino,+2032+-+Afonso+Pena,+Sao+Jose+dos+Pinhais+-+PR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition-transform duration-300 hover:-translate-y-0.5 lg:py-3 lg:text-xs"
            >
              Ver rota no mapa
            </a>
            <a
              href="#visite"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-primary)]/18 bg-white/70 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-[var(--color-primary)] transition-transform duration-300 hover:-translate-y-0.5 lg:py-3 lg:text-xs"
            >
              Quero conhecer o trabalho
            </a>
          </div>
        </motion.div>

        <div className="location-section__media overflow-hidden rounded-[1.35rem] border border-[var(--color-primary)]/12 bg-white shadow-[0_30px_90px_rgba(0,31,63,0.14)]">
          <div className="relative h-[260px] overflow-hidden border-b border-[var(--color-primary)]/10 md:h-[300px] lg:h-1/2">
            <img
              src="/images/faixada dia.webp"
              alt="Faixada de dia da ONG Respeito Não Tem Cor"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center top" }}
              loading="lazy"
              decoding="async"
            />
            <motion.img
              src="/images/faixada noite.webp"
              alt="Faixada de noite da ONG Respeito Não Tem Cor"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center top" }}
              animate={{ opacity: showNight ? 1 : 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="relative h-[190px] overflow-hidden bg-zinc-950 md:h-[210px] lg:h-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117565.61864115865!2d-46.730303882772596!3d-23.593678036280452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a2b2ed7f3a1%3A0xab35da2f56f44c3c!2sS%C3%A3o%20Paulo%2C%20State%20of%20S%C3%A3o%20Paulo!5e0!3m2!1sen!2sbr!4v1718912345678!5m2!1sen!2sbr"
              className="h-full w-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ filter: "grayscale(1) invert(0.9) contrast(0.86) brightness(0.78) sepia(0.08)" }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.04), inset 0 22px 48px rgba(0, 0, 0, 0.3)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
