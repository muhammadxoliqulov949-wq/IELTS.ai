import type { WaitlistEntry } from "@/types/ielts";

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
