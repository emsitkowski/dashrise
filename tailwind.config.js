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
          4: "rgba(0, 0, 255, 0.04)",
          8: "rgba(0, 0, 255, 0.08)",
          50: "#EBEBFF",
          500: "#0101FF",
        },
        dark: {
          500: "#00001A",
        },
        light: {
          50: "#f7f7f7",
        },
      },
    },
  },
  plugins: [],
};
