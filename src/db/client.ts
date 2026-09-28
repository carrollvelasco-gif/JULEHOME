import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import * as schema from "@/db/schema";

function createDb(): NeonHttpDatabase<typeof schema> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "Falta DATABASE_URL. Crea el proyecto Neon Postgres y añade la URL (connection string) a .env.local",
    );
  }
  const sql: NeonQueryFunction<false, true> = neon(url);
  return drizzle(sql, { schema });
}

/**
 * Cliente Drizzle de acceso perezoso.
 * La conexión solo se abre cuando se ejecuta una consulta real,
 * para no romper el build ni las páginas que no usan la BD.
 */
const globalForDb = globalThis as unknown as {
  julehomeDb?: NeonHttpDatabase<typeof schema>;
};

export function getDb(): NeonHttpDatabase<typeof schema> {
  if (!globalForDb.julehomeDb) {
    globalForDb.julehomeDb = createDb();
  }
  return globalForDb.julehomeDb;
}

export type DB = ReturnType<typeof getDb>;