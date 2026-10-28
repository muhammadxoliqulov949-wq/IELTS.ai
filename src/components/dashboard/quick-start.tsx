import { ArrowRightIcon, BarChart3Icon, BookOpenIcon, HeadphonesIcon, MicIcon, PenLineIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { writingTasks } from "@/mocks/writing-tasks";
import { readingTests } from "@/mocks/reading-tests";

const firstTask1 = writingTasks.find((task) => task.type === "task1");
const firstTask2 = writingTasks.find((task) => task.type === "task2");

const actions = [
  { key: "writingTask1", icon: BarChart3Icon, href: firstTask1 && `/writing/${firstTask1.id}` },
  { key: "writingTask2", icon: PenLineIcon, href: firstTask2 && `/writing/${firstTask2.id}` },
  { key: "reading", icon: BookOpenIcon, href: readingTests[0] && `/reading/${readingTests[0].id}` },
  { key: "listening", icon: HeadphonesIcon, href: undefined },
  { key: "speaking", icon: MicIcon, href: undefined },
] as const;

/** One-click entry into a mock test; future modules show as disabled. */
export function QuickStart() {
  const t = useTranslations("Dashboard.quickStart");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {actions.map(({ key, icon: Icon, href }) => {
            const body = (
              <>
                <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="flex-1 text-sm font-medium">{t(key)}</span>
                {href ? (
                  <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                ) : (
                  <Badge variant="outline">{t("soon")}</Badge>
                )}
              </>
            );
            return (
              <li key={key}>
                {href ? (
                  <Link href={href} className="group flex items-center gap-3 rounded-lg border p-2.5 transition-colors hover:border-primary/50 hover:bg-muted/50">
                    {body}
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 rounded-lg border border-dashed p-2.5 opacity-60" aria-disabled>
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
