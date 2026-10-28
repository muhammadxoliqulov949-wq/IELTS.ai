"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ScoreHistoryPoint } from "@/types/ielts";
import { HistoryChart } from "./history-chart";
import { HistoryTable } from "./history-table";
import { skillMeta, skillOrder } from "./skill-meta";

type View = "chart" | "table";

/** Score-history card: legend, chart/table toggle. */
export function ScoreHistory({ history }: { history: ScoreHistoryPoint[] }) {
  const t = useTranslations("Dashboard");
  const [view, setView] = useState<View>("chart");
  // Month names come from messages: browsers often lack Uzbek month data
  // and Intl falls back to "M07".
  const months = t.raw("history.months") as string[];
  const monthLabel = (date: string) => months[new Date(date).getMonth()] ?? date;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle className="text-base">{t("history.title")}</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">{t("history.subtitle")}</p>
        </div>
        <div className="inline-flex rounded-lg border bg-muted/50 p-0.5 text-xs font-semibold" role="group">
          {(["chart", "table"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-md px-3 py-1.5 transition-colors",
                view === v ? "bg-background shadow-sm" : "text-muted-foreground",
              )}
            >
              {t(`history.${v}`)}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {skillOrder.map((skill) => (
            <li key={skill} className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: skillMeta[skill].color }} />
              {t(`skills.${skill}`)}
            </li>
          ))}
        </ul>
        {view === "chart" ? (
          <HistoryChart history={history} monthLabel={monthLabel} />
        ) : (
          <HistoryTable history={history} monthLabel={monthLabel} />
        )}
      </CardContent>
    </Card>
  );
}
