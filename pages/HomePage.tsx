import React, { useState } from 'react';
import Hero from '../components/Hero';
import MatchCenter from '../components/MatchCenter';
import Standings from '../components/Standings';
import VideoHub from '../components/VideoHub';
import ClubGrid from '../components/ClubGrid';
import BrandStory from '../components/BrandStory';
import NewsSection from '../components/NewsSection';
import PhotoCarousel from '../components/PhotoCarousel';
import { ArrowRight, Trophy } from 'lucide-react'; 
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    // 首頁獨立的聯賽狀態
    const [activeLeague, setActiveLeague] = useState<'L1' | 'L2'>('L1');

    return (
        <div className="w-full overflow-x-hidden"> 
            <Hero />
            
            <div id="match-center" className="relative z-20 container mx-auto px-0 md:px-6 pb-12 -mt-5">
                <div className="bg-white rounded-t-xl shadow-2xl overflow-hidden md:border border-neutral-100 ring-1 ring-black/5">
                    <MatchCenter />
                </div>
            </div>

            <section id="standings-and-news" className="container mx-auto px-4 md:px-6 py-4 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">
                    
                    {/* 左側：積分榜 (首頁版) */}
                    <div className="lg:col-span-4 order-2 lg:order-1">
                        
                        {/* 🎯 關鍵修改：將外部間距 mb-6 調整為 mb-4，減少標題與表格間隔 */}
                        <div className="flex items-end justify-between mb-4 pb-2 border-b border-neutral-100">
                            <div>
                                {/* 英文小標 */}
                                <span className="block text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase mb-1 font-sans">
                                    RANKING
                                </span>
                                {/* 中文大標 + 圖示 */}
                                <h3 className="font-display font-bold text-3xl text-brand-black tracking-wide flex items-center">
                                    <Trophy className="w-6 h-6 mr-2 text-brand-blue translate-y-[2px]" />
                                    戰績排名
                                </h3>
                            </div>
                            
                            {/* 保持：圓形膠囊按鈕 + 響應式文字 */}
                            <div className="flex space-x-1 bg-neutral-100 p-1 rounded-full">
                                {(['L1', 'L2'] as const).map((league) => (
                                    <button
                                        key={league}
                                        onClick={() => setActiveLeague(league)}
                                        className={`
                                            px-4 py-1 text-xs font-bold rounded-full transition-all uppercase
                                            ${activeLeague === league 
                                                ? 'bg-white text-brand-black shadow-sm' 
                                                : 'text-neutral-400 hover:text-neutral-600'}
                                        `}
                                    >
                                        {/* 手機版文字 */}
                                        <span className="md:hidden">{league}</span>
                                        {/* 電腦版文字 */}
                                        <span className="hidden md:inline">
                                            {league === 'L1' ? 'LEAGUE 1' : 'LEAGUE 2'}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Standings league={activeLeague} variant="widget" />

                        <div className="mt-4 text-center">
                            <Link to="/standings" className="text-xs font-bold text-brand-blue hover:text-brand-black uppercase tracking-widest flex items-center justify-center group transition-colors">
                                查看完整積分榜 <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <NewsSection />
                    </div>
                </div>
            </section>

            <VideoHub /> 
            
            <PhotoCarousel />
            
            {/* 🎯 關鍵修改 1: 新增 ID 定位點 (ClubGrid 區塊) */}
            <div id="teams">
                <ClubGrid />
            </div>
            
            <BrandStory />
        </div>
    );
};

export default HomePage;