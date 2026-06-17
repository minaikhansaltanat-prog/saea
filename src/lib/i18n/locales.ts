export const locales = [
  { code: "kk", label: "Қазақша", short: "ҚАЗ", dir: "ltr" as const },
  { code: "ru", label: "Русский", short: "РУС", dir: "ltr" as const },
  { code: "en", label: "English", short: "ENG", dir: "ltr" as const },
  { code: "zh", label: "中文", short: "中文", dir: "ltr" as const },
  { code: "uz", label: "O'zbekcha", short: "O'Z", dir: "ltr" as const },
  { code: "ky", label: "Кыргызча", short: "КЫР", dir: "ltr" as const },
  { code: "tr", label: "Türkçe", short: "TÜR", dir: "ltr" as const },
  { code: "kk-arab", label: "تٶتە قازاقشا", short: "تٶتە", dir: "rtl" as const },
] as const;

export type LocaleCode = (typeof locales)[number]["code"];

export const defaultLocale: LocaleCode = "kk";

export const localeCodes = locales.map((l) => l.code) as LocaleCode[];

export function isLocale(value: string): value is LocaleCode {
  return localeCodes.includes(value as LocaleCode);
}

export function getLocaleMeta(code: string) {
  return locales.find((l) => l.code === code) ?? locales[0];
}
