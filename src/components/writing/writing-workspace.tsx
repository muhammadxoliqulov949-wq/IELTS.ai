"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { TimerAlert } from "@/components/exam/timer-alert";
import { useCountdown } from "@/hooks/use-countdown";
import { useStorageValue } from "@/hooks/use-storage-value";
import { evaluateWriting } from "@/mocks/handlers";
import { recordAttempt } from "@/lib/attempts";
import { clearDraft, countWords, draftKey, saveDraft, saveResult } from "@/lib/writing-storage";
import { cn } from "@/lib/utils";
import type { WritingSubmission, WritingTask } from "@/types/ielts";
import { AnalyzingState } from "./analyzing-state";
import { EditorFooter } from "./editor-footer";
import { ExamTopBar } from "./exam-top-bar";
import { TaskPrompt } from "./task-prompt";

export function WritingWorkspace({ task }: { task: WritingTask }) {
  const t = useTranslations("Writing.workspace");
  const router = useRouter();
  const timer = useCountdown(task.timeLimitMinutes * 60);
  const storedDraft = useStorageValue(draftKey(task.id), "local");
  const [typed, setTyped] = useState<string | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Local edits win; until the first keystroke, show the restored draft.
  const text = typed ?? storedDraft ?? "";
  const wordCount = countWords(text);
  const locked = timer.status === "paused" || timer.status === "expired";

  function handleChange(value: string) {
    setTyped(value);
    saveDraft(task.id, value);
  }

  async function handleSubmit() {
    timer.pause();
    setIsAnalyzing(true);
    const submission: WritingSubmission = {
      taskId: task.id,
      text,
      wordCount,
      timeSpentSeconds: timer.elapsed,
      submittedAt: new Date().toISOString(),
    };
    const feedback = await evaluateWriting(task, submission);
    saveResult(task.id, { submission, feedback });
    recordAttempt({
      skill: "writing",
      title: task.title,
      band: feedback.overallBand,
      finishedAt: submission.submittedAt,
      href: `/writing/${task.id}/result`,
    });
    clearDraft(task.id);
    router.push(`/writing/${task.id}/result`);
  }

  return (
    <div className="flex min-h-dvh flex-col bg-muted/30">
      <ExamTopBar
        task={task}
        timer={timer}
        focusMode={focusMode}
        onToggleFocus={() => setFocusMode((v) => !v)}
        disabled={isAnalyzing}
      />

      {isAnalyzing ? (
        <AnalyzingState />
      ) : (
        <div
          className={cn(
            "mx-auto grid w-full flex-1 gap-4 p-4 sm:p-6",
            focusMode ? "max-w-3xl" : "max-w-7xl lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
          )}
        >
          {!focusMode && <TaskPrompt task={task} />}

          <div className="flex min-h-[60vh] flex-col overflow-hidden rounded-xl border bg-background shadow-sm">
            <TimerAlert status={timer.status} />
            <label htmlFor="essay" className="sr-only">
              {t("editorLabel")}
            </label>
            <textarea
              id="essay"
              value={text}
              onChange={(e) => handleChange(e.target.value)}
              disabled={locked}
              placeholder={t("placeholder")}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="sentences"
              className="flex-1 resize-none bg-transparent p-5 text-base leading-8 outline-none placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-60 sm:p-8 sm:text-lg"
            />
            <EditorFooter
              wordCount={wordCount}
              minWords={task.minWords}
              canSubmit={wordCount > 0}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}
