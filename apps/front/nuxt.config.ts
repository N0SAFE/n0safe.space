import type { NuxtPage } from 'nuxt/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  modules: [
    '@nuxtjs/web-vitals',
    '@nuxtjs/tailwindcss',
    'nuxt-vitest',
    'nuxt-simple-sitemap',
    '@pinia/nuxt',
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      apiUrl: process.env.API_URL || 'http://localhost:3333',
    },
  },
  sitemap: {
    dynamicUrlsApiEndpoint: '/__sitemap',
  },
  webVitals: {
    provider: 'log',
    debug: false, // debug enable metrics reporting on dev environments
    disabled: false,
  },
})
