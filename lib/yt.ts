import { google } from "googleapis";
import { cookies } from "next/headers";

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube/auth`, // Redirect URI
);

const callBackClient = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube/auth/callback`,
);

export async function validateConnection(): Promise<{
  isConnected: boolean;
  channelInfo?: {
    id: string;
    title: string;
    customUrl?: string;
  };
  error?: string;
}> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("youtube_access_token")?.value;

  if (!accessToken) {
    return { isConnected: false, error: "No access token found" };
  }

  callBackClient.setCredentials({ access_token: accessToken });
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  try {
    const response = await youtube.channels.list({
      part: ["snippet", "contentDetails"],
      mine: true,
    });

    if (response.data.items && response.data.items.length > 0) {
      const channel = response.data.items[0];
      return {
        isConnected: true,
        channelInfo: {
          id: channel.id!,
          title: channel.snippet!.title!,
          customUrl: channel.snippet!.customUrl!,
        },
      };
    } else {
      return { isConnected: false, error: "No YouTube channels found" };
    }
  } catch (error) {
    console.error("Error validating YouTube connection:", error);
    return {
      isConnected: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function refreshAccessToken(): Promise<boolean> {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("youtube_refresh_token")?.value;

  if (!refreshToken) {
    return false;
  }

  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(credentials);

    if (credentials.access_token) {
      cookieStore.set("youtube_access_token", credentials.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: credentials.expiry_date
          ? (credentials.expiry_date - Date.now()) / 1000
          : 3600,
      });
    }

    return true;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return false;
  }
}

export { oauth2Client };
