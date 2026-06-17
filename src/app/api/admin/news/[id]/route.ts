import { NextRequest, NextResponse } from "next/server";
import { News } from "@/lib/db/collections";
import { requireRole } from "@/lib/auth/guard";
import { logAudit } from "@/lib/audit";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireRole(["super_admin", "content_admin"]);
  if ("error" in guard) return guard.error;
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const updated = await News.update(id, body ?? {});
  if (!updated) return NextResponse.json({ error: "Табылмады" }, { status: 404 });
  await logAudit({ id: guard.session.sub, name: guard.session.fullName }, "news_updated", updated.slug);
  return NextResponse.json({ ok: true, article: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireRole(["super_admin", "content_admin"]);
  if ("error" in guard) return guard.error;
  const { id } = await params;
  const ok = await News.remove(id);
  await logAudit({ id: guard.session.sub, name: guard.session.fullName }, "news_deleted", id);
  return NextResponse.json({ ok });
}
