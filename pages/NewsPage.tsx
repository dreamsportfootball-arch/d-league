// 檔案路徑：NewsPage.tsx
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchLeagueNews } from '../services/geminiService';
import { NewsArticle } from '../types';
import { ArrowRight, Filter } from 'lucide-react';

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

// 小型 Filter 按鈕
const MinimalFilter: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      inline-flex items-center px-4 py-2 rounded-full text-xs md:text-sm
      border transition-colors
      ${
        isActive
          ? 'bg-brand-blue text-white border-brand-blue'
          : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400'
      }
    `}
  >
    <Filter className="w-3 h-3 mr-2" />
    <span className="tracking-[0.18em] uppercase">{label}</span>
  </button>
);

// 單張新聞卡片 (新增圖片載入處理)
const MinimalNewsCard: React.FC<{
  article: NewsArticle;
  onImageLoaded: () => void; // 圖片載入完成的回調
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
        onLoad={onImageLoaded} // 圖片載入完成時觸發
        onError={onImageLoaded} // 圖片載入失敗也視為處理完畢
      />
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
    </div>

    {/* 內容區 */}
    <div className="flex flex-col flex-1">
      {/* Tag + 日期 */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`
            inline-flex items-center px-3 py-1 rounded-full
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
      <h3 className="font-display font-bold text-base md:text-lg leading-snug text-neutral-900 mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
        {article.title}
      </h3>

      {/* 摘要 */}
      <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4">
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
  const [activeFilter, setActiveFilter] = useState<
    'ALL' | 'Match Report' | 'Official'
  >('ALL');

  // 【新增】：追蹤圖片載入狀態
  const [loadedImageCount, setLoadedImageCount] = useState(0);
  const [imagesAreLoaded, setImagesAreLoaded] = useState(false);

  // 處理單個圖片載入完成
  const handleImageLoaded = useCallback(() => {
    setLoadedImageCount((prev) => prev + 1);
  }, []);

  // 進入列表頁時，把上一次的篩選狀態撈回來
  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem('newsActiveFilter');
      if (saved === 'ALL' || saved === 'Match Report' || saved === 'Official') {
        setActiveFilter(saved);
      }
      // 【新增】：設定一個旗標，告訴 App.tsx 現在要等待圖片載入
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

  // 【新增】：所有圖片載入完成的邏輯
  useEffect(() => {
    if (loading || filteredNews.length === 0) return;

    // 只有在實際顯示新聞時才計算圖片數量
    const totalImages = filteredNews.length;

    if (loadedImageCount >= totalImages && !imagesAreLoaded) {
      setImagesAreLoaded(true);
      // 【關鍵】：圖片全部載入後，清除旗標
      window.sessionStorage.removeItem('isNewsImagesLoading');
    }
  }, [loadedImageCount, filteredNews.length, loading, imagesAreLoaded]);

  return (
    <div className="pt-6 md:pt-24 min-h-[80vh] bg-white pb-24">
      <div className="container mx-auto px-4 md:px-12 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 border-b border-neutral-100 pb-8">
          <div>
            <h1 className="font-display font-black md:font-extrabold text-3xl md:text-5xl tracking-[0.08em] uppercase mb-3">
              <span className="inline-block md:inline">
                D LEAGUE
              </span>{' '}
              <span className="inline-block">
                <span className="text-neutral-900">League</span>{' '}
                <span className="text-brand-blue">News</span>
              </span>
            </h1>
            <p className="text-neutral-400 text-sm md:text-base font-medium tracking-[0.18em] uppercase">
              最新賽事戰報・官方公告・聯賽現場故事
            </p>
          </div>

          {/* Filter */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
            <MinimalFilter
              label="全部消息"
              isActive={activeFilter === 'ALL'}
              onClick={() => updateFilter('ALL')}
            />
            <MinimalFilter
              label="賽事戰報"
              isActive={activeFilter === 'Match Report'}
              onClick={() => updateFilter('Match Report')}
            />
            <MinimalFilter
              label="官方公告"
              isActive={activeFilter === 'Official'}
              onClick={() => updateFilter('Official')}
            />
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
