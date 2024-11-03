import pkg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const { Client } = pkg;

const client = new Client({
  host: "localhost", // Host from DATABASE_URL
  port: 5432, // Default PostgreSQL port
  user: "postgres", // User from DATABASE_URL
  password: "2404", // Password from DATABASE_URL
  database: "hacknc", // Database name from DATABASE_URL
  ssl: false,
});

client
  .connect()
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

export const db = drizzle(client);
