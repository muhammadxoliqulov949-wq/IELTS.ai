"use client";

import { FlagIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReadingAnswers, ReadingQuestion } from "@/types/ielts";
import { questionAnchorId } from "./question-shell";

interface QuestionPaletteProps {
  questions: ReadingQuestion[];
  answers: ReadingAnswers;
  answeredCount: number;
  onFinish: () => void;
}

/** Bottom bar: jump to any question, see progress, finish the test. */
export function QuestionPalette({ questions, answers, answeredCount, onFinish }: QuestionPaletteProps) {
  const t = useTranslations("Reading.workspace");

  function jumpTo(questionId: string) {
    const el = document.getElementById(questionAnchorId(questionId));
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.querySelector<HTMLElement>("[role=radio]")?.focus({ preventScroll: true });
  }

  return (
    <nav
      aria-label={t("palette")}
      className="sticky bottom-0 z-20 border-t bg-background/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:px-6">
        <div className="flex flex-1 gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {questions.map((q) => {
            const answered = Boolean(answers[q.id]);
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => jumpTo(q.id)}
                aria-label={t("goTo", { number: q.number })}
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-md border text-sm font-semibold transition-colors",
                  answered
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background hover:border-primary/50",
                )}
              >
                {q.number}
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <span className="text-sm text-muted-foreground tabular-nums">
            {t("answered", { answered: answeredCount, total: questions.length })}
          </span>
          <Button onClick={onFinish} className="h-10 px-4">
            <FlagIcon />
            {t("finish")}
          </Button>
        </div>
      </div>
    </nav>
  );
}
