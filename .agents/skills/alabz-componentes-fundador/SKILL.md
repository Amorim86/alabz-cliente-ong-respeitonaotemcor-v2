---
name: alabz-componentes-fundador
description: Constrói uma sessão "Sobre o Fundador" premium com parallax, timeline e avatar mobile. Requer entrevista (grill-me) para validação de assets.
---

# Premium About Section (Founder)

Sempre que acionado para construir a sessão sobre a empresa/fundador(a) com este padrão estético, você DEVE seguir o fluxo abaixo:

1. **GRILL-ME (Entrevista Obrigatória)**
   Não escreva código ainda. Pergunte ao usuário e confirme:
   - "Qual a imagem de fundo que usaremos? (Se não houver, posso gerar via IA)"
   - "Qual a foto em alta resolução recortada (sem fundo) do(a) fundador(a) que usaremos no parallax?"
   - "Quais são os marcos históricos para a timeline (ano, título, descrição)?"
   - "Qual é o nome exato e cargo para a assinatura?"

2. **Geração do Componente Portável (TSX Único)**
   - Crie o arquivo encapsulado (ex: `AboutSection.tsx`).
   - Implemente o parallax via `framer-motion` apenas no Desktop (desativado no mobile via detecção de largura de janela).
   - O mobile deve focar na legibilidade: o texto deve possuir forte contraste com o fundo (ou usar um glassmorphism block), e a imagem do fundador deve aparecer como um Avatar circular elegante (w-24 h-24) próximo à assinatura, não como recorte flutuante.
   - Aplique o efeito de cascata (staggerChildren) na timeline.
   - Certifique-se de usar Tailwind, Lucide React e Framer Motion.

## Referência do TSX de Engenharia
Quando gerar a sessão, baseie a arquitetura estrutural (estado, motion, layout parallax) no modelo abaixo, adaptando as cores e textos.

<details>
<summary>Exemplo de Estrutura TSX Premium</summary>

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Flag, Award, Users, ShieldCheck } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const claudiaImages = ["/claudiax1.png", "/claudiax2.png"];
  const [isMobile, setIsMobile] = useState(false);

  const smoothOptions = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, smoothOptions);
  const smoothY = useSpring(mouseY, smoothOptions);

  const bgX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const bgY = useTransform(smoothY, [-1, 1], [-30, 30]);
  const fgX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const fgY = useTransform(smoothY, [-1, 1], [-12, 12]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % claudiaImages.length);
    }, 4000);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, [mouseX, mouseY, claudiaImages.length]);

  return (
    <section ref={sectionRef} className="relative flex min-h-dvh w-full overflow-hidden bg-white">
      {/* ... Implementação do JSX Parallax, Timeline com stagger e Avatar mobile ... */}
    </section>
  );
}
```
</details>
