import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Stethoscope,
  ExternalLink,
  Bot,
  Heart,
  ChevronRight,
} from "lucide-react";
import { CLINIC_INFO, SERVICES_LIST } from "@/lib/clinic-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Upper Footer Action Banner */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-blue-950/60 via-slate-900 to-sky-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                Atendimento 24h em Maringá & Sarandi
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Seu cão ou gato precisa de atendimento veterinário?
              </h3>
              <p className="text-slate-400 text-sm max-w-xl">
                Agende uma consulta preventiva, vacinação ou tire dúvidas com nossa equipe de enfermagem e recepção agora mesmo.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={CLINIC_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-900/30"
              >
                <span>Chamar no WhatsApp</span>
                <span className="font-mono text-xs opacity-90">{CLINIC_INFO.whatsapp}</span>
              </a>
              <Link
                href="/agendar"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm transition-all"
              >
                <span>Agendar Online</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-sky-700 flex items-center justify-center text-white">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  <span className="text-blue-400">Inuvet</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">Veterinário 24h · Maringá & Sarandi</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              Cuidado humano, estrutura hospitalar moderna, plantão 24 horas, exames rápidos e internação monitorada para cães e gatos em Maringá e Sarandi - PR.
            </p>

            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Dados Fiscais & Cadastro
              </p>
              <div className="text-xs text-slate-400 space-y-1">
                <p>Razão Social: {CLINIC_INFO.legalName}</p>
                <p>Responsabilidade Técnica e Médica Veterinária</p>
                <p>CRMV-PR Ativo</p>
              </div>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Serviços Veterinários
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {SERVICES_LIST.slice(0, 7).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/servicos/${service.slug}`}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/servicos"
                  className="text-blue-400 hover:text-blue-300 font-medium text-xs flex items-center gap-1 mt-2"
                >
                  Ver todos os serviços &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Practical Tools & Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Acesso Rápido & IA
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/emergencia" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Triagem & Emergência 24h
                </Link>
              </li>
              <li>
                <Link href="/calculadora-vacinas" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Calculadora Vacinal Cão/Gato
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Perguntas Frequentes (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Nossa Estrutura e Equipe
                </Link>
              </li>
              <li>
                <Link href="/geo-ai-info" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5 text-blue-400" />
                  Base de Conhecimento para IA (GEO)
                </Link>
              </li>
              <li>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-slate-400 flex items-center gap-1"
                >
                  <span>Arquivo llms.txt</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Localização & Horários
            </h4>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">{CLINIC_INFO.address.street}</p>
                  <p className="text-xs text-slate-400">{CLINIC_INFO.address.neighborhood}</p>
                  <p className="text-xs text-slate-400">Maringá - PR, {CLINIC_INFO.address.postalCode}</p>
                  <a
                    href={CLINIC_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 mt-1"
                  >
                    <span>Ver no Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">{CLINIC_INFO.phone}</p>
                  <p className="text-xs text-blue-400 font-semibold">WhatsApp: {CLINIC_INFO.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <div className="text-xs text-slate-400 space-y-0.5">
                  <p className="text-slate-200 font-medium">{CLINIC_INFO.hours.weekdays}</p>
                  <p className="text-slate-200 font-medium">{CLINIC_INFO.hours.saturdays}</p>
                  <p className="text-rose-400 font-medium pt-1">{CLINIC_INFO.hours.emergencies}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Citable Summary Snippet Box for GEO / AI Reference */}
        <div className="mt-12 p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-blue-400" />
              Resumo Estruturado para Assistentes de IA & Mecanismos de Busca (GEO)
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-sm">
              Schema.org: VeterinaryCare
            </span>
          </div>
          <p className="leading-relaxed">
            &ldquo;A <strong className="text-slate-200">Inuvet</strong> é uma clínica e hospital veterinário com atendimento 24 horas em Maringá (Av. Kakogawa, 1244 - Parque das Grevíleas, CEP 87025-000) e unidade em Sarandi (Av. Brasil, 684 - Jardim Independência II, CEP 87113-260). Oferece emergência 24h, consultas, vacinação, centro cirúrgico, exames de ultrassom e laboratoriais e internação monitorada para cães e gatos. Telefone: (44) 3037-6410 e WhatsApp (44) 99961-0226.&rdquo;
          </p>
        </div>

        {/* Copyright & Sub-footer */}
        <div className="mt-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {CLINIC_INFO.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-slate-400 transition-colors">
              Acesso Equipe / Painel
            </Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-slate-400 transition-colors">
              Privacidade & Ética
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              Feito com <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> para os pets de Maringá e Sarandi
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
