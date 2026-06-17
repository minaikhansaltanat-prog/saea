"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  Bell,
  LayoutDashboard,
  UserCircle,
  MessageSquare,
  FileSearch,
  BarChart3,
  CreditCard,
  Users,
  ClipboardCheck,
  Newspaper,
  UsersRound,
  Settings,
  History,
  ShieldCheck,
} from "lucide-react";
import clsx from "clsx";
import { withLocale } from "@/lib/i18n/path";

const SHELL_ICONS = {
  LayoutDashboard,
  UserCircle,
  MessageSquare,
  FileSearch,
  BarChart3,
  CreditCard,
  Users,
  ClipboardCheck,
  Newspaper,
  UsersRound,
  Settings,
  Bell,
  History,
  ShieldCheck,
} satisfies Record<string, React.ComponentType<{ className?: string }>>;

export interface ShellNavItem {
  key: string;
  label: string;
  href: string;
  icon: keyof typeof SHELL_ICONS;
  exact?: boolean;
}

export function DashboardShell({
  locale,
  navItems,
  badgeLabel,
  userName,
  userSubLabel,
  notificationCount = 0,
  notificationsHref,
  children,
}: {
  locale: string;
  navItems: ShellNavItem[];
  badgeLabel: string;
  userName: string;
  userSubLabel: string;
  notificationCount?: number;
  notificationsHref?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeItem =
    navItems.find((item) => pathname === withLocale(locale, item.href)) ??
    [...navItems].sort((a, b) => b.href.length - a.href.length).find((item) => pathname.startsWith(withLocale(locale, item.href)));
  const pageTitle = activeItem?.label ?? badgeLabel;

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(withLocale(locale, "/"));
    router.refresh();
  }

  const sidebarContent = (
    <div className="flex h-full flex-col bg-navy-950 text-white">
      <div className="flex items-center gap-3 px-5 py-5">
        <button
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Жабу"
        >
          <X className="h-5 w-5" />
        </button>
        <Link href={withLocale(locale, "/")} className="flex items-center gap-2.5">
          <span className="relative block h-9 w-9 shrink-0">
            <Image src="/images/brand/logo-transparent-512.png" alt="CAEA" fill className="object-contain" />
          </span>
          <div>
            <div className="font-heading text-base font-extrabold leading-none text-white">CAEA</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gold-400">{badgeLabel}</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {navItems.map((item) => {
          const href = withLocale(locale, item.href);
          const active = item.exact ? pathname === href : pathname.startsWith(href);
          const Icon = SHELL_ICONS[item.icon];
          return (
            <Link
              key={item.key}
              href={href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
                active ? "bg-gold-500 text-navy-900" : "text-white/65 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-navy-900">
            {userName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">{userName}</div>
            <div className="truncate text-xs text-white/50">{userSubLabel}</div>
          </div>
          <button onClick={logout} aria-label="Шығу" className="text-white/50 hover:text-white">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-0px)] bg-navy-50 lg:flex">
      <aside className="hidden lg:block lg:w-[260px] lg:shrink-0">
        <div className="fixed inset-y-0 left-0 w-[260px]">{sidebarContent}</div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-navy-950/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72">{sidebarContent}</div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-navy-100 bg-white/90 px-5 py-4 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button className="text-navy-700 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Меню">
              <Menu className="h-5.5 w-5.5" />
            </button>
            <h1 className="font-heading text-lg font-extrabold text-navy-900 sm:text-xl">{pageTitle}</h1>
          </div>
          {notificationsHref ? (
            <Link href={withLocale(locale, notificationsHref)} className="relative" aria-label="Хабарламалар">
              <Bell className="h-5 w-5 text-navy-500" />
              {notificationCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </Link>
          ) : (
            <div className="relative">
              <Bell className="h-5 w-5 text-navy-500" />
              {notificationCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </div>
          )}
        </header>
        <main className="px-5 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
