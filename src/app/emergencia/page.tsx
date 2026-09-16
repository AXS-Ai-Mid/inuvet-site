import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  ShieldAlert,
  Activity,
  HeartPulse,
  Navigation,
  CheckCircle2,
} from "lucide-react";
import { CLINIC_INFO, CITABLE_AI_BLOCKS } from "@/lib/clinic-data";
import { TriageChecker } from "@/components/TriageChecker";
import { CitableBlock } from "@/components/CitableBlock";
import { generateBreadcrumbSchema } from "@/lib/schema-generator";

export const metadata: Metadata = {
  title: "Emergência Veterinária 24h em Maringá | Inuvet",
  description:
    "Plantão 24 horas para emergências veterinárias de cães e gatos em Maringá na Av. Kakogawa, 1244 (Parque das Grevíleas). Centro cirúrgico, oxigenioterapia e internação monitorada.",
  alternates: {
    canonical: "https://inuvet.com.br/emergencia",
  },
};

export default function EmergencyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "https://inuvet.com.br" },
    { name: "Emergência e Plantão", url: "https://inuvet.com.br/emergencia" },
  ]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Critical Emergency Top Header */}
      <section className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-rose-600">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-rose-600 text-white animate-pulse">
            <AlertTriangle className="w-4 h-4" />
            <span>Suporte de Urgência & Emergência Veterinária</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Atendimento 24 Horas para Casos Críticos em Maringá
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Se o seu pet está em risco, não perca tempo. Contate nossa equipe e dirija-se à nossa unidade na <strong>Av. Kakogawa, 1244</strong> (Parque das Grevíleas).
          </p>

          {/* Large Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-base shadow-xl shadow-rose-950/60 transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5 animate-bounce" />
              <span>Ligar Agora: {CLINIC_INFO.phone}</span>
            </a>

            <a
              href={`https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${encodeURIComponent(
                "🚨 *URGÊNCIA VETERINÁRIA* - Preciso de atendimento imediato para o meu pet!"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-950/60 transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 fill-white text-blue-600" />
              <span>Chamar Plantão no WhatsApp</span>
            </a>

            <a
              href={CLINIC_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-sm"
            >
              <Navigation className="w-4 h-4 text-rose-400" />
              <span>Rota no GPS</span>
            </a>
          </div>
        </div>
      </section>

      {/* Citable AI emergency block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CitableBlock block={CITABLE_AI_BLOCKS[1]} />
      </section>

      {/* Interactive Triage Symptom Checker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TriageChecker />
      </section>

      {/* What to do while traveling / First Aid Protocol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Primeiros Socorros & Transporte Seguro
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              O Que Fazer Enquanto Você se Desloca Até a Clínica
            </h2>
            <p className="text-slate-600 text-sm">
              Orientações veterinárias que podem salvar a vida do seu animal antes da chegada:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold text-sm flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-base">Atropelamento ou Trauma</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Movimente o animal o mínimo possível. Use uma tábua ou cobertor firme como maca improvisada. Não tente alinhar ossos fraturados.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-base">Ingestão de Veneno / Tóxicos</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                NUNCA provoque vômito sem orientação e NUNCA dê leite ou óleo. Fotografe a embalagem do produto ou traga restos para identificação rápida do antídoto.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold text-sm flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-base">Convulsões</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Afaste móveis e objetos pontiagudos. Não coloque a mão na boca do animal para não ser mordido. Cronometre a duração do episódio e apague as luzes fortes.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>
              <strong>Importante:</strong> Avisar com 5 a 10 minutos de antecedência via WhatsApp ou ligação permite que nossa equipe prepare o leito de oxigênio e a sala cirúrgica imediatamente para a chegada do seu animal.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
