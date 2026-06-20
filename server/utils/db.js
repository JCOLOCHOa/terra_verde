import { Pool } from 'pg'

let pool

export async function getPool() {
  if (!pool) {
    const config = useRuntimeConfig()
    
    // Debug: ver si la URL se está leyendo
    console.log('🔍 DATABASE_URL:', config.databaseUrl ? '✅ Cargada' : '❌ VACÍA')
    
    pool = new Pool({
      connectionString: config.databaseUrl,
      ssl: {
        rejectUnauthorized: false
      }
    })
    
    // Test connection
    const client = await pool.connect()
    console.log('✅ Conectado a Supabase PostgreSQL')
    client.release()
  }
  return pool
}

export { Pool }