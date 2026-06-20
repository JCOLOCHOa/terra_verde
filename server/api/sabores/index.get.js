import { getPool } from '~/server/utils/db'

export default defineEventHandler(async () => {
  const pool = await getPool()
  const result = await pool.query(
    'SELECT id_sabor, nombre_sabor, categoria, precio_unitario FROM sabores WHERE activo = true ORDER BY nombre_sabor'
  )
  return result.rows
})