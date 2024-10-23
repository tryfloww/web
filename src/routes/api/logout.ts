import { json } from "@solidjs/router"
import { getSession } from "~/lib/utils"
import { db } from "~/lib/db";

export async function GET() {
  const session = await getSession()
  if (session.data.userId) {
    await db.session.deleteMany({
      where: { accessToken: session.data.token }
    });
    await session.clear()
    return json({ success: true });
  }
  return json({ success: false });
}
