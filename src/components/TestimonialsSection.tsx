import React from "react";
import { Star, CheckCircle, Quote, Heart } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/lib/clinic-data";

export function TestimonialsSection() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          Avaliações de Tutores em Maringá
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Quem Ama Seu Pet Confia na Inuvet
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          A tranquilidade de quem encontrou acolhimento, precisão médica e respeito inegociável pelo bem-estar animal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TESTIMONIALS_DATA.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative"
          >
            <div>
              {/* Stars */}
              <div className="flex items-center gap-1 mb-3 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.author}</h4>
                  <p className="text-xs text-blue-700 font-medium">{t.pet}</p>
                </div>
                <span className="text-[10px] text-slate-400">{t.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
