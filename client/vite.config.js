import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('lucide-react') || id.includes('react-router-dom')) {
            return 'vendor-ui';
          }
          if (id.includes('leaflet') || id.includes('react-leaflet')) {
            return 'vendor-map';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096, // Inline small assets
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
