import { NextRequest, NextResponse } from "next/server";
import { Team, genId } from "@/lib/db/collections";
import { requireRole } from "@/lib/auth/guard";
import { logAudit } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const guard = await requireRole(["super_admin", "content_admin"]);
  if ("error" in guard) return guard.error;
  const body = await req.json().catch(() => null);
  if (!body?.name) return NextResponse.json({ error: "Аты міндетті" }, { status: 400 });

  const all = await Team.all();
  const member = await Team.insert({
    id: genId("team"),
    name: body.name,
    position: body.position ?? {},
    bio: body.bio ?? {},
    photo: body.photo || "",
    linkedin: body.linkedin || undefined,
    email: body.email || undefined,
    order: all.length + 1,
  });

  await logAudit({ id: guard.session.sub, name: guard.session.fullName }, "team_member_created", member.name);
  return NextResponse.json({ ok: true, member });
}
