"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, CheckCircle2, Circle } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui/primitives";
import type { SiteSettings } from "@/lib/db/types";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true);
    await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setBusy(false);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-heading text-sm font-bold text-navy-900">Байланыс ақпараты</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            className="rounded-xl border border-navy-100 px-3 py-2 text-sm"
            placeholder="Телефон"
            value={form.contact.phone}
            onChange={(e) => setForm({ ...form, contact: { ...form.contact, phone: e.target.value } })}
          />
          <input
            className="rounded-xl border border-navy-100 px-3 py-2 text-sm"
            placeholder="Email"
            value={form.contact.email}
            onChange={(e) => setForm({ ...form, contact: { ...form.contact, email: e.target.value } })}
          />
          <input
            className="col-span-full rounded-xl border border-navy-100 px-3 py-2 text-sm"
            placeholder="Мекенжай"
            value={form.contact.address}
            onChange={(e) => setForm({ ...form, contact: { ...form.contact, address: e.target.value } })}
          />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading text-sm font-bold text-navy-900">Әлеуметтік желілер</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            className="rounded-xl border border-navy-100 px-3 py-2 text-sm"
            placeholder="Facebook"
            value={form.socials.facebook ?? ""}
            onChange={(e) => setForm({ ...form, socials: { ...form.socials, facebook: e.target.value } })}
          />
          <input
            className="rounded-xl border border-navy-100 px-3 py-2 text-sm"
            placeholder="Instagram"
            value={form.socials.instagram ?? ""}
            onChange={(e) => setForm({ ...form, socials: { ...form.socials, instagram: e.target.value } })}
          />
          <input
            className="rounded-xl border border-navy-100 px-3 py-2 text-sm"
            placeholder="LinkedIn"
            value={form.socials.linkedin ?? ""}
            onChange={(e) => setForm({ ...form, socials: { ...form.socials, linkedin: e.target.value } })}
          />
          <input
            className="rounded-xl border border-navy-100 px-3 py-2 text-sm"
            placeholder="YouTube"
            value={form.socials.youtube ?? ""}
            onChange={(e) => setForm({ ...form, socials: { ...form.socials, youtube: e.target.value } })}
          />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading text-sm font-bold text-navy-900">Мессенджер сілтемелері</h3>
        <p className="mt-1 text-xs text-navy-500">Нақты сілтемелер кейінірек қосылады — қазір өрістер дайын.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <input
            className="rounded-xl border border-navy-100 px-3 py-2 text-sm"
            placeholder="WhatsApp сілтемесі"
            value={form.messengers.whatsapp}
            onChange={(e) => setForm({ ...form, messengers: { ...form.messengers, whatsapp: e.target.value } })}
          />
          <input
            className="rounded-xl border border-navy-100 px-3 py-2 text-sm"
            placeholder="Telegram сілтемесі"
            value={form.messengers.telegram}
            onChange={(e) => setForm({ ...form, messengers: { ...form.messengers, telegram: e.target.value } })}
          />
          <input
            className="rounded-xl border border-navy-100 px-3 py-2 text-sm"
            placeholder="WeChat сілтемесі"
            value={form.messengers.wechat}
            onChange={(e) => setForm({ ...form, messengers: { ...form.messengers, wechat: e.target.value } })}
          />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading text-sm font-bold text-navy-900">Интеграциялар</h3>
        <p className="mt-1 text-xs text-navy-500">Күй көрсеткіші ғана — қосылым нақты API кілттері берілгеннен кейін орнатылады.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {Object.entries(form.integrations).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between rounded-xl border border-navy-100 px-3 py-2.5">
              <span className="text-sm text-navy-700">{value.label}</span>
              <Badge tone={value.connected ? "success" : "neutral"}>
                {value.connected ? <CheckCircle2 className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                {value.connected ? "Қосылған" : "Қосылмаған"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={busy}>
          <Save className="h-4 w-4" /> Сақтау
        </Button>
        {saved && <span className="text-sm font-semibold text-teal-600">Сақталды!</span>}
      </div>
    </div>
  );
}
