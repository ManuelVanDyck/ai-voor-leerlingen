const STORAGE_KEY = "ai-voor-leerlingen-progress";

export type Progress = Record<string, boolean>;

function getStorage(): Progress {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function setStorage(data: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function setLessonCompleted(moduleSlug: string, lessonNum: number) {
  const data = getStorage();
  data[`${moduleSlug}-${lessonNum}`] = true;
  setStorage(data);
}

export function isLessonCompleted(moduleSlug: string, lessonNum: number): boolean {
  return !!getStorage()[`${moduleSlug}-${lessonNum}`];
}

export function getModuleProgress(
  moduleSlug: string,
  totalLessons: number
): { completed: number; total: number; percentage: number } {
  const data = getStorage();
  let completed = 0;
  for (let i = 1; i <= totalLessons; i++) {
    if (data[`${moduleSlug}-${i}`]) completed++;
  }
  return {
    completed,
    total: totalLessons,
    percentage: totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0,
  };
}

export function getNextLesson(moduleSlug: string, totalLessons: number): number | null {
  for (let i = 1; i <= totalLessons; i++) {
    if (!isLessonCompleted(moduleSlug, i)) return i;
  }
  return null;
}
