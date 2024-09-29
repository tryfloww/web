import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateRequest } from "@/lib/lucia";
import { cookies } from "next/headers";
import { db } from "./lib/db/client";
import { userTable } from "./lib/db/schema";
import { eq } from "drizzle-orm";

export async function middleware(request: NextRequest) {
  const { session } = await validateRequest();
  if (session) {
    const c = cookies();
    const userId = c.get("userId")?.value!
    if (userId) {
      const result = await db.select({
        expiresAt: userTable.expiresAt,
      }).from(userTable).where(eq(userTable.id, userId));
      const tokenExpiresAt = result[0].expiresAt
      const needsRefresh = tokenExpiresAt && tokenExpiresAt < Date.now() / 1000;

      console.log(needsRefresh)
      if (needsRefresh) {
        try {
          const refreshUrl = new URL("/api/refresh-tokens/oauth", request.url);
          const response = await fetch(refreshUrl, {
            method: 'GET',
            headers: {
              'Cookie': request.headers.get('cookie') || ''
            }
          });

          if (!response.ok) {
            throw new Error('Token refresh failed');
          }

          return NextResponse.next();
        } catch (error) {
          console.error("Error refreshing token:", error);
          return NextResponse.redirect(new URL("/", request.url));
        }
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
