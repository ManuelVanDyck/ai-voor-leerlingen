"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { modules } from "@/lib/modules";
import { getModuleProgress, getNextLesson } from "@/lib/progress";
import { BookOpen, CheckCircle2, ArrowRight, Brain, Wrench, SearchCheck, GraduationCap, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Brain, Wrench, SearchCheck, GraduationCap };

const colorStyles: Record<string, { bg: string; iconBg: string; hover: string; text: string; desc: string }> = {
  red: { bg: "bg-brand-red", iconBg: "bg-white/20", hover: "hover:bg-red-700", text: "text-white", desc: "text-white/80" },
  green: { bg: "bg-brand-green", iconBg: "bg-white/20", hover: "hover:bg-teal-700", text: "text-white", desc: "text-white/80" },
  orange: { bg: "bg-brand-orange", iconBg: "bg-white/20", hover: "hover:bg-orange-600", text: "text-white", desc: "text-white/80" },
  cream: { bg: "bg-brand-cream", iconBg: "bg-brand-orange/20", hover: "hover:bg-orange-100", text: "text-gray-800", desc: "text-gray-600" },
};

export default function ModulesPage() {
  const [, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);

  useEffect(() => {
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">📚 Alle Modules</h1>
      <p className="text-gray-500 mb-8 animate-fade-in">
        Werk de modules door van 1 tot 4. Elke module sluit af met een quiz!
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((m, i) => {
          const prog = getModuleProgress(m.slug, m.lessons);
          const nextLesson = getNextLesson(m.slug, m.lessons);
          const href = nextLesson
            ? `/modules/${m.slug}/${nextLesson}`
            : `/modules/${m.slug}`;
          const s = colorStyles[m.color];
          const Icon = iconMap[m.icon];

          return (
            <Link
              key={m.slug}
              href={href}
              className="group block h-full animate-slide-up"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "backwards" }}
            >
              <div className={`${s.bg} ${s.hover} rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`${s.iconBg} w-12 h-12 rounded-xl flex items-center justify-center`}>
                    {Icon && <Icon className={`w-6 h-6 ${s.text}`} />}
                  </div>
                  {prog.percentage === 100 ? (
                    <span className="flex items-center gap-1 text-white text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4" /> Afgerond
                    </span>
                  ) : (
                    <span className="text-xs text-white/60 bg-white/20 px-2 py-1 rounded-full">
                      {prog.percentage}%
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
                    {prog.completed}/{m.lessons} lessen
                  </span>
                  <span className="flex items-center gap-1 text-white font-medium text-sm">
                    {nextLesson ? `Les ${nextLesson}` : "Bekijk"} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
