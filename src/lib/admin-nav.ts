import type { ShellNavItem } from "@/components/dashboard/shell";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Role } from "@/lib/auth/roles";

export function getAdminNavItems(dict: Dictionary, role: Role): ShellNavItem[] {
  const items: (ShellNavItem & { roles: Role[] })[] = [
    {
      key: "dashboard",
      label: dict.admin.sidebarDashboard,
      href: "/admin",
      icon: "LayoutDashboard",
      exact: true,
      roles: ["super_admin", "content_admin", "membership_admin", "partner_admin", "finance_admin", "analytics_viewer", "support_agent"],
    },
    {
      key: "members",
      label: dict.admin.sidebarMembers,
      href: "/admin/members",
      icon: "Users",
      roles: ["super_admin", "membership_admin"],
    },
    {
      key: "partners",
      label: dict.admin.sidebarPartners,
      href: "/admin/partners",
      icon: "ClipboardCheck",
      roles: ["super_admin", "partner_admin"],
    },
    {
      key: "news",
      label: dict.admin.sidebarNews,
      href: "/admin/content/news",
      icon: "Newspaper",
      roles: ["super_admin", "content_admin"],
    },
    {
      key: "team",
      label: dict.admin.sidebarTeam,
      href: "/admin/content/team",
      icon: "UsersRound",
      roles: ["super_admin", "content_admin"],
    },
    {
      key: "notifications",
      label: dict.admin.sidebarNotifications,
      href: "/admin/notifications",
      icon: "Bell",
      roles: ["super_admin", "membership_admin", "partner_admin", "support_agent"],
    },
    {
      key: "audit",
      label: dict.admin.sidebarAuditLog,
      href: "/admin/audit",
      icon: "History",
      roles: ["super_admin"],
    },
    {
      key: "roles",
      label: dict.admin.sidebarRoles,
      href: "/admin/roles",
      icon: "ShieldCheck",
      roles: ["super_admin"],
    },
    {
      key: "settings",
      label: dict.admin.sidebarSettings,
      href: "/admin/settings",
      icon: "Settings",
      roles: ["super_admin"],
    },
  ];

  return items
    .filter((item) => item.roles.includes(role))
    .map((item): ShellNavItem => ({ key: item.key, label: item.label, href: item.href, icon: item.icon, exact: item.exact }));
}
