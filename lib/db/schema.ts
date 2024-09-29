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
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  expiresAt: integer("expires_at").notNull(),
  email: text("email").unique().notNull(),
});

export const inviteTable = sqliteTable("invite", {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  receiver: text("reciever").notNull().references(() => userTable.id),
  sender: text('sender').notNull().references(() => userTable.id),
  ytchannel: text('channel').notNull().references(() => youtubeChannelTable.id),
  role: text("role").notNull().references(() => permissionTable.id),
})

export const youtubeChannelTable = sqliteTable("youtube_channel", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  youtubeId: text("youtube_id").unique().notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  expiresAt: integer("expires_at").notNull(),
  name: text("name").notNull(),
  image: text("image"),
  subscriberCount: integer("subscriber_count").default(0),
  ownerId: text("owner_id")
    .notNull()
    .references(() => userTable.id),
});


export const permissionTable = sqliteTable("perm", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().default("New Role"),
  hex: text("hex").notNull().default("#dc2626"),
  channel: text("channel_id").notNull().references(() => youtubeChannelTable.id),
  upload_thumbnail: integer("upload_thumbnail").default(0),
  upload_banners: integer("upload_banners").default(0),
  update_captions: integer("update_captions").default(0),
  delete_captions: integer("delete_captions").default(0),
  upload_video: integer("upload_video").default(0),
  update_video: integer("update_video").default(0),
  delete_video: integer("update_video").default(0),
  watermarks: integer("watermarks").default(0),
  playlist_items: integer("playlist_items").default(0),
  playlists: integer("playlist").default(0),
  playlist_images: integer("playlist_images").default(0)
})

export const collaboratorTable = sqliteTable("collaborator", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  channelId: text("channel_id")
    .notNull()
    .references(() => youtubeChannelTable.id),
  role: text("role").notNull().references(() => permissionTable.id),
});

export const videoTable = sqliteTable("video", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  youtubeId: text("youtube_id").unique().notNull(),
  channelId: text("channel_id")
    .notNull()
    .references(() => youtubeChannelTable.id),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  publishedAt: text("published_at").notNull(),
});

export const playlistTable = sqliteTable("playlist", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  youtubeId: text("youtube_id").unique().notNull(),
  channelId: text("channel_id")
    .notNull()
    .references(() => youtubeChannelTable.id),
  title: text("title").notNull(),
  description: text("description"),
});
