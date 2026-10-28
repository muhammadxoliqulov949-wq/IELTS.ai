"use client";

import { ChevronRightIcon, HistoryIcon } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useStorageValue } from "@/hooks/use-storage-value";
import { ATTEMPTS_KEY, parseAttempts } from "@/lib/attempts";
import { bandTone, formatBand } from "@/lib/band";
import { cn } from "@/lib/utils";
import { skillMeta } from "./skill-meta";

const SHOWN = 5;

/** Real attempts taken in this browser (from the local attempt log). */
export function RecentAttempts() {
  const t = useTranslations("Dashboard");
  const format = useFormatter();
  const raw = useStorageValue(ATTEMPTS_KEY, "local");
  const attempts = parseAttempts(raw).slice(0, SHOWN);
  // Built from message month names: Intl lacks Uzbek month data in many browsers.
  const months = t.raw("history.months") as string[];
  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return `${date.getDate()} ${months[date.getMonth()]}, ${format.dateTime(date, { timeStyle: "short" })}`;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">{t("recent.title")}</CardTitle>
        <p className="text-sm text-muted-foreground">{t("recent.subtitle")}</p>
      </CardHeader>
      <CardContent>
        {raw === undefined ? (
          <div className="space-y-2">
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
          </div>
        ) : attempts.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center text-sm text-muted-foreground">
            <HistoryIcon className="size-8 opacity-60" />
            {t("recent.empty")}
          </div>
        ) : (
          <ul className="divide-y">
            {attempts.map((attempt) => {
              const { icon: Icon, color } = skillMeta[attempt.skill];
              return (
                <li key={attempt.id}>
                  <Link
                    href={attempt.href}
                    aria-label={`${attempt.title} — ${t("recent.view")}`}
                    className="group flex items-center gap-3 py-3"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted" style={{ color }}>
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{attempt.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {t(`skills.${attempt.skill}`)} ·{" "}
                        {formatDate(attempt.finishedAt)}
                      </span>
                    </span>
                    <span className={cn("text-lg font-bold tabular-nums", bandTone(attempt.band))}>
                      {formatBand(attempt.band)}
                    </span>
                    <ChevronRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
