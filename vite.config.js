import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175, // <-- choose >1024, e.g., 10002
    host: true,  // optional, exposes server on your EC2 public IP
  },
})
