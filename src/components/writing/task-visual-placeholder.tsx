import {
  BarChart3Icon,
  LineChartIcon,
  MapIcon,
  PieChartIcon,
  TableIcon,
  WorkflowIcon,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { Task1VisualKind, WritingTask } from "@/types/ielts";

const icons: Record<Task1VisualKind, LucideIcon> = {
  bar: BarChart3Icon,
  line: LineChartIcon,
  pie: PieChartIcon,
  table: TableIcon,
  process: WorkflowIcon,
  map: MapIcon,
};

/** Task 1 chart slot. Real chart images/data arrive with the content backend. */
export function TaskVisualPlaceholder({ visual }: { visual: NonNullable<WritingTask["visual"]> }) {
  const t = useTranslations("Writing.workspace");
  const Icon = icons[visual.kind];

  return (
    <figure className="grid aspect-[4/3] place-items-center rounded-lg border-2 border-dashed bg-muted/40 p-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <Icon className="size-12 text-primary/70" strokeWidth={1.5} />
        <span className="text-sm font-semibold">{t(`visualKinds.${visual.kind}`)}</span>
        <figcaption className="text-sm text-muted-foreground">{visual.caption}</figcaption>
        <span className="mt-1 text-xs text-muted-foreground/80">{t("visualNote")}</span>
      </div>
    </figure>
  );
}
