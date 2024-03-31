// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      meta: [{ name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" }],
    },
  },
  css: ["~/assets/style/main.scss"],
  modules: ["@nuxtjs/supabase", "@pinia/nuxt"],
  supabase: { redirect: false }, // disable supabase default redirect rules
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
