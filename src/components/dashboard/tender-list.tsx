"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, BookmarkCheck, Building2 } from "lucide-react";
import type { Tender } from "@/lib/db/types";

export function TenderList({ tenders, bookmarked, locale }: { tenders: Tender[]; bookmarked: string[]; locale: string }) {
  const router = useRouter();
  const [marks, setMarks] = useState<string[]>(bookmarked);

  async function toggle(id: string) {
    setMarks((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
    await fetch(`/api/member/tenders/${id}/bookmark`, { method: "POST" });
    router.refresh();
  }

  return (
    <div className="space-y-3">
      {tenders.map((t) => {
        const isMarked = marks.includes(t.id);
        return (
          <div key={t.id} className="flex items-start justify-between gap-4 rounded-2xl border border-navy-100 bg-white p-5">
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
                <Building2 className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-bold text-navy-900">{t.title}</div>
                <div className="mt-1 text-xs text-navy-500">{t.organization}</div>
                <div className="mt-2 flex items-center gap-3 text-xs text-navy-500">
                  <span className="font-semibold text-teal-600">
                    {t.amount.toLocaleString("ru-RU")} {t.currency}
                  </span>
                  <span>{t.industry}</span>
                  <span>Мерзімі: {new Date(t.deadline).toLocaleDateString(locale)}</span>
                </div>
              </div>
            </div>
            <button onClick={() => toggle(t.id)} className="text-navy-400 hover:text-gold-500" aria-label="Сақтау">
              {isMarked ? <BookmarkCheck className="h-5 w-5 text-gold-500" /> : <Bookmark className="h-5 w-5" />}
            </button>
          </div>
        );
      })}
    </div>
  );
}
