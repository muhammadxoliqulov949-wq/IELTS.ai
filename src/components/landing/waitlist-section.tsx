import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { WaitlistForm } from "./waitlist-form";

export function WaitlistSection() {
  const t = useTranslations("Waitlist");

  return (
    <section id="waitlist" className="scroll-mt-20 border-y bg-muted/30 py-16 sm:py-24">
      <div className="container-page max-w-2xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <Card className="mt-10 shadow-lg">
          <CardContent>
            <WaitlistForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
