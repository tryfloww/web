import { db } from "@/lib/db/client";
import { userTable } from "@/lib/db/schema";
import { lucia } from "@/lib/lucia";
import { google } from "@/lib/lucia/oauth";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    if (!code || !state) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const codeVerifier = cookies().get("codeVerifier")?.value;
    const savedState = cookies().get("state")?.value;
    if (!codeVerifier || !savedState) {
      return Response.json(
        { error: "Code verifier or saved state is missing" },
        { status: 400 },
      );
    }
    if (savedState !== state) {
      return Response.json({ error: "State does not match" }, { status: 400 });
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
    const googleData = (await googleRes.json()) as GoogleUser;
    await db.transaction(async (trx) => {
      const existingUser = await trx.query.userTable.findFirst({
        where: eq(userTable.id, googleData.id),
      });

      if (!existingUser) {
        const createdUserRes = await trx
          .insert(userTable)
          .values({
            email: googleData.email,
            userName: googleData.email.split("@")[0],
            id: googleData.id,
            accessToken,
            expiresAt: Math.floor(accessTokenExpiresAt.getTime() / 1000), // Store as Unix timestamp
            refreshToken,
          })
          .returning({ id: userTable.id });
        if (!createdUserRes) {
          throw new Error("Failed to create user");
        }
      }
    });

    const session = await lucia.createSession(googleData.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    cookies().delete("state");
    cookies().delete("codeVerifier");

    return NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_BASE_URL),
      { status: 302 },
    );
  } catch (error) {
    console.error("OAuth callback error:", error);
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
};
