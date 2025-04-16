import { createResolver } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },
  css: [resolve('./assets/css/main.css')],
  compatibilityDate: '2025-01-27',
  vite: {
    plugins: [tailwindcss()],
  },
})
