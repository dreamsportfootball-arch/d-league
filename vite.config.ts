// 檔案路徑：d-league web/vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ✅ 修正：指定基礎路徑
  // 由於您的 GitHub Pages 儲存庫名稱是 'd-league'，
  // 網站會部署在 https://dreamsportfootball-arch.github.io/d-league/
  // 所以必須明確設定 base 為 '/d-league/'。
  base: '/d-league/',
})