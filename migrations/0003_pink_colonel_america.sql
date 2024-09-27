ALTER TABLE `youtube_channel` ADD `expires_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `expires_at`;