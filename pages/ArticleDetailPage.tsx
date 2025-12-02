// pages/ArticleDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { fetchLeagueNews } from '../services/geminiService';
import { NewsArticle } from './types';

// 日本質感風格：分類設定
const CATEGORY_META: Record<
  string,
  {
    label: string;      // 備用
    subLabel: string;   // 主要顯示文字 (中文)
  }
> = {
  'Match Report': {
    label: 'Match Report',
    subLabel: '賽事戰報',
  },
  Official: {
    label: 'Official',
    subLabel: '官方公告',
  },
};

const DEFAULT_CATEGORY_META = {
  label: 'News',
  subLabel: '最新消息',
};

// 標籤顏色邏輯
const getBadgeStyle = (category: string) => {
  if (category === 'Match Report' || category === '戰報') {
    return 'bg-brand-accent text-brand-black border-transparent'; // 螢光綠
  }
  if (category === 'Official' || category === '公告') {
    return 'bg-brand-blue text-white border-transparent'; // 品牌藍
  }
  return 'bg-neutral-100 text-neutral-600 border-transparent'; // 預設灰
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
};

// 文章內文組件
const ArticleBody: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  const blocks = text
    .split(/\n{2,}/)       // 兩個以上換行視為新段落
    .map((b) => b.trim())
    .filter((b) => b.length > 0);

  if (blocks.length === 0) return null;

  return (
    // 父層設定字級與行距
    <div className="text-[15px] md:text-[16px] leading-[2.2] text-neutral-800 font-light md:font-medium text-justify">
      {/* 引導段 (Lead Paragraph) */}
      <div
        className="
          mb-10 
          pl-4 md:pl-5 
          border-l-[3px] border-[#0047AB] 
          text-[18px] md:text-[20px] 
          leading-[1.7] 
          font-semibold
          font-display
          text-black 
          tracking-wide
          whitespace-pre-line
        "
      >
        {blocks[0]}
      </div>

      {/* 正文段落 */}
      {blocks.slice(1).map((block, idx) => (
        <p
          key={idx}
          className="mb-8 tracking-wide whitespace-pre-line"
        >
          {block}
        </p>
      ))}
    </div>
  );
};

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const news = await fetchLeagueNews();
        const found = news.find((item) => item.id === id) || null;
        setArticle(found);
      } catch (error) {
        console.error('Failed to load article:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white pt-32 px-6 text-center">
        <h1 className="text-xl font-medium tracking-widest text-neutral-900 mb-4">
          文章不存在
        </h1>
        <Link
          to="/news"
          className="text-xs tracking-[0.2em] text-neutral-400 hover:text-black transition-colors border-b border-transparent hover:border-black pb-1"
        >
          返回首頁
        </Link>
      </div>
    );
  }

  const categoryMeta =
    CATEGORY_META[article.category] || DEFAULT_CATEGORY_META;

  // 若有 content 就用 content，否則退而用 summary 當內文
  const contentText = article.content || article.summary || '';

  return (
    <article className="min-h-screen bg-white pt-14 md:pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* 頂部導航：返回最新消息 */}
        <div className="mb-6 md:mb-8">
          <Link
            to="/news"
            className="inline-flex items-center group text-[11px] md:text-[12px] tracking-[0.15em] text-neutral-400 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3 h-3 mr-2 transition-transform group-hover:-translate-x-1" />
            返回最新消息
          </Link>
        </div>

        {/* 標題區塊 Header */}
        <header className="mb-12 md:mb-16 flex flex-col items-start text-left">
          {/* 分類與日期 */}
          <div className="flex flex-row items-center gap-3 mb-6 md:mb-8">
            <span
              className={`
                text-[12px] tracking-[0.1em] font-bold px-2 py-1 rounded-sm
                ${getBadgeStyle(article.category)}
              `}
            >
              {categoryMeta.subLabel}
            </span>

            <span className="text-[11px] font-mono text-neutral-400 tracking-wider">
              {formatDate(article.timestamp)}
            </span>
          </div>

          {/* 標題 */}
          <h1
            className="
              font-display font-bold uppercase
              text-[26px] md:text-[34px] 
              leading-[1.2] tracking-wider 
              text-neutral-900 mb-4 md:mb-5
            "
          >
            {article.title}
          </h1>

          {/* 摘要段落 */}
          {article.summary && (
            <p className="text-[13px] md:text-[14px] leading-relaxed text-neutral-500 tracking-wide mb-6 md:mb-7">
              {article.summary}
            </p>
          )}

          {/* 裝飾線 */}
          <div className="w-10 h-[1px] bg-neutral-300" />
        </header>

        {/* 主圖 */}
        {article.imageUrl && (
          <figure className="mb-8 md:mb-10">
            <div className="w-full bg-neutral-100 overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-auto block grayscale-[10%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </figure>
        )}

        {/* 內文區域 */}
        <div className="mx-auto max-w-[680px]">
          <ArticleBody text={contentText} />
        </div>

        {/* 底部結束符號 (Logo) */}
        <div className="mt-24 flex justify-center opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          <img
            src="https://cdn.store-assets.com/s/783745/f/16299215.png"
            alt="End of Article"
            className="w-12 h-auto object-contain"
          />
        </div>
      </div>
    </article>
  );
};

export default ArticleDetailPage;
