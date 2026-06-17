// Client-safe role/session types (no next/headers import) so client components can
// use them without pulling server-only code into the browser bundle.
export type Role =
  | "member"
  | "super_admin"
  | "content_admin"
  | "membership_admin"
  | "partner_admin"
  | "finance_admin"
  | "analytics_viewer"
  | "support_agent";

export const ADMIN_ROLES: Role[] = [
  "super_admin",
  "content_admin",
  "membership_admin",
  "partner_admin",
  "finance_admin",
  "analytics_viewer",
  "support_agent",
];

export interface SessionPayload {
  sub: string;
  role: Role;
  email: string;
  fullName: string;
  exp: number;
}

export function isAdminRole(role: Role): boolean {
  return ADMIN_ROLES.includes(role);
}

export const ROLE_LABELS: Record<Role, string> = {
  member: "Мүше",
  super_admin: "Super Admin",
  content_admin: "Content Admin",
  membership_admin: "Membership Admin",
  partner_admin: "Partner Admin",
  finance_admin: "Finance Admin",
  analytics_viewer: "Analytics Viewer",
  support_agent: "Support Agent",
};
