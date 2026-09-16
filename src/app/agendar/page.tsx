import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { CLINIC_INFO, CITABLE_AI_BLOCKS } from "@/lib/clinic-data";
import { AppointmentForm } from "@/components/AppointmentForm";
import { generateBreadcrumbSchema } from "@/lib/schema-generator";

export const metadata: Metadata = {
  title: "Agendar Consulta Veterinária em Maringá | Inuvet",
  description:
    "Agende online sua consulta preventiva, vacinação, cirurgia ou check-up para cães e gatos na Inuvet na Av. Kakogawa, 1244 - Parque das Grevíleas, Maringá - PR.",
  alternates: {
    canonical: "https://inuvet.com.br/agendar",
  },
};

interface Props {
  searchParams: Promise<{ servico?: string }>;
}

export default async function BookingPage({ searchParams }: Props) {
  const { servico } = await searchParams;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "https://inuvet.com.br" },
    { name: "Agendar Consulta", url: "https://inuvet.com.br/agendar" },
  ]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-sky-900 via-blue-950 to-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Calendar className="w-3.5 h-3.5" />
            <span>Pré-Agendamento Online Descomplicado</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Agende a Consulta do Seu Pet em Maringá
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Atendimento pontual, infraestrutura cirúrgica completa e equipe atenciosa na Av. Kakogawa, 1244 (Parque das Grevíleas).
          </p>
        </div>
      </section>

      {/* Main Booking Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AppointmentForm defaultService={servico} />
      </section>

      {/* Emergency Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-950">Seu caso é de urgência imediata?</h4>
              <p className="text-xs text-rose-800">
                Para risco à vida, não aguarde confirmação do formulário. Chame agora pelo telefone ou WhatsApp de emergência.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors"
            >
              Ligar {CLINIC_INFO.phone}
            </a>
            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
