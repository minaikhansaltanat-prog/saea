import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { isAdminRole } from "@/lib/auth/roles";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Users, Notifications } from "@/lib/db/collections";
import { DashboardShell } from "@/components/dashboard/shell";
import { getAdminNavItems } from "@/lib/admin-nav";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { withLocale } from "@/lib/i18n/path";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await getSession();
  if (!session || !isAdminRole(session.role)) redirect(withLocale(locale, "/admin/login"));

  const dict = getDictionary(locale);
  const user = await Users.find((u) => u.id === session.sub);
  if (!user) redirect(withLocale(locale, "/admin/login"));

  const notifications = await Notifications.filter((n) =>
    session.role === "super_admin" ? n.recipientRole !== "member" : n.recipientRole === session.role
  );
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <DashboardShell
      locale={locale}
      navItems={getAdminNavItems(dict, session.role)}
      badgeLabel={dict.nav.admin}
      userName={user.fullName}
      userSubLabel={ROLE_LABELS[session.role]}
      notificationCount={unread}
      notificationsHref="/admin/notifications"
    >
      {children}
    </DashboardShell>
  );
}
