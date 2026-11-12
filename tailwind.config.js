/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pine: { 950: '#07150e', 900: '#0c2217', 800: '#143826', 700: '#1b4d34' },
        gold: { 400: '#e9c974', 500: '#d4a537', 600: '#a87d22' },
        canyon: { 500: '#d9653b', 600: '#c85a32', 700: '#ac4a26' }
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Manrope', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace']
      }
    },
  },
  plugins: [],
};
