export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],
  supabase: {
    redirect: false
  },
  css: ['~/assets/css/main.css'],
  ssr: false,
  nitro: {
    preset: 'static'
  },
  // IMPORTANTE: Ruta base para GitHub Pages
  app: {
    baseURL: '/terra_verde/'
  },
  compatibilityDate: '2026-06-18'
})
