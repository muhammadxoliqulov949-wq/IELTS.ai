import { CircleCheckIcon, CircleAlertIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bandTone, formatBand } from "@/lib/band";
import { cn } from "@/lib/utils";
import type { CriterionScore } from "@/types/ielts";

export function CriterionCard({ criterion }: { criterion: CriterionScore }) {
  const t = useTranslations("Writing.result");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base leading-snug">{t(`criteria.${criterion.key}`)}</CardTitle>
          <span className={cn("text-2xl font-bold tabular-nums", bandTone(criterion.band))}>
            {formatBand(criterion.band)}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${(criterion.band / 9) * 100}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{criterion.summary}</p>
      </CardHeader>
      <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
        <FeedbackList
          title={t("strengths")}
          items={criterion.strengths}
          icon={<CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-500" />}
        />
        <FeedbackList
          title={t("weaknesses")}
          items={criterion.weaknesses}
          icon={<CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />}
        />
      </CardContent>
    </Card>
  );
}

function FeedbackList({ title, items, icon }: { title: string; items: string[]; icon: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">{title}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            {icon}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
