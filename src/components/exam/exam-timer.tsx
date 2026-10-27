"use client";

import { PauseIcon, PlayIcon, TimerIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { formatClock, type CountdownStatus, type useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";

const tone: Record<CountdownStatus, string> = {
  running: "bg-muted text-foreground",
  paused: "bg-muted text-muted-foreground",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  critical: "animate-pulse bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  expired: "bg-rose-600 text-white",
};

interface ExamTimerProps {
  timer: ReturnType<typeof useCountdown>;
  disabled: boolean;
}

export function ExamTimer({ timer, disabled }: ExamTimerProps) {
  const t = useTranslations("Exam.timer");
  const canToggle = !disabled && timer.status !== "expired";

  return (
    <div className="flex items-center gap-1">
      <div
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 font-mono text-sm font-semibold tabular-nums transition-colors",
          tone[timer.status],
        )}
        role="timer"
        aria-label={t("label")}
      >
        <TimerIcon className="size-4" />
        {formatClock(timer.remaining)}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="size-9"
        onClick={timer.isRunning ? timer.pause : timer.resume}
        disabled={!canToggle}
        aria-label={timer.isRunning ? t("pause") : t("resume")}
        title={timer.isRunning ? t("pause") : t("resume")}
      >
        {timer.isRunning ? <PauseIcon /> : <PlayIcon />}
      </Button>
    </div>
  );
}
