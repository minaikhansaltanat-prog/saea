import { Check, Minus } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Tariffs } from "@/lib/db/collections";
import { pickText } from "@/lib/i18n/pick-text";
import { withLocale } from "@/lib/i18n/path";
import { PageHero } from "@/components/sections/page-hero";
import { Container, LinkButton } from "@/components/ui/primitives";

export default async function MembershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const tariffs = await Tariffs.all();

  return (
    <>
      <PageHero
        eyebrow={dict.membership.pageEyebrow}
        title={dict.membership.pageTitle}
        subtitle={dict.membership.pageSubtitle}
        bg="/images/bg/boardroom-analytics.webp"
      />

      <section className="section-py bg-white">
        <Container>
          <div className="grid gap-6 lg:grid-cols-5">
            {tariffs.map((t) => (
              <div
                key={t.id}
                className={`relative flex flex-col rounded-3xl p-7 ${
                  t.highlight ? "bg-navy-900 text-white shadow-gold ring-2 ring-gold-500" : "border border-navy-100 bg-white"
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase text-navy-900">
                    {dict.membership.mostPopular}
                  </span>
                )}
                <div className={`font-heading text-xl font-extrabold ${t.highlight ? "text-white" : "text-navy-900"}`}>
                  {t.name}
                </div>
                <p className={`mt-2 text-xs leading-relaxed ${t.highlight ? "text-white/65" : "text-navy-500"}`}>
                  {pickText(t.description, locale)}
                </p>

                <div className={`mt-5 ${t.highlight ? "text-white" : "text-navy-900"}`}>
                  {t.priceMonth === null ? (
                    <span className="text-lg font-bold">Жеке келісім</span>
                  ) : t.priceMonth === 0 ? (
                    <span className="text-2xl font-extrabold">{dict.common.free}</span>
                  ) : (
                    <>
                      <span className="text-2xl font-extrabold">{t.priceMonth.toLocaleString("ru-RU")} ₸</span>
                      <span className="text-xs opacity-60">{dict.common.perMonth}</span>
                    </>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {t.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      {f.included ? (
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.highlight ? "text-gold-400" : "text-teal-600"}`} />
                      ) : (
                        <Minus className="mt-0.5 h-4 w-4 shrink-0 opacity-30" />
                      )}
                      <span className={t.highlight ? "text-white/80" : "text-navy-600"}>
                        {pickText(f.label, locale)}
                        {typeof f.included === "string" && (
                          <span className="ml-1 font-semibold">({f.included})</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <LinkButton
                  href={withLocale(locale, `/register?tariff=${t.code}`)}
                  variant={t.highlight ? "primary" : "outlineNavy"}
                  className="mt-7 w-full"
                >
                  {dict.membership.choosePlan}
                </LinkButton>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
