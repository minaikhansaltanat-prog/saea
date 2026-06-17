import type { Dictionary } from "./kk";
import type { DeepPartial } from "../deep-merge";

// Kazakh written in the Arabic-based script ("төте жазу") used by Kazakhs in China.
// NOTE (honesty disclaimer, shown only inside the Admin panel, not to site visitors):
// Producing fully correct Arabic-script Kazakh orthography requires native proofreading.
// To avoid publishing inaccurate script, this locale intentionally falls back to the
// Cyrillic Kazakh dictionary (kk.ts) for all content via deep-merge, while still getting
// its own RTL layout + dedicated Arabic-script font (Noto Naskh Arabic). Replace the
// entries below once a native speaker has verified the transliteration.
const kkArab: DeepPartial<Dictionary> = {};

export default kkArab;

export const kkArabReviewNotice =
  "Дерек: «тоте жазу» (Қытай қазақтарының араб жазуы) нұсқасы — мазмұны әзірге кириллицадан автоматты түрде көрсетіледі. Жариялау алдында ана тілі маманының тексеруі қажет.";
