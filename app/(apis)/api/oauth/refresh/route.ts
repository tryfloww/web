import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/lucia";
import { cookies } from "next/headers";
import { db } from "@/lib/db/client";
import { userTable } from "@/lib/db/schema";
import { google } from "@/lib/lucia/oauth";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const cooks = cookies();
  const { session } = await validateRequest();
  const redirectTo = request.nextUrl.searchParams.get("redirectTo") || "/";

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const userId = cooks.get("userId")?.value;
  
  try {
    if (userId != undefined) {
      const user = await db.query.userTable.findFirst({
        where: eq(userTable.id, userId),
      });
      if (!user || !user.refreshToken) {
        throw new Error("User not found or refresh token missing");
      }

      try {
        const { accessToken, accessTokenExpiresAt } =
          await google.refreshAccessToken(user.refreshToken);

        await db
          .update(userTable)
          .set({
            accessToken,
            expiresAt: Math.floor(accessTokenExpiresAt.getTime() / 1000),
          })
          .where(eq(userTable.id, userId));

        cookies().set("tokenExpiresAt", accessTokenExpiresAt.toString(), {
          maxAge: 21 * 24 * 60 * 60,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
      }
    }
    return NextResponse.redirect(new URL(redirectTo, request.url));
  } catch (error) {
    console.error("Token refresh failed:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
