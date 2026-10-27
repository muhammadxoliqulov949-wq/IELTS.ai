import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { WritingWorkspace } from "@/components/writing/writing-workspace";
import { getWritingTask, writingTasks } from "@/mocks/writing-tasks";

export function generateStaticParams() {
  return writingTasks.map((task) => ({ taskId: task.id }));
}

/** Exam screen: no site header/footer, only the exam bar and editor. */
export default async function WritingExamPage({ params }: PageProps<"/[locale]/writing/[taskId]">) {
  const { locale, taskId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const task = getWritingTask(taskId);
  if (!task) notFound();

  return <WritingWorkspace task={task} />;
}
