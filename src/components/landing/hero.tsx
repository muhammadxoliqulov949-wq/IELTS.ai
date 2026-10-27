import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroPreview } from "./hero-preview";

const stats = [
  { value: "1 200+", key: "statStudents" },
  { value: "30 s", key: "statFeedback" },
  { value: "±0.5", key: "statAccuracy" },
] as const;

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[32rem] bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_60%)] opacity-15"
      />
      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Badge variant="secondary" className="h-7 gap-1.5 px-3 text-xs">
            <SparklesIcon />
            {t("badge")}
          </Badge>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t("titleStart")} <span className="text-primary">{t("titleHighlight")}</span>{" "}
            {t("titleEnd")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">{t("subtitle")}</p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/#waitlist" className={cn(buttonVariants(), "h-12 px-6 text-base")}>
              {t("primaryCta")}
              <ArrowRightIcon />
            </Link>
            <Link
              href="/#how-it-works"
              className={cn(buttonVariants({ variant: "outline" }), "h-12 px-6 text-base")}
            >
              {t("secondaryCta")}
            </Link>
          </div>

          <dl className="mt-10 grid w-full max-w-md grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.key}>
                <dt className="sr-only">{t(s.key)}</dt>
                <dd className="text-2xl font-bold">{s.value}</dd>
                <dd className="text-xs text-muted-foreground">{t(s.key)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}
