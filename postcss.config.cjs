// 檔案路徑：postcss.config.js

module.exports = {
  plugins: {
    // 告訴 Vite (建置工具) 在處理 CSS 時要先跑這兩個外掛
    'tailwindcss': {},
    'autoprefixer': {},
  },
}