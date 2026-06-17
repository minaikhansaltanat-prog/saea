import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { Partners } from "@/lib/db/collections";
import { PartnerQueue } from "@/components/admin/partner-queue";
import { withLocale } from "@/lib/i18n/path";

export default async function AdminPartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getSession();
  if (!["super_admin", "partner_admin"].includes(session!.role)) redirect(withLocale(locale, "/admin"));

  const partners = await Partners.all();
  return <PartnerQueue partners={partners} />;
}
