import type { NuxtPage } from "nuxt/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true
    },
    modules: ["nuxt-directus", "@nuxtjs/web-vitals", "@nuxtjs/tailwindcss", "nuxt-vitest", "nuxt-simple-sitemap"],
    directus: {
        url: "http://localhost:8065",
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
    }
});
