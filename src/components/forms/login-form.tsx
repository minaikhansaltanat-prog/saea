"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function LoginForm({ locale, dict, isAdmin }: { locale: string; dict: Dictionary; isAdmin?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? dict.auth.invalidCredentials);
        setLoading(false);
        return;
      }
      const next = searchParams.get("next");
      router.push(next || withLocale(locale, data.isAdmin ? "/admin" : "/dashboard"));
      router.refresh();
    } catch {
      setError(dict.common.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-navy-700">{dict.auth.email}</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <input
            name="email"
            type="email"
            required
            defaultValue={isAdmin ? "super.admin@caea.kz" : "member.demo@caea.kz"}
            className="w-full rounded-xl border border-navy-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-gold-500"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-navy-700">{dict.auth.password}</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <input
            name="password"
            type="password"
            required
            defaultValue={isAdmin ? "Admin#12345" : "Demo#12345"}
            className="w-full rounded-xl border border-navy-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-gold-500"
          />
        </div>
      </div>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {dict.auth.loginButton}
      </Button>

      <p className="text-center text-xs text-navy-400">
        Демо тіркелгі деректері алдын ала толтырылған — тек батырманы басыңыз.
      </p>

      {!isAdmin && (
        <>
          <div className="flex items-center gap-3 py-1">
            <span className="h-px flex-1 bg-navy-100" />
            <span className="text-xs text-navy-400">{dict.auth.orDivider}</span>
            <span className="h-px flex-1 bg-navy-100" />
          </div>
          <div className="grid gap-2.5">
            <SocialButton label={dict.auth.withGoogle} />
            <SocialButton label={dict.auth.withTelegram} />
            <SocialButton label={dict.auth.withEgov} />
          </div>
        </>
      )}
    </form>
  );
}

function SocialButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={(e) => e.preventDefault()}
      title="Бұл кіру тәсілі сыртқы провайдер кілттері қосылғаннан кейін белсендіріледі"
      className="flex w-full items-center justify-center gap-2 rounded-full border border-navy-200 px-4 py-2.5 text-sm font-semibold text-navy-600 opacity-70 transition-colors hover:bg-navy-50"
    >
      {label}
    </button>
  );
}
