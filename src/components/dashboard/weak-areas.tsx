import { CircleAlertIcon, InfoIcon, TriangleAlertIcon, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Skill, WeakArea, WeakAreaSeverity } from "@/types/ielts";

const severityStyle: Record<WeakAreaSeverity, { icon: LucideIcon; className: string }> = {
  high: { icon: TriangleAlertIcon, className: "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300" },
  medium: { icon: CircleAlertIcon, className: "bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300" },
  low: { icon: InfoIcon, className: "bg-sky-50 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300" },
};

/** Where to practise for each skill; Listening/Speaking modules come later. */
const practiceHref: Partial<Record<Skill, string>> = {
  reading: "/reading",
  writing: "/writing",
};

/** Diagnostic list of weak areas; severity is shown as icon + label, never colour alone. */
export function WeakAreas({ areas }: { areas: WeakArea[] }) {
  const t = useTranslations("Dashboard");

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">{t("weakAreas.title")}</CardTitle>
        <p className="text-sm text-muted-foreground">{t("weakAreas.subtitle")}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {areas.map((area) => {
            const { icon: Icon, className } = severityStyle[area.severity];
            const href = practiceHref[area.skill];
            return (
              <li key={area.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">{t(`skills.${area.skill}`)}</span>
                  <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold", className)}>
                    <Icon className="size-3" />
                    {t(`weakAreas.severity.${area.severity}`)}
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-semibold">{area.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{area.description}</p>
                {href && (
                  <Link href={href} className="mt-2 inline-block text-sm font-semibold text-primary hover:underline">
                    {t("weakAreas.practice")} →
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
