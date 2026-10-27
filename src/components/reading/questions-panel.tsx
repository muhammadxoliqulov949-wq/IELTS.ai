"use client";

import { useTranslations } from "next-intl";
import type { ReadingAnswers, ReadingQuestion } from "@/types/ielts";
import { MultipleChoiceQuestion } from "./multiple-choice-question";
import { TfngQuestion } from "./tfng-question";

interface QuestionsPanelProps {
  questions: ReadingQuestion[];
  answers: ReadingAnswers;
  onAnswer: (questionId: string, value: string) => void;
  disabled: boolean;
}

type Group = { kind: ReadingQuestion["kind"]; items: ReadingQuestion[] };

/** Consecutive questions of the same type share one instruction block. */
function groupByKind(questions: ReadingQuestion[]): Group[] {
  return questions.reduce<Group[]>((groups, q) => {
    const last = groups.at(-1);
    if (last && last.kind === q.kind) last.items.push(q);
    else groups.push({ kind: q.kind, items: [q] });
    return groups;
  }, []);
}

export function QuestionsPanel({ questions, answers, onAnswer, disabled }: QuestionsPanelProps) {
  const t = useTranslations("Reading.workspace");

  return (
    <div className="space-y-8 p-5 sm:p-8 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
      {groupByKind(questions).map((group) => {
        const range = { from: group.items[0].number, to: group.items.at(-1)?.number ?? 0 };
        const isTfng = group.kind === "tfng";
        return (
          <section key={range.from} className="space-y-4">
            <header className="rounded-lg bg-muted/60 p-4">
              <h2 className="font-semibold">{t(isTfng ? "tfngTitle" : "mcTitle", range)}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t(isTfng ? "tfngInstruction" : "mcInstruction")}
              </p>
            </header>
            {group.items.map((q) =>
              q.kind === "tfng" ? (
                <TfngQuestion
                  key={q.id}
                  question={q}
                  value={answers[q.id]}
                  onChange={(v) => onAnswer(q.id, v)}
                  disabled={disabled}
                />
              ) : (
                <MultipleChoiceQuestion
                  key={q.id}
                  question={q}
                  value={answers[q.id]}
                  onChange={(v) => onAnswer(q.id, v)}
                  disabled={disabled}
                />
              ),
            )}
          </section>
        );
      })}
    </div>
  );
}
