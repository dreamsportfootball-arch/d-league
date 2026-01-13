// 檔案路徑：d-league web/pages/MediaPage.tsx

import React from 'react';
import { ArrowUpRight, Youtube, Instagram } from 'lucide-react';

// 🎨 模擬相簿資料 (保持正確的圖片路徑)
const MOCK_ALBUMS = [
    {
        id: 'album-r1',
        title: '比賽日 1 (Match Day 1)',
        date: '2025/10/19',
        cover: '/d-league/assets/media/1019.jpg',
        link: 'https://drive.google.com/drive/folders/1R__mtXu96oK1l4kAMQYLJiZxTG-dhRgP?usp=drive_link',
    },
    {
        id: 'album-r2',
        title: '比賽日 2 (Match Day 2)',
        date: '2025/11/02',
        cover: '/d-league/assets/media/1102.jpg',
        link: 'https://drive.google.com/drive/folders/1S80w0QsX1B_C-ms93hOsYeWrgtMQzsZI?usp=drive_link',
    },
    {
        id: 'album-r3',
        title: '比賽日 3 (Match Day 3)',
        date: '2025/11/16',
        cover: '/d-league/assets/media/1116.jpg',
        link: 'https://drive.google.com/drive/folders/1LlPJ3m_4VotEkJr30j01WhHL_TKTsxqS?usp=drive_link',
    },
    {
        id: 'album-r4',
        title: '比賽日 4 (Match Day 4)',
        date: '2025/12/07',
        cover: '/d-league/assets/media/1207.jpg',
        link: 'https://drive.google.com/drive/folders/185Xan_z1EdZanEelYuIiN1X06T7ZTSj9?usp=drive_link',
    },
    {
        id: 'album-r5',
        title: '比賽日 5 (Match Day 5)',
        date: '2026/01/11',
        cover: '/d-league/assets/media/0111.jpg',
        link: 'https://drive.google.com/drive/folders/1H-hLEKt2-I4D6I2GzeUvn3QWKGxVZ1fN?usp=drive_link',
    },


];

// 🎨 日系元件：極簡相簿單元 (Zen Album)
const ZenAlbum: React.FC<{ album: typeof MOCK_ALBUMS[0] }> = ({ album }) => (
    <div className="group block">
        {/* 圖片容器 */}
        <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100 mb-4">
            <img
                src={album.cover}
                alt={album.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-105 pointer-events-none"
                onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=800&auto=format&fit=crop';
                }}
            />
        </div>

        {/* 文字資訊 */}
        <div className="flex flex-col items-start">
            {/* 日期 */}
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2">
                {album.date}
            </span>

            {/* 查看相簿按鈕（藍色文字連結） */}
            <a
                href={album.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-[11px] font-bold text-brand-blue hover:text-blue-800 transition-colors mb-2"
            >
                <span className="border-b border-transparent hover:border-blue-800 pb-0.5 transition-all">
                    查看相簿
                </span>
                <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* 標題 */}
            <h3 className="text-xl font-display font-bold text-brand-black leading-tight">
                {album.title}
            </h3>
        </div>
    </div>
);

const MediaPage: React.FC = () => {
    // 相簿容器 ref（用來控制水平捲動）
    const galleryRef = React.useRef<HTMLDivElement | null>(null);

    // 將 MOCK_ALBUMS 複製一份並反轉 (讓最新的在最前面)
    const reversedAlbums = React.useMemo(() => MOCK_ALBUMS.slice().reverse(), []);

    // 控制相簿滑動（左右箭咀用）
    const scrollGallery = (direction: 'left' | 'right') => {
        const container = galleryRef.current;
        if (!container) return;

        const amount = container.clientWidth * 0.8; // 每次滑動 80% 寬度
        const x = direction === 'left' ? -amount : amount;

        container.scrollBy({
            left: x,
            behavior: 'smooth',
        });
    };

    return (
        <div className="pt-6 md:pt-24 min-h-[85vh] bg-white pb-24">
            <div className="container mx-auto px-4 md:px-12 max-w-7xl">

                {/* === Header === */}
                <div className="border-b border-neutral-100 mb-8 md:mb-16 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between">
                        <div>
                            <h1 className="font-display font-black md:font-extrabold text-4xl md:text-6xl uppercase text-brand-black mb-2 md:mb-4 tracking-tight [-webkit-text-stroke:.25px_currentColor] md:[-webkit-text-stroke:0px]">
                                賽事 <span className="text-brand-blue">媒體</span>
                            </h1>
                            <p className="text-neutral-400 text-sm md:text-base font-medium tracking-wide">
                                賽事精彩瞬間回顧與精華片段
                            </p>
                        </div>
                    </div>
                </div>


                {/* =========================================
                    1. 賽事相簿區 (Photo Gallery)
                   ========================================= */}
                <div className="mb-12 md:mb-24">
                    {/* 區塊標題 + 右側箭咀 */}
                    <div className="flex items-center justify-between mb-8">
                        {/* 左：標題 */}
                        <div className="flex items-center">
                            <div className="w-8 h-[2px] bg-brand-black mr-4"></div>
                            <h2 className="font-display font-bold text-xl uppercase tracking-widest text-brand-black">
                                賽事相簿
                            </h2>
                        </div>

                        {/* 右：箭咀控制 */}
                        <div className="hidden md:flex space-x-2">
                            <button
                                type="button"
                                onClick={() => scrollGallery('left')}
                                className="w-8 h-8 border border-neutral-300 rounded flex items-center justify-center hover:bg-neutral-100 transition-colors"
                            >
                                <span className="text-lg leading-none">‹</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollGallery('right')}
                                className="w-8 h-8 border border-neutral-300 rounded flex items-center justify-center hover:bg-neutral-100 transition-colors"
                            >
                                <span className="text-lg leading-none">›</span>
                            </button>
                        </div>
                    </div>

                    {/* 相簿 Grid (橫向滑動) */}
                    <div
                        ref={galleryRef}
                        className="
                            flex space-x-6 overflow-x-auto snap-x pt-1 pb-6 no-scrollbar
                        "
                    >
                        {reversedAlbums.map((album) => (
                            <div
                                key={album.id}
                                // 手機 w-[80vw] (顯示約 1.2 張)，桌機固定 400px
                                className="w-[80vw] sm:w-[400px] flex-shrink-0 snap-start"
                            >
                                <ZenAlbum album={album} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* =========================================
                    2. 影音專區 (Video Hub - D LEAGUE TV)
                   ========================================= */}
                <div className="mb-12">
                    {/* 區塊標題 */}
                    <div className="flex items-center mb-8">
                        <div className="w-8 h-[2px] bg-brand-black mr-4"></div>
                        <h2 className="font-display font-bold text-xl uppercase tracking-widest text-brand-black">
                            比賽全場影片
                        </h2>
                    </div>

                    {/* 單一全寬內容 */}
                    <div className="w-full">
                        {/* 主播放器 */}
                        <div className="relative aspect-video bg-neutral-100 mb-4">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/videoseries?list=PLly5Ox2OW8PCiK_sny6DzH9EdA73qK7Hw"
                                title="D LEAGUE Main Player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy" // YouTube 影片建議保留 lazy，因為它很吃資源
                            ></iframe>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-2xl font-display font-bold text-brand-black uppercase leading-tight">
                                25/26 賽季完整賽事
                            </h3>
                        </div>
                    </div>
                </div>
                
                {/* === Footer Social Links (75% 分隔線) === */}
                <div className="mt-16">
                    {/* 1. 75% 居中分隔線 */}
                    <div className="w-full flex justify-center">
                        <div className="w-3/4 h-[1px] bg-neutral-100 mb-8 md:mb-10"></div>
                    </div>
                    
                    {/* 2. Content (追蹤我們 and Links) */}
                    <div className="flex flex-col items-center">
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
                            追蹤我們
                        </p>
                        <div className="flex space-x-6">
                            {/* YouTube Link */}
                            <a
                                href="https://www.youtube.com/@DreamSportFootball"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-red-600 transition-colors flex items-center group"
                            >
                                <Youtube className="w-4 h-4 mr-2" />
                                <span className="border-b border-transparent group-hover:border-red-600 transition-all translate-y-[1px]">
                                    YouTube
                                </span>
                            </a>

                            {/* Instagram Link */}
                            <a
                                href="https://www.instagram.com/d.league_tw/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-pink-600 transition-colors flex items-center group"
                            >
                                <Instagram className="w-4 h-4 mr-2" />
                                <span className="border-b border-transparent group-hover:border-pink-600 transition-all translate-y-[1px]">
                                    Instagram
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MediaPage;