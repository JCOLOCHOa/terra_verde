<template>
  <div class="min-h-screen bg-hueso">
    <nav class="bg-verde text-white shadow-lg sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <img 
            src="/logo-terra-verde.png" 
            alt="Terra Verde" 
            class="w-12 h-12 object-contain"
          />
          <span class="font-serif text-xl tracking-wide group-hover:text-dorado-light transition-colors duration-300">
            Terra Verde
          </span>
        </NuxtLink>

        <div class="flex gap-4 items-center">
          <NuxtLink 
            to="/nueva-venta" 
            class="flex items-center gap-1 hover:text-dorado-light transition-all duration-300 text-sm sm:text-base"
            active-class="text-dorado-light"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            <span class="hidden sm:inline">Venta</span>
          </NuxtLink>

          <NuxtLink 
            to="/dashboard" 
            class="flex items-center gap-1 hover:text-dorado-light transition-all duration-300 text-sm sm:text-base"
            active-class="text-dorado-light"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
            </svg>
            <span class="hidden sm:inline">Dashboard</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <main>
      <slot />
    </main>
  </div>
</template>