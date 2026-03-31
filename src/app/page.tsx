"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { modules } from "@/lib/modules";
import { getModuleProgress } from "@/lib/progress";
import { BookOpen, CheckCircle2, ArrowRight, Brain, Wrench, SearchCheck, GraduationCap, LucideIcon, Bot, BarChart3 } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Wrench,
  SearchCheck,
  GraduationCap,
};

const colorStyles: Record<string, { bg: string; iconBg: string; hover: string; text: string; desc: string }> = {
  red: { bg: "bg-brand-red", iconBg: "bg-white/20", hover: "hover:bg-red-700", text: "text-white", desc: "text-white/80" },
  green: { bg: "bg-brand-green", iconBg: "bg-white/20", hover: "hover:bg-teal-700", text: "text-white", desc: "text-white/80" },
  orange: { bg: "bg-brand-orange", iconBg: "bg-white/20", hover: "hover:bg-orange-600", text: "text-white", desc: "text-white/80" },
  cream: { bg: "bg-brand-cream", iconBg: "bg-brand-orange/20", hover: "hover:bg-orange-100", text: "text-gray-800", desc: "text-gray-600" },
};

export default function HomePage() {
  const { data: session } = useSession();
  const [, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);

  useEffect(() => {
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50">
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero */}
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex items-center gap-3">
              <Bot className="w-9 h-9 text-brand-red" /> Welkom bij AI voor Leerlingen!
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              Ontdek de wereld van kunstmatige intelligentie in 4 modules. Leer wat AI is,
              ontdek handige tools, gebruik AI slim en ontdek hoe AI je kan helpen in de les.
            </p>
          </div>

          {/* Module cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {modules.map((m, i) => {
              const prog = getModuleProgress(m.slug, m.lessons);
              const s = colorStyles[m.color];
              const Icon = iconMap[m.icon];
              return (
                <Link
                  key={m.slug}
                  href={`/modules/${m.slug}`}
                  className={`group block h-full animate-slide-up`}
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "backwards" }}
                >
                  <div className={`${s.bg} ${s.hover} rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`${s.iconBg} w-12 h-12 rounded-xl flex items-center justify-center`}>
                        {Icon && <Icon className={`w-6 h-6 ${s.text}`} />}
                      </div>
                      {prog.percentage === 100 && (
                        <span className="flex items-center gap-1 text-white text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                          <CheckCircle2 className="w-4 h-4" />
                          Afgerond
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-white">
                      Module {i + 1}: {m.title}
                    </h3>
                    <p className={`${s.desc} text-sm leading-relaxed mb-4`}>{m.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-white/60">
                        <BookOpen className="w-3.5 h-3.5" />
                        {m.lessons} lessen
                      </span>
                      <span className="flex items-center gap-1 text-white font-medium text-sm">
                        Start <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right column - Progress */}
        <div className="mt-8 lg:mt-0">
          <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-24 animate-fade-in">
            <h2 className="font-bold text-gray-800 text-lg mb-1 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-red" /> Jouw Voortgang</h2>
            {session?.user?.name && (
              <p className="text-sm text-gray-400 mb-5">Hey {session.user.name.split(" ")[0]}! 👋</p>
            )}

            <div className="space-y-5">
              {modules.map((m) => {
                const prog = getModuleProgress(m.slug, m.lessons);
                const barColor =
                  prog.percentage === 100
                    ? "bg-brand-green"
                    : prog.completed > 0
                    ? "bg-brand-orange"
                    : "bg-gray-300";

                return (
                  <div key={m.slug}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700">
                        {m.icon} {m.title}
                      </span>
                      <span className="text-xs text-gray-400">
                        {prog.completed}/{prog.total}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${prog.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
