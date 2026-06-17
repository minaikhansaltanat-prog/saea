import Image from "next/image";
import { Container } from "@/components/ui/primitives";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  bg = "/images/bg/meeting-room.webp",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  bg?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-24">
      <Image src={bg} alt="" fill className="object-cover opacity-40" sizes="100vw" priority />
      <div className="absolute inset-0 bg-hero-overlay" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-300">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            {eyebrow}
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 text-base leading-relaxed text-white/70">{subtitle}</p>}
        </div>
      </Container>
    </section>
  );
}
