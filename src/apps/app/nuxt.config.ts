export default defineNuxtConfig({
  extends: [
    '@demo/ui',
    '@demo/core-admin',
    '@demo/cms-admin',
  ],
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-01-27',
  nitro: {
    experimental: {
      asyncContext: true,
    },
    cloudflare: {
      wrangler: {
        name: 'nuxt-layers-cloudflare-issue-v2',
      },
    },
  },
  typescript: {
    // https://github.com/nuxt/nuxt/issues/20155
    includeWorkspace: true,
  },
  eslint: {
    checker: true,
  },
})
