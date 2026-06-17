import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { Users } from "@/lib/db/collections";
import { RoleTable } from "@/components/admin/role-table";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { withLocale } from "@/lib/i18n/path";

const PERMISSIONS: { role: string; access: string }[] = [
  { role: "super_admin", access: "Барлық модульдер — толық рұқсат" },
  { role: "content_admin", access: "Жаңалықтар, Команда (CMS)" },
  { role: "membership_admin", access: "Мүшелер тізімі, статус/тариф басқару" },
  { role: "partner_admin", access: "Серіктес өтінімдер, бекіту/топтау" },
  { role: "finance_admin", access: "MRR / қаржы KPI (тек қарау)" },
  { role: "analytics_viewer", access: "Аналитика KPI (тек қарау)" },
  { role: "support_agent", access: "Хабарламалар орталығы" },
];

export default async function AdminRolesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getSession();
  if (session!.role !== "super_admin") redirect(withLocale(locale, "/admin"));

  const staff = (await Users.all()).filter((u) => u.role !== "member");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-lg font-extrabold text-navy-900">RBAC рұқсаттар матрицасы</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-navy-100 bg-white">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-navy-50 text-xs font-bold uppercase tracking-wide text-navy-500">
              <tr>
                <th className="px-4 py-3">Рөл</th>
                <th className="px-4 py-3">Қолжетімділік аймағы</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {PERMISSIONS.map((p) => (
                <tr key={p.role}>
                  <td className="px-4 py-3 font-semibold text-navy-900">{ROLE_LABELS[p.role as keyof typeof ROLE_LABELS]}</td>
                  <td className="px-4 py-3 text-navy-600">{p.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="font-heading text-lg font-extrabold text-navy-900">Қызметкерлер мен рөлдер</h2>
        <div className="mt-3">
          <RoleTable staff={staff} />
        </div>
      </div>
    </div>
  );
}
