import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/lib/db/collections";
import { getSession } from "@/lib/auth/session";
import { notify } from "@/lib/audit";
import type { Tariff } from "@/lib/db/types";

const VALID: Tariff[] = ["START", "STANDART", "PREMIUM", "PLATINUM", "ACADEMY"];

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Кіру қажет" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.tariff || !VALID.includes(body.tariff)) {
    return NextResponse.json({ error: "Жарамсыз тариф" }, { status: 400 });
  }

  const user = await Users.update(session.sub, { tariff: body.tariff, status: "active" });
  await notify("tariff_payment_success", `${user?.fullName} ${body.tariff} тарифіне жаңартты (демо төлем)`, "finance_admin", "email", session.sub);

  return NextResponse.json({ ok: true, user });
}
