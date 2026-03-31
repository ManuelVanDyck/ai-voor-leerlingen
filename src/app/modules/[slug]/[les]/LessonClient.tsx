"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  setLessonCompleted,
  isLessonCompleted,
  getModuleProgress,
} from "@/lib/progress";
import { CheckCircle2, ArrowLeft, ArrowRight, Brain, Wrench, SearchCheck, GraduationCap, LucideIcon } from "lucide-react";
import OpdrachtComponent from "@/components/OpdrachtComponent";
import { module1Opdrachten } from "@/content/module-1-opdrachten";
import { module3Opdrachten } from "@/content/module-3-opdrachten";
import { module2Opdrachten, module2OpdrachtenLes2, module2OpdrachtenLes3, module2OpdrachtenLes4 } from "@/content/module-2-opdrachten";
import {
  module4Opdrachten as module4OpdrachtenLes1,
  module4OpdrachtenLes2,
  module4OpdrachtenLes3,
  module4OpdrachtenLes4
} from "@/content/module-4-opdrachten";
import { useSession } from "next-auth/react";

const iconMap: Record<string, LucideIcon> = { Brain, Wrench, SearchCheck, GraduationCap };

type ModuleInfo = {
  slug: string;
  title: string;
  lessons: number;
  icon: string;
  color: string;
};

type Lesson = { num: number; title: string };

// Parse quiz questions from markdown text
function parseQuizzes(text: string) {
  const quizzes: {
    question: string;
    options: { letter: string; text: string }[];
    answer: string;
    rawIndex: number;
  }[] = [];

  // Split into quiz blocks
  const quizBlocks = text.split(/(?=\*\*Vraag \d+:)/);
  for (const block of quizBlocks) {
    const qMatch = block.match(/\*\*Vraag \d+:\*\*\s*(.+)/);
    if (!qMatch) continue;

    const options: { letter: string; text: string }[] = [];
    const optRegex = /-\s+([A-D])\)\s+(.+)/g;
    let optMatch;
    while ((optMatch = optRegex.exec(block)) !== null) {
      options.push({ letter: optMatch[1], text: optMatch[2].trim() });
    }

    const ansMatch = block.match(/\*Antwoord:\s*([A-D])\*\*/);
    if (!ansMatch) continue;

    const rawIndex = text.indexOf(block);

    quizzes.push({
      question: qMatch[1].trim(),
      options,
      answer: ansMatch[1],
      rawIndex,
    });
  }
  return quizzes;
}

// Remove quiz blocks from markdown for clean rendering
function removeQuizzes(text: string): string {
  // Remove **Vraag X:** blocks including options and answer
  return text.replace(
    /\*\*Vraag \d+:\*\*[\s\S]*?(?=\*\*Vraag \d+:\*\*|\n## |\n### |\Z)/g,
    (match) => {
      // Only remove if it contains answer pattern (is a quiz)
      if (/\*Antwort:/.test(match) || /\*Antwoord:/.test(match)) return "";
      return match;
    }
  );
}

export default function LessonClient({
  mod,
  lessonNum,
  lessonTitle,
  content,
  prevLesson,
  nextLesson,
  totalLessons,
}: {
  mod: ModuleInfo;
  lessonNum: number;
  lessonTitle: string;
  content: string;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  totalLessons: number;
}) {
  const { data: session } = useSession();
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setCompleted(isLessonCompleted(mod.slug, lessonNum));
  }, [mod.slug, lessonNum]);

  const quizzes = useMemo(() => parseQuizzes(content), [content]);
  const cleanContent = useMemo(() => {
    let text = content;
    // Remove quiz blocks
    for (const q of quizzes) {
      const qText = `**Vraag`;
      // Find and remove each quiz block
    }
    // Simple approach: remove lines that are part of quiz questions
    const lines = text.split("\n");
    const filtered: string[] = [];
    let inQuiz = false;
    let quizQuestionCount = 0;

    for (const line of lines) {
      if (/^\*\*Vraag \d+:/.test(line)) {
        inQuiz = true;
        quizQuestionCount++;
        continue;
      }
      if (inQuiz) {
        if (/^\*\*Vraag \d+:/.test(line)) {
          continue; // next quiz question
        }
        if (/^\*Antwoord:/.test(line)) {
          inQuiz = false;
          continue;
        }
        if (/^-\s+[A-D]\)/.test(line)) {
          continue; // quiz option
        }
        // If we hit a non-quiz line while in quiz, exit quiz mode
        if (line.trim() === "" && quizQuestionCount > 0) {
          inQuiz = false;
          quizQuestionCount = 0;
        }
        continue;
      }
      filtered.push(line);
    }
    return filtered.join("\n").trim();
  }, [content, quizzes]);

  const handleComplete = () => {
    setLessonCompleted(mod.slug, lessonNum);
    setCompleted(true);
  };

  const prog = getModuleProgress(mod.slug, totalLessons);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 animate-fade-in">
        <Link href="/modules" className="hover:text-brand-red transition-colors">
          Modules
        </Link>
        <span>/</span>
        <Link
          href={`/modules/${mod.slug}`}
          className="hover:text-brand-red transition-colors"
        >
          {(() => { const I = iconMap[mod.icon]; return I ? <I className="w-4 h-4 inline" /> : null; })()} {mod.title}
        </Link>
        <span>/</span>
        <span className="text-gray-600">Les {lessonNum}</span>
      </div>

      {/* Lesson header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {(() => { const I = iconMap[mod.icon]; return I ? <I className="w-6 h-6 inline mr-2" /> : null; })()} {lessonTitle}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span>
            Les {lessonNum} van {totalLessons}
          </span>
          <span>•</span>
          <span>{prog.completed}/{prog.total} lessen voltooid</span>
        </div>
      </div>

      {/* Opdracht Component (for Module 1 Les 3) */}
      {mod.slug === "module-1" && lessonNum === 3 && session?.user && (
        <OpdrachtComponent
          moduleSlug={mod.slug}
          lesSlug="les-3"
          opdrachten={module1Opdrachten}
        />
      )}

      {/* Opdracht Component (for Module 2 Les 1) */}
      {mod.slug === "module-2" && lessonNum === 1 && session?.user && (
        <OpdrachtComponent
          moduleSlug={mod.slug}
          lesSlug="les-1"
          opdrachten={module2Opdrachten}
        />
      )}

      {/* Opdracht Component (for Module 2 Les 2) */}
      {mod.slug === "module-2" && lessonNum === 2 && session?.user && (
        <OpdrachtComponent
          moduleSlug={mod.slug}
          lesSlug="les-2"
          opdrachten={module2OpdrachtenLes2}
        />
      )}

      {/* Opdracht Component (for Module 2 Les 3) */}
      {mod.slug === "module-2" && lessonNum === 3 && session?.user && (
        <OpdrachtComponent
          moduleSlug={mod.slug}
          lesSlug="les-3"
          opdrachten={module2OpdrachtenLes3}
        />
      )}

      {/* Opdracht Component (for Module 2 Les 4) */}
      {mod.slug === "module-2" && lessonNum === 4 && session?.user && (
        <OpdrachtComponent
          moduleSlug={mod.slug}
          lesSlug="les-4"
          opdrachten={module2OpdrachtenLes4}
        />
      )}

      {/* Opdracht Component (for Module 3) */}
      {mod.slug === "module-3" && session?.user && (
        <OpdrachtComponent
          moduleSlug={mod.slug}
          lesSlug={`les-${lessonNum}`}
          opdrachten={module3Opdrachten}
        />
      )}

      {/* Opdracht Component (for Module 4 Les 1) */}
      {mod.slug === "module-4" && lessonNum === 1 && session?.user && (
        <OpdrachtComponent
          moduleSlug={mod.slug}
          lesSlug="les-1"
          opdrachten={module4OpdrachtenLes1}
        />
      )}

      {/* Opdracht Component (for Module 4 Les 2) */}
      {mod.slug === "module-4" && lessonNum === 2 && session?.user && (
        <OpdrachtComponent
          moduleSlug={mod.slug}
          lesSlug="les-2"
          opdrachten={module4OpdrachtenLes2}
        />
      )}

      {/* Opdracht Component (for Module 4 Les 3) */}
      {mod.slug === "module-4" && lessonNum === 3 && session?.user && (
        <OpdrachtComponent
          moduleSlug={mod.slug}
          lesSlug="les-3"
          opdrachten={module4OpdrachtenLes3}
        />
      )}

      {/* Opdracht Component (for Module 4 Les 4) */}
      {mod.slug === "module-4" && lessonNum === 4 && session?.user && (
        <OpdrachtComponent
          moduleSlug={mod.slug}
          lesSlug="les-4"
          opdrachten={module4OpdrachtenLes4}
        />
      )}

      {/* Quiz section (if any) */}
      {quizzes.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-slide-up">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📝 Quiz
          </h2>
          <div className="space-y-6">
            {quizzes.map((quiz, qi) => (
              <div key={qi} className="border-b border-gray-100 pb-5 last:border-0">
                <p className="font-medium text-gray-800 mb-3">
                  {qi + 1}. {quiz.question}
                </p>
                <div className="space-y-2">
                  {quiz.options.map((opt) => {
                    const isSelected = answers[qi] === opt.letter;
                    const isCorrect = checked[qi] && opt.letter === quiz.answer;
                    const isWrong = checked[qi] && isSelected && opt.letter !== quiz.answer;

                    return (
                      <button
                        key={opt.letter}
                        onClick={() => {
                          if (!checked[qi]) {
                            setAnswers({ ...answers, [qi]: opt.letter });
                          }
                        }}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                          isCorrect
                            ? "border-brand-green bg-emerald-50"
                            : isWrong
                            ? "border-red-400 bg-red-50"
                            : isSelected
                            ? "border-brand-orange bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        } ${checked[qi] ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                            isCorrect
                              ? "bg-brand-green text-white"
                              : isWrong
                              ? "bg-red-400 text-white"
                              : isSelected
                              ? "bg-brand-orange text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {opt.letter}
                        </span>
                        <span className="text-gray-700">{opt.text}</span>
                        {isCorrect && <span className="ml-auto text-brand-green">✅</span>}
                        {isWrong && <span className="ml-auto text-red-400">❌</span>}
                      </button>
                    );
                  })}
                </div>
                {!checked[qi] && (
                  <button
                    onClick={() => {
                      if (answers[qi]) setChecked({ ...checked, [qi]: true });
                    }}
                    disabled={!answers[qi]}
                    className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      answers[qi]
                        ? "bg-brand-red text-white hover:bg-red-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Controleer
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Markdown content */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-slide-up prose-lesson">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{cleanContent}</ReactMarkdown>
      </div>

      {/* Complete button */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 text-center animate-slide-up">
        {completed ? (
          <div className="flex items-center justify-center gap-2 text-brand-green font-medium">
            <CheckCircle2 className="w-5 h-5" />
            Les voltooid! ✓
          </div>
        ) : (
          <button
            onClick={handleComplete}
            className="bg-brand-green hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all hover:shadow-lg"
          >
            ✅ Les voltooid
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        {prevLesson ? (
          <Link
            href={`/modules/${mod.slug}/${prevLesson.num}`}
            className="flex items-center gap-2 text-gray-600 hover:text-brand-red transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Les {prevLesson.num}</span>
          </Link>
        ) : (
          <Link
            href={`/modules/${mod.slug}`}
            className="flex items-center gap-2 text-gray-600 hover:text-brand-red transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Overzicht</span>
          </Link>
        )}

        {nextLesson ? (
          <Link
            href={`/modules/${mod.slug}/${nextLesson.num}`}
            className="flex items-center gap-2 bg-brand-red text-white px-5 py-2.5 rounded-xl hover:bg-red-700 transition-all font-medium"
          >
            <span className="text-sm">Les {nextLesson.num}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href={`/modules/${mod.slug}`}
            className="flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all font-medium"
          >
            <span className="text-sm">Module afgerond</span>
            <CheckCircle2 className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Markdown styles */}
      <style jsx global>{`
        .prose-lesson h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #4c8077;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose-lesson h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #374151;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose-lesson h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #374151;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .prose-lesson p {
          color: #4b5563;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .prose-lesson strong {
          color: #4c8077;
          font-weight: 600;
        }
        .prose-lesson ul,
        .prose-lesson ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .prose-lesson ul {
          list-style-type: disc;
        }
        .prose-lesson ol {
          list-style-type: decimal;
        }
        .prose-lesson li {
          color: #4b5563;
          margin-bottom: 0.25rem;
          line-height: 1.75;
        }
        .prose-lesson blockquote {
          border-left: 4px solid #f7931e;
          background: #fff7ed;
          padding: 1rem;
          border-radius: 0 0.5rem 0.5rem 0;
          margin: 1rem 0;
        }
        .prose-lesson blockquote p {
          margin-bottom: 0;
        }
        .prose-lesson code {
          background: #f3f4f6;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        .prose-lesson pre {
          background: #1f2937;
          color: #e5e7eb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .prose-lesson pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
        .prose-lesson hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 1.5rem 0;
        }
        .prose-lesson a {
          color: #e53013;
          text-decoration: underline;
        }
        .prose-lesson a:hover {
          color: #dc2626;
        }
      `}</style>
    </div>
  );
}
