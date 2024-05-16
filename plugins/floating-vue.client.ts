import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FloatingVue, {
    themes: {
      select: {
        $resetCss: true,
        triggers: ["click"],
        autoHide: true,
        placement: "bottom",
        distance: 0,
        skipTransition: true,
        delay: {
          show: 0,
          hide: 0,
        },
      },
    },
  });
});
