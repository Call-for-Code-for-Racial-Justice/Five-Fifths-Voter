// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: { enabled: true },
  devtools: { enabled: true },

  devServer: {
    port: 4007,
  },
  auth: {
    // Override with AUTH_ORIGIN environment variable in production
    // https://auth.sidebase.io/guide/application-side/configuration#originenvkey
    baseURL: "http://localhost:4007/api/auth",
    isEnabled: true,
    provider: {
      type: "authjs",
      defaultProvider: process.env.AUTH_PROVIDER || "ibmid",
    },
    sessionRefresh: {
      enablePeriodically: 1000 * 60 * 10, // 10 minutes
      enableOnWindowFocus: true,
    },
    globalAppMiddleware: false, // enable to protect the entire app
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
    "@sidebase/nuxt-auth",
    "@nuxt/eslint",
  ],
  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET,
  },
  routeRules: {
    "/api/**": { cors: false },
  },

  i18n: {
    locales: [
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "ar",
        file: "ar.json",
      },
      {
        code: "es",
        file: "es.json",
      },
      {
        code: "hi",
        file: "hi.json",
      },
      {
        code: "ko",
        file: "ko.json",
      },
      {
        code: "tl",
        file: "tl.json",
      },
      {
        code: "fa",
        file: "fa.json",
      },
      {
        code: "ja",
        file: "ja.json",
      },
      {
        code: "ru",
        file: "ru.json",
      },
      {
        code: "vi",
        file: "vi.json",
      },
      {
        code: "zh",
        file: "zh_Hans_CN.json",
      },
      {
        code: "zh-TW",
        file: "zh_Hans_TW.json",
      },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "en",
    strategy: "no_prefix",
  },

  compatibilityDate: "2025-02-13",
});