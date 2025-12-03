import React, { useState } from 'react';
import Standings from '../components/Standings';
import { AlertCircle, BookOpen, Trophy } from 'lucide-react';

type LeagueFilter = 'L1' | 'L2'; 

const StandingsPage: React.FC = () => {
    
    // ✅ 修正 1: 使用 useState 的函數式更新，在初始化時同步讀取 Session Storage
    const [activeLeague, setActiveLeague] = useState<LeagueFilter>(() => {
        try {
            const saved = window.sessionStorage.getItem('standingsActiveLeague');
            // 只有當儲存的值是有效的聯賽名稱時才使用
            if (saved === 'L1' || saved === 'L2') {
                return saved as LeagueFilter;
            }
        } catch (e) {
            // ignore
        }
        return 'L1'; // 預設值
    });

    // ✅ 修正 2: 處理聯賽切換並保存狀態
    const handleLeagueChange = (league: LeagueFilter) => {
        setActiveLeague(league);
        try {
            // 每次切換時將新狀態保存到 sessionStorage
            window.sessionStorage.setItem('standingsActiveLeague', league);
        } catch (e) {
            // ignore
        }
    };


    // 篩選器渲染邏輯
    const filterContent = (
        // 🚀 間距縮小：space-x-4
        <div className="flex space-x-4 text-xs font-bold">
            {([ 'L1', 'L2' ] as LeagueFilter[]).map((tab) => {
                const mobileLabel = tab; // L1 / L2
                // 🚀 文字柔化：自然大小寫 (League 1)
                const desktopLabel = tab === 'L1' ? 'LEAGUE 1' : 'LEAGUE 2'; 
                
                const responsiveLabel = (
                    <>
                        {/* ✅ 響應式文字: 手機 L1/L2 (Oswald font-display) */}
                        <span className="inline md:hidden font-display">{mobileLabel}</span>
                        {/* 電腦 League 1 / League 2 */}
                        <span className="hidden md:inline">{desktopLabel}</span>
                    </>
                );

                return (
                    <button
                        key={tab}
                        // ✅ 使用新的處理函式
                        onClick={() => handleLeagueChange(tab)}
                        // 🚀 移除 uppercase 類別
                        className={`px-1 pb-1 transition-all whitespace-nowrap
                            border-b-2 
                            ${activeLeague === tab
                                ? 'border-brand-blue text-brand-black font-bold' // 選中：深黑文字
                                : 'border-transparent text-neutral-400 font-medium hover:text-neutral-600'} // 未選中：淺灰文字
                        `}
                    >
                        {responsiveLabel}
                    </button>
                );
            })}
        </div>
    );

    return (
        // ✅ 空間緊湊化: 手機版 pt-6，電腦版 md:pt-20 維持大氣
        <div className="pt-6 md:pt-20 min-h-[80vh] bg-white pb-24">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                
                {/* Header - 保持標題區的簡潔 */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 md:mb-12">
                    <div>
                        {/* ✅ 標題加強: 手機版文字描邊 (.25px) 模擬加粗，電腦版移除描邊 */}
                        <h1 className="font-display font-black text-4xl md:text-6xl uppercase text-brand-black mb-4 tracking-tight [-webkit-text-stroke:.25px_currentColor] md:[-webkit-text-stroke:0px]">
                            積分 <span className="text-brand-blue">榜</span>
                        </h1>
                        <p className="text-neutral-400 text-sm md:text-base font-medium tracking-wide">
                            {activeLeague} 聯賽 的即時排名與數據
                        </p>
                    </div>
                </div>

                {/* 🚀 獨立聯賽選擇區塊 - 修正垂直對齊問題 (items-center) */}
                <div className="flex justify-between items-center mb-8"> 
                    {/* 標題靠左 */}
                    <h3 className="font-bold text-base text-neutral-900 font-display uppercase tracking-wider flex items-center">
                        {/* 修正：移除 translate-y-[1px]，讓 items-center 實現完美對齊 */}
                        <Trophy className="w-5 h-5 mr-2 text-brand-blue" />
                        選擇聯賽
                    </h3>

                    {/* 篩選器內容：被父級的 justify-between 推向右側，與標題水平對齊 */}
                    {filterContent}
                </div>
                {/* 結束獨立聯賽選擇區塊 */}

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
                    
                    {/* 表格區塊 */}
                    <div className="xl:col-span-8">
                        
                        <Standings league={activeLeague} variant="page" />
                        
                        <div className="mt-6 flex items-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mr-2"></div> 
                            League Champion
                        </div>
                    </div>

                    {/* 側邊資訊區 (Rules) - 極簡化 */}
                    <div className="hidden xl:col-span-4 xl:flex flex-col space-y-8 sticky top-24 pl-8">
                        
                        {/* 賽制說明 */}
                        <div>
                            <div className="flex items-center mb-4 text-brand-black">
                                <BookOpen className="w-4 h-4 mr-2" />
                                <h3 className="font-bold uppercase tracking-widest text-xs">賽制說明</h3>
                            </div>
                            <ul className="space-y-6">
                                <li>
                                    <span className="block font-bold text-brand-black text-sm mb-1">冠軍獎項</span>
                                    <p className="text-xs text-neutral-500 leading-relaxed">各組冠軍頒發獎盃乙座與獎牌 20 面</p>
                                </li>
                                <li>
                                    <span className="block font-bold text-brand-black text-sm mb-1">賽制循環</span>
                                    <p className="text-xs text-neutral-500 leading-relaxed">
                                        {activeLeague === 'L1' 
                                            ? 'L1 組採三循環賽制，每隊共比賽 9 場' 
                                            : 'L2 組採雙循環賽制，每隊共比賽 10 場'}
                                    </p>
                                </li>
                            </ul>
                        </div>

                        {/* 排名規則 (✅ 新增 mt-8 增加頂部間距) */}
                        <div className="mt-8"> 
                            <div className="flex items-center mb-4 text-brand-black">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                <h3 className="font-bold uppercase tracking-widest text-xs">排名規則</h3>
                            </div>
                            
                            {/* 清單文字對比度已優化 */}
                            <div className="text-xs leading-relaxed text-neutral-700">
                                <p className="mb-2 text-neutral-500">積分相同時，依序比較：</p>
                                <ol className="list-decimal list-inside space-y-1 ml-1">
                                    <li>得失球差</li>
                                    <li>進球數</li>
                                    <li>相關隊伍間對戰成績</li>
                                    <li>黃紅牌</li>
                                    <li>並列</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StandingsPage;