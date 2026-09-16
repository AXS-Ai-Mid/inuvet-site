import React from "react";
import Link from "next/link";
import { AlertTriangle, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { CLINIC_INFO } from "@/lib/clinic-data";

export function EmergencyBanner() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-rose-900 text-white p-6 sm:p-10 shadow-xl border border-rose-800/40 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-rose-500/30 text-rose-300 border border-rose-500/40 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping inline-block" />
            Plantão de Urgência & Suporte Intensivo
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Seu pet está em situação de emergência agora?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl">
            Convulsões, atropelamentos, vômito severo ou dificuldade respiratória? Não perca tempo. Avise nossa equipe médica e dirija-se à clínica.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-rose-200 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {CLINIC_INFO.address.street} - Maringá
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Suporte com Centro Cirúrgico & Oxigênio
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto shrink-0">
          <a
            href={`tel:${CLINIC_INFO.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-950/50 transition-all hover:scale-105"
          >
            <Phone className="w-4 h-4 animate-bounce" />
            <span>Ligar Imediatamente: {CLINIC_INFO.phone}</span>
          </a>

          <a
            href={`https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${encodeURIComponent(
              "🚨 *URGÊNCIA VETERINÁRIA* - Meu pet está passando mal e preciso de atendimento imediato!"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-950/50 transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-white text-blue-600" />
            <span>WhatsApp de Urgência</span>
          </a>

          <Link
            href="/emergencia"
            className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
          >
            <span>Ver Triagem Online</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
