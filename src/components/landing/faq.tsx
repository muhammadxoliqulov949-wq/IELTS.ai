import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";

type FaqItem = { q: string; a: string };

export function Faq() {
  const t = useTranslations("Faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section id="faq" className="scroll-mt-20 py-16 sm:py-24">
      <div className="container-page max-w-3xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <Accordion className="mt-10 rounded-xl border bg-card px-4 sm:px-6">
          {items.map((item) => (
            <AccordionItem key={item.q}>
              <AccordionTrigger className="py-4 text-base">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
