import { ArrowRightIcon, BookOpenIcon, ClockIcon, ListChecksIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReadingTest } from "@/types/ielts";

export function ReadingTestCard({ test }: { test: ReadingTest }) {
  const t = useTranslations("Reading.picker");

  return (
    <Card className="group relative transition-shadow hover:shadow-lg">
      <CardHeader>
        <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
          <BookOpenIcon className="size-5" />
        </span>
        <CardTitle className="mt-3 text-lg">{test.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{test.summary}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm text-muted-foreground">{test.passage.paragraphs[0]}</p>
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="size-3.5" />
            {t("minutes", { count: test.timeLimitMinutes })}
          </span>
          <span className="inline-flex items-center gap-1">
            <ListChecksIcon className="size-3.5" />
            {t("questions", { count: test.questions.length })}
          </span>
        </div>
        <Link
          href={`/reading/${test.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary after:absolute after:inset-0 after:content-['']"
        >
          {t("start")}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
