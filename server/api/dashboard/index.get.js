import { getPool } from '~/server/utils/db'

export default defineEventHandler(async () => {
  const pool = await getPool()
  
  const [dashboard, porSabor, recientes] = await Promise.all([
    // Stats generales
    pool.query('SELECT * FROM vista_dashboard'),
    
    // Para gráfico de barras
    pool.query('SELECT * FROM ventas_por_sabor'),
    
    // Últimas 10 ventas
    pool.query(`
      SELECT v.id_venta, v.codigo_orden, s.nombre_sabor, 
             v.cantidad, v.total_recaudado, v.fecha_venta
      FROM ventas v
      JOIN sabores s ON v.id_sabor = s.id_sabor
      ORDER BY v.fecha_venta DESC
      LIMIT 10
    `)
  ])
  
  return {
    stats: dashboard.rows[0],
    porSabor: porSabor.rows,
    recientes: recientes.rows
  }
})