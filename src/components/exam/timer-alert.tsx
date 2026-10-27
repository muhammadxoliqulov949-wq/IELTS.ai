"use client";

import { AlarmClockIcon, PauseCircleIcon, TriangleAlertIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { CountdownStatus } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";

type AlertStatus = Exclude<CountdownStatus, "running">;

const styles: Record<AlertStatus, { className: string; icon: typeof AlarmClockIcon }> = {
  paused: { className: "bg-muted text-muted-foreground", icon: PauseCircleIcon },
  warning: {
    className: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
    icon: AlarmClockIcon,
  },
  critical: {
    className: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
    icon: TriangleAlertIcon,
  },
  expired: { className: "bg-rose-600 text-white", icon: TriangleAlertIcon },
};

/** Banner above the editor for paused / low-time / expired states. */
export function TimerAlert({ status }: { status: CountdownStatus }) {
  const t = useTranslations("Exam.timer");
  if (status === "running") return null;

  const { className, icon: Icon } = styles[status];
  return (
    <div
      role={status === "paused" ? "status" : "alert"}
      className={cn("flex items-center gap-2 border-b px-5 py-2.5 text-sm font-medium", className)}
    >
      <Icon className="size-4 shrink-0" />
      {t(status)}
    </div>
  );
}
