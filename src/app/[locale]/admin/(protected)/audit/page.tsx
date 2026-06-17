import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { AuditLog } from "@/lib/db/collections";
import { Badge } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";

export default async function AdminAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getSession();
  if (session!.role !== "super_admin") redirect(withLocale(locale, "/admin"));

  const entries = (await AuditLog.all()).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 200);

  return (
    <div className="overflow-x-auto rounded-2xl border border-navy-100 bg-white">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead className="bg-navy-50 text-xs font-bold uppercase tracking-wide text-navy-500">
          <tr>
            <th className="px-4 py-3">Уақыт</th>
            <th className="px-4 py-3">Орындаушы</th>
            <th className="px-4 py-3">Әрекет</th>
            <th className="px-4 py-3">Нысан</th>
            <th className="px-4 py-3">Қосымша</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">
          {entries.map((e) => (
            <tr key={e.id}>
              <td className="px-4 py-3 text-navy-500">{new Date(e.createdAt).toLocaleString("ru-RU")}</td>
              <td className="px-4 py-3 font-semibold text-navy-800">{e.actorName}</td>
              <td className="px-4 py-3">
                <Badge tone="neutral">{e.action}</Badge>
              </td>
              <td className="px-4 py-3 text-navy-700">{e.target}</td>
              <td className="px-4 py-3 text-navy-400">{e.meta ?? "—"}</td>
            </tr>
          ))}
          {entries.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-navy-400">
                Жазбалар жоқ.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
