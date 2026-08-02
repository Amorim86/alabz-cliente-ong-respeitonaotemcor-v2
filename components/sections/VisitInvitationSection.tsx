"use client";

import { HeartHandshake, MapPin } from "lucide-react";
import { siteConfig } from "../../config/site";
import { motion } from "framer-motion";

export default function VisitInvitationSection() {
  const volunteerUrl = `${siteConfig.contact.phoneUrl}?text=${encodeURIComponent(
    "Olá, cheguei pelo site da ONG e quero saber como posso conhecer o trabalho ou ser voluntário."
  )}`;

  return (
    <section className="visit-invitation section-natural relative -mt-[6vh] min-h-[76dvh] w-full overflow-hidden bg-[#F7F4EA] pt-[6vh] lg:h-[calc(100dvh-var(--header-height))] lg:min-h-0" id="visite">
      <img
        src="/images/footer.webp"
        alt="Pessoas forming um coração com as mãos"
        className="absolute inset-x-0 -top-1 h-[calc(100%+0.25rem)] w-full object-cover object-center"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.14) 5%, rgba(0,0,0,0.62) 14%, #000 27%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.14) 5%, rgba(0,0,0,0.62) 14%, #000 27%)",
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.12)_24%,rgba(0,0,0,0.56)_68%,#000000_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_42%,rgba(242,189,34,0.12),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.74)_0%,rgba(0,0,0,0.42)_36%,rgba(0,0,0,0.16)_68%,rgba(0,0,0,0.52)_100%)]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(0,0,0,0.22) 49%, #000 72%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(0,0,0,0.22) 49%, #000 72%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[70dvh] w-full max-w-[1400px] items-end px-4 pb-14 pt-24 md:px-12 md:pb-20 lg:h-full lg:min-h-0 lg:pb-10 lg:pt-[27vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl text-white"
        >
          <p className="font-utility text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
            Portas abertas para caminhar junto
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.02] [text-shadow:0_2px_18px_rgba(0,0,0,0.32)] md:text-5xl lg:text-[clamp(2.5rem,3.8vw,3.75rem)]">
            A mudança fica mais forte quando vira presença.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/84 [text-shadow:0_2px_16px_rgba(0,0,0,0.44)] md:text-lg lg:text-[0.95rem]">
            Conhecer a ONG de perto é entender que cada gesto conta: uma escuta,
            uma manhã de voluntariado, uma oficina, uma conversa que devolve
            coragem. Se essa causa também toca você, venha ver o trabalho
            acontecendo e descubra como somar com a nossa rede.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-5">
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-secondary)] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-[var(--color-primary)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <MapPin className="h-4 w-4" />
              Conhecer a ONG
            </a>
            <a
              href={volunteerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/42 bg-white/10 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[var(--color-primary)]"
            >
              <HeartHandshake className="h-4 w-4" />
              Quero ser voluntário
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
