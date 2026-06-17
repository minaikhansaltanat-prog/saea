import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { SiteSettingsStore } from "@/lib/db/collections";
import { SettingsForm } from "@/components/admin/settings-form";
import { withLocale } from "@/lib/i18n/path";

export default async function AdminSettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getSession();
  if (session!.role !== "super_admin") redirect(withLocale(locale, "/admin"));

  const settings = await SiteSettingsStore.get();
  return <SettingsForm settings={settings} />;
}
