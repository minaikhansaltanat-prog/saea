import Image from "next/image";
import { Calendar, MapPin, Users, Video } from "lucide-react";
import { getDictionary, type Dictionary } from "@/lib/i18n/get-dictionary";
import { Events } from "@/lib/db/collections";
import { pickText } from "@/lib/i18n/pick-text";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Badge, Button } from "@/components/ui/primitives";
import type { EventItem } from "@/lib/db/types";

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const events = (await Events.all()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const now = Date.now();
  const upcoming = events.filter((e) => new Date(e.date).getTime() >= now);
  const past = events.filter((e) => new Date(e.date).getTime() < now);

  return (
    <>
      <PageHero eyebrow={dict.events.pageEyebrow} title={dict.events.pageTitle} subtitle={dict.events.pageSubtitle} />

      <section className="section-py bg-white">
        <Container>
          <h2 className="mb-7 font-heading text-2xl font-extrabold text-navy-900">{dict.events.upcoming}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} locale={locale} dict={dict} />
            ))}
          </div>

          {past.length > 0 && (
            <>
              <h2 className="mb-7 mt-16 font-heading text-2xl font-extrabold text-navy-900">{dict.events.past}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 opacity-70">
                {past.map((e) => (
                  <EventCard key={e.id} event={e} locale={locale} dict={dict} disabled />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}

function EventCard({
  event,
  locale,
  dict,
  disabled,
}: {
  event: EventItem;
  locale: string;
  dict: Dictionary;
  disabled?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white">
      <div className="relative h-44 w-full">
        <Image src={event.cover} alt="" fill className="object-cover" sizes="400px" />
        <Badge tone={event.format === "online" ? "teal" : "gold"} className="absolute left-4 top-4">
          {event.format === "online" ? dict.events.online : dict.events.offline}
        </Badge>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1.5 text-xs text-navy-400">
          <Calendar className="h-3.5 w-3.5" /> {new Date(event.date).toLocaleDateString(locale)}
        </div>
        <h3 className="mt-2 font-heading text-base font-bold text-navy-900">{pickText(event.title, locale)}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-navy-500">{pickText(event.description, locale)}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-navy-500">
            {event.format === "offline" ? <MapPin className="h-3.5 w-3.5" /> : <Video className="h-3.5 w-3.5" />}
            {event.location ?? "Online"}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-navy-500">
            <Users className="h-3.5 w-3.5" />
            {event.participantsCount}/{event.capacity}
          </div>
        </div>

        <Button size="sm" disabled={disabled} className="mt-5 w-full">
          {dict.events.register}
        </Button>
      </div>
    </div>
  );
}
