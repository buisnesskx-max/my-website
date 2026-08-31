import type { Category } from "@/data/people";

export interface SavedResult {
  category: Category;
  personId: string;
  score: number;
  code: string;
}

const key = (category: Category, value: "answers" | "result") => `msc.${category}.${value}.v2`;

export function loadAnswers(category: Category): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(key(category, "answers")) ?? "{}");
  } catch {
    return {};
  }
}

export function saveAnswers(category: Category, answers: Record<string, string>) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(key(category, "answers"), JSON.stringify(answers)); } catch { /* continue in memory */ }
}

export function clearAnswers(category: Category) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key(category, "answers"));
  } catch { /* storage unavailable */ }
}

/** Full reset for a deliberate restart: answers and the saved result. Question order is fixed. */
export function clearQuizState(category: Category) {
  clearAnswers(category);
  if (typeof window === "undefined") return;
  try { window.localStorage.removeItem(key(category, "result")); } catch { /* storage unavailable */ }
}

export function encodeResult(personId: string, score: number) {
  return `${personId}--${score}`;
}

export function decodeResult(code: string) {
  const [personId, rawScore, ...rest] = code.split("--");
  const score = Number(rawScore);
  if (!personId || rest.length || Number.isNaN(score) || score < 0 || score > 100) return null;
  return { personId, score };
}

export function saveCompletedResult(result: SavedResult) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(key(result.category, "result"), JSON.stringify(result)); } catch { /* optional */ }
}

export function loadCompletedResult(category: Category): SavedResult | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key(category, "result")) ?? "null") as SavedResult | null;
    return parsed?.category === category ? parsed : null;
  } catch { return null; }
}
