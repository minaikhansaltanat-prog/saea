import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import { Container, LinkButton, SectionEyebrow } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";
import { getIcon } from "@/lib/icon-map";
import { pickText } from "@/lib/i18n/pick-text";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { ServiceDirection } from "@/lib/db/types";

export function ServicesGrid({
  locale,
  dict,
  services,
  compact,
}: {
  locale: string;
  dict: Dictionary;
  services: ServiceDirection[];
  compact?: boolean;
}) {
  const list = compact ? services.slice(0, 9) : services;

  return (
    <section className="section-py bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>{dict.home.servicesEyebrow}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">{dict.home.servicesTitle}</h2>
          <p className="mt-4 text-base text-navy-600">{dict.home.servicesSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <Link
                key={s.id}
                href={withLocale(locale, `/services/${s.slug}`)}
                className="group relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <span className="absolute right-5 top-5 text-navy-200 transition-colors group-hover:text-gold-500">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800/5 text-navy-800 transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mb-1.5 text-xs font-bold text-gold-600">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-heading text-lg font-bold text-navy-900">{pickText(s.title, locale)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{pickText(s.summary, locale)}</p>
              </Link>
            );
          })}

          <Link
            href={withLocale(locale, "/team")}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-navy-900 p-7 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
          >
            <div>
              <span className="absolute right-5 top-5 text-white/30 transition-colors group-hover:text-gold-400">
                <ArrowUpRight className="h-5 w-5" />
              </span>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-gold-400">
                <Users className="h-6 w-6" />
              </div>
              <div className="mb-1.5 text-xs font-bold text-gold-400">11</div>
              <h3 className="font-heading text-lg font-bold text-white">{dict.nav.team}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Фото, лауазым, мамандық, LinkedIn — сенімділік блогы
              </p>
            </div>
          </Link>
        </div>

        {compact && (
          <div className="mt-10 text-center">
            <LinkButton href={withLocale(locale, "/services")} variant="navy">
              {dict.home.viewAllServices}
            </LinkButton>
          </div>
        )}
      </Container>
    </section>
  );
}
