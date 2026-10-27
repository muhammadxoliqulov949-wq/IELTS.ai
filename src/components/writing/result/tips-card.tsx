import { LightbulbIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TipsCard({ tips }: { tips: [string, string, string] }) {
  const t = useTranslations("Writing.result");

  return (
    <Card className="border-primary/30 bg-primary/5 lg:self-start">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <LightbulbIcon className="size-5 text-amber-500" />
          {t("tips")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4">
          {tips.map((tip, i) => (
            <li key={tip} className="flex gap-3 text-sm">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="leading-6">{tip}</span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
