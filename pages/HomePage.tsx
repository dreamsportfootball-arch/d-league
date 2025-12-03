// 檔案路徑：d-league web/pages/HomePage.tsx

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
    // 首頁獨立的聯賽狀態 (用於積分榜小工具)
    // 這裡我們不使用 sessionStorage，因為首頁小工具通常只需要顯示預設狀態，
    // 或者如果您希望它也記憶，我們可以像 StatsPage 那樣修改，但目前保持簡單即可。
    const [activeLeague, setActiveLeague] = useState<'L1' | 'L2'>('L1');

    return (
        <div className="w-full overflow-x-hidden"> 
            {/* 1. 主視覺 Hero */}
            <Hero />
            
            {/* 2. 賽事中心 (比分) */}
            <div id="match-center" className="relative z-20 container mx-auto px-0 md:px-6 pb-12 -mt-5">
                <div className="bg-white rounded-t-xl shadow-2xl overflow-hidden md:border border-neutral-100 ring-1 ring-black/5">
                    <MatchCenter />
                </div>
            </div>

            {/* 3. 積分榜與最新消息區 (這是唯一的最新消息區) */}
            <section id="standings-and-news" className="container mx-auto px-4 md:px-6 py-4 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">
                    
                    {/* 左側：積分榜 (首頁版) */}
                    <div className="lg:col-span-4 order-2 lg:order-1">
                        
                        <div className="flex items-end justify-between mb-4 pb-2 border-b border-neutral-100">
                            <div>
                                <span className="block text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase mb-1 font-sans">
                                    RANKING
                                </span>
                                <h3 className="font-display font-bold text-3xl text-brand-black tracking-wide flex items-center">
                                    <Trophy className="w-6 h-6 mr-2 text-brand-blue translate-y-[2px]" />
                                    戰績排名
                                </h3>
                            </div>
                            
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
                                        <span className="md:hidden">{league}</span>
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

                    {/* 右側：最新消息 (這是正確的位置) */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <NewsSection />
                    </div>
                </div>
            </section>

            {/* 4. 賽事媒體中心 (VideoHub) */}
            <VideoHub /> 
            
            {/* 5. 賽事精選圖集 (PhotoCarousel) - 這邊不應該有 NewsSection */}
            <PhotoCarousel />
            
            {/* 6. 參賽球隊 */}
            <div id="teams">
                <ClubGrid />
            </div>
            
            {/* 7. 品牌故事 */}
            <BrandStory />
        </div>
    );
};

export default HomePage;