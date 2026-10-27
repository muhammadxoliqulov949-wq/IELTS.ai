import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BandRing } from "@/components/shared/band-ring";
import { formatBand } from "@/lib/band";
import type { WritingFeedback, WritingSubmission, WritingTask } from "@/types/ielts";

interface BandSummaryProps {
  task: WritingTask;
  feedback: WritingFeedback;
  submission?: WritingSubmission;
}

export function BandSummary({ task, feedback, submission }: BandSummaryProps) {
  const t = useTranslations("Writing");

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <BandRing band={feedback.overallBand} label={t("result.overall")} />
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            {t("result.eyebrow")}
          </p>
          <h1 className="text-2xl font-bold text-balance sm:text-3xl">{task.title}</h1>
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            <Badge variant="secondary">{t(`picker.${task.type}`)}</Badge>
            {submission ? (
              <Badge variant="outline">
                {t("result.meta", {
                  words: submission.wordCount,
                  minutes: Math.max(1, Math.round(submission.timeSpentSeconds / 60)),
                })}
              </Badge>
            ) : (
              <Badge variant="outline">{t("result.sample")}</Badge>
            )}
          </div>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-1 text-sm text-muted-foreground sm:justify-start">
            {feedback.criteria.map((c) => (
              <li key={c.key}>
                {t(`result.criteria.${c.key}`).split(" ")[0]}{" "}
                <span className="font-semibold text-foreground">{formatBand(c.band)}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
