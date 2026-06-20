export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  ssr: false,
  nitro: {
    preset: 'static'
  },
  // IMPORTANTE: Ruta base para GitHub Pages
  app: {
    baseURL: '/terraverde/'
  },
  compatibilityDate: '2026-06-18'
})
