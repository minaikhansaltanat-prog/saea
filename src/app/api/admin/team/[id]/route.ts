import { NextRequest, NextResponse } from "next/server";
import { Team } from "@/lib/db/collections";
import { requireRole } from "@/lib/auth/guard";
import { logAudit } from "@/lib/audit";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireRole(["super_admin", "content_admin"]);
  if ("error" in guard) return guard.error;
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const updated = await Team.update(id, body ?? {});
  if (!updated) return NextResponse.json({ error: "Табылмады" }, { status: 404 });
  await logAudit({ id: guard.session.sub, name: guard.session.fullName }, "team_member_updated", updated.name);
  return NextResponse.json({ ok: true, member: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireRole(["super_admin", "content_admin"]);
  if ("error" in guard) return guard.error;
  const { id } = await params;
  const ok = await Team.remove(id);
  await logAudit({ id: guard.session.sub, name: guard.session.fullName }, "team_member_deleted", id);
  return NextResponse.json({ ok });
}
