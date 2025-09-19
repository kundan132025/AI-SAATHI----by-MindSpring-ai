import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React and core libraries
          'react-vendor': ['react', 'react-dom'],
          // Router
          'router': ['react-router-dom'],
          // Charts and data visualization  
          'charts': ['chart.js', 'react-chartjs-2', 'recharts'],
          // UI libraries
          'ui-libs': ['framer-motion', 'react-icons', 'lucide-react'],
          // Auth and utilities
          'utils': ['axios', 'jwt-decode', 'react-simple-typewriter']
        }
      }
    },
    // Increase chunk size warning limit to reduce warnings
    chunkSizeWarningLimit: 1000
  }
})
