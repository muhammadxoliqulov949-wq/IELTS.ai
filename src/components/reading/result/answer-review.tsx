"use client";

import { CheckIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { correctAnswerOf, isCorrect } from "@/lib/reading";
import { cn } from "@/lib/utils";
import type { ReadingAnswers, ReadingQuestion, TfngAnswer } from "@/types/ielts";

const tfngChoices: TfngAnswer[] = ["true", "false", "not_given"];

interface AnswerReviewProps {
  questions: ReadingQuestion[];
  answers: ReadingAnswers;
}

export function AnswerReview({ questions, answers }: AnswerReviewProps) {
  const t = useTranslations("Reading");
  const [onlyMistakes, setOnlyMistakes] = useState(false);

  /** Human-readable answer: "B — cheaper LED lighting" or "NOT GIVEN". */
  const describe = (q: ReadingQuestion, answer: string | undefined) => {
    if (!answer) return t("result.noAnswer");
    if (q.kind === "tfng") {
      const choice = tfngChoices.find((c) => c === answer);
      return choice ? t(`workspace.tfng.${choice}`) : answer;
    }
    const option = q.options.find((o) => o.id === answer);
    return option ? `${option.id} — ${option.label}` : answer;
  };

  const shown = onlyMistakes ? questions.filter((q) => !isCorrect(q, answers[q.id])) : questions;

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
        <CardTitle className="text-base">{t("result.review")}</CardTitle>
        <div className="inline-flex rounded-lg border bg-muted/50 p-0.5 text-xs font-semibold" role="group">
          {[false, true].map((mistakes) => (
            <button
              key={String(mistakes)}
              type="button"
              aria-pressed={onlyMistakes === mistakes}
              onClick={() => setOnlyMistakes(mistakes)}
              className={cn(
                "rounded-md px-3 py-1.5 transition-colors",
                onlyMistakes === mistakes ? "bg-background shadow-sm" : "text-muted-foreground",
              )}
            >
              {mistakes ? t("result.showIncorrect") : t("result.showAll")}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ol className="divide-y">
          {shown.map((q) => {
            const answer = answers[q.id];
            const ok = isCorrect(q, answer);
            return (
              <li key={q.id} className="flex gap-3 py-4">
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full text-white",
                    ok ? "bg-emerald-500" : "bg-rose-500",
                  )}
                  aria-label={ok ? t("result.correct") : t("result.incorrect")}
                >
                  {ok ? <CheckIcon className="size-4" /> : <XIcon className="size-4" />}
                </span>
                <div className="min-w-0 space-y-1.5 text-sm">
                  <p className="font-medium">
                    {q.number}. {q.prompt}
                  </p>
                  <p className={cn(ok ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400")}>
                    {t("result.yourAnswer")}: {describe(q, answer)}
                  </p>
                  {!ok && (
                    <p className="text-muted-foreground">
                      {t("result.correctAnswer")}: {describe(q, correctAnswerOf(q))}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
