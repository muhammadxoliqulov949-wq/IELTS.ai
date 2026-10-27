import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

const plans = ["free", "pro"] as const;

export function PricingTeaser() {
  const t = useTranslations("Pricing");

  return (
    <section id="pricing" className="scroll-mt-20 py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((plan) => {
            const isPro = plan === "pro";
            const features = t.raw(`${plan}.features`) as string[];
            return (
              <Card
                key={plan}
                className={cn("relative", isPro && "border-primary shadow-lg ring-2 ring-primary/20")}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-xl">{t(`${plan}.name`)}</CardTitle>
                    {isPro && (
                      <div className="flex gap-1.5">
                        <Badge>{t("popular")}</Badge>
                        <Badge variant="outline">{t("soon")}</Badge>
                      </div>
                    )}
                  </div>
                  <p className="mt-2">
                    <span className="text-3xl font-bold">{t(`${plan}.price`)}</span>{" "}
                    <span className="text-sm text-muted-foreground">/ {t(`${plan}.period`)}</span>
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2.5 text-sm">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/#waitlist"
                    className={cn(
                      buttonVariants({ variant: isPro ? "default" : "outline" }),
                      "h-11 w-full text-base",
                    )}
                  >
                    {t(`${plan}.cta`)}
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
