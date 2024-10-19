import { db } from "~/lib/db"

export async function createSession(userId: string, type: string, accessToken: string, refreshToken?: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
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
