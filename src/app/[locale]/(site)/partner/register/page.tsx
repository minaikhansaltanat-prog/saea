import { getDictionary } from "@/lib/i18n/get-dictionary";
import { PageHero } from "@/components/sections/page-hero";
import { PartnerRegisterForm } from "@/components/forms/partner-register-form";
import { Container } from "@/components/ui/primitives";

export default async function PartnerRegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.partner.pageEyebrow}
        title={dict.partner.pageTitle}
        subtitle={dict.partner.pageSubtitle}
        bg="/images/bg/handshake-network.webp"
      />
      <section className="section-py bg-navy-50">
        <Container className="max-w-3xl">
          <PartnerRegisterForm dict={dict} />
        </Container>
      </section>
    </>
  );
}
