import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in the environment variables");
  throw new Error("DATABASE_URL is not defined");
}

if (!process.env.AUTH_TOKEN) {
  console.warn("AUTH_TOKEN is not set in the environment variables");
}

const turso = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.AUTH_TOKEN,
});

export const db = drizzle(turso, { schema });
