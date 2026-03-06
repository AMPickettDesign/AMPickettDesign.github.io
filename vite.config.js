import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: set base to '/<repo-name>/' when deploying
  // For custom domain or root deploy, use '/'
  base: '/',
})
