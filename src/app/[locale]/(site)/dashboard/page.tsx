import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { QuickStart } from "@/components/dashboard/quick-start";
import { RecentAttempts } from "@/components/dashboard/recent-attempts";
import { ScoreHistory } from "@/components/dashboard/score-history";
import { SkillScoreCard } from "@/components/dashboard/skill-score-card";
import { WeakAreas } from "@/components/dashboard/weak-areas";
import { getDashboardData } from "@/mocks/dashboard";

export default async function DashboardPage({ params }: PageProps<"/[locale]/dashboard">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const data = getDashboardData(locale);

  return (
    <div className="container-page space-y-6 py-10 sm:py-12">
      <DashboardHeader data={data} />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {data.skills.map((score) => (
          <SkillScoreCard key={score.skill} score={score} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ScoreHistory history={data.history} />
        </div>
        <WeakAreas areas={data.weakAreas} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <QuickStart />
        <div className="lg:col-span-2">
          <RecentAttempts />
        </div>
      </div>
    </div>
  );
}
