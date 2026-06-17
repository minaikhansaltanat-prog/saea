import { getSession } from "@/lib/auth/session";
import { Users, Tenders } from "@/lib/db/collections";
import { TenderList } from "@/components/dashboard/tender-list";
import { TARIFF_FEATURES } from "@/lib/tariff-features";

export default async function TendersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getSession();
  const user = (await Users.find((u) => u.id === session!.sub))!;
  const tenders = await Tenders.all();
  const features = TARIFF_FEATURES[user.tariff];

  if (!features.tenderAlerts) {
    return (
      <div className="rounded-2xl border border-dashed border-gold-300 bg-gold-50 p-10 text-center">
        <p className="text-sm text-gold-700">
          Тендер лентасы STANDART тарифінен бастап қолжетімді. Тарифті жаңартып, барлық мүмкіндікке қол жеткізіңіз.
        </p>
      </div>
    );
  }

  return <TenderList tenders={tenders} bookmarked={user.bookmarkedTenderIds ?? []} locale={locale} />;
}
