import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { cookies } from "next/headers";

const youtubeClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube/callback`,
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const cookieStore = cookies();
  const savedState = cookieStore.get("youtube_auth_state")?.value;

  if (!code || !state || state !== savedState) {
    return NextResponse.json(
      { error: "Invalid state or missing code" },
      { status: 400 },
    );
  }

  try {
    const { tokens } = await youtubeClient.getToken(code);
    youtubeClient.setCredentials(tokens);

    cookieStore.set("youtube_access_token", tokens.access_token || "", {
      httpOnly: true,
      secure: true,
    });
    if (tokens.refresh_token) {
      cookieStore.set("youtube_refresh_token", tokens.refresh_token, {
        httpOnly: true,
        secure: true,
      });
    }

    cookieStore.delete("youtube_auth_state");

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