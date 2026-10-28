import { ArrowUpRightIcon, MinusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { formatBand } from "@/lib/band";
import type { SkillScore } from "@/types/ielts";
import { skillMeta } from "./skill-meta";

export function SkillScoreCard({ score }: { score: SkillScore }) {
  const t = useTranslations("Dashboard");
  const { icon: Icon, color } = skillMeta[score.skill];
  const improved = score.delta > 0;

  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="flex min-w-0 items-center gap-2 text-sm font-medium">
            <span className="hidden size-8 shrink-0 place-items-center rounded-lg bg-muted sm:grid" style={{ color }}>
              <Icon className="size-4" />
            </span>
            {t(`skills.${score.skill}`)}
          </span>
          <span className="text-2xl font-bold tabular-nums sm:text-3xl">{formatBand(score.band)}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
          <div
            className="h-full rounded-full"
            style={{ width: `${(score.band / 9) * 100}%`, backgroundColor: color }}
          />
        </div>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          {improved ? (
            <ArrowUpRightIcon className="size-3.5 text-emerald-600" />
          ) : (
            <MinusIcon className="size-3.5" />
          )}
          {improved ? t("delta", { delta: `+${score.delta.toFixed(1)}` }) : t("noChange")}
        </p>
      </CardContent>
    </Card>
  );
}
