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
    </section>
  );
}
