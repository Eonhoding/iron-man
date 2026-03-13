/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Vermelho Iron Man
        primary: '#DC2626',
        'primary-dark': '#B91C1C',
        'primary-light': '#EF4444',
        
        // Secondary - Preto/Aço
        secondary: '#0F172A',
        'secondary-dark': '#020617',
        
        // Accent - Dourado
        accent: '#F59E0B',
        
        // Neutrals
        background: '#FAFAFA',
        surface: '#FFFFFF',
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'large': '0 12px 48px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
