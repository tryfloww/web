import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateRequest } from "@/lib/lucia";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookie = cookies();
  const { session } = await validateRequest();
  console.log(cookie.get("userId"));
  if (session) {
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
