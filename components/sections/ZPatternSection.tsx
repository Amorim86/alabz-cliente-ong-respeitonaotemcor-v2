"use client";

import { motion } from "framer-motion";

/**
 * ZPatternSection — Dois blocos imagem+texto em Z.
 *
 * Solução de Engenharia Sênior para o bug de renderização de imagem:
 * - Define a imagem com posicionamento absoluto e objectFit inline.
 * - Garante que a imagem preencha 100% do container vertical (100dvh no desktop),
 *   eliminando o fundo vazio que afastava as seções.
 */
export default function ZPatternSection() {
  return (
    <section id="sobre" className="relative w-full overflow-hidden bg-[#FDFBF7] py-0 my-0 pt-0 mt-0">

      {/* ── Bloco A: Imagem Esquerda · Texto Direita ─────────────────────────── */}
      <div className="section-viewport w-full flex flex-col lg:flex-row py-0 my-0 overflow-hidden">

        {/* Imagem Esquerda */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative w-full lg:w-1/2 h-[50dvh] lg:h-auto lg:self-stretch overflow-hidden bg-[#FDFBF7] shrink-0"
        >
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1920"
            alt="Espaço integrado com a natureza"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            loading="lazy"
            decoding="async"
          />
          {/* Fusão → direita (desktop) */}
          <div className="absolute inset-y-0 right-0 w-[45%] hidden lg:block pointer-events-none z-10 bg-gradient-to-r from-transparent to-[#FDFBF7]" />
          {/* Fusão → baixo (mobile) */}
          <div className="absolute inset-x-0 bottom-0 h-[120px] lg:hidden pointer-events-none z-10 bg-gradient-to-b from-transparent to-[#FDFBF7]" />
        </motion.div>

        {/* Conteúdo Textual Direita */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-20 xl:px-28 py-12 lg:py-0 bg-[#FDFBF7] relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-[540px]"
          >
            <span className="inline-block bg-[var(--color-accent)]/15 text-[var(--color-accent)] px-3.5 py-1.5 rounded-md text-xs font-bold tracking-wider uppercase mb-5">
              Estrutura Única
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Um espaço pensado para o seu respiro
            </h2>
            <p className="text-base text-foreground/75 leading-relaxed mb-8 text-justify">
              Cada ambiente foi projetado para se integrar harmoniosamente com a paisagem natural ao redor. A proposta é tornar a sua estadia ou evento uma vivência tranquila, segura e extremamente acolhedora, do primeiro instante até a sua despedida.
            </p>

            {/* Lista com ícone de losango dourado */}
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3 text-sm text-foreground/80">
                <svg className="w-2.5 h-2.5 text-[var(--color-accent)] mt-1.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 12l10 10 10-10L12 2z" />
                </svg>
                <span>Atendimento exclusivo e focado no seu conforto</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground/80">
                <svg className="w-2.5 h-2.5 text-[var(--color-accent)] mt-1.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 12l10 10 10-10L12 2z" />
                </svg>
                <span>Privacidade total em meio a áreas verdes preservadas</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground/80">
                <svg className="w-2.5 h-2.5 text-[var(--color-accent)] mt-1.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 12l10 10 10-10L12 2z" />
                </svg>
                <span>Arquitetura sofisticada com materiais naturais</span>
              </li>
            </ul>

            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[var(--color-accent)] text-[var(--color-accent)] px-8 py-3.5 rounded-full hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 font-bold text-sm tracking-wide"
            >
              Fazer Reserva pelo WhatsApp
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Bloco B: Imagem Direita · Texto Esquerda ─────────────────────────── */}
      <div className="section-viewport w-full flex flex-col lg:flex-row-reverse py-0 my-0 overflow-hidden">

        {/* Imagem Direita */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative w-full lg:w-1/2 h-[50dvh] lg:h-auto lg:self-stretch overflow-hidden bg-[#FDFBF7] shrink-0"
        >
          <img
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1920"
            alt="Interior refinado e aconchegante"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            loading="lazy"
            decoding="async"
          />
          {/* Fusão → esquerda (desktop) */}
          <div className="absolute inset-y-0 left-0 w-[45%] hidden lg:block pointer-events-none z-10 bg-gradient-to-l from-transparent to-[#FDFBF7]" />
          {/* Fusão → baixo (mobile) */}
          <div className="absolute inset-x-0 bottom-0 h-[120px] lg:hidden pointer-events-none z-10 bg-gradient-to-b from-transparent to-[#FDFBF7]" />
        </motion.div>

        {/* Conteúdo Textual Esquerda */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-20 xl:px-28 py-14 lg:py-0 bg-[#FDFBF7] relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-[540px] lg:ml-auto"
          >
            <span className="inline-block bg-[var(--color-accent)]/15 text-[var(--color-accent)] px-3.5 py-1.5 rounded-md text-xs font-bold tracking-wider uppercase mb-5">
              Cuidado em Detalhes
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Sofisticação integrada com a natureza
            </h2>
            <p className="text-base text-foreground/75 leading-relaxed mb-8 text-justify">
              Cada detalhe do nosso atendimento e infraestrutura é avaliado individualmente. Nosso objetivo é oferecer uma experiência clara, profissional e calorosa, garantindo que sua mente e seu corpo encontrem o refúgio ideal.
            </p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white px-9 py-4 rounded-full transition-all duration-300 font-bold text-sm tracking-wide shadow-md hover:shadow-lg"
            >
              Falar com Consultor
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
