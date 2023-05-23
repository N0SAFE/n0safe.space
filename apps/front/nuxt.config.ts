// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true
    },
    modules: ["nuxt-directus", "@nuxtjs/web-vitals", "@nuxtjs/tailwindcss", "nuxt-vitest", "@nuxtjs/i18n", "nuxt-simple-sitemap"],
    directus: {
        url: "http://193.70.40.80:8065",
        autoFetch: true,
        devtools: true
    },
    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }
    },
    sitemap: {
        dynamicUrlsApiEndpoint: "/__sitemap"
    },
    webVitals: {
        provider: "log",
        debug: true, // debug enable metrics reporting on dev environments
        disabled: false
    },

    i18n: {
        vueI18n: "./i18n.config.ts"
    }
});
