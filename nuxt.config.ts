// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},

      autoprefixer: {},
    },
  },
  css: ["@/assets/main.css"],
  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
  ],
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@pinia/colada-nuxt",
  ],
  pinia: {
    storesDirs: ["@/stores/**"],
  },
});
