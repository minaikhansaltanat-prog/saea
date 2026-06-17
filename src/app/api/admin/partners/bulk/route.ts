import { NextRequest, NextResponse } from "next/server";
import { Partners } from "@/lib/db/collections";
import { requireRole } from "@/lib/auth/guard";
import { logAudit, notify } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const guard = await requireRole(["super_admin", "partner_admin"]);
  if ("error" in guard) return guard.error;

  const body = await req.json().catch(() => null);
  const ids: string[] = Array.isArray(body?.ids) ? body.ids : [];
  const group: string = body?.group;
  if (!ids.length || !group) return NextResponse.json({ error: "ids және group міндетті" }, { status: 400 });

  let count = 0;
  for (const id of ids) {
    const partner = await Partners.find((p) => p.id === id);
    if (!partner) continue;
    if (!partner.groups.includes(group)) {
      await Partners.update(id, { groups: [...partner.groups, group] });
    }
    count++;
  }

  await logAudit(
    { id: guard.session.sub, name: guard.session.fullName },
    "partner_bulk_group_assign",
    `${count} серіктес`,
    group
  );
  await notify("partner_bulk_group_assign", `${count} серіктес "${group}" топқа қосылды`, "partner_admin", "telegram");

  return NextResponse.json({ ok: true, count });
}
