import { Compass, Target } from "lucide-react";
import { Container, SectionEyebrow } from "@/components/ui/primitives";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function MissionVision({
  dict,
  stats,
}: {
  dict: Dictionary;
  stats: { trustedBy: number; projects: number; successRate: number; experience: number };
}) {
  return (
    <section className="relative overflow-hidden bg-navy-gradient">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,168,75,0.18),transparent_55%)]" />
      <Container className="relative section-py">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow light>{dict.home.missionEyebrow}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">{dict.home.missionTitle}</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl bg-white/[0.06] p-8 ring-1 ring-white/10 backdrop-blur">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15">
              <Target className="h-6 w-6 text-gold-400" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white">{dict.home.missionTitle2}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{dict.home.missionText}</p>
          </div>

          <div className="rounded-3xl bg-white/[0.06] p-8 ring-1 ring-white/10 backdrop-blur">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/20">
              <Compass className="h-6 w-6 text-teal-300" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white">{dict.home.visionTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{dict.home.visionText}</p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 rounded-3xl bg-navy-950/40 p-8 ring-1 ring-white/10 sm:grid-cols-4">
          <Stat value={`${stats.trustedBy.toLocaleString("ru-RU")}+`} label={dict.home.statTrustedBy} />
          <Stat value={`${stats.projects.toLocaleString("ru-RU")}+`} label={dict.home.statProjects} />
          <Stat value={`${stats.successRate}%`} label={dict.home.statSuccessRate} />
          <Stat value={`${stats.experience}+`} label={dict.home.statExperience} />
        </div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-heading text-3xl font-extrabold text-gold-400 sm:text-4xl">{value}</div>
      <div className="mt-1 text-xs font-medium text-white/60 sm:text-sm">{label}</div>
    </div>
  );
}
