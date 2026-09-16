import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  PawPrint,
  Share2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { CLINIC_UNITS } from "@/lib/clinic-data";

const familyStories = [
  {
    src: "/images/humanizado/familia-com-cachorro.jpg",
    alt: "Família reunida com seu cachorro em um momento de carinho em casa",
    eyebrow: "Família é presença",
    title: "Eles participam de cada momento",
    description:
      "Do primeiro dia em casa à fase sênior, acompanhamos a história de cada pet com escuta, respeito e cuidado contínuo.",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/humanizado/bebe-com-cachorro.jpg",
    alt: "Bebê sorrindo ao lado do cachorro da família em casa",
    eyebrow: "Vínculos desde cedo",
    title: "Crescer juntos faz bem",
    description:
      "Prevenção e orientação veterinária ajudam crianças e animais a compartilharem uma rotina segura e cheia de afeto.",
    className: "",
  },
  {
    src: "/images/humanizado/casal-com-cachorro.jpg",
    alt: "Casal idoso aproveitando um momento acolhedor com seu cachorro",
    eyebrow: "Companheirismo",
    title: "Cuidado em todas as fases",
    description:
      "Atenção especial para pets idosos, com check-ups e acompanhamento que priorizam conforto e qualidade de vida.",
    className: "",
  },
];

export function HumanizedCareSection() {
  return (
    <section className="space-y-10" aria-labelledby="cuidado-familia-title">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            Cuidamos como se fosse da nossa família
          </span>
          <h2
            id="cuidado-familia-title"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900"
          >
            Medicina veterinária começa com uma relação de confiança
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            Sabemos que seu pet não é “só um animal”. Ele ocupa espaço no sofá,
            aparece nas fotos, conhece sua rotina e faz parte das melhores memórias.
            Na Inuvet, conhecimento técnico e estrutura hospitalar caminham junto com
            acolhimento, conversa clara e atenção aos detalhes.
          </p>
        </div>

        <div className="lg:col-span-4 flex lg:justify-end">
          <div className="inline-flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Cada família é única</p>
              <p className="text-xs text-slate-500">Cada plano de cuidado também.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Family photography mosaic */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[580px]">
        {familyStories.map((story) => (
          <article
            key={story.src}
            className={`group relative min-h-[310px] md:min-h-0 overflow-hidden rounded-3xl bg-slate-900 ${story.className}`}
          >
            <Image
              src={story.src}
              alt={story.alt}
              fill
              sizes={
                story.className
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 768px) 100vw, 25vw"
              }
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-300 mb-1.5">
                {story.eyebrow}
              </p>
              <h3 className="text-lg sm:text-xl font-bold leading-tight">{story.title}</h3>
              <p className="text-xs text-slate-200 leading-relaxed mt-2 max-w-lg">
                {story.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Official brand photography + real team channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 relative min-h-[330px] rounded-3xl overflow-hidden bg-rose-50 border border-rose-100">
          <Image
            src="/images/inuvet-hero.jpg"
            alt="Imagem conceitual de atendimento veterinário acolhedor para cães e gatos"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
          <div className="absolute left-4 bottom-4 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 backdrop-blur-sm shadow-md text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Imagem conceitual de atendimento acolhedor
          </div>
        </div>

        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-950 text-white flex flex-col justify-between gap-7">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-300">
              <PawPrint className="w-4 h-4" />
              Conheça a rotina e a equipe real
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Bastidores de cuidado nas duas unidades
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              Nos perfis oficiais da Inuvet você acompanha a equipe, pacientes,
              estrutura, orientações preventivas e o dia a dia das unidades de
              Maringá e Sarandi. É a forma mais transparente de conhecer quem vai
              cuidar do seu melhor amigo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CLINIC_UNITS.map((unit) => (
              <a
                key={unit.id}
                href={unit.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-rose-500 to-amber-400 flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Equipe {unit.city}</p>
                      <p className="text-[11px] text-slate-400">
                        {unit.id === "maringa"
                          ? "@clinicainuvetmaringa"
                          : "@clinicainuvetsarandi"}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  Fotos reais da equipe, clínica e pacientes no Instagram oficial.
                </p>
              </a>
            ))}
          </div>

          <Link
            href="/sobre"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200 transition-colors self-start"
          >
            Conheça nossa estrutura e nossos valores
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 text-center">
        Fotografias de famílias: acervo editorial Pexels. Imagem da pata felina:
        acervo institucional público da Inuvet. Fotos da equipe estão disponíveis
        nos perfis oficiais indicados acima.
      </p>
    </section>
  );
}
