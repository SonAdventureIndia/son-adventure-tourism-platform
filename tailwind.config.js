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
        pine: {
          950: '#06130c',
          900: '#0e261a',
          800: '#153826',
          700: '#1b4d34',
        },
        canyon: {
          500: '#d9653b',
          600: '#c85a32',
          700: '#ac4a26',
        },
        sand: {
          50: '#fdfbf7',
          100: '#f9f6ef',
          200: '#f1ebd9',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Manrope', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      }
    },
  },
  plugins: [],
};
