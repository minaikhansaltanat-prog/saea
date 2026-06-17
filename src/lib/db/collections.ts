import { collection, singleton } from "./store";
import type {
  User,
  PartnerApplication,
  ServiceDirection,
  TariffPlan,
  TeamMember,
  NewsArticle,
  EventItem,
  Testimonial,
  Tender,
  Inquiry,
  AuditLogEntry,
  NotificationEntry,
  SiteSettings,
  ContactMessage,
} from "./types";
import { servicesSeed } from "./seed/services";
import { tariffsSeed } from "./seed/tariffs";
import { teamSeed } from "./seed/team";
import { newsSeed } from "./seed/news";
import { eventsSeed } from "./seed/events";
import { testimonialsSeed } from "./seed/testimonials";
import { tendersSeed } from "./seed/tenders";
import { usersSeed } from "./seed/users";
import { partnersSeed } from "./seed/partners";
import { siteSettingsSeed } from "./seed/site-settings";

export const Users = collection<User>("users", usersSeed);
export const Partners = collection<PartnerApplication>("partners", partnersSeed);
export const Services = collection<ServiceDirection>("services", servicesSeed);
export const Tariffs = collection<TariffPlan>("tariffs", tariffsSeed);
export const Team = collection<TeamMember>("team", teamSeed);
export const News = collection<NewsArticle>("news", newsSeed);
export const Events = collection<EventItem>("events", eventsSeed);
export const Testimonials = collection<Testimonial>("testimonials", testimonialsSeed);
export const Tenders = collection<Tender>("tenders", tendersSeed);
export const Inquiries = collection<Inquiry>("inquiries", []);
export const ContactMessages = collection<ContactMessage>("contact-messages", []);
export const AuditLog = collection<AuditLogEntry>("audit-log", []);
export const Notifications = collection<NotificationEntry>("notifications", []);
export const SiteSettingsStore = singleton<SiteSettings>("site-settings", siteSettingsSeed);

export { genId } from "./store";
