"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Mail, LayoutDashboard, ShieldCheck } from "lucide-react";
import clsx from "clsx";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { Container, LinkButton } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";
import { mainNavItems } from "@/lib/nav";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { SessionPayload } from "@/lib/auth/roles";
import { isAdminRole } from "@/lib/auth/roles";

export function SiteHeader({
  locale,
  dict,
  session,
  contact,
}: {
  locale: string;
  dict: Dictionary;
  session: SessionPayload | null;
  contact: { phone: string; email: string };
}) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAuthed = Boolean(session);
  const accountHref = session ? (isAdminRole(session.role) ? "/admin" : "/dashboard") : "/login";

  return (
    <header className="sticky top-0 z-[100]">
      <div className="hidden bg-navy-950 text-white/80 lg:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-gold-400" /> {contact.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-gold-400" /> {contact.email}
            </span>
          </div>
          <span className="text-white/60">{dict.header.topBarText}</span>
        </Container>
      </div>

      <div
        className={clsx(
          "border-b transition-all duration-300",
          scrolled ? "border-navy-100 bg-white/95 shadow-soft backdrop-blur-md" : "border-transparent bg-white"
        )}
      >
        <Container className="flex h-[72px] items-center gap-3 lg:h-20">
          <Logo locale={locale} variant="light" />

          <nav className="hidden min-w-0 flex-1 items-center gap-0.5 xl:flex">
            {mainNavItems.map((item) => {
              const href = withLocale(locale, item.href);
              const active = pathname === href;
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={clsx(
                    "rounded-full px-2 py-1.5 text-[13px] font-semibold leading-[1.15] transition-colors",
                    item.compact ? "w-16 text-center" : "whitespace-nowrap",
                    active ? "bg-navy-800 text-white" : "text-navy-700 hover:bg-navy-800/5"
                  )}
                >
                  {dict.nav[item.key]}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden lg:block">
              <LanguageSwitcher locale={locale} />
            </div>

            <Link
              href={withLocale(locale, accountHref)}
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-800/5 lg:flex"
            >
              {isAdminRole(session?.role ?? "member") && session ? (
                <ShieldCheck className="h-4 w-4" />
              ) : (
                <LayoutDashboard className="h-4 w-4" />
              )}
              {dict.nav[session ? (isAdminRole(session.role) ? "admin" : "dashboard") : "login"]}
            </Link>

            <LinkButton href={withLocale(locale, "/membership")} size="sm" className="hidden lg:inline-flex">
              {dict.header.getQuote}
            </LinkButton>

            <div className="lg:hidden">
              <LanguageSwitcher locale={locale} />
            </div>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Меню"
              className="flex h-11 w-11 items-center justify-center rounded-full text-navy-800 transition-colors hover:bg-navy-800/5 xl:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </div>

      <MobileNav open={drawerOpen} onClose={() => setDrawerOpen(false)} locale={locale} dict={dict} isAuthed={isAuthed} />
    </header>
  );
}
