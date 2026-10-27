import { notifyStorageChange } from "@/hooks/use-storage-value";
import type {
  BandScore,
  ReadingAnswers,
  ReadingQuestion,
  ReadingResult,
  ReadingTest,
} from "@/types/ielts";

/**
 * Approximate Academic Reading conversion (raw score out of 40 → band).
 * Shorter mock tests are scaled to 40 first.
 */
const bandTable: [minRaw: number, band: BandScore][] = [
  [39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6],
  [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5],
];

export function readingBand(correct: number, total: number): BandScore {
  if (total === 0) return 0;
  const raw = Math.round((correct / total) * 40);
  return bandTable.find(([min]) => raw >= min)?.[1] ?? (raw > 0 ? 2 : 0);
}

export function isCorrect(question: ReadingQuestion, answer: string | undefined): boolean {
  if (!answer) return false;
  return question.kind === "tfng"
    ? answer === question.correctAnswer
    : answer === question.correctOptionId;
}

export function correctAnswerOf(question: ReadingQuestion): string {
  return question.kind === "tfng" ? question.correctAnswer : question.correctOptionId;
}

export function scoreReading(
  test: ReadingTest,
  answers: ReadingAnswers,
  timeSpentSeconds: number,
): ReadingResult {
  const correct = test.questions.filter((q) => isCorrect(q, answers[q.id])).length;
  return {
    testId: test.id,
    correct,
    total: test.questions.length,
    band: readingBand(correct, test.questions.length),
    answers,
    timeSpentSeconds,
    finishedAt: new Date().toISOString(),
  };
}

// ---------- Client persistence (no backend in phase 1) ----------

export const answersKey = (testId: string) => `ielts-ai:reading-answers:${testId}`;
export const readingResultKey = (testId: string) => `ielts-ai:reading-result:${testId}`;

function write(storage: () => Storage, key: string, value: string | null) {
  try {
    if (value === null) storage().removeItem(key);
    else storage().setItem(key, value);
  } catch {
    // Storage unavailable — the test still works in memory.
  }
}

export function saveAnswers(testId: string, answers: ReadingAnswers) {
  write(() => window.localStorage, answersKey(testId), JSON.stringify(answers));
}

export function clearAnswers(testId: string) {
  write(() => window.localStorage, answersKey(testId), null);
}

export function saveReadingResult(result: ReadingResult) {
  write(() => window.sessionStorage, readingResultKey(result.testId), JSON.stringify(result));
  notifyStorageChange();
}

export function parseJson<T>(raw: string | null | undefined): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
