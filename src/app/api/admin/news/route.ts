import { NextRequest, NextResponse } from "next/server";
import { News, genId } from "@/lib/db/collections";
import { requireRole } from "@/lib/auth/guard";
import { logAudit } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const guard = await requireRole(["super_admin", "content_admin"]);
  if ("error" in guard) return guard.error;

  const body = await req.json().catch(() => null);
  if (!body?.title) return NextResponse.json({ error: "Атауы міндетті" }, { status: 400 });

  const slug = String(body.title.kk || body.title.en || "article")
    .toLowerCase()
    .replace(/[^a-zA-Zа-яәғқңөұүһі0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80) + "-" + Date.now().toString(36).slice(-4);

  const article = await News.insert({
    id: genId("news"),
    slug,
    title: body.title,
    excerpt: body.excerpt ?? {},
    body: body.body ?? {},
    cover: body.cover || "/images/bg/meeting-room.webp",
    category: body.category || "Жаңалық",
    author: body.author || guard.session.fullName,
    publishedAt: body.publishedAt || new Date().toISOString().slice(0, 10),
    status: body.status === "draft" ? "draft" : "published",
    minutesToRead: Number(body.minutesToRead) || 3,
  });

  await logAudit({ id: guard.session.sub, name: guard.session.fullName }, "news_created", article.title.kk ?? article.slug);
  return NextResponse.json({ ok: true, article });
}
