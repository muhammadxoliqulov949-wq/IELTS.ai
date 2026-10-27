import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SectionHeading } from "@/components/shared/section-heading";
import { ReadingTestCard } from "@/components/reading/reading-test-card";
import { readingTests } from "@/mocks/reading-tests";

export default async function ReadingPickerPage({ params }: PageProps<"/[locale]/reading">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Reading.picker");

  return (
    <section className="container-page py-12 sm:py-16">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {readingTests.map((test) => (
          <ReadingTestCard key={test.id} test={test} />
        ))}
      </div>
    </section>
  );
}
