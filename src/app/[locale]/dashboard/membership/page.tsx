import { getSession } from "@/lib/auth/session";
import { Users, Tariffs } from "@/lib/db/collections";
import { UpgradeTariff } from "@/components/dashboard/upgrade-tariff";

export default async function MembershipPage() {
  const session = await getSession();
  const user = (await Users.find((u) => u.id === session!.sub))!;
  const tariffs = await Tariffs.all();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-navy-100 bg-white p-6">
        <div className="text-xs font-bold uppercase tracking-wide text-navy-400">Ағымдағы тариф</div>
        <div className="mt-1 font-heading text-2xl font-extrabold text-navy-900">{user.tariff}</div>
        <div className="mt-1 text-sm text-navy-500">Тіркелген күні: {new Date(user.createdAt).toLocaleDateString()}</div>
      </div>

      <UpgradeTariff tariffs={tariffs} current={user.tariff} />
    </div>
  );
}
