"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HERO_IMAGES = [
  "/images/hero4.svg",
  "/images/hero 2.svg",
  "/images/hero 3.svg",
];

const MOBILE_HERO_IMAGES = [
  "/images/heromob1.svg",
  "/images/heromob2.svg",
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mobileImageIndex = currentImageIndex % MOBILE_HERO_IMAGES.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="inicio"
      className="section-viewport relative flex w-full flex-col overflow-hidden bg-background animate-fade-in"
    >
      <div className="relative h-[100svh] w-full overflow-hidden bg-background lg:hidden">
        {MOBILE_HERO_IMAGES.map((src, index) => (
          <motion.img
            key={src}
            src={src}
            alt={`ONG Respeito Não Tem Cor mobile ${index + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: mobileImageIndex === index ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0 h-full w-full object-cover object-top"
          />
        ))}
      </div>

      <div className="relative hidden h-[100dvh] w-full overflow-hidden bg-[var(--color-primary)] lg:block">
        {HERO_IMAGES.map((src, index) => (
          <motion.img
            key={src}
            src={src}
            alt={`ONG Respeito Não Tem Cor ${index + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0 h-full w-full object-contain object-center 2xl:object-cover"
          />
        ))}
      </div>

      {/* Floating Action Pathways / CTAs */}
      <div className="absolute bottom-6 left-1/2 z-20 flex w-full -translate-x-1/2 flex-col items-center justify-center gap-3 px-4 sm:flex-row md:bottom-10 md:gap-5">
        <a
          href="https://wa.me/5541998824878?text=Ol%C3%A1%2C%20preciso%20de%20atendimento%20e%20orienta%C3%A7%C3%A3o%20da%20ONG."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-secondary)] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:text-sm"
        >
          🤝 Preciso de atendimento
        </a>
        <a
          href="#contribua"
          className="inline-flex items-center justify-center rounded-full border-2 border-white bg-black/40 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[var(--color-primary)] hover:shadow-xl md:text-sm"
        >
          💛 Quero apoiar um projeto
        </a>
      </div>
    </section>
  );
}
