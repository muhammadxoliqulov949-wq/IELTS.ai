"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { MultipleChoiceQuestion as MultipleChoiceQuestionType } from "@/types/ielts";
import { QuestionShell } from "./question-shell";

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  value?: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export function MultipleChoiceQuestion({ question, value, onChange, disabled }: MultipleChoiceQuestionProps) {
  const labelId = `${question.id}-label`;

  return (
    <QuestionShell question={question} labelId={labelId} answered={Boolean(value)}>
      <RadioGroup
        aria-labelledby={labelId}
        value={value ?? null}
        onValueChange={(v) => onChange(String(v))}
        disabled={disabled}
        className="gap-2"
      >
        {question.options.map((option) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-muted has-data-checked:border-primary has-data-checked:bg-primary/5 has-disabled:cursor-not-allowed has-disabled:opacity-60"
          >
            <RadioGroupItem value={option.id} className="mt-0.5" />
            <span className="font-semibold">{option.id}</span>
            <span>{option.label}</span>
          </label>
        ))}
      </RadioGroup>
    </QuestionShell>
  );
}
