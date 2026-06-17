import { NextRequest, NextResponse } from "next/server";
import { SiteSettingsStore } from "@/lib/db/collections";
import { requireRole } from "@/lib/auth/guard";
import { logAudit } from "@/lib/audit";

export async function PATCH(req: NextRequest) {
  const guard = await requireRole(["super_admin"]);
  if ("error" in guard) return guard.error;

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Жарамсыз сұрау" }, { status: 400 });

  const updated = await SiteSettingsStore.patch(body);
  await logAudit({ id: guard.session.sub, name: guard.session.fullName }, "site_settings_updated", Object.keys(body).join(", "));
  return NextResponse.json({ ok: true, settings: updated });
}
