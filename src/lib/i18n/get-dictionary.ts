import kk, { type Dictionary } from "./dictionaries/kk";
import ru from "./dictionaries/ru";
import en from "./dictionaries/en";
import zh from "./dictionaries/zh";
import uz from "./dictionaries/uz";
import ky from "./dictionaries/ky";
import tr from "./dictionaries/tr";
import kkArab from "./dictionaries/kk-arab";
import { deepMerge, type DeepPartial } from "./deep-merge";
import { defaultLocale, type LocaleCode } from "./locales";

const fullDictionaries: Record<string, Dictionary> = { kk, ru, en };
const partialDictionaries: Record<string, DeepPartial<Dictionary>> = {
  zh,
  uz,
  ky,
  tr,
  "kk-arab": kkArab,
};

export function getDictionary(locale: string): Dictionary {
  if (fullDictionaries[locale]) return fullDictionaries[locale];
  if (partialDictionaries[locale]) return deepMerge(kk, partialDictionaries[locale]);
  return fullDictionaries[defaultLocale];
}

export type { Dictionary };
export type { LocaleCode };
