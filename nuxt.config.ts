// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},

      autoprefixer: {},
    },
  },
  css: ["@/assets/main.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@pinia/colada-nuxt",
  ],
});
