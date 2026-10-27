import { notifyStorageChange } from "@/hooks/use-storage-value";
import type { WritingFeedback, WritingSubmission } from "@/types/ielts";

/**
 * Client-side persistence for the Writing module (no backend in phase 1).
 * Drafts live in localStorage so a refresh never loses an essay; the latest
 * result lives in sessionStorage and is read by the result page.
 */

export const draftKey = (taskId: string) => `ielts-ai:writing-draft:${taskId}`;
export const resultKey = (taskId: string) => `ielts-ai:writing-result:${taskId}`;

export interface StoredWritingResult {
  submission: WritingSubmission;
  feedback: WritingFeedback;
}

function write(storage: () => Storage, key: string, value: string | null) {
  try {
    if (value === null) storage().removeItem(key);
    else storage().setItem(key, value);
  } catch {
    // Storage unavailable (private mode / quota) — the app keeps working in memory.
  }
}

export function saveDraft(taskId: string, text: string) {
  write(() => window.localStorage, draftKey(taskId), text);
}

export function clearDraft(taskId: string) {
  write(() => window.localStorage, draftKey(taskId), null);
}

export function saveResult(taskId: string, result: StoredWritingResult) {
  write(() => window.sessionStorage, resultKey(taskId), JSON.stringify(result));
  notifyStorageChange();
}

export function parseResult(raw: string | null | undefined): StoredWritingResult | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredWritingResult;
  } catch {
    return null;
  }
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}
