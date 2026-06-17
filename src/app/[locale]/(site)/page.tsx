import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Services, Team, Testimonials, News, Tariffs, SiteSettingsStore } from "@/lib/db/collections";
import { Hero } from "@/components/sections/hero";
import { LeadershipIntro } from "@/components/sections/leadership-intro";
import { MissionVision } from "@/components/sections/mission-vision";
import { CountriesBand } from "@/components/sections/countries-band";
import { WhyUs } from "@/components/sections/why-us";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TeamTeaser } from "@/components/sections/team-teaser";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { NewsTeaser } from "@/components/sections/news-teaser";
import { MembershipTeaser } from "@/components/sections/membership-teaser";
import { CtaBanner } from "@/components/sections/cta-banner";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const [services, team, testimonials, news, tariffs, settings] = await Promise.all([
    Services.all(),
    Team.all(),
    Testimonials.all(),
    News.filter((n) => n.status === "published"),
    Tariffs.all(),
    SiteSettingsStore.get(),
  ]);

  const leader = team.find((t) => t.id === "team_head");

  return (
    <>
      <Hero locale={locale} dict={dict} stats={settings.heroStats} />
      <CountriesBand dict={dict} />
      <LeadershipIntro locale={locale} dict={dict} leader={leader} experienceYears={settings.heroStats.experience} />
      <MissionVision dict={dict} stats={settings.heroStats} />
      <WhyUs dict={dict} />
      <ServicesGrid locale={locale} dict={dict} services={services} compact />
      <TeamTeaser locale={locale} dict={dict} team={team} />
      <TestimonialsSection locale={locale} dict={dict} testimonials={testimonials} />
      <NewsTeaser locale={locale} dict={dict} news={news} />
      <MembershipTeaser locale={locale} dict={dict} tariffs={tariffs} />
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
