// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET || "",
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3000/api",
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-lucide-icons",
    "@element-plus/nuxt",
    "@vee-validate/nuxt",
  ],
  lucide: {
    namePrefix: "Icon",
  },
  routeRules: {
    "/admin/**": { ssr: false },
  },
  app: {
    head: {
      titleTemplate: "%s - SMT Store",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:site_name", content: "SMT Store" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  devServer: {
    port: 4000,
  },
});
