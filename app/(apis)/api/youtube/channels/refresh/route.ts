import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { youtubeChannelTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { google } from "googleapis";

const youtubeClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube/callback`
);

export async function POST(request: NextRequest) {
  const userId = request.headers.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const ownedChannels = await db
      .select()
      .from(youtubeChannelTable)
      .where(eq(youtubeChannelTable.ownerId, userId));

    for (const channel of ownedChannels) {
      youtubeClient.setCredentials({
        access_token: channel.accessToken,
        refresh_token: channel.refreshToken,
        expiry_date: channel.expiresAt,
      });

      const youtube = google.youtube({ version: "v3", auth: youtubeClient });

      const response = await youtube.channels.list({
        part: ["snippet", "statistics"],
        id: [channel.youtubeId],
      });

      if (response.data.items && response.data.items.length > 0) {
        const updatedChannel = response.data.items[0];
        await db
          .update(youtubeChannelTable)
          .set({
            name: updatedChannel.snippet!.title!,
            image: updatedChannel.snippet!.thumbnails!.medium!.url!,
            subscriberCount: parseInt(
              updatedChannel.statistics!.subscriberCount! || "0"
            ),
          })
          .where(eq(youtubeChannelTable.id, channel.id));
      }
    }

    return NextResponse.json({ message: "Channels refreshed successfully" });
  } catch (error) {
    console.error("Error refreshing channel data:", error);
    return NextResponse.json(
      { error: "Failed to refresh channel data" },
      { status: 500 }
    );
  }
}