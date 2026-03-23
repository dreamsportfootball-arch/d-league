// 檔案路徑：d-league web/components/MatchEvents.tsx

import React from 'react';
// 🎯 引入資料庫
import { MATCH_EVENTS, MatchEvent, EventType } from '../matchData'; 

// 圖示來源 (只保留 GOAL 用圖片，紅黃牌改用 CSS 畫)
const ICON_URLS = {
    GOAL: 'https://www.gstatic.com/onebox/sports/game_feed/goal_icon.svg', 
};

// 🎨 取得對應圖示的函式
const getEventIcon = (type: EventType) => {
    switch (type) {
        case 'GOAL':
            return <img src={ICON_URLS.GOAL} alt="Goal" className="w-4 h-4" />;
            
        case 'YELLOW_CARD':
            return (
                <div className="w-2.5 h-3.5 bg-yellow-400 rounded-[1px] shadow-sm border border-black/10" title="Yellow Card"></div>
            );
            
        case 'RED_CARD':
            return (
                <div className="w-2.5 h-3.5 bg-red-600 rounded-[1px] shadow-sm border border-black/10" title="Red Card"></div>
            );
        
        case 'SECOND_YELLOW':
            return (
                <div className="relative w-3 h-3.5 flex items-center justify-center">
                    <div className="absolute left-0 top-0 w-2.5 h-3.5 bg-yellow-400 rounded-[1px] shadow-sm border border-black/10 transform -rotate-6"></div>
                    <div className="absolute left-[2px] top-[1px] w-2.5 h-3.5 bg-red-600 rounded-[1px] shadow-sm border border-black/10 transform rotate-3 z-10"></div>
                </div>
            );
            
        default:
            return null;
    }
};

const MatchEvents: React.FC<{ matchId: string }> = ({ matchId }) => {
    const events = MATCH_EVENTS[matchId] || [];

    if (events.length === 0) {
        return <p className="text-sm text-neutral-400 text-center py-4">目前沒有事件記錄</p>;
    }

    const sortedEvents = events.slice().sort((a, b) => a.minute - b.minute);

    const TimelineRow: React.FC<{ event: MatchEvent }> = ({ event }) => {
        const isHome = event.team === 'HOME';
        const MINUTE_WIDTH_CLASS = 'w-6 text-center flex-shrink-0';

        // 智能判斷：如果名字長度超過 12 個字元，改用較小的字體
        const isLongName = event.player.length > 12;
        const textSizeClass = isLongName ? 'text-[10px] leading-tight' : 'text-sm';

        // ✅ 新增：根據隱藏標籤，組合要顯示的附加文字 (例如 PK 或 烏龍球)
        const extraText = event.isPK ? ' (PK)' : (event.isOwnGoal ? ' (烏龍球)' : '');

        return (
            <div className="flex w-full items-center relative py-1">
                
                {/* 左側：主隊事件 */}
                <div className="flex-1 flex justify-end pr-2 min-w-0">
                    {isHome && (
                        <div className="flex items-center space-x-2 justify-end w-full">
                            {/* 球員名稱 + 附加文字 */}
                            <span className={`font-medium ${textSizeClass} text-right text-brand-black break-words`}>
                                {event.player}
                                <span className="text-neutral-500 font-normal text-xs">{extraText}</span>
                            </span>
                            {/* 分鐘數 */}
                            <span className={`text-[10px] font-bold text-neutral-500 ${MINUTE_WIDTH_CLASS}`}>{event.minute}'</span>
                        </div>
                    )}
                </div>

                {/* 中央：圖標軸心 */}
                <div className="flex flex-col items-center w-8 flex-shrink-0 z-10">
                    {getEventIcon(event.type)}
                </div>

                {/* 右側：客隊事件 */}
                <div className="flex-1 flex justify-start pl-2 min-w-0">
                    {!isHome && (
                        <div className="flex items-center space-x-2 w-full">
                            {/* 分鐘數 */}
                            <span className={`text-[10px] font-bold text-neutral-500 ${MINUTE_WIDTH_CLASS}`}>{event.minute}'</span>
                            {/* 球員名稱 + 附加文字 */}
                            <span className={`font-medium ${textSizeClass} text-left text-brand-black break-words`}>
                                {event.player}
                                <span className="text-neutral-500 font-normal text-xs">{extraText}</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col w-full max-w-xl mx-auto my-6 relative">
            {sortedEvents.map(event => (
                 <TimelineRow key={event.id} event={event} />
            ))}
        </div>
    );
};

export default MatchEvents;