import fs from "fs";
import path from "path";
import { modules } from "@/lib/modules";
import LessonClient from "./LessonClient";

export function generateStaticParams() {
  const params: { slug: string; les: string }[] = [];
  for (const m of modules) {
    for (let i = 1; i <= m.lessons; i++) {
      params.push({ slug: m.slug, les: String(i) });
    }
  }
  return params;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; les: string }>;
}) {
  const { slug, les } = await params;
  const mod = modules.find((m) => m.slug === slug);
  if (!mod) return <div>Module niet gevonden</div>;

  const lessonNum = parseInt(les);
  const filePath = path.join(process.cwd(), "src/content/modules", `${slug}.md`);
  const content = fs.readFileSync(filePath, "utf-8");

  // Extract all lesson sections
  const sectionRegex = /^## (Les \d+: .+|Module \d+ Afsluiting)$/gm;
  const sections: { title: string; start: number }[] = [];
  let match;
  while ((match = sectionRegex.exec(content)) !== null) {
    sections.push({ title: match[1], start: match.index });
  }

  // Find the current lesson section
  const lessonSection = sections.find((s) => s.title.startsWith(`Les ${lessonNum}:`));
  if (!lessonSection) return <div>Les niet gevonden</div>;

  // Find the end of this section
  const sectionIndex = sections.indexOf(lessonSection);
  const end = sectionIndex < sections.length - 1 ? sections[sectionIndex + 1].start : content.length;

  const lessonContent = content.slice(lessonSection.start, end).trim();

  // Extract all lessons for navigation
  const allLessons: { num: number; title: string }[] = [];
  const lessonRegex = /^## Les (\d+): (.+)$/gm;
  while ((match = lessonRegex.exec(content)) !== null) {
    allLessons.push({ num: parseInt(match[1]), title: match[2] });
  }

  const currentIdx = allLessons.findIndex((l) => l.num === lessonNum);
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  return (
    <LessonClient
      mod={mod}
      lessonNum={lessonNum}
      lessonTitle={lessonSection.title}
      content={lessonContent}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      totalLessons={mod.lessons}
    />
  );
}
