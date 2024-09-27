import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { youtubeChannelTable, collaboratorTable } from "@/lib/db/schema";
import { eq, and, ne } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const collaboratedChannels = await db
      .select({
        channel: youtubeChannelTable,
        role: collaboratorTable.role,
      })
      .from(youtubeChannelTable)
      .innerJoin(
        collaboratorTable,
        eq(youtubeChannelTable.id, collaboratorTable.channelId),
      )
      .where(
        and(
          eq(collaboratorTable.userId, userId),
          ne(youtubeChannelTable.ownerId, userId),
        ),
      );

    return NextResponse.json({ channels: collaboratedChannels });
  } catch (error) {
    console.error("Error fetching collaborated channels:", error);
    return NextResponse.json(
      { error: "Failed to fetch collaborated channels" },
      { status: 500 },
    );
  }
}
