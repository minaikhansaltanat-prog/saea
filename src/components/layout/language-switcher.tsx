"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { locales, getLocaleMeta } from "@/lib/i18n/locales";
import { replaceLocaleInPath } from "@/lib/i18n/path";

export function LanguageSwitcher({
  locale,
  variant = "desktop",
  dark = false,
  onNavigate,
}: {
  locale: string;
  variant?: "desktop" | "mobile" | "compact";
  dark?: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const current = getLocaleMeta(locale);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function go(code: string) {
    setOpen(false);
    onNavigate?.();
    router.push(replaceLocaleInPath(pathname, code));
  }

  return (
    <div ref={ref} className={clsx("relative", variant === "mobile" && "w-full")}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Тілді таңдау"
        className={clsx(
          "inline-flex items-center font-semibold transition-colors",
          variant === "desktop" &&
            clsx("gap-1.5 rounded-full px-3 py-2 text-sm", dark ? "text-white/85 hover:bg-white/10" : "text-navy-700 hover:bg-navy-800/5"),
          variant === "mobile" && "w-full justify-between gap-1.5 rounded-full border border-navy-100 bg-navy-50 px-4 py-3 text-navy-800",
          variant === "compact" && "h-10 gap-1 rounded-full px-2 text-navy-700 hover:bg-navy-800/5"
        )}
      >
        {variant === "compact" ? (
          <>
            <Globe className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
            <span className="flex flex-col items-center leading-none">
              <span className="text-[9px] font-bold tracking-wide">{current.short}</span>
              <ChevronDown className={clsx("h-2.5 w-2.5 transition-transform", open && "rotate-180")} />
            </span>
          </>
        ) : (
          <>
            <span className="flex items-center gap-1.5">
              <Globe className={variant === "desktop" ? "h-4 w-4" : "h-5 w-5"} strokeWidth={2} />
              <span className={variant === "desktop" ? "text-xs font-bold" : "text-sm font-bold"}>{current.short}</span>
            </span>
            <ChevronDown className={clsx("h-4 w-4 transition-transform", open && "rotate-180")} />
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className={clsx(
              variant === "mobile"
                ? "relative z-50 mt-2 w-full overflow-hidden rounded-2xl bg-white py-2 shadow-card ring-1 ring-navy-900/5"
                : "absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl bg-white py-2 shadow-glass ring-1 ring-navy-900/5"
            )}
          >
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => go(l.code)}
                dir={l.dir}
                className={clsx(
                  "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-gold-50",
                  l.code === locale ? "font-bold text-navy-900" : "text-navy-600"
                )}
              >
                <span>{l.label}</span>
                <span className="text-[10px] uppercase text-navy-400">{l.short}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
