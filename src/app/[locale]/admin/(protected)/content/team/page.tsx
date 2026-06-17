import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { Team } from "@/lib/db/collections";
import { TeamManager } from "@/components/admin/team-manager";
import { withLocale } from "@/lib/i18n/path";

export default async function AdminTeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getSession();
  if (!["super_admin", "content_admin"].includes(session!.role)) redirect(withLocale(locale, "/admin"));

  const team = (await Team.all()).sort((a, b) => a.order - b.order);
  return <TeamManager team={team} />;
}
