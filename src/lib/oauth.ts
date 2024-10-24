import { generateCodeVerifier, generateState, Google } from "arctic";
import cookie from "cookie";

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.PUBLIC_BASE_URL!}/api/oauth/google`
)

export const generateAuthUrl = async () => {
  "use server"

  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const authorizationURL = await google.createAuthorizationURL(
    state,
    codeVerifier,
    {
      scopes: ["email"],
    },
  );
  authorizationURL.searchParams.set("access_type", "offline");

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    cookie.serialize("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 5,
      path: "/",
    })
  );
  headers.append(
    "Set-Cookie",
    cookie.serialize("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 5, // 5 minutes expiration
      path: "/",
    })
  );

  return new Response(
    JSON.stringify({
      data: authorizationURL.toString(),
    }),
    { headers }
  );
};
