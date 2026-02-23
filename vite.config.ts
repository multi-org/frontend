import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8083",
    //     changeOrigin: true,
    //     secure: false,
    //   }
    // }
    proxy: { //under test
      "/api": {
        target:"http://backend:8083",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
