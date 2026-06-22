// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Souze-San || Portfolio",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  routeRules: {
    "/": { prerender: true },
    "/projects": { prerender: true },
    "/exp": { prerender: true },
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/image"],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    transpile: ["gsap"],
  },

});
