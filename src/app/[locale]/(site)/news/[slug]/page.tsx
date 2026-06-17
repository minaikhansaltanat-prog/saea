import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, User } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { News } from "@/lib/db/collections";
import { pickText } from "@/lib/i18n/pick-text";
import { Container, Badge } from "@/components/ui/primitives";

export default async function NewsDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale);
  const news = await News.all();
  const article = news.find((n) => n.slug === slug);
  if (!article) notFound();

  return (
    <article>
      <section className="relative h-[360px] w-full overflow-hidden bg-navy-900">
        <Image src={article.cover} alt="" fill className="object-cover opacity-50" sizes="100vw" priority />
        <div className="absolute inset-0 bg-hero-overlay" />
        <Container className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <Badge tone="gold" className="mb-4">
            {article.category}
          </Badge>
          <h1 className="max-w-3xl font-heading text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            {pickText(article.title, locale)}
          </h1>
          <div className="mt-5 flex items-center gap-5 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" /> {new Date(article.publishedAt).toLocaleDateString(locale)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> {article.author}
            </span>
            <span>
              {article.minutesToRead} {dict.news.minRead}
            </span>
          </div>
        </Container>
      </section>

      <section className="section-py bg-white">
        <Container className="mx-auto max-w-2xl">
          <p className="text-lg font-medium leading-relaxed text-navy-700">{pickText(article.excerpt, locale)}</p>
          <div className="mt-6 whitespace-pre-line text-base leading-relaxed text-navy-600">
            {pickText(article.body, locale)}
          </div>
        </Container>
      </section>
    </article>
  );
}
