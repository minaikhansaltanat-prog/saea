import Image from "next/image";
import { UserRound } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Team } from "@/lib/db/collections";
import { pickText } from "@/lib/i18n/pick-text";
import { PageHero } from "@/components/sections/page-hero";
import { LinkedinIcon } from "@/components/icons/brand-icons";
import { Container } from "@/components/ui/primitives";

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const team = (await Team.all()).sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero eyebrow={dict.team.pageEyebrow} title={dict.team.pageTitle} subtitle={dict.team.pageSubtitle} />

      <section className="section-py bg-white">
        <Container>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.id} className="overflow-hidden rounded-2xl border border-navy-100 bg-white">
                <div className="relative aspect-[4/5] bg-navy-50">
                  {member.photo ? (
                    <Image src={member.photo} alt={member.name} fill className="object-cover" sizes="320px" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-navy-300">
                      <UserRound className="h-20 w-20" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-base font-bold text-navy-900">{member.name}</h3>
                  <p className="mt-1 text-xs font-semibold leading-snug text-gold-600">
                    {pickText(member.position, locale)}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-navy-500">{pickText(member.bio, locale)}</p>
                  <a
                    href={member.linkedin || "#"}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-navy-400 hover:text-navy-700"
                  >
                    <LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
