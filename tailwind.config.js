/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Orbitron", "sans-serif"],
        secondary: ["Inter", "sans-serif"],
      },
      colors: {
        "blue-dark": "#0A0B23",
        "blue-light": "#1B1C3D",
        "blue-accent": "#2E78F0",
        white: "#E7E7E7",
      },
    },
  },
  plugins: [],
};
