"use client";

import { useTranslations } from "next-intl";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatBand } from "@/lib/band";
import type { ScoreHistoryPoint } from "@/types/ielts";
import { skillMeta, skillOrder } from "./skill-meta";

interface HistoryChartProps {
  history: ScoreHistoryPoint[];
  monthLabel: (date: string) => string;
}

/** Four skills over time on one 4–9 band axis (2px lines, ringed 8px markers). */
export function HistoryChart({ history, monthLabel }: HistoryChartProps) {
  const t = useTranslations("Dashboard.skills");

  return (
    <div className="h-72 w-full" role="img" aria-label={skillOrder.map((s) => t(s)).join(", ")}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={history} margin={{ top: 8, right: 12, bottom: 0, left: -20 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="date"
            tickFormatter={monthLabel}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          />
          <YAxis
            domain={[4, 9]}
            ticks={[4, 5, 6, 7, 8, 9]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ stroke: "var(--muted-foreground)", strokeWidth: 1 }}
            content={({ active, payload, label }) => (
              <ChartTooltip
                active={active}
                payload={payload}
                label={label}
                monthLabel={monthLabel}
                skillLabel={(s) => t(s)}
              />
            )}
          />
          {skillOrder.map((skill) => (
            <Line
              key={skill}
              dataKey={skill}
              type="monotone"
              stroke={skillMeta[skill].color}
              strokeWidth={2}
              strokeLinecap="round"
              dot={{ r: 4, fill: skillMeta[skill].color, stroke: "var(--card)", strokeWidth: 2 }}
              activeDot={{ r: 5, stroke: "var(--card)", strokeWidth: 2 }}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ReadonlyArray<{ dataKey?: unknown; value?: unknown }>;
  label?: unknown;
  monthLabel: (date: string) => string;
  skillLabel: (skill: (typeof skillOrder)[number]) => string;
}

function ChartTooltip({ active, payload, label, monthLabel, skillLabel }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="mb-1.5 font-semibold">{monthLabel(String(label))}</p>
      <ul className="space-y-1">
        {skillOrder.map((skill) => {
          const entry = payload.find((p) => p.dataKey === skill);
          if (!entry || typeof entry.value !== "number") return null;
          return (
            <li key={skill} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="size-2 rounded-full" style={{ backgroundColor: skillMeta[skill].color }} />
                {skillLabel(skill)}
              </span>
              <span className="font-semibold tabular-nums">{formatBand(entry.value)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
