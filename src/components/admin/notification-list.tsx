"use client";

import { useRouter } from "next/navigation";
import { Check, Mail, MessageCircle, MessageSquareText, Smartphone, Bell as BellIcon } from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import type { NotificationEntry } from "@/lib/db/types";

const CHANNEL_ICON: Record<NotificationEntry["channel"], React.ComponentType<{ className?: string }>> = {
  email: Mail,
  telegram: MessageCircle,
  sms: Smartphone,
  whatsapp: MessageSquareText,
  system: BellIcon,
};

export function NotificationList({ notifications }: { notifications: NotificationEntry[] }) {
  const router = useRouter();

  async function markRead(id: string) {
    await fetch(`/api/admin/notifications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    router.refresh();
  }

  return (
    <div className="space-y-2">
      {notifications.map((n) => {
        const Icon = CHANNEL_ICON[n.channel];
        return (
          <div
            key={n.id}
            className={`flex items-center justify-between gap-3 rounded-xl border p-4 ${
              n.read ? "border-navy-100 bg-white" : "border-gold-200 bg-gold-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-navy-900">{n.message}</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-navy-400">
                  <Badge tone="neutral">{n.type}</Badge>
                  {new Date(n.createdAt).toLocaleString("ru-RU")}
                </div>
              </div>
            </div>
            {!n.read && (
              <button onClick={() => markRead(n.id)} className="shrink-0 rounded-lg p-2 text-navy-400 hover:bg-navy-50 hover:text-navy-700" aria-label="Оқылды деп белгілеу">
                <Check className="h-4 w-4" />
              </button>
            )}
          </div>
        );
      })}
      {notifications.length === 0 && (
        <div className="rounded-2xl border border-dashed border-navy-200 bg-white p-8 text-center text-navy-400">Хабарламалар жоқ.</div>
      )}
    </div>
  );
}
