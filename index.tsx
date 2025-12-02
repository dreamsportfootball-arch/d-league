// 檔案路徑：src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// 👇 修改這裡：改用 HashRouter
import { HashRouter } from 'react-router-dom'; 

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* 👇 修改這裡：用 HashRouter 包裹 App */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);