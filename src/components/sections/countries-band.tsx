import { Container, SectionEyebrow } from "@/components/ui/primitives";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const COUNTRIES = [
  { flag: "🇰🇿", name: "Қазақстан" },
  { flag: "🇺🇿", name: "Өзбекстан" },
  { flag: "🇰🇬", name: "Қырғызстан" },
  { flag: "🇹🇯", name: "Тәжікстан" },
  { flag: "🇹🇲", name: "Түрікменстан" },
];

export function CountriesBand({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-navy-100 bg-white py-10">
      <Container>
        <div className="mb-6 text-center">
          <SectionEyebrow>{dict.home.partnersEyebrow}</SectionEyebrow>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {COUNTRIES.map((c) => (
            <div key={c.name} className="flex items-center gap-2 text-navy-600">
              <span className="text-2xl">{c.flag}</span>
              <span className="text-sm font-semibold">{c.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
