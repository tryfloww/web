import { APIEvent } from "@solidjs/start/server"
import { json } from "@solidjs/router"
import { getSession } from "~/lib/utils"
import { db } from "~/lib/db";

export async function GET(event: APIEvent) {
  const session = await getSession()
  const authHeader = event.request.headers.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    await db.session.deleteMany({
      where: { accessToken: token }
    });
  }

  await session.clear()
  return json({ success: true });
}
