"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-teal-50 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-teal-600" />
        <p className="mt-4 text-sm font-semibold text-teal-800">{dict.contact.formSuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label={dict.contact.formName} required />
        <Field name="email" type="email" label={dict.contact.formEmail} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="phone" label={dict.contact.formPhone} />
        <Field name="company" label={dict.contact.formCompany} />
      </div>
      <Field name="subject" label={dict.contact.formSubject} />
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-navy-700">{dict.contact.formMessage}</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-gold-500"
        />
      </div>
      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {dict.contact.formSubmit}
      </Button>
      {status === "error" && <p className="text-sm text-rose-600">{dict.common.error}</p>}
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
        className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-800 outline-none transition-colors focus:border-gold-500"
      />
    </div>
  );
}
