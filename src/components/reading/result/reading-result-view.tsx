"use client";

import { RotateCcwIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useStorageValue } from "@/hooks/use-storage-value";
import { parseJson, readingResultKey } from "@/lib/reading";
import { cn } from "@/lib/utils";
import type { ReadingResult, ReadingTest } from "@/types/ielts";
import { AnswerReview } from "./answer-review";
import { ReadingScoreSummary } from "./reading-score-summary";

export function ReadingResultView({ test }: { test: ReadingTest }) {
  const t = useTranslations("Reading.result");
  const raw = useStorageValue(readingResultKey(test.id), "session");

  if (raw === undefined) {
    return (
      <div className="container-page space-y-4 py-12" aria-busy>
        <Skeleton className="h-40" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  const result = parseJson<ReadingResult>(raw);
  if (!result) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-lg text-muted-foreground">{t("empty")}</p>
        <Link href={`/reading/${test.id}`} className={cn(buttonVariants(), "h-11 px-5")}>
          {t("emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page space-y-6 py-10 sm:py-14">
      <ReadingScoreSummary test={test} result={result} />
      <AnswerReview questions={test.questions} answers={result.answers} />

      <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row">
        <Link href={`/reading/${test.id}`} className={cn(buttonVariants(), "h-11 px-5")}>
          <RotateCcwIcon />
          {t("retry")}
        </Link>
        <Link href="/reading" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}>
          {t("otherTest")}
        </Link>
      </div>
      <p className="text-xs text-muted-foreground">{t("disclaimer")}</p>
    </div>
  );
}
