"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ShieldAlert,
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { CLINIC_INFO } from "@/lib/clinic-data";

interface SymptomOption {
  id: string;
  label: string;
  severity: "critical" | "urgent" | "moderate";
  description: string;
}

const SYMPTOMS_LIST: SymptomOption[] = [
  {
    id: "breathing",
    label: "Dificuldade para respirar / Língua azulada ou muito pálida",
    severity: "critical",
    description: "Respiração ofegante sem esforço físico, boca aberta ou esforço abdominal intenso.",
  },
  {
    id: "seizures",
    label: "Convulsões, tremores incontroláveis ou desmaios",
    severity: "critical",
    description: "Perda de consciência, salivação excessiva e contrações involuntárias.",
  },
  {
    id: "trauma",
    label: "Atropelamento, queda ou fratura aparente",
    severity: "critical",
    description: "Impacto forte, impossibilidade de andar, sangramento ativo ou dor intensa.",
  },
  {
    id: "foreign_body",
    label: "Ingestão de veneno, plantas tóxicas, medicamentos ou ossos",
    severity: "critical",
    description: "Ingestão confirmada ou suspeita de chumbinho, chocolate, lírios, paracetamol, etc.",
  },
  {
    id: "bloated_abdomen",
    label: "Barriga inchada e dura com tentativas frustradas de vomitar",
    severity: "critical",
    description: "Sinal clássico de Dilatação-Vólvulo Gástrica (torção no estômago), emergência cirúrgica máxima.",
  },
  {
    id: "urinary_block",
    label: "Gato ou cão não consegue urinar e chora na caixa de areia",
    severity: "urgent",
    description: "Obstrução uretral aguda (muito comum em gatos machos), risco de intoxicação em poucas horas.",
  },
  {
    id: "severe_vomiting",
    label: "Vômitos múltiplos no mesmo dia ou diarreia com sangue",
    severity: "urgent",
    description: "Risco severo de desidratação e choque hipovolêmico.",
  },
  {
    id: "eye_injury",
    label: "Olho muito vermelho, fechado, com secreção ou perfurado",
    severity: "urgent",
    description: "Úlcera de córnea ou trauma ocular necessita de atendimento rápido para salvar a visão.",
  },
  {
    id: "moderate_itching",
    label: "Coceira frequente, lambedura de patas ou orelha vermelha",
    severity: "moderate",
    description: "Sinais de dermatite ou otite. Importante tratar para evitar infecção bacteriana secundária.",
  },
  {
    id: "lethargy_mild",
    label: "Pet um pouco desanimado ou comeu menos ração hoje",
    severity: "moderate",
    description: "Sinais iniciais que requerem observação atenta e consulta de rotina caso persistam.",
  },
];

export function TriageChecker() {
  const [petName, setPetName] = useState("");
  const [petSpecies, setPetSpecies] = useState("Cão");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [ownerPhone, setOwnerPhone] = useState("");
  const [hasCalculated, setHasCalculated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const getUrgencyLevel = () => {
    const selectedItems = SYMPTOMS_LIST.filter((s) => selectedSymptoms.includes(s.id));
    const hasCritical = selectedItems.some((s) => s.severity === "critical");
    const hasUrgent = selectedItems.some((s) => s.severity === "urgent");

    if (hasCritical) {
      return {
        level: "EMERGÊNCIA IMEDIATA (CÓDIGO VERMELHO)",
        tag: "Emergência Imediata",
        color: "bg-rose-600 text-white",
        borderColor: "border-rose-500",
        boxBg: "bg-rose-50",
        message:
          "Os sintomas informados representam RISCO À VIDA DO ANIMAL. Não espere horas passarem. Dirija-se imediatamente à clínica ou ligue para avisar a equipe de plantão.",
        actions: [
          "Ligue agora para (44) 3037-6410 ou chame no WhatsApp (44) 99961-0226",
          "Avise que está a caminho da Av. Kakogawa, 1244",
          "Mantenha o animal aquecido e calmo durante o transporte",
          "Não ofereça alimentos, leite ou remédios humanos caseiros",
        ],
      };
    }

    if (hasUrgent) {
      return {
        level: "URGÊNCIA MÉDICA (CÓDIGO AMARELO)",
        tag: "Urgência",
        color: "bg-amber-500 text-white",
        borderColor: "border-amber-400",
        boxBg: "bg-amber-50",
        message:
          "O quadro requer avaliação médica veterinária nas próximas 2 a 4 horas para evitar agravamento e desidratação severa.",
        actions: [
          "Entre em contato pelo WhatsApp (44) 99961-0226 para priorizar seu encaixe de urgência",
          "Separe histórico de vacinas e medicamentos administrados",
          "Mantenha água fresca disponível se o pet não estiver vomitando",
        ],
      };
    }

    return {
      level: "ACOMPANHAMENTO / ROTINA (CÓDIGO VERDE)",
      tag: "Rotina / Preventivo",
      color: "bg-blue-600 text-white",
      borderColor: "border-blue-400",
      boxBg: "bg-blue-50",
      message:
        "O quadro clínico atual não indica risco imediato de vida, mas requer consulta veterinária e investigação diagnóstica com calma.",
      actions: [
        "Agende uma consulta presencial no melhor dia e horário para sua rotina",
        "Observe se ocorrem novos sintomas ou alteração no apetite",
      ],
    };
  };

  const handleEvaluate = async () => {
    if (selectedSymptoms.length === 0) return;
    setHasCalculated(true);
    setSubmitting(true);

    const urgency = getUrgencyLevel();
    const selectedLabels = SYMPTOMS_LIST.filter((s) => selectedSymptoms.includes(s.id)).map(
      (s) => s.label
    );

    try {
      await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          petName: petName || "Pet não identificado",
          petSpecies,
          symptomsSelected: selectedLabels,
          urgencyScore: urgency.tag,
          ownerPhone: ownerPhone || null,
          recommendation: urgency.message,
        }),
      });
    } catch (e) {
      console.error("Triage logging error:", e);
    } finally {
      setSubmitting(false);
    }
  };

  const result = getUrgencyLevel();

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-rose-950 p-6 sm:p-8 text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            Guia Interativo de Triagem de Sintomas
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Meu Pet Precisa de Atendimento de Emergência?
        </h3>
        <p className="text-slate-300 text-sm mt-1 max-w-2xl">
          Selecione os sinais clínicos que seu cão ou gato está apresentando para receber uma orientação imediata de conduta e nível de gravidade.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Step 1: Pet info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nome do Pet (Opcional)
            </label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Ex: Rex, Mel, Billy"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Espécie
            </label>
            <div className="flex gap-2">
              {["Cão", "Gato", "Outro"].map((sp) => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => setPetSpecies(sp)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    petSpecies === sp
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Seu WhatsApp (Para contato)
            </label>
            <input
              type="tel"
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
              placeholder="(44) 99999-9999"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm outline-hidden"
            />
          </div>
        </div>

        {/* Step 2: Symptoms Selection */}
        <div className="space-y-3 pt-2">
          <label className="block text-sm font-bold text-slate-900">
            Selecione todos os sintomas que seu pet apresenta no momento:
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SYMPTOMS_LIST.map((item) => {
              const isSelected = selectedSymptoms.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleSymptom(item.id)}
                  className={`text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? item.severity === "critical"
                        ? "bg-rose-50 border-rose-400 ring-2 ring-rose-300"
                        : item.severity === "urgent"
                        ? "bg-amber-50 border-amber-400 ring-2 ring-amber-300"
                        : "bg-blue-50 border-blue-400 ring-2 ring-blue-300"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? item.severity === "critical"
                          ? "bg-rose-600 border-rose-600 text-white"
                          : "bg-blue-600 border-blue-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold leading-tight ${
                        isSelected ? "text-slate-950" : "text-slate-800"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-normal">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action button to calculate */}
        {!hasCalculated && (
          <div className="pt-2 text-center">
            <button
              onClick={handleEvaluate}
              disabled={selectedSymptoms.length === 0}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-700 hover:from-blue-500 hover:to-sky-600 text-white font-bold text-base shadow-lg shadow-blue-800/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>Ver Resultado da Triagem Médica</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-slate-400 mt-2">
              Selecione ao menos 1 sintoma acima para liberar o resultado.
            </p>
          </div>
        )}

        {/* Calculated Result Display */}
        {hasCalculated && (
          <div
            className={`p-6 sm:p-8 rounded-3xl border-2 ${result.borderColor} ${result.boxBg} space-y-6 animate-in fade-in zoom-in-95 duration-300`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${result.color}`}>
                {result.level}
              </span>
              <button
                onClick={() => {
                  setHasCalculated(false);
                  setSelectedSymptoms([]);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refazer Triagem
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xl sm:text-2xl font-bold text-slate-900">
                {petName ? `Resultado para ${petName}:` : "Orientação Médica Veterinária:"}
              </h4>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {result.message}
              </p>
            </div>

            {/* Protocol checklist */}
            <div className="bg-white/90 p-5 rounded-2xl border border-slate-200/80 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Condutas Recomendadas Imediatas:
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                {result.actions.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fast Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Ligar para Clínica: {CLINIC_INFO.phone}</span>
              </a>

              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${encodeURIComponent(
                  `🚨 *TRIAGEM DE URGÊNCIA REALIZADA NO SITE*\nPet: ${petName || "Não informado"} (${petSpecies})\nNível: ${result.tag}\nSintomas: ${selectedSymptoms.join(", ")}\nSolicito orientação urgente!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white text-blue-600" />
                <span>Chamar Urgência no WhatsApp</span>
              </a>

              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>Como Chegar</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
