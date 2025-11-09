/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mobinel-purple': '#7C3AED',
        'mobinel-purple-light': '#A78BFA',
      },
    },
  },
  plugins: [],
}
