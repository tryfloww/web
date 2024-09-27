ALTER TABLE `youtube_channel` ADD `access_token` text NOT NULL;--> statement-breakpoint
ALTER TABLE `youtube_channel` ADD `refresh_token` text;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `access_token`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `refresh_token`;