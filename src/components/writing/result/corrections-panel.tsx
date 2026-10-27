import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InlineCorrection } from "@/types/ielts";
import { HighlightedEssay } from "./highlighted-essay";

interface CorrectionsPanelProps {
  corrections: InlineCorrection[];
  text?: string;
}

export function CorrectionsPanel({ corrections, text }: CorrectionsPanelProps) {
  const t = useTranslations("Writing.result");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t("corrections")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {text && (
          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">{t("yourEssay")}</p>
            <HighlightedEssay text={text} corrections={corrections} />
          </div>
        )}

        <ol className="space-y-3">
          {corrections.map((c, i) => (
            <li key={c.id} id={`correction-${c.id}`} className="scroll-mt-24 rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">#{i + 1}</span>
                <Badge variant="secondary">{t(`categories.${c.category}`)}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded bg-rose-50 px-1.5 py-0.5 text-rose-700 line-through dark:bg-rose-950/50 dark:text-rose-300">
                  {c.original}
                </span>
                <ArrowRightIcon className="size-4 text-muted-foreground" />
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  {c.suggestion}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.explanation}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
