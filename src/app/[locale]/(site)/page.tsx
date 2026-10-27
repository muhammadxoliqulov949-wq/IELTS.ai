import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PricingTeaser } from "@/components/landing/pricing-teaser";
import { WaitlistSection } from "@/components/landing/waitlist-section";
import { Faq } from "@/components/landing/faq";

export default async function LandingPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HowItWorks />
      <PricingTeaser />
      <WaitlistSection />
      <Faq />
    </>
  );
}
