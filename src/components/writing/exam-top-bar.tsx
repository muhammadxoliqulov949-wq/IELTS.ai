"use client";

import { EyeIcon, EyeOffIcon, LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import type { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";
import type { WritingTask } from "@/types/ielts";
import { ExamTimer } from "./exam-timer";

interface ExamTopBarProps {
  task: WritingTask;
  timer: ReturnType<typeof useCountdown>;
  focusMode: boolean;
  onToggleFocus: () => void;
  disabled: boolean;
}

export function ExamTopBar({ task, timer, focusMode, onToggleFocus, disabled }: ExamTopBarProps) {
  const t = useTranslations("Writing");

  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Logo className="hidden sm:inline-flex" />
          <Badge variant="secondary" className="shrink-0">
            {t(`picker.${task.type}`)}
          </Badge>
          <span className="hidden truncate text-sm font-medium md:inline">{task.title}</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ExamTimer timer={timer} disabled={disabled} />
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFocus}
            disabled={disabled}
            aria-pressed={focusMode}
            className="h-9"
          >
            {focusMode ? <EyeIcon /> : <EyeOffIcon />}
            <span className="hidden sm:inline">
              {focusMode ? t("workspace.focusOff") : t("workspace.focusOn")}
            </span>
          </Button>
          <Link
            href="/writing"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-9")}
          >
            <LogOutIcon />
            <span className="hidden sm:inline">{t("workspace.exit")}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
