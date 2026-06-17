import { Suspense } from "react";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Tariffs } from "@/lib/db/collections";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/forms/register-form";
import { withLocale } from "@/lib/i18n/path";

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const tariffs = await Tariffs.all();

  return (
    <AuthShell
      locale={locale}
      title={dict.auth.registerTitle}
      subtitle={dict.auth.registerSubtitle}
      tabs={
        <div className="grid grid-cols-2 gap-2 rounded-full bg-navy-50 p-1">
          <span className="rounded-full bg-white px-4 py-2 text-center text-sm font-bold text-navy-900 shadow-sm">
            {dict.auth.memberTab}
          </span>
          <Link
            href={withLocale(locale, "/partner/register")}
            className="rounded-full px-4 py-2 text-center text-sm font-semibold text-navy-500"
          >
            {dict.auth.partnerTab}
          </Link>
        </div>
      }
    >
      <Suspense>
        <RegisterForm locale={locale} dict={dict} tariffs={tariffs} />
      </Suspense>
    </AuthShell>
  );
}
