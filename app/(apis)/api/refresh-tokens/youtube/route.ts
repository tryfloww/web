import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { db } from "@/lib/db/client";
import { youtubeChannelTable, collaboratorTable } from "@/lib/db/schema";
import { eq, or, lt, and } from "drizzle-orm";

const youtubeClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube/callback`
);

export async function GET(request: NextRequest) {
  const userId = request.cookies.get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  try {
    const expiredChannels = await db
      .select({
        id: youtubeChannelTable.id,
        refreshToken: youtubeChannelTable.refreshToken,
        expiresAt: youtubeChannelTable.expiresAt,
      })
      .from(youtubeChannelTable)
      .leftJoin(collaboratorTable, eq(youtubeChannelTable.id, collaboratorTable.channelId))
      .where(
        and(
          or(
            eq(youtubeChannelTable.ownerId, userId),
            eq(collaboratorTable.userId, userId)
          ),
          lt(youtubeChannelTable.expiresAt, currentTimestamp)
        )
      );

    const refreshedChannels = [];

    for (const channel of expiredChannels) {
      if (!channel.refreshToken) {
        console.warn(`Channel ${channel.id} has no refresh token`);
        continue;
      }

      try {
        youtubeClient.setCredentials({
          refresh_token: channel.refreshToken
        });

        const { credentials } = await youtubeClient.refreshAccessToken();

        await db
          .update(youtubeChannelTable)
          .set({
            accessToken: credentials.access_token!,
            expiresAt: Math.floor(credentials.expiry_date! / 1000),
            refreshToken: credentials.refresh_token || channel.refreshToken,
          })
          .where(eq(youtubeChannelTable.id, channel.id));

        refreshedChannels.push(channel.id);
      } catch (error) {
        console.error(`Failed to refresh token for channel ${channel.id}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "YouTube tokens refreshed successfully",
      refreshedChannels: refreshedChannels
    });
  } catch (error) {
    console.error("Error refreshing YouTube tokens:", error);
    return NextResponse.json({ error: "Failed to refresh YouTube tokens" }, { status: 500 });
  }
}
