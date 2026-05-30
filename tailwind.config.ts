import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0047AB", dark: "#033276" },
        navy: { DEFAULT: "#051937" },
        accent: { DEFAULT: "#00E0FF" },
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

export default config
