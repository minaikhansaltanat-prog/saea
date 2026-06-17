import { NextRequest, NextResponse } from "next/server";
import { localeCodes, defaultLocale } from "@/lib/i18n/locales";
import { readSessionToken, SESSION_COOKIE } from "@/lib/auth/tokens";
import { isAdminRole, type Role } from "@/lib/auth/roles";

function getLocaleFromPath(pathname: string): string | null {
  const first = pathname.split("/")[1];
  return localeCodes.includes(first as never) ? first : null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const locale = getLocaleFromPath(pathname);

  if (!locale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  const rest = pathname.slice(locale.length + 1); // path after /{locale}

  const isAdminArea = rest.startsWith("/admin") && rest !== "/admin/login";
  const isDashboardArea = rest.startsWith("/dashboard");

  if (isAdminArea || isDashboardArea) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    const session = await readSessionToken(token);

    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}${isAdminArea ? "/admin/login" : "/login"}`;
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    if (isAdminArea && !isAdminRole(session.role as Role)) {
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}/dashboard`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico).*)"],
};
