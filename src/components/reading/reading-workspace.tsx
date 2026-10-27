"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { TimerAlert } from "@/components/exam/timer-alert";
import { useCountdown } from "@/hooks/use-countdown";
import { useStorageValue } from "@/hooks/use-storage-value";
import {
  answersKey,
  clearAnswers,
  parseJson,
  saveAnswers,
  saveReadingResult,
  scoreReading,
} from "@/lib/reading";
import type { ReadingAnswers, ReadingTest } from "@/types/ielts";
import { FinishDialog } from "./finish-dialog";
import { PassagePanel } from "./passage-panel";
import { QuestionPalette } from "./question-palette";
import { QuestionsPanel } from "./questions-panel";
import { ReadingTopBar } from "./reading-top-bar";

export function ReadingWorkspace({ test }: { test: ReadingTest }) {
  const router = useRouter();
  const timer = useCountdown(test.timeLimitMinutes * 60);
  const stored = useStorageValue(answersKey(test.id), "local");
  const restored = useMemo(() => parseJson<ReadingAnswers>(stored) ?? {}, [stored]);
  const [edited, setEdited] = useState<ReadingAnswers | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const finishedRef = useRef(false);

  // Local edits win; until the first answer, show answers restored from storage.
  const answers = edited ?? restored;
  const answeredCount = test.questions.filter((q) => answers[q.id]).length;

  function setAnswer(questionId: string, value: string) {
    const next = { ...answers, [questionId]: value };
    setEdited(next);
    saveAnswers(test.id, next);
  }

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    saveReadingResult(scoreReading(test, answers, timer.elapsed));
    clearAnswers(test.id);
    router.push(`/reading/${test.id}/result`);
  }, [answers, router, test, timer.elapsed]);

  // In the real exam answers are collected when time runs out.
  useEffect(() => {
    if (timer.status === "expired") finish();
  }, [timer.status, finish]);

  return (
    <div className="flex min-h-dvh flex-col bg-muted/30 lg:h-dvh">
      <ReadingTopBar test={test} timer={timer} />

      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-4 p-4 sm:p-6 lg:min-h-0 lg:grid-cols-2">
        <PassagePanel passage={test.passage} />
        <div className="flex flex-col overflow-hidden rounded-xl border bg-background shadow-sm lg:min-h-0">
          <TimerAlert status={timer.status} />
          <QuestionsPanel
            questions={test.questions}
            answers={answers}
            onAnswer={setAnswer}
            disabled={timer.status === "paused" || timer.status === "expired"}
          />
        </div>
      </div>

      <QuestionPalette
        questions={test.questions}
        answers={answers}
        answeredCount={answeredCount}
        onFinish={() => setConfirmOpen(true)}
      />
      <FinishDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        unanswered={test.questions.length - answeredCount}
        onConfirm={finish}
      />
    </div>
  );
}
