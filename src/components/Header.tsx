"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Clock,
  MapPin,
  Menu,
  X,
  Calendar,
  AlertTriangle,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { CLINIC_INFO } from "@/lib/clinic-data";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/servicos", label: "Serviços" },
    { href: "/emergencia", label: "Emergência & Triagem", badge: "Plantão" },
    { href: "/calculadora-vacinas", label: "Calculadora de Vacinas" },
    { href: "/sobre", label: "A Clínica" },
    { href: "/faq", label: "Dúvidas & FAQ" },
    { href: "/contato", label: "Contato & Local" },
  ];

  return (
    <header className="w-full z-50 sticky top-0 bg-white/95 backdrop-blur-md transition-all duration-200 border-b border-slate-200/80 shadow-xs">
      {/* Top Bar for Trust, Location and Contact */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center flex-wrap gap-4">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse inline-block" />
              Maringá & Sarandi - PR
            </span>
            <a
              href={CLINIC_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors text-slate-300"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate max-w-[280px] sm:max-w-none">
                Av. Kakogawa, 1244 - Parque das Grevíleas
              </span>
            </a>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              Maringá 24h | Sarandi: Seg-Sáb 08h30-18h
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="hidden sm:flex items-center gap-1 hover:text-blue-300 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              {CLINIC_INFO.phone}
            </a>
            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-0.5 rounded-full font-medium transition-colors shadow-xs"
            >
              <span>WhatsApp:</span>
              <span className="font-semibold">{CLINIC_INFO.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-hidden">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-700 via-blue-600 to-sky-900 flex items-center justify-center text-white shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-blue-600 leading-tight">
                  Inuvet
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <span>Veterinário 24h</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-blue-700 font-medium">Maringá & Sarandi</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    isActive
                      ? "text-blue-700 bg-blue-50 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/emergencia"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>Plantão / Urgência</span>
            </Link>
            <Link
              href="/agendar"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-md shadow-blue-700/20 hover:shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Consulta</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/agendar"
              className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-600 text-white text-xs font-medium sm:hidden"
            >
              <Calendar className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Menu principal"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "text-blue-700 bg-blue-50 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold uppercase">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <Link
              href="/agendar"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Consulta / Procedimento</span>
            </Link>

            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 font-semibold text-sm"
            >
              <span>Conversar pelo WhatsApp</span>
            </a>

            <div className="text-center pt-2 text-xs text-slate-500">
              <p className="font-medium text-slate-700">{CLINIC_INFO.address.street}</p>
              <p>{CLINIC_INFO.address.neighborhood} - Maringá / PR</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
