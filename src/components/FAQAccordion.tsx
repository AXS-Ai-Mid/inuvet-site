"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, Search, HelpCircle, MessageCircle, Sparkles, Copy, Check } from "lucide-react";
import { FAQItem, GENERAL_FAQS, CLINIC_INFO } from "@/lib/clinic-data";

interface Props {
  initialFaqs?: FAQItem[];
  showSearch?: boolean;
  limit?: number;
}

export function FAQAccordion({ initialFaqs = GENERAL_FAQS, showSearch = true, limit }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [openItems, setOpenItems] = useState<string[]>([initialFaqs[0]?.id || ""]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(initialFaqs.map((f) => f.category)));
    return ["Todas", ...cats];
  }, [initialFaqs]);

  const filteredFaqs = useMemo(() => {
    let list = initialFaqs;

    if (selectedCategory !== "Todas") {
      list = list.filter((f) => f.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q) ||
          f.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }

    if (limit && !searchQuery.trim() && selectedCategory === "Todas") {
      return list.slice(0, limit);
    }

    return list;
  }, [initialFaqs, selectedCategory, searchQuery, limit]);

  const toggleItem = (id: string) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((i) => i !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  const copyAnswer = async (faq: FAQItem) => {
    try {
      await navigator.clipboard.writeText(`"${faq.citableAnswer}" — Fonte: Clínica Inuvet (${CLINIC_INFO.website})`);
      setCopiedId(faq.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Categories Bar */}
      {showSearch && (
        <div className="space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquise sua dúvida (ex: vacina, castração, emergência, ultrassom)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-white shadow-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-hidden"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Accordion items */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl p-6">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-700 font-semibold text-base">Nenhuma resposta encontrada para sua pesquisa.</p>
            <p className="text-slate-500 text-xs mt-1">
              Fale direto com nossos veterinários no WhatsApp para tirar qualquer dúvida:
            </p>
            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp ({CLINIC_INFO.whatsapp})</span>
            </a>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openItems.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-white border-blue-300/80 shadow-md ring-1 ring-blue-200"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
                data-faq-item="true"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                      ?
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-blue-700 block mb-0.5">
                        {faq.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h4>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 animate-in fade-in duration-200">
                    <p className="text-sm text-slate-700 leading-relaxed pl-9">
                      {faq.answer}
                    </p>

                    {/* Citable summary box for quick reference / AI */}
                    <div className="ml-9 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-900 block">
                            Resposta Rápida & Citável (GEO):
                          </span>
                          <span className="text-slate-600">{faq.citableAnswer}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => copyAnswer(faq)}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shrink-0 font-medium text-[11px]"
                      >
                        {copiedId === faq.id ? (
                          <>
                            <Check className="w-3 h-3 text-blue-600" />
                            <span>Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-500" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
