import type { Metadata } from "next";
import "./globals.css";
import WhatsAppFloating from "../components/WhatsAppFloating";
import AnalyticsLoader from "../components/AnalyticsLoader";
import CookieBanner from "../components/CookieBanner";

export const APP_VERSION = 'v2';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.SEUDOMINIO.com.br"),
  title: "Alabz - Soluções Digitais",
  description: "Criado por Alabz®",
  openGraph: {
    images: ["/og-image.png"],
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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <main className="flex-1">{children}</main>
        <WhatsAppFloating />
        <AnalyticsLoader />
        <CookieBanner />
      </body>
    </html>
  );
}
