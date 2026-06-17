"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { COUNTRIES, INDUSTRIES } from "@/lib/constants";
import type { User } from "@/lib/db/types";

export function ProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    await fetch("/api/member/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-navy-100 bg-white p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="companyName" label="Компания атауы" defaultValue={user.companyName} />
        <Field name="phone" label="Телефон" defaultValue={user.phone} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-navy-700">Ел</label>
          <select name="country" defaultValue={user.country} className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm">
            <option value="">—</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-navy-700">Сала</label>
          <select name="industry" defaultValue={user.industry} className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm">
            <option value="">—</option>
            {INDUSTRIES.map((i) => (
              <option key={i.id} value={i.id}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Field name="website" label="Сайт" defaultValue={user.website} />
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-navy-700">Компания сипаттамасы</label>
        <textarea
          name="bio"
          rows={4}
          defaultValue={user.bio}
          className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Сақтау
        </Button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-teal-600">
            <CheckCircle2 className="h-4 w-4" /> Сақталды
          </span>
        )}
      </div>
    </form>
  );
}

function Field({ name, label, defaultValue }: { name: string; label: string; defaultValue?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy-700">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none focus:border-gold-500"
      />
    </div>
  );
}
