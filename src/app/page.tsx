import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Phone,
  MessageCircle,
  ShieldCheck,
  Award,
  HeartPulse,
  Activity,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Stethoscope,
  ChevronRight,
  Car,
  Star,
  Users,
} from "lucide-react";
import { CLINIC_INFO, SERVICES_LIST, CITABLE_AI_BLOCKS, GENERAL_FAQS } from "@/lib/clinic-data";
import { generateFAQSchema } from "@/lib/schema-generator";
import { CitableBlock } from "@/components/CitableBlock";
import { AppointmentForm } from "@/components/AppointmentForm";
import { ServiceCard } from "@/components/ServiceCard";
import { VaccineCalculator } from "@/components/VaccineCalculator";
import { TriageChecker } from "@/components/TriageChecker";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LocationDirections } from "@/components/LocationDirections";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { HumanizedCareSection } from "@/components/HumanizedCareSection";

export default function HomePage() {
  const faqSchema = generateFAQSchema();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 overflow-hidden">
      {/* FAQ Schema for this page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Col: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-100/80 text-blue-900 border border-blue-300 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Veterinário 24 Horas em Maringá & Sarandi - PR</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Seu pet merece cuidado{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-700">
                  imediato 24 horas
                </span>{" "}
                e diagnóstico preciso com amor.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Emergência 24h, consultas, vacinas, centro cirúrgico moderno, exames rápidos e internação monitorada para cães e gatos. Unidades em <strong>Maringá</strong> (Av. Kakogawa, 1244) e <strong>Sarandi</strong> (Av. Brasil, 684).
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/agendar"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-700/25 hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Agendar Consulta Agora</span>
                </Link>

                <a
                  href={CLINIC_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-base shadow-xs transition-all hover:border-blue-500"
                >
                  <MessageCircle className="w-5 h-5 text-blue-600 fill-blue-100" />
                  <span>WhatsApp: {CLINIC_INFO.whatsapp}</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Anestesia Inalatória</h4>
                    <p className="text-[11px] text-slate-500">Máxima segurança cirúrgica</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Vacinas Importadas</h4>
                    <p className="text-[11px] text-slate-500">Cadeia fria monitorada</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Atendimento 24h</h4>
                    <p className="text-[11px] text-slate-500">Plantão todos os dias em Maringá</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Hero Visual Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/humanizado/inuvet-oficial.jpg"
                  alt="Fotografia institucional oficial da Inuvet: pata de gato tocando uma mão"
                  className="w-full h-[380px] sm:h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Overlaid Floating Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Atendimento Humanizado</h4>
                      <p className="text-[11px] text-slate-600">Cães e gatos tratados como membros da família</p>
                    </div>
                  </div>
                  <Link
                    href="/emergencia"
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shrink-0 transition-colors"
                  >
                    Urgência
                  </Link>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-900 text-sm">4.9/5.0</span>
                    <span className="text-[10px] text-slate-500">(+500 avaliações)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">Referência em Maringá & Sarandi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GEO / CITABLE AI OVERVIEW BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CitableBlock block={CITABLE_AI_BLOCKS[0]} />
      </section>

      {/* 3. HUMANIZED CARE & FAMILY STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HumanizedCareSection />
      </section>

      {/* 4. EMERGENCY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmergencyBanner />
      </section>

      {/* 4. SERVICES DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Especialidades & Cuidados
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Serviços Veterinários Completos
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              Da emergência 24h às cirurgias, vacinas e exames, oferecemos suporte integral em um só lugar.
            </p>
          </div>

          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors"
          >
            <span>Ver catálogo completo de serviços</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.slice(0, 6).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE APPOINTMENT FORM */}
      <section id="agendamento" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Agendamento Simplificado
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Priorize a saúde do seu pet hoje mesmo
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Consultas agendadas garantem atendimento pontual, sem estresse para o seu pet e com tempo total dedicado para tirar dúvidas e realizar exames preventivos.
              </p>
            </div>

            {/* Quick Benefits */}
            <div className="space-y-3 pt-2">
              {[
                { title: "Sem filas de espera prolongadas", desc: "Horários marcados com antecedência para minimizar o estresse animal." },
                { title: "Prontuário Digital Integrado", desc: "Todo o histórico de vacinas, peso e exames fica salvo com segurança." },
                { title: "Atendimento Humanizado e Sem Pressa", desc: "Exame clínico minucioso da cabeça à ponta da cauda." },
                { title: "Confirmação Instantânea via WhatsApp", desc: "Nossa recepção responde prontamente para alinhar detalhes." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Phone Call Card */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2">
              <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                Prefere falar por telefone?
              </p>
              <p className="text-xl font-bold">{CLINIC_INFO.phone}</p>
              <p className="text-xs text-slate-400">Atendimento de Segunda a Sexta das 08h às 19h | Sábados 08h às 13h</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <AppointmentForm />
          </div>
        </div>
      </section>

      {/* 6. VACCINE CALCULATOR PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VaccineCalculator />
      </section>

      {/* 7. TRIAGE CHECKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TriageChecker />
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialsSection />
      </section>

      {/* 9. CITABLE GEO SURGERY BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CitableBlock block={CITABLE_AI_BLOCKS[3]} />
      </section>

      {/* 10. FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Perguntas & Respostas Frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tire Suas Dúvidas Sobre Cuidados Veterinários
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Informações claras e embasadas para tutores e otimizadas para mecanismos de inteligência artificial.
          </p>
        </div>

        <FAQAccordion initialFaqs={GENERAL_FAQS} limit={6} />

        <div className="text-center pt-4">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors"
          >
            <span>Ver todas as perguntas e respostas completas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 11. LOCATION & DIRECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LocationDirections />
      </section>
    </div>
  );
}
