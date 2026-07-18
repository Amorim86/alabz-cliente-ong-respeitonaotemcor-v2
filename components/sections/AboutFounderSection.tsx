"use client";

import { useEffect, useRef, useState } from "react";
import { Flag, Heart, Users } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const FOUNDER_IMAGES = [
  "/images/fundadora/fundadora1.png",
  "/images/fundadora/fundadora2.webp",
  "/images/fundadora/fundadora3.webp",
];

const HIGHLIGHTS = [
  {
    icon: Heart,
    title: "Acolhimento e superação",
    text: "Uma trajetória pessoal marcada pela resiliência e pela vontade de garantir que outras mulheres não caminhem sozinhas.",
  },
  {
    icon: Users,
    title: "Grupo As Blacks",
    text: "Criação do coletivo para promover empoderamento, formação e suporte mútuo para a comunidade negra.",
  },
  {
    icon: Flag,
    title: "Marcha do Orgulho Negro",
    text: "Idealização do movimento que celebra a identidade, a luta pela igualdade e a mobilização social.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.38, ease: "easeOut" as const },
};

export default function AboutFounderSection() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const smoothX = useSpring(pointerX, { damping: 22, stiffness: 110, mass: 0.55 });
  const smoothY = useSpring(pointerY, { damping: 22, stiffness: 110, mass: 0.55 });

  const backgroundX = useTransform(smoothX, [-1, 1], [-26, 26]);
  const backgroundY = useTransform(smoothY, [-1, 1], [-16, 16]);
  const portraitX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const portraitY = useTransform(smoothY, [-1, 1], [-6, 6]);

  useEffect(() => {
    const checkViewport = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      setIsDesktop(desktop);
      if (!desktop) {
        pointerX.set(0);
        pointerY.set(0);
      }
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);

    const timer = window.setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % FOUNDER_IMAGES.length);
    }, 4000);

    return () => {
      window.removeEventListener("resize", checkViewport);
      window.clearInterval(timer);
    };
  }, [pointerX, pointerY]);

  const resetParallax = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const moveParallax = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;

    const bounds = sceneRef.current?.getBoundingClientRect();
    if (!bounds) return;

    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };

  const activeImage = FOUNDER_IMAGES[currentImgIndex];

  return (
    <section
      id="fundadora"
      className="laptop-compact relative w-full scroll-mt-[4.5rem] overflow-hidden bg-[#FDFBF7] py-12 md:py-16 lg:flex lg:min-h-[calc(100dvh-var(--header-height))] lg:items-center lg:py-0"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ x: backgroundX, y: backgroundY, scale: 1.06 }}
      >
        <img
          src="/images/founder_bg.webp"
          alt=""
          className="h-full w-full object-cover opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_32%,rgba(245,207,0,0.16),transparent_26%),linear-gradient(90deg,#FDFBF7_0%,rgba(253,251,247,0.94)_43%,rgba(253,251,247,0.62)_70%,rgba(253,251,247,0.18)_100%)]" />
      </motion.div>

      <div className="founder-grid relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-4 md:px-12 lg:min-h-[calc(100dvh-var(--header-height))] lg:grid-cols-12 lg:gap-8">
        <motion.div {...reveal} className="lg:col-span-7 lg:pr-8">
          <p className="mb-3 font-utility text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Sobre a fundadora
          </p>
          <h2 className="font-display text-4xl font-bold leading-[0.98] text-[var(--color-primary)] md:text-5xl lg:text-[clamp(2.5rem,4.1vw,4.8rem)]">
            Negra Dirce
          </h2>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-[var(--foreground)]/78 md:text-lg lg:text-[0.96rem]">
            Mulher negra, mãe e ativista, Negra Dirce transformou sua própria história de superação em um legado de acolhimento e emancipação para milhares de pessoas em São José dos Pinhais.
          </p>

          <blockquote className="mt-5 max-w-[58ch] border-l-2 border-[var(--color-secondary)] pl-4 font-display text-xl font-medium leading-tight text-[var(--color-primary)] lg:text-[1.3rem]">
            A delicadeza aqui não diminui a luta: ela mostra que cuidado também é força.
          </blockquote>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:mt-5">
            {HIGHLIGHTS.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.32, ease: "easeOut", delay: index * 0.05 }}
                className="flex min-w-0 items-start gap-3 sm:block"
              >
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-secondary)] sm:mb-2 sm:mt-0" strokeWidth={1.8} />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[var(--color-primary)]">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--foreground)]/70">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 border-t border-[var(--color-primary)]/12 pt-5 text-center">
            <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-full border-2 border-[var(--color-secondary)] bg-[var(--color-primary)] shadow-[0_10px_24px_rgba(8,29,66,0.12)] lg:hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt="Rosto de Negra Dirce"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: "50% 12%" }}
                />
              </AnimatePresence>
            </div>
            <div className="flex min-w-0 flex-col items-center">
              <img
                src="/images/assinatura-dirce.png"
                alt="Assinatura de Dirce Almeida dos Santos"
                className="h-auto w-[317px] max-w-full object-contain"
              />
              <p className="mt-1 font-utility text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]/68">
                Fundadora — Respeito não tem cor
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.42, ease: "easeOut", delay: 0.08 }}
          ref={sceneRef}
          onMouseMove={moveParallax}
          onMouseLeave={resetParallax}
          className="founder-scene relative hidden overflow-visible lg:col-span-5 lg:block lg:min-h-[calc(100dvh-var(--header-height))] lg:self-stretch"
        >
          <motion.div
            className="absolute inset-x-0 bottom-0 mx-auto flex h-full max-h-[calc(100dvh-var(--header-height))] w-full items-end justify-center"
            style={{ x: portraitX, y: portraitY }}
          >
            <div className="relative h-full w-full max-w-[500px]">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt="Negra Dirce, fundadora da ONG Respeito Não Tem Cor"
                  initial={{ opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="founder-portrait absolute inset-0 h-full w-full object-contain object-bottom"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
