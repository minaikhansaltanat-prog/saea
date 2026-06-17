import { CheckCircle2, XCircle } from "lucide-react";
import { Container, SectionEyebrow } from "@/components/ui/primitives";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const COMPETITORS = [
  { name: "Атамекен (НПП РК)", gap: "Бюрократиялық; практикалық сүйемелдеу жоқ" },
  { name: "CABXPO", gap: "Тек іс-шара форматы; тұрақты консалтинг жоқ" },
  { name: "CIPE Central Asia", gap: "Саяси сипат; коммерциялық сервис шектеулі" },
  { name: "CA+ Accelerator (ESCAP)", gap: "Тек Tech стартаптарға; кең бизнеске емес" },
  { name: "B5+1 Forum", gap: "Жылына 1 рет; аралық байланыс жоқ" },
];

export function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section className="section-py bg-navy-50">
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionEyebrow>{dict.home.whyUsEyebrow}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-extrabold text-navy-900 sm:text-4xl">{dict.home.whyUsTitle}</h2>
          <p className="mt-5 text-base leading-relaxed text-navy-600">{dict.home.whyUsText}</p>

          <ul className="mt-7 space-y-3">
            {[
              "Кеңес берумен шектелмей, оны бизнесіңізде өзіміз жүзеге асырамыз",
              "5 елдің сараптамасы мен серіктестік желісі бір платформада",
              "Авто-скоринг пен AI-қолдау арқасында шешімдер жылдамдатылады",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-navy-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
          <div className="mb-5 text-xs font-bold uppercase tracking-wide text-navy-400">
            Нарықтағы басқа ұйымдар — олқылықтар
          </div>
          <ul className="space-y-4">
            {COMPETITORS.map((c) => (
              <li key={c.name} className="flex items-start gap-3 border-b border-navy-50 pb-4 last:border-0 last:pb-0">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                <div>
                  <div className="text-sm font-bold text-navy-800">{c.name}</div>
                  <div className="text-sm text-navy-500">{c.gap}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
