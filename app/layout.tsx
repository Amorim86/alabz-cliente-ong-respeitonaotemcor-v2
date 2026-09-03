import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import WhatsAppFloating from "../components/WhatsAppFloating";
import AnalyticsLoader from "../components/AnalyticsLoader";
import CookieBanner from "../components/CookieBanner";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-lumi-display",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-lumi-body",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const APP_VERSION = 'v2';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.respeito.org.br"),
  title: "ONG Respeito Não Tem Cor",
  description:
    "Aqui, respeito é prática: escuta, orientação, formação e rede para quem precisa recomeçar ou caminhar junto.",
  alternates: {
    canonical: "https://www.respeito.org.br",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    title: "ONG Respeito Não Tem Cor",
    description:
      "Aqui, respeito é prática: escuta, orientação, formação e rede para quem precisa recomeçar ou caminhar junto.",
    url: "https://www.respeito.org.br",
    siteName: "ONG Respeito Não Tem Cor",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://www.respeito.org.br/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "ONG Respeito Não Tem Cor — Acolhimento, formação e igualdade racial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONG Respeito Não Tem Cor",
    description:
      "Aqui, respeito é prática: escuta, orientação, formação e rede para quem precisa recomeçar ou caminhar junto.",
    images: ["https://www.respeito.org.br/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppFloating />
        <AnalyticsLoader />
        <CookieBanner />
      </body>
    </html>
  );
}
