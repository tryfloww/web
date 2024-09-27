ALTER TABLE `user` ADD `access_token` text NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `refresh_token` text;--> statement-breakpoint
ALTER TABLE `user` ADD `expires_at` integer NOT NULL;