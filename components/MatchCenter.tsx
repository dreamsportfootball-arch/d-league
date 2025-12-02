import React, { useMemo, useState, useRef, useEffect } from 'react';
import { MATCHES, TEAMS } from '../constants';
import { MatchStatus, Match } from '../types';
import { ChevronRight, ChevronLeft, MapPin, CalendarDays, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import MatchEvents from './MatchEvents';

// 格式化日期時間 helper
const formatMatchDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const datePart = date.toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit', weekday: 'short' });
    const timePart = date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${datePart} ${timePart}`;
};

const MatchCard: React.FC<{ 
    match: Match; 
    onClick: (matchId: string) => void; 
}> = ({ match, onClick }) => {
  const homeTeam = TEAMS[match.homeTeamId];
  const awayTeam = TEAMS[match.awayTeamId];
  const date = new Date(match.timestamp);
  
  const timeString = date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateString = `${date.getMonth() + 1}/${date.getDate()} ${date.toLocaleDateString('zh-TW', { weekday: 'short' })}`;

  const isLive = match.status === MatchStatus.LIVE;
  const isFinished = match.status === MatchStatus.FINISHED;
  
  return (
    <div 
        onClick={() => onClick(match.id)}
        className="flex flex-col flex-shrink-0 w-[85vw] md:w-80 bg-white border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-200 group relative overflow-hidden mr-3 md:mr-4 last:mr-0 snap-center rounded-lg cursor-pointer select-none"
    >
      {/* Header */}
      <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-100 flex justify-between items-center shrink-0">
         <div className="flex items-center">
             {/* ✅ 關鍵修正：確保 {match.round} 左右都有空格 */}
             <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{match.league} • 第{match.round}輪</span>
             <span className="text-xs font-medium text-neutral-400 ml-2 pl-2 border-l border-neutral-200">{dateString}</span>
         </div>
         <span className={`text-xs font-bold ${isLive ? 'text-red-500 animate-pulse' : 'text-neutral-400'}`}>
            {isLive ? '進行中' : isFinished ? '完賽' : timeString}
         </span>
      </div>
      
      <div className="p-5 flex-grow flex flex-col justify-center">
        <div className="space-y-3"> 
          
          {/* Home Team */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 overflow-hidden flex-1">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                 <img src={homeTeam.logo} alt={homeTeam.name} className="w-8 h-8 object-contain drop-shadow-sm" />
              </div>
              <span className="font-bold text-brand-black text-sm md:text-lg leading-tight tracking-tight whitespace-nowrap">
                  {homeTeam.shortName}
              </span>
            </div>
            <div className={`text-xl md:text-2xl font-display font-bold tabular-nums shrink-0 ml-2 ${isFinished || isLive ? 'text-brand-black' : 'text-neutral-300'}`}>
              {match.homeScore !== null ? match.homeScore : '-'}
            </div>
          </div>

          {/* Away Team */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 overflow-hidden flex-1">
               <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                 <img src={awayTeam.logo} alt={awayTeam.name} className="w-8 h-8 object-contain drop-shadow-sm" />
              </div>
              <span className="font-bold text-brand-black text-sm md:text-lg leading-tight tracking-tight whitespace-nowrap">
                  {awayTeam.shortName}
              </span>
            </div>
            <div className={`text-xl md:text-2xl font-display font-bold tabular-nums shrink-0 ml-2 ${isFinished || isLive ? 'text-brand-black' : 'text-neutral-300'}`}>
              {match.awayScore !== null ? match.awayScore : '-'}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs shrink-0">
             {(!isFinished && !isLive) ? (
                 <div className="flex items-center text-neutral-400 font-medium truncate">
                    <MapPin className="w-3 h-3 mr-1 shrink-0" /> <span className="truncate">{match.venue}</span>
                 </div>
             ) : (
                 <div className="w-full flex justify-center items-center text-brand-blue font-bold group-hover:underline">
                    查看比賽詳情 <ChevronRight className="w-3 h-3 ml-1" />
                 </div>
             )}
        </div>
      </div>
       
       <div className="h-1.5 w-full flex shrink-0">
          <div className="w-1/2 transition-colors" style={{ backgroundColor: homeTeam.primaryColor }}></div>
          <div className="w-1/2 transition-colors" style={{ backgroundColor: awayTeam.primaryColor }}></div>
       </div>
    </div>
  );
};

const MatchCenter: React.FC = () => {
  const [filter, setFilter] = useState<'Upcoming' | 'Results'>('Results');
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedMatchId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedMatchId]);

  const filteredMatches = useMemo(() => {
    let targetMatches: Match[] = [];
    if (filter === 'Results') {
        const finished = MATCHES.filter(m => m.status === MatchStatus.FINISHED || m.homeScore !== null);
        if (finished.length === 0) return [];
        finished.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        const lastMatchDateStr = finished[0].timestamp.split('T')[0];
        targetMatches = finished.filter(m => m.timestamp.startsWith(lastMatchDateStr));
        targetMatches.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    } else {
        const scheduled = MATCHES.filter(m => m.status === MatchStatus.SCHEDULED);
        if (scheduled.length === 0) return [];
        scheduled.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        const nextMatchDateStr = scheduled[0].timestamp.split('T')[0];
        targetMatches = scheduled.filter(m => m.timestamp.startsWith(nextMatchDateStr));
    }
    return targetMatches;
  }, [filter]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        const scrollAmount = 340;
        scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (newFilter: 'Upcoming' | 'Results') => {
      setFilter(newFilter);
      if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
  };

  const handleMatchClick = (matchId: string) => {
      setSelectedMatchId(matchId);
  };

  const selectedMatch = useMemo(() => 
    MATCHES.find(m => m.id === selectedMatchId), 
  [selectedMatchId]);

  return (
    <>
        <div className="bg-white py-8">
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-6">
            <div className="w-full md:w-auto">
                <div className="flex items-baseline space-x-3 mb-2">
                    <h2 className="font-display font-black text-3xl uppercase tracking-tighter text-brand-black [-webkit-text-stroke:.5px_currentColor] md:[-webkit-text-stroke:0px]">
                        賽事 <span className="text-brand-blue">中心</span>
                    </h2>
                </div>
                <div className="flex space-x-6 border-b border-neutral-100 w-full md:w-auto">
                    <button onClick={() => handleFilterChange('Results')} className={`text-sm font-bold uppercase pb-2 border-b-2 transition-all duration-300 ${filter === 'Results' ? 'border-brand-black text-brand-black' : 'border-transparent text-neutral-400 hover:text-neutral-600'}`}>本輪賽果</button>
                    <button onClick={() => handleFilterChange('Upcoming')} className={`text-sm font-bold uppercase pb-2 border-b-2 transition-all duration-300 ${filter === 'Upcoming' ? 'border-brand-black text-brand-black' : 'border-transparent text-neutral-400 hover:text-neutral-600'}`}>即將開賽</button>
                </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-2 mt-4 md:mt-0">
                <button onClick={() => scroll('left')} className="p-2 rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-brand-black transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={() => scroll('right')} className="p-2 rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-brand-black transition-colors"><ChevronRight className="w-4 h-4" /></button>
                <Link to="/schedule" className="ml-4 flex text-sm font-bold text-neutral-500 hover:text-brand-black items-center transition-colors">
                    完整賽程 <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
            </div>
            
            <div className="relative group">
                <div 
                    ref={scrollContainerRef}
                    className="flex items-stretch overflow-x-auto pt-1 pb-6 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar snap-x snap-proximity scroll-smooth touch-pan-x overscroll-x-contain"
                >
                {filteredMatches.length > 0 ? (
                    filteredMatches.map(match => (
                        <MatchCard key={match.id} match={match} onClick={handleMatchClick} />
                    ))
                ) : (
                    <div className="w-full py-12 flex flex-col items-center justify-center bg-neutral-50 border border-dashed border-neutral-200 rounded-lg">
                        <CalendarDays className="w-8 h-8 text-neutral-300 mb-2" />
                        <p className="text-neutral-400 font-medium text-sm">目前此區間沒有賽事</p>
                    </div>
                )}
                
                {filteredMatches.length > 0 && (
                    <Link 
                        to="/schedule"
                        className="flex-shrink-0 w-32 flex flex-col justify-center items-center bg-white border border-neutral-100 hover:border-brand-blue cursor-pointer snap-center transition-all rounded-lg ml-4 mr-4 group/more shadow-sm hover:shadow-md active:scale-95"
                    >
                        <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center mb-2 group-hover/more:bg-brand-blue group-hover/more:text-white transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-neutral-500 uppercase group-hover/more:text-brand-black">查看全部</span>
                    </Link>
                )}
                </div>
                <div className="absolute top-0 right-0 bottom-6 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
            </div>
        </div>
        </div>

        {/* Match Detail Modal */}
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
                            {/* 這裡原本就正確，維持不變 */}
                            <span className="text-xs font-bold text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-widest">
                                {selectedMatch.league} • 第 {selectedMatch.round} 輪
                            </span>
                             {/* 日期與時間 (小字) */}
                            <p className="text-xs font-medium text-neutral-500 mt-2">
                                {formatMatchDateTime(selectedMatch.timestamp)}
                            </p>
                        </div>

                        <div className="flex justify-between items-center px-2 sm:px-8">
                            <div className="flex flex-col items-center w-1/3">
                                <img src={TEAMS[selectedMatch.homeTeamId].logo} className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-3" />
                                <h3 className="font-bold text-brand-black text-center leading-tight">{TEAMS[selectedMatch.homeTeamId].shortName}</h3>
                            </div>

                            <div className="flex flex-col items-center w-1/3">
                                <div className="text-4xl sm:text-6xl font-display font-black text-brand-black tracking-tight">
                                    {selectedMatch.homeScore ?? '-'} : {selectedMatch.awayScore ?? '-'}
                                </div>
                                <div className="text-xs font-bold text-neutral-400 mt-2 uppercase tracking-wider">Full Time</div>
                            </div>

                            <div className="flex flex-col items-center w-1/3">
                                <img src={TEAMS[selectedMatch.awayTeamId].logo} className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-3" />
                                <h3 className="font-bold text-brand-black text-center leading-tight">{TEAMS[selectedMatch.awayTeamId].shortName}</h3>
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
                        <Link 
                            to="/schedule" 
                            className="text-xs font-bold text-brand-blue hover:text-brand-black uppercase tracking-widest"
                        >
                            前往賽程頁面查看更多
                        </Link>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default MatchCenter;