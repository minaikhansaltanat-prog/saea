import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Services } from "@/lib/db/collections";
import { PageHero } from "@/components/sections/page-hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaBanner } from "@/components/sections/cta-banner";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const services = await Services.all();

  return (
    <>
      <PageHero eyebrow={dict.services.pageEyebrow} title={dict.services.pageTitle} subtitle={dict.services.pageSubtitle} />
      <ServicesGrid locale={locale} dict={dict} services={services} />
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
