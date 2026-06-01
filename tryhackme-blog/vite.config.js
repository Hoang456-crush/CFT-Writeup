import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    
  ],
  base: '/CFT-Writeup/',  // 👈 Add this line (Make sure it matches your repo name exactly)

  
})