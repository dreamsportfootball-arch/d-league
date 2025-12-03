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
    {/* ✅ 修正：加入 basename 設定 */}
    {/* 這樣做之後，<Link to="/"> 就會自動導向到 /d-league/，解決連結錯誤問題 */}
    <BrowserRouter basename="/d-league">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);