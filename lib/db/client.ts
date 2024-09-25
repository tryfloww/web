import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";

import * as schema from "./schema";

const turso = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.AUTH_TOKEN,
});

export const db = drizzle(turso, { schema });
