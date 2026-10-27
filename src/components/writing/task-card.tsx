import { ArrowRightIcon, BarChart3Icon, ClockIcon, FileTextIcon, PenLineIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { WritingTask } from "@/types/ielts";

export function TaskCard({ task }: { task: WritingTask }) {
  const t = useTranslations("Writing.picker");
  const Icon = task.type === "task1" ? BarChart3Icon : PenLineIcon;

  return (
    <Card className="group relative transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-5" />
          </span>
          <Badge variant={task.type === "task1" ? "secondary" : "outline"}>{t(task.type)}</Badge>
        </div>
        <CardTitle className="mt-3 text-lg">{task.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {t(task.type === "task1" ? "task1Desc" : "task2Desc")}
        </p>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm text-muted-foreground">{task.prompt}</p>
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="size-3.5" />
            {t("minutes", { count: task.timeLimitMinutes })}
          </span>
          <span className="inline-flex items-center gap-1">
            <FileTextIcon className="size-3.5" />
            {t("minWords", { count: task.minWords })}
          </span>
        </div>
        <Link
          href={`/writing/${task.id}`}
          className={cn(
            "inline-flex items-center gap-1 text-sm font-semibold text-primary",
            "after:absolute after:inset-0 after:content-['']",
          )}
        >
          {t("start")}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
