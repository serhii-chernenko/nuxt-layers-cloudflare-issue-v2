export default defineNuxtConfig({
  extends: ['@demo/integration-cloudflare', '@demo/ui', '@demo/core-admin'],
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },
  compatibilityDate: '2025-01-27',
  nitro: {
    cloudflare: {
      wrangler: {
        kv_namespaces: [
          {
            binding: 'KV_CMS',
            id: process.env.KV_ID ?? 'SET_IN_ENV',
          },
        ],
        d1_databases: [
          {
            binding: 'DB_CMS',
            database_id: process.env.DB_ID ?? 'SET_IN_ENV',
          },
        ],
      },
    },
  },
})
