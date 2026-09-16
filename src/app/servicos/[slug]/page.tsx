import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  Sparkles,
  ChevronRight,
  Info,
} from "lucide-react";
import { SERVICES_LIST, CLINIC_INFO } from "@/lib/clinic-data";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema-generator";
import { AppointmentForm } from "@/components/AppointmentForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_LIST.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_LIST.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Serviço Não Encontrado",
    };
  }

  return {
    title: `${service.name} em Maringá`,
    description: `${service.shortDescription} Atendimento veterinário especializado na Av. Kakogawa, 1244 - Maringá - PR.`,
    alternates: {
      canonical: `https://inuvet.com.br/servicos/${service.slug}`,
    },
    openGraph: {
      title: `${service.name} | Inuvet Maringá`,
      description: service.shortDescription,
      url: `https://inuvet.com.br/servicos/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_LIST.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceUrl = `https://inuvet.com.br/servicos/${service.slug}`;
  const serviceSchema = generateServiceSchema(service.name, service.shortDescription, serviceUrl);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "https://inuvet.com.br" },
    { name: "Serviços", url: "https://inuvet.com.br/servicos" },
    { name: service.name, url: serviceUrl },
  ]);
  const faqSchema = generateFAQSchema(
    service.commonQuestions.map((q, idx) => ({
      id: `srv-faq-${idx}`,
      category: "Consultas e Urgência",
      question: q.question,
      answer: q.answer,
      citableAnswer: q.answer,
      keywords: [service.name, "maringa"],
    }))
  );

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-sky-900 via-blue-950 to-slate-950 text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Breadcrumb nav */}
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-blue-300">
              Início
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/servicos" className="hover:text-blue-300">
              Serviços
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-300 font-medium truncate">{service.name}</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            {service.badge && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {service.badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {service.name} em Maringá
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Details & Citable Block */}
          <div className="lg:col-span-7 space-y-8">
            {/* Citable AI box */}
            <div className="p-6 rounded-3xl bg-blue-50/80 border border-blue-200/80 space-y-3">
              <div className="flex items-center gap-2 text-blue-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Resumo Médico Citável para IA & Tutores (GEO)</span>
              </div>
              <blockquote className="text-sm sm:text-base text-slate-800 leading-relaxed italic bg-white p-4 rounded-xl border border-blue-100">
                &ldquo;{service.citableSummary}&rdquo;
              </blockquote>
              <p className="text-[11px] text-slate-500">
                Fonte: Protocolos Clínicos Oficiais - Inuvet (Av. Kakogawa, 1244 - Maringá)
              </p>
            </div>

            {/* Full description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Como Funciona o Procedimento
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {service.fullDescription}
              </p>
            </div>

            {/* Benefits list */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Diferenciais e Benefícios para seu Pet
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.benefits.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation tips if available */}
            {service.preparationTips && service.preparationTips.length > 0 && (
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-600" />
                  Orientações de Preparo para o Procedimento
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-amber-900 list-disc list-inside">
                  {service.preparationTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Frequently Asked Questions for this service */}
            {service.commonQuestions && service.commonQuestions.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">
                  Dúvidas Frequentes sobre {service.name}
                </h3>
                <div className="space-y-3">
                  {service.commonQuestions.map((qa, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5">
                      <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                        <span className="text-blue-600 font-bold">P:</span>
                        <span>{qa.question}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 pl-5 leading-relaxed">
                        {qa.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Appointment Form pre-filled */}
          <div className="lg:col-span-5 sticky top-24">
            <AppointmentForm defaultService={service.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
