import { motion } from "framer-motion";

export const MenuButton = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  const lineVariants = {
    closed: { rotate: 0, y: 0 },
    open: (custom: number) => {
      if (custom === 1) return { rotate: 45, y: 6 };
      if (custom === 2) return { rotate: -45, y: -6 };
      return { opacity: 0 };
    }
  };

  return (
    <button 
      onClick={toggle} 
      className="p-2 text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 rounded-lg relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1"
      aria-label="Alternar Menu"
      aria-expanded={isOpen}
    >
      <motion.span 
        custom={1}
        variants={lineVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-6 h-0.5 bg-[var(--color-primary)] block origin-center"
      />
      <motion.span 
        custom={3}
        variants={lineVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className="w-6 h-0.5 bg-[var(--color-primary)] block origin-center"
      />
      <motion.span 
        custom={2}
        variants={lineVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-6 h-0.5 bg-[var(--color-primary)] block origin-center"
      />
    </button>
  );
};
