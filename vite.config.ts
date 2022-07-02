import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [vue(), viteCompression({ filter: /\.(js|mjs|css|html)$/i })],

  // 開発用プロキシ
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7001/',
        changeOrigin: true,
      },
    },
  },
})
