import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/lib/db/collections";
import { verifyPassword } from "@/lib/auth/crypto";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/auth/tokens";
import { isAdminRole } from "@/lib/auth/roles";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { email, password } = body ?? {};
  if (!email || !password) {
    return NextResponse.json({ error: "Email және құпия сөзді енгізіңіз" }, { status: 400 });
  }

  const user = await Users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  if (!user || !(await verifyPassword(String(password), user.passwordHash))) {
    return NextResponse.json({ error: "Email немесе құпия сөз қате" }, { status: 401 });
  }

  if (user.status === "banned") {
    return NextResponse.json({ error: "Бұл тіркелгі бұғатталған" }, { status: 403 });
  }

  await Users.update(user.id, { lastLoginAt: new Date().toISOString() });

  const token = await createSessionToken({ sub: user.id, role: user.role, email: user.email, fullName: user.fullName });

  const res = NextResponse.json({ ok: true, role: user.role, isAdmin: isAdminRole(user.role) });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
  return res;
}
