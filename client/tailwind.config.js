/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f9f9f9",
        secondary: "#f2f2f2",
      },
    },
    fontFamily: {
      'kanit': ['Kanit'],
    },
  },
  plugins: [],
}

