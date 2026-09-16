import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

// Check if connecting to a remote/cloud database (e.g. Neon, Supabase, Railway on Netlify)
const isRemoteDb =
  databaseUrl &&
  !databaseUrl.includes("127.0.0.1") &&
  !databaseUrl.includes("localhost");

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  (databaseUrl
    ? new Pool({
        connectionString: databaseUrl,
        ssl: isRemoteDb ? { rejectUnauthorized: false } : undefined,
      })
    : null);

if (process.env.NODE_ENV !== "production" && pool) {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

// Resilient DB instance: if DATABASE_URL is set, connect directly.
// If DATABASE_URL is not yet configured in Netlify environment variables,
// allow the site and build to complete gracefully without crashing.
export const db = pool
  ? drizzle(pool)
  : (new Proxy(
      {},
      {
        get() {
          console.warn(
            "Aviso: DATABASE_URL não configurada no ambiente. Configure no painel do Netlify (Site settings > Environment variables) com sua URL PostgreSQL (ex: Neon ou Supabase)."
          );
          return () => {
            throw new Error(
              "DATABASE_URL não configurada no Netlify. Por favor, adicione a variável DATABASE_URL com a URL do seu PostgreSQL."
            );
          };
        },
      }
    ) as unknown as ReturnType<typeof drizzle>);
