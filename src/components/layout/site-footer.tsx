import { useTranslations } from "next-intl";
import { Logo } from "@/components/shared/logo";

export function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t bg-muted/30">
      <div className="container-page flex flex-col gap-4 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Logo className="text-foreground" />
          <p>{t("tagline")}</p>
        </div>
        <p className="max-w-3xl text-xs leading-relaxed">{t("disclaimer")}</p>
        <p className="text-xs">{t("rights", { year: 2026 })}</p>
      </div>
    </footer>
  );
}
