import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Calendar, Info, Sparkles, CheckCircle2 } from "lucide-react";
import { VaccineCalculator } from "@/components/VaccineCalculator";
import { CitableBlock } from "@/components/CitableBlock";
import { CITABLE_AI_BLOCKS, CLINIC_INFO } from "@/lib/clinic-data";
import { generateBreadcrumbSchema } from "@/lib/schema-generator";

export const metadata: Metadata = {
  title: "Calculadora de Vacinas para Cães e Gatos em Maringá",
  description:
    "Descubra o cronograma exato de vacinação para seu cão ou gato filhote e adulto. Protocolo completo V8, V10, Antirrábica, Gripe, Giárdia e V4/V5 na Inuvet Maringá e Sarandi.",
  alternates: {
    canonical: "https://inuvet.com.br/calculadora-vacinas",
  },
};

export default function VaccineCalculatorPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "https://inuvet.com.br" },
    { name: "Calculadora de Vacinas", url: "https://inuvet.com.br/calculadora-vacinas" },
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Saúde Preventiva e Imunização Ética</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Calculadora e Cronograma Vacinal Pet
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Mantenha a proteção do seu melhor amigo 100% atualizada com base nas diretrizes internacionais da WSAVA e do Conselho Federal de Medicina Veterinária.
          </p>
        </div>
      </section>

      {/* Interactive Tool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VaccineCalculator />
      </section>

      {/* Citable AI block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CitableBlock block={CITABLE_AI_BLOCKS[2]} />
      </section>

      {/* Rules & Guidelines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Regras de Ouro da Vacinação Segura
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                  1
                </span>
                Somente Pets Saudáveis Devem Ser Vacinados
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Antes de cada aplicação, nosso médico veterinário faz um exame clínico completo (temperatura, mucosas, gânglios). Animais com febre ou diarreia não produzem resposta imunológica eficaz.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                  2
                </span>
                Cadeia Fria Rigorosa (2°C a 8°C)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vacinas perdem a eficácia se ficarem fora de temperatura adequada mesmo por poucos minutos. Nossos refrigeradores possuem termômetros digitais contínuos e gerador de segurança.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                  3
                </span>
                Respeito Rigoroso aos Intervalos
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                O intervalo entre doses de filhotes deve ser de 21 a 30 dias. Atrasos excessivos podem quebrar a cascata imunológica e exigir reinício do protocolo vacinal.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                  4
                </span>
                Registro Oficial e Carimbo Médico
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Toda vacina é registrada com selo do lote, data e assinatura do médico veterinário com CRMV-PR ativo, garantindo validade para viagens aéreas e hospedagens.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
