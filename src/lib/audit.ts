import { AuditLog, Notifications, genId } from "./db/collections";
import type { Role } from "./auth/session";

export async function logAudit(actor: { id: string; name: string }, action: string, target: string, meta?: string) {
  await AuditLog.insert({
    id: genId("audit"),
    actorId: actor.id,
    actorName: actor.name,
    action,
    target,
    meta,
    createdAt: new Date().toISOString(),
  });
}

export async function notify(
  type: string,
  message: string,
  recipientRole: Role | "member",
  channel: "email" | "telegram" | "sms" | "whatsapp" | "system",
  relatedId?: string
) {
  await Notifications.insert({
    id: genId("notif"),
    type,
    message,
    recipientRole,
    channel,
    relatedId,
    createdAt: new Date().toISOString(),
    read: false,
  });
}
