import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "../config/site";
import PacmanSignature from "./PacmanSignature";

// Importação dinâmica do ícone correspondente ao Header do site (com fallback seguro)
export default function Footer() {
  return (
    <footer className="bg-[#000000] text-brand-footer-text pt-16 pb-6 border-t border-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-4 flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex h-[62px] w-[62px] shrink-0 items-center justify-center">
                <Heart
                  className="absolute inset-0 h-full w-full fill-[#D62828] text-[#D62828] drop-shadow-[0_0_18px_rgba(214,40,40,0.38)]"
                  strokeWidth={1.4}
                />
                <img
                  src="/images/favicon-sem-fundo.png"
                  alt={siteConfig.name}
                  className="relative z-10 h-12 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col text-left md:text-left">
                <span className="font-bold text-lg tracking-tight leading-tight">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] text-brand-accent font-semibold tracking-widest uppercase">
                  {siteConfig.subtitle}
                </span>
              </div>
            </div>
            
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col items-center text-center md:items-start md:text-left">
            <h4 className="font-sans font-bold text-base uppercase tracking-wider text-brand-accent mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400 font-sans">
              {siteConfig.navigation.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 flex flex-col items-center text-center md:items-start md:text-left">
            <h4 className="font-sans font-bold text-base uppercase tracking-wider text-brand-accent mb-4">
              Contato
            </h4>
            
            <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-400 flex flex-col items-center md:items-start font-sans">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                <a href={siteConfig.contact.phoneUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start md:items-start items-center justify-center md:justify-start gap-3">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <span className="text-center md:text-left">
                  {siteConfig.contact.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Developer Branding */}
          <div className="md:col-span-3 flex flex-col items-center text-center relative md:-left-8">
            <h4 className="font-sans font-bold text-base uppercase tracking-wider text-brand-accent mb-4 w-full">
              Desenvolvido por
            </h4>
            <a
              href="https://alabz.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity flex items-center justify-center relative -top-[10px]"
              title="Desenvolvido por Alabz - Soluções Digitais"
            >
              <img
                src="/Logofooter 1.png"
                alt="Desenvolvido por Alabz - Soluções Digitais"
                className="h-[120px] w-auto object-contain"
              />
            </a>
          </div>
        </div>

        {/* Legal and Compliance Footer */}
        <div className="text-[11px] text-brand-footer-text/50 leading-relaxed">
          <div className="border-t border-brand-primary/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-brand-footer-text/80">
            <p className="font-bold">
              {siteConfig.name} | Todos os direitos reservados
            </p>

            
            <PacmanSignature />
          </div>
        </div>
      </div>
    </footer>
  );
}
