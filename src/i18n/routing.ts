import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "en"],
  defaultLocale: "uz",
  // Always open in Uzbek instead of following the browser language;
  // users switch to English explicitly.
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
