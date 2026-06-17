import { NextRequest, NextResponse } from "next/server";
import { Partners } from "@/lib/db/collections";
import { requireRole } from "@/lib/auth/guard";
import { logAudit, notify } from "@/lib/audit";
import { resolveGroupsFor } from "@/lib/db/seed/groups";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireRole(["super_admin", "partner_admin"]);
  if ("error" in guard) return guard.error;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body?.action) return NextResponse.json({ error: "Әрекет көрсетілмеген" }, { status: 400 });

  const partner = await Partners.find((p) => p.id === id);
  if (!partner) return NextResponse.json({ error: "Серіктес табылмады" }, { status: 404 });

  const actorName = guard.session.fullName;
  const actor = { id: guard.session.sub, name: actorName };

  if (body.action === "approve") {
    const groups = resolveGroupsFor({
      country: partner.country,
      companyType: partner.companyType,
      industries: partner.industries,
      tariffInterest: partner.tariffInterest,
      directions: partner.directions,
    });
    const updated = await Partners.update(id, {
      status: "approved",
      groups,
      reviewedAt: new Date().toISOString(),
      reviewedBy: actorName,
      verification: "verified",
    });
    await logAudit(actor, "partner_approved", partner.companyName);
    await notify("partner_approved", `${partner.companyName} бекітілді`, "member", "email", id);
    return NextResponse.json({ ok: true, partner: updated });
  }

  if (body.action === "reject") {
    const updated = await Partners.update(id, {
      status: "rejected",
      rejectionReason: body.reason ?? "Себеп көрсетілмеген",
      reviewedAt: new Date().toISOString(),
      reviewedBy: actorName,
    });
    await logAudit(actor, "partner_rejected", partner.companyName, body.reason);
    await notify("partner_rejected", `${partner.companyName} қабылданбады`, "member", "email", id);
    return NextResponse.json({ ok: true, partner: updated });
  }

  if (body.action === "assign_groups") {
    const groups: string[] = Array.isArray(body.groups) ? body.groups : partner.groups;
    const updated = await Partners.update(id, { groups });
    await logAudit(actor, "partner_groups_updated", partner.companyName, groups.join(", "));
    await notify("partner_group_assigned", `${partner.companyName} топтарға қосылды: ${groups.join(", ")}`, "partner_admin", "telegram", id);
    return NextResponse.json({ ok: true, partner: updated });
  }

  if (body.action === "request_docs") {
    const updated = await Partners.update(id, { status: "needs_docs" });
    await logAudit(actor, "partner_docs_requested", partner.companyName);
    await notify("partner_docs_requested", `${partner.companyName}-дан қосымша құжат сұралды`, "member", "email", id);
    return NextResponse.json({ ok: true, partner: updated });
  }

  return NextResponse.json({ error: "Белгісіз әрекет" }, { status: 400 });
}
