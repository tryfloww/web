import { APIEvent } from "@solidjs/start/server"
import { redirect } from "@solidjs/router"
import { db } from "~/lib/db";

export async function GET(event: APIEvent) {
  const authHeader = event.request.headers.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    await db.session.deleteMany({
      where: { accessToken: token }
    });
  }

  // Clear the JWT cookie
  const headers = new Headers();
  headers.append('Set-Cookie', 'jwt=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');

  // Perform the redirect
  return redirect('/', { headers });
}
