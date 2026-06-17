import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons/brand-icons";
import { Container } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";
import { mainNavItems } from "@/lib/nav";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { ServiceDirection, SiteSettings } from "@/lib/db/types";
import { pickText } from "@/lib/i18n/pick-text";

export function SiteFooter({
  locale,
  dict,
  services,
  settings,
}: {
  locale: string;
  dict: Dictionary;
  services: ServiceDirection[];
  settings: SiteSettings;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white/80">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Link href={withLocale(locale, "/")} className="mb-5 flex items-center gap-2.5">
            <span className="relative block h-10 w-10">
              <Image src="/images/brand/logo-transparent-512.png" alt="CAEA" fill className="object-contain" />
            </span>
            <span className="font-heading text-xl font-extrabold text-white">CAEA</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">{dict.footer.about}</p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: FacebookIcon, href: settings.socials.facebook },
              { Icon: InstagramIcon, href: settings.socials.instagram },
              { Icon: LinkedinIcon, href: settings.socials.linkedin },
              { Icon: YoutubeIcon, href: settings.socials.youtube },
            ]
              .filter(({ href }) => href)
              .map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-gold-500 hover:text-navy-900"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-gold-400">
            {dict.footer.quickLinks}
          </h4>
          <ul className="space-y-2.5 text-sm">
            {mainNavItems.map((item) => (
              <li key={item.key}>
                <Link href={withLocale(locale, item.href)} className="text-white/65 transition-colors hover:text-gold-300">
                  {dict.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-gold-400">
            {dict.footer.servicesTitle}
          </h4>
          <ul className="space-y-2.5 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.id}>
                <Link
                  href={withLocale(locale, `/services/${s.slug}`)}
                  className="text-white/65 transition-colors hover:text-gold-300"
                >
                  {pickText(s.title, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-gold-400">
            {dict.footer.contactsTitle}
          </h4>
          <ul className="space-y-3 text-sm text-white/65">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {settings.contact.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold-400" /> {settings.contact.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold-400" /> {settings.contact.email}
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-gold-400" /> {dict.footer.workingHours}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          <LegalItem label={dict.footer.legalName} value={dict.footer.legalNameValue} />
          <LegalItem label={dict.footer.bin} value={dict.footer.binValue} />
          <LegalItem label={dict.footer.address} value={dict.footer.addressValue} />
          <LegalItem label={dict.footer.registeredDate} value={dict.footer.registeredDateValue} />
        </Container>
      </div>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/45 sm:flex-row">
          <span>
            © {year} CAEA — Central Asia Entrepreneurs Association. {dict.footer.rights}
          </span>
          <span>{dict.meta.tagline}</span>
        </Container>
      </div>
    </footer>
  );
}

function LegalItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-white/40">{label}</div>
      <div className="mt-1 text-sm text-white/75">{value}</div>
    </div>
  );
}
