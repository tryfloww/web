import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateRequest } from "@/lib/lucia";
import { cookies } from "next/headers";
import { db } from "./lib/db/client";
import { userTable, youtubeChannelTable, collaboratorTable } from "./lib/db/schema";
import { eq, or, and } from "drizzle-orm";

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
        } catch (error) {
          console.error("Error refreshing token:", error);
          return NextResponse.redirect(new URL("/", request.url));
        }
      }

      if (request.nextUrl.pathname.startsWith('/channel')) {
        const channelIdMatch = request.nextUrl.pathname.match(/^\/channel\/([^\/]+)/);
        const channelId = channelIdMatch ? channelIdMatch[1] : null;
        console.log(channelId)
        if (channelId) {
          try {
            const userAccess = await db
              .select({ id: youtubeChannelTable.id })
              .from(youtubeChannelTable)
              .leftJoin(collaboratorTable, eq(youtubeChannelTable.id, collaboratorTable.channelId))
              .where(
                and(
                  eq(youtubeChannelTable.id, channelId),
                  or(
                    eq(youtubeChannelTable.ownerId, userId),
                    eq(collaboratorTable.userId, userId)
                  )
                )
              )
              .limit(1);

            console.log(userAccess)

            if (userAccess.length === 0) {
              return NextResponse.redirect(new URL("/404", request.url));
            }

            const youtubeRefreshUrl = new URL("/api/refresh-tokens/youtube", request.url);
            const youtubeResponse = await fetch(youtubeRefreshUrl, {
              method: 'GET',
              headers: {
                'Cookie': request.headers.get('cookie') || ''
              }
            });
            if (!youtubeResponse.ok) {
              throw new Error('YouTube token refresh failed');
            }
          } catch (error) {
            console.error("Error refreshing YouTube token:", error);
            return NextResponse.json({ error: "Failed to refresh YouTube tokens" }, { status: 500 });
          }
        } else {
          return NextResponse.redirect(new URL("/404", request.url));
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
      return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
