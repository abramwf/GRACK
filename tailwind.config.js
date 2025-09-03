/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#070F2B',
        secondary: '#1B1A55',
        accent: '#535C91',
        neutral: '#9290C3',
      },
      fontFamily: {
        orbitron: ['Orbitron Variable', 'sans-serif'],
        lexenddeca: ['Lexend Deca Variable', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
