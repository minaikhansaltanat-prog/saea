import { NextRequest, NextResponse } from "next/server";
import { ContactMessages, genId } from "@/lib/db/collections";
import { notify } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Міндетті өрістер толтырылмаған" }, { status: 400 });
  }

  const message = await ContactMessages.insert({
    id: genId("msg"),
    name: String(body.name).slice(0, 200),
    email: String(body.email).slice(0, 200),
    phone: body.phone ? String(body.phone).slice(0, 50) : undefined,
    company: body.company ? String(body.company).slice(0, 200) : undefined,
    subject: body.subject ? String(body.subject).slice(0, 200) : undefined,
    message: String(body.message).slice(0, 4000),
    status: "new",
    createdAt: new Date().toISOString(),
  });

  await notify("contact_message", `Жаңа хабарлама: ${message.name}`, "support_agent", "email", message.id);

  return NextResponse.json({ ok: true, id: message.id });
}
