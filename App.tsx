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

// ===========================================
// ScrollMemory：處理一般頁面滾動 + /news 列表位置記憶
// ===========================================
const ScrollMemory: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const previousPathname =
      window.sessionStorage.getItem('lastPathname') || '';

    const isReturningFromArticle =
      previousPathname.startsWith('/news/') && pathname === '/news';

    // 1) 從文章詳情回到 /news：還原列表捲動位置
    if (isReturningFromArticle) {
      const savedY = window.sessionStorage.getItem('newsScrollY');

      if (savedY !== null) {
        const y = parseInt(savedY, 10);
        if (!Number.isNaN(y)) {
          window.scrollTo({
            top: y,
            behavior: 'auto', // 直接跳到原本位置，不做動畫
          });
          return;
        }
      }

      // 沒有記錄就退回頂部
      window.scrollTo(0, 0);
      return;
    }

    // 2) 處理 hash anchor（例如 /news#section-id）
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);

      if (element) {
        const headerHeight = 64;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: elementPosition - headerHeight,
          behavior: 'smooth',
        });
        return;
      }
    }

    // 3) 其他情境：預設捲回頂部
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  // 記錄上一個路徑 & 在離開 /news 時記錄捲動高度
  useEffect(() => {
    return () => {
      window.sessionStorage.setItem('lastPathname', pathname);

      // 只有從 /news 離開時才記錄 scroll 位置
      if (pathname === '/news') {
        window.sessionStorage.setItem('newsScrollY', String(window.scrollY));
      }
    };
  }, [pathname]);

  return null;
};
// ===========================================

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-neutral-50 text-brand-black w-full overflow-x-hidden">
      <Header />
      {/* 使用 ScrollMemory 控制滾動行為 */}
      <ScrollMemory />

      <main className="flex-grow pt-16 w-full">
        <Suspense
          fallback={
            <div className="text-center p-20 text-xl font-bold text-brand-blue">
              正在加載頁面中...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
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
