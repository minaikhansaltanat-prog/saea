"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

export function RoiCalculator({ membershipCost }: { membershipCost: number }) {
  const [dealsValue, setDealsValue] = useState(0);

  const roi = membershipCost > 0 ? Math.round(((dealsValue - membershipCost) / membershipCost) * 100) : 0;

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6">
      <div className="flex items-center gap-2 font-heading text-sm font-bold text-navy-900">
        <Calculator className="h-4 w-4 text-gold-500" /> ROI калькулятор
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-500">Мүшелік шығысы (₸/ай)</label>
          <input
            value={membershipCost}
            disabled
            className="w-full rounded-xl border border-navy-100 bg-navy-50 px-4 py-2.5 text-sm text-navy-500"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-500">Алынған байланыстардан түскен болжамды кіріс (₸)</label>
          <input
            type="number"
            value={dealsValue}
            onChange={(e) => setDealsValue(Number(e.target.value))}
            className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
          />
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-teal-50 p-4 text-center">
        <div className="text-xs font-semibold text-teal-700">Болжамды ROI</div>
        <div className="font-heading text-3xl font-extrabold text-teal-700">{roi}%</div>
      </div>
    </div>
  );
}
