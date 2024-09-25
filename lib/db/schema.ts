import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});

export const userTable = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userName: text("user_name").notNull(),
  image: text("image").default("https://art.pixilart.com/b40c06d501a0e99.png"),
  email: text("email").unique().notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  expiresAt: integer("expires_at").notNull(),
});
