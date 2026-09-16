"use client";

import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Car,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Phone,
  Share2,
  MessageCircle,
} from "lucide-react";
import { CLINIC_UNITS } from "@/lib/clinic-data";

export function LocationDirections() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyAddress = async (id: string, full: string) => {
    try {
      await navigator.clipboard.writeText(full);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Top Header */}
      <div className="bg-slate-900 p-6 sm:p-8 text-white">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-2">
          <MapPin className="w-3.5 h-3.5" />
          Duas Unidades para Melhor Atender Você e Seu Pet
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Nossas Unidades em Maringá e Sarandi
        </h3>
        <p className="text-slate-300 text-sm mt-1">
          Escolha a unidade mais próxima. Em Maringá o atendimento é 24 horas, todos os dias.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CLINIC_UNITS.map((unit) => (
            <div
              key={unit.id}
              className={`rounded-3xl border p-6 space-y-4 flex flex-col justify-between ${
                unit.isEmergency24h
                  ? "border-blue-300 bg-blue-50/50 ring-1 ring-blue-200"
                  : "border-slate-200 bg-slate-50/60"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{unit.name}</h4>
                      <p className="text-xs text-slate-500">{unit.city} - PR</p>
                    </div>
                  </div>

                  {unit.isEmergency24h && (
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-600 text-white animate-pulse">
                      24 Horas
                    </span>
                  )}
                </div>

                {/* Address */}
                <div className="flex items-start gap-2.5 text-sm">
                  <Navigation className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">{unit.address.street}</p>
                    <p className="text-xs text-slate-600">{unit.address.neighborhood}</p>
                    <p className="text-xs text-slate-600">
                      {unit.city} - PR, {unit.address.postalCode}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-2.5 text-sm">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">{unit.hoursLabel}</p>
                    <p className="text-xs text-slate-600">{unit.hoursDetail}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2.5 text-sm">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                    <span className="font-semibold text-slate-900">{unit.phone}</span>
                    <span className="text-xs text-blue-700 font-semibold">WhatsApp: {unit.whatsapp}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => copyAddress(unit.id, unit.address.full)}
                    type="button"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                  >
                    {copiedId === unit.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-blue-700">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copiar Endereço</span>
                      </>
                    )}
                  </button>

                  <a
                    href={unit.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-pink-600" />
                    <span>Instagram</span>
                  </a>
                </div>

                <div className="flex gap-2">
                  <a
                    href={unit.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Fotos e rota no Maps</span>
                  </a>
                  <a
                    href={unit.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facilities note */}
        <div className="mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 flex items-start gap-3">
          <Car className="w-5 h-5 text-blue-600 shrink-0" />
          <span>
            <strong>Fácil acesso:</strong> ambas as unidades ficam em avenidas de grande fluxo, com localização estratégica. A unidade de <strong>Maringá</strong> conta com plantão <strong>24 horas</strong> para emergências a qualquer momento do dia ou da noite.
          </span>
        </div>
      </div>
    </div>
  );
}
