import { json, redirect } from "@solidjs/router";
import { APIEvent } from "@solidjs/start/server";
import cookie from "cookie";
import { db } from "~/lib/db";
import { google } from "~/lib/oauth";
import { createSession, getSession } from "~/lib/utils";

export async function POST(event: APIEvent) {
  const url = new URL(event.request.url)
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookies = cookie.parse(event.request.headers.get("cookie")!)
  const codeVerifier = cookies["codeVerifier"]
  const savedState = cookies["savedState"]

  const session = await getSession()

  if (!code || !state) {
    return json({ success: false, message: "NO CODE OR STATE" });
  }

  if (!codeVerifier || !savedState) {
    return json({ success: false, message: "NO CODE OR STATE" });
  }

  const { accessToken, accessTokenExpiresAt, refreshToken } =
    await google.validateAuthorizationCode(code, codeVerifier);

  const googleRes = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      method: "GET",
    },
  );
  const googleData = await googleRes.json();
  console.log(googleData, googleRes)

  const user = await db.user.upsert({
    where: { id: googleData.id },
    create: { id: googleData.id, email: googleData.email, name: googleData.email.split("@")[0] },
    update: { id: googleData.id, email: googleData.email, name: googleData.email.split("@")[0] },
  })

  await createSession(user.id, "google", accessToken, refreshToken!)

  await session.update((d) => {
    d.auth = "google"
    d.refreshToken = refreshToken
    d.email = user.email
    d.token = accessToken
    d.userId = user?.id
  })

  return redirect(process.env.PUBLIC_BASE_URL!)
}
