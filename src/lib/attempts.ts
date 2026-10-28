import { notifyStorageChange } from "@/hooks/use-storage-value";
import type { AttemptRecord } from "@/types/ielts";

/**
 * Local log of finished mock tests (no backend in phase 1). Unlike the
 * per-test result in sessionStorage, this survives closing the browser.
 */
export const ATTEMPTS_KEY = "ielts-ai:attempts";
const MAX_ATTEMPTS = 20;

export function parseAttempts(raw: string | null | undefined): AttemptRecord[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AttemptRecord[]) : [];
  } catch {
    return [];
  }
}

export function recordAttempt(attempt: Omit<AttemptRecord, "id">) {
  try {
    const existing = parseAttempts(window.localStorage.getItem(ATTEMPTS_KEY));
    const entry: AttemptRecord = { ...attempt, id: `${attempt.skill}-${Date.parse(attempt.finishedAt)}` };
    const next = [entry, ...existing].slice(0, MAX_ATTEMPTS);
    window.localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(next));
    notifyStorageChange();
  } catch {
    // Storage unavailable — the dashboard simply shows no history.
  }
}
