import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ReadingResultView } from "@/components/reading/result/reading-result-view";
import { getReadingTest, readingTests } from "@/mocks/reading-tests";

export function generateStaticParams() {
  return readingTests.map((test) => ({ testId: test.id }));
}

export default async function ReadingResultPage({
  params,
}: PageProps<"/[locale]/reading/[testId]/result">) {
  const { locale, testId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const test = getReadingTest(testId);
  if (!test) notFound();

  return <ReadingResultView test={test} />;
}
