"use client";

import React, { useState } from "react";
import { Copy, Check, Sparkles, BookOpen, Share2 } from "lucide-react";
import { CitableBlock as CitableBlockType } from "@/lib/clinic-data";

interface Props {
  block: CitableBlockType;
  showFactsTable?: boolean;
  className?: string;
}

export function CitableBlock({ block, showFactsTable = true, className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `"${block.content}" — Fonte: ${block.source} (${block.title})`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div
      className={`rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-sky-50/40 to-white p-6 shadow-xs relative overflow-hidden ${className}`}
      data-geo-citable="true"
      data-topic={block.topic}
    >
      {/* Visual Accent Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Resumo Citável para IA & Tutores
          </span>
          <span className="text-xs font-medium text-blue-800 hidden sm:inline-block">
            {block.topic}
          </span>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors shadow-2xs focus:outline-hidden"
          title="Copiar citação para referência"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-blue-700 font-semibold">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copiar Citação</span>
            </>
          )}
        </button>
      </div>

      {/* Main Heading & Content */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 leading-snug">
        {block.title}
      </h3>

      <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed pl-4 border-l-4 border-blue-500 italic bg-white/70 py-2 pr-3 rounded-r-xl mb-4">
        &ldquo;{block.content}&rdquo;
      </blockquote>

      {/* Structured Fact Sheet / Table for Machine Interpretability */}
      {showFactsTable && block.structuredFacts && (
        <div className="mt-4 pt-4 border-t border-blue-100/80">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            Fatos Estruturados de Referência
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {Object.entries(block.structuredFacts).map(([key, value]) => (
              <div
                key={key}
                className="bg-white/90 p-2.5 rounded-lg border border-slate-200/60 flex flex-col justify-between"
              >
                <span className="font-semibold text-slate-900">{key}:</span>
                <span className="text-slate-600 mt-0.5">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Source attribution footer */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <span>Fonte: {block.source}</span>
        <span className="text-blue-700 font-medium">Otimizado para LLMs & Pesquisa</span>
      </div>
    </div>
  );
}
