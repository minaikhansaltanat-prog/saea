export interface ScoringInput {
  country: string;
  regNumber: string;
  industries: string[];
  goal: string;
  website?: string;
  telegram?: string;
  presentationFileName?: string;
  referralCode?: string;
}

const REG_NUMBER_PATTERNS: Record<string, RegExp> = {
  KZ: /^\d{12}$/,
  UZ: /^\d{9}$/,
  KG: /^\d{14}$/,
  TJ: /^\d{9}$/,
  TM: /^[A-Za-z0-9-]{6,20}$/,
  INTL: /^.{5,}$/,
};

export function isValidRegNumber(country: string, regNumber: string): boolean {
  const pattern = REG_NUMBER_PATTERNS[country] ?? REG_NUMBER_PATTERNS.INTL;
  return pattern.test(regNumber.trim());
}

export interface ScoringResult {
  score: number;
  breakdown: { label: string; points: number; max: number }[];
  status: "auto_approved" | "pending_review" | "needs_docs";
}

/** Implements the ТЗ §9.2 auto-scoring pipeline: 80+ auto-approve, 50-79 manual review, <50 request docs. */
export function scorePartnerApplication(input: ScoringInput): ScoringResult {
  const breakdown: { label: string; points: number; max: number }[] = [];

  const requiredComplete = Boolean(input.country && input.regNumber && input.industries.length && input.goal);
  breakdown.push({ label: "Міндетті өрістер толтырылды", points: requiredComplete ? 35 : 0, max: 35 });

  const validReg = isValidRegNumber(input.country, input.regNumber);
  breakdown.push({ label: "БСН/ИНН форматы дұрыс", points: validReg ? 20 : 0, max: 20 });

  breakdown.push({ label: "Бизнес саласы көрсетілген", points: input.industries.length ? 5 : 0, max: 5 });

  const detailedGoal = (input.goal ?? "").trim().length >= 60;
  breakdown.push({ label: "Мақсат сипаттамасы толық (60+ символ)", points: detailedGoal ? 10 : 0, max: 10 });

  breakdown.push({ label: "Сайт/LinkedIn көрсетілген", points: input.website ? 10 : 0, max: 10 });
  breakdown.push({ label: "Telegram көрсетілген", points: input.telegram ? 5 : 0, max: 5 });
  breakdown.push({ label: "Компания презентациясы жүктелген", points: input.presentationFileName ? 10 : 0, max: 10 });
  breakdown.push({ label: "Ұсынушы мүше коды бар", points: input.referralCode ? 5 : 0, max: 5 });

  const score = Math.min(100, breakdown.reduce((sum, b) => sum + b.points, 0));

  const status: ScoringResult["status"] = score >= 80 ? "auto_approved" : score >= 50 ? "pending_review" : "needs_docs";

  return { score, breakdown, status };
}
