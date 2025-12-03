// 檔案路徑：d-league web/components/NewsSection.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
// 直接引入資料，不做非同步讀取，追求極致速度
import { MOCK_NEWS } from '../services/geminiService';

const NewsSection: React.FC = () => {
    // 1. 直接取得前三筆資料，按照時間排序 (由新到舊)
    const displayNews = MOCK_NEWS
        .slice()
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 3);

    // 標籤樣式判斷器
    const getBadgeStyle = (category: string) => {
        if (category === 'Match Report' || category === '戰報' || category === 'Feature') {
            // 戰報：螢光綠底 + 黑字
            return 'bg-brand-accent text-brand-black border-transparent';
        }
        // 官方公告：品牌藍底 + 白字
        return 'bg-brand-blue text-white border-transparent';
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
                {displayNews.map((article) => (
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
                                    {/* 🚀 視覺修正 (Optical Alignment)：
                                        將 py-1 改為 pt-[5px] pb-[3px]
                                        這會強制將文字在框內向下推 1px，解決「視覺偏上」的問題。
                                    */}
                                    <span 
                                        className={`
                                            inline-flex items-center justify-center px-2 pt-[5px] pb-[3px] rounded-sm shadow-sm
                                            text-[10px] font-bold uppercase tracking-wider leading-none
                                            ${getBadgeStyle(article.category)}
                                        `}
                                    >
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
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement?.classList.add('hidden');
                                        }}
                                    />
                                </div>
                            )}
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t border-neutral-100 bg-neutral-50 group-hover:bg-white transition-colors mt-auto">
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