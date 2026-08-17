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
  metadataBase: new URL("https://respeito.org.br"),
  title: "ONG Respeito Não Tem Cor",
  description: "Dignidade sem distinção",
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
    description: "Dignidade sem distinção",
    url: "https://respeito.org.br",
    siteName: "ONG Respeito Não Tem Cor",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ONG Respeito Não Tem Cor - Acolhimento e Igualdade Racial",
      },
    ],
    locale: "pt_BR",
    type: "website",
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
