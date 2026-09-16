"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Heart,
  AlertCircle,
  CheckCircle2,
  Send,
  MessageCircle,
  Loader2,
  Sparkles,
  Info,
} from "lucide-react";
import { CLINIC_INFO, SERVICES_LIST } from "@/lib/clinic-data";

interface Props {
  defaultService?: string;
  defaultUrgency?: string;
  className?: string;
}

export function AppointmentForm({ defaultService = "", defaultUrgency = "Rotina", className = "" }: Props) {
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    petName: "",
    petSpecies: "Cão",
    petBreed: "",
    petAge: "",
    serviceRequested: defaultService || SERVICES_LIST[0]?.name || "Consulta Clínica Geral",
    urgencyLevel: defaultUrgency,
    preferredUnit: "Maringá (Av. Kakogawa, 1244 - 24h)",
    preferredDate: "",
    preferredTimeSlot: "Manhã (08h às 12h)",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState<{
    message: string;
    whatsappUrl: string;
    appointmentId?: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ocorreu um erro ao agendar.");
      }

      setSuccessResult({
        message: data.message,
        whatsappUrl: data.whatsappUrl,
        appointmentId: data.appointment?.id,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido ao agendar";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  if (successResult) {
    return (
      <div className="p-8 rounded-3xl bg-white border border-blue-200 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Pré-agendamento Salvo com Sucesso
          </span>
          <h3 className="text-2xl font-bold text-slate-900">
            Tudo pronto, {formData.ownerName.split(" ")[0]}!
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Recebemos a solicitação para o(a) <strong>{formData.petName}</strong> ({formData.serviceRequested}). Nossa equipe na Av. Kakogawa já foi notificada.
          </p>
        </div>

        {/* WhatsApp Fast Track button */}
        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
          <div className="flex items-center justify-center gap-2 text-blue-800 font-semibold text-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Deseja confirmação imediata?</span>
          </div>
          <p className="text-xs text-slate-600">
            Envie sua solicitação direto para o WhatsApp da nossa recepção com 1 clique:
          </p>
          <a
            href={successResult.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-5 h-5 fill-white text-blue-600" />
            <span>Abrir no WhatsApp da Inuvet</span>
          </a>
        </div>

        <button
          onClick={() => {
            setSuccessResult(null);
            setFormData({
              ownerName: "",
              ownerPhone: "",
              ownerEmail: "",
              petName: "",
              petSpecies: "Cão",
              petBreed: "",
              petAge: "",
              serviceRequested: SERVICES_LIST[0]?.name || "Consulta Clínica Geral",
              urgencyLevel: "Rotina",
              preferredUnit: "Maringá (Av. Kakogawa, 1244 - 24h)",
              preferredDate: "",
              preferredTimeSlot: "Manhã (08h às 12h)",
              notes: "",
            });
          }}
          type="button"
          className="text-xs font-medium text-slate-500 hover:text-slate-800 underline underline-offset-4"
        >
          Fazer outro agendamento
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden ${className}`}>
      {/* Header Form Banner */}
      <div className="bg-gradient-to-r from-blue-800 via-sky-700 to-blue-900 p-6 sm:p-8 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-xs">
            <Calendar className="w-3.5 h-3.5" />
            Atendimento Rápido & Descomplicado
          </span>
          <span className="text-xs text-blue-200">
            Av. Kakogawa, 1244 - Maringá
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Agendar Consulta ou Procedimento
        </h3>
        <p className="text-blue-100 text-sm mt-1">
          Preencha abaixo e nossa equipe entrará em contato para confirmar o horário ideal para você e seu pet.
        </p>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Section 1: Tutor Info */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            1. Dados do Tutor / Responsável
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Seu Nome Completo *
              </label>
              <input
                type="text"
                required
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                placeholder="Ex: João da Silva"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp / Celular com DDD *
              </label>
              <input
                type="tel"
                required
                value={formData.ownerPhone}
                onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                placeholder="(44) 99999-9999"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              E-mail para Confirmação (Opcional)
            </label>
            <input
              type="email"
              value={formData.ownerEmail}
              onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
              placeholder="exemplo@email.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-hidden"
            />
          </div>
        </div>

        {/* Section 2: Pet Info */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Heart className="w-4 h-4 text-blue-600" />
            2. Informações do Paciente Pet
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome do Pet *
              </label>
              <input
                type="text"
                required
                value={formData.petName}
                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                placeholder="Ex: Thor, Mel, Mia"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Espécie *
              </label>
              <select
                value={formData.petSpecies}
                onChange={(e) => setFormData({ ...formData, petSpecies: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white outline-hidden"
              >
                <option value="Cão">Cão (Cachorro)</option>
                <option value="Gato">Gato (Felino)</option>
                <option value="Outro/Silvestre">Outro Animal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Raça / Porte
              </label>
              <input
                type="text"
                value={formData.petBreed}
                onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
                placeholder="Ex: SRD (Vira-lata), Golden, Shih Tzu"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Service & Urgency */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            3. Serviço e Preferência de Horário
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Serviço Desejado *
              </label>
              <select
                required
                value={formData.serviceRequested}
                onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white outline-hidden"
              >
                {SERVICES_LIST.map((srv) => (
                  <option key={srv.id} value={srv.name}>
                    {srv.name}
                  </option>
                ))}
                <option value="Retorno / Avaliação">Retorno / Avaliação Médica</option>
                <option value="Outro Serviço">Outro / Tirar Dúvidas</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nível de Urgência
              </label>
              <select
                value={formData.urgencyLevel}
                onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white outline-hidden"
              >
                <option value="Rotina">Rotina / Preventivo (Próximos dias)</option>
                <option value="Urgente">Urgente (Preciso de encaixe hoje)</option>
                <option value="Emergência Imediata">Emergência Imediata</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Unidade de Preferência
            </label>
            <select
              value={formData.preferredUnit}
              onChange={(e) => setFormData({ ...formData, preferredUnit: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white outline-hidden"
            >
              <option value="Maringá (Av. Kakogawa, 1244 - 24h)">
                Maringá - Av. Kakogawa, 1244 (Atendimento 24h)
              </option>
              <option value="Sarandi (Av. Brasil, 684)">
                Sarandi - Av. Brasil, 684 (Seg a Sáb, 08h30-18h)
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Data Preferencial
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Período Preferencial
              </label>
              <select
                value={formData.preferredTimeSlot}
                onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white outline-hidden"
              >
                <option value="Manhã (08h às 12h)">Manhã (08:00 às 12:00)</option>
                <option value="Tarde (13h às 19h)">Tarde (13:00 às 19:00)</option>
                <option value="Sábado (08h às 13h)">Sábado (08:00 às 13:00)</option>
                <option value="Primeiro Horário Disponível">Primeiro Horário Disponível</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Observações, Sintomas ou Motivo da Visita
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Ex: Pet está coçando a orelha há 2 dias, necessita de vacina anual, etc."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-hidden"
            />
          </div>
        </div>

        {/* Security & Submission */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Nossa recepção responde com rapidez para confirmação.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-700/20 hover:shadow-lg transition-all disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processando...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Confirmar e Enviar Agendamento</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
