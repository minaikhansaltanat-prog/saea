import type { ShellNavItem } from "@/components/dashboard/shell";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function getMemberNavItems(dict: Dictionary): ShellNavItem[] {
  return [
    { key: "overview", label: dict.dashboard.sidebarOverview, href: "/dashboard", icon: "LayoutDashboard", exact: true },
    { key: "profile", label: dict.dashboard.sidebarProfile, href: "/dashboard/profile", icon: "UserCircle" },
    { key: "inquiries", label: dict.dashboard.sidebarInquiries, href: "/dashboard/inquiries", icon: "MessageSquare" },
    { key: "tenders", label: dict.dashboard.sidebarTenders, href: "/dashboard/tenders", icon: "FileSearch" },
    { key: "analytics", label: dict.dashboard.sidebarAnalytics, href: "/dashboard/analytics", icon: "BarChart3" },
    { key: "membership", label: dict.dashboard.sidebarMembership, href: "/dashboard/membership", icon: "CreditCard" },
  ];
}
