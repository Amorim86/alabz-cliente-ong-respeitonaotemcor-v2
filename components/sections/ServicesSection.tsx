"use client";

import { motion } from "framer-motion";

const SERVICES_DATA = [
  {
    name: "Lounge & Spa",
    description: "Vivências completas de relaxamento com massagens corporais e rituais de bem-estar.",
    price: "R$ 280,00",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    featured: false
  },
  {
    name: "Chalés de Charme",
    description: "Estadia premium em cabanas exclusivas integradas à natureza com conforto absoluto.",
    price: "R$ 980,00",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80&w=600",
    featured: true
  },
  {
    name: "Gastronomia Autoral",
    description: "Menu completo preparado por chef com ingredientes frescos locais e orgânicos.",
    price: "R$ 180,00",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
    featured: false
  },
  {
    name: "Trilhas & Mirantes",
    description: "Caminhadas guiadas e meditação ativa nos pontos de contemplação do ecossistema.",
    price: "Incluso",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600",
    featured: false
  },
  {
    name: "Lounge Corporativo",
    description: "Infraestrutura completa e reservada para encontros de liderança e reuniões.",
    price: "Sob Consulta",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
    featured: false
  }
];

export default function ServicesSection() {
  return (
    <section className="section-viewport relative w-full overflow-hidden bg-background flex flex-col justify-center py-16 lg:py-20 text-foreground" id="servicos">
      <div className="container-alabz">
        
        {/* Cabeçalho da Seção (.section-rail) */}
        <div className="section-rail flex flex-col gap-2.5 mb-14 text-left">
          <span className="text-[var(--color-accent)] font-bold uppercase text-xs md:text-sm tracking-widest">
            Serviços
          </span>
          <h2 className="font-bold text-foreground tracking-tight m-0 title-clamp">
            Vivências Desenhadas Para o Seu Bem-Estar
          </h2>
        </div>

        {/* Grid de Serviços (.service-grid) */}
        <div className="cards-grid service-grid">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`service-card ${service.featured ? "service-card-featured" : "bg-white border border-zinc-200 shadow-sm"}`}
            >
              {/* Imagem do Card com Proporção de 40% da Altura da Caixa */}
              <div className="service-card-media overflow-hidden w-full select-none bg-[#FDFBF7] relative">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>

              {/* Informações e Textos do Card (60% da Altura da Caixa) */}
              <div className="card-content min-w-0 flex flex-1 flex-col gap-2.5 p-5">
                <h3 className="font-semibold text-lg md:text-xl text-foreground tracking-tight leading-snug m-0 [overflow-wrap:anywhere]">
                  {service.name}
                </h3>
                <p className="text-foreground/70 text-sm leading-[1.65] m-0 mb-auto text-left [overflow-wrap:anywhere]">
                  {service.description}
                </p>
                <span className="service-price font-bold text-xl md:text-2xl text-[var(--color-accent)] leading-none block">
                  {service.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Estilos CSS Scoped para Comportamentos Especiais solicitados */}
      <style jsx>{`
        .title-clamp {
          font-family: var(--font-display, sans-serif);
          line-height: 1.15;
          font-size: clamp(2rem, 2rem + 1.2vw, 3.5rem);
        }
        .service-grid {
          --card-min: 15.875rem;
          --card-gap: 1rem;
        }
        .service-card {
          display: flex;
          min-width: 0;
          min-height: 26rem;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.4s ease;
        }
        .service-card-media {
          aspect-ratio: 4 / 3;
          flex: none;
        }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
        }
        .service-card img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .service-card:hover img {
          transform: scale(1.03);
        }
        .service-card-featured {
          border: 2px solid var(--color-accent);
          background: linear-gradient(180deg, #FDFBF7 0%, #FFFFFF 100%);
          box-shadow: 0 4px 20px rgba(197, 168, 128, 0.05);
        }
      `}</style>
    </section>
  );
}
