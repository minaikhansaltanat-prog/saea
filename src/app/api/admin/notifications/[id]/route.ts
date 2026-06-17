import { NextRequest, NextResponse } from "next/server";
import { Notifications } from "@/lib/db/collections";
import { requireRole, ALL_ADMIN_ROLES } from "@/lib/auth/guard";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireRole(ALL_ADMIN_ROLES);
  if ("error" in guard) return guard.error;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const updated = await Notifications.update(id, { read: body?.read !== false });
  if (!updated) return NextResponse.json({ error: "Табылмады" }, { status: 404 });
  return NextResponse.json({ ok: true, notification: updated });
}
