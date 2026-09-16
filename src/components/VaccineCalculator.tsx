"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  ChevronRight,
  Info,
} from "lucide-react";
import { CLINIC_INFO } from "@/lib/clinic-data";

interface VaccineProtocol {
  ageLabel: string;
  minAgeMonths: number;
  dogVaccines: { name: string; required: boolean; desc: string }[];
  catVaccines: { name: string; required: boolean; desc: string }[];
  dewormingInfo: string;
  preventiveAdvice: string;
}

const AGE_PROTOCOLS: VaccineProtocol[] = [
  {
    ageLabel: "45 dias (6 semanas)",
    minAgeMonths: 1.5,
    dogVaccines: [
      { name: "1ª Dose Vacina Polivalente (V8 ou V10)", required: true, desc: "Protege contra Cinomose, Parvovirose, Hepatite, Leptospirose e Adenovirose." },
      { name: "1ª Dose Vacina contra Giárdia (Opcional)", required: false, desc: "Recomendada para cães com convívio em quintal e contato com outros animais." },
    ],
    catVaccines: [
      { name: "Consulta Pré-vacinal & Teste FIV/FeLV", required: true, desc: "Exame essencial antes de iniciar o protocolo com a quíntupla felina." },
    ],
    dewormingInfo: "1ª ou 2ª dose de vermífugo específico para filhotes.",
    preventiveAdvice: "Filhotes nesta fase NÃO devem passear na calçada ou ter contato com cães não vacinados.",
  },
  {
    ageLabel: "2 meses (8 a 9 semanas)",
    minAgeMonths: 2,
    dogVaccines: [
      { name: "2ª Dose Vacina Polivalente (V8 ou V10)", required: true, desc: "Reforço indispensável para consolidação da imunidade contra vírus letais." },
      { name: "1ª Dose Vacina contra Tosse dos Canis (Gripe)", required: false, desc: "Protege contra traqueobronquite infecciosa canina (gotículas no ar)." },
    ],
    catVaccines: [
      { name: "1ª Dose Vacina Quádrupla (V4) ou Quíntupla (V5)", required: true, desc: "Protege contra Panleucopenia, Rinotraqueíte, Calicivirose, Clamidiose e FeLV." },
    ],
    dewormingInfo: "Reforço do vermífugo e início do controle seguro contra pulgas para filhotes.",
    preventiveAdvice: "Mantenha o pet aquecido, com alimentação super premium e sem banhos em pet shops abertos.",
  },
  {
    ageLabel: "3 meses (12 semanas)",
    minAgeMonths: 3,
    dogVaccines: [
      { name: "3ª Dose Vacina Polivalente (V8 ou V10)", required: true, desc: "Dose crucial que supera o bloqueio dos anticorpos maternos." },
      { name: "2ª Dose Gripe Canina & 2ª Dose Giárdia", required: false, desc: "Finalização do protocolo de proteção respiratória e entérica." },
    ],
    catVaccines: [
      { name: "2ª Dose Vacina Quádrupla (V4) ou Quíntupla (V5)", required: true, desc: "Reforço essencial da proteção viral felina." },
    ],
    dewormingInfo: "Dose preventiva de vermífugo mensal ou trimestral.",
    preventiveAdvice: "Momento ideal para iniciar os treinos comportamentais e sociabilização dentro de casa.",
  },
  {
    ageLabel: "4 meses (16 semanas)",
    minAgeMonths: 4,
    dogVaccines: [
      { name: "Vacina Antirrábica (Dose Única Anual)", required: true, desc: "Obrigatória por lei. Protege contra o vírus mortal da Raiva." },
      { name: "4ª Dose de V10 (se indicado pelo veterinário)", required: false, desc: "Para raças predispostas como Rottweiler, Dobermann e Pitbull." },
    ],
    catVaccines: [
      { name: "Vacina Antirrábica Felina (Dose Única Anual)", required: true, desc: "Protege contra a Raiva. Obrigatória para todos os felinos." },
      { name: "3ª Dose V4/V5 (para filhotes de alto risco)", required: false, desc: "Garante imunidade total para gatos com acesso a áreas externas." },
    ],
    dewormingInfo: "Vermifugação semestral ou trimestral programada.",
    preventiveAdvice: "🎉 Parabéns! 15 a 21 dias após essa etapa, seu pet estará 100% liberado para passeios e banhos!",
  },
  {
    ageLabel: "Adulto (A partir de 1 ano)",
    minAgeMonths: 12,
    dogVaccines: [
      { name: "Reforço Anual de V8 ou V10 Importada", required: true, desc: "Dose anual única para renovar anticorpos por mais 12 meses." },
      { name: "Reforço Anual de Vacina Antirrábica", required: true, desc: "Dose anual obrigatória." },
      { name: "Reforço Anual de Gripe Canina e Giárdia", required: false, desc: "Proteção contínua contra tosse de canis e protozoários da água/fezes." },
    ],
    catVaccines: [
      { name: "Reforço Anual de V4 ou V5 Felina", required: true, desc: "Renovação da imunidade anual contra vírus respiratórios e FeLV." },
      { name: "Reforço Anual de Antirrábica Felina", required: true, desc: "Dose anual obrigatória." },
    ],
    dewormingInfo: "Vermifugação preventiva a cada 3 a 6 meses + antipulgas mensal ou trimestral (Bravecto, Simparic, NexGard).",
    preventiveAdvice: "Agende o check-up clínico anual com exames de sangue preventivos para manter a longevidade do pet.",
  },
];

export function VaccineCalculator() {
  const [species, setSpecies] = useState<"dog" | "cat">("dog");
  const [selectedAgeIdx, setSelectedAgeIdx] = useState(0);
  const [petName, setPetName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const currentProtocol = AGE_PROTOCOLS[selectedAgeIdx];
  const vaccinesToDisplay = species === "dog" ? currentProtocol.dogVaccines : currentProtocol.catVaccines;

  const handleSaveReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerPhone) return;
    setSaving(true);

    try {
      await fetch("/api/vaccine-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerPhone,
          petName: petName || "Meu Pet",
          petSpecies: species === "dog" ? "Cão" : "Gato",
          petAgeMonths: Math.round(currentProtocol.minAgeMonths),
          scheduledVaccines: vaccinesToDisplay.map((v) => v.name).join("; "),
        }),
      });
      setSavedSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const generateWhatsAppLink = () => {
    const text = encodeURIComponent(
      `🐾 *CONSULTA DE VACINAÇÃO - Inuvet*\n` +
      `Pet: ${petName || "Meu pet"} (${species === "dog" ? "Cachorro" : "Gato"})\n` +
      `Idade / Fase: ${currentProtocol.ageLabel}\n` +
      `Vacinas necessárias: ${vaccinesToDisplay.map((v) => v.name).join(", ")}\n` +
      `Gostaria de agendar a aplicação na clínica da Av. Kakogawa 1244!`
    );
    return `https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${text}`;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-800 via-blue-800 to-sky-900 p-6 sm:p-8 text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            Protocolo Oficial de Imunização Veterinária
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Calculadora de Vacinas para Cães e Gatos
        </h3>
        <p className="text-blue-100 text-sm mt-1 max-w-2xl">
          Descubra exatamente quais vacinas seu cão ou gato precisa tomar de acordo com a idade e receba um cronograma de proteção completo.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Selector Species & Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Species */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              1. Selecione o Animal
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSpecies("dog")}
                className={`p-4 rounded-2xl border-2 text-center font-bold text-sm transition-all flex flex-col items-center gap-2 ${
                  species === "dog"
                    ? "border-blue-600 bg-blue-50 text-blue-900 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                }`}
              >
                <span className="text-2xl">🐕</span>
                <span>Cachorro (Canino)</span>
              </button>

              <button
                type="button"
                onClick={() => setSpecies("cat")}
                className={`p-4 rounded-2xl border-2 text-center font-bold text-sm transition-all flex flex-col items-center gap-2 ${
                  species === "cat"
                    ? "border-blue-600 bg-blue-50 text-blue-900 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                }`}
              >
                <span className="text-2xl">🐈</span>
                <span>Gato (Felino)</span>
              </button>
            </div>
          </div>

          {/* Age selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              2. Idade / Fase Atual do Pet
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {AGE_PROTOCOLS.map((proto, idx) => (
                <button
                  key={proto.ageLabel}
                  type="button"
                  onClick={() => setSelectedAgeIdx(idx)}
                  className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                    selectedAgeIdx === idx
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {proto.ageLabel}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Display Vaccines for selected age */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md">
                Fase: {currentProtocol.ageLabel}
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-1.5">
                Vacinas Recomendadas para {species === "dog" ? "Cães" : "Gatos"} nesta etapa:
              </h4>
            </div>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Vacinas 100% Éticas Importadas
            </span>
          </div>

          {/* Vaccines List Cards */}
          <div className="space-y-3">
            {vaccinesToDisplay.map((vac, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 shadow-2xs"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    vac.required
                      ? "bg-blue-100 text-blue-700 font-bold text-xs"
                      : "bg-amber-100 text-amber-700 font-bold text-xs"
                  }`}
                >
                  ✓
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-sm">{vac.name}</span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        vac.required
                          ? "bg-rose-100 text-rose-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {vac.required ? "Obrigatória / Essencial" : "Complementar Recomendada"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{vac.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Deworming and care note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-200">
              <span className="font-bold text-blue-900 block mb-1">
                🪱 Vermifugação & Controle Parasitário:
              </span>
              <p className="text-blue-800">{currentProtocol.dewormingInfo}</p>
            </div>

            <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-200">
              <span className="font-bold text-sky-900 block mb-1">
                💡 Dica de Cuidado Veterinário:
              </span>
              <p className="text-sky-800">{currentProtocol.preventiveAdvice}</p>
            </div>
          </div>
        </div>

        {/* Action & Reminder Box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center pt-2">
          {/* Quick Schedule on WhatsApp */}
          <div className="space-y-3 bg-gradient-to-br from-blue-600 to-sky-700 p-6 rounded-2xl text-white shadow-md">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              Agendamento de Aplicação
            </span>
            <h4 className="text-xl font-bold">
              Vacine seu pet na Inuvet em Maringá
            </h4>
            <p className="text-xs text-blue-100 leading-relaxed">
              Aplicação realizada com carinho por médico veterinário, com avaliação clínica prévia e carimbo oficial na carteirinha.
            </p>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-blue-900 font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-blue-700 text-white" />
              <span>Agendar Vacina via WhatsApp</span>
            </a>
          </div>

          {/* Form to store reminder in DB */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h5 className="font-bold text-sm text-slate-900">
                Cadastrar Lembrete Gratuito de Vacinas
              </h5>
            </div>
            <p className="text-xs text-slate-500">
              Nunca mais perca o prazo do reforço vacinal. Deixe seu WhatsApp para receber aviso quando chegar a data:
            </p>

            {savedSuccess ? (
              <div className="p-4 rounded-xl bg-blue-50 text-blue-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Lembrete cadastrado com sucesso! Avisaremos no seu WhatsApp.</span>
              </div>
            ) : (
              <form onSubmit={handleSaveReminder} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Nome do seu pet"
                    className="px-3 py-2 rounded-lg border border-slate-300 text-xs outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    required
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    placeholder="Seu WhatsApp (44) 99999-9999"
                    className="px-3 py-2 rounded-lg border border-slate-300 text-xs outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
                >
                  {saving ? "Salvando..." : "Salvar Lembrete Vacinal"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
