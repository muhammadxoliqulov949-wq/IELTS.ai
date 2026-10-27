"use client";

import { CheckCircle2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/** Live word count with progress toward the task's minimum (150 / 250). */
export function WordCounter({ count, min }: { count: number; min: number }) {
  const t = useTranslations("Writing.workspace");
  const reached = count >= min;
  const percent = Math.min(100, Math.round((count / min) * 100));

  return (
    <div className="min-w-0 flex-1 sm:max-w-xs" aria-live="polite">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="font-semibold tabular-nums">
          {t("words", { count })}{" "}
          <span className="font-normal text-muted-foreground">/ {t("minTarget", { count: min })}</span>
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-xs",
            reached ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground",
          )}
        >
          {reached && <CheckCircle2Icon className="size-3.5" />}
          {reached ? t("reachedMin") : t("underMin", { count: min - count })}
        </span>
      </div>
      <div
        className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={min}
        aria-valuenow={Math.min(count, min)}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            reached ? "bg-emerald-500" : "bg-amber-500",
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
