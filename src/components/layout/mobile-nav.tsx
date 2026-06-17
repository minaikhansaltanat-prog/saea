"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import clsx from "clsx";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { withLocale } from "@/lib/i18n/path";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { mainNavItems } from "@/lib/nav";

export function MobileNav({
  open,
  onClose,
  locale,
  dict,
  isAuthed,
}: {
  open: boolean;
  onClose: () => void;
  locale: string;
  dict: Dictionary;
  isAuthed: boolean;
}) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy-950/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-[70] flex h-[100dvh] w-full max-w-sm flex-col overflow-y-auto bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
              <button
                type="button"
                onClick={onClose}
                aria-label={dict.common.close}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-700 transition-colors hover:bg-navy-100"
              >
                <X className="h-5 w-5" />
              </button>
              <Logo locale={locale} variant="light" />
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-5 py-6">
              {mainNavItems.map((item) => {
                const href = withLocale(locale, item.href);
                const active = pathname === href;
                return (
                  <Link
                    key={item.key}
                    href={href}
                    className={clsx(
                      "rounded-xl px-4 py-3.5 text-base font-semibold transition-colors",
                      active ? "bg-navy-800 text-white" : "text-navy-800 hover:bg-navy-50"
                    )}
                  >
                    {dict.nav[item.key]}
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-3 border-t border-navy-100 px-5 py-5">
              <LanguageSwitcher locale={locale} variant="mobile" />
              <div className="flex gap-3">
                <Link
                  href={withLocale(locale, isAuthed ? "/dashboard" : "/login")}
                  className="flex-1 rounded-full border-2 border-navy-800 px-4 py-3 text-center text-sm font-bold text-navy-800"
                >
                  {dict.nav[isAuthed ? "dashboard" : "login"]}
                </Link>
                <Link
                  href={withLocale(locale, "/partner/register")}
                  className="flex-1 rounded-full bg-gold-500 px-4 py-3 text-center text-sm font-bold text-navy-900 shadow-gold"
                >
                  {dict.nav.partnerRegister}
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
