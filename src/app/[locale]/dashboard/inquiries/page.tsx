import { Inbox } from "lucide-react";
import { getSession } from "@/lib/auth/session";
import { Inquiries } from "@/lib/db/collections";
import { Badge } from "@/components/ui/primitives";

const STATUS_TONE = { new: "gold", read: "neutral", replied: "success", declined: "danger" } as const;
const STATUS_LABEL = { new: "Жаңа", read: "Оқылды", replied: "Жауап берілді", declined: "Бас тартылды" } as const;

export default async function InquiriesPage() {
  const session = await getSession();
  const inquiries = await Inquiries.filter((i) => i.toMemberId === session!.sub);

  if (inquiries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 bg-white py-20 text-center">
        <Inbox className="h-10 w-10 text-navy-300" />
        <p className="mt-4 max-w-sm text-sm text-navy-500">
          Қазірге дейін B2B сұраулар жоқ. Каталогта профиліңіз неғұрлым толық болса, соғұрлым көп сұрау түседі.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {inquiries.map((i) => (
        <div key={i.id} className="flex items-start justify-between gap-4 rounded-2xl border border-navy-100 bg-white p-5">
          <div>
            <div className="text-sm font-bold text-navy-900">{i.subject}</div>
            <div className="mt-1 text-xs text-navy-500">
              {i.fromName} {i.fromCompany ? `· ${i.fromCompany}` : ""} · {i.fromEmail}
            </div>
            <p className="mt-2 text-sm text-navy-600">{i.message}</p>
          </div>
          <Badge tone={STATUS_TONE[i.status]}>{STATUS_LABEL[i.status]}</Badge>
        </div>
      ))}
    </div>
  );
}
