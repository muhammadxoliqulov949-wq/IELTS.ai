"use client";

import { InfoIcon, RotateCcwIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useStorageValue } from "@/hooks/use-storage-value";
import { parseResult, resultKey } from "@/lib/writing-storage";
import { cn } from "@/lib/utils";
import { getSampleFeedback } from "@/mocks/writing-feedback";
import type { WritingTask } from "@/types/ielts";
import { BandSummary } from "./band-summary";
import { CorrectionsPanel } from "./corrections-panel";
import { CriterionCard } from "./criterion-card";
import { TipsCard } from "./tips-card";

export function WritingResultView({ task }: { task: WritingTask }) {
  const t = useTranslations("Writing.result");
  const raw = useStorageValue(resultKey(task.id), "session");

  if (raw === undefined) {
    return (
      <div className="container-page space-y-4 py-12" aria-busy>
        <Skeleton className="h-40" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  const stored = parseResult(raw);
  const feedback = stored?.feedback ?? getSampleFeedback(task);

  return (
    <div className="container-page space-y-6 py-10 sm:py-14">
      {!stored && (
        <p className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground">
          <InfoIcon className="mt-0.5 size-4 shrink-0" />
          {t("sampleNote")}
        </p>
      )}

      <BandSummary task={task} feedback={feedback} submission={stored?.submission} />

      <div className="grid gap-4 md:grid-cols-2">
        {feedback.criteria.map((criterion) => (
          <CriterionCard key={criterion.key} criterion={criterion} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <CorrectionsPanel corrections={feedback.corrections} text={stored?.submission.text} />
        <TipsCard tips={feedback.tips} />
      </div>

      <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row">
        <Link href={`/writing/${task.id}`} className={cn(buttonVariants(), "h-11 px-5")}>
          <RotateCcwIcon />
          {t("retry")}
        </Link>
        <Link
          href="/writing"
          className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}
        >
          {t("otherTask")}
        </Link>
      </div>
      <p className="text-xs text-muted-foreground">{t("disclaimer")}</p>
    </div>
  );
}
