"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Container, SectionEyebrow } from "@/components/ui/primitives";
import { pickText } from "@/lib/i18n/pick-text";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Testimonial } from "@/lib/db/types";

const SPEED_PX_PER_SEC = 38;
const STEP_PX = 320;

function TestimonialCard({ t, locale }: { t: Testimonial; locale: string }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col rounded-2xl border border-navy-100 bg-white p-7">
      <Quote className="h-7 w-7 text-gold-300" />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-navy-700">{pickText(t.quote, locale)}</p>
      <div className="mt-5 flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-gold-500 text-gold-500" : "text-navy-100"}`} />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 border-t border-navy-50 pt-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white">
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
  );
}

export function TestimonialsSection({
  locale,
  dict,
  testimonials,
}: {
  locale: string;
  dict: Dictionary;
  testimonials: Testimonial[];
}) {
  const list = testimonials.length > 0 ? testimonials : [];
  const setRef = useRef<HTMLDivElement>(null);
  const secondSetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const setWidthRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!setRef.current || !secondSetRef.current || list.length === 0) return;
    setWidthRef.current = secondSetRef.current.offsetLeft - setRef.current.offsetLeft;
    setReady(true);
  }, [list.length]);

  useEffect(() => {
    if (!ready) return;
    let raf: number;
    let last = performance.now();

    function tick(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current && setWidthRef.current > 0) {
        offsetRef.current += SPEED_PX_PER_SEC * dt;
        if (offsetRef.current >= setWidthRef.current) {
          offsetRef.current -= setWidthRef.current;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  function nudge(dir: 1 | -1) {
    if (setWidthRef.current === 0) return;
    let next = offsetRef.current + dir * STEP_PX;
    if (next < 0) next += setWidthRef.current;
    if (next >= setWidthRef.current) next -= setWidthRef.current;
    offsetRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
    }
  }

  if (list.length === 0) return null;

  return (
    <section className="section-py bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>{dict.home.testimonialsEyebrow}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">{dict.home.testimonialsTitle}</h2>
        </div>

        <div
          className="relative mt-12"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Алдыңғы"
            className="absolute -left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-700 shadow-card transition-colors hover:bg-gold-50 sm:-left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="overflow-hidden px-2">
            <div ref={trackRef} className="flex w-max gap-6 will-change-transform">
              <div ref={setRef} className="flex gap-6">
                {list.map((t) => (
                  <TestimonialCard key={t.id} t={t} locale={locale} />
                ))}
              </div>
              <div ref={secondSetRef} className="flex gap-6" aria-hidden="true">
                {list.map((t) => (
                  <TestimonialCard key={`dup-${t.id}`} t={t} locale={locale} />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Келесі"
            className="absolute -right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-700 shadow-card transition-colors hover:bg-gold-50 sm:-right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </section>
  );
}
