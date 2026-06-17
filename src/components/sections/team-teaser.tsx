import Image from "next/image";
import { UserRound } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/brand-icons";
import { Container, LinkButton, SectionEyebrow } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";
import { pickText } from "@/lib/i18n/pick-text";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { TeamMember } from "@/lib/db/types";

export function TeamTeaser({ locale, dict, team }: { locale: string; dict: Dictionary; team: TeamMember[] }) {
  return (
    <section className="section-py bg-navy-50">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>{dict.home.teamEyebrow}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">{dict.home.teamTitle}</h2>
          <p className="mt-4 text-base text-navy-600">{dict.home.teamSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.id} className="overflow-hidden rounded-2xl bg-white shadow-card">
              <div className="relative aspect-[4/5] bg-navy-100">
                {member.photo ? (
                  <Image src={member.photo} alt={member.name} fill className="object-cover" sizes="280px" />
                ) : (
                  <div className="flex h-full items-center justify-center text-navy-300">
                    <UserRound className="h-16 w-16" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-heading text-base font-bold text-navy-900">{member.name}</h3>
                <p className="mt-1 text-xs leading-snug text-gold-600">{pickText(member.position, locale)}</p>
                <a
                  href={member.linkedin || "#"}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-navy-400 hover:text-navy-700"
                >
                  <LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <LinkButton href={withLocale(locale, "/team")} variant="navy">
            {dict.home.teamCta}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
