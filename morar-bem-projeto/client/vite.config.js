import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['projetomorarbem.onrender.com'],
  },

  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['projetomorarbem.onrender.com'],
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})