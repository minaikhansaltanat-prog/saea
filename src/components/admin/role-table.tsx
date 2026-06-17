"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROLE_LABELS, ADMIN_ROLES } from "@/lib/auth/roles";
import type { User } from "@/lib/db/types";

export function RoleTable({ staff }: { staff: User[] }) {
  const router = useRouter();
  const [savingId, setSavingId] = useState<string | null>(null);

  async function changeRole(id: string, role: string) {
    setSavingId(id);
    await fetch(`/api/admin/staff/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    setSavingId(null);
    router.refresh();
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-navy-100 bg-white">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead className="bg-navy-50 text-xs font-bold uppercase tracking-wide text-navy-500">
          <tr>
            <th className="px-4 py-3">Қызметкер</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Рөл</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">
          {staff.map((u) => (
            <tr key={u.id} className={savingId === u.id ? "opacity-50" : undefined}>
              <td className="px-4 py-3 font-semibold text-navy-900">{u.fullName}</td>
              <td className="px-4 py-3 text-navy-600">{u.email}</td>
              <td className="px-4 py-3">
                <select
                  defaultValue={u.role}
                  disabled={savingId === u.id || u.id.includes("super_admin")}
                  onChange={(e) => changeRole(u.id, e.target.value)}
                  className="rounded-lg border border-navy-100 bg-white px-2 py-1.5 text-xs font-semibold"
                >
                  {ADMIN_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {ROLE_LABELS[r]}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
