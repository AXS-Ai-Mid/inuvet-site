import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { CLINIC_INFO } from "@/lib/clinic-data";
import { generateVeterinaryCareSchema, generateWebSiteSchema } from "@/lib/schema-generator";

export const metadata: Metadata = {
  metadataBase: new URL("https://inuvet.com.br"),
  title: {
    default: "Inuvet | Veterinário 24h em Maringá e Sarandi - Clínica e Hospital Veterinário",
    template: "%s | Inuvet Veterinária 24h",
  },
  description:
    "Clínica e Hospital Veterinário 24 horas em Maringá e Sarandi - PR. Atendimento de emergência 24h, consultas, cirurgias, vacinas, ultrassom, exames e internação monitorada para cães e gatos. Cuidamos como se fosse da nossa família.",
  keywords: [
    "veterinario 24 horas maringa",
    "veterinaria 24h maringa",
    "clinica veterinaria maringa",
    "hospital veterinario maringa",
    "veterinaria sarandi",
    "emergencia veterinaria maringa",
    "veterinario de plantao maringa",
    "veterinario perto de mim",
    "castracao cachorro maringa",
    "ultrassom veterinario maringa",
    "internacao veterinaria maringa",
    "inuvet",
    "inuvet maringa",
    "inuvet sarandi",
    "veterinaria parque das grevileas",
  ],
  authors: [{ name: CLINIC_INFO.name, url: CLINIC_INFO.website }],
  creator: CLINIC_INFO.name,
  publisher: CLINIC_INFO.name,
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    title: "Inuvet | Veterinário 24h em Maringá e Sarandi - PR",
    description:
      "Atendimento veterinário 24 horas para cães e gatos em Maringá (Av. Kakogawa, 1244) e Sarandi (Av. Brasil, 684). Emergência, cirurgias, vacinas, ultrassom e internação.",
    url: "https://inuvet.com.br",
    siteName: "Inuvet Veterinária 24h",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/humanizado/inuvet-oficial.jpg",
        width: 1200,
        height: 630,
        alt: "Inuvet - cuidado veterinário com amor em Maringá e Sarandi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inuvet | Veterinário 24h em Maringá e Sarandi - PR",
    description:
      "Emergência 24h, consultas, cirurgias, vacinas, ultrassom e exames para cães e gatos em Maringá e Sarandi.",
    images: ["/images/humanizado/inuvet-oficial.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://inuvet.com.br",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const veterinarySchema = generateVeterinaryCareSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Schema.org Injections for AI & Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(veterinarySchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col selection:bg-blue-600 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
