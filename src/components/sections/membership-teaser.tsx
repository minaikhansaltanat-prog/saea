import { Check, Minus } from "lucide-react";
import { Container, LinkButton, SectionEyebrow } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";
import { pickText } from "@/lib/i18n/pick-text";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { TariffPlan } from "@/lib/db/types";

export function MembershipTeaser({
  locale,
  dict,
  tariffs,
}: {
  locale: string;
  dict: Dictionary;
  tariffs: TariffPlan[];
}) {
  return (
    <section className="section-py bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>{dict.home.membershipTeaserEyebrow}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">
            {dict.home.membershipTeaserTitle}
          </h2>
          <p className="mt-4 text-base text-navy-600">{dict.home.membershipTeaserText}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {tariffs.map((t) => (
            <div
              key={t.id}
              className={`relative flex flex-col rounded-2xl p-6 ${
                t.highlight ? "bg-navy-900 text-white shadow-gold ring-2 ring-gold-500" : "bg-navy-50 text-navy-900"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase text-navy-900">
                  {dict.membership.mostPopular}
                </span>
              )}
              <div className="font-heading text-lg font-extrabold">{t.name}</div>
              <div className="mt-2 text-2xl font-extrabold">
                {t.priceMonth === null ? (
                  <span className="text-base font-semibold">Жеке келісім</span>
                ) : t.priceMonth === 0 ? (
                  dict.common.free
                ) : (
                  <>
                    {t.priceMonth.toLocaleString("ru-RU")}
                    <span className="text-sm font-medium opacity-60"> ₸{dict.common.perMonth}</span>
                  </>
                )}
              </div>
              <ul className="mt-5 flex-1 space-y-2.5 text-xs">
                {t.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    {f.included ? (
                      <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${t.highlight ? "text-gold-400" : "text-teal-600"}`} />
                    ) : (
                      <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-30" />
                    )}
                    <span className={t.highlight ? "text-white/75" : "text-navy-600"}>{pickText(f.label, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <LinkButton href={withLocale(locale, "/membership")} size="lg">
            {dict.membership.comparisonTitle}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
