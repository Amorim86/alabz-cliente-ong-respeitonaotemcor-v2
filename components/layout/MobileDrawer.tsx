"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { Mail } from "lucide-react";
import { siteConfig } from "../../config/site";

// SVGs das Redes Sociais
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
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
          className="fixed inset-0 z-40 min-[1160px]:hidden backdrop-blur-2xl flex flex-col items-center pt-24 pb-12 px-5 overflow-y-auto"
          style={{ backgroundColor: "var(--header-mobile-bg)" }}
        >
          {/* Contêiner de animação em cascata */}
          <motion.div 
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center justify-between h-full w-full max-w-[320px]"
          >
            
            {/* Links de Navegação do Drawer */}
            <nav className="flex flex-col items-center text-center gap-5 w-full mt-8">
              {siteConfig.navigation.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.div 
                    key={item.label}
                    variants={menuItemVariants}
                    className="w-full relative py-1"
                  >
                    <a 
                      href={item.href} 
                      onClick={(e) => handleLinkClick(e, item.href)} 
                      className={`text-xl font-bold block transition-colors py-2 rounded-xl relative ${
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
            <motion.div variants={menuItemVariants} className="w-full flex justify-center mt-6">
              <a
                href="#contato"
                onClick={(e) => handleLinkClick(e, "#contato")}
                className="w-full max-w-[280px] bg-brand-primary text-white text-center px-6 py-4 rounded-full text-base font-bold hover:bg-brand-primary/90 transition-colors shadow-lg"
              >
                Falar Conosco
              </a>
            </motion.div>

            {/* Redes Sociais no rodapé do Drawer com ícones e rótulos legíveis */}
            <motion.div 
              variants={menuItemVariants} 
              className="w-full border-t border-white/10 mt-auto pt-6 flex justify-around items-center"
            >
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Facebook</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Instagram</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-[10px] uppercase font-bold tracking-wider">LinkedIn</span>
              </a>
              <a 
                href={`mailto:${siteConfig.contact.email}`}
                className="flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="text-[10px] uppercase font-bold tracking-wider">E-mail</span>
              </a>
            </motion.div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
