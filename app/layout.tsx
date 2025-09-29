import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/AppShell/Header";
import { Footer } from "@/components/AppShell/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "RBS Distribuidora de Peliculas",
    template: "%s | RBS Distribuidora",
  },
  description:
    "Distribuidora lider de peliculas en Uruguay. Catalogo, estrenos y materiales oficiales para cines, marcas y prensa.",
  keywords: ["cine", "distribuidor", "peliculas", "Uruguay", "RBS"],
  metadataBase: new URL("https://www.rbs.com.uy"),
  openGraph: {
    type: "website",
    locale: "es_UY",
    title: "RBS Distribuidora de Peliculas",
    description:
      "Distribuidora lider de peliculas en Uruguay. Conectamos los grandes estrenos internacionales con el publico local.",
    siteName: "RBS Distribuidora",
    url: "https://www.rbs.com.uy",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rbsdistribuidora",
    creator: "@rbsdistribuidora",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0d10",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-glass-cinema-backdrop text-glass-cinema-text">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
