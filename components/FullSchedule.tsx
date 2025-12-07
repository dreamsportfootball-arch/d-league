// 檔案路徑：d-league web/components/FullSchedule.tsx

import React, { useMemo, useEffect, useState } from 'react';
import { MATCHES, TEAMS } from '../constants';
import { MatchStatus } from '../types';

// 手機載入設定
const MOBILE_BREAKPOINT = 768;
const INITIAL_MOBILE_MATCHES = 20; // 手機版一開始顯示的比賽數量
const LOAD_MORE_STEP = 20; // 每次載入更多的比賽數量

// 格式化日期 & 時間
const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const fullDateHeader = date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const timeStr = date.toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return { fullDateHeader, timeStr };
};

// 依據 match status 回傳比分顯示
const renderScore = (match: (typeof MATCHES)[number]) => {
    if (match.status === MatchStatus.FINISHED) {
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

// 手機版隊名長度處理
const getMobileNameClass = (name: string) => {
    if (name.length >= 12) {
        return 'text-[10px] tracking-tighter';
    }
    if (name.length >= 8) {
        return 'text-[11px] tracking-tight';
    }
    return 'text-xs';
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

    // 手機版：限制初始載入場次，避免一次渲染全部導致圖片與列表延遲
    const [isMobile, setIsMobile] = useState(false);
    const [visibleCount, setVisibleCount] = useState<number>(allMatches.length);

    // 偵測螢幕寬度（僅在客戶端執行）
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            const mobile = window.innerWidth < MOBILE_BREAKPOINT;
            setIsMobile(mobile);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 根據是否為手機跟篩選後的比賽數量，更新可見場次
    useEffect(() => {
        if (isMobile) {
            setVisibleCount(Math.min(INITIAL_MOBILE_MATCHES, allMatches.length));
        } else {
            setVisibleCount(allMatches.length);
        }
    }, [isMobile, allMatches.length]);

    const matchesToRender = useMemo(
        () => (isMobile ? allMatches.slice(0, visibleCount) : allMatches),
        [allMatches, isMobile, visibleCount]
    );

    const hasMoreMatches = isMobile && visibleCount < allMatches.length;

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
            {matchesToRender.map((match, index) => {
                const { fullDateHeader, timeStr } = formatDateTime(match.timestamp);
                const isNewDate = fullDateHeader !== lastDateHeader;
                if (isNewDate) lastDateHeader = fullDateHeader;

                const homeTeam = TEAMS[match.homeTeamId];
                const awayTeam = TEAMS[match.awayTeamId];
                const isFinished = match.status === MatchStatus.FINISHED;

                return (
                    <React.Fragment key={match.id}>
                        {/* Sticky Date Header */}
                        {isNewDate && (
                            <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm px-2 py-3 border-b border-neutral-100 mt-4 md:mt-8 mb-2 transition-all">
                                <div className="flex items-center">
                                    <div className="w-1 h-4 bg-brand-accent mr-3"></div>
                                    <span className="text-sm font-semibold tracking-[0.2em] text-brand-black uppercase font-display">
                                        {fullDateHeader}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Row */}
                        <div
                            className={`
                                group relative flex flex-col md:flex-row items-center
                                py-5 border-b border-neutral-50
                                transition-all duration-300 ease-out
                                cursor-pointer md:hover:bg-neutral-50
                                ${selectedMatchId === match.id ? 'bg-neutral-50' : 'bg-white'}
                            `}
                            onClick={() => onMatchClick(match.id)}
                        >
                            {/* 左側：時間 + 聯賽/輪次 */}
                            <div className="w-full md:w-40 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center px-2 md:px-4 mb-3 md:mb-0">
                                <div className="flex items-center space-x-2 md:space-x-0 md:flex-col md:items-start">
                                    <span className="font-mono text-xs md:text-sm text-neutral-500">
                                        {timeStr}
                                    </span>
                                    <span className="hidden md:inline text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.18em] mt-0.5">
                                        {match.league} • Round {match.round}
                                    </span>
                                </div>
                                <div className="md:hidden text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.16em]">
                                    {match.league} • R{match.round}
                                </div>
                            </div>

                            {/* 中間：對戰資訊 */}
                            <div className="flex-1 flex flex-col md:flex-row items-center md:items-stretch w-full">
                                {/* 1. 手機版上方：場地/狀態 */}
                                <div className="w-full flex md:hidden items-center justify-between px-2 mb-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-neutral-200 bg-neutral-50 text-[10px] font-medium text-neutral-500">
                                            {match.venue}
                                        </span>
                                        {isFinished && (
                                            <span className="text-[10px] font-semibold text-brand-accent uppercase tracking-widest">
                                                FT
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {!isFinished && (
                                            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">
                                                Tap for details
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 2. 對戰組合 */}
                                <div className="flex-1 grid grid-cols-[1fr_auto_1fr] gap-2 md:gap-6 w-full items-center px-2">
                                    {/* 主隊 (右對齊) */}
                                    <div className="flex items-center justify-end space-x-2 md:space-x-4 shrink-0 min-w-0">
                                        <span className="font-bold text-right text-brand-black md:text-base block truncate">
                                            <span className={`md:hidden whitespace-nowrap ${getMobileNameClass(homeTeam.name)}`}>
                                                {homeTeam.name}
                                            </span>
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

                                    {/* 比分 */}
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

                                        <span className="font-bold text-left text-brand-black md:text-base block truncate">
                                            <span className={`md:hidden whitespace-nowrap ${getMobileNameClass(awayTeam.name)}`}>
                                                {awayTeam.name}
                                            </span>
                                            <span className="hidden md:inline">
                                                {awayTeam.name}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* 3. 狀態/詳情提示 */}
                                <div className="hidden md:flex flex-col items-end w-32 shrink-0 pr-4 text-right">
                                    {isFinished ? (
                                        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.16em] mb-1">
                                            Full Time
                                        </span>
                                    ) : (
                                        <span className="text-[11px] font-semibold text-brand-accent uppercase tracking-[0.16em] mb-1">
                                            Upcoming
                                        </span>
                                    )}

                                    <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-[0.14em]">
                                        {match.venue}
                                    </span>

                                    <span
                                        className={`
                                            mt-2 inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.18em]
                                            ${selectedMatchId === match.id
                                                ? 'text-brand-black'
                                                : 'text-neutral-400 group-hover:text-brand-black'}
                                        `}
                                    >
                                        View Match
                                        <span className="ml-1">→</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            })}

            {hasMoreMatches && (
                <div className="mt-4 mb-8 flex justify-center md:hidden">
                    <button
                        type="button"
                        onClick={() =>
                            setVisibleCount(prev =>
                                Math.min(prev + LOAD_MORE_STEP, allMatches.length)
                            )
                        }
                        className="px-4 py-2 text-xs font-semibold rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-sm active:scale-95 transition"
                    >
                        載入更多比賽
                    </button>
                </div>
            )}
        </div>
    );
};

export default FullSchedule;
