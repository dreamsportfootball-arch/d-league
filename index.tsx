// 檔案路徑：src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// 👇 修正 1: 將 HashRouter 替換為 BrowserRouter (讓網址變乾淨)
import { BrowserRouter } from 'react-router-dom'; 

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* 👇 修正 2: 用 BrowserRouter 包裹 App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);