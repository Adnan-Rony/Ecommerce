import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // ── Code splitting ────────────────────────────────────────────────
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor':  ['react', 'react-dom', 'react-router-dom'],
          'query-vendor':  ['@tanstack/react-query'],
          'stripe-vendor': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          'swiper-vendor': ['swiper'],
          'ui-vendor':     ['react-hot-toast', 'sweetalert2'],
        },
      },
    },

    chunkSizeWarningLimit: 1000,

    // ── Use esbuild (built into Vite, no install needed) ──────────────
    minify: 'esbuild',

    sourcemap: false,
  },

  server: {
    port: 5173,
    open: true,
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'axios',
      'swiper',
    ],
  },
})