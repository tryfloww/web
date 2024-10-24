import { db } from "~/lib/db"
import { useSession } from "vinxi/http";

export async function createSession(userId: string, type: string, accessToken: string, refreshToken?: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return db.session.create({
    data: {
      userId,
      type,
      accessToken,
      refreshToken,
      expiresAt,
    },
  });
}

export function getSession() {
  return useSession({
    password: process.env.SESSION_SECRET!
  });
}
