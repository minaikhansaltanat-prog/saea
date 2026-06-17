import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Services } from "@/lib/db/collections";
import { pickText } from "@/lib/i18n/pick-text";
import { getIcon } from "@/lib/icon-map";
import { Container, LinkButton, SectionEyebrow } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale);
  const services = await Services.all();
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = getIcon(service.icon);
  const others = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 py-20">
        <Image src={service.cover} alt="" fill className="object-cover opacity-35" sizes="100vw" priority />
        <div className="absolute inset-0 bg-hero-overlay" />
        <Container className="relative z-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/15">
            <Icon className="h-7 w-7 text-gold-400" />
          </div>
          <h1 className="mt-6 max-w-2xl font-heading text-3xl font-extrabold text-white sm:text-4xl">
            {pickText(service.title, locale)}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70">{pickText(service.summary, locale)}</p>
        </Container>
      </section>

      <section className="section-py bg-white">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="whitespace-pre-line text-base leading-relaxed text-navy-700">{pickText(service.body, locale)}</p>

            {service.stats && (
              <div className="mt-8 grid grid-cols-2 gap-4">
                {service.stats.map((s, i) => (
                  <div key={i} className="rounded-2xl bg-navy-50 p-5">
                    <div className="font-heading text-2xl font-extrabold text-navy-900">{s.value}</div>
                    <div className="mt-1 text-xs text-navy-500">{pickText(s.label, locale)}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-9 rounded-2xl bg-teal-50 p-6">
              <h3 className="font-heading text-lg font-bold text-teal-800">{dict.services.ctaTitle}</h3>
              <div className="mt-4">
                <LinkButton href={withLocale(locale, "/partner/register")} variant="teal">
                  {dict.services.ctaButton}
                  <ArrowRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </div>
          </div>

          <aside>
            <div className="rounded-2xl border border-navy-100 p-6">
              <SectionEyebrow>{dict.services.relatedTitle}</SectionEyebrow>
              <ul className="mt-3 space-y-3">
                {others.map((o) => {
                  const OIcon = getIcon(o.icon);
                  return (
                    <li key={o.id}>
                      <Link
                        href={withLocale(locale, `/services/${o.slug}`)}
                        className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-navy-50"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-800/5 text-navy-700">
                          <OIcon className="h-4.5 w-4.5" />
                        </span>
                        <span className="text-sm font-semibold text-navy-800">{pickText(o.title, locale)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl bg-navy-900 p-6 text-white">
              <CheckCircle2 className="h-6 w-6 text-gold-400" />
              <p className="mt-3 text-sm leading-relaxed text-white/75">{dict.services.detailCta}</p>
              <div className="mt-4">
                <LinkButton href={withLocale(locale, "/contact")} variant="primary" size="sm">
                  {dict.common.contactUs}
                </LinkButton>
              </div>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
