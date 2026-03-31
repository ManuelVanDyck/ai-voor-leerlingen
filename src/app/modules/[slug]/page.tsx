import fs from "fs";
import path from "path";
import { modules } from "@/lib/modules";
import ModuleClient from "./ModuleClient";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = modules.find((m) => m.slug === slug);
  if (!mod) return <div>Module niet gevonden</div>;

  const filePath = path.join(process.cwd(), "src/content/modules", `${slug}.md`);
  const content = fs.readFileSync(filePath, "utf-8");

  // Extract lessons from markdown
  const lessonRegex = /^## Les (\d+): (.+)$/gm;
  const lessons: { num: number; title: string }[] = [];
  let match;
  while ((match = lessonRegex.exec(content)) !== null) {
    lessons.push({ num: parseInt(match[1]), title: match[2] });
  }

  // Extract module description (first paragraph after the title # line)
  const descMatch = content.match(/^# .+\n\n([\s\S]+?)(?:\n\n|\n---)/);
  const description = descMatch ? descMatch[1].trim() : "";

  return <ModuleClient mod={mod} lessons={lessons} description={description} />;
}
