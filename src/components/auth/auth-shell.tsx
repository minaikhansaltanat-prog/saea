import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { withLocale } from "@/lib/i18n/path";

export function AuthShell({
  locale,
  title,
  subtitle,
  tabs,
  children,
}: {
  locale: string;
  title: string;
  subtitle: string;
  tabs?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-navy-900 lg:block">
        <Image src="/images/bg/boardroom-analytics.webp" alt="" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <Link href={withLocale(locale, "/")} className="flex items-center gap-2.5">
            <span className="relative block h-9 w-9">
              <Image src="/images/brand/logo-transparent-512.png" alt="CAEA" fill className="object-contain" />
            </span>
            <span className="font-heading text-lg font-extrabold text-white">CAEA</span>
          </Link>
          <div>
            <h2 className="max-w-md font-heading text-3xl font-extrabold text-white">
              Орта Азия кәсіпкерлерінің цифрлы экожүйесі
            </h2>
            <p className="mt-4 max-w-sm text-sm text-white/65">
              1800+ кәсіпкер, 5 ел, бір платформа — экспорттан инвестицияға дейін барлық қызмет бір жерде.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-14 sm:px-10">
        <div className="w-full max-w-md">
          <h1 className="font-heading text-2xl font-extrabold text-navy-900">{title}</h1>
          <p className="mt-2 text-sm text-navy-500">{subtitle}</p>
          {tabs && <div className="mt-5">{tabs}</div>}
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </div>
  );
}
