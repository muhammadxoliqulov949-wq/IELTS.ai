import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ReadingQuestion } from "@/types/ielts";

export const questionAnchorId = (questionId: string) => `question-${questionId}`;

interface QuestionShellProps {
  question: ReadingQuestion;
  labelId: string;
  answered: boolean;
  children: ReactNode;
}

/** Shared frame for every question type: number badge, prompt, scroll anchor. */
export function QuestionShell({ question, labelId, answered, children }: QuestionShellProps) {
  return (
    <div id={questionAnchorId(question.id)} className="scroll-mt-4 space-y-3">
      <p id={labelId} className="flex gap-3 font-medium leading-6">
        <span
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-md text-sm font-bold transition-colors",
            answered ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          {question.number}
        </span>
        <span className="pt-0.5">{question.prompt}</span>
      </p>
      <div className="pl-10">{children}</div>
    </div>
  );
}
