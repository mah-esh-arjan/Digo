/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0047AB", // Royal Blue
          dark: "#033276",
        },
        navy: {
          DEFAULT: "#051937", // Deep Navy Secondary
        },
        accent: {
          DEFAULT: "#00E0FF", // Cyan Accent
        },
        background: "#FFFFFF",
        surface: "#F9FAFB",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}