<template>
  <div class="max-w-md mx-auto py-6 px-4">
    <!-- Logo más grande -->
    <div class="text-center mb-6">
      <img 
        src="/logo-terra-verde.png" 
        alt="Terra Verde" 
        class="w-36 h-36 sm:w-44 sm:h-44 object-contain mx-auto mb-4"
      />
      <h2 class="text-3xl font-serif text-verde">Nueva Venta</h2>
    </div>

    <!-- Card con padding generoso -->
    <div class="card-terra p-6 sm:p-8">
      <form @submit.prevent="registrarVenta" class="space-y-6">
        
        <!-- Select de sabor -->
        <div>
          <label class="block text-sm font-bold text-verde uppercase tracking-wider mb-3">
            Sabor de Helado
          </label>
          <select 
            v-model="form.id_sabor" 
            class="w-full bg-crema/30 border-2 border-card-border rounded-xl px-4 py-4 text-texto text-lg focus:ring-2 focus:ring-verde focus:border-verde outline-none transition-all appearance-none cursor-pointer"
            required
          >
            <option value="" disabled selected>Selecciona un sabor...</option>
            <option 
              v-for="s in sabores" 
              :key="s.id_sabor" 
              :value="String(s.id_sabor)"
            >
              {{ s.nombre_sabor }}
            </option>
          </select>
        </div>

        <!-- Cantidad - Botones dentro del ancho -->
        <div>
          <label class="block text-sm font-bold text-verde uppercase tracking-wider mb-3">
            Cantidad
          </label>
          <div class="flex items-center gap-3">
            <button 
              type="button"
              @click="form.cantidad > 1 ? form.cantidad-- : null"
              class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-verde text-white hover:bg-verde-dark transition-all flex items-center justify-center text-2xl font-bold active:scale-90 shadow-md flex-shrink-0"
            >
              −
            </button>
            
            <input
              v-model.number="form.cantidad"
              type="number"
              min="1"
              class="flex-1 bg-crema/30 border-2 border-card-border rounded-xl px-2 py-3 text-texto text-center text-2xl sm:text-3xl font-bold focus:ring-2 focus:ring-verde focus:border-verde outline-none min-w-0"
              required
            />
            
            <button 
              type="button"
              @click="form.cantidad++"
              class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-verde text-white hover:bg-verde-dark transition-all flex items-center justify-center text-2xl font-bold active:scale-90 shadow-md flex-shrink-0"
            >
              +
            </button>
          </div>
        </div>

        <!-- Total preview -->
        <div v-if="totalPreview > 0" class="bg-verde/10 rounded-xl p-5 text-center border-2 border-verde/20">
          <p class="text-sm text-verde uppercase tracking-wider mb-1">Total a pagar</p>
          <p class="text-4xl sm:text-5xl font-bold text-verde font-serif">Q{{ totalPreview }}</p>
        </div>

        <!-- Botón registrar -->
        <button 
          type="submit" 
          :disabled="cargando || !form.id_sabor"
          class="w-full btn-principal py-4 text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all shadow-lg"
        >
          <span v-if="cargando" class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Registrando...
          </span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Registrar Venta
          </span>
        </button>
      </form>

      <!-- Mensaje de éxito -->
      <div v-if="exito" class="mt-5 bg-verde/10 border-l-4 border-verde rounded-r-xl p-4">
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-verde flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div>
            <p class="text-verde font-bold text-lg">Venta registrada</p>
            <p class="text-sm text-verde/80 font-mono">Código: {{ exito.codigo_orden }}</p>
            <p class="text-sm text-verde/80">Total: Q{{ exito.total_recaudado }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Link al dashboard -->
    <div class="mt-6 text-center">
      <NuxtLink to="/dashboard" class="inline-flex items-center gap-2 text-dorado hover:text-dorado-light transition-colors">
        <span>Ir al Dashboard</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const sabores = ref([])
const cargando = ref(false)
const exito = ref(null)
const form = reactive({
  id_sabor: '',
  cantidad: 1
})

onMounted(async () => {
  try {
    sabores.value = await $fetch('/api/sabores')
  } catch (err) {
    alert('Error al cargar sabores. Recarga la página.')
  }
})

const totalPreview = computed(() => {
  if (!form.id_sabor || !form.cantidad) return 0
  const sabor = sabores.value.find(s => String(s.id_sabor) === form.id_sabor)
  return sabor ? sabor.precio_unitario * form.cantidad : 0
})

const registrarVenta = async () => {
  if (!form.id_sabor) {
    alert('Selecciona un sabor primero')
    return
  }

  cargando.value = true
  exito.value = null
  
  try {
    const resultado = await $fetch('/api/ventas', {
      method: 'POST',
      body: {
        id_sabor: parseInt(form.id_sabor),
        cantidad: parseInt(form.cantidad)
      }
    })
    
    exito.value = resultado.venta
    form.id_sabor = ''
    form.cantidad = 1
    
    setTimeout(() => {
      exito.value = null
    }, 4000)
    
  } catch (err) {
    alert('Error: ' + (err.message || 'No se pudo registrar la venta'))
  } finally {
    cargando.value = false
  }
}
</script>