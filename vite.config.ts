import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/auth': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/tasks': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        dashboard: fileURLToPath(new URL('./index.html', import.meta.url)),
        login: fileURLToPath(new URL('./login.html', import.meta.url)),
        register: fileURLToPath(new URL('./register.html', import.meta.url)),
        todoDetails: fileURLToPath(new URL('./todo.html', import.meta.url)),
      },
    },
  },
})
