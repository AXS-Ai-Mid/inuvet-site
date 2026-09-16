import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, Sparkles, MessageCircle, Phone, Search } from "lucide-react";
import { GENERAL_FAQS, CLINIC_INFO } from "@/lib/clinic-data";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema-generator";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CitableBlock } from "@/components/CitableBlock";
import { CITABLE_AI_BLOCKS } from "@/lib/clinic-data";

export const metadata: Metadata = {
  title: "Perguntas Frequentes (FAQ) | Inuvet Maringá",
  description:
    "Respostas completas para dúvidas sobre vacinação, cirurgias, castração, exames, internação e atendimento de emergência na Clínica Inuvet em Maringá - PR.",
  alternates: {
    canonical: "https://inuvet.com.br/faq",
  },
};

export default function FAQPage() {
  const faqSchema = generateFAQSchema(GENERAL_FAQS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "https://inuvet.com.br" },
    { name: "Perguntas Frequentes", url: "https://inuvet.com.br/faq" },
  ]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-sky-900 via-blue-950 to-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Central de Dúvidas Médicas & Atendimento</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Perguntas Frequentes sobre Cuidados com Pets
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Perguntas reais de tutores de Maringá respondidas por médicos veterinários com informações claras, objetivas e citáveis.
          </p>
        </div>
      </section>

      {/* Citable summary block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CitableBlock block={CITABLE_AI_BLOCKS[0]} />
      </section>

      {/* Main FAQ Accordion */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FAQAccordion initialFaqs={GENERAL_FAQS} showSearch={true} />
      </section>

      {/* Question still not answered banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-blue-50 border border-blue-200 text-center space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Ainda tem alguma dúvida sobre o seu pet?
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Nossa equipe de recepção e enfermagem veterinária está pronta para esclarecer qualquer ponto sobre tratamentos, vacinas ou agendamentos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Perguntar no WhatsApp: {CLINIC_INFO.whatsapp}</span>
            </a>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm"
            >
              <span>Enviar Mensagem Online</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
