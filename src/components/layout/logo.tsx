import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export function Logo({ locale, variant = "light" }: { locale: string; variant?: "light" | "dark" }) {
  return (
    <Link href={`/${locale}`} className="flex items-center gap-2.5 shrink-0" aria-label="CAEA">
      <span className="relative block h-10 w-10 sm:h-11 sm:w-11">
        <Image
          src="/images/brand/logo-transparent-512.png"
          alt="CAEA logo"
          fill
          sizes="44px"
          className="object-contain"
          priority
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={clsx(
            "font-heading text-lg font-extrabold tracking-tight sm:text-xl",
            variant === "light" ? "text-navy-900" : "text-white"
          )}
        >
          CAEA
        </span>
        <span
          className={clsx(
            "text-[10px] font-medium uppercase tracking-wider sm:text-[11px] xl:hidden 2xl:block",
            variant === "light" ? "text-navy-500" : "text-white/70"
          )}
        >
          Central Asia Entrepreneurs
        </span>
      </span>
    </Link>
  );
}
