"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../../config/site";
import MobileDrawer from "./MobileDrawer";

import { Instagram, Facebook } from "../ui/SocialIcons";
import { MenuButton } from "./MenuButton";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const isScrollingRef = useRef(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Monitoramento de Seção Ativa (IntersectionObserver)
  useEffect(() => {
    const sectionIds = siteConfig.navigation
      .filter((item) => item.href.startsWith("#"))
      .map((item) => item.href.replace("#", ""));

    if (!sectionIds.includes("contato")) {
      sectionIds.push("contato");
    }

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        setActiveSection(visibleEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, []);

  // Controlar o overflow e classe menu-open no body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  // Fechar o menu móvel ao pressionar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Rolagem suave com desconto exato da altura do header
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");

      if (isOpen) {
        setIsOpen(false);
      }

      if (targetId === "inicio") {
        isScrollingRef.current = true;
        setActiveSection("inicio");
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", href);
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
        return;
      }

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        isScrollingRef.current = true;
        setActiveSection(targetId);

        const headerElement = document.querySelector("header");
        const headerHeight = headerElement ? headerElement.getBoundingClientRect().height : 61.6;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: "smooth",
        });
        window.history.pushState(null, "", href);

        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 isolate border-b border-[rgba(8,29,66,0.16)] shadow-[0_8px_24px_rgba(8,29,66,0.10)]" style={{ backgroundColor: "var(--header-bg)" }}>
        {/* Header Alabz Slim (Faixa estreita: h-[3.85rem]) */}
        <div
          className="relative flex h-[3.85rem] w-full items-center justify-between px-5 box-border"
          data-header-row
        >
          
          {/* Extremidade Esquerda: Logo (Altura limitada h-[3.3rem]) */}
          <div className="min-w-0 flex max-w-[calc(100vw-5.25rem)] min-[1365px]:w-[420px] min-[1365px]:shrink-0 items-center h-[2.95rem] min-[1365px]:h-[3.3rem] z-10" data-header-logo>
            <a href="#inicio" onClick={(e) => handleLinkClick(e, "#inicio")} className="flex min-w-0 items-center gap-2 h-full py-1 min-[1365px]:gap-2.5">
              <img src="/images/favicon-sem-fundo.webp" alt={siteConfig.name} className="h-full object-contain" />
              <div className="flex min-w-0 flex-col justify-center h-full">
                <span className="font-display font-extrabold text-[0.86rem] leading-tight text-[var(--color-primary)] line-clamp-1 min-[390px]:text-[0.92rem] min-[1365px]:text-[0.98rem] min-[1365px]:tracking-[-0.02em]">
                  {siteConfig.name}
                </span>
                {siteConfig.subtitle && (
                  <span className="font-utility text-[7.5px] text-[var(--color-accent)] font-semibold tracking-[0.055em] uppercase leading-none mt-0.5 line-clamp-1 min-[390px]:text-[8px] min-[1365px]:text-[7.8px] min-[1365px]:tracking-[0.04em]">
                    {siteConfig.subtitle}
                  </span>
                )}
              </div>
            </a>
          </div>

          {/* Centro: Navigation Desktop */}
          <nav className="ml-auto mr-5 hidden min-[1365px]:flex shrink-0 items-center justify-end gap-0.5 z-0 min-[1920px]:absolute min-[1920px]:left-1/2 min-[1920px]:top-1/2 min-[1920px]:mr-0 min-[1920px]:-translate-x-1/2 min-[1920px]:-translate-y-1/2 min-[1920px]:justify-center" data-header-nav>
            {siteConfig.navigation.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a 
                  key={item.label} 
                  href={item.href} 
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative whitespace-nowrap px-2 py-2 font-display text-[0.64rem] font-bold uppercase tracking-[0.025em] transition-colors duration-300 min-[1500px]:px-3.5 min-[1500px]:text-[0.72rem] min-[1500px]:tracking-[0.045em] ${
                    isActive ? "text-[var(--color-primary)]" : "text-[var(--color-primary)]/72 hover:text-[var(--color-accent)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="desktopActiveSection"
                      className="absolute inset-0 bg-[var(--color-secondary)] rounded-[2px] -z-10 shadow-[3px_3px_0_rgba(245,207,0,0.18)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Extremidade Direita: Apenas Ícones Sociais no Slim Header */}
          <div className="hidden min-[1365px]:flex shrink-0 items-center gap-5 z-10" data-header-actions>
            <div className="flex items-center gap-5">
              <a 
                href={siteConfig.socials?.facebook || "#"}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[var(--color-primary)]/80 hover:text-[var(--color-accent)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={siteConfig.socials?.instagram || "#"}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[var(--color-primary)]/80 hover:text-[var(--color-accent)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex min-[1365px]:hidden items-center z-10 h-full" data-header-mobile-action>
            <MenuButton isOpen={isOpen} toggle={toggleMenu} />
          </div>

        </div>
      </header>

      {/* Drawer Importado e Modularizado */}
      <MobileDrawer 
        isOpen={isOpen} 
        activeSection={activeSection} 
        handleLinkClick={handleLinkClick} 
      />
    </>
  );
}
