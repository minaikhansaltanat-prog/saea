import Image from "next/image";
import { CalendarClock, Quote } from "lucide-react";
import { Container, LinkButton, SectionEyebrow } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { TeamMember } from "@/lib/db/types";
import { pickText } from "@/lib/i18n/pick-text";

export function LeadershipIntro({
  locale,
  dict,
  leader,
  experienceYears,
}: {
  locale: string;
  dict: Dictionary;
  leader: TeamMember | undefined;
  experienceYears: number;
}) {
  return (
    <section className="section-py bg-white">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="relative mx-auto max-w-md lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
            {leader?.photo ? (
              <Image src={leader.photo} alt={leader.name} fill className="object-cover" sizes="420px" />
            ) : (
              <div className="flex h-full items-center justify-center bg-navy-100 text-navy-400">CAEA</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-6 -right-4 flex w-56 items-center gap-3 rounded-2xl bg-navy-900 p-4 shadow-gold sm:-right-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/15">
              <CalendarClock className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <div className="font-heading text-2xl font-extrabold text-white">{experienceYears}+</div>
              <div className="text-xs leading-tight text-white/60">2005 жылдан бергі тәжірибе</div>
            </div>
          </div>

          <div className="absolute -left-4 top-6 hidden rounded-2xl bg-white px-4 py-3 shadow-card sm:block">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-600">
              <span className="h-2 w-2 rounded-full bg-teal-500" /> ISO · HALAL · GOST верификация
            </div>
          </div>
        </div>

        <div>
          <SectionEyebrow>{dict.about.leadershipEyebrow}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">
            {leader ? pickText(leader.position, locale) : dict.about.leadershipTitle}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-navy-600">
            {leader ? pickText(leader.bio, locale) : ""}
          </p>

          <div className="mt-6 flex gap-3 rounded-2xl bg-navy-50 p-5">
            <Quote className="h-6 w-6 shrink-0 text-gold-500" />
            <p className="text-sm italic leading-relaxed text-navy-700">{dict.home.whyUsText}</p>
          </div>

          <div className="mt-7">
            <LinkButton href={withLocale(locale, "/about")} variant="navy">
              {dict.common.learnMore}
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
