import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/lib/db/collections";
import { requireRole } from "@/lib/auth/guard";
import { ADMIN_ROLES, type Role } from "@/lib/auth/roles";
import { logAudit } from "@/lib/audit";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireRole(["super_admin"]);
  if ("error" in guard) return guard.error;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const role = body?.role as Role | undefined;
  if (!role || !ADMIN_ROLES.includes(role)) return NextResponse.json({ error: "Жарамсыз рөл" }, { status: 400 });

  const target = await Users.find((u) => u.id === id);
  if (!target || target.role === "member") return NextResponse.json({ error: "Қызметкер табылмады" }, { status: 404 });

  const updated = await Users.update(id, { role });
  await logAudit({ id: guard.session.sub, name: guard.session.fullName }, "staff_role_changed", target.fullName, role);
  return NextResponse.json({ ok: true, user: updated });
}
