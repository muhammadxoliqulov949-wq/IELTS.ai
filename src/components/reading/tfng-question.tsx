"use client";

import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { TfngAnswer, TfngQuestion as TfngQuestionType } from "@/types/ielts";
import { QuestionShell } from "./question-shell";

const choices: TfngAnswer[] = ["true", "false", "not_given"];

interface TfngQuestionProps {
  question: TfngQuestionType;
  value?: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export function TfngQuestion({ question, value, onChange, disabled }: TfngQuestionProps) {
  const t = useTranslations("Reading.workspace.tfng");
  const labelId = `${question.id}-label`;

  return (
    <QuestionShell question={question} labelId={labelId} answered={Boolean(value)}>
      <RadioGroup
        aria-labelledby={labelId}
        value={value ?? null}
        onValueChange={(v) => onChange(String(v))}
        disabled={disabled}
        className="flex flex-wrap gap-2"
      >
        {choices.map((choice) => (
          <label
            key={choice}
            className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted has-data-checked:border-primary has-data-checked:bg-primary/5 has-data-checked:text-primary has-disabled:cursor-not-allowed has-disabled:opacity-60"
          >
            <RadioGroupItem value={choice} />
            {t(choice)}
          </label>
        ))}
      </RadioGroup>
    </QuestionShell>
  );
}
