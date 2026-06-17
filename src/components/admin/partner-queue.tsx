"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Check, X as XIcon, FileQuestion, Tags } from "lucide-react";
import { Badge, Button } from "@/components/ui/primitives";
import { ExportButtons } from "@/components/ui/export-buttons";
import type { PartnerApplication, PartnerStatus } from "@/lib/db/types";
import { partnerGroupRules } from "@/lib/db/seed/groups";

const STATUS_LABELS: Record<PartnerStatus, string> = {
  auto_approved: "Авто-бекітілген",
  pending_review: "Қарауда",
  needs_docs: "Құжат қажет",
  approved: "Бекітілген",
  rejected: "Қабылданбаған",
};

const STATUS_TONE: Record<PartnerStatus, "neutral" | "success" | "warning" | "danger" | "gold" | "teal"> = {
  auto_approved: "success",
  pending_review: "warning",
  needs_docs: "gold",
  approved: "success",
  rejected: "danger",
};

export function PartnerQueue({ partners }: { partners: PartnerApplication[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"score" | "createdAt">("score");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busyId, setBusyId] = useState<string | null>(null);
  const [bulkGroup, setBulkGroup] = useState(partnerGroupRules[0]?.name ?? "");

  const filtered = useMemo(() => {
    let list = partners.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return p.companyName.toLowerCase().includes(q) || p.contactName.toLowerCase().includes(q) || p.email.toLowerCase().includes(q);
    });
    list = [...list].sort((a, b) =>
      sortBy === "score" ? b.score - a.score : +new Date(b.createdAt) - +new Date(a.createdAt)
    );
    return list;
  }, [partners, search, statusFilter, sortBy]);

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function act(id: string, action: string, extra?: Record<string, unknown>) {
    setBusyId(id);
    await fetch(`/api/admin/partners/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...extra }),
    });
    setBusyId(null);
    router.refresh();
  }

  async function bulkAssign() {
    if (selected.size === 0) return;
    await fetch("/api/admin/partners/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: Array.from(selected), group: bulkGroup }),
    });
    setSelected(new Set());
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
            placeholder="Компания, контакт, email бойынша іздеу"
            className="w-full text-sm outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-navy-100 bg-white px-3 py-2 text-sm">
            <option value="all">Барлық статустар</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "score" | "createdAt")} className="rounded-xl border border-navy-100 bg-white px-3 py-2 text-sm">
            <option value="score">Скоринг бойынша</option>
            <option value="createdAt">Күні бойынша</option>
          </select>
          <ExportButtons
            rows={filtered.map((p) => ({
              companyName: p.companyName,
              country: p.country,
              contactName: p.contactName,
              email: p.email,
              score: p.score,
              status: p.status,
              groups: p.groups.join("; "),
              createdAt: p.createdAt,
            }))}
            filename="caea-partners"
          />
        </div>
      </div>

      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gold-200 bg-gold-50 px-4 py-3">
          <span className="text-sm font-semibold text-gold-800">{selected.size} серіктес таңдалды</span>
          <select value={bulkGroup} onChange={(e) => setBulkGroup(e.target.value)} className="rounded-lg border border-gold-300 bg-white px-2 py-1.5 text-sm">
            {partnerGroupRules.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
          <Button size="sm" onClick={bulkAssign}>
            <Tags className="h-4 w-4" /> Топқа жаппай қосу
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((p) => (
          <div key={p.id} className={`rounded-2xl border border-navy-100 bg-white p-5 ${busyId === p.id ? "opacity-50" : ""}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selected.has(p.id)}
                  onChange={() => toggleSelect(p.id)}
                  className="mt-1.5 h-4 w-4 rounded border-navy-300"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-base font-extrabold text-navy-900">{p.companyName}</span>
                    <Badge tone={STATUS_TONE[p.status]}>{STATUS_LABELS[p.status]}</Badge>
                    <Badge tone="neutral">{p.country}</Badge>
                  </div>
                  <div className="mt-1 text-sm text-navy-500">
                    {p.contactName} · {p.position} · {p.email} · {p.whatsapp}
                  </div>
                  <p className="mt-2 max-w-2xl text-sm text-navy-600">{p.goal}</p>
                  {p.groups.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.groups.map((g) => (
                        <Badge key={g} tone="teal">
                          {g}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {p.rejectionReason && <div className="mt-2 text-xs font-semibold text-rose-600">Себеп: {p.rejectionReason}</div>}
                </div>
              </div>
              <div className="text-right">
                <div className="font-heading text-2xl font-extrabold text-navy-900">{p.score}</div>
                <div className="text-xs text-navy-400">скоринг балл</div>
              </div>
            </div>

            {(p.status === "pending_review" || p.status === "needs_docs") && (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-navy-100 pt-4">
                <Button size="sm" onClick={() => act(p.id, "approve")} disabled={busyId === p.id}>
                  <Check className="h-4 w-4" /> Бекіту
                </Button>
                <Button
                  size="sm"
                  variant="outlineNavy"
                  onClick={() => act(p.id, "reject", { reason: "Деректер расталмады" })}
                  disabled={busyId === p.id}
                >
                  <XIcon className="h-4 w-4" /> Қабылдамау
                </Button>
                <Button size="sm" variant="ghost" onClick={() => act(p.id, "request_docs")} disabled={busyId === p.id}>
                  <FileQuestion className="h-4 w-4" /> Құжат сұрау
                </Button>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-navy-200 bg-white p-8 text-center text-navy-400">
            Өтінімдер табылмады.
          </div>
        )}
      </div>
    </div>
  );
}
