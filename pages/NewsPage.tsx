import React, { useEffect, useState, useMemo } from 'react';
// ✅ 導入 Link 元件
import { Link } from 'react-router-dom';
import { fetchLeagueNews } from '../services/geminiService';
import { NewsArticle } from '../types';
import { ArrowRight, Filter } from 'lucide-react';

// 定義分類對照表
const CATEGORY_MAP: Record<string, string> = {
    'Match Report': '賽事戰報',
    'Official': '官方公告',
};

// 🎨 日系配色邏輯
const TAG_COLOR_MAP: Record<string, { bg: string, text: string }> = {
    'Match Report': { bg: 'bg-brand-accent', text: 'text-brand-black' },
    'Official': { bg: 'bg-brand-blue', text: 'text-white' },
    'default': { bg: 'bg-neutral-100', text: 'text-neutral-600' }
};

// 💡 格式化日期
const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
};

// 🎨 輔助函式
const getTagClasses = (category: string) => {
    const map = TAG_COLOR_MAP[category] || TAG_COLOR_MAP['default'];
    return `${map.bg} ${map.text}`;
};


// 🎌 UI 元件：極簡過濾器
const MinimalFilter: React.FC<{ 
    label: string; 
    isActive: boolean; 
    onClick: () => void;
}> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`
            relative px-1 py-2 text-sm font-bold uppercase tracking-widest transition-colors duration-300
            ${isActive ? 'text-brand-black' : 'text-neutral-400 hover:text-brand-blue'}
        `}
    >
        {label}
        <span className={`
            absolute bottom-0 left-0 w-full h-[2px] bg-brand-blue transform transition-transform duration-300 origin-left
            ${isActive ? 'scale-x-100' : 'scale-x-0'}
        `}></span>
    </button>
);

// 🎌 UI 元件：日系簡約新聞卡片
const MinimalNewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
    <Link 
        to={`/news/${article.id}`} 
        className="group flex flex-col h-full cursor-pointer"
    >
        {/* 1. 圖片區 */}
        <div className="relative overflow-hidden rounded-lg aspect-[16/10] mb-5 bg-neutral-100">
            <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
        </div>

        {/* 2. 資訊區 */}
        <div className="flex flex-col flex-grow">
            
            {/* Meta Row */}
            <div className="flex items-center mb-3 space-x-3">
                <span className={`
                    px-2 py-[2px] text-[10px] font-bold uppercase tracking-wider rounded-sm
                    ${getTagClasses(article.category)}
                `}>
                    {CATEGORY_MAP[article.category] || article.category}
                </span>

                <span className="w-[1px] h-3 bg-neutral-300"></span>

                <span className="text-xs font-medium text-neutral-400 tracking-wide font-mono">
                    {formatDate(article.timestamp)}
                </span>
            </div>
            
            {/* 標題 */}
            <h3 className="text-lg md:text-xl font-bold text-brand-black leading-snug mb-3 group-hover:text-brand-blue transition-colors duration-300">
                {article.title}
            </h3>
            
            {/* 摘要 */}
            <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4">
                {article.summary}
            </p>

            {/* Read More */}
            <div className="mt-auto pt-2 flex items-center text-brand-blue font-bold text-xs tracking-widest uppercase group/btn">
                <span className="mr-2 group-hover/btn:underline decoration-2 underline-offset-4">Read More</span>
                <ArrowRight className="w-3 h-3 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
            </div>
        </div>
    </Link>
);


const NewsPage: React.FC = () => {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('ALL'); 

    useEffect(() => {
        const loadNews = async () => {
            const articles = await fetchLeagueNews();
            setNews(articles);
            setLoading(false);
        };
        loadNews();
    }, []);

    const filteredNews = useMemo(() => {
        const contentToDisplay = news.filter(item => 
            item.category !== 'Feature' && item.category !== 'Interview'
        );

        if (activeFilter === 'ALL') return contentToDisplay; 

        return contentToDisplay.filter(item => {
            if (activeFilter === 'Match Report') return item.category === 'Match Report' || item.category === '戰報';
            if (activeFilter === 'Official') return item.category === 'Official';
            return false; 
        });
    }, [news, activeFilter]);
    
    return (
        <div className="pt-6 md:pt-24 min-h-[80vh] bg-white pb-24">
            <div className="container mx-auto px-4 md:px-12 max-w-7xl">
                
                {/* 1. Header 區塊：同步 StatsPage 的樣式 */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 border-b border-neutral-100 pb-8">
                    <div>
                        {/* 🎯 關鍵修改：套用 StatsPage 的文字樣式 (stroke, extrabold, spacing) */}
                        <h1 className="font-display font-black md:font-extrabold text-4xl md:text-6xl uppercase text-brand-black mb-2 md:mb-4 tracking-tight [-webkit-text-stroke:.25px_currentColor] md:[-webkit-text-stroke:0px]">
                            最新 <span className="text-brand-blue">消息</span>
                        </h1>
                        <p className="text-neutral-400 text-sm md:text-base font-medium tracking-wide">
                            D LEAGUE 官方公告與賽事戰報
                        </p>
                    </div>

                    {/* Filter 區塊 */}
                    <div className="flex gap-6 mt-6 md:mt-0">
                        <MinimalFilter label="全部" isActive={activeFilter === 'ALL'} onClick={() => setActiveFilter('ALL')} />
                        <MinimalFilter label="賽事戰報" isActive={activeFilter === 'Match Report'} onClick={() => setActiveFilter('Match Report')} />
                        <MinimalFilter label="官方公告" isActive={activeFilter === 'Official'} onClick={() => setActiveFilter('Official')} />
                    </div>
                </div>

                {/* 2. 內容顯示區 */}
                <div className="w-full">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-neutral-100 h-56 rounded-lg mb-4"></div>
                                <div className="h-4 bg-neutral-100 w-1/3 mb-3 rounded"></div>
                                <div className="h-6 bg-neutral-100 w-3/4 mb-2 rounded"></div>
                                <div className="h-4 bg-neutral-100 w-full rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {filteredNews.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                                {filteredNews.map((article, idx) => (
                                    <div 
                                        key={article.id} 
                                        className="animate-in fade-in duration-1000 slide-in-from-bottom-4"
                                        style={{ animationDelay: `${idx * 100}ms` }} 
                                    >
                                        <MinimalNewsCard article={article} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 text-neutral-300">
                                <Filter className="w-10 h-10 mb-4 opacity-50" />
                                <p className="text-sm font-medium tracking-widest uppercase">No Content Found</p>
                                <button 
                                    onClick={() => setActiveFilter('ALL')}
                                    className="mt-6 text-brand-black border-b border-brand-black text-xs font-bold uppercase hover:text-brand-blue hover:border-brand-blue transition-colors"
                                >
                                    View All
                                </button>
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