ALTER TABLE "public"."user_goals" ALTER COLUMN "goal_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."goal_type";--> statement-breakpoint
CREATE TYPE "public"."goal_type" AS ENUM('long_term', 'short_term');--> statement-breakpoint
ALTER TABLE "public"."user_goals" ALTER COLUMN "goal_type" SET DATA TYPE "public"."goal_type" USING "goal_type"::"public"."goal_type";