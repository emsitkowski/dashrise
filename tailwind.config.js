/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      sans: ["Lato", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          8: "rgba(0, 0, 255, 0.08)",
          50: "#EBEBFF",
          500: "#0101FF",
        },
        dark: {
          500: "#00001A",
        },
      },
    },
  },
  plugins: [],
};
