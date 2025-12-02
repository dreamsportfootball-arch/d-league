// 檔案路徑：tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 讓 Tailwind 知道要去哪些檔案中尋找它需要編譯的樣式
  content: [
    "./index.html",
    "./{src,pages,components}/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // 延續您在 index.html 中定義的客製化顏色和字體
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#0a0a0a',
          dark: '#171717',
          gray: '#f5f5f5', 
          white: '#ffffff',
          accent: '#ccff00', 
          blue: '#0047AB',
          text: '#0a0a0a', 
          muted: '#737373', 
        }
      }
    }
  },
  plugins: [],
}