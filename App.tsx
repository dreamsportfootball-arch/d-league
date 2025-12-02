// 檔案路徑：App.tsx

import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

// Lazy load pages for better performance
const SchedulePage = lazy(() => import('./pages/SchedulePage'));
const StandingsPage = lazy(() => import('./pages/StandingsPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const StatsPage = lazy(() => import('./pages/StatsPage')); 
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage')); 
const MediaPage = lazy(() => import('./pages/MediaPage'));
// 👇 1. 導入 AboutPage
const AboutPage = lazy(() => import('./pages/AboutPage'));

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // 🎯 關鍵修改：新增 Hash (錨點) 處理邏輯
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        // 考慮 Header 高度 (64px)，讓錨點滾動到 Header 下方
        const headerHeight = 64; 
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        
        window.scrollTo({
          top: elementPosition - headerHeight,
          behavior: 'smooth'
        });
        return; // 如果處理了錨點，就停止
      }
    }
    
    // 如果沒有錨點，則滾動到頁面最上方
    window.scrollTo(0, 0);
  }, [pathname, hash]); // 監聽 pathname 和 hash 的變化

  return null;
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-neutral-50 text-brand-black w-full overflow-x-hidden">
      <Header />
      <ScrollToTop />
      
      <main className="flex-grow pt-16 w-full"> 
        <Suspense fallback={<div className="text-center p-20 text-xl font-bold text-brand-blue">🚀 正在加載頁面中...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} /> 
              {/* 👇 2. 設定 /about 的路徑 */}
              <Route path="/about" element={<AboutPage />} />
              
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/standings" element={<StandingsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/news/:id" element={<ArticleDetailPage />} />
              <Route path="/media" element={<MediaPage />} />
            </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;