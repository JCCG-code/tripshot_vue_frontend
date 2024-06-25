import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // Url base
  base: '/tripshot_vue_frontend/',
  // Build options
  build: {
    emptyOutDir: false
  },
  // Plugins
  plugins: [vue()],
  // Utils
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
