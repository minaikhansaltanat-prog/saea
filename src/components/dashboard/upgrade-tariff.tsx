"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import type { Tariff, TariffPlan } from "@/lib/db/types";

export function UpgradeTariff({ tariffs, current }: { tariffs: TariffPlan[]; current: Tariff }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Tariff | null>(null);
  const [step, setStep] = useState<"select" | "pay" | "done">("select");
  const [loading, setLoading] = useState(false);

  async function confirmPayment() {
    if (!selected) return;
    setLoading(true);
    await fetch("/api/member/upgrade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tariff: selected }),
    });
    setLoading(false);
    setStep("done");
    router.refresh();
  }

  if (step === "done") {
    return (
      <div className="rounded-2xl bg-teal-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-teal-600" />
        <p className="mt-3 text-sm font-semibold text-teal-800">Тарифіңіз сәтті жаңартылды!</p>
      </div>
    );
  }

  if (step === "pay" && selected) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-7">
        <div className="flex items-center gap-2 font-heading text-base font-bold text-navy-900">
          <CreditCard className="h-5 w-5 text-gold-500" /> Төлем (демо режим)
        </div>
        <p className="mt-2 text-sm text-navy-500">
          Kaspi Pay / Stripe / Payme интеграциясы қосылғаннан кейін нақты төлем осы жерде өтеді. Қазір демо растау
          үшін батырманы басыңыз.
        </p>
        <div className="mt-5 flex gap-3">
          <Button onClick={confirmPayment} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {selected} тарифін растау
          </Button>
          <Button variant="ghost" onClick={() => setStep("select")}>
            Артқа
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {tariffs.map((t) => (
        <button
          key={t.code}
          onClick={() => {
            setSelected(t.code);
            setStep("pay");
          }}
          disabled={t.code === current}
          className={`rounded-2xl border p-5 text-left transition-colors ${
            t.code === current ? "border-gold-500 bg-gold-50" : "border-navy-100 bg-white hover:border-navy-300"
          }`}
        >
          <div className="font-heading text-base font-extrabold text-navy-900">{t.name}</div>
          <div className="mt-1 text-xs text-navy-500">
            {t.priceMonth === null ? "Жеке келісім" : t.priceMonth === 0 ? "Тегін" : `${t.priceMonth.toLocaleString("ru-RU")} ₸/ай`}
          </div>
          {t.code === current && <div className="mt-2 text-xs font-bold text-gold-700">Ағымдағы тариф</div>}
        </button>
      ))}
    </div>
  );
}
