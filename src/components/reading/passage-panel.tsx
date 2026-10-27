import { useTranslations } from "next-intl";
import type { ReadingPassage } from "@/types/ielts";

/** Left panel: the reading passage with lettered paragraphs. */
export function PassagePanel({ passage }: { passage: ReadingPassage }) {
  const t = useTranslations("Reading.workspace");

  return (
    <article className="rounded-xl border bg-background p-5 shadow-sm sm:p-8 lg:min-h-0 lg:overflow-y-auto">
      <p className="text-xs font-semibold tracking-wide text-primary uppercase">{t("passage")}</p>
      <h1 className="mt-2 text-2xl font-bold text-balance">{passage.title}</h1>
      <div className="mt-6 space-y-5">
        {passage.paragraphs.map((paragraph, i) => (
          <p key={i} className="flex gap-3 leading-8">
            <span className="mt-1 grid size-6 shrink-0 place-items-center rounded bg-muted text-xs font-bold text-muted-foreground">
              {String.fromCharCode(65 + i)}
            </span>
            <span>{paragraph}</span>
          </p>
        ))}
      </div>
    </article>
  );
}
