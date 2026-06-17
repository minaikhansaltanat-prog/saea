"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, Clock, FileWarning, Upload } from "lucide-react";
import { Button, Badge } from "@/components/ui/primitives";
import { COUNTRIES, INDUSTRIES, COMPANY_TYPES, SERVICE_DIRECTIONS } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

interface ScoreBreakdown {
  label: string;
  points: number;
  max: number;
}

type SubmitResult = {
  score: number;
  status: "auto_approved" | "pending_review" | "needs_docs";
  breakdown: ScoreBreakdown[];
  groups: string[];
};

export function PartnerRegisterForm({ dict }: { dict: Dictionary }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [industries, setIndustries] = useState<string[]>([]);
  const [directions, setDirections] = useState<string[]>([]);
  const [wantsMembership, setWantsMembership] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (industries.length === 0) {
      setError("Кемінде 1 бизнес саласын таңдаңыз");
      return;
    }
    if (directions.length === 0) {
      setError("Кемінде 1 серіктестік бағытын таңдаңыз");
      return;
    }
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      companyName: form.get("companyName"),
      country: form.get("country"),
      city: form.get("city"),
      industries,
      companyType: form.get("companyType"),
      regNumber: form.get("regNumber"),
      website: form.get("website"),
      contactName: form.get("contactName"),
      position: form.get("position"),
      email: form.get("email"),
      whatsapp: form.get("whatsapp"),
      telegram: form.get("telegram"),
      goal: form.get("goal"),
      directions,
      wantsMembership,
      tariffInterest: wantsMembership ? form.get("tariffInterest") : undefined,
      referralCode: form.get("referralCode"),
      presentationFileName: fileName,
    };

    try {
      const res = await fetch("/api/partner/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? dict.common.error);
        setLoading(false);
        return;
      }
      setResult(data);
    } catch {
      setError(dict.common.error);
      setLoading(false);
    }
  }

  if (result) {
    const isAuto = result.status === "auto_approved";
    return (
      <div className="rounded-3xl border border-navy-100 bg-white p-8 text-center sm:p-12">
        {isAuto ? (
          <CheckCircle2 className="mx-auto h-14 w-14 text-teal-600" />
        ) : result.status === "needs_docs" ? (
          <FileWarning className="mx-auto h-14 w-14 text-amber-500" />
        ) : (
          <Clock className="mx-auto h-14 w-14 text-gold-500" />
        )}
        <h2 className="mt-5 font-heading text-2xl font-extrabold text-navy-900">{dict.partner.successTitle}</h2>
        <p className="mt-3 text-sm text-navy-600">{isAuto ? dict.partner.successAutoApproved : dict.partner.successPending}</p>

        <div className="mx-auto mt-7 max-w-sm rounded-2xl bg-navy-50 p-5">
          <div className="text-xs font-bold uppercase tracking-wide text-navy-400">{dict.partner.scoreLabel}</div>
          <div className="mt-1 font-heading text-3xl font-extrabold text-navy-900">{result.score} / 100</div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-navy-100">
            <div
              className={`h-full rounded-full ${isAuto ? "bg-teal-500" : "bg-gold-500"}`}
              style={{ width: `${result.score}%` }}
            />
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-sm space-y-2 text-left">
          {result.breakdown.map((b) => (
            <div key={b.label} className="flex items-center justify-between text-xs text-navy-500">
              <span>{b.label}</span>
              <span className={b.points > 0 ? "font-semibold text-teal-600" : "text-navy-300"}>
                +{b.points}/{b.max}
              </span>
            </div>
          ))}
        </div>

        {result.groups.length > 0 && (
          <div className="mx-auto mt-6 flex max-w-sm flex-wrap justify-center gap-1.5">
            {result.groups.map((g) => (
              <Badge key={g} tone="teal">
                {g}
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <Section title="Компания ақпараты">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="companyName" label={dict.partner.companyName} required />
          <div className="grid grid-cols-2 gap-2">
            <Select name="country" label={dict.partner.countryCity} required options={COUNTRIES.map((c) => ({ value: c.code, label: c.label }))} />
            <Field name="city" label=" " placeholder="Қала" />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-navy-700">{dict.partner.businessIndustry}</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {INDUSTRIES.map((ind) => (
              <Chip key={ind.id} active={industries.includes(ind.id)} onClick={() => toggle(industries, setIndustries, ind.id)}>
                {ind.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-navy-700">{dict.partner.companyType}</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {COMPANY_TYPES.map((t) => (
              <label
                key={t.id}
                className="flex items-center gap-2 rounded-xl border border-navy-200 px-3 py-2.5 text-sm has-[:checked]:border-gold-500 has-[:checked]:bg-gold-50"
              >
                <input type="radio" name="companyType" value={t.id} required className="accent-gold-600" />
                {t.label}
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="regNumber" label={dict.partner.regNumber} required placeholder="БСН / ИНН" />
          <Field name="website" label={dict.partner.website} placeholder="https://" />
        </div>
      </Section>

      <Section title="Жауапты тұлға">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="contactName" label={dict.partner.contactName} required />
          <Field name="position" label={dict.partner.position} required />
          <Field name="email" type="email" label={dict.partner.email} required />
          <Field name="whatsapp" label={dict.partner.whatsapp} required placeholder="+7..." />
          <Field name="telegram" label={dict.partner.telegram} placeholder="@username" />
          <Field name="referralCode" label={dict.partner.referralCode} />
        </div>
      </Section>

      <Section title="Ынтымақтастық">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-navy-700">{dict.partner.goal}</label>
          <textarea
            name="goal"
            required
            rows={4}
            maxLength={500}
            placeholder="Кемінде 60 символ — толық сипаттама скоринг баллын арттырады"
            className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none focus:border-gold-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-navy-700">{dict.partner.directions}</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SERVICE_DIRECTIONS.map((d) => (
              <Chip key={d.slug} active={directions.includes(d.slug)} onClick={() => toggle(directions, setDirections, d.slug)}>
                {d.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-navy-50 p-4">
          <label className="flex items-center gap-2.5 text-sm font-semibold text-navy-700">
            <input
              type="checkbox"
              checked={wantsMembership}
              onChange={(e) => setWantsMembership(e.target.checked)}
              className="h-4 w-4 accent-gold-600"
            />
            {dict.partner.wantsMembership}
          </label>
          {wantsMembership && (
            <div className="mt-3">
              <Select
                name="tariffInterest"
                label=""
                options={["START", "STANDART", "PREMIUM", "PLATINUM", "ACADEMY"].map((v) => ({ value: v, label: v }))}
              />
            </div>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-navy-700">{dict.partner.presentation}</label>
          <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border-2 border-dashed border-navy-200 px-4 py-4 text-sm text-navy-500 hover:border-gold-400">
            <Upload className="h-4 w-4" />
            {fileName ?? "PDF / PPT, max 10MB"}
            <input
              type="file"
              accept=".pdf,.ppt,.pptx"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </label>
        </div>
      </Section>

      <label className="flex items-start gap-2.5 text-sm text-navy-600">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-gold-600" />
        {dict.partner.privacyAgree}
      </label>

      <p className="text-xs text-navy-400">
        reCAPTCHA v3 қорғанысы — сыртқы кілт қосылғаннан кейін автоматты белсендіріледі.
      </p>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <Button type="submit" disabled={loading} size="lg" className="w-full">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {dict.partner.submit}
      </Button>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 rounded-2xl border border-navy-100 p-6">
      <h3 className="font-heading text-base font-bold text-navy-900">{title}</h3>
      {children}
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy-700">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none focus:border-gold-500"
      />
    </div>
  );
}

function Select({
  name,
  label,
  required,
  options,
}: {
  name: string;
  label: string;
  required?: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      {label && <label className="mb-1.5 block text-sm font-semibold text-navy-700">{label}</label>}
      <select
        name={name}
        required={required}
        className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none focus:border-gold-500"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
        active ? "border-gold-500 bg-gold-50 text-gold-700" : "border-navy-200 text-navy-500 hover:border-navy-300"
      }`}
    >
      {children}
    </button>
  );
}
