// 檔案路徑：d-league web/pages/CupPage.tsx

import React from 'react';
import { CUP_MATCHES, CUP_TEAMS } from '../cupData';
import { Calendar, MapPin, Trophy, Users, Clock, Camera, Star, Crown } from 'lucide-react';

// 1. 頒獎照片 (1張) - 1080x1350
const AWARD_PHOTO = {
    src: '/d-league/assets/cup/cup_award.jpg',
    alt: '頒獎典禮榮耀時刻'
};

// 2. 精彩花絮照片 (6張) - 1080x1350
const HIGHLIGHT_PHOTOS = [
    { id: 1, src: '/d-league/assets/cup/cup_01.jpg', alt: '精彩瞬間 1' },
    { id: 2, src: '/d-league/assets/cup/cup_02.jpg', alt: '精彩瞬間 2' },
    { id: 3, src: '/d-league/assets/cup/cup_03.jpg', alt: '精彩瞬間 3' },
    { id: 4, src: '/d-league/assets/cup/cup_04.jpg', alt: '精彩瞬間 4' },
    { id: 5, src: '/d-league/assets/cup/cup_05.jpg', alt: '精彩瞬間 5' },
    { id: 6, src: '/d-league/assets/cup/cup_06.jpg', alt: '精彩瞬間 6' },
];

const CupPage: React.FC = () => {
  const sortedMatches = [...CUP_MATCHES].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* 1. 頂部大標題區塊 */}
      <div className="bg-red-800 text-white py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600 opacity-30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center justify-center space-x-2 bg-red-900/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-yellow-500/50 mb-6">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-yellow-100">
              ONE DAY TOURNAMENT
            </span>
          </div>
          
          <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight mb-4 text-white drop-shadow-lg">
            2026 台南夢達<br/>
            <span className="text-yellow-400">新春賀歲盃</span>
          </h1>
          
          <p className="text-red-100 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            燃燒熱情，喜迎新春！<br className="md:hidden" />一年一度的足球盛宴。
          </p>
        </div>
      </div>

      {/* 2. 賽事資訊卡片 */}
      <div className="container mx-auto px-4 -mt-10 relative z-20 mb-16">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-100 border-t-4 border-yellow-500">
            <div className="flex flex-col items-center py-4 md:py-0">
                <Calendar className="w-8 h-8 text-red-700 mb-3" />
                <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-1">Date</span>
                <span className="text-brand-black font-bold text-lg">2026.02.01 (日)</span>
            </div>
            <div className="flex flex-col items-center py-4 md:py-0">
                <MapPin className="w-8 h-8 text-red-700 mb-3" />
                <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-1">Venue</span>
                <span className="text-brand-black font-bold text-lg">台南市立仁德文賢國中</span>
            </div>
            <div className="flex flex-col items-center py-4 md:py-0">
                <Trophy className="w-8 h-8 text-red-700 mb-3" />
                <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-1">Format</span>
                <span className="text-brand-black font-bold text-lg">小組賽 + 盃/盤賽</span>
            </div>
        </div>
      </div>

      {/* 3. 參賽隊伍列表 */}
      <div className="container mx-auto px-2 md:px-4 max-w-6xl mb-24">
        <div className="text-center mb-10">
           <h2 className="text-2xl font-display font-bold text-brand-black mb-2 flex items-center justify-center">
             <Users className="w-6 h-6 mr-2 text-red-700" />
             參賽球隊
           </h2>
           <div className="w-12 h-1 bg-yellow-400 mx-auto"></div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-y-2 md:gap-4 max-w-4xl mx-auto">
          {Object.values(CUP_TEAMS).map((team) => {
             const firstChar = team.name.charAt(0);
             return (
              <div key={team.id} className="relative group mx-[2px] md:mx-3">
                 <div 
                    className="w-20 h-24 md:w-44 md:h-52 bg-red-800 hover:bg-red-700 transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden shadow-lg"
                    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                 >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-8xl font-black font-serif text-red-900/40 select-none pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        {firstChar}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/20 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 px-1 md:px-2 text-center w-full">
                        <div className="hidden md:block w-6 h-1 bg-yellow-400 mx-auto mb-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-white font-bold text-[9px] md:text-lg tracking-tighter md:tracking-wider drop-shadow-md whitespace-nowrap leading-tight">
                            {team.name}
                        </h3>
                    </div>
                 </div>
                 <div className="absolute inset-0 bg-black/20 blur-lg -z-10 translate-y-2 scale-75"></div>
              </div>
             );
          })}
        </div>
      </div>

      {/* 4. 賽程列表 */}
      <div className="container mx-auto px-4 max-w-3xl mb-16">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold text-brand-black flex items-center">
                <span className="w-2 h-8 bg-red-700 mr-3 rounded-sm"></span>
                完整賽程表
            </h2>
        </div>

        {sortedMatches.length === 0 ? (
            <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
                    <Clock className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-2">賽程安排中</h3>
                <p className="text-neutral-500">對戰組合與比賽時間將於近期公佈，請密切鎖定。</p>
            </div>
        ) : (
            <div className="space-y-4">
                {sortedMatches.map((match) => {
                    const homeTeam = CUP_TEAMS[match.homeTeamId] || { name: 'TBD' };
                    const awayTeam = CUP_TEAMS[match.awayTeamId] || { name: 'TBD' };
                    const date = new Date(match.timestamp);
                    const timeString = date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false });
                    const isGroupStage = match.round.includes('小組賽');

                    return (
                        <div key={match.id} className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="bg-neutral-50 px-4 py-2 flex justify-between items-center border-b border-neutral-100">
                                 <div className="flex items-center space-x-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                        isGroupStage ? 'bg-neutral-200 text-neutral-600' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {match.round}
                                    </span>
                                 </div>
                                 <div className="flex items-center space-x-3">
                                    <span className={`text-[10px] md:text-xs font-bold px-2 py-0.5 rounded border ${
                                        match.venue === 'A' 
                                          ? 'bg-blue-50 text-blue-600 border-blue-100' 
                                          : 'bg-green-50 text-green-600 border-green-100'
                                    }`}>
                                        場地 {match.venue}
                                    </span>
                                    <span className="text-xs font-medium text-neutral-500 flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {timeString}
                                    </span>
                                 </div>
                            </div>

                            <div className="p-4 md:p-6 flex items-center justify-between relative">
                                <div className="flex-1 text-right pr-4 md:pr-8">
                                    <span className="font-bold text-brand-black text-sm md:text-xl block leading-tight">
                                        {homeTeam.name}
                                    </span>
                                </div>
                                <div className="shrink-0 w-24 text-center">
                                    {match.status === 'FINISHED' ? (
                                        <div className="flex flex-col items-center">
                                            <div className="text-2xl md:text-3xl font-black font-display text-brand-black tracking-tighter">
                                                {match.homeScore} - {match.awayScore}
                                            </div>
                                            {(match.homePenalty !== undefined && match.awayPenalty !== undefined) && (
                                                <div className="text-[10px] md:text-xs font-bold text-red-600 mt-1 tracking-wide bg-red-50 px-2 rounded-full">
                                                    (PK {match.homePenalty}-{match.awayPenalty})
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-xl md:text-2xl font-black font-display text-neutral-300 tracking-widest bg-neutral-100 rounded px-2 py-1">
                                            VS
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 text-left pl-4 md:pl-8">
                                    <span className="font-bold text-brand-black text-sm md:text-xl block leading-tight">
                                        {awayTeam.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        )}
      </div>

      {/* 5. 榮譽榜 (Champions) */}
      <div className="container mx-auto px-4 max-w-4xl mb-24">
          <div className="text-center mb-10">
               <h2 className="text-2xl font-display font-bold text-brand-black mb-2 flex items-center justify-center">
                 <Crown className="w-6 h-6 mr-2 text-yellow-500 fill-yellow-500" />
                 榮譽榜
               </h2>
               <div className="w-12 h-1 bg-yellow-400 mx-auto"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
              {/* Cup Champion */}
              <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-xl p-6 flex items-center shadow-lg hover:shadow-xl transition-shadow flex-1">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400 opacity-10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                  
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mr-5 shrink-0 border-4 border-white shadow-sm z-10">
                      <Trophy className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div className="z-10">
                      <span className="text-yellow-600 text-xs font-bold uppercase tracking-widest block mb-1">Cup Champion</span>
                      <h3 className="text-3xl font-black font-display text-brand-black leading-none mb-1">盃賽冠軍</h3>
                      <p className="text-lg font-bold text-neutral-600">東港足球隊</p>
                  </div>
              </div>

              {/* Plate Champion */}
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 flex items-center shadow-lg hover:shadow-xl transition-shadow flex-1">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-slate-400 opacity-10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                  
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mr-5 shrink-0 border-4 border-white shadow-sm z-10">
                      <Trophy className="w-8 h-8 text-slate-500" />
                  </div>
                  <div className="z-10">
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-1">Plate Champion</span>
                      <h3 className="text-3xl font-black font-display text-brand-black leading-none mb-1">盤賽冠軍</h3>
                      <p className="text-lg font-bold text-neutral-600">台南長青俱樂部</p>
                  </div>
              </div>
          </div>
      </div>

      {/* 6. 頒獎與花絮區塊 */}
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* (A) 頒獎典禮 - 獨立大圖 */}
        <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
                <h2 className="text-2xl font-display font-bold text-brand-black flex items-center">
                    <Star className="w-6 h-6 mr-2 text-yellow-500 fill-yellow-500" />
                    冠軍
                </h2>
            </div>
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400/30 max-w-lg mx-auto">
                <img 
                    src={AWARD_PHOTO.src} 
                    alt={AWARD_PHOTO.alt} 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 flex items-end p-6 md:p-8">
                    <span className="text-yellow-400 font-black text-xl md:text-3xl font-display uppercase tracking-widest">
                        CHAMPIONS
                    </span>
                </div>
            </div>
        </div>

        {/* (B) 精彩花絮 - 6張網格 */}
        <div>
            <div className="flex items-center justify-center mb-8">
                <h2 className="text-2xl font-display font-bold text-brand-black flex items-center">
                    <Camera className="w-6 h-6 mr-2 text-red-700" />
                    精彩花絮
                </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {HIGHLIGHT_PHOTOS.map((photo) => (
                    // ✅ 修改：移除了 shadow-md, hover:shadow-xl 以及內部的黑色遮罩 div
                    <div 
                        key={photo.id} 
                        className="relative group overflow-hidden rounded-xl cursor-pointer aspect-[4/5]"
                    >
                        <img 
                            src={photo.src} 
                            alt={photo.alt} 
                            // 保留了圖片放大效果 (scale-110)
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                    </div>
                ))}
            </div>
        </div>
      </div>

    </div>
  );
};

export default CupPage;