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
          "2%": "rgba(0, 0, 255, 0.02)",
          "4%": "rgba(0, 0, 255, 0.04)",
          "8%": "rgba(0, 0, 255, 0.08)",
          "32%": "rgba(0, 0, 255, 0.32)",
          50: "#EBEBFF",
          500: "#0101FF",
        },
        dark: {
          "2%": "rgba(0, 0, 26, 0.02)",
          "4%": "rgba(0, 0, 26, 0.04)",
          "32%": "rgba(0, 0, 26, 0.32)",
          "60%": "rgba(0, 0, 26, 0.6)",
          "80%": "rgba(0, 0, 26, 0.8)",
          500: "#00001A",
        },
        light: {
          50: "#f7f7f7",
        },
        "white-40%": "rgba(255, 255, 255, 0.4)",
        "white-60%": "rgba(255, 255, 255, 0.6)",
      },
    },
  },
  plugins: [],
};
