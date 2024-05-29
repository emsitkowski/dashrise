// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  spaLoadingTemplate: "spa-loading.html",
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "dashrise – Personal dashboard",
      meta: [{ name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" }],
      link: [
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      ],
    },
  },
  css: ["~/assets/style/main.scss"],
  modules: ["@nuxtjs/supabase", "@pinia/nuxt", "@vite-pwa/nuxt"],
  components: [{ path: "~/components", pathPrefix: false }],
  supabase: { redirect: false }, // disable supabase default redirect rules
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  pwa: {
    strategies: "injectManifest",
    manifest: {
      name: "dashrise",
      short_name: "dashrise",
      icons: [
        {
          src: "/app-icon.png?v=2.0",
          sizes: "144x144",
          type: "image/png",
        },
      ],
      theme_color: "#f7f7f7",
      display: "standalone",
    },
    workbox: {
      navigateFallback: "/",
      navigationPreload: true,
      runtimeCaching: [
        {
          // Cache HTML documents with Network First strategy
          urlPattern: ({ request }) => request.mode === "navigate",
          handler: "NetworkFirst",
          options: {
            cacheName: "html-cache",
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
            },
          },
        },
      ],
      cacheId: "dashrise-cache",
      globPatterns: ["**/*.{js,css,html}"],
    },
  },
});
