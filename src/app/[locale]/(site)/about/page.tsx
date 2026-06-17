import { Gem, Eye, Users2, Sparkle, Globe2 } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Team, SiteSettingsStore } from "@/lib/db/collections";
import { PageHero } from "@/components/sections/page-hero";
import { LeadershipIntro } from "@/components/sections/leadership-intro";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Container, SectionEyebrow } from "@/components/ui/primitives";

const VALUES = [
  { icon: Sparkle, title: "Іс жүзінде нәтиже", text: "Кеңес берумен шектелмей, практикада жүзеге асырып береміз" },
  { icon: Eye, title: "Ашықтық", text: "Мүшелер үшін барлық ақпарат, баға, нәтиже ашық" },
  { icon: Users2, title: "Инклюзивтілік", text: "Шағын бизнестен ірі корпорацияға дейін тең мүмкіндік" },
  { icon: Gem, title: "Инновация (ЖИ)", text: "Заманауи технологияларды бизнес тиімділігіне жұмылдыру" },
  { icon: Globe2, title: "Аймақтық бірлік", text: "5 елдің кәсіпкерлерінің ынтымақтастығы — күш көзі" },
];

const MARKET_STATS = [
  { label: "Орта Азия жиынтық ЖІӨ", value: "$400+ млрд" },
  { label: "Стартаптарға венчурлық қаржыландыру", value: "$95 млн" },
  { label: "Белсенді инвесторлар саны", value: "100+" },
  { label: "Тіркелген стартаптар", value: "1800+" },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [team, settings] = await Promise.all([Team.all(), SiteSettingsStore.get()]);
  const leader = team.find((t) => t.id === "team_head");

  return (
    <>
      <PageHero eyebrow={dict.about.pageEyebrow} title={dict.about.pageTitle} subtitle={dict.about.pageSubtitle} />

      <LeadershipIntro locale={locale} dict={dict} leader={leader} experienceYears={settings.heroStats.experience} />

      <section className="section-py bg-navy-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>{dict.about.valuesEyebrow}</SectionEyebrow>
            <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">{dict.about.valuesTitle}</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-6 shadow-card">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-sm font-bold text-navy-900">{v.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-navy-500">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-py bg-white">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionEyebrow>{dict.about.statsEyebrow}</SectionEyebrow>
            <h2 className="font-heading text-3xl font-extrabold text-navy-900">{dict.about.statsTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-navy-600">
              Орта Азия аймағы (ҚЗ, ӨЗ, ҚР, ТЖ, ТМ) бірлескен ЖІӨ $400+ млрд, 80 млн тұтынушыдан тұратын жылдам дамып
              жатқан нарықты қалыптастырады. 2024–2026 жылдары инвестициялық белсенділік едәуір артты.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4">
              {MARKET_STATS.map((s) => (
                <div key={s.label} className="rounded-xl bg-navy-50 p-4">
                  <div className="font-heading text-xl font-extrabold text-navy-900">{s.value}</div>
                  <div className="mt-1 text-xs text-navy-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-navy-900 p-8 text-white">
            <SectionEyebrow light>{dict.about.swotEyebrow}</SectionEyebrow>
            <h3 className="font-heading text-2xl font-extrabold text-white">{dict.about.swotTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{dict.about.swotText}</p>
            <div className="mt-6 rounded-2xl bg-gold-500/10 p-5 ring-1 ring-gold-500/30">
              <div className="text-xs font-bold uppercase tracking-wide text-gold-400">УТП</div>
              <div className="mt-1 font-heading text-lg font-bold text-white">«Кеңес беріп, жасап беру»</div>
              <div className="text-xs text-white/60">Turnkey Consulting</div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
