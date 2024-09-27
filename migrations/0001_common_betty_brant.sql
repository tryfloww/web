CREATE TABLE `collaborator` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`channel_id` text NOT NULL,
	`role` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
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
	`name` text NOT NULL,
	`image` text,
	`subscriber_count` integer DEFAULT 0,
	`owner_id` text NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `playlist_youtube_id_unique` ON `playlist` (`youtube_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `video_youtube_id_unique` ON `video` (`youtube_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `youtube_channel_youtube_id_unique` ON `youtube_channel` (`youtube_id`);