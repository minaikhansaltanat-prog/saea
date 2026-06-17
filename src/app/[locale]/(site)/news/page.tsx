import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { News } from "@/lib/db/collections";
import { pickText } from "@/lib/i18n/pick-text";
import { withLocale } from "@/lib/i18n/path";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Badge } from "@/components/ui/primitives";

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const news = (await News.filter((n) => n.status === "published")).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <PageHero eyebrow={dict.news.pageEyebrow} title={dict.news.pageTitle} subtitle={dict.news.pageSubtitle} />

      <section className="section-py bg-white">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <Link
                key={n.id}
                href={withLocale(locale, `/news/${n.slug}`)}
                className="group overflow-hidden rounded-2xl border border-navy-100 bg-white transition-shadow hover:shadow-card"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image src={n.cover} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="400px" />
                  <Badge tone="gold" className="absolute left-4 top-4">
                    {n.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-navy-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(n.publishedAt).toLocaleDateString(locale)} · {n.minutesToRead} {dict.news.minRead}
                  </div>
                  <h3 className="mt-2 font-heading text-base font-bold text-navy-900 group-hover:text-teal-600">
                    {pickText(n.title, locale)}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-navy-500">{pickText(n.excerpt, locale)}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
