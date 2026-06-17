import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/lib/db/collections";
import { getSession } from "@/lib/auth/session";

const EDITABLE_FIELDS = ["companyName", "phone", "country", "industry", "bio", "website", "linkedin"] as const;

function computeCompleteness(user: Record<string, unknown>): number {
  const fields = ["fullName", "companyName", "phone", "country", "industry", "bio", "website"];
  const filled = fields.filter((f) => Boolean(user[f])).length;
  return Math.round((filled / fields.length) * 100);
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Кіру қажет" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Жарамсыз сұрау" }, { status: 400 });

  const patch: Record<string, unknown> = {};
  for (const field of EDITABLE_FIELDS) {
    if (body[field] !== undefined) patch[field] = body[field];
  }

  const current = await Users.find((u) => u.id === session.sub);
  if (!current) return NextResponse.json({ error: "Мүше табылмады" }, { status: 404 });

  const merged = { ...current, ...patch };
  const completeness = computeCompleteness(merged);
  patch.profileCompleteness = completeness;
  if (completeness >= 50 && current.status === "new") {
    patch.status = "active";
  }

  const updated = await Users.update(session.sub, patch);
  return NextResponse.json({ ok: true, user: updated });
}
