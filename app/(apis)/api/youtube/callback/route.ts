import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { db } from "@/lib/db/client";
import { youtubeChannelTable } from "@/lib/db/schema";

const youtubeClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube/callback`,
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return NextResponse.json(
      { error: "Invalid state or missing code" },
      { status: 400 },
    );
  }

  try {
    const decodedState = JSON.parse(state);
    const { userid } = decodedState;
    const { tokens } = await youtubeClient.getToken(code);
    youtubeClient.setCredentials(tokens);

    const youtube = google.youtube({ version: "v3", auth: youtubeClient });
    const response = await youtube.channels.list({
      part: ["snippet", "contentDetails", "statistics"],
      mine: true,
    });

    if (response.data.items && response.data.items.length > 0) {
      for (const channel of response.data.items) {
        await db
          .insert(youtubeChannelTable)
          .values({
            accessToken: tokens.access_token!,
            name: channel.snippet!.title!,
            refreshToken: tokens.refresh_token!,
            expiresAt: tokens.expiry_date!,
            ownerId: userid.value,
            youtubeId: channel.id!,
          })
          .onConflictDoUpdate({
            target: youtubeChannelTable.youtubeId,
            set: {
              name: channel.snippet!.title!,
              image: channel.snippet!.thumbnails!.medium!.url!,
              subscriberCount: parseInt(
                channel.statistics!.subscriberCount! || "0",
              ),
            },
          });
      }
    }

    return NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_BASE_URL),
    );
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    return NextResponse.json(
      { error: "Failed to exchange code for tokens" },
      { status: 500 },
    );
  }
}
