import { NextResponse } from "next/server";
import { Users } from "@/lib/db/collections";
import { getSession } from "@/lib/auth/session";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Кіру қажет" }, { status: 401 });
  const { id } = await params;

  const user = await Users.find((u) => u.id === session.sub);
  if (!user) return NextResponse.json({ error: "Табылмады" }, { status: 404 });

  const current = user.bookmarkedTenderIds ?? [];
  const next = current.includes(id) ? current.filter((t) => t !== id) : [...current, id];
  await Users.update(session.sub, { bookmarkedTenderIds: next });

  return NextResponse.json({ ok: true, bookmarked: next.includes(id) });
}
