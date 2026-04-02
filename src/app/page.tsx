"use client";

import Link from "next/link";
import { Bot, BookOpen, Brain, Wrench, SearchCheck, GraduationCap, ArrowRight, Shield, Sparkles, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
          <Bot className="w-10 h-10 text-brand-red" />
          AI voor Leerlingen
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Ontdek de wereld van kunstmatige intelligentie. Leer wat AI is, ontdek handige tools,
          gebruik AI slim en ontdek hoe AI je kan helpen in de les.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 bg-brand-red text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-red-700 hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl mt-8 text-lg"
        >
          Start met leren <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Modules overview (read-only, no links) */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">4 Modules, 16 Lessen</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { icon: Brain, title: "Wat is AI?", desc: "Ontdek wat AI is, welke soorten er bestaan en herken AI in je dagelijks leven.", lessons: 3, color: "bg-brand-red" },
            { icon: Wrench, title: "AI Tools ontdekken", desc: "Leer ChatGPT, Gemini en afbeeldings-AI kennen. Ontdek hoe je goede prompts schrijft.", lessons: 4, color: "bg-brand-green" },
            { icon: SearchCheck, title: "AI Slim gebruiken", desc: "Herken valkuilen zoals hallucinaties en fake news. Leer kritisch omgaan met AI.", lessons: 5, color: "bg-brand-orange" },
            { icon: GraduationCap, title: "AI in de les", desc: "Gebruik AI als study buddy en bij schrijfopdrachten. Ontdek de AI spelregels.", lessons: 4, color: "bg-gray-700" },
          ].map((m) => (
            <div key={m.title} className={`${m.color} rounded-2xl p-6 shadow-lg`}>
              <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <m.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-xl text-white mb-2">{m.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-3">{m.desc}</p>
              <span className="flex items-center gap-1 text-xs text-white/60">
                <BookOpen className="w-3.5 h-3.5" />
                {m.lessons} lessen
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-brand-red" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Veilig leren</h3>
            <p className="text-sm text-gray-500">Alles binnen een beveiligde omgeving, alleen toegankelijk voor leerlingen van onze school.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-brand-green" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Interactief</h3>
            <p className="text-sm text-gray-500">Quizzen, oefeningen en AI-gebaseerde feedback om echt te leren, niet alleen te lezen.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-brand-orange" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Op jouw tempo</h3>
            <p className="text-sm text-gray-500">Volg de lessen waar en wanneer je wilt. Je voortgang wordt automatisch bijgehouden.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-6">Klaar om aan de slag te gaan met AI?</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 bg-brand-red text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-red-700 hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
        >
          Log in en begin <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
