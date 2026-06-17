import type { LocaleText } from "../i18n/pick-text";
import type { Role } from "../auth/session";

export type Tariff = "START" | "STANDART" | "PREMIUM" | "PLATINUM" | "ACADEMY";

export type MemberStatus =
  | "new"
  | "active"
  | "verified"
  | "gold"
  | "featured"
  | "suspended"
  | "banned";

export interface User {
  id: string;
  role: Role;
  email: string;
  passwordHash: string;
  fullName: string;
  companyName?: string;
  phone?: string;
  country?: string;
  industry?: string;
  tariff: Tariff;
  status: MemberStatus;
  profileCompleteness: number; // 0-100
  rating: number; // 0-5
  verifiedConnections: number;
  createdAt: string;
  lastLoginAt?: string;
  avatar?: string;
  bio?: string;
  website?: string;
  linkedin?: string;
  bookmarkedTenderIds?: string[];
}

export type PartnerStatus = "auto_approved" | "pending_review" | "needs_docs" | "approved" | "rejected";

export interface PartnerApplication {
  id: string;
  companyName: string;
  country: string;
  city?: string;
  industries: string[];
  companyType: "manufacturer" | "seller" | "service" | "investor";
  regNumber: string;
  website?: string;
  contactName: string;
  position: string;
  email: string;
  whatsapp: string;
  telegram?: string;
  goal: string;
  directions: string[];
  wantsMembership: boolean;
  tariffInterest?: Tariff;
  referralCode?: string;
  presentationFileName?: string;
  score: number;
  status: PartnerStatus;
  groups: string[];
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  verification: "basic" | "verified" | "gold";
}

export interface ServiceDirection {
  id: string;
  slug: string;
  icon: string;
  title: LocaleText;
  summary: LocaleText;
  body: LocaleText;
  cover: string;
  stats?: { label: LocaleText; value: string }[];
}

export interface TariffPlan {
  id: string;
  code: Tariff;
  name: string;
  priceMonth: number | null;
  priceYear: number | null;
  highlight: boolean;
  description: LocaleText;
  features: { label: LocaleText; included: boolean | string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  position: LocaleText;
  bio: LocaleText;
  photo: string;
  linkedin?: string;
  email?: string;
  order: number;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: LocaleText;
  excerpt: LocaleText;
  body: LocaleText;
  cover: string;
  category: string;
  author: string;
  publishedAt: string;
  status: "draft" | "published";
  minutesToRead: number;
}

export interface EventItem {
  id: string;
  slug: string;
  title: LocaleText;
  description: LocaleText;
  date: string;
  format: "online" | "offline";
  location?: string;
  cover: string;
  participantsCount: number;
  capacity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: LocaleText;
  rating: number;
  photo?: string;
}

export interface Tender {
  id: string;
  title: string;
  organization: string;
  amount: number;
  currency: string;
  deadline: string;
  industry: string;
  country: string;
  source: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  fromName: string;
  fromEmail: string;
  fromCompany?: string;
  toMemberId: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "declined";
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  target: string;
  meta?: string;
  createdAt: string;
}

export interface NotificationEntry {
  id: string;
  type: string;
  message: string;
  recipientRole: Role | "member";
  channel: "email" | "telegram" | "sms" | "whatsapp" | "system";
  relatedId?: string;
  createdAt: string;
  read: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  heroStats: { trustedBy: number; projects: number; successRate: number; experience: number };
  contact: { phone: string; email: string; address: string; mapEmbedUrl: string };
  socials: { facebook?: string; instagram?: string; linkedin?: string; youtube?: string };
  messengers: { whatsapp: string; telegram: string; wechat: string };
  integrations: Record<
    string,
    { label: string; connected: boolean; keyMasked?: string }
  >;
  ga4Id?: string;
}
