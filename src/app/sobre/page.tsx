import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Stethoscope,
  ShieldCheck,
  Award,
  Heart,
  Activity,
  CheckCircle2,
  Users,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";
import { CLINIC_INFO, CITABLE_AI_BLOCKS } from "@/lib/clinic-data";
import { CitableBlock } from "@/components/CitableBlock";
import { generateBreadcrumbSchema } from "@/lib/schema-generator";
import { LocationDirections } from "@/components/LocationDirections";

export const metadata: Metadata = {
  title: "Sobre a Clínica Inuvet | Estrutura e Equipe em Maringá",
  description:
    "Conheça a estrutura hospitalar moderna, o atendimento 24h e o compromisso da Inuvet com a saúde e bem-estar de cães e gatos em Maringá e Sarandi.",
  alternates: {
    canonical: "https://inuvet.com.br/sobre",
  },
};

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "https://inuvet.com.br" },
    { name: "A Clínica", url: "https://inuvet.com.br/sobre" },
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
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Nossa História e Compromisso com a Vida Animal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Excelência Médica e Cuidado Humanizado em Maringá
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Uma estrutura hospitalar moderna pensada para oferecer diagnóstico preciso, conforto térmico e segurança anestésica para cães e gatos.
          </p>
        </div>
      </section>

      {/* Citable AI block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CitableBlock block={CITABLE_AI_BLOCKS[0]} />
      </section>

      {/* Mission & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Nossa Missão</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Proporcionar longevidade e qualidade de vida aos animais através de medicina veterinária preventiva e curativa de excelência, com ética, carinho e transparência com os tutores.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Segurança Inegociável</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Contamos com monitoramento contínuo de frequência cardíaca, oxigenação e temperatura, minimizando riscos durante procedimentos cirúrgicos, com estrutura hospitalar moderna.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Manejo Sem Medo (Fear-Free)</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ambiente acolhedor, baias climatizadas individualizadas e abordagem paciente que reduz o estresse de cães e especialmente de felinos sensíveis.
            </p>
          </div>
        </div>
      </section>

      {/* Infrastructure Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Infraestrutura Hospitalar
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Equipamentos de Última Geração na Av. Kakogawa
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="h-44 rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-200">
                <img
                  src="/images/inuvet-cirurgia.jpg"
                  alt="Centro cirúrgico veterinário moderno Inuvet"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Centro Cirúrgico</h4>
              <p className="text-xs text-slate-600">Ambiente moderno com monitor multiparamétrico e equipe cirúrgica especializada.</p>
            </div>

            <div className="space-y-2">
              <div className="h-44 rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-200">
                <img
                  src="/images/inuvet-estrutura.jpg"
                  alt="Recepção e consultórios Inuvet"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Consultórios Climatizados</h4>
              <p className="text-xs text-slate-600">Salas de atendimento limpas e higienizadas entre cada paciente para evitar contaminações.</p>
            </div>

            <div className="space-y-2">
              <div className="h-44 rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-200">
                <img
                  src="/images/inuvet-hero.jpg"
                  alt="Diagnóstico e ultrassonografia Inuvet"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Diagnóstico por Imagem</h4>
              <p className="text-xs text-slate-600">Ultrassonografia abdominal e exames hematológicos rápidos para respostas ágeis.</p>
            </div>

            <div className="space-y-2">
              <div className="h-44 rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-200">
                <img
                  src="https://images.pexels.com/photos/7469222/pexels-photo-7469222.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Internação assistida e cuidados contínuos"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Internação Assistida</h4>
              <p className="text-xs text-slate-600">Bombas de infusão computadorizadas e suporte de oxigênio com boletim diário aos tutores.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Directions section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LocationDirections />
      </section>
    </div>
  );
}
