"use client";

import { LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ExamTimer } from "@/components/exam/exam-timer";
import { Logo } from "@/components/shared/logo";
import type { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";
import type { ReadingTest } from "@/types/ielts";

interface ReadingTopBarProps {
  test: ReadingTest;
  timer: ReturnType<typeof useCountdown>;
}

export function ReadingTopBar({ test, timer }: ReadingTopBarProps) {
  const t = useTranslations("Exam");

  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Logo className="hidden sm:inline-flex" />
          <Badge variant="secondary" className="shrink-0">
            Reading
          </Badge>
          <span className="hidden truncate text-sm font-medium md:inline">{test.title}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ExamTimer timer={timer} disabled={false} />
          <Link href="/reading" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-9")}>
            <LogOutIcon />
            <span className="hidden sm:inline">{t("exit")}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
