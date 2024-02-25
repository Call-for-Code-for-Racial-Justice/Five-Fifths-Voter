// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  telemetry: true,
  devtools: { enabled: true },
  devServer: {
    port: 4007,
  },
  // TODO: revisit this for Carbon 11
  // Do not add Carbon anything here - it will cause loops and fail
  // css: ['@/assets/scss/theme.scss'],
  // You might see this solution from a search. This does not work either.
  // Do not add Carbon anything here - it will cause loops and fail
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: '@use "@/assets/scss/theme.scss" as *;',
  //       },
  //     },
  //   },
  // },
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-eslint-globals",
  ],
  routeRules: {
    "/api/**": { cors: false },
  },
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.json",
      },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "en",
  },
});
