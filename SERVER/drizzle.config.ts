import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.js",
  dbCredentials:{
    url:process.env.DATABASE_URL ? process.env.DATABASE_URL : ''
  }
});
