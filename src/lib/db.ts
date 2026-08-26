import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

export const sql = connectionString ? neon(connectionString) : null;

let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!sql) throw new Error("Sem ligação configurada à base de dados.");
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS appointments (
        id text PRIMARY KEY,
        date text NOT NULL,
        time text NOT NULL,
        treatment_slug text NOT NULL,
        name text NOT NULL,
        email text NOT NULL,
        phone text NOT NULL,
        notes text NOT NULL DEFAULT '',
        created_at timestamptz NOT NULL DEFAULT now(),
        UNIQUE (date, time)
      )
    `.then(() => undefined);
  }
  return schemaReady;
}
