import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

/**
 * Dedicated development port for this project so it never collides with the
 * other local projects on this machine. strictPort makes Vite fail loudly
 * instead of silently hopping to a random port.
 */
const DEV_PORT = 5187

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: DEV_PORT,
    strictPort: true,
  },
  preview: {
    port: DEV_PORT,
    strictPort: true,
  },
})
