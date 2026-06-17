"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import { ExportButtons } from "@/components/ui/export-buttons";
import { STATUS_LABELS, STATUS_TONE } from "@/lib/status";
import type { User, MemberStatus, Tariff } from "@/lib/db/types";

const STATUS_OPTIONS: MemberStatus[] = ["new", "active", "verified", "gold", "featured", "suspended", "banned"];
const TARIFF_OPTIONS: Tariff[] = ["START", "STANDART", "PREMIUM", "PLATINUM", "ACADEMY"];

export function MemberTable({ members }: { members: User[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [savingId, setSavingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return members.filter((m) => {
      if (statusFilter !== "all" && m.status !== statusFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return m.fullName.toLowerCase().includes(q) || (m.companyName ?? "").toLowerCase().includes(q) || m.email.toLowerCase().includes(q);
    });
  }, [members, search, statusFilter]);

  async function patch(id: string, body: Record<string, unknown>) {
    setSavingId(id);
    await fetch(`/api/admin/members/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSavingId(null);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-navy-100 bg-white px-3 py-2 sm:max-w-xs">
          <Search className="h-4 w-4 text-navy-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Аты, компания, email бойынша іздеу"
            className="w-full text-sm outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-navy-100 bg-white px-3 py-2 text-sm"
          >
            <option value="all">Барлық статустар</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <ExportButtons
            rows={filtered.map((m) => ({
              fullName: m.fullName,
              companyName: m.companyName ?? "",
              email: m.email,
              tariff: m.tariff,
              status: m.status,
              profileCompleteness: m.profileCompleteness,
              rating: m.rating,
              createdAt: m.createdAt,
            }))}
            filename="caea-members"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-navy-100 bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-navy-50 text-xs font-bold uppercase tracking-wide text-navy-500">
            <tr>
              <th className="px-4 py-3">Мүше</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Тариф</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3">Профиль</th>
              <th className="px-4 py-3">Рейтинг</th>
              <th className="px-4 py-3">Тіркелген</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {filtered.map((m) => (
              <tr key={m.id} className={savingId === m.id ? "opacity-50" : undefined}>
                <td className="px-4 py-3">
                  <div className="font-semibold text-navy-900">{m.fullName}</div>
                  <div className="text-xs text-navy-500">{m.companyName}</div>
                </td>
                <td className="px-4 py-3 text-navy-600">{m.email}</td>
                <td className="px-4 py-3">
                  <select
                    defaultValue={m.tariff}
                    disabled={savingId === m.id}
                    onChange={(e) => patch(m.id, { tariff: e.target.value })}
                    className="rounded-lg border border-navy-100 bg-white px-2 py-1 text-xs font-semibold"
                  >
                    {TARIFF_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <select
                    defaultValue={m.status}
                    disabled={savingId === m.id}
                    onChange={(e) => patch(m.id, { status: e.target.value })}
                    className="rounded-lg border border-navy-100 bg-white px-2 py-1 text-xs font-semibold"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                  <Badge tone={STATUS_TONE[m.status]} className="ml-2">
                    {STATUS_LABELS[m.status]}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-navy-600">{m.profileCompleteness}%</td>
                <td className="px-4 py-3 text-navy-600">{m.rating.toFixed(1)}</td>
                <td className="px-4 py-3 text-navy-500">{new Date(m.createdAt).toLocaleDateString("ru-RU")}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-navy-400">
                  Мүшелер табылмады.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
