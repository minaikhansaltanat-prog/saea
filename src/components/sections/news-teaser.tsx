import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Container, LinkButton, SectionEyebrow, Badge } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";
import { pickText } from "@/lib/i18n/pick-text";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { NewsArticle } from "@/lib/db/types";

export function NewsTeaser({ locale, dict, news }: { locale: string; dict: Dictionary; news: NewsArticle[] }) {
  return (
    <section className="section-py bg-navy-50">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionEyebrow>{dict.home.newsEyebrow}</SectionEyebrow>
            <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">{dict.home.newsTitle}</h2>
          </div>
          <LinkButton href={withLocale(locale, "/news")} variant="ghost" size="sm">
            {dict.common.viewAll}
            <ArrowRight className="h-4 w-4" />
          </LinkButton>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {news.slice(0, 3).map((n) => (
            <Link
              key={n.id}
              href={withLocale(locale, `/news/${n.slug}`)}
              className="group overflow-hidden rounded-2xl bg-white shadow-card transition-transform hover:-translate-y-1"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image src={n.cover} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="400px" />
                <Badge tone="gold" className="absolute left-4 top-4">
                  {n.category}
                </Badge>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-navy-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(n.publishedAt).toLocaleDateString(locale)}
                </div>
                <h3 className="mt-2 font-heading text-base font-bold text-navy-900 group-hover:text-teal-600">
                  {pickText(n.title, locale)}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-navy-500">{pickText(n.excerpt, locale)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
