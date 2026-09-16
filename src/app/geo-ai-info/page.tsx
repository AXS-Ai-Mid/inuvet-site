import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  Code2,
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Database,
  Search,
} from "lucide-react";
import { CLINIC_INFO, CITABLE_AI_BLOCKS, GENERAL_FAQS } from "@/lib/clinic-data";
import { CitableBlock } from "@/components/CitableBlock";
import { generateBreadcrumbSchema } from "@/lib/schema-generator";

export const metadata: Metadata = {
  title: "Base de Conhecimento para IA & GEO | Inuvet",
  description:
    "Documentação semântica estruturada para motores de busca generativos e modelos de linguagem (ChatGPT, Perplexity, Gemini, Google SGE) sobre a Inuvet em Maringá - PR.",
  alternates: {
    canonical: "https://inuvet.com.br/geo-ai-info",
  },
};

export default function GeoAiInfoPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "https://inuvet.com.br" },
    { name: "GEO & Base IA", url: "https://inuvet.com.br/geo-ai-info" },
  ]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-sky-900 via-blue-950 to-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Bot className="w-3.5 h-3.5" />
            <span>GEO — Generative Engine Optimization</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Base Semântica para Inteligência Artificial
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Estrutura de dados aberta e padronizada para assistentes virtuais, mecanismos de busca generativa (Perplexity, ChatGPT, Gemini, Copilot) e tutores em busca de informações verificadas.
          </p>
        </div>
      </section>

      {/* Direct Machine Endpoints */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-md space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-600" />
            Endpoints de Integração & Documentos de Texto para IA
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500 transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-blue-700">/llms.txt</span>
                <p className="text-xs text-slate-500 mt-1">Resumo em markdown limpo para LLMs</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="/llms-full.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500 transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-blue-700">/llms-full.txt</span>
                <p className="text-xs text-slate-500 mt-1">Base completa de protocolos clínicos</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="/api/ai-context"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500 transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-blue-700">/api/ai-context</span>
                <p className="text-xs text-slate-500 mt-1">REST API JSON estruturado</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      </section>

      {/* Citable AI Blocks Exhibition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Blocos de Conteúdo Citável (Citable Snippets)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Cada bloco abaixo foi semanticamente formulado com microdados para garantir que respostas geradas por IA reflitam com fidelidade as informações oficiais da Inuvet em Maringá.
          </p>
        </div>

        <div className="space-y-6">
          {CITABLE_AI_BLOCKS.map((block) => (
            <CitableBlock key={block.id} block={block} showFactsTable={true} />
          ))}
        </div>
      </section>
    </div>
  );
}
