import Header from "../components/layout/Header";
import Footer from "../components/Footer";
import Link from "next/link";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * TEMPLATE BASE ALABZ — page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Esta é a página raiz do projeto. Está intencionalmente vazia para que o
 * agente construa as seções do cliente a partir do zero, com base no briefing
 * e no Design Contract aprovado (.alabz/design-contract.md).
 *
 * 📁 PADRÕES DE REFERÊNCIA:
 * Os arquivos em `components/sections/` contêm exemplos de seções prontas
 * (Hero, Serviços, ZPattern, Reviews, Localização, FAQ etc.) que podem ser
 * usados como ponto de partida ou copiados e adaptados para o novo cliente.
 * NÃO importe essas seções diretamente — adapte o conteúdo antes.
 *
 * 📋 CHECKLIST DE ONBOARDING (antes de codar):
 *  1. Preencher config/site.ts com os dados reais do cliente
 *  2. Substituir app/icon.png pelo favicon/logo do cliente
 *  3. Atualizar metadata.title e metadataBase em app/layout.tsx
 *  4. Confirmar quais recursos estão ativos: Forms | CookieBanner | Analytics
 *  5. Criar .alabz/design-contract.md após aprovação do wireframe/mockup
 * ─────────────────────────────────────────────────────────────────────────────
 */

import HeroSection from "../components/sections/HeroSection";
import QuemSomosSection from "../components/sections/QuemSomosSection";
import ComoAcolhemosSection from "../components/sections/ComoAcolhemosSection";
import ProjetosFrentesSection from "../components/sections/ProjetosFrentesSection";
import AboutFounderSection from "../components/sections/AboutFounderSection";
import ReviewsSection from "../components/sections/ReviewsSection";
import GalleryPlaceholderSection from "../components/sections/GalleryPlaceholderSection";
import ContributionSection from "../components/sections/ContributionSection";
import LocationSection from "../components/sections/LocationSection";
import VisitInvitationSection from "../components/sections/VisitInvitationSection";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <div className="lg:h-[calc(100dvh-var(--header-height))] lg:overflow-hidden">
          <QuemSomosSection />
          <ComoAcolhemosSection />
        </div>
        <ProjetosFrentesSection />
        <AboutFounderSection />
        <ReviewsSection />
        <GalleryPlaceholderSection />
        <ContributionSection />
        <LocationSection />
        <VisitInvitationSection />
      </main>

      <Footer />

      {/* ── Atalho de Desenvolvimento — visível apenas em localhost ─────────
           Não é renderizado em produção (process.env.NODE_ENV === "production"). */}
      {process.env.NODE_ENV === "development" && (
        <Link
          href="/teste-forms"
          title="Laboratório de Formulários"
          style={{
            position: "fixed",
            bottom: "5rem",
            left: "1.25rem",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "#1a1a1a",
            color: "#fff",
            padding: "0.5rem 0.9rem",
            borderRadius: "999px",
            fontSize: "0.78rem",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
            letterSpacing: "0.02em",
          }}
        >
          🧪 Formulários
        </Link>
      )}
    </>
  );
}

