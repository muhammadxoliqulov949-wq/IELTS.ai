"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CountdownStatus = "running" | "paused" | "warning" | "critical" | "expired";

const WARNING_SECONDS = 5 * 60;
const CRITICAL_SECONDS = 60;

/**
 * Exam countdown that starts on mount. Uses wall-clock time, so a throttled
 * background tab still shows the correct remaining time when it wakes up.
 */
export function useCountdown(totalSeconds: number) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const remainingRef = useRef(totalSeconds);

  useEffect(() => {
    if (!isRunning) return;
    const endAt = Date.now() + remainingRef.current * 1000;
    const id = window.setInterval(() => {
      const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      remainingRef.current = left;
      setRemaining(left);
      if (left === 0) setIsRunning(false);
    }, 250);
    return () => window.clearInterval(id);
  }, [isRunning]);

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => {
    if (remainingRef.current > 0) setIsRunning(true);
  }, []);

  let status: CountdownStatus = "running";
  if (remaining === 0) status = "expired";
  else if (!isRunning) status = "paused";
  else if (remaining <= CRITICAL_SECONDS) status = "critical";
  else if (remaining <= WARNING_SECONDS) status = "warning";

  return {
    remaining,
    elapsed: totalSeconds - remaining,
    status,
    isRunning,
    pause,
    resume,
  };
}

export function formatClock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
