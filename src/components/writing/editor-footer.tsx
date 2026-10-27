"use client";

import { SendIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { WordCounter } from "./word-counter";

interface EditorFooterProps {
  wordCount: number;
  minWords: number;
  canSubmit: boolean;
  onSubmit: () => void;
}

export function EditorFooter({ wordCount, minWords, canSubmit, onSubmit }: EditorFooterProps) {
  const t = useTranslations("Writing.workspace");
  const underMin = wordCount > 0 && wordCount < minWords;

  return (
    <div className="border-t bg-muted/30 px-5 py-3 sm:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <WordCounter count={wordCount} min={minWords} />
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-muted-foreground lg:inline">{t("draftNote")}</span>
          <Button onClick={onSubmit} disabled={!canSubmit} className="h-10 w-full px-5 sm:w-auto">
            <SendIcon />
            {t("submit")}
          </Button>
        </div>
      </div>
      {underMin && (
        <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">{t("underMinWarning")}</p>
      )}
    </div>
  );
}
