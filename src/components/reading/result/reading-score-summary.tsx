import { CheckCircle2Icon, ClockIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BandRing } from "@/components/shared/band-ring";
import type { ReadingResult, ReadingTest } from "@/types/ielts";

export function ReadingScoreSummary({ test, result }: { test: ReadingTest; result: ReadingResult }) {
  const t = useTranslations("Reading.result");
  const percent = Math.round((result.correct / result.total) * 100);

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <BandRing band={result.band} label={t("band")} />
        <div className="min-w-0 flex-1 space-y-3">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">{t("eyebrow")}</p>
          <h1 className="text-2xl font-bold text-balance sm:text-3xl">{test.passage.title}</h1>
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            <Badge variant="secondary" className="gap-1">
              <CheckCircle2Icon />
              {t("score", { correct: result.correct, total: result.total })}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <ClockIcon />
              {t("time", { minutes: Math.max(1, Math.round(result.timeSpentSeconds / 60)) })}
            </Badge>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted" aria-hidden>
            <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
