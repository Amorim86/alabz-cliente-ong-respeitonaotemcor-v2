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
  description: "Acolhimento, igualdade racial e apoio comunitário",
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
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
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
