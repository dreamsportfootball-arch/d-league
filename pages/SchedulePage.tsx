import React, { useState, useMemo } from 'react';
import FullSchedule from '../components/FullSchedule';
import MatchEvents from '../components/MatchEvents';
import { MATCHES, TEAMS } from '../constants';
import { X, MousePointerClick, Trophy } from 'lucide-react'; // 🚀 導入 Trophy

type LeagueFilter = 'L1' | 'L2' | 'ALL';

// 格式化日期時間 helper
const formatMatchDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const datePart = date.toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit', weekday: 'short' });
    const timePart = date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${datePart} ${timePart}`;
};

// 🎌 UI 元件：MinimalFilter 已移除，樣式直接在 filterContent 中實現

const SchedulePage: React.FC = () => {
    
    // ✅ 修正 1: 使用 useState 的函數式更新，在初始化時同步讀取 Session Storage
    const [leagueTab, setLeagueTab] = useState<LeagueFilter>(() => {
        try {
            const saved = window.sessionStorage.getItem('scheduleActiveLeague');
            if (saved === 'L1' || saved === 'L2' || saved === 'ALL') {
                return saved as LeagueFilter;
            }
        } catch (e) {
            // ignore
        }
        return 'ALL'; // 預設值
    });

    const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

    // ✅ 修正 2: 處理聯賽切換並保存狀態
    const handleLeagueChange = (league: LeagueFilter) => {
        setLeagueTab(league);
        setSelectedMatchId(null);
        try {
            // 每次切換時將新狀態保存到 sessionStorage
            window.sessionStorage.setItem('scheduleActiveLeague', league);
        } catch (e) {
            // ignore
        }
    };


    const handleMatchClick = (matchId: string) => {
        setSelectedMatchId(prevId => prevId === matchId ? null : matchId);
    };

    const selectedMatch = useMemo(() => 
        MATCHES.find(m => m.id === selectedMatchId), 
    [selectedMatchId]);

    React.useEffect(() => {
        if (selectedMatchId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedMatchId]);


    // 篩選器渲染邏輯 (極簡線條風格)
    const filterContent = (
        <div className="flex space-x-4 text-xs font-bold">
            {([ 'ALL', 'L1', 'L2' ] as LeagueFilter[]).map((tab) => {
                
                let labelText: string;
                if (tab === 'ALL') {
                    // 手機版使用中文 "全部"
                    labelText = '全部';
                } else {
                    // 電腦版使用自然大小寫 "League 1"
                    labelText = tab === 'L1' ? 'LEAGUE 1' : 'LEAGUE 2';
                }
                
                // 處理手機版顯示 L1/L2，電腦版顯示 League 1/League 2
                const responsiveLabel = (
                    <>
                        {/* 手機 L1/L2/ALL */}
                        <span className="inline md:hidden font-display">{tab === 'ALL' ? 'ALL' : tab}</span>
                        {/* 電腦 League 1 / League 2 / 全部 */}
                        <span className="hidden md:inline">{labelText}</span>
                    </>
                );

                return (
                    <button
                        key={tab}
                        // ✅ 使用新的處理函式
                        onClick={() => { handleLeagueChange(tab); }}
                        // 樣式：極簡線條，無背景，無圓角
                        className={`px-1 pb-1 transition-all whitespace-nowrap
                            border-b-2 
                            ${leagueTab === tab
                                ? 'border-brand-blue text-brand-black font-bold' // 選中：藍線，深黑文字
                                : 'border-transparent text-neutral-400 font-medium hover:text-neutral-600'} // 未選中：透明線，淺灰文字
                        `}
                    >
                        {responsiveLabel}
                    </button>
                );
            })}
        </div>
    );
    // 結束篩選器渲染邏輯

    return (
        <div className="pt-6 md:pt-24 min-h-[80vh] bg-white pb-24">
            <div className="container mx-auto px-4 md:px-12 max-w-7xl">
                
                {/* Header 區塊 - 移除篩選器和底線 */}
                {/* 🚀 移除 border-b 和 pb-4 md:pb-6 */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 md:mb-12">
                    <div>
                        {/* 手機版文字描邊，模擬加粗效果，電腦版移除描邊 */}
                        <h1 className="font-display font-black md:font-extrabold text-4xl md:text-6xl uppercase text-brand-black mb-2 md:mb-4 tracking-tight [-webkit-text-stroke:.25px_currentColor] md:[-webkit-text-stroke:0px]">
                             完整 <span className="text-brand-blue">賽程</span>
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-center text-neutral-400 text-sm md:text-base font-medium tracking-wide space-y-2 md:space-y-0">
                            <span>所有賽季比賽、結果與事件詳情</span>
                            
                            {/* 提示文字 - 極簡風格 */}
                            <div className="flex items-center ml-0 md:ml-4 text-xs font-bold text-brand-blue hover:text-brand-black transition-colors">
                                <MousePointerClick className="w-3 h-3 mr-1.5 opacity-70" />
                                <span className="border-b border-brand-blue/50 hover:border-brand-black transition-colors">點擊賽果看詳情</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* 篩選器已移動到獨立區塊 */}
                </div>
                
                {/* 🚀 獨立聯賽選擇區塊 (手機隱藏，PC 顯示) */}
                {/* ✅ 變更：移除 border-b pb-4 border-neutral-200 */}
                <div className="hidden md:flex justify-between items-center mb-8">
                    {/* 標題靠左 */}
                    <h3 className="font-bold text-base text-neutral-900 font-display uppercase tracking-wider flex items-center">
                        <Trophy className="w-5 h-5 mr-2 text-brand-blue" />
                        選擇聯賽
                    </h3>

                    {/* 篩選器內容：靠右對齊 */}
                    {filterContent}
                </div>
                {/* 結束獨立聯賽選擇區塊 */}

                <div className="mb-20">
                    <FullSchedule 
                        onMatchClick={handleMatchClick} 
                        selectedMatchId={selectedMatchId} 
                        leagueFilter={leagueTab}
                    /> 
                 </div>
            </div>
            
            {/* Match Detail Modal (保持不變) */}
            {selectedMatchId && selectedMatch && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedMatchId(null)}
                    ></div>

                    <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                        <div className="bg-neutral-50 border-b border-neutral-100 p-6 relative">
                            <button 
                                onClick={() => setSelectedMatchId(null)}
                                className="absolute top-4 right-4 p-2 bg-white hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-brand-black transition-colors shadow-sm z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="text-center mb-4">
                                <span className="text-xs font-bold text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-widest">
                                    {selectedMatch.league} • 第 {selectedMatch.round} 輪
                                </span>
                                <p className="text-xs font-medium text-neutral-500 mt-2">
                                    {formatMatchDateTime(selectedMatch.timestamp)}
                                </p>
                            </div>

                            <div className="flex justify-between items-center px-2 sm:px-8">
                                <div className="flex flex-col items-center w-1/3 min-w-0">
                                    <img src={TEAMS[selectedMatch.homeTeamId].logo} className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-3" />
                                    <h3 className="font-bold text-brand-black text-center leading-tight text-xs sm:text-lg tracking-tighter whitespace-nowrap min-w-0">
                                        {TEAMS[selectedMatch.homeTeamId].shortName}
                                    </h3>
                                </div>

                                <div className="flex flex-col items-center w-1/3">
                                    <div className="text-4xl sm:text-6xl font-display font-black text-brand-black tracking-tight">
                                        {selectedMatch.homeScore ?? '-'} - {selectedMatch.awayScore ?? '-'}
                                    </div>
                                    <div className="text-xs font-bold text-neutral-400 mt-2 uppercase tracking-wider">Full Time</div>
                                </div>

                                <div className="flex flex-col items-center w-1/3 min-w-0">
                                    <img src={TEAMS[selectedMatch.awayTeamId].logo} className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-3" />
                                    <h3 className="font-bold text-brand-black text-center leading-tight text-xs sm:text-lg tracking-tighter whitespace-nowrap min-w-0">
                                        {TEAMS[selectedMatch.awayTeamId].shortName}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow overflow-y-auto p-0 bg-white">
                            <div className="sticky top-0 bg-white/95 backdrop-blur z-10 py-3 border-b border-neutral-100 text-center">
                                <span className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em]">Match Events</span>
                            </div>
                            <div className="px-4 pb-8">
                                <MatchEvents matchId={selectedMatchId} />
                            </div>
                        </div>

                        <div className="p-4 border-t border-neutral-100 bg-neutral-50 text-center">
                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                                D LEAGUE 官方賽事記錄
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchedulePage;