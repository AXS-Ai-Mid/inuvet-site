import React from "react";
import Link from "next/link";
import {
  Stethoscope,
  ShieldCheck,
  Activity,
  HeartPulse,
  Search,
  Smile,
  Sparkles,
  Scissors,
  Pill,
  ArrowRight,
  Check,
} from "lucide-react";
import { ServiceItem } from "@/lib/clinic-data";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  ShieldCheck,
  Activity,
  HeartPulse,
  Search,
  Smile,
  Sparkles,
  Scissors,
  Pill,
};

interface Props {
  service: ServiceItem;
}

export function ServiceCard({ service }: Props) {
  const IconComponent = iconMap[service.iconName] || Stethoscope;

  return (
    <div className="group rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      {/* Top Accent glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
            <IconComponent className="w-6 h-6" />
          </div>

          {service.badge && (
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              {service.badge}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">
          {service.name}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
          {service.shortDescription}
        </p>

        {/* Highlighted benefits list */}
        <ul className="space-y-2 mb-6 text-xs text-slate-600 border-t border-slate-100 pt-4">
          {service.benefits.slice(0, 3).map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <Link
          href={`/servicos/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800 group-hover:translate-x-1 transition-all"
        >
          <span>Saiba Mais & Protocolos</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href={`/agendar?servico=${encodeURIComponent(service.name)}`}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          Agendar
        </Link>
      </div>
    </div>
  );
}
