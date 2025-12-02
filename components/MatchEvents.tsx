import React from 'react';
// 🎯 引入中央資料庫的 MATCH_EVENTS
import { MATCH_EVENTS, MatchEvent, EventType } from '../constants'; 

const ICON_URLS = {
    GOAL: 'https://www.gstatic.com/onebox/sports/game_feed/goal_icon.svg', 
    YELLOW_CARD: 'https://ssl.gstatic.com/onebox/sports/soccer_timeline/yellow-card-right.svg',
    RED_CARD: 'https://ssl.gstatic.com/onebox/sports/soccer_timeline/red-card-right.svg',
};

const getEventIcon = (type: EventType) => {
    switch (type) {
        case 'GOAL':
            return <img src={ICON_URLS.GOAL} alt="Goal" className="w-4 h-4" />;
        case 'YELLOW_CARD':
            return <img src={ICON_URLS.YELLOW_CARD} alt="Yellow Card" className="w-4 h-4" />;
        case 'RED_CARD':
            return <img src={ICON_URLS.RED_CARD} alt="Red Card" className="w-4 h-4" />;
        default:
            return null;
    }
};

const MatchEvents: React.FC<{ matchId: string }> = ({ matchId }) => {
    // 🎯 改為從中央資料庫讀取
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

        return (
            <div className="flex w-full items-center relative py-1">
                
                {/* 左側：主隊事件 */}
                <div className="flex-1 flex justify-end pr-2 min-w-0">
                    {isHome && (
                        <div className="flex items-center space-x-2 justify-end w-full">
                            {/* 球員名稱 */}
                            <span className={`font-medium ${textSizeClass} text-right text-brand-black break-words`}>
                                {event.player}
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
                            {/* 球員名稱 */}
                            <span className={`font-medium ${textSizeClass} text-left text-brand-black break-words`}>
                                {event.player}
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