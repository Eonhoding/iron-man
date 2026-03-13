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
        'iron-red-dark': '#C1121F',
        'iron-red-light': '#FF6B6B',
        'iron-gold': '#FFD700',
        'iron-gold-dark': '#FFA500',
        'iron-slate': '#1E293B',
        'iron-slate-dark': '#0F172A',
        'iron-blue': '#3B82F6',
        'iron-green': '#10B981',
        'iron-orange': '#F97316',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'iron': '0 4px 6px -1px rgba(231, 57, 70, 0.2)',
        'iron-lg': '0 10px 15px -3px rgba(231, 57, 70, 0.3)',
      },
      backgroundImage: {
        'iron-gradient': 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
        'iron-hero': 'linear-gradient(135deg, #1E293B 0%, #0F172A 50%, #E63946 100%)',
      },
    },
  },
  plugins: [],
}
