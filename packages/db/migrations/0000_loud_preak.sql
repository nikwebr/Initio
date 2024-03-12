CREATE TABLE `bwell_account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `bwell_account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `bwell_session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `bwell_session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `bwell_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `bwell_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bwell_verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `bwell_verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE TABLE `bwell_checks` (
	`userId` varchar(255) NOT NULL,
	`time` time NOT NULL DEFAULT '00:00' CHECK (HOUR(time) < 24),
	`id` varchar(255) NOT NULL,
	CONSTRAINT `bwell_checks_userId_time_pk` PRIMARY KEY(`userId`,`time`),
	CONSTRAINT `bwell_checks_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `bwell_friends` (
	`userId` varchar(255) NOT NULL,
	`invitedUserId` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `bwell_friends_userId_invitedUserId_pk` PRIMARY KEY(`userId`,`invitedUserId`)
);
--> statement-breakpoint
CREATE TABLE `bwell_invitations` (
	`code` varchar(255) NOT NULL,
	`invitedByUser` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `bwell_invitations_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
CREATE TABLE `bwell_authCodes` (
	`authCode` varchar(255) NOT NULL,
	`clientId` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`scope` varchar(255) NOT NULL DEFAULT 'all',
	`codeChallenge` varchar(255) NOT NULL,
	`codeChallengeMethod` enum('plain','S256') NOT NULL,
	`redirectUri` varchar(255),
	`issuedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`expiresAt` timestamp NOT NULL,
	CONSTRAINT `bwell_authCodes_authCode` PRIMARY KEY(`authCode`)
);
--> statement-breakpoint
CREATE TABLE `bwell_refreshTokens` (
	`refreshToken` varchar(255) NOT NULL,
	`clientId` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`scope` varchar(255) NOT NULL DEFAULT 'all',
	`issuedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`expiresAt` timestamp NOT NULL,
	CONSTRAINT `bwell_refreshTokens_refreshToken` PRIMARY KEY(`refreshToken`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `bwell_account` (`userId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `bwell_session` (`userId`);--> statement-breakpoint
ALTER TABLE `bwell_checks` ADD CONSTRAINT `bwell_checks_userId_bwell_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `bwell_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `bwell_friends` ADD CONSTRAINT `bwell_friends_userId_bwell_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `bwell_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `bwell_friends` ADD CONSTRAINT `bwell_friends_invitedUserId_bwell_user_id_fk` FOREIGN KEY (`invitedUserId`) REFERENCES `bwell_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `bwell_invitations` ADD CONSTRAINT `bwell_invitations_invitedByUser_bwell_user_id_fk` FOREIGN KEY (`invitedByUser`) REFERENCES `bwell_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `bwell_authCodes` ADD CONSTRAINT `bwell_authCodes_userId_bwell_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `bwell_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `bwell_refreshTokens` ADD CONSTRAINT `bwell_refreshTokens_userId_bwell_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `bwell_user`(`id`) ON DELETE cascade ON UPDATE cascade;