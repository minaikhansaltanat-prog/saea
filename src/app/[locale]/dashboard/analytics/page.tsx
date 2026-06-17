import { getSession } from "@/lib/auth/session";
import { Users } from "@/lib/db/collections";
import { ViewsLineChart, IndustryBarChart } from "@/components/dashboard/analytics-charts";
import { RoiCalculator } from "@/components/dashboard/roi-calculator";
import { ExportButtons } from "@/components/ui/export-buttons";
import { TARIFF_FEATURES } from "@/lib/tariff-features";
import { Tariffs } from "@/lib/db/collections";

export default async function AnalyticsPage() {
  const session = await getSession();
  const user = (await Users.find((u) => u.id === session!.sub))!;
  const features = TARIFF_FEATURES[user.tariff];
  const tariffs = await Tariffs.all();
  const plan = tariffs.find((t) => t.code === user.tariff);

  if (features.analytics === "none") {
    return (
      <div className="rounded-2xl border border-dashed border-gold-300 bg-gold-50 p-10 text-center">
        <p className="text-sm text-gold-700">Аналитика модулі STANDART тарифінен бастап қолжетімді.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <ExportButtons
          rows={[{ metric: "profileCompleteness", value: user.profileCompleteness }, { metric: "tariff", value: user.tariff }]}
          filename="caea-analytics"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-navy-100 bg-white p-6">
          <h3 className="font-heading text-sm font-bold text-navy-900">Профиль қаралымы (14 күн)</h3>
          <div className="mt-3">
            <ViewsLineChart userId={user.id} />
          </div>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-6">
          <h3 className="font-heading text-sm font-bold text-navy-900">Сұраулар — ел бойынша</h3>
          <div className="mt-3">
            <IndustryBarChart userId={user.id} />
          </div>
        </div>
      </div>

      <RoiCalculator membershipCost={plan?.priceMonth ?? 0} />
    </div>
  );
}
