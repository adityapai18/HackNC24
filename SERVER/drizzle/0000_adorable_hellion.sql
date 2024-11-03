CREATE TYPE "public"."exp_type" AS ENUM('spent', 'received');--> statement-breakpoint
CREATE TYPE "public"."goal_type" AS ENUM('access', 'refresh', 'password_reset');--> statement-breakpoint
CREATE TYPE "public"."sender_type" AS ENUM('user', 'bot');--> statement-breakpoint
CREATE TYPE "public"."token_type" AS ENUM('access', 'refresh', 'password_reset');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('admin', 'normal');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('banned', 'pass', 'fail', 'waiting');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token" text NOT NULL,
	"token_type" "token_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"is_revoked" boolean DEFAULT false NOT NULL,
	CONSTRAINT "auth_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"conversation_id" integer NOT NULL,
	"sender_type" "sender_type",
	"message" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "family" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_1" integer NOT NULL,
	"user_2" integer NOT NULL,
	"relationship" text NOT NULL,
	"fam_admin" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"timestamp" timestamp DEFAULT now(),
	"amount" integer NOT NULL,
	"purpose" text,
	"exp_type" "exp_type"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_docs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"identity_doc" text NOT NULL,
	"account_doc" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_goals" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"goal_type" "goal_type",
	"success" boolean,
	"amount" integer NOT NULL,
	"reward" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"user_enum" "user_type",
	"password" text NOT NULL,
	"verification_status" "verification_status" DEFAULT 'waiting',
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth" ADD CONSTRAINT "auth_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chats" ADD CONSTRAINT "chats_conversation_id_users_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "family" ADD CONSTRAINT "family_user_1_users_id_fk" FOREIGN KEY ("user_1") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "family" ADD CONSTRAINT "family_user_2_users_id_fk" FOREIGN KEY ("user_2") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_docs" ADD CONSTRAINT "user_docs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_goals" ADD CONSTRAINT "user_goals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
