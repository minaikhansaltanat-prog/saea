"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, X as XIcon } from "lucide-react";
import { Button, Badge, Card } from "@/components/ui/primitives";
import type { NewsArticle } from "@/lib/db/types";

const EMPTY = {
  titleKk: "",
  titleRu: "",
  titleEn: "",
  excerptKk: "",
  category: "Жаңалық",
  status: "published" as "draft" | "published",
  minutesToRead: 3,
};

export function NewsManager({ articles }: { articles: NewsArticle[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false);

  function startEdit(a: NewsArticle) {
    setEditing(a.id);
    setCreating(false);
    setForm({
      titleKk: a.title.kk ?? "",
      titleRu: a.title.ru ?? "",
      titleEn: a.title.en ?? "",
      excerptKk: a.excerpt.kk ?? "",
      category: a.category,
      status: a.status,
      minutesToRead: a.minutesToRead,
    });
  }

  function startCreate() {
    setCreating(true);
    setEditing(null);
    setForm(EMPTY);
  }

  function cancel() {
    setCreating(false);
    setEditing(null);
  }

  async function save() {
    setBusy(true);
    const body = {
      title: { kk: form.titleKk, ru: form.titleRu, en: form.titleEn },
      excerpt: { kk: form.excerptKk },
      category: form.category,
      status: form.status,
      minutesToRead: form.minutesToRead,
    };
    if (editing) {
      await fetch(`/api/admin/news/${editing}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    } else {
      await fetch("/api/admin/news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    }
    setBusy(false);
    cancel();
    router.refresh();
  }

  async function remove(id: string) {
    setBusy(true);
    await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    setBusy(false);
    router.refresh();
  }

  const showForm = creating || editing;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-extrabold text-navy-900">Жаңалықтар</h2>
        {!showForm && (
          <Button size="sm" onClick={startCreate}>
            <Plus className="h-4 w-4" /> Жаңа жаңалық
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-sm font-bold text-navy-900">{editing ? "Жаңалықты өңдеу" : "Жаңа жаңалық"}</h3>
            <button onClick={cancel} aria-label="Жабу" className="text-navy-400 hover:text-navy-700">
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input className="rounded-xl border border-navy-100 px-3 py-2 text-sm" placeholder="Тақырып (KK)" value={form.titleKk} onChange={(e) => setForm({ ...form, titleKk: e.target.value })} />
            <input className="rounded-xl border border-navy-100 px-3 py-2 text-sm" placeholder="Тақырып (RU)" value={form.titleRu} onChange={(e) => setForm({ ...form, titleRu: e.target.value })} />
            <input className="rounded-xl border border-navy-100 px-3 py-2 text-sm" placeholder="Тақырып (EN)" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} />
            <input className="rounded-xl border border-navy-100 px-3 py-2 text-sm" placeholder="Санат" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <textarea className="col-span-full rounded-xl border border-navy-100 px-3 py-2 text-sm" placeholder="Қысқаша сипаттама (KK)" value={form.excerptKk} onChange={(e) => setForm({ ...form, excerptKk: e.target.value })} />
            <select className="rounded-xl border border-navy-100 px-3 py-2 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}>
              <option value="published">Жарияланған</option>
              <option value="draft">Жоба</option>
            </select>
            <input
              type="number"
              min={1}
              className="rounded-xl border border-navy-100 px-3 py-2 text-sm"
              placeholder="Оқу уақыты (мин)"
              value={form.minutesToRead}
              onChange={(e) => setForm({ ...form, minutesToRead: Number(e.target.value) || 1 })}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={save} disabled={busy || !form.titleKk}>
              Сақтау
            </Button>
            <Button size="sm" variant="ghost" onClick={cancel}>
              Бас тарту
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-2">
        {articles.map((a) => (
          <div key={a.id} className="flex items-center justify-between gap-3 rounded-xl border border-navy-100 bg-white p-4">
            <div>
              <div className="font-semibold text-navy-900">{a.title.kk}</div>
              <div className="mt-1 flex items-center gap-2 text-xs text-navy-500">
                <Badge tone={a.status === "published" ? "success" : "neutral"}>{a.status === "published" ? "Жарияланған" : "Жоба"}</Badge>
                {a.category} · {new Date(a.publishedAt).toLocaleDateString("ru-RU")}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(a)} className="rounded-lg p-2 text-navy-500 hover:bg-navy-50" aria-label="Өңдеу">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => remove(a.id)} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50" aria-label="Жою">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {articles.length === 0 && <p className="text-sm text-navy-400">Жаңалықтар жоқ.</p>}
      </div>
    </div>
  );
}
