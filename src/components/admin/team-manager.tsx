"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, X as XIcon } from "lucide-react";
import { Button, Card } from "@/components/ui/primitives";
import type { TeamMember } from "@/lib/db/types";

const EMPTY = { name: "", positionKk: "", bioKk: "", email: "", linkedin: "" };

export function TeamManager({ team }: { team: TeamMember[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false);

  function startEdit(m: TeamMember) {
    setEditing(m.id);
    setCreating(false);
    setForm({ name: m.name, positionKk: m.position.kk ?? "", bioKk: m.bio.kk ?? "", email: m.email ?? "", linkedin: m.linkedin ?? "" });
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
      name: form.name,
      position: { kk: form.positionKk },
      bio: { kk: form.bioKk },
      email: form.email || undefined,
      linkedin: form.linkedin || undefined,
    };
    if (editing) {
      await fetch(`/api/admin/team/${editing}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    } else {
      await fetch("/api/admin/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    }
    setBusy(false);
    cancel();
    router.refresh();
  }

  async function remove(id: string) {
    setBusy(true);
    await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    setBusy(false);
    router.refresh();
  }

  const showForm = creating || editing;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-extrabold text-navy-900">Команда</h2>
        {!showForm && (
          <Button size="sm" onClick={startCreate}>
            <Plus className="h-4 w-4" /> Жаңа мүше
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-sm font-bold text-navy-900">{editing ? "Мүшені өңдеу" : "Жаңа команда мүшесі"}</h3>
            <button onClick={cancel} aria-label="Жабу" className="text-navy-400 hover:text-navy-700">
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input className="rounded-xl border border-navy-100 px-3 py-2 text-sm" placeholder="Аты-жөні" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="rounded-xl border border-navy-100 px-3 py-2 text-sm" placeholder="Лауазымы (KK)" value={form.positionKk} onChange={(e) => setForm({ ...form, positionKk: e.target.value })} />
            <input className="rounded-xl border border-navy-100 px-3 py-2 text-sm" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="rounded-xl border border-navy-100 px-3 py-2 text-sm" placeholder="LinkedIn" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
            <textarea className="col-span-full rounded-xl border border-navy-100 px-3 py-2 text-sm" placeholder="Био (KK)" value={form.bioKk} onChange={(e) => setForm({ ...form, bioKk: e.target.value })} />
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={save} disabled={busy || !form.name}>
              Сақтау
            </Button>
            <Button size="sm" variant="ghost" onClick={cancel}>
              Бас тарту
            </Button>
          </div>
        </Card>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <div key={m.id} className="rounded-xl border border-navy-100 bg-white p-4">
            <div className="font-semibold text-navy-900">{m.name}</div>
            <div className="mt-0.5 text-sm text-navy-500">{m.position.kk}</div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => startEdit(m)} className="rounded-lg p-2 text-navy-500 hover:bg-navy-50" aria-label="Өңдеу">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => remove(m.id)} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50" aria-label="Жою">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {team.length === 0 && <p className="text-sm text-navy-400">Команда мүшелері жоқ.</p>}
      </div>
    </div>
  );
}
