import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Environment variables are automatically picked up if prefixed with VITE_
  // No need to manually define them here
})
