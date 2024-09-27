import { NextApiRequest, NextApiResponse } from "next";
import { validateConnection } from "@/lib/yt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userId = req.query.userId as string;
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const result = await validateConnection();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in validateConnection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
