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
        forest: { 950: '#0a1410', 900: '#0e261a', 800: '#1b432e' },
        gold: { 400: '#e9c974', 500: '#d4a537', 600: '#a87d22' },
        terracotta: { 600: '#c85a32', 700: '#ac4a26' }
      }
    },
  },
  plugins: [],
};
