import { TargetIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatBand } from "@/lib/band";
import type { DashboardData } from "@/types/ielts";

/** Greeting, overall band and progress toward the target band. */
export function DashboardHeader({ data }: { data: DashboardData }) {
  const t = useTranslations("Dashboard");
  const gap = Math.max(0, data.targetBand - data.overallBand);
  const progress = Math.min(100, (data.overallBand / data.targetBand) * 100);

  return (
    <Card>
      <CardContent className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold sm:text-3xl">{t("greeting", { name: data.studentName })}</h1>
            <Badge variant="outline">{t("demo")}</Badge>
          </div>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="flex items-center gap-5 md:min-w-80">
          <div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <div className="text-center">
              <span className="block text-3xl font-extrabold tabular-nums">{formatBand(data.overallBand)}</span>
              <span className="text-[10px] tracking-wide uppercase opacity-80">{t("overall")}</span>
            </div>
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <p className="flex items-center gap-1.5 text-sm font-medium">
              <TargetIcon className="size-4 text-primary" />
              {t("target", { band: formatBand(data.targetBand) })}
            </p>
            <div
              className="h-2 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={data.targetBand}
              aria-valuenow={data.overallBand}
            >
              <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground">
              {gap > 0 ? t("toTarget", { gap: formatBand(gap) }) : t("reachedTarget")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
