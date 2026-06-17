import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LoginForm } from "@/components/forms/login-form";

export default async function AdminLoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-navy-950 px-5 py-14">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900">
            <ShieldCheck className="h-7 w-7 text-gold-400" />
          </div>
          <h1 className="mt-4 font-heading text-xl font-extrabold text-navy-900">{dict.admin.welcomeAdmin}</h1>
          <p className="mt-1 text-sm text-navy-500">Super Admin / RBAC рөлдер кірісі</p>
        </div>
        <Suspense>
          <LoginForm locale={locale} dict={dict} isAdmin />
        </Suspense>
      </div>
    </div>
  );
}
