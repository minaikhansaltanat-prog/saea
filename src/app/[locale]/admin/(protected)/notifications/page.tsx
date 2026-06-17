import { getSession } from "@/lib/auth/session";
import { Notifications } from "@/lib/db/collections";
import { NotificationList } from "@/components/admin/notification-list";

export default async function AdminNotificationsPage() {
  const session = await getSession();
  const role = session!.role;

  const notifications = (
    await Notifications.filter((n) => (role === "super_admin" ? n.recipientRole !== "member" : n.recipientRole === role))
  ).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  return <NotificationList notifications={notifications} />;
}
