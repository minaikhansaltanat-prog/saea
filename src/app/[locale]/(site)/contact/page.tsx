import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteSettingsStore } from "@/lib/db/collections";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/primitives";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const settings = await SiteSettingsStore.get();

  return (
    <>
      <PageHero eyebrow={dict.contact.pageEyebrow} title={dict.contact.pageTitle} subtitle={dict.contact.pageSubtitle} />

      <section className="section-py bg-white">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="space-y-5">
              <InfoRow icon={MapPin} label={dict.contact.addressTitle} value={settings.contact.address} />
              <InfoRow icon={Phone} label={dict.contact.phoneTitle} value={settings.contact.phone} />
              <InfoRow icon={Mail} label={dict.contact.emailTitle} value={settings.contact.email} />
              <InfoRow icon={Clock} label={dict.contact.hoursTitle} value={dict.footer.workingHours} />
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100">
              <iframe
                title={dict.contact.mapTitle}
                src={settings.contact.mapEmbedUrl}
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-navy-100 p-7 sm:p-9">
            <ContactForm dict={dict} />
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-navy-50 p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-navy-700 shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="text-xs font-bold uppercase tracking-wide text-navy-400">{label}</div>
        <div className="mt-0.5 text-sm font-medium text-navy-800">{value}</div>
      </div>
    </div>
  );
}
