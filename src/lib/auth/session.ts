// Server Component / Route Handler only (uses next/headers). Do not import from
// client components or middleware — use tokens.ts directly there instead.
import { cookies } from "next/headers";
import { SESSION_COOKIE, readSessionToken } from "./tokens";
import type { SessionPayload } from "./roles";

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return readSessionToken(token);
}

export { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, AUTH_SECRET, createSessionToken, readSessionToken } from "./tokens";
export { isAdminRole, ADMIN_ROLES, ROLE_LABELS } from "./roles";
export type { Role, SessionPayload } from "./roles";
