import type { Metadata } from "next";
import "../globals.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/noto-naskh-arabic/400.css";
import "@fontsource/noto-naskh-arabic/600.css";
import "@fontsource/noto-naskh-arabic/700.css";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocaleMeta, localeCodes } from "@/lib/i18n/locales";

export function generateStaticParams() {
  return localeCodes.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: { default: `${dict.meta.siteNameFull} | CAEA`, template: `%s | CAEA` },
    description: dict.home.heroSubtitle,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const meta = getLocaleMeta(locale);

  return (
    <html lang={locale} dir={meta.dir}>
      <body className="antialiased bg-background text-foreground">{children}</body>
    </html>
  );
}
