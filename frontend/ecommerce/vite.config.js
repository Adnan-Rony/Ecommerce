import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // ── Code splitting — each route loads only what it needs ──────────
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks — split large libraries into separate files
          'react-vendor':  ['react', 'react-dom', 'react-router-dom'],
          'query-vendor':  ['@tanstack/react-query'],
          'stripe-vendor': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          'swiper-vendor': ['swiper'],
          'ui-vendor':     ['react-hot-toast', 'sweetalert2'],
        },
      },
    },

    // ── Increase chunk size warning limit ─────────────────────────────
    chunkSizeWarningLimit: 1000,

    // ── Minify ────────────────────────────────────────────────────────
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // removes console.log in production
        drop_debugger: true,
      },
    },

    // ── Source maps off in production (smaller files) ─────────────────
    sourcemap: false,
  },

  // ── Dev server ────────────────────────────────────────────────────────
  server: {
    port: 5173,
    open: true,
  },

  // ── Optimize deps — pre-bundle for faster dev startup ────────────────
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