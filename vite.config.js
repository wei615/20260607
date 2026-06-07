import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
   base: '/20260607/',   // ← 加這行，和倉庫名稱一樣
})
