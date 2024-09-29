import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/lucia";
import { cookies } from "next/headers";
import { db } from "@/lib/db/client";
import { userTable } from "@/lib/db/schema";
import { google } from "@/lib/lucia/oauth";
import { eq } from "drizzle-orm";

export async function GET() {
  const cooks = cookies();
  const { session } = await validateRequest();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

        return NextResponse.json({ success: true, message: "Token refreshed successfully" });
      } catch (error) {
        console.error("Error refreshing token:", error);
        return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
