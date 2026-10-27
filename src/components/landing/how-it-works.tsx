"use client";

import { BarChart3Icon, BrainCircuitIcon, LayersIcon, PenLineIcon, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

type StepKey = "choose" | "practice" | "feedback" | "track";

const steps: { key: StepKey; icon: LucideIcon }[] = [
  { key: "choose", icon: LayersIcon },
  { key: "practice", icon: PenLineIcon },
  { key: "feedback", icon: BrainCircuitIcon },
  { key: "track", icon: BarChart3Icon },
];

export function HowItWorks() {
  const t = useTranslations("HowItWorks");
  const [active, setActive] = useState<StepKey>("choose");
  const activeIndex = steps.findIndex((s) => s.key === active);
  const ActiveIcon = steps[activeIndex].icon;

  return (
    <section id="how-it-works" className="scroll-mt-20 border-y bg-muted/30 py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <ol className="grid gap-3" role="tablist" aria-orientation="vertical">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const selected = step.key === active;
              return (
                <li key={step.key}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="how-it-works-panel"
                    onClick={() => setActive(step.key)}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-xl border bg-background p-4 text-left transition-all",
                      selected
                        ? "border-primary shadow-md ring-2 ring-primary/20"
                        : "hover:border-primary/40",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-lg",
                        selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="text-xs font-semibold text-muted-foreground">0{i + 1}</span>
                      <span className="block font-semibold">{t(`steps.${step.key}.title`)}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {t(`steps.${step.key}.description`)}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div
            id="how-it-works-panel"
            role="tabpanel"
            className="flex flex-col justify-between gap-8 rounded-2xl bg-primary p-8 text-primary-foreground"
          >
            <div key={active} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <ActiveIcon className="size-12 opacity-90" />
              <h3 className="mt-6 text-2xl font-bold">{t(`steps.${active}.title`)}</h3>
              <p className="mt-3 text-primary-foreground/85">{t(`steps.${active}.description`)}</p>
              <p className="mt-6 rounded-lg bg-primary-foreground/10 p-4 text-sm">
                {t(`steps.${active}.detail`)}
              </p>
            </div>
            <div className="flex gap-2" aria-hidden>
              {steps.map((s, i) => (
                <span
                  key={s.key}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors",
                    i <= activeIndex ? "bg-primary-foreground" : "bg-primary-foreground/25",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
