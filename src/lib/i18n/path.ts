import { localeCodes } from "./locales";

export function replaceLocaleInPath(pathname: string, newLocale: string): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && localeCodes.includes(segments[1] as never)) {
    segments[1] = newLocale;
  } else {
    segments.splice(1, 0, newLocale);
  }
  return segments.join("/") || `/${newLocale}`;
}

export function withLocale(locale: string, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}
