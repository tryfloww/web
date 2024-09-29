CREATE TABLE `collaborator` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`channel_id` text NOT NULL,
	`role` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`channel_id`) REFERENCES `youtube_channel`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`role`) REFERENCES `perm`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `invite` (
	`id` text PRIMARY KEY NOT NULL,
	`reciever` text NOT NULL,
	`sender` text NOT NULL,
	`channel` text NOT NULL,
	`role` text NOT NULL,
	FOREIGN KEY (`reciever`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`sender`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`channel`) REFERENCES `youtube_channel`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`role`) REFERENCES `perm`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `perm` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text DEFAULT 'New Role' NOT NULL,
	`hex` text DEFAULT '#dc2626' NOT NULL,
	`channel_id` text NOT NULL,
	`upload_thumbnail` integer DEFAULT 0,
	`upload_banners` integer DEFAULT 0,
	`update_captions` integer DEFAULT 0,
	`delete_captions` integer DEFAULT 0,
	`upload_video` integer DEFAULT 0,
	`update_video` integer DEFAULT 0,
	`watermarks` integer DEFAULT 0,
	`playlist_items` integer DEFAULT 0,
	`playlist` integer DEFAULT 0,
	`playlist_images` integer DEFAULT 0,
	FOREIGN KEY (`channel_id`) REFERENCES `youtube_channel`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `playlist` (
	`id` text PRIMARY KEY NOT NULL,
	`youtube_id` text NOT NULL,
	`channel_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	FOREIGN KEY (`channel_id`) REFERENCES `youtube_channel`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`user_name` text NOT NULL,
	`image` text DEFAULT 'https://art.pixilart.com/b40c06d501a0e99.png',
	`access_token` text NOT NULL,
	`refresh_token` text,
	`expires_at` integer NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `video` (
	`id` text PRIMARY KEY NOT NULL,
	`youtube_id` text NOT NULL,
	`channel_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`thumbnail_url` text,
	`published_at` text NOT NULL,
	FOREIGN KEY (`channel_id`) REFERENCES `youtube_channel`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `youtube_channel` (
	`id` text PRIMARY KEY NOT NULL,
	`youtube_id` text NOT NULL,
	`access_token` text NOT NULL,
	`refresh_token` text,
	`expires_at` integer NOT NULL,
	`name` text NOT NULL,
	`image` text,
	`subscriber_count` integer DEFAULT 0,
	`owner_id` text NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `playlist_youtube_id_unique` ON `playlist` (`youtube_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `video_youtube_id_unique` ON `video` (`youtube_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `youtube_channel_youtube_id_unique` ON `youtube_channel` (`youtube_id`);
