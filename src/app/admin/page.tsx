"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Mail,
  User,
  Heart,
  Search,
  Filter,
  Layers,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { CLINIC_INFO } from "@/lib/clinic-data";

interface Appointment {
  id: number;
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string | null;
  petName: string;
  petSpecies: string;
  petBreed?: string | null;
  serviceRequested: string;
  urgencyLevel: string;
  preferredDate?: string | null;
  preferredTimeSlot?: string | null;
  notes?: string | null;
  status: string;
  createdAt: string;
}

interface Triage {
  id: number;
  petName: string;
  petSpecies: string;
  symptomsSelected: string;
  urgencyScore: string;
  ownerPhone?: string | null;
  recommendation: string;
  createdAt: string;
}

interface ContactMsg {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

interface VaccineLead {
  id: number;
  ownerName?: string | null;
  ownerPhone: string;
  petName: string;
  petSpecies: string;
  scheduledVaccines?: string | null;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"appointments" | "triages" | "messages" | "vaccines">("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [triages, setTriages] = useState<Triage[]>([]);
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [vaccines, setVaccines] = useState<VaccineLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resApp, resTri, resMsg, resVac] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/triage"),
        fetch("/api/contact"),
        fetch("/api/vaccine-lead"),
      ]);

      const dataApp = await resApp.json();
      const dataTri = await resTri.json();
      const dataMsg = await resMsg.json();
      const dataVac = await resVac.json();

      if (dataApp.appointments) setAppointments(dataApp.appointments);
      if (dataTri.triages) setTriages(dataTri.triages);
      if (dataMsg.messages) setMessages(dataMsg.messages);
      if (dataVac.leads) setVaccines(dataVac.leads);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateAppointmentStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setAppointments((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredAppointments = appointments.filter((app) => {
    const matchesStatus = statusFilter === "Todos" || app.status === statusFilter;
    const matchesSearch =
      searchTerm === "" ||
      app.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.ownerPhone.includes(searchTerm) ||
      app.serviceRequested.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Painel da Recepção & Equipe</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Gestão de Agendamentos e Triagens
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Controle em tempo real de pacientes que solicitaram atendimento pelo site da Inuvet.
          </p>
        </div>

        <button
          onClick={fetchData}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Atualizar Dados</span>
        </button>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <p className="text-xs font-bold text-slate-500 uppercase">Total de Agendamentos</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{appointments.length}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-amber-200 bg-amber-50/40 shadow-2xs">
          <p className="text-xs font-bold text-amber-700 uppercase">Pendentes de Confirmação</p>
          <p className="text-2xl font-extrabold text-amber-900 mt-1">
            {appointments.filter((a) => a.status === "Pendente").length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-rose-200 bg-rose-50/40 shadow-2xs">
          <p className="text-xs font-bold text-rose-700 uppercase">Triagens de Urgência</p>
          <p className="text-2xl font-extrabold text-rose-900 mt-1">{triages.length}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-blue-200 bg-blue-50/40 shadow-2xs">
          <p className="text-xs font-bold text-blue-700 uppercase">Lembretes Vacinais</p>
          <p className="text-2xl font-extrabold text-blue-900 mt-1">{vaccines.length}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        {[
          { key: "appointments", label: "Pré-Agendamentos", count: appointments.length },
          { key: "triages", label: "Triagens / Urgências", count: triages.length },
          { key: "messages", label: "Mensagens de Contato", count: messages.length },
          { key: "vaccines", label: "Leads Vacinação", count: vaccines.length },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`pb-3 px-4 text-xs font-bold whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.key ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-600"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* TAB 1: APPOINTMENTS */}
      {activeTab === "appointments" && (
        <div className="space-y-4">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por tutor, pet ou serviço..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-500">Status:</span>
              {["Todos", "Pendente", "Confirmado", "Atendido", "Cancelado"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    statusFilter === st
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table / List */}
          {filteredAppointments.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 font-bold text-sm">Nenhum agendamento encontrado.</p>
              <p className="text-slate-400 text-xs mt-1">
                Novos agendamentos feitos pelos tutores aparecerão aqui instantaneamente.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAppointments.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-sm transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-slate-900">{app.petName}</span>
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                          {app.petSpecies} {app.petBreed ? `(${app.petBreed})` : ""}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            app.urgencyLevel === "Emergência Imediata"
                              ? "bg-rose-100 text-rose-700"
                              : app.urgencyLevel === "Urgente"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {app.urgencyLevel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Tutor(a): <strong className="text-slate-800">{app.ownerName}</strong> • {app.ownerPhone}
                        {app.ownerEmail ? ` • ${app.ownerEmail}` : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={app.status}
                        onChange={(e) => updateAppointmentStatus(app.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-hidden ${
                          app.status === "Pendente"
                            ? "bg-amber-50 text-amber-800 border-amber-300"
                            : app.status === "Confirmado"
                            ? "bg-blue-50 text-blue-800 border-blue-300"
                            : app.status === "Atendido"
                            ? "bg-blue-50 text-blue-800 border-blue-300"
                            : "bg-slate-100 text-slate-600 border-slate-300"
                        }`}
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="Atendido">Atendido</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>

                      <a
                        href={`https://wa.me/55${app.ownerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                          `Olá ${app.ownerName}! Somos da Inuvet (Av. Kakogawa 1244). Recebemos sua solicitação de agendamento para o(a) ${app.petName} (${app.serviceRequested}). Podemos confirmar seu horário?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                        title="Chamar Tutor no WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <strong className="text-slate-900">Serviço:</strong> {app.serviceRequested}
                      {app.preferredDate && (
                        <span>
                          {" "}
                          • <strong>Data:</strong> {app.preferredDate} ({app.preferredTimeSlot})
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Recebido em: {new Date(app.createdAt).toLocaleString("pt-BR")}
                    </span>
                  </div>

                  {app.notes && (
                    <p className="text-xs text-slate-600 italic bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                      <strong>Observações/Sintomas:</strong> {app.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TRIAGES */}
      {activeTab === "triages" && (
        <div className="space-y-3">
          {triages.length === 0 ? (
            <div className="p-10 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
              Nenhuma triagem recente registrada.
            </div>
          ) : (
            triages.map((t) => (
              <div key={t.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-slate-900 text-sm">
                    {t.petName} ({t.petSpecies})
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      t.urgencyScore.includes("Emergência")
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {t.urgencyScore}
                  </span>
                </div>
                <p className="text-xs text-slate-700">
                  <strong>Sintomas Selecionados:</strong> {t.symptomsSelected}
                </p>
                {t.ownerPhone && (
                  <p className="text-xs text-slate-500">
                    Telefone para contato: <strong>{t.ownerPhone}</strong>
                  </p>
                )}
                <span className="text-[11px] text-slate-400 block pt-1">
                  {new Date(t.createdAt).toLocaleString("pt-BR")}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: MESSAGES */}
      {activeTab === "messages" && (
        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="p-10 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
              Nenhuma mensagem de contato registrada.
            </div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{m.name}</span>
                    <span className="text-xs text-slate-500 ml-2">({m.phone})</span>
                  </div>
                  <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                    {m.subject}
                  </span>
                </div>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {m.message}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{m.email || "Sem e-mail"}</span>
                  <span>{new Date(m.createdAt).toLocaleString("pt-BR")}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: VACCINES */}
      {activeTab === "vaccines" && (
        <div className="space-y-3">
          {vaccines.length === 0 ? (
            <div className="p-10 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
              Nenhum lembrete vacinal cadastrado ainda.
            </div>
          ) : (
            vaccines.map((v) => (
              <div key={v.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {v.petName} ({v.petSpecies})
                  </span>
                  <a
                    href={`https://wa.me/55${v.ownerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                      `Olá! Lembramos que está na hora de planejar o reforço vacinal do seu pet ${v.petName} na Inuvet em Maringá!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[11px]"
                  >
                    Avisar no WhatsApp
                  </a>
                </div>
                <p className="text-slate-600">WhatsApp: {v.ownerPhone}</p>
                {v.scheduledVaccines && (
                  <p className="text-slate-500">Vacinas: {v.scheduledVaccines}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
