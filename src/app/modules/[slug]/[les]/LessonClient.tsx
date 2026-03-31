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

  // Support both formats:
  // Format 1: "**Vraag X:** Question text"
  // Format 2: "**X. Question text"
  const quizPatterns = [
    /(?=\*\*Vraag \d+:)/,
    /(?=\*\*\d+\.\s)/
  ];

  for (const pattern of quizPatterns) {
    const quizBlocks = text.split(pattern);
    for (const block of quizBlocks) {
      let qMatch;

      // Try both formats
      qMatch = block.match(/\*\*Vraag \d+:\*\*\s*(.+)/);
      if (!qMatch) {
        qMatch = block.match(/\*\*\d+\.\s*(.+)/);
        if (!qMatch) continue;
      }

      const options: { letter: string; text: string }[] = [];
      const optRegex = /-\s+([A-D])\)\s+(.+)/g;
      let optMatch;
      while ((optMatch = optRegex.exec(block)) !== null) {
        options.push({ letter: optMatch[1], text: optMatch[2].trim() });
      }

      // Try answer patterns: "*Antwoord: X)" or "*Antwoord: X*" or "*Antwoord: X"
      const ansMatch = block.match(/\*Antwoord:\s*([A-D])[)\*]?/);
      if (!ansMatch) continue;

      const rawIndex = text.indexOf(block);

      quizzes.push({
        question: qMatch[1].trim(),
        options,
        answer: ansMatch[1],
        rawIndex,
      });
    }
  }
  return quizzes;
}

// Remove quiz blocks, exercises, and answer keys from markdown for clean rendering
function cleanContentForLoggedInUser(text: string): string {
  let result = text;

  // Remove answer keys anywhere in the content first
  result = result.replace(/\*Antwoord:[^\n]*/g, "");

  // Remove complete quiz blocks with both formats
  // Format 1: **Vraag X:** ... options ... *Antwoord: X
  result = result.replace(
    /\*\*Vraag \d+:\*\*[\s\S]*?\*Antwoord:[^\n]*/g,
    ""
  );

  // Format 2: **X. ... ... *Antwoord: X
  result = result.replace(
    /\*\*\d+\.\s[\s\S]*?\*Antwoord:[^\n]*/g,
    ""
  );

  // Remove "Check je kennis" sections completely
  result = result.replace(/###\s*Check je kennis[\s\S]*?(?=\n### |\n## )/g, "");
  result = result.replace(/###\s*Check je kennis -.*[\s\S]*?(?=\n### |\n## )/g, "");

  // Remove "Oefening" sections completely
  result = result.replace(/###\s*Oefening:[\s\S]*?(?=\n### |\n## )/g, "");
  result = result.replace(/###\s*Oefening[\s\S]*?(?=\n### |\n## )/g, "");

  // Remove "Bonusvraag" sections
  result = result.replace(/\*\*Bonusvraag:[\s\S]*?(?=\n### |\n## )/g, "");

  // Remove quiz blocks with numbered questions (**1. Question** format)
  result = result.replace(/\*\*\d+\.\s[\s\S]*?\*Antwoord:[^\n]*/g, "");

  // Remove any empty lines that might have been left behind
  const lines = result.split("\n");
  const filtered: string[] = [];
  let lastNonEmpty = -1;

  for (const line of lines) {
    if (line.trim() !== "") {
      filtered.push(line);
      lastNonEmpty = filtered.length - 1;
    } else if (lastNonEmpty >= 0 && filtered[lastNonEmpty].trim() !== "") {
      // Only keep one empty line between non-empty lines
      filtered.push(line);
    }
  }

  // Clean up any multiple empty lines at the end
  return filtered.join("\n").replace(/\n\s*\n\s*\n/g, "\n\n").trim();
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
    if (!session?.user) {
      // When not logged in, show the content as-is
      return content;
    }

    // When logged in, remove quiz sections, exercises, and answer keys
    return cleanContentForLoggedInUser(content);
  }, [content, session?.user]);

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

      {/* Interactive Quiz section (if any) - shown only when logged in */}
      {quizzes.length > 0 && session?.user && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-slide-up">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📝 Check je kennis
          </h2>
          <div className="space-y-6">
            {quizzes.map((quiz, qi) => (
              <div key={qi} className="border border-gray-200 rounded-lg p-5">
                <p className="font-medium text-gray-800 mb-4">
                  <span className="text-brand-red font-semibold">{qi + 1}.</span> {quiz.question}
                </p>
                <div className="space-y-3 mb-4">
                  {quiz.options.map((opt) => (
                    <label
                      key={opt.letter}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        checked[qi]
                          ? opt.letter === quiz.answer
                            ? "border-brand-green bg-emerald-50"
                            : answers[qi] === opt.letter
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`quiz-${qi}`}
                        value={opt.letter}
                        checked={answers[qi] === opt.letter}
                        onChange={(e) => {
                          if (!checked[qi]) {
                            setAnswers({ ...answers, [qi]: e.target.value });
                          }
                        }}
                        disabled={checked[qi]}
                        className="w-4 h-4 text-brand-green focus:ring-brand-green"
                      />
                      <span className="text-gray-700 flex-1">{opt.text}</span>
                      {checked[qi] && opt.letter === quiz.answer && (
                        <span className="text-brand-green font-semibold">✅ Correct</span>
                      )}
                      {checked[qi] && answers[qi] === opt.letter && opt.letter !== quiz.answer && (
                        <span className="text-red-400 font-semibold">❌ Fout</span>
                      )}
                    </label>
                  ))}
                </div>
                {!checked[qi] && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        if (answers[qi]) setChecked({ ...checked, [qi]: true });
                      }}
                      disabled={!answers[qi]}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        answers[qi]
                          ? "bg-brand-red text-white hover:bg-red-700"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Controleer
                    </button>
                  </div>
                )}
                {checked[qi] && (
                  <div className={`mt-3 p-3 rounded-lg text-sm ${
                    answers[qi] === quiz.answer
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}>
                    <strong>Jouw antwoord: {answers[qi] || 'Geen antwoord'}</strong>
                    {answers[qi] !== quiz.answer && (
                      <div className="mt-1">
                        <strong>Correct antwoord: {quiz.answer}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz section (if any) - shown when not logged in */}
      {quizzes.length > 0 && !session?.user && (
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
                  {quiz.options.map((opt) => (
                    <button
                      key={opt.letter}
                      className="w-full text-left p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all flex items-center gap-3"
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold bg-gray-200 text-gray-600 flex-shrink-0"
                      >
                        {opt.letter}
                      </span>
                      <span className="text-gray-700">{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Markdown content */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-slide-up prose-lesson">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{cleanContent}</ReactMarkdown>
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
