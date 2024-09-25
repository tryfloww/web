import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "../db/client";
import { sessionTable, userTable } from "../db/schema";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export default adapter;
