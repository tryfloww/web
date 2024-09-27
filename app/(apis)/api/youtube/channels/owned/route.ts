import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { youtubeChannelTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const ownedChannels = await db
      .select()
      .from(youtubeChannelTable)
      .where(eq(youtubeChannelTable.ownerId, userId));

    return NextResponse.json({ channels: ownedChannels });
  } catch (error) {
    console.error("Error fetching owned channels:", error);
    return NextResponse.json(
      { error: "Failed to fetch owned channels" },
      { status: 500 },
    );
  }
}
