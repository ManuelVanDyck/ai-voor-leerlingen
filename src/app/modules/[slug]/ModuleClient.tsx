"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isLessonCompleted } from "@/lib/progress";
import { CheckCircle2, Circle, ArrowRight, Brain, Wrench, SearchCheck, GraduationCap, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Brain, Wrench, SearchCheck, GraduationCap };

type ModuleInfo = {
  slug: string;
  title: string;
  lessons: number;
  icon: string;
  description: string;
  color: string;
};

export default function ModuleClient({
  mod,
  lessons,
  description,
}: {
  mod: ModuleInfo;
  lessons: { num: number; title: string }[];
  description: string;
}) {
  const [, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);

  useEffect(() => {
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-gray-50">
      <Link href="/modules" className="text-brand-red hover:underline text-sm mb-4 inline-block">
        ← Terug naar modules
      </Link>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
            {(() => { const I = iconMap[mod.icon]; return I ? <I className="w-6 h-6 text-gray-700" /> : null; })()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{mod.title}</h1>
            <p className="text-gray-500 text-sm">{mod.lessons} lessen</p>
          </div>
        </div>
        {description && <p className="text-gray-600 leading-relaxed">{description}</p>}
      </div>

      <div className="space-y-3">
        {lessons.map((lesson, i) => {
          const done = isLessonCompleted(mod.slug, lesson.num);
          return (
            <Link
              key={lesson.num}
              href={`/modules/${mod.slug}/${lesson.num}`}
              className={`flex items-center gap-4 bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-brand-orange animate-slide-up ${
                done ? "opacity-80" : ""
              }`}
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
            >
              {done ? (
                <CheckCircle2 className="w-6 h-6 text-brand-green flex-shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800">Les {lesson.num}: {lesson.title}</p>
                {done && <p className="text-xs text-brand-green">Voltooid ✓</p>}
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
