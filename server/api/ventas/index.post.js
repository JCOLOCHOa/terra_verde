import { getPool } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const pool = await getPool()
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    // Calcular total
    const saborResult = await client.query(
      'SELECT precio_unitario FROM sabores WHERE id_sabor = $1',
      [body.id_sabor]
    )

    if (saborResult.rows.length === 0) {
      throw new Error('Sabor no encontrado')
    }

    const precio = saborResult.rows[0].precio_unitario
    const total = precio * body.cantidad

    // Insertar venta
    const ventaResult = await client.query(
      `INSERT INTO ventas (id_sabor, cantidad, total_recaudado, fecha_venta)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
       RETURNING id_venta, codigo_orden, total_recaudado, fecha_venta`,
      [body.id_sabor, body.cantidad, total]
    )

    await client.query('COMMIT')

    return {
      success: true,
      venta: ventaResult.rows[0]
    }
  } catch (err) {
    await client.query('ROLLBACK')
    throw createError({ statusCode: 500, statusMessage: err.message })
  } finally {
    client.release()
  }
})