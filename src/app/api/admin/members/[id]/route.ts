import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/lib/db/collections";
import { requireRole } from "@/lib/auth/guard";
import { logAudit, notify } from "@/lib/audit";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireRole(["super_admin", "membership_admin"]);
  if ("error" in guard) return guard.error;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Жарамсыз сұрау" }, { status: 400 });

  const allowed: Record<string, unknown> = {};
  for (const key of ["status", "tariff", "profileCompleteness", "rating"] as const) {
    if (body[key] !== undefined) allowed[key] = body[key];
  }

  const updated = await Users.update(id, allowed);
  if (!updated) return NextResponse.json({ error: "Мүше табылмады" }, { status: 404 });

  await logAudit(
    { id: guard.session.sub, name: guard.session.fullName },
    "member_updated",
    updated.fullName,
    JSON.stringify(allowed)
  );
  await notify("member_status_changed", `${updated.fullName}: ${JSON.stringify(allowed)}`, "member", "email", updated.id);

  return NextResponse.json({ ok: true, user: updated });
}
