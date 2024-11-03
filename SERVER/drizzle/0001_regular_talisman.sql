ALTER TABLE "public"."transactions" ALTER COLUMN "exp_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."exp_type";--> statement-breakpoint
CREATE TYPE "public"."exp_type" AS ENUM('income', 'expense');--> statement-breakpoint
ALTER TABLE "public"."transactions" ALTER COLUMN "exp_type" SET DATA TYPE "public"."exp_type" USING "exp_type"::"public"."exp_type";