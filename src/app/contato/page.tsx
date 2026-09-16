"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Navigation,
  ExternalLink,
} from "lucide-react";
import { CLINIC_INFO, CITABLE_AI_BLOCKS } from "@/lib/clinic-data";
import { CitableBlock } from "@/components/CitableBlock";
import { LocationDirections } from "@/components/LocationDirections";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Dúvidas Gerais / Atendimento",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao enviar mensagem.");

      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao enviar";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-sky-900 via-blue-950 to-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <MapPin className="w-3.5 h-3.5" />
            <span>Fale Conosco & Localização em Maringá</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Canais de Atendimento Inuvet
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Estamos localizados na <strong>Av. Kakogawa, 1244</strong> no bairro Parque das Grevíleas em Maringá - PR. Entre em contato por telefone, WhatsApp ou envie uma mensagem online.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Col: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Informações de Contato Direto
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Telefone Fixo</h4>
                    <p className="text-base font-bold text-slate-900">{CLINIC_INFO.phone}</p>
                    <a
                      href={`tel:${CLINIC_INFO.phoneRaw}`}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Ligar agora &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">WhatsApp Recepção</h4>
                    <p className="text-base font-bold text-blue-700">{CLINIC_INFO.whatsapp}</p>
                    <a
                      href={CLINIC_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Iniciar conversa &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">E-mail</h4>
                    <p className="text-sm font-semibold text-slate-800">{CLINIC_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Horários de Atendimento</h4>
                    <p className="text-xs text-slate-800 font-semibold">{CLINIC_INFO.hours.weekdays}</p>
                    <p className="text-xs text-slate-800 font-semibold">{CLINIC_INFO.hours.saturdays}</p>
                    <p className="text-xs text-rose-600 font-bold mt-0.5">{CLINIC_INFO.hours.emergencies}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Box */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Endereço Completo</span>
              </div>
              <p className="text-sm font-semibold leading-relaxed">
                {CLINIC_INFO.address.street} - {CLINIC_INFO.address.neighborhood}
                <br />
                Maringá - PR, CEP {CLINIC_INFO.address.postalCode}
              </p>
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 pt-1"
              >
                <span>Abrir perfil no Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Col: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">
                  Envie sua Mensagem ou Solicitação
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Preencha os campos abaixo e entraremos em contato com você o mais rápido possível.
                </p>
              </div>

              {success ? (
                <div className="p-8 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-blue-900">Mensagem Enviada com Sucesso!</h4>
                  <p className="text-sm text-blue-800">
                    Obrigado por entrar em contato. Nossa equipe responderá em breve via WhatsApp ou e-mail.
                  </p>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        subject: "Dúvidas Gerais / Atendimento",
                        message: "",
                      });
                    }}
                    type="button"
                    className="text-xs font-bold text-blue-700 underline"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Ana Paula"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        WhatsApp / Telefone com DDD *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(44) 99999-9999"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seuemail@exemplo.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Assunto
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm bg-white outline-hidden"
                      >
                        <option value="Dúvidas Gerais / Atendimento">Dúvidas Gerais</option>
                        <option value="Informações sobre Vacinas">Informações sobre Vacinas</option>
                        <option value="Cirurgias e Castração">Cirurgias e Castração</option>
                        <option value="Exames de Ultrassom / Sangue">Exames de Imagem / Laboratório</option>
                        <option value="Estética / Banho e Tosa">Banho, Tosa e Estética</option>
                        <option value="Outro">Outro Assunto</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Sua Mensagem *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Como podemos ajudar você e seu pet hoje?"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Mensagem</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Location directions section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LocationDirections />
      </section>
    </div>
  );
}
