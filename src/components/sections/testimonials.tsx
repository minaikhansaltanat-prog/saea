import { Star, Quote } from "lucide-react";
import { Container, SectionEyebrow } from "@/components/ui/primitives";
import { pickText } from "@/lib/i18n/pick-text";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Testimonial } from "@/lib/db/types";

export function TestimonialsSection({
  locale,
  dict,
  testimonials,
}: {
  locale: string;
  dict: Dictionary;
  testimonials: Testimonial[];
}) {
  return (
    <section className="section-py bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>{dict.home.testimonialsEyebrow}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">{dict.home.testimonialsTitle}</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((t) => (
            <div key={t.id} className="flex flex-col rounded-2xl border border-navy-100 bg-white p-7">
              <Quote className="h-7 w-7 text-gold-300" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-navy-700">{pickText(t.quote, locale)}</p>
              <div className="mt-5 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-gold-500 text-gold-500" : "text-navy-100"}`} />
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 border-t border-navy-50 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-navy-900">{t.name}</div>
                  <div className="text-xs text-navy-500">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
