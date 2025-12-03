// 檔案路徑：d-league web/components/VideoHub.tsx

import React from 'react';
import { MOCK_VIDEOS } from '../constants';
import { ExternalLink, MonitorPlay, Signal, Instagram, Youtube } from 'lucide-react';

// 1. 影片列表卡片
const SideVideoCard: React.FC<{ 
    title: string; 
    meta: string; 
    image: string; 
    type: 'YOUTUBE' | 'INSTAGRAM'; 
    link: string;
    badge?: string;
}> = ({ title, meta, image, type, link, badge }) => {
    return (
        <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 relative overflow-hidden"
        >
            {/* Hover 時的輕微掃光效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></div>

            {/* 縮圖區塊 */}
            <div className="relative w-32 h-20 md:w-40 md:h-24 shrink-0 rounded-lg overflow-hidden bg-neutral-800 ring-1 ring-white/10 group-hover:ring-white/30 transition-all">
                <img 
                    src={image} 
                    alt={title}
                    onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1579952363873-27f3bade8f55?q=80&w=800&auto=format&fit=crop';
                    }}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                    // 🚀 關鍵修改：移除了 loading="lazy"，讓縮圖瞬間載入
                />
                
                {/* 類型標示 ICON */}
                <div className="absolute top-1 right-1 z-10">
                    {type === 'INSTAGRAM' ? (
                        <div className="bg-black/50 backdrop-blur-md p-1 rounded-md">
                            <Instagram className="w-3 h-3 text-white" />
                        </div>
                    ) : (
                        <div className="bg-red-600 p-1 rounded-md shadow-sm">
                            <Youtube className="w-3 h-3 text-white" />
                        </div>
                    )}
                </div>

                {/* 時間長度/標籤 */}
                {badge && (
                    <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white rounded backdrop-blur-sm tracking-wider">
                        {badge}
                    </div>
                )}
            </div>

            {/* 文字資訊 */}
            <div className="flex flex-col justify-center min-w-0">
                <h4 className="text-sm font-bold text-neutral-300 group-hover:text-white transition-colors line-clamp-2 leading-snug mb-2 group-hover:underline decoration-brand-accent/50 underline-offset-4">
                    {title}
                </h4>
                <div className="flex items-center text-xs text-neutral-500 font-medium space-x-2">
                    <span className="text-brand-accent">{type === 'INSTAGRAM' ? 'Reels' : 'Video'}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
                    <span className="text-neutral-400">{meta}</span>
                </div>
            </div>
        </a>
    );
};

const VideoHub: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-neutral-950 border-y border-neutral-900 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* 標題區 */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <div className="flex items-center space-x-2 mb-2">
                        <MonitorPlay className="w-5 h-5 text-brand-accent" />
                        <span className="text-brand-accent font-bold tracking-[0.2em] text-xs uppercase">D LEAGUE TV</span>
                    </div>
                    <h2 className="font-display font-black text-3xl md:text-5xl uppercase text-white tracking-tight">
                        賽事 媒體中心
                    </h2>
                </div>
                
                {/* 追蹤 Instagram 按鈕 (電腦版) */}
                <a 
                    href="https://www.instagram.com/d.league_tw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center space-x-2 px-6 py-2 border border-neutral-700 rounded-full text-white font-bold uppercase text-xs hover:bg-white hover:text-black transition-all hover:border-white group"
                >
                    <Instagram className="w-3 h-3" />
                    <span>追蹤官方 Instagram</span>
                </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* 左側：主播放器 (2/3 寬度) */}
                <div className="lg:col-span-2 group">
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl border border-neutral-800 ring-1 ring-white/5">
                        <iframe 
                            className="relative w-full h-full z-10"
                            src="https://www.youtube.com/embed/videoseries?list=PLly5Ox2OW8PCiK_sny6DzH9EdA73qK7Hw" 
                            title="D LEAGUE Main Player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                        ></iframe>
                    </div>
                    
                    {/* 主播放器下方資訊列 */}
                    <div className="mt-5 flex items-start justify-between">
                         <div>
                            <div className="flex items-center space-x-2 mb-1">
                                <Signal className="w-4 h-4 text-brand-accent" />
                                <span className="text-brand-accent text-xs font-bold uppercase tracking-wider">Official Youtube</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1 font-display uppercase tracking-wide">D LEAGUE 25/26 全場比賽影片</h3>
                            <p className="text-neutral-400 text-sm">點擊播放清單即可觀看本季賽事影片</p>
                         </div>
                         
                         {/* 訂閱頻道按鈕 */}
                         <a 
                            href="https://www.youtube.com/@DreamSportFootball"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-white/50 hover:text-white transition-colors flex items-center group/yt mt-2"
                         >
                            <span>訂閱頻道</span>
                            <ExternalLink className="w-3 h-3 ml-1 group-hover/yt:translate-x-0.5 transition-transform" />
                         </a>
                    </div>
                </div>

                {/* 右側：播放清單 (1/3 寬度) */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
                        <h3 className="text-white font-bold uppercase text-sm tracking-wider">最新發布</h3>
                        <span className="text-[10px] text-brand-accent animate-pulse">● New</span>
                    </div>

                    <div className="flex flex-col space-y-3">
                        {/* 1. 進球合輯 (INSTAGRAM) */}
                        <SideVideoCard 
                            type="INSTAGRAM"
                            title={MOCK_VIDEOS[0].title}
                            meta={MOCK_VIDEOS[0].date}
                            image={MOCK_VIDEOS[0].thumbnail}
                            link="https://www.instagram.com/p/DRUSpgLkyuJ/"
                            badge="REELS"
                        />

                        {/* 2. YEHUDA (INSTAGRAM) */}
                        <SideVideoCard 
                            type="INSTAGRAM"
                            title={MOCK_VIDEOS[2].title}
                            meta={MOCK_VIDEOS[2].date} 
                            image={MOCK_VIDEOS[2].thumbnail}
                            link="https://www.instagram.com/reel/DRMGKlAk1Zj/"
                            badge="REELS"
                        />

                        {/* 3. 林韋堯 (INSTAGRAM) */}
                         <SideVideoCard 
                            type="INSTAGRAM"
                            title={MOCK_VIDEOS[1].title}
                            meta={MOCK_VIDEOS[1].date}
                            image={MOCK_VIDEOS[1].thumbnail}
                            link="https://www.instagram.com/p/DRMFaPqk25E/"
                            badge="REELS"
                        />
                    </div>

                    <div className="mt-6 md:mt-8 w-full flex justify-center items-center">
                        <span className="text-neutral-500 text-xs font-medium uppercase tracking-widest">
                            更多精彩內容請前往社群平台
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default VideoHub;