import { LightbulbIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

/** Static product mock-up: what a Writing result card looks like. */
const previewCriteria = [
  { label: "Task Response", band: 7 },
  { label: "Coherence & Cohesion", band: 6.5 },
  { label: "Lexical Resource", band: 7 },
  { label: "Grammar Range & Accuracy", band: 6.5 },
];

export function HeroPreview() {
  const t = useTranslations("Hero");

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div aria-hidden className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
      <Card className="shadow-xl">
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{t("previewTask")}</p>
              <p className="text-sm font-medium">{t("previewBand")}</p>
            </div>
            <div className="grid size-16 place-items-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
              7.0
            </div>
          </div>

          <ul className="space-y-3">
            {previewCriteria.map((c) => (
              <li key={c.label} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{c.label}</span>
                  <span className="font-semibold">{c.band.toFixed(1)}</span>
                </div>
                <Progress value={(c.band / 9) * 100} aria-label={c.label} />
              </li>
            ))}
          </ul>

          <div className="rounded-lg border-l-4 border-primary bg-muted/60 p-3 text-xs">
            <p className="text-muted-foreground line-through">
              However, the government should invest more money.
            </p>
            <p className="mt-1 font-medium">
              Nevertheless, governments should allocate greater funding.
            </p>
          </div>

          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <LightbulbIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
            {t("previewTip")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
