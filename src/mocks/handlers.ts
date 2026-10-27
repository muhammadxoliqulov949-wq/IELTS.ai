import { roundWritingBand } from "@/lib/band";
import type {
  CriterionScore,
  WaitlistEntry,
  WritingFeedback,
  WritingSubmission,
  WritingTask,
} from "@/types/ielts";
import { detectCorrections } from "./writing-analyzer";
import { feedbackTemplates } from "./writing-feedback";

/**
 * Mock "API" layer. Each function mirrors the signature a real endpoint
 * will have later, so swapping in fetch() calls touches only this file.
 */

const WAITLIST_KEY = "ielts-ai:waitlist";

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function readWaitlist(): WaitlistEntry[] {
  try {
    const raw = window.localStorage.getItem(WAITLIST_KEY);
    return raw ? (JSON.parse(raw) as WaitlistEntry[]) : [];
  } catch {
    return [];
  }
}

export async function submitWaitlist(
  input: Omit<WaitlistEntry, "createdAt">,
): Promise<WaitlistEntry> {
  await delay(900);
  const entry: WaitlistEntry = { ...input, createdAt: new Date().toISOString() };
  try {
    const others = readWaitlist().filter((e) => e.email !== entry.email);
    window.localStorage.setItem(WAITLIST_KEY, JSON.stringify([...others, entry]));
  } catch {
    // Storage can be unavailable (private mode); the mock still succeeds.
  }
  return entry;
}

const lowerBand = (c: CriterionScore, by: number, reason: string): CriterionScore => ({
  ...c,
  band: Math.max(0, c.band - by),
  weaknesses: [reason, ...c.weaknesses],
});

/** Mock AI scoring: template feedback adjusted to the submitted text. */
export async function evaluateWriting(
  task: WritingTask,
  submission: WritingSubmission,
): Promise<WritingFeedback> {
  await delay(2800);
  const template = feedbackTemplates[task.type];
  const detected = detectCorrections(submission.text);
  const grammarSlips = detected.filter(
    (c) => c.category === "grammar" || c.category === "spelling",
  ).length;

  const criteria = template.criteria.map((c) => {
    if (c.key === "taskResponse" && submission.wordCount < task.minWords) {
      const severe = submission.wordCount < task.minWords / 2;
      return lowerBand(
        c,
        severe ? 1.5 : 0.5,
        `Under the minimum length (${submission.wordCount}/${task.minWords} words)`,
      );
    }
    if (c.key === "grammaticalRange" && grammarSlips >= 3) {
      return lowerBand(c, 0.5, "Frequent basic grammar and spelling errors");
    }
    return c;
  });

  return {
    submissionId: `${task.id}-${Date.parse(submission.submittedAt)}`,
    taskType: task.type,
    overallBand: roundWritingBand(criteria.map((c) => c.band)),
    criteria,
    corrections: detected.length > 0 ? detected : template.corrections,
    tips: template.tips,
  };
}
