import { NextResponse } from "next/server";
import { getSession } from "./session";
import type { Role, SessionPayload } from "./roles";

export async function requireRole(roles: Role[]): Promise<{ session: SessionPayload } | { error: NextResponse }> {
  const session = await getSession();
  if (!session || !roles.includes(session.role)) {
    return { error: NextResponse.json({ error: "Рұқсат жоқ" }, { status: 403 }) };
  }
  return { session };
}

export const ALL_ADMIN_ROLES: Role[] = [
  "super_admin",
  "content_admin",
  "membership_admin",
  "partner_admin",
  "finance_admin",
  "analytics_viewer",
  "support_agent",
];
