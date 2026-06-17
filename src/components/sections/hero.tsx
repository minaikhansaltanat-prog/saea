import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Container, LinkButton } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Hero({ locale, dict, stats }: { locale: string; dict: Dictionary; stats: { trustedBy: number; experience: number } }) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <Image
        src="/images/bg/meeting-room.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />

      <Container className="relative z-10 py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-gold-300 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            {dict.home.heroBadge}
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            {dict.home.heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {dict.home.heroSubtitle}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href={withLocale(locale, "/membership")} size="lg" variant="primary">
              {dict.home.heroCta1}
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href={withLocale(locale, "/services")} size="lg" variant="outline">
              {dict.home.heroCta2}
            </LinkButton>
          </div>

          <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gold-400" />
              <span className="text-sm font-medium">2005 жылдан бастап</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="text-sm font-medium">{stats.experience}+ жыл тәжірибе</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="text-sm font-medium">{stats.trustedBy.toLocaleString("ru-RU")}+ мүше</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
