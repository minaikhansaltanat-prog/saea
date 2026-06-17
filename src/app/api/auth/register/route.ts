import { NextRequest, NextResponse } from "next/server";
import { Users, genId } from "@/lib/db/collections";
import { hashPassword } from "@/lib/auth/crypto";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/auth/tokens";
import { notify } from "@/lib/audit";
import type { Tariff } from "@/lib/db/types";

const VALID_TARIFFS: Tariff[] = ["START", "STANDART", "PREMIUM", "PLATINUM", "ACADEMY"];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { fullName, email, password, companyName, tariff } = body ?? {};

  if (!fullName || !email || !password || String(password).length < 8) {
    return NextResponse.json({ error: "Барлық міндетті өрістерді толтырыңыз (құпия сөз 8+ символ)" }, { status: 400 });
  }

  const existing = await Users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  if (existing) {
    return NextResponse.json({ error: "Бұл email бойынша тіркелгі бар" }, { status: 409 });
  }

  const passwordHash = await hashPassword(String(password));
  const safeTariff: Tariff = VALID_TARIFFS.includes(tariff) ? tariff : "START";

  const user = await Users.insert({
    id: genId("user"),
    role: "member",
    email: String(email).toLowerCase(),
    passwordHash,
    fullName: String(fullName),
    companyName: companyName ? String(companyName) : undefined,
    tariff: safeTariff,
    status: "new",
    profileCompleteness: companyName ? 35 : 20,
    rating: 0,
    verifiedConnections: 0,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  });

  await notify("member_registered", `Жаңа мүше тіркелді: ${user.fullName}`, "membership_admin", "email", user.id);

  const token = await createSessionToken({ sub: user.id, role: user.role, email: user.email, fullName: user.fullName });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
  return res;
}
