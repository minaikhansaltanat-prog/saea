import Link from "next/link";
import { Eye, MessageSquare, FileSearch, Calendar, TrendingUp, UserCog, ArrowRight, Sparkles } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getSession } from "@/lib/auth/session";
import { Users, Inquiries, Tenders, Events } from "@/lib/db/collections";
import { withLocale } from "@/lib/i18n/path";
import { Badge, LinkButton } from "@/components/ui/primitives";
import { STATUS_LABELS, STATUS_TONE } from "@/lib/status";
import { TARIFF_FEATURES } from "@/lib/tariff-features";
import { pickText } from "@/lib/i18n/pick-text";

function hashNumber(seed: string, max: number) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) % 100000;
  return h % max;
}

export default async function DashboardOverviewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const session = await getSession();
  const user = (await Users.find((u) => u.id === session!.sub))!;
  const features = TARIFF_FEATURES[user.tariff];

  const [inquiries, tenders, events] = await Promise.all([
    Inquiries.filter((i) => i.toMemberId === user.id),
    Tenders.all(),
    Events.all(),
  ]);

  const matchingTenders = tenders.filter((t) => !user.industry || t.industry === user.industry).slice(0, 5);
  const upcomingEvents = events.filter((e) => new Date(e.date).getTime() >= Date.now()).slice(0, 3);
  const profileViews = hashNumber(user.id, 200) + 40;

  return (
    <div className="space-y-7">
      <div className="rounded-2xl bg-navy-gradient p-7 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm text-white/60">{dict.dashboard.welcomeBack}</div>
            <h2 className="font-heading text-2xl font-extrabold">{user.fullName}</h2>
            <div className="mt-2 flex items-center gap-2">
              <Badge tone={STATUS_TONE[user.status]}>{STATUS_LABELS[user.status]}</Badge>
              <Badge tone="gold">{user.tariff}</Badge>
            </div>
          </div>
          <div className="w-full max-w-xs rounded-xl bg-white/10 p-4 sm:w-auto">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span>{dict.dashboard.profileCompleteness}</span>
              <span className="font-bold text-gold-300">{user.profileCompleteness}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gold-500" style={{ width: `${user.profileCompleteness}%` }} />
            </div>
            <Link
              href={withLocale(locale, "/dashboard/profile")}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold-300 hover:underline"
            >
              Профильді толтыру <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Eye} label={dict.dashboard.profileViews} value={profileViews} locked={!features.tenderAlerts && user.tariff === "START"} />
        <StatCard icon={MessageSquare} label={dict.dashboard.inquiriesNew} value={inquiries.filter((i) => i.status === "new").length} />
        <StatCard icon={FileSearch} label={dict.dashboard.newTenders} value={matchingTenders.length} locked={!features.tenderAlerts} />
        <StatCard icon={Calendar} label={dict.dashboard.upcomingMeetings} value={upcomingEvents.length} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title={dict.dashboard.newTenders} locked={!features.tenderAlerts} lockedNote={dict.partner.pageSubtitle}>
          <ul className="divide-y divide-navy-100">
            {matchingTenders.map((t) => (
              <li key={t.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <div className="font-semibold text-navy-800">{t.title}</div>
                  <div className="text-xs text-navy-400">
                    {t.organization} · {t.amount.toLocaleString("ru-RU")} {t.currency}
                  </div>
                </div>
                <span className="text-xs text-navy-400">{new Date(t.deadline).toLocaleDateString(locale)}</span>
              </li>
            ))}
          </ul>
          <Link
            href={withLocale(locale, "/dashboard/tenders")}
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:underline"
          >
            {dict.dashboard.viewAllTenders} <ArrowRight className="h-3 w-3" />
          </Link>
        </Panel>

        <Panel title={dict.dashboard.upcomingMeetings}>
          <ul className="divide-y divide-navy-100">
            {upcomingEvents.map((e) => (
              <li key={e.id} className="py-3 text-sm">
                <div className="font-semibold text-navy-800">{pickText(e.title, locale)}</div>
                <div className="text-xs text-navy-400">{new Date(e.date).toLocaleDateString(locale)} · {e.format === "online" ? dict.events.online : dict.events.offline}</div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={dict.dashboard.chatActivity}>
          <div className="flex items-center gap-3 rounded-xl bg-navy-50 p-4 text-sm text-navy-500">
            <Sparkles className="h-5 w-5 text-gold-500" />
            Telegram/WhatsApp интеграциясы қосылғаннан кейін соңғы хабарлар осы жерде көрінеді.
          </div>
        </Panel>

        <Panel title={dict.dashboard.businessAnalytics} locked={!features.analytics || features.analytics === "none"}>
          {features.analytics !== "none" ? (
            <div>
              <p className="text-sm text-navy-500">Толық аналитика — конверсия, ROI және трендтер.</p>
              <LinkButton href={withLocale(locale, "/dashboard/analytics")} size="sm" className="mt-3">
                <TrendingUp className="h-4 w-4" /> {dict.nav.dashboard}
              </LinkButton>
            </div>
          ) : null}
        </Panel>
      </div>

      <Panel title={dict.dashboard.personalManager} locked={!features.personalManager}>
        {features.personalManager ? (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-800 text-white">
              <UserCog className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-navy-800">Жеке менеджер тағайындалу үстінде</div>
              <div className="text-xs text-navy-400">24 сағат ішінде Partner Admin хабарласады</div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-navy-500">{dict.dashboard.noManager}</p>
        )}
      </Panel>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  locked,
}: {
  icon: typeof Eye;
  label: string;
  value: number;
  locked?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>
      <div className="mt-3 font-heading text-2xl font-extrabold text-navy-900">{locked ? "—" : value}</div>
      <div className="mt-1 text-xs text-navy-500">{label}</div>
    </div>
  );
}

function Panel({
  title,
  locked,
  lockedNote,
  children,
}: {
  title: string;
  locked?: boolean;
  lockedNote?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6">
      <h3 className="font-heading text-sm font-bold text-navy-900">{title}</h3>
      {locked ? (
        <div className="mt-3 rounded-xl bg-gold-50 p-4 text-xs text-gold-700">
          STANDART+ тарифінде қолжетімді. {lockedNote}
        </div>
      ) : (
        <div className="mt-2">{children}</div>
      )}
    </div>
  );
}
