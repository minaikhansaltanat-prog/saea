export type LocaleText = Partial<Record<string, string>>;

/** Resolve a localized text field with a sensible fallback chain. */
export function pickText(text: LocaleText | undefined, locale: string): string {
  if (!text) return "";
  if (text[locale]) return text[locale] as string;
  for (const fallback of ["en", "kk", "ru"]) {
    if (text[fallback]) return text[fallback] as string;
  }
  const first = Object.values(text).find(Boolean);
  return first ?? "";
}
