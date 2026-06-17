import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("container-px mx-auto max-w-7xl", className)}>{children}</div>;
}

const buttonStyles = {
  primary: "bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-gold",
  navy: "bg-navy-800 text-white hover:bg-navy-700",
  outline: "border-2 border-white/30 text-white hover:bg-white/10",
  outlineNavy: "border-2 border-navy-800/20 text-navy-800 hover:bg-navy-800/5",
  ghost: "text-navy-800 hover:bg-navy-800/5",
  teal: "bg-teal-500 text-white hover:bg-teal-600",
};

type ButtonVariant = keyof typeof buttonStyles;

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-base",
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: keyof typeof sizeStyles;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98]",
        buttonStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98]",
        buttonStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export function SectionEyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={clsx(
        "mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider",
        light ? "bg-white/10 text-gold-300" : "bg-gold-50 text-gold-700"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "gold" | "teal";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-slate-100 text-slate-600",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-rose-100 text-rose-700",
    gold: "bg-gold-100 text-gold-700",
    teal: "bg-teal-100 text-teal-700",
  };
  return (
    <span className={clsx("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("rounded-2xl bg-white shadow-card", className)}>{children}</div>;
}
