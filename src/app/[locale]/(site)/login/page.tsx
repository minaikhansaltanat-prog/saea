import { Suspense } from "react";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/forms/login-form";
import { withLocale } from "@/lib/i18n/path";

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <AuthShell locale={locale} title={dict.auth.loginTitle} subtitle={dict.auth.loginSubtitle}>
      <Suspense>
        <LoginForm locale={locale} dict={dict} />
      </Suspense>
      <p className="mt-6 text-center text-sm text-navy-500">
        {dict.auth.noAccount}{" "}
        <Link href={withLocale(locale, "/register")} className="font-semibold text-navy-800 underline">
          {dict.nav.register}
        </Link>
      </p>
    </AuthShell>
  );
}
