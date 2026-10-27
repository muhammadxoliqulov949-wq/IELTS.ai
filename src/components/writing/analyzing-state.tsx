"use client";

import { CheckIcon, Loader2Icon, SparklesIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const steps = ["task", "coherence", "lexical", "grammar"] as const;
const STEP_MS = 700;

/** Shown while the (mock) AI scores the essay. */
export function AnalyzingState() {
  const t = useTranslations("Writing.analyzing");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => Math.min(i + 1, steps.length - 1));
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-8 p-6 text-center">
      <div className="relative grid size-20 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        <span className="relative grid size-20 place-items-center rounded-full bg-primary text-primary-foreground">
          <SparklesIcon className="size-9" />
        </span>
      </div>
      <div>
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <ol className="w-full space-y-2 text-left" aria-live="polite">
        {steps.map((step, i) => (
          <li
            key={step}
            className={cn(
              "flex items-center gap-3 rounded-lg border bg-background px-4 py-3 text-sm transition-opacity",
              i > active && "opacity-40",
            )}
          >
            {i < active ? (
              <CheckIcon className="size-4 text-emerald-500" />
            ) : i === active ? (
              <Loader2Icon className="size-4 animate-spin text-primary" />
            ) : (
              <span className="size-4" />
            )}
            {t(`steps.${step}`)}
          </li>
        ))}
      </ol>

      <div className="grid w-full grid-cols-4 gap-2" aria-hidden>
        {steps.map((step) => (
          <Skeleton key={step} className="h-16" />
        ))}
      </div>
    </div>
  );
}
