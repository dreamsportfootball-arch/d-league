// 檔案路徑：postcss.config.cjs - 已修正
// 這是 PostCSS 的設定檔，用來告訴 Vite 如何處理 CSS 檔案

module.exports = {
  plugins: {
    // ✅ 關鍵修正：將 'tailwindcss' 替換為 '@tailwindcss/postcss'
    '@tailwindcss/postcss': {}, 
    'autoprefixer': {},
  },
}