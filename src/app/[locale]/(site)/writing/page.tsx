import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SectionHeading } from "@/components/shared/section-heading";
import { TaskCard } from "@/components/writing/task-card";
import { writingTasks } from "@/mocks/writing-tasks";

export default async function WritingPickerPage({ params }: PageProps<"/[locale]/writing">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Writing.picker");

  return (
    <section className="container-page py-12 sm:py-16">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {writingTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
