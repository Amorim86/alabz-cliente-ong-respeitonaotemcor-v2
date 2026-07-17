"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ_DATA = [
  {
    question: "Como funcionam as reservas e a política de cancelamento?",
    answer: "As reservas podem ser solicitadas e confirmadas diretamente pelo nosso WhatsApp de atendimento. Nossa política padrão permite cancelamento ou remarcação sem custo adicional em até 7 dias de antecedência.",
  },
  {
    question: "Quais vivências e serviços estão inclusos na experiência?",
    answer: "Nossos pacotes padrão incluem o acesso completo às áreas de lazer e contemplação, trilhas autoguiadas pela propriedade, além do suporte personalizado de nossa equipe local.",
  },
  {
    question: "O espaço é adequado para retiros corporativos ou eventos fechados?",
    answer: "Sim. Dispomos de infraestrutura dedicada com lounge reservado, conexão de alta velocidade e privacidade total para reuniões estratégicas de lideranças ou pequenos eventos intimistas.",
  },
  {
    question: "Quais são os diferenciais de infraestrutura oferecidos?",
    answer: "Trabalhamos com materiais de alto padrão, arquitetura integrada com a natureza local, áreas de descanso protegidas e uma curadoria cuidadosa de parceiros e serviços gastronômicos.",
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-viewport relative w-full overflow-hidden bg-zinc-50 py-16 md:py-24 flex items-center" id="faq">
      <div className="container-alabz">
        
        <div className="text-center mb-12 max-w-[800px] mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Dúvidas Frequentes
          </h2>
          <p className="text-base md:text-lg text-foreground/70">
            Tire suas dúvidas e entenda por que o nosso refúgio oferece a experiência ideal.
          </p>
        </div>

        <div className="max-w-[900px] mx-auto flex flex-col gap-4">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className="bg-white border border-zinc-200/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-sm hover:border-zinc-200"
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-3.5 text-left cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-base md:text-[17px] text-foreground/90 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 text-[#A67C52] ml-2"
                  >
                    <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-4 text-sm md:text-base text-foreground/70 leading-relaxed text-left">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
