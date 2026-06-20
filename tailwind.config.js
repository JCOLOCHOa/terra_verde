/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        'hueso': '#FFFDF8',
        'crema': '#F5EBDD',
        'verde': {
          DEFAULT: '#3F5F2A',
          light: '#7D9A5A',
          dark: '#2A3F1A'
        },
        'dorado': {
          DEFAULT: '#B88A34',
          light: '#D8B76A',
          dark: '#8A6A24'
        },
        'texto': '#2A2A2A',
        'gris': '#707070',
        'card-border': '#E8DCC9'
      },
      fontFamily: {
        'serif': ['Georgia', 'Cambria', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}