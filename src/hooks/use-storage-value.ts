"use client";

import { useSyncExternalStore } from "react";

type StorageKind = "local" | "session";

const listeners = new Set<() => void>();

function getStorage(kind: StorageKind): Storage | null {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

/** Notify hooks in this tab after writing to storage. */
export function notifyStorageChange() {
  listeners.forEach((listener) => listener());
}

/**
 * Reads a raw storage string without a hydration mismatch.
 * Returns `undefined` while rendering on the server / hydrating,
 * `null` when the key is missing, otherwise the stored string.
 */
export function useStorageValue(key: string, kind: StorageKind): string | null | undefined {
  return useSyncExternalStore(
    subscribe,
    () => getStorage(kind)?.getItem(key) ?? null,
    () => undefined,
  );
}
