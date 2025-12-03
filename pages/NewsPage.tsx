// 檔案路徑：NewsPage.tsx
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchLeagueNews } from '../services/geminiService';
import { NewsArticle } from '../types';
import { ArrowRight } from 'lucide-react'; 

// 分類中文對照
const CATEGORY_MAP: Record<string, string> = {
  'Match Report': '賽事戰報',
  Official: '官方公告',
};

// Tag 顏色設定
const TAG_COLOR_MAP: Record<string, { bg: string; text: string }> = {
  'Match Report': { bg: 'bg-brand-accent', text: 'text-brand-black' },
  Official: { bg: 'bg-brand-blue', text: 'text-white' },
  default: { bg: 'bg-neutral-100', text: 'text-neutral-600' },
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

const getTagClasses = (category: string) => {
  const map = TAG_COLOR_MAP[category] || TAG_COLOR_MAP.default;
  return `${map.bg} ${map.text}`;
};

// 單張新聞卡片
const MinimalNewsCard: React.FC<{
  article: NewsArticle;
  onImageLoaded: () => void;
}> = ({ article, onImageLoaded }) => (
  <Link
    to={`/news/${article.id}`}
    className="group flex flex-col h-full cursor-pointer"
  >
    {/* 圖片區 */}
    <div className="relative overflow-hidden rounded-lg aspect-[16/10] mb-5 bg-neutral-100">
      <img
        src={
          (article as any).imageUrl ||
          (article as any).coverImage ||
          '/images/news-placeholder.jpg'
        }
        alt={article.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        onLoad={onImageLoaded}
        onError={onImageLoaded}
        // 🚀 關鍵修改：移除了 loading="lazy"，讓新聞圖片秒開，提升質感
      />
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
    </div>

    {/* 內容區 */}
    <div className="flex flex-col flex-1">
      {/* Tag + 日期 */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`
            inline-flex items-center px-3 py-1 rounded-sm
            text-[11px] font-semibold tracking-[0.18em] uppercase
            ${getTagClasses(article.category)}
          `}
        >
          {CATEGORY_MAP[article.category] || '最新消息'}
        </span>
        <span className="text-[11px] text-neutral-400 font-mono">
          {formatDate(article.timestamp)}
        </span>
      </div>

      {/* 標題 */}
      <h3 className="font-display font-bold text-lg leading-snug text-neutral-900 mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
        {article.title}
      </h3>

      {/* 摘要 */}
      <p className="text-neutral-500 text-xs leading-normal line-clamp-2 mb-4"> 
        {article.summary}
      </p>

      {/* Read more */}
      <div className="mt-auto pt-2 flex items-center text-brand-blue font-bold text-xs tracking-widest uppercase group/btn">
        <span className="mr-2 group-hover/btn:underline decoration-2 underline-offset-4">
          Read More
        </span>
        <ArrowRight className="w-3 h-3 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
      </div>
    </div>
  </Link>
);

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 使用 useState 的函數式更新，在初始化時同步讀取 Session Storage
  const [activeFilter, setActiveFilter] = useState<
    'ALL' | 'Match Report' | 'Official'
  >(() => {
    try {
        const saved = window.sessionStorage.getItem('newsActiveFilter');
        if (saved === 'ALL' || saved === 'Match Report' || saved === 'Official') {
            return saved as 'ALL' | 'Match Report' | 'Official';
        }
    } catch (e) {
        // ignore
    }
    return 'ALL'; // 預設值
  });


  // 追蹤圖片載入狀態
  const [loadedImageCount, setLoadedImageCount] = useState(0);
  const [imagesAreLoaded, setImagesAreLoaded] = useState(false);

  // 處理單個圖片載入完成
  const handleImageLoaded = useCallback(() => {
    setLoadedImageCount((prev) => prev + 1);
  }, []);

  // 移除原本的 useEffect 載入狀態邏輯，只保留圖片延遲相關邏輯
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem('lastNewsAnchorId')) {
        window.sessionStorage.setItem('isNewsImagesLoading', 'true');
      }
    } catch {
      // storage 被封鎖就維持預設
    }
  }, []);

  // 切換篩選時，同步寫入 sessionStorage
  const updateFilter = (filter: 'ALL' | 'Match Report' | 'Official') => {
    setActiveFilter(filter);
    try {
      window.sessionStorage.setItem('newsActiveFilter', filter);
    } catch {
      // ignore
    }
  };

  // 載入新聞資料
  useEffect(() => {
    const loadNews = async () => {
      try {
        const articles = await fetchLeagueNews();
        setNews(articles);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // 依照日期排序（新到舊）
  const sortedNews = useMemo(() => {
    return [...news].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [news]);

  // 依照篩選條件過濾
  const filteredNews = useMemo(() => {
    if (activeFilter === 'ALL') return sortedNews;
    return sortedNews.filter((item) => {
      if (activeFilter === 'Match Report') {
        return item.category === 'Match Report' || item.category === '戰報';
      }
      if (activeFilter === 'Official') {
        return item.category === 'Official';
      }
      return false;
    });
  }, [news, activeFilter]);

  // 所有圖片載入完成的邏輯
  useEffect(() => {
    if (loading || filteredNews.length === 0) return;

    // 只有在實際顯示新聞時才計算圖片數量
    const totalImages = filteredNews.length;

    if (loadedImageCount >= totalImages && !imagesAreLoaded) {
      setImagesAreLoaded(true);
      window.sessionStorage.removeItem('isNewsImagesLoading');
    }
  }, [loadedImageCount, filteredNews.length, loading, imagesAreLoaded]);
  
  const newsFilters: { key: 'ALL' | 'Match Report' | 'Official', label: string }[] = [
    { key: 'ALL', label: '全部消息' },
    { key: 'Match Report', label: '賽事戰報' },
    { key: 'Official', label: '官方公告' },
  ];

  return (
    <div className="pt-6 md:pt-24 min-h-[80vh] bg-white pb-24">
      <div className="container mx-auto px-4 md:px-12 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 border-b border-neutral-100 pb-8">
          <div>
            <h1 className="font-display font-black md:font-extrabold text-4xl md:text-6xl uppercase text-brand-black mb-3 tracking-tight [-webkit-text-stroke:.25px_currentColor] md:[-webkit-text-stroke:0px]">
                最新 <span className="text-brand-blue">消息</span>
            </h1>
            <p className="text-neutral-400 text-sm md:text-base font-medium tracking-[0.18em] uppercase">
              最新賽事戰報、官方公告
            </p>
          </div>

          {/* Filter 區塊 - 線條樣式 */}
          <div className="mt-6 md:mt-0 flex space-x-6">
            {newsFilters.map(filter => (
                <button
                    key={filter.key}
                    onClick={() => updateFilter(filter.key)}
                    className={`
                        text-sm font-bold uppercase transition-all duration-300 tracking-widest relative
                        border-b-2 pb-1
                        ${activeFilter === filter.key 
                            ? 'border-brand-blue text-brand-black' 
                            : 'border-transparent text-neutral-400 hover:text-neutral-600'}
                    `}
                >
                    {filter.label}
                </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="w-full">
          {loading ? (
            // Skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-neutral-100 h-56 rounded-lg mb-4" />
                  <div className="h-4 bg-neutral-100 w-1/3 mb-3 rounded" />
                  <div className="h-6 bg-neutral-100 w-3/4 mb-2 rounded" />
                  <div className="h-4 bg-neutral-100 w-full rounded" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                  {filteredNews.map((article) => (
                    <MinimalNewsCard
                      key={article.id}
                      article={article}
                      onImageLoaded={handleImageLoaded}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-neutral-400">
                  目前尚無相關消息。
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;