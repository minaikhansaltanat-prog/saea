import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container, LinkButton, SectionEyebrow } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function CtaBanner({ locale, dict }: { locale: string; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-24">
      <Image src="/images/bg/handshake-network.webp" alt="" fill className="object-cover opacity-35" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-teal-900/60" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow light>{dict.home.ctaBannerEyebrow}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">{dict.home.ctaBannerTitle}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">{dict.home.ctaBannerText}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href={withLocale(locale, "/contact")} size="lg">
              {dict.home.ctaBannerButton}
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href={withLocale(locale, "/register")} size="lg" variant="outline">
              {dict.nav.register}
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
