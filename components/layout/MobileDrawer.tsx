"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { siteConfig } from "../../config/site";

// SVGs das Redes Sociais
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

interface MobileDrawerProps {
  isOpen: boolean;
  activeSection: string;
  handleLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export default function MobileDrawer({ isOpen, activeSection, handleLinkClick }: MobileDrawerProps) {
  const mobileNavigation = siteConfig.navigation;
  const socialLinks = [
    siteConfig.socials?.facebook
      ? { label: "Facebook", href: siteConfig.socials.facebook, Icon: Facebook }
      : null,
    siteConfig.socials?.instagram
      ? { label: "Instagram", href: siteConfig.socials.instagram, Icon: Instagram }
      : null,
  ].filter(Boolean) as Array<{
    label: string;
    href: string;
    Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  }>;

  // Variantes de animação para os itens do Menu Mobile (Efeito Stagger/Cascata)
  const menuContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const menuItemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      transition: { duration: 0.2 } 
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 min-[1365px]:hidden backdrop-blur-2xl flex flex-col items-center overflow-y-auto px-5 pb-6 pt-20"
          style={{ backgroundColor: "var(--header-mobile-bg)" }}
        >
          {/* Contêiner de animação em cascata */}
          <motion.div 
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex min-h-full w-full max-w-[320px] flex-col items-center justify-start"
          >
            
            {/* Links de Navegação do Drawer */}
            <nav className="mt-2 flex w-full flex-col items-center gap-2 text-center">
              {mobileNavigation.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.div 
                    key={item.label}
                    variants={menuItemVariants}
                    className="relative w-full"
                  >
                    <a 
                      href={item.href} 
                      onClick={(e) => handleLinkClick(e, item.href)} 
                      className={`relative block rounded-xl py-1.5 text-lg font-bold transition-colors ${
                        isActive ? "text-brand-accent font-extrabold" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.div>
                );
              })}
            </nav>

            {/* Botão CTA Centralizado */}
            <motion.div variants={menuItemVariants} className="mt-4 flex w-full justify-center">
              <a
                href="#contato"
                onClick={(e) => handleLinkClick(e, "#contato")}
                className="w-full max-w-[280px] bg-[var(--color-secondary)] text-[var(--color-primary)] text-center px-6 py-4 rounded-[2px] font-display text-base font-extrabold uppercase tracking-wide hover:bg-white transition-colors shadow-lg"
              >
                Fale Conosco
              </a>
            </motion.div>

            {/* Redes Sociais no rodapé do Drawer com ícones e rótulos legíveis */}
            {socialLinks.length > 0 && (
              <motion.div
                variants={menuItemVariants}
                className="mt-auto flex w-full items-center justify-center gap-8 border-t border-white/10 pt-4"
              >
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 text-white/60 transition-colors hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                  </a>
                ))}
              </motion.div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
