import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Stethoscope,
  ShieldCheck,
  Activity,
  HeartPulse,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Phone,
  MessageCircle,
} from "lucide-react";
import { SERVICES_LIST, CLINIC_INFO, CITABLE_AI_BLOCKS } from "@/lib/clinic-data";
import { ServiceCard } from "@/components/ServiceCard";
import { CitableBlock } from "@/components/CitableBlock";
import { generateBreadcrumbSchema } from "@/lib/schema-generator";

export const metadata: Metadata = {
  title: "Serviços Veterinários em Maringá | Consultas, Cirurgias, Vacinas",
  description:
    "Catálogo completo de serviços veterinários da Inuvet em Maringá - PR: emergência 24h, consultas, vacinação, centro cirúrgico, exames e internação.",
  alternates: {
    canonical: "https://inuvet.com.br/servicos",
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "https://inuvet.com.br" },
    { name: "Serviços Veterinários", url: "https://inuvet.com.br/servicos" },
  ]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-sky-900 via-blue-950 to-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Medicina Veterinária Integrada & Especializada</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Serviços Veterinários para Cães e Gatos
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Estrutura hospitalar e ambulatorial completa na Av. Kakogawa, 1244 - Maringá - PR. Conheça nossos procedimentos e protocolos médicos.
          </p>
        </div>
      </section>

      {/* Citable AI block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CitableBlock block={CITABLE_AI_BLOCKS[0]} />
      </section>

      {/* Main Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Todos os Procedimentos e Especialidades
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Clique em qualquer serviço para visualizar indicações, preparo de exames e perguntas frequentes.
            </p>
          </div>

          <Link
            href="/agendar"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Atendimento</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Need Help Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Não encontrou o procedimento que seu pet precisa?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Nossa equipe atende especialidades sob demanda e realiza exames complementares. Fale diretamente com nossa recepção médica.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </a>
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
