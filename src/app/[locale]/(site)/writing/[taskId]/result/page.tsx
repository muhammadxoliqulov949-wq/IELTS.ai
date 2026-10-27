import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { WritingResultView } from "@/components/writing/result/writing-result-view";
import { getWritingTask, writingTasks } from "@/mocks/writing-tasks";

export function generateStaticParams() {
  return writingTasks.map((task) => ({ taskId: task.id }));
}

export default async function WritingResultPage({
  params,
}: PageProps<"/[locale]/writing/[taskId]/result">) {
  const { locale, taskId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const task = getWritingTask(taskId);
  if (!task) notFound();

  return <WritingResultView task={task} />;
}
