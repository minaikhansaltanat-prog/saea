import { getSession } from "@/lib/auth/session";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Users, Partners, AuditLog, Tariffs } from "@/lib/db/collections";
import { Card, Badge } from "@/components/ui/primitives";
import { Users2, ClipboardCheck, Wallet, UserCheck, MessageCircle, Activity, FileSearch2, HeartPulse } from "lucide-react";

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">{icon}</div>
        <div className="text-xs font-bold uppercase tracking-wide text-navy-400">{label}</div>
      </div>
      <div className="mt-3 font-heading text-2xl font-extrabold text-navy-900">{value}</div>
      {hint && <div className="mt-1 text-xs text-navy-500">{hint}</div>}
    </Card>
  );
}

export default async function AdminDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const session = await getSession();
  const role = session!.role;

  const [members, partners, audit, tariffs] = await Promise.all([
    Users.all(),
    Partners.all(),
    AuditLog.all(),
    Tariffs.all(),
  ]);

  const last30 = new Date();
  last30.setDate(last30.getDate() - 30);
  const newMembers = members.filter((m) => m.role === "member" && new Date(m.createdAt) >= last30);
  const activeMembers = members.filter((m) => m.role === "member" && m.status !== "suspended" && m.status !== "banned");
  const pendingPartners = partners.filter((p) => p.status === "pending_review" || p.status === "needs_docs");

  const priceMap = new Map(tariffs.map((t) => [t.code, t.priceMonth ?? 0]));
  const mrr = members
    .filter((m) => m.role === "member" && m.status !== "suspended" && m.status !== "banned")
    .reduce((sum, m) => sum + (priceMap.get(m.tariff) ?? 0), 0);

  const canSeeMembers = ["super_admin", "membership_admin", "support_agent"].includes(role);
  const canSeePartners = ["super_admin", "partner_admin"].includes(role);
  const canSeeFinance = ["super_admin", "finance_admin"].includes(role);
  const canSeeAnalytics = ["super_admin", "analytics_viewer"].includes(role);

  const recentAudit = [...audit].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-navy-gradient p-6 text-white sm:p-8">
        <div className="font-heading text-xl font-extrabold sm:text-2xl">{dict.admin.welcomeAdmin}</div>
        <p className="mt-1 text-sm text-white/70">
          {session!.fullName} — {role}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {canSeeMembers && (
          <StatCard
            icon={<Users2 className="h-5 w-5" />}
            label={dict.admin.kpiNewMembers}
            value={String(newMembers.length)}
            hint="соңғы 30 күн"
          />
        )}
        {canSeePartners && (
          <StatCard
            icon={<ClipboardCheck className="h-5 w-5" />}
            label={dict.admin.kpiPartnerRequests}
            value={String(pendingPartners.length)}
            hint="қарауды күтеді"
          />
        )}
        {canSeeFinance && (
          <StatCard
            icon={<Wallet className="h-5 w-5" />}
            label={dict.admin.kpiMrr}
            value={`${mrr.toLocaleString("ru-RU")} ₸`}
          />
        )}
        {canSeeMembers && (
          <StatCard
            icon={<UserCheck className="h-5 w-5" />}
            label={dict.admin.kpiActiveMembers}
            value={String(activeMembers.length)}
          />
        )}
        {canSeeAnalytics && (
          <>
            <StatCard icon={<MessageCircle className="h-5 w-5" />} label={dict.admin.kpiChatActivity} value="—" hint="Telegram/WhatsApp интеграциясы қосылғаннан кейін" />
            <StatCard icon={<Activity className="h-5 w-5" />} label={dict.admin.kpiSiteTraffic} value="—" hint="GA4 қосылғаннан кейін" />
            <StatCard icon={<FileSearch2 className="h-5 w-5" />} label={dict.admin.kpiTenderMonitor} value="—" hint="Goszakup API қосылғаннан кейін" />
          </>
        )}
        {role === "super_admin" && (
          <StatCard icon={<HeartPulse className="h-5 w-5" />} label={dict.admin.kpiSystemHealth} value="OK" hint="барлық қызметтер жұмыс істейді" />
        )}
      </div>

      {role === "super_admin" && (
        <Card className="p-6">
          <h3 className="font-heading text-sm font-bold text-navy-900">Соңғы әрекеттер</h3>
          <div className="mt-3 divide-y divide-navy-100">
            {recentAudit.length === 0 && <p className="py-3 text-sm text-navy-400">Әзірге жазба жоқ.</p>}
            {recentAudit.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <div>
                  <span className="font-semibold text-navy-800">{entry.actorName}</span>{" "}
                  <span className="text-navy-500">{entry.action}</span>{" "}
                  <span className="text-navy-700">{entry.target}</span>
                </div>
                <Badge tone="neutral">{new Date(entry.createdAt).toLocaleString("ru-RU")}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
