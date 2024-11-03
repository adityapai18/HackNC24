import {
  integer,
  text,
  pgTable,
  timestamp,
  serial,
  boolean,
  pgEnum,
  date
} from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("user_type", ["admin", "normal"]);
export const verificationEnum = pgEnum("verification_status", [
  "banned",
  "pass",
  "fail",
  "waiting"
]);
export const expenseTypeEnum = pgEnum("exp_type", ["income", "expense"]);
export const senderType = pgEnum("sender_type", ["user", "bot"]);
export const tokenTypeEnum = pgEnum("token_type", [
  "access",
  "refresh",
  "password_reset",
]);
export const goalType = pgEnum("goal_type", [
  'long_term',
  'short_term'
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  userType: userTypeEnum("user_enum"),
  password: text("password").notNull(),
  verificationStatus: verificationEnum("verification_status").default("waiting"),
});

export const userDocs = pgTable("user_docs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  identityDoc: text("identity_doc").notNull(),
  accountDoc: text("account_doc").notNull(),
});

export const family = pgTable("family", {
  id: serial("id").primaryKey(),
  user1: integer("user_1")
    .notNull()
    .references(() => users.id),
  user2: integer("user_2")
    .notNull()
    .references(() => users.id),
  relationship: text("relationship").notNull(),
  familyAdmin: boolean("fam_admin"),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  timestamp: timestamp("timestamp").defaultNow(),
  amount: integer("amount").notNull(),
  purpose: text("purpose"),
  expenseType: expenseTypeEnum("exp_type"),
});

export const userGoals = pgTable("user_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  goalType: goalType("goal_type"),
  success: boolean("success"),
  amount: integer("amount").notNull(),
  goalDeadline:date().defaultNow(),
  reward: text("reward"),
});

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  user_id: integer("conversation_id")
    .notNull()
    .references(() => users.id), // Foreign key to `conversations` table
  sender: senderType("sender_type"), // "user" or "bot" to indicate who sent the message
  message: text("message").notNull(), // Message content
  timestamp: timestamp("timestamp").defaultNow().notNull(), // Timestamp for each message
});

// Auth table
export const auth = pgTable("auth", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id), // Foreign key to `users` table
  token: text("token").notNull().unique(), // Stores the token value
  tokenType: tokenTypeEnum("token_type").notNull(), // Token type, e.g., "access", "refresh", or "password_reset"
  createdAt: timestamp("created_at").defaultNow().notNull(), // Timestamp for when the token was created
  expiresAt: timestamp("expires_at").notNull(), // Expiration timestamp
  isRevoked: boolean("is_revoked").default(false).notNull(), // Marks if the token is revoked
});
