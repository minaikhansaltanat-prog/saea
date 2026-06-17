// Server/Edge-only token helpers (no next/headers import) — safe to use from both
// middleware (Edge runtime) and Route Handlers/Server Components (Node runtime).
// NEVER import this module from a "use client" file: it embeds AUTH_SECRET.
import { signToken, verifyToken } from "./crypto";
import type { SessionPayload } from "./roles";

export const SESSION_COOKIE = "caea_token";
export const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days
export const AUTH_SECRET = process.env.AUTH_SECRET || "caea-dev-secret-change-me-in-production";

export async function createSessionToken(payload: Omit<SessionPayload, "exp">): Promise<string> {
  const exp = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  return signToken({ ...payload, exp }, AUTH_SECRET);
}

export async function readSessionToken(token: string | undefined | null): Promise<SessionPayload | null> {
  if (!token) return null;
  return verifyToken<SessionPayload>(token, AUTH_SECRET);
}
