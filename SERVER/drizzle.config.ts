import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.js",
  dbCredentials: {
    host: "localhost", // Host from DATABASE_URL
    port: 5432, // Default PostgreSQL port
    user: "postgres", // User from DATABASE_URL
    password: "2404", // Password from DATABASE_URL
    database: "hacknc", // Database name from DATABASE_URL
    ssl: false,
  },
  verbose: true,
  strict: true,
});
