import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getSession } from "@/lib/auth/session";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MessengerFab } from "@/components/layout/messenger-fab";
import { Services, SiteSettingsStore } from "@/lib/db/collections";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [session, services, settings] = await Promise.all([
    getSession(),
    Services.all(),
    SiteSettingsStore.get(),
  ]);

  return (
    <>
      <SiteHeader locale={locale} dict={dict} session={session} contact={settings.contact} />
      <main>{children}</main>
      <SiteFooter locale={locale} dict={dict} services={services} settings={settings} />
      <MessengerFab messengers={settings.messengers} />
    </>
  );
}
