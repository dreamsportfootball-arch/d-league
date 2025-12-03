// 檔案路徑：d-league web/components/ClubGrid.tsx

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { TEAMS } from '../constants';
import { X } from 'lucide-react'; 
import { ALL_PLAYERS } from '../playerData';

const ClubGrid: React.FC = () => {
    // 1. 狀態管理
    const [activeTeamId, setActiveTeamId] = useState<string | null>(null);
    const activeTeam = activeTeamId ? TEAMS[activeTeamId] : null;
    const teamIndex = activeTeamId ? (Object.keys(TEAMS).indexOf(activeTeamId) + 1) : 0;
    const teamNumber = teamIndex.toString().padStart(2, '0');

    // 🎯 Logo 尺寸客製化邏輯
    const getLogoSizeClasses = () => {
        if (!activeTeam) return 'w-32 h-32 md:w-40 md:h-40';
        
        const n = activeTeam.name;
        if (n.includes('鹿逐')) return 'w-32 h-32 md:w-40 md:h-40';
        if (n.includes('陳公舘') || n.includes('酒號')) return 'w-36 h-36 md:w-40 md:h-40';
        if (n.includes('瘋') || n.includes('屏東')) return 'w-40 h-40 md:w-40 md:h-40';
        if (n.includes('嘉義') || n.includes('PPI') || n.includes('鳥仕')) return 'w-44 h-44 md:w-40 md:h-40';
        return 'w-48 h-48 md:w-40 md:h-40';
    };

    const logoSizeClasses = getLogoSizeClasses();

    // 2. 獲取該隊球員資料
    const activePlayers = useMemo(() => {
        if (!activeTeamId) return [];
        return ALL_PLAYERS
            .filter(p => p.teamId === activeTeamId)
            .sort((a, b) => a.number - b.number);
    }, [activeTeamId]);

    // 3. 滾動邏輯
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [thumbWidthPercent, setThumbWidthPercent] = useState(100);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) {
            setScrollProgress(0);
            setThumbWidthPercent(100);
            return;
        }
        const rawProgress = el.scrollLeft / maxScroll;
        const clampedProgress = Math.min(1, Math.max(0, rawProgress));
        const thumbPercent = (el.clientWidth / el.scrollWidth) * 100;
        setScrollProgress(clampedProgress);
        setThumbWidthPercent(Math.max(8, Math.min(100, thumbPercent)));
    };

    useEffect(() => {
        updateScrollState();
        const onResize = () => updateScrollState();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const thumbLeftPercent = (100 - thumbWidthPercent) * scrollProgress;

    return (
        <>
            <section className="pt-8 pb-6 md:pt-16 md:pb-12 bg-neutral-50 border-t border-neutral-200 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    
                    <div className="mb-6 md:mb-10 relative inline-block"> 
                        <span className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 text-5xl md:text-8xl font-black text-neutral-200/50 whitespace-nowrap select-none uppercase font-display">
                            The Teams
                        </span>
                        <h2 className="relative font-display font-black text-3xl md:text-5xl uppercase text-brand-black z-10">
                            參賽{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-500">
                                球隊
                            </span>
                        </h2>
                    </div>

                    <p className="text-xs md:text-sm text-neutral-400 mb-9 md:mb-16 -mt-3 md:-mt-5">
                        點擊隊伍標誌查看詳情
                    </p>

                    <div
                        ref={scrollRef}
                        onScroll={updateScrollState}
                        className="
                            flex overflow-x-auto pb-6 pt-1 gap-5 snap-x snap-proximity touch-pan-x px-4 -mx-4
                            no-scrollbar
                            
                            md:grid md:grid-cols-5 md:gap-y-16 md:gap-x-8 md:items-end md:justify-items-center
                            md:overflow-visible md:pb-0 md:px-0 md:mx-0
                        "
                    >
                        {Object.values(TEAMS).map(team => (
                            <div
                                key={team.id}
                                onClick={() => setActiveTeamId(team.id)}
                                className={`
                                    shrink-0 w-[19vw] snap-center group flex flex-col items-center cursor-pointer 
                                    md:w-full 
                                    transition-transform hover:-translate-y-1
                                `}
                            >
                                <div className="w-14 h-14 md:w-20 md:h-20 mb-3 md:mb-6 relative flex items-center justify-center transition-all duration-300 ease-out"> 
                                    <div className="absolute inset-0 bg-brand-black/5 blur-xl rounded-full opacity-0 md:group-hover:opacity-50 transition-opacity duration-300" />
                                    <img
                                        src={team.logo}
                                        alt={team.name}
                                        className="relative z-10 max-w-full max-h-full drop-shadow-md object-contain transition-all duration-500 filter grayscale-0 md:grayscale-[30%] md:group-hover:grayscale-0"
                                        loading="lazy"
                                    />
                                </div>

                                <h4 className="font-bold uppercase text-[10px] md:text-sm tracking-widest text-center transition-colors duration-300 whitespace-nowrap text-brand-black md:text-neutral-400 md:group-hover:text-brand-black">
                                    {team.shortName}
                                </h4>

                                <div className="h-1 w-0 bg-brand-blue mt-2 md:mt-3 transition-all duration-300 ease-out md:group-hover:w-12" />
                            </div>
                        ))}
                    </div>

                    {/* 滾動指示條 (僅手機顯示) */}
                    <div className="mt-2 md:hidden flex justify-center">
                        <div className="relative h-[2px] w-full max-w-xs bg-transparent">
                            <div
                                className="absolute top-0 h-full rounded-full bg-neutral-400 transition-[left,width] duration-150 ease-out"
                                style={{
                                    width: `${thumbWidthPercent}%`,
                                    left: `${thumbLeftPercent}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 隊伍詳情 Modal */}
            {activeTeamId && activeTeam && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 backdrop-blur-sm animate-in fade-in">
                    <div 
                        className="absolute inset-0 bg-black/80 transition-opacity"
                        onClick={() => setActiveTeamId(null)} 
                    ></div>

                    <div className="relative w-full max-w-4xl h-[650px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-row animate-in zoom-in-90 duration-300 border-2 border-brand-black/10">
                        <div 
                            style={{ backgroundColor: activeTeam.primaryColor }}
                            className="h-full w-24 md:w-[24%] shrink-0 relative text-white p-4 md:p-10 flex flex-col justify-between"
                        >
                            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-l-xl">
                                <div className="absolute inset-0 opacity-80"> 
                                    <div 
                                        className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
                                        style={{
                                            backgroundImage: `
                                                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                                            `,
                                            backgroundSize: '40px 40px',
                                            transform: 'perspective(500px) rotateX(60deg) scale(1.5)',
                                            transformOrigin: 'center 40%'
                                        }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
                                </div>

                                <span className="absolute top-4 right-4 text-3xl md:text-5xl font-display font-black text-white/90 z-20 mix-blend-overlay">
                                    {teamNumber}
                                </span>
                                
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[300px] font-display font-black opacity-10 select-none">
                                        {teamNumber}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="relative z-50 flex justify-between items-start flex-grow pointer-events-none">
                                <div className={`${logoSizeClasses} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform md:hover:scale-110 transition-transform duration-500 pointer-events-auto`}>
                                    <img 
                                        src={activeTeam.logo} 
                                        alt={activeTeam.shortName} 
                                        className="w-full h-full object-contain drop-shadow-2xl" 
                                        loading="lazy"
                                    />
                                </div>
                                
                                <div className="mt-auto pt-4 flex flex-col justify-end w-full text-right">
                                    <span className="block md:hidden text-[10px] font-black uppercase tracking-[0.3em] text-white/80 mt-2 leading-relaxed">
                                        DREAM&nbsp;IT<br />PLAY&nbsp;IT
                                    </span>
                                    <span className="hidden md:inline-block text-[10px] font-black uppercase tracking-[0.2em] text-white/80 mt-2 leading-relaxed whitespace-nowrap">
                                        DREAM IT PLAY IT
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 relative bg-white flex flex-col"> 
                            <button 
                                onClick={() => setActiveTeamId(null)}
                                className="absolute top-0 right-0 p-4 z-50 group"
                            >
                                <div className="bg-brand-black text-white p-1 group-hover:rotate-90 transition-transform duration-300">
                                    <X className="w-6 h-6" />
                                </div>
                            </button>
                            
                            <div className="p-6 md:p-8 pb-4 shrink-0 relative">
                                <div className="absolute top-6 left-0 w-2 h-16 bg-brand-black"></div>
                                
                                <div className="pl-6">
                                    <div className="flex items-center space-x-3 mb-1">
                                        <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white bg-brand-black transform -skew-x-12">
                                            OFFICIAL SQUAD
                                        </span>
                                        <div className="h-px flex-grow bg-neutral-200"></div>
                                    </div>
                                    
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-black mb-0 leading-[0.85] uppercase tracking-tighter italic">
                                        {activeTeam.shortName}
                                    </h3>
                                    <p 
    className={`
        text-xs font-bold text-neutral-400 uppercase tracking-[0.3em] mt-2 
        ${activeTeam.name.includes('屏東') ? '' : 'whitespace-nowrap'}
    `}
>
    {activeTeam.name}
</p>
                                </div>

                                <div className="mt-6 bg-neutral-50 border-l-4 p-3 relative overflow-hidden" style={{ borderColor: activeTeam.primaryColor }}>
                                    <div className="absolute top-0 right-0 text-[60px] leading-none opacity-5 pointer-events-none font-display font-black">
                                        INFO
                                    </div>
                                    <p className="text-sm font-bold text-brand-black relative z-10">
                                        組別：
                                        <span className="ml-1 inline-block" style={{ borderColor: activeTeam.primaryColor }}>
                                            LEAGUE 2
                                        </span>
                                    </p>
                                    
                                    <p className="text-[10px] text-neutral-500 mt-1 font-medium tracking-wide">
                                        <span className="md:hidden">// 向下滾動查看名單 //</span>
                                        <span className="hidden md:inline">// 向下滾動查看名單 // SCROLL DOWN FOR ROSTER</span>
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-8">
                                <div className="mb-4 flex items-end justify-between border-b-2 border-brand-black pb-1">
                                    <span className="text-xl font-display font-black italic tracking-tighter text-brand-black">
                                        SQUAD LIST
                                    </span>
                                    <span className="text-[10px] font-bold text-neutral-400 mb-1">
                                        TOTAL: {activePlayers.length}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    {activePlayers.map((player) => (
                                        <div 
                                            key={player.id} 
                                            className="group relative flex items-center bg-white border border-neutral-200 hover:border-brand-black transition-all duration-200 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-brand-black/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left skew-x-12"></div>
                                            
                                            <div className="w-1 self-stretch transition-all duration-300 group-hover:w-2" style={{ backgroundColor: activeTeam.primaryColor }}></div>

                                            <div className="w-14 h-12 flex items-center justify-center bg-neutral-100/50 group-hover:bg-brand-black/5 border-r border-neutral-200/50 relative z-10">
                                                <span className="font-display font-black text-2xl italic tracking-tighter text-brand-black/80 group-hover:text-brand-black">
                                                    {player.number}
                                                </span>
                                            </div>

                                            <div className="flex-1 px-4 py-2 flex justify-between items-center relative z-10">
                                                <div className="flex flex-col">
                                                    {/* ✅ 變更：針對 PPI 兩位長名球員，在手機版使用 text-xs */}
                                                    <span className={`
                                                        font-black text-brand-black uppercase tracking-wide leading-none group-hover:translate-x-1 transition-transform
                                                        ${player.id === 'ppi-29' || player.id === 'ppi-19' ? 'text-xs sm:text-sm' : 'text-sm'}
                                                    `}>
                                                        {player.name}
                                                    </span>
                                                    {player.englishName && (
                                                        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mt-1 scale-95 origin-left">
                                                            {player.englishName}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <div className="flex items-center space-x-3">
                                                    <div className="hidden sm:flex flex-col items-end mr-1">
                                                        <span className="text-[9px] font-bold text-neutral-300 uppercase">AGE</span>
                                                        <span className="text-xs font-black text-brand-black leading-none">{player.age}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="h-2 w-full bg-brand-black flex shrink-0">
                                <div className="w-1/3 bg-brand-accent h-full"></div>
                                <div className="w-1/3 bg-neutral-800 h-full"></div>
                                <div className="w-1/3 bg-brand-black h-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ClubGrid;