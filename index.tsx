// 檔案路徑：src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* ✅ 修正：將 basename="/d-league" 改為 "/d-league/" (補上斜線) */}
    {/* 這樣設定後，重新整理頁面時，網址就會穩定維持在 http://localhost:5173/d-league/ */}
    <BrowserRouter basename="/d-league/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);