import { NextRequest, NextResponse } from "next/server";
import { Partners, genId } from "@/lib/db/collections";
import { scorePartnerApplication } from "@/lib/partner/scoring";
import { resolveGroupsFor } from "@/lib/db/seed/groups";
import { notify, logAudit } from "@/lib/audit";
import type { PartnerStatus } from "@/lib/db/types";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Жарамсыз форма" }, { status: 400 });

  const required = ["companyName", "country", "companyType", "regNumber", "contactName", "position", "email", "whatsapp", "goal"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Міндетті өріс толтырылмаған: ${field}` }, { status: 400 });
    }
  }

  const industries: string[] = Array.isArray(body.industries) ? body.industries : [];
  const directions: string[] = Array.isArray(body.directions) ? body.directions : [];

  const { score, status: scoreStatus, breakdown } = scorePartnerApplication({
    country: body.country,
    regNumber: body.regNumber,
    industries,
    goal: body.goal,
    website: body.website,
    telegram: body.telegram,
    presentationFileName: body.presentationFileName,
    referralCode: body.referralCode,
  });

  const status: PartnerStatus = scoreStatus;
  const groups = status === "auto_approved" ? resolveGroupsFor({
    country: body.country,
    companyType: body.companyType,
    industries,
    tariffInterest: body.tariffInterest,
    directions,
  }) : [];

  const partner = await Partners.insert({
    id: genId("partner"),
    companyName: String(body.companyName),
    country: body.country,
    city: body.city || undefined,
    industries,
    companyType: body.companyType,
    regNumber: String(body.regNumber),
    website: body.website || undefined,
    contactName: String(body.contactName),
    position: String(body.position),
    email: String(body.email),
    whatsapp: String(body.whatsapp),
    telegram: body.telegram || undefined,
    goal: String(body.goal),
    directions,
    wantsMembership: Boolean(body.wantsMembership),
    tariffInterest: body.tariffInterest || undefined,
    referralCode: body.referralCode || undefined,
    presentationFileName: body.presentationFileName || undefined,
    score,
    status,
    groups,
    createdAt: new Date().toISOString(),
    verification: status === "auto_approved" ? "verified" : "basic",
  });

  await logAudit({ id: "system", name: "Auto-scoring" }, "partner_application_submitted", partner.companyName, `score=${score} status=${status}`);

  if (status === "auto_approved") {
    await notify("partner_auto_approved", `${partner.companyName} авто-бекітілді (балл: ${score})`, "partner_admin", "system", partner.id);
  } else {
    await notify("partner_pending", `${partner.companyName} тексеруді күтеді (балл: ${score})`, "partner_admin", "email", partner.id);
  }

  return NextResponse.json({ ok: true, id: partner.id, score, status, breakdown, groups });
}
