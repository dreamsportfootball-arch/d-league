import React, { useEffect, useState } from 'react';
// ✅ 1. 引入 Link 元件
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fetchLeagueNews } from '../services/geminiService';
import { NewsArticle } from '../types';

const NewsSection: React.FC = () => {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            const articles = await fetchLeagueNews();
            setNews(articles);
            setLoading(false);
        };
        loadNews();
    }, []);

    const displayNews = news.slice(0, 3);

    // 標籤樣式判斷器
    const getBadgeStyle = (category: string) => {
        if (category === 'Match Report' || category === '戰報' || category === 'Feature') {
            return 'bg-brand-blue text-white border-transparent';
        }
        return 'bg-neutral-800 text-white border-transparent';
    };

    // 顯示名稱轉換
    const getBadgeName = (category: string) => {
        if (category === 'Match Report' || category === 'Feature') return '戰報';
        return '公告';
    };

    return (
        <div className="bg-white border border-neutral-200 shadow-sm rounded-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-500">
            <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-white">
                <h3 className="font-display font-bold text-xl uppercase text-brand-black tracking-tight">最新消息</h3>
                <span className="text-[10px] font-black text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-wider">League News</span>
            </div>

            <div className="flex-grow flex flex-col divide-y divide-neutral-100">
                {loading ? (
                    <div className="p-6 space-y-6 animate-pulse">
                        {[1, 2, 3].map(i => (
                             <div key={i} className="flex space-x-4">
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-neutral-100 rounded w-3/4"></div>
                                    <div className="h-4 bg-neutral-100 rounded w-1/2"></div>
                                </div>
                                <div className="w-24 h-24 bg-neutral-100 rounded-md"></div>
                             </div>
                        ))}
                    </div>
                ) : (
                    displayNews.map((article) => (
                        // ✅ 2. 改為 Link，點擊直接進入該文章內文
                        <Link 
                            key={article.id} 
                            to={`/news/${article.id}`}
                            className="p-5 group cursor-pointer hover:bg-neutral-50 transition-colors flex items-start space-x-5 relative overflow-hidden block text-left"
                        >
                             {/* Hover Accent Line */}
                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                             {/* 文字區塊 (左) */}
                             <div className="flex-1 min-w-0 z-10">
                                 <div className="flex items-center space-x-2 mb-2">
                                     <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm ${getBadgeStyle(article.category)}`}>
                                         {getBadgeName(article.category)}
                                     </span>
                                     <span className="text-[10px] font-bold text-neutral-400">
                                         {new Date(article.timestamp).toLocaleDateString()}
                                     </span>
                                 </div>
                                 <h4 className="font-display font-bold text-lg text-brand-black uppercase leading-tight mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
                                     {article.title}
                                 </h4>
                                 
                                 <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                     {article.summary}
                                 </p>
                             </div>

                             {/* 圖片區塊 (右) */}
                             {article.imageUrl && (
                                 <div className="shrink-0 w-28 h-20 md:w-32 md:h-24 rounded overflow-hidden bg-neutral-100 relative z-10 shadow-sm group-hover:shadow-md transition-shadow">
                                     <img 
                                         src={article.imageUrl} 
                                         alt={article.title}
                                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                     />
                                 </div>
                             )}
                        </Link>
                    ))
                )}
            </div>

            <div className="p-4 border-t border-neutral-100 bg-neutral-50 group-hover:bg-white transition-colors mt-auto">
                {/* ✅ 3. 改為 Link，點擊前往新聞列表頁 */}
                <Link 
                    to="/news"
                    className="w-full py-2 text-center text-xs font-black text-neutral-400 hover:text-brand-black uppercase tracking-widest flex items-center justify-center group/btn transition-colors"
                >
                    查看全部消息 <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default NewsSection;