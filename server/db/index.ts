import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Please add it to your environment variables."
  );
}

// Create postgres connection
const client = postgres(connectionString);

// Create drizzle instance
export const db = drizzle(client, { schema });
