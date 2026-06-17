import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { News } from "@/lib/db/collections";
import { NewsManager } from "@/components/admin/news-manager";
import { withLocale } from "@/lib/i18n/path";

export default async function AdminNewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getSession();
  if (!["super_admin", "content_admin"].includes(session!.role)) redirect(withLocale(locale, "/admin"));

  const articles = (await News.all()).sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  return <NewsManager articles={articles} />;
}
