import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateRequest } from "@/lib/lucia";

export async function middleware(request: NextRequest) {
  const { session } = await validateRequest();

  if (session) {
    const tokenExpiresAt = request.cookies.get("tokenExpiresAt")?.value;
    if (tokenExpiresAt != undefined) {
      const date = new Date(tokenExpiresAt);
      const exp = Math.floor(date.getTime() / 1000);
      const needsRefresh = tokenExpiresAt && exp < Date.now() / 1000;

      if (needsRefresh) {
        const refreshUrl = new URL("/api/oauth/refresh", request.url);
        refreshUrl.searchParams.set("redirectTo", request.url);
        return NextResponse.redirect(refreshUrl);
      }
    }

    return NextResponse.next();
  } else {
    if (
      request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname.startsWith("/api/oauth/google")
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
