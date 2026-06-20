<template>
  <div class="max-w-6xl mx-auto py-4 px-4 sm:px-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
      <div>
        <h2 class="text-2xl sm:text-3xl font-serif text-verde">Dashboard</h2>
      </div>
      
      <button 
        @click="descargarPDF" 
        class="btn-principal flex items-center gap-2 text-sm py-3 px-4 rounded-xl"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
        </svg>
        Descargar PDF
      </button>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <div class="card-terra text-center p-4">
        <IconVentas class="w-6 h-6 text-verde mx-auto mb-1" />
        <p class="text-xs text-gris uppercase tracking-wider">Ventas</p>
        <p class="text-xl sm:text-2xl font-bold text-verde">{{ data?.stats?.total_ventas || 0 }}</p>
      </div>
      <div class="card-terra text-center p-4">
        <IconDinero class="w-6 h-6 text-dorado mx-auto mb-1" />
        <p class="text-xs text-gris uppercase tracking-wider">Recaudado</p>
        <p class="text-xl sm:text-2xl font-bold text-dorado">Q{{ data?.stats?.total_recaudado_general || '0.00' }}</p>
      </div>
      <div class="card-terra text-center p-4">
        <IconHelados class="w-6 h-6 text-verde mx-auto mb-1" />
        <p class="text-xs text-gris uppercase tracking-wider">Helados</p>
        <p class="text-xl sm:text-2xl font-bold text-verde">{{ data?.stats?.total_helados_vendidos || 0 }}</p>
      </div>
      <div class="card-terra text-center p-4">
        <IconEstrella class="w-6 h-6 text-dorado mx-auto mb-1" />
        <p class="text-xs text-gris uppercase tracking-wider">Top</p>
        <p class="text-sm sm:text-base font-bold text-dorado truncate">{{ data?.stats?.sabor_mas_vendido || '-' }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <div class="card-terra p-4">
        <h3 class="text-base font-bold text-verde mb-3 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
          </svg>
          Ventas por Sabor
        </h3>
        
        <div v-if="chartData" class="h-56 sm:h-64">
          <Bar 
            :key="chartKey" 
            :data="chartData" 
            :options="chartOptions" 
          />
        </div>
        
        <div v-else class="h-56 flex items-center justify-center text-gris">
          <svg class="w-8 h-8 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          Cargando...
        </div>
      </div>

      <div class="card-terra p-4">
        <h3 class="text-base font-bold text-verde mb-3 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"/>
          </svg>
          Distribución
        </h3>
        
        <div v-if="doughnutData" class="h-56 sm:h-64">
          <Doughnut 
            :key="doughnutKey" 
            :data="doughnutData" 
            :options="doughnutOptions" 
          />
        </div>
        
        <div v-else class="h-56 flex items-center justify-center text-gris">
          <svg class="w-8 h-8 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          Cargando...
        </div>
      </div>
    </div>

    <div class="card-terra p-4">
      <h3 class="text-base font-bold text-verde mb-4 flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
        Ventas Recientes
      </h3>
      
      <div class="space-y-3 sm:hidden">
        <div 
          v-for="v in data?.recientes" 
          :key="v.id_venta"
          class="bg-crema/30 rounded-xl p-4 border border-card-border"
        >
          <div class="flex justify-between items-start mb-2">
            <span class="font-mono text-sm text-dorado font-bold">{{ v.codigo_orden }}</span>
            <span class="text-lg font-bold text-verde">Q{{ v.total_recaudado }}</span>
          </div>
          <p class="text-texto font-medium mb-1">{{ v.nombre_sabor }}</p>
          <div class="flex justify-between text-sm text-gris">
            <span>Cant: {{ v.cantidad }}</span>
            <span>{{ formatFecha(v.fecha_venta) }}</span>
          </div>
        </div>
      </div>

      <div class="hidden sm:block overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-verde text-white">
              <th class="px-4 py-3 text-left text-sm font-semibold rounded-tl-lg">Código</th>
              <th class="px-4 py-3 text-left text-sm font-semibold">Sabor</th>
              <th class="px-4 py-3 text-center text-sm font-semibold">Cant.</th>
              <th class="px-4 py-3 text-right text-sm font-semibold">Total</th>
              <th class="px-4 py-3 text-right text-sm font-semibold rounded-tr-lg">Fecha</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-card-border">
            <tr 
              v-for="v in data?.recientes" 
              :key="v.id_venta"
              class="hover:bg-crema/30 transition-colors"
            >
              <td class="px-4 py-3 text-sm font-mono text-dorado">{{ v.codigo_orden }}</td>
              <td class="px-4 py-3 text-sm">{{ v.nombre_sabor }}</td>
              <td class="px-4 py-3 text-sm text-center font-semibold">{{ v.cantidad }}</td>
              <td class="px-4 py-3 text-sm text-right font-bold text-verde">Q{{ v.total_recaudado }}</td>
              <td class="px-4 py-3 text-sm text-right text-gris">{{ formatFecha(v.fecha_venta) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import IconVentas from '~/components/icons/IconVentas.vue'
import IconDinero from '~/components/icons/IconDinero.vue'
import IconHelados from '~/components/icons/IconHelados.vue'
import IconEstrella from '~/components/icons/IconEstrella.vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const { data } = await useFetch('/api/dashboard')

const chartKey = computed(() => {
  if (!data.value?.porSabor) return 'empty'
  return 'chart-' + data.value.porSabor.map(s => s.cantidad_total).join('-')
})

const doughnutKey = computed(() => {
  if (!data.value?.porSabor) return 'empty'
  return 'doughnut-' + data.value.porSabor.map(s => s.recaudado_total).join('-')
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { display: false },
    tooltip: {
      backgroundColor: '#3F5F2A',
      titleColor: '#FFFDF8',
      bodyColor: '#FFFDF8',
      borderColor: '#B88A34',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      callbacks: {
        label: function(context) {
          return 'Cantidad: ' + context.parsed.y
        }
      }
    }
  },
  scales: {
    y: { 
      beginAtZero: true, 
      grid: { color: '#F5EBDD' },
      ticks: { color: '#707070' }
    },
    x: { 
      grid: { display: false },
      ticks: { color: '#707070', font: { size: 10 } }
    }
  },
  animation: {
    duration: 800,
    easing: 'easeOutQuart',
    onComplete: function() {
      this.options.animation = false
    }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { 
      position: 'right',
      labels: {
        color: '#2A2A2A',
        font: { family: 'Inter', size: 11 },
        padding: 15,
        usePointStyle: true
      }
    },
    tooltip: {
      backgroundColor: '#3F5F2A',
      titleColor: '#FFFDF8',
      bodyColor: '#FFFDF8',
      borderColor: '#B88A34',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      callbacks: {
        label: function(context) {
          return ' Q' + context.parsed
        }
      }
    }
  },
  animation: {
    animateRotate: true,
    duration: 800,
    easing: 'easeOutQuart',
    onComplete: function() {
      this.options.animation = false
    }
  }
}

const chartData = computed(() => {
  if (!data.value?.porSabor) return null
  return {
    labels: data.value.porSabor.map(s => s.nombre_sabor),
    datasets: [{
      label: 'Cantidad vendida',
      data: data.value.porSabor.map(s => s.cantidad_total),
      backgroundColor: ['#3F5F2A', '#B88A34', '#7D9A5A', '#D8B76A', '#2A3F1A', '#8A6A24', '#F5EBDD', '#A67C52', '#5A7247', '#C9A84C', '#8B6914', '#4A6741', '#D4A574'],
      borderRadius: 6,
      borderSkipped: false
    }]
  }
})

const doughnutData = computed(() => {
  if (!data.value?.porSabor) return null
  return {
    labels: data.value.porSabor.map(s => s.nombre_sabor),
    datasets: [{
      data: data.value.porSabor.map(s => s.recaudado_total),
      backgroundColor: ['#3F5F2A', '#B88A34', '#7D9A5A', '#D8B76A', '#2A3F1A', '#8A6A24', '#F5EBDD', '#A67C52', '#5A7247', '#C9A84C', '#8B6914', '#4A6741', '#D4A574'],
      borderWidth: 2,
      borderColor: '#FFFDF8',
      hoverOffset: 10
    }]
  }
})

const formatFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: '2-digit', 
    month: 'short', 
    hour: '2-digit', 
    minute: '2-digit'
  })
}

const descargarPDF = async () => {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'letter' })
  
  const w = doc.internal.pageSize.getWidth()
  const h = doc.internal.pageSize.getHeight()
  
  const verde = [63, 95, 42]
  const dorado = [184, 138, 52]
  const hueso = [255, 253, 248]
  const crema = [245, 235, 221]
  
  doc.setFillColor(...hueso)
  doc.rect(0, 0, w, h, 'F')
  
  doc.setFillColor(...verde)
  doc.rect(0, 0, w, 35, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('TERRA VERDE', 20, 20)
  
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(10)
  doc.text('Helados Artesanales - Reporte de Ventas', 20, 28)
  
  doc.setTextColor(...dorado)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text(new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }), w - 20, 20, { align: 'right' })
  
  const stats = [
    { label: 'Total Ventas', value: data.value?.stats?.total_ventas || 0 },
    { label: 'Total Recaudado', value: `Q${data.value?.stats?.total_recaudado_general || '0.00'}` },
    { label: 'Helados Vendidos', value: data.value?.stats?.total_helados_vendidos || 0 },
    { label: 'Mas Vendido', value: data.value?.stats?.sabor_mas_vendido || '-' }
  ]
  
  let x = 20
  stats.forEach(stat => {
    doc.setFillColor(...crema)
    doc.roundedRect(x, 45, 55, 25, 3, 3, 'F')
    doc.setTextColor(...verde)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(stat.label.toUpperCase(), x + 5, 53)
    doc.setFontSize(14)
    doc.text(String(stat.value), x + 5, 64)
    x += 65
  })
  
  doc.setFillColor(...verde)
  doc.rect(20, 80, w - 40, 10, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('CODIGO', 25, 87)
  doc.text('SABOR', 70, 87)
  doc.text('CANT.', 140, 87)
  doc.text('TOTAL', 170, 87)
  doc.text('FECHA', 210, 87)
  
  let y = 95
  doc.setTextColor(42, 42, 42)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  
  data.value?.recientes?.forEach(v => {
    doc.text(v.codigo_orden, 25, y)
    doc.text(v.nombre_sabor, 70, y)
    doc.text(String(v.cantidad), 145, y)
    doc.text(`Q${v.total_recaudado}`, 170, y)
    doc.text(formatFecha(v.fecha_venta), 210, y)
    y += 8
  })
  
  doc.setFillColor(...verde)
  doc.rect(0, h - 15, w, 15, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.text('Terra Verde - Helados Artesanales', w/2, h - 7, { align: 'center' })
  
  doc.save(`terra-verde-reporte-${Date.now()}.pdf`)
}
</script>