import { notFound } from "next/navigation";
import { MapPin, Globe, Mail, Phone, BadgeCheck } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Partners } from "@/lib/db/collections";
import { Container, Badge, Button } from "@/components/ui/primitives";
import { COUNTRY_LABEL, TYPE_LABEL } from "@/components/catalog/catalog-browser";

export default async function CatalogDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const dict = getDictionary(locale);
  const partner = await Partners.find((p) => p.id === id);
  if (!partner || (partner.status !== "approved" && partner.status !== "auto_approved")) notFound();

  return (
    <section className="section-py bg-white">
      <Container className="max-w-3xl">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy-800 text-xl font-bold text-white">
            {partner.companyName.charAt(0)}
          </div>
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-navy-900 sm:text-3xl">{partner.companyName}</h1>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-navy-500">
              <MapPin className="h-4 w-4" /> {COUNTRY_LABEL[partner.country] ?? partner.country}
              {partner.city ? `, ${partner.city}` : ""}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="neutral">{TYPE_LABEL[partner.companyType]}</Badge>
              {partner.verification !== "basic" && (
                <Badge tone={partner.verification === "gold" ? "gold" : "teal"}>
                  <BadgeCheck className="h-3 w-3" />
                  {partner.verification === "gold" ? dict.catalog.goldBadge : dict.catalog.verifiedBadge}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-navy-50 p-6">
            <h3 className="font-heading text-sm font-bold text-navy-900">Ынтымақтастық мақсаты</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">{partner.goal}</p>
          </div>
          <div className="space-y-3 rounded-2xl border border-navy-100 p-6">
            {partner.website && (
              <div className="flex items-center gap-2.5 text-sm text-navy-600">
                <Globe className="h-4 w-4 text-navy-400" /> {partner.website}
              </div>
            )}
            <div className="flex items-center gap-2.5 text-sm text-navy-600">
              <Mail className="h-4 w-4 text-navy-400" /> {partner.email}
            </div>
            <div className="flex items-center gap-2.5 text-sm text-navy-600">
              <Phone className="h-4 w-4 text-navy-400" /> {partner.whatsapp}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-navy-900 p-6 text-center">
          <p className="text-sm text-white/70">Бұл серіктеспен байланысу үшін жеке кабинетке кіруіңіз қажет.</p>
          <Button className="mt-4">{dict.common.contactUs}</Button>
        </div>
      </Container>
    </section>
  );
}
