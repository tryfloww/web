import { NextResponse } from "next/server";
import { google } from "googleapis";
import { cookies } from "next/headers";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube/callback`,
);

export async function GET() {
  const cookieStore = cookies();
  const userid = cookieStore.get("userId")!;

  if (!userid) {
    return NextResponse.redirect("/api/oauth/google");
  }

  const state = JSON.stringify({ userid, random: Math.random().toString(36).substring(7) });

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/youtube",
      "https://www.googleapis.com/auth/youtube.force-ssl",
      "https://www.googleapis.com/auth/youtube.upload",
    ],
    state: state,
  });

  return NextResponse.redirect(authUrl);
}
