"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, AlertTriangle, X } from "lucide-react";
import { CLINIC_INFO } from "@/lib/clinic-data";

export function FloatingActions() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside aria-label="Ações rápidas de contato e emergência" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Tooltip Popup for Conversion */}
      {showTooltip && (
        <div className="pointer-events-auto bg-white text-slate-900 px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-3 text-xs animate-bounce max-w-[280px]">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-slate-900">Precisa de atendimento?</p>
            <p className="text-slate-600 text-[11px]">Chame nossa recepção no WhatsApp!</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            type="button"
            className="text-slate-400 hover:text-slate-700 p-0.5 rounded-md focus:outline-hidden"
            aria-label="Fechar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Quick Emergency Button */}
        <Link
          href="/emergencia"
          className="group flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-3 rounded-full shadow-lg shadow-rose-600/30 transition-all hover:scale-105 active:scale-95"
          title="Urgência & Plantão"
        >
          <AlertTriangle className="w-5 h-5 animate-pulse shrink-0" />
          <span className="text-xs font-bold hidden sm:inline-block pr-1">Triagem / Urgência</span>
        </Link>

        {/* WhatsApp Button */}
        <a
          href={CLINIC_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3.5 rounded-full shadow-xl shadow-blue-700/30 transition-all hover:scale-105 active:scale-95"
          aria-label="Conversar no WhatsApp da Inuvet"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-white text-blue-600" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-400 rounded-full ring-2 ring-blue-600 animate-pulse" />
          </div>
          <span className="font-semibold text-sm hidden md:inline-block">
            WhatsApp
          </span>
        </a>
      </div>
    </aside>
  );
}
