import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateRequest } from "@/lib/lucia";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  const { session } = await validateRequest();

  if (!session && !request.nextUrl.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (session && request.nextUrl.pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
