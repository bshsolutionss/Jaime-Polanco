import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/config/site";

// Any path without a locale prefix opens in the default language (Spanish).
// Visitors switch to English with the ES | EN toggle in the header.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, metadata files and anything with a file extension.
  matcher: ["/((?!_next|api|brand|sitemap.xml|robots.txt|icon.png|apple-icon.png|.*\\..*).*)"],
};
