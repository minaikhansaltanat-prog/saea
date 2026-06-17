import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Partners } from "@/lib/db/collections";
import { PageHero } from "@/components/sections/page-hero";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { Container, LinkButton } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";

export default async function CatalogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const partners = await Partners.filter((p) => p.status === "approved" || p.status === "auto_approved");

  return (
    <>
      <PageHero
        eyebrow={dict.catalog.pageEyebrow}
        title={dict.catalog.pageTitle}
        subtitle={dict.catalog.pageSubtitle}
        bg="/images/bg/handshake-network.webp"
      />
      <section className="section-py bg-white">
        <Container>
          <CatalogBrowser locale={locale} dict={dict} partners={partners} />
          <div className="mt-12 flex justify-center">
            <LinkButton href={withLocale(locale, "/partner/register")} variant="navy">
              {dict.catalog.becomePartner}
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
