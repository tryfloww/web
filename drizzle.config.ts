import { config } from "dotenv";
import type { Config } from "drizzle-kit";

config();

export default {
  schema: "./lib/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.AUTH_TOKEN,
  },
} satisfies Config;
