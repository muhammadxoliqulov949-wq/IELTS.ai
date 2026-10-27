import { useTranslations } from "next-intl";
import type { WritingTask } from "@/types/ielts";
import { TaskVisualPlaceholder } from "./task-visual-placeholder";

export function TaskPrompt({ task }: { task: WritingTask }) {
  const t = useTranslations("Writing");

  return (
    <aside className="flex flex-col gap-4 rounded-xl border bg-background p-5 shadow-sm sm:p-6 lg:sticky lg:top-20 lg:self-start">
      <p className="text-xs font-semibold tracking-wide text-primary uppercase">
        {t("workspace.prompt")} · {t(`picker.${task.type}`)}
      </p>
      <p className="leading-7">{task.prompt}</p>
      {task.visual && <TaskVisualPlaceholder visual={task.visual} />}
      <p className="text-sm text-muted-foreground">
        {t("picker.minutes", { count: task.timeLimitMinutes })} ·{" "}
        {t("picker.minWords", { count: task.minWords })}
      </p>
    </aside>
  );
}
