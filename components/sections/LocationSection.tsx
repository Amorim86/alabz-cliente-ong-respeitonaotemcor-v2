export default function LocationSection() {
  return (
    <section className="section-viewport relative w-full overflow-hidden bg-background py-16 md:py-24 flex items-center" id="contato">
      <div className="container-alabz">
        
        <div className="grid grid-cols-1 max-[960px]:grid-cols-1 min-[961px]:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.75fr)] gap-[34px] items-stretch">
          
          {/* Coluna Esquerda: Texto e Horários */}
          <div className="flex flex-col justify-center text-center min-[961px]:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Localização e Horários
            </h2>
            <p className="text-base text-foreground/70 leading-relaxed mb-8 text-justify">
              Venha nos visitar e sinta a diferença do nosso ambiente planejado para o seu conforto. Estamos localizados em uma área de fácil acesso com estacionamento no local.
            </p>

            <dl className="w-full flex flex-col gap-4 mb-8 text-sm md:text-base text-foreground/80">
              <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
                <dt className="font-semibold">Segunda a Sexta</dt>
                <dd>08:00 – 19:00</dd>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
                <dt className="font-semibold">Sábado</dt>
                <dd>09:00 – 14:00</dd>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
                <dt className="font-semibold">Domingo</dt>
                <dd className="text-foreground/50">Fechado</dd>
              </div>
            </dl>

            <div className="mt-auto pt-4 flex max-[960px]:justify-center">
              <a
                href="https://maps.google.com/?q=Placeholder+Address"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground text-background px-8 py-3.5 rounded-full text-base font-bold hover:bg-foreground/90 transition-colors inline-block"
              >
                Como Chegar
              </a>
            </div>
          </div>

          {/* Coluna Direita: Card Unificado de Mídias */}
          <div className="border border-[var(--line)] rounded-lg shadow-xl overflow-hidden flex flex-col min-[961px]:min-h-[520px] min-[961px]:h-full max-[960px]:h-auto bg-zinc-900">
            
            {/* Elemento 1 - Carrossel da Fachada (68%) */}
            <div className="relative overflow-hidden border-b border-[rgba(242,189,34,0.2)] min-[961px]:h-[68%] max-[960px]:min-h-[220px]">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
                alt="Fachada 1"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ animation: "facadeCarousel 15s linear infinite -1s", objectPosition: "46%" }}
              />
              <img
                src="https://images.unsplash.com/photo-1572025442646-866d16c84a54?auto=format&fit=crop&q=80&w=800"
                alt="Fachada 2"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ animation: "facadeCarousel 15s linear infinite 4s", objectPosition: "42%" }}
              />
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
                alt="Fachada 3"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ animation: "facadeCarousel 15s linear infinite 9s", objectPosition: "68%" }}
              />
            </div>

            {/* Elemento 2 - Mapa Dark Mode (32%) */}
            <div className="relative min-[961px]:h-[32%] max-[960px]:min-h-[220px] bg-zinc-950 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117565.61864115865!2d-46.730303882772596!3d-23.593678036280452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a2b2ed7f3a1%3A0xab35da2f56f44c3c!2sS%C3%A3o%20Paulo%2C%20State%20of%20S%C3%A3o%20Paulo!5e0!3m2!1sen!2sbr!4v1718912345678!5m2!1sen!2sbr"
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ filter: "grayscale(1) invert(0.9) contrast(0.86) brightness(0.78) sepia(0.08)" }}
              />
              {/* Overlay Decorativo do Mapa */}
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{ boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.04), inset 0 22px 48px rgba(0, 0, 0, 0.3)" }} 
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
