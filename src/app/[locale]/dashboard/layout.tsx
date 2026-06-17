import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Users, Notifications } from "@/lib/db/collections";
import { DashboardShell } from "@/components/dashboard/shell";
import { getMemberNavItems } from "@/lib/dashboard-nav";
import { withLocale } from "@/lib/i18n/path";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await getSession();
  if (!session) redirect(withLocale(locale, "/login"));

  const dict = getDictionary(locale);
  const user = await Users.find((u) => u.id === session!.sub);
  if (!user) redirect(withLocale(locale, "/login"));

  const notifications = await Notifications.filter((n) => n.recipientRole === "member" && !n.read);

  return (
    <DashboardShell
      locale={locale}
      navItems={getMemberNavItems(dict)}
      badgeLabel={dict.nav.dashboard}
      userName={user.fullName}
      userSubLabel={user.companyName || user.email}
      notificationCount={notifications.length}
    >
      {children}
    </DashboardShell>
  );
}
