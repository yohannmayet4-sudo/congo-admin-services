import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://admin:admin123@localhost:5432/congo_admin';

export const database = new Pool({
  connectionString: DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

database.on('error', (err: Error) => {
  console.error('Erreur inattendue sur le client idle:', err);
});

export async function getClient(): Promise<PoolClient> {
  return database.connect();
}

export async function closeDatabase(): Promise<void> {
  await database.end();
}
