import type { MemberStatus } from "./db/types";

export const STATUS_LABELS: Record<MemberStatus, string> = {
  new: "Жаңа",
  active: "Белсенді",
  verified: "Верифицирленген",
  gold: "Жоғары сенімді",
  featured: "Ұсынылатын",
  suspended: "Тоқтатылған",
  banned: "Блокталған",
};

export const STATUS_TONE: Record<MemberStatus, "neutral" | "success" | "warning" | "danger" | "gold" | "teal"> = {
  new: "neutral",
  active: "success",
  verified: "teal",
  gold: "gold",
  featured: "gold",
  suspended: "warning",
  banned: "danger",
};
