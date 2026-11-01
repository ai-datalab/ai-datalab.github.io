import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the build works on any GitHub Pages path (for example /AI-DataLab/).
export default defineConfig({
  plugins: [react()],
  base: './',
})
