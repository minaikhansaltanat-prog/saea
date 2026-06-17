"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, BadgeCheck, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import { withLocale } from "@/lib/i18n/path";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { PartnerApplication } from "@/lib/db/types";

const COUNTRY_LABEL: Record<string, string> = {
  KZ: "Қазақстан",
  UZ: "Өзбекстан",
  KG: "Қырғызстан",
  TJ: "Тәжікстан",
  TM: "Түрікменстан",
  INTL: "Халықаралық",
};

const TYPE_LABEL: Record<string, string> = {
  manufacturer: "Өндіруші",
  seller: "Сатушы",
  service: "Қызмет көрсетуші",
  investor: "Инвестор",
};

export function CatalogBrowser({
  locale,
  dict,
  partners,
}: {
  locale: string;
  dict: Dictionary;
  partners: PartnerApplication[];
}) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");

  const countries = useMemo(() => Array.from(new Set(partners.map((p) => p.country))), [partners]);

  const filtered = partners.filter((p) => {
    if (country && p.country !== country) return false;
    if (type && p.companyType !== type) return false;
    if (query) {
      const q = query.toLowerCase();
      const haystack = `${p.companyName} ${p.industries.join(" ")} ${p.goal}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-2xl border border-navy-100 bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.catalog.searchPlaceholder}
            className="w-full rounded-xl border border-navy-100 bg-navy-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gold-500"
          />
        </div>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="rounded-xl border border-navy-100 bg-navy-50 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
        >
          <option value="">{dict.catalog.filterCountry}</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {COUNTRY_LABEL[c] ?? c}
            </option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl border border-navy-100 bg-navy-50 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
        >
          <option value="">{dict.catalog.filterType}</option>
          {Object.entries(TYPE_LABEL).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 text-sm text-navy-500">
        {filtered.length} {dict.catalog.resultsCount}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Link
            key={p.id}
            href={withLocale(locale, `/catalog/${p.id}`)}
            className="group rounded-2xl border border-navy-100 bg-white p-6 transition-shadow hover:shadow-card"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-sm font-bold text-white">
                {p.companyName.charAt(0)}
              </div>
              <ArrowUpRight className="h-4 w-4 text-navy-300 group-hover:text-gold-500" />
            </div>
            <h3 className="mt-4 font-heading text-base font-bold text-navy-900">{p.companyName}</h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-navy-500">
              <MapPin className="h-3.5 w-3.5" /> {COUNTRY_LABEL[p.country] ?? p.country}
              {p.city ? `, ${p.city}` : ""}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge tone="neutral">{TYPE_LABEL[p.companyType]}</Badge>
              {p.verification !== "basic" && (
                <Badge tone={p.verification === "gold" ? "gold" : "teal"}>
                  <BadgeCheck className="h-3 w-3" />
                  {p.verification === "gold" ? dict.catalog.goldBadge : dict.catalog.verifiedBadge}
                </Badge>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && <div className="mt-10 text-center text-sm text-navy-400">{dict.catalog.noResults}</div>}
    </div>
  );
}

export { COUNTRY_LABEL, TYPE_LABEL };
