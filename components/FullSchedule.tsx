import React, { useMemo } from 'react';
import { MATCHES, TEAMS } from '../constants';
import { MatchStatus } from '../types';

// 格式化日期 & 時間
const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    // 修正版：移除 weekday: 'short'
    const fullDateHeader = date.toLocaleDateString('zh-TW', {
        year: 'numeric', // 顯示年份
        month: '2-digit',
        day: '2-digit',
        // 移除 weekday，因為都是週日
    });

    const timeStr = date.toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return { fullDateHeader, timeStr };
};

// 渲染比分 (優化版：未賽時 VS 更輕盈)
const renderScore = (match: typeof MATCHES[0]) => {
    if (
        match.status === MatchStatus.FINISHED &&
        match.homeScore !== null &&
        match.awayScore !== null
    ) {
        return (
            <span className="font-display font-black tabular-nums text-xl md:text-2xl text-brand-black tracking-tight">
                {match.homeScore} - {match.awayScore}
            </span>
        );
    }

    if (match.status === MatchStatus.SCHEDULED) {
        return (
            <span className="text-xs font-medium text-neutral-300 uppercase tracking-widest font-display">
                VS
            </span>
        );
    }

    return <span className="text-sm font-bold text-brand-black">-</span>;
};

// 依隊名長度動態調整「手機版」字級
const getMobileNameSizeClass = (label: string) => {
    const len = label.length;
    if (len <= 4) return 'text-sm';          
    if (len <= 8) return 'text-[13px]';      
    return 'text-[11px]';                    
};

const FullSchedule: React.FC<{
    onMatchClick: (matchId: string) => void;
    selectedMatchId: string | null;
    leagueFilter: 'L1' | 'L2' | 'ALL';
}> = ({ onMatchClick, selectedMatchId, leagueFilter }) => {
    const allMatches = useMemo(() => {
        let filtered = MATCHES.slice();
        if (leagueFilter !== 'ALL') {
            filtered = filtered.filter(m => m.league === leagueFilter);
        }
        return filtered.sort(
            (a, b) =>
                new Date(a.timestamp).getTime() -
                new Date(b.timestamp).getTime()
        );
    }, [leagueFilter]);

    if (allMatches.length === 0) {
        return (
            <div className="py-32 text-center">
                <p className="text-neutral-300 font-display font-bold text-2xl uppercase tracking-widest mb-2">No Matches</p>
                <p className="text-neutral-400 text-xs">目前沒有相關賽事</p>
            </div>
        );
    }

    let lastDateHeader = '';

    return (
        <div className="w-full relative">
            {allMatches.map((match, index) => {
                const { fullDateHeader, timeStr } = formatDateTime(match.timestamp);
                const isNewDate = fullDateHeader !== lastDateHeader;
                if (isNewDate) lastDateHeader = fullDateHeader;

                const homeTeam = TEAMS[match.homeTeamId];
                const awayTeam = TEAMS[match.awayTeamId];
                const isFinished = match.status === MatchStatus.FINISHED;

                // 手機用短名
                const homeShortLabel = homeTeam.shortName ?? homeTeam.name;
                const awayShortLabel = awayTeam.shortName ?? awayTeam.name;

                const homeMobileSize = getMobileNameSizeClass(homeShortLabel);
                const awayMobileSize = getMobileNameSizeClass(awayShortLabel);

                return (
                    <React.Fragment key={match.id}>
                        {/* 🇯🇵 Sticky Date Header (浮動日期標籤) */}
                        {isNewDate && (
                            // 調整 top-16，讓它緊貼在 Header 下方
                            // 手機版 mt-4 (緊湊)，電腦版 md:mt-8 (大氣)
                            <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md py-3 border-b border-neutral-100 mt-4 md:mt-8 mb-2 transition-all">
                                <div className="flex items-center">
                                    <div className="w-1 h-4 bg-brand-accent mr-3"></div>
                                    <span className="text-sm font-black text-brand-black uppercase tracking-[0.15em] font-display">
                                        {fullDateHeader}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* 🇯🇵 互動行 (Row) */}
                        <div
                            className={`
                                group relative flex flex-col md:flex-row items-center
                                py-5 border-b border-neutral-50
                                transition-all duration-300 ease-out
                                cursor-pointer md:hover:bg-neutral-50
                                overflow-hidden
                            `}
                            // 點擊功能不變
                            onClick={() => isFinished && onMatchClick(match.id)}
                        >
                            {/* ✨ 左側光標 (Accent Line) - Hover 時出現 */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue transform -translate-x-full md:group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>

                            {/* 內容容器 - Hover 時輕微右移 */}
                            <div className="w-full flex flex-col md:flex-row items-center transform md:group-hover:translate-x-1 transition-transform duration-300">
                                
                                {/* 1. 資訊欄 (時間 / 組別) */}
                                <div className="flex md:flex-col items-center md:items-start justify-between w-full md:w-32 mb-3 md:mb-0 shrink-0 px-2 md:px-4">
                                    <div className="flex items-center md:flex-col md:items-start space-x-3 md:space-x-0">
                                        {/* 🎯 時間字體 */}
                                        <span className="text-sm font-bold font-display text-neutral-400 group-hover:text-brand-black transition-colors">
                                            {timeStr}
                                        </span>
                                        <span
                                            className={`
                                                text-[10px] font-bold uppercase tracking-wider
                                                text-neutral-400 // ✅ 變更：統一使用中性灰/淺色
                                            `}
                                        >
                                            {/* 輪次中文顯示 */}
                                            {match.league} 第{match.round}輪
                                        </span>
                                    </div>
                                    
                                    {/* ❌ 移除：手機版狀態文字，讓此區塊留空，達成極簡設計 */}
                                    <div className="md:hidden">
                                        {/* 此處留空 */}
                                    </div>
                                </div>

                                {/* 2. 對戰組合 (Grid Layout) */}
                                <div className="flex-1 grid grid-cols-[1fr_auto_1fr] gap-2 md:gap-6 w-full items-center px-2">
                                    {/* 主隊 (右對齊) */}
                                    <div className="flex items-center justify-end space-x-2 md:space-x-4 shrink-0 min-w-0">
                                        <span
                                            className={`
                                                font-bold text-right text-brand-black truncate
                                                md:text-base
                                            `}
                                        >
                                            {/* 手機：短名＋動態字級 */}
                                            <span className={`inline md:hidden ${homeMobileSize}`}>
                                                {homeShortLabel}
                                            </span>
                                            {/* 桌機：完整隊名 */}
                                            <span className="hidden md:inline">
                                                {homeTeam.name}
                                            </span>
                                        </span>
                                        <img
                                            src={homeTeam.logo}
                                            alt={homeTeam.name}
                                            className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0"
                                        />
                                    </div>

                                    {/* 比分 / VS */}
                                    <div className="flex justify-center min-w-[50px] md:min-w-[80px]">
                                        {renderScore(match)}
                                    </div>

                                    {/* 客隊 (左對齊) */}
                                    <div className="flex items-center justify-start space-x-2 md:space-x-4 shrink-0 min-w-0">
                                        <img
                                            src={awayTeam.logo}
                                            alt={awayTeam.name}
                                            className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0"
                                        />
                                        <span
                                            className={`
                                                font-bold text-left text-brand-black truncate
                                                md:text-base
                                            `}
                                        >
                                            {/* 手機：短名＋動態字級 */}
                                            <span className={`inline md:hidden ${awayMobileSize}`}>
                                                {awayShortLabel}
                                            </span>
                                            {/* 桌機：完整隊名 */}
                                            <span className="hidden md:inline">
                                                {awayTeam.name}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* 3. 桌機版狀態/詳情提示 */}
                                <div className="hidden md:flex flex-col items-end w-32 shrink-0 pr-4 text-right">
                                    {isFinished ? (
                                        // 🎯 變更：將 text-[11px] 改為 text-[10px]
                                        <span
                                            className="
                                                text-[10px] font-bold text-brand-blue uppercase tracking-widest
                                                opacity-100 transform translate-x-0
                                                transition-all duration-300
                                            "
                                        >
                                            View Match <span className="ml-0.5">→</span>
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest md:group-hover:text-neutral-400 transition-colors">
                                            UPCOMING
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default FullSchedule;