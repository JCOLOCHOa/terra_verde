<template>
  <div class="min-h-screen bg-hueso flex flex-col items-center justify-center px-6 py-8">
    <div class="mb-8 animate-fade-in-up">
      <img 
        src="/logo-terra-verde.png" 
        alt="Terra Verde" 
        class="w-56 h-56 sm:w-64 sm:h-64 object-contain drop-shadow-xl mx-auto"
      />
    </div>

    <h1 class="text-4xl sm:text-5xl font-serif text-verde mb-2 tracking-wide text-center animate-fade-in-up delay-200">
      Terra Verde
    </h1>

    <p class="text-dorado text-base sm:text-lg mb-12 font-light tracking-[0.3em] uppercase text-center animate-fade-in-up delay-400">
      Helados Artesanales
    </p>

    <div class="flex flex-col gap-4 w-full max-w-sm animate-fade-in-up delay-600">
      <NuxtLink 
        to="/nueva-venta" 
        class="btn-principal text-center text-lg py-5 rounded-xl shadow-md active:scale-95 transition-transform"
      >
        <span class="flex items-center justify-center gap-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Nueva Venta
        </span>
      </NuxtLink>

      <NuxtLink 
        to="/dashboard" 
        class="btn-secundario text-center text-lg py-5 rounded-xl shadow-md active:scale-95 transition-transform"
      >
        <span class="flex items-center justify-center gap-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
          </svg>
          Dashboard
        </span>
      </NuxtLink>
    </div>

    <p class="mt-12 text-gris text-xs tracking-wide text-center">
      © 2026 Terra Verde
    </p>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })
</script>

<style scoped>
.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }
.delay-600 { animation-delay: 0.6s; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>