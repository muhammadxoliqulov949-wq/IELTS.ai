import { useTranslations } from "next-intl";
import { formatBand } from "@/lib/band";
import type { ScoreHistoryPoint } from "@/types/ielts";
import { skillOrder } from "./skill-meta";

interface HistoryTableProps {
  history: ScoreHistoryPoint[];
  monthLabel: (date: string) => string;
}

/** Table view of the score history — the accessible alternative to the chart. */
export function HistoryTable({ history, monthLabel }: HistoryTableProps) {
  const t = useTranslations("Dashboard");

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="py-2 pr-4 font-medium">{t("history.month")}</th>
            {skillOrder.map((skill) => (
              <th key={skill} className="py-2 pr-4 text-right font-medium">
                {t(`skills.${skill}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {history.map((point) => (
            <tr key={point.date} className="border-b last:border-0">
              <td className="py-2 pr-4 font-medium">{monthLabel(point.date)}</td>
              {skillOrder.map((skill) => (
                <td key={skill} className="py-2 pr-4 text-right tabular-nums">
                  {formatBand(point[skill])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
