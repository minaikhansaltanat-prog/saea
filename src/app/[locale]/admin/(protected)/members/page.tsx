import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { Users } from "@/lib/db/collections";
import { MemberTable } from "@/components/admin/member-table";
import { withLocale } from "@/lib/i18n/path";

export default async function AdminMembersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getSession();
  if (!["super_admin", "membership_admin"].includes(session!.role)) redirect(withLocale(locale, "/admin"));

  const members = (await Users.all()).filter((u) => u.role === "member");
  return <MemberTable members={members} />;
}
