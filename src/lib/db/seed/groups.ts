export interface PartnerGroupRule {
  id: string;
  name: string;
  description: string;
  channel: "telegram" | "whatsapp";
  match: (p: {
    country: string;
    companyType: string;
    industries: string[];
    tariffInterest?: string;
    directions: string[];
  }) => boolean;
}

export const partnerGroupRules: PartnerGroupRule[] = [
  {
    id: "grp_manufacturers_kz",
    name: "ОАКҚ | Өндірушілер KZ",
    description: "Ел = KZ + Тип = Өндіруші",
    channel: "telegram",
    match: (p) => p.country === "KZ" && p.companyType === "manufacturer",
  },
  {
    id: "grp_manufacturers_uz",
    name: "ОАКҚ | Өндірушілер UZ",
    description: "Ел = UZ + Тип = Өндіруші",
    channel: "telegram",
    match: (p) => p.country === "UZ" && p.companyType === "manufacturer",
  },
  {
    id: "grp_traders_ca",
    name: "ОАКҚ | Саудагерлер CA",
    description: "Тип = Сатушы (кез келген ел)",
    channel: "telegram",
    match: (p) => p.companyType === "seller",
  },
  {
    id: "grp_investors",
    name: "ОАКҚ | Инвесторлар",
    description: "Тип = Инвестор",
    channel: "telegram",
    match: (p) => p.companyType === "investor",
  },
  {
    id: "grp_it_digital",
    name: "ОАКҚ | IT & Digital",
    description: "Сала = IT / Tech / Digital",
    channel: "telegram",
    match: (p) => p.industries.some((i) => ["it", "tech", "digital"].includes(i)),
  },
  {
    id: "grp_agro",
    name: "ОАКҚ | Агро & Өнімдер",
    description: "Сала = Агро / Food",
    channel: "whatsapp",
    match: (p) => p.industries.some((i) => ["agro", "food"].includes(i)),
  },
  {
    id: "grp_logistics",
    name: "ОАКҚ | Логистика",
    description: "Сала = Логистика / Кеден",
    channel: "whatsapp",
    match: (p) => p.industries.some((i) => ["logistics", "customs"].includes(i)),
  },
  {
    id: "grp_export_club",
    name: "ОАКҚ | Экспорт Клуб",
    description: "Тариф = PREMIUM+ және Бағыт = Экспорт",
    channel: "telegram",
    match: (p) =>
      ["PREMIUM", "PLATINUM"].includes(p.tariffInterest ?? "") && p.directions.includes("export-import"),
  },
  {
    id: "grp_general",
    name: "ОАКҚ | Жалпы",
    description: "Барлық бекітілген серіктестер",
    channel: "telegram",
    match: () => true,
  },
];

export function resolveGroupsFor(p: {
  country: string;
  companyType: string;
  industries: string[];
  tariffInterest?: string;
  directions: string[];
}): string[] {
  return partnerGroupRules.filter((rule) => rule.match(p)).map((rule) => rule.name);
}
