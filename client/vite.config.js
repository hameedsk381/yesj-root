import MillionLint from '@million/lint';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [MillionLint.vite({
    enabled: true
  }), react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  define: {
    // This will allow us to use environment variables in our client-side code
    __APP_ENV__: JSON.stringify(process.env.APP_ENV || 'development')
  }
})