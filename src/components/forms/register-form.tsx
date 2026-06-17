"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { TariffPlan } from "@/lib/db/types";

export function RegisterForm({
  locale,
  dict,
  tariffs,
}: {
  locale: string;
  dict: Dictionary;
  tariffs: TariffPlan[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tariff, setTariff] = useState(searchParams.get("tariff") || "START");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirmPassword") || "");
    if (password !== confirm) {
      setError("Құпия сөздер сәйкес келмейді");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.get("fullName"),
          email: form.get("email"),
          password,
          companyName: form.get("companyName"),
          tariff,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? dict.common.error);
        setLoading(false);
        return;
      }
      router.push(withLocale(locale, "/dashboard"));
      router.refresh();
    } catch {
      setError(dict.common.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field name="fullName" label={dict.auth.fullName} required />
      <Field name="email" type="email" label={dict.auth.email} required />
      <Field name="companyName" label={dict.auth.companyName} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="password" type="password" label={dict.auth.password} required />
        <Field name="confirmPassword" type="password" label={dict.auth.confirmPassword} required />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-navy-700">{dict.auth.selectTariff}</label>
        <div className="flex flex-wrap gap-2">
          {tariffs.map((t) => (
            <button
              key={t.code}
              type="button"
              onClick={() => setTariff(t.code)}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
                tariff === t.code ? "border-gold-500 bg-gold-50 text-gold-700" : "border-navy-200 text-navy-500"
              }`}
            >
              {t.code}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {dict.auth.registerButton}
      </Button>

      <p className="text-center text-xs text-navy-500">
        {dict.auth.haveAccount}{" "}
        <Link href={withLocale(locale, "/login")} className="font-semibold text-navy-800 underline">
          {dict.nav.login}
        </Link>
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy-700">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        minLength={type === "password" ? 8 : undefined}
        className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none focus:border-gold-500"
      />
    </div>
  );
}
