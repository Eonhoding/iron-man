/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'iron-red': '#E63946',
        'iron-gold': '#FFD700',
        'iron-slate': '#1E293B',
      },
    },
  },
  plugins: [],
}
