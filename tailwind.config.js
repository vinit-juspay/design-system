/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E0F2FF",
          300: "#90CAF9",
          500: "#42A5F5",
          600: "#1E88E5",
          700: "#1565C0",
          800: "#0D47A1",
        },
      },
    },
  },
  plugins: []
};
