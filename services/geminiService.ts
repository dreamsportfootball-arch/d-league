// 檔案：src/services/geminiService.ts

// 只需要引入類型，不需要引入 GoogleGenAI 或 Type
import { NewsArticle } from "../types";

// 🏆 這是你未來新增所有新聞的地方 (內容儲存庫)
export const MOCK_NEWS: NewsArticle[] = [
  // ===============================================
  // 👇 新增：【賽後戰報】PPI TAINAN 1-0 絕殺蒼龍FC (11月19日 - 最新)
  // ===============================================
  {
    id: 'match-report-m13-20251119',
    title: '【賽後戰報】PPI TAINAN 世界波絕殺，1-0 氣走蒼龍FC',
    summary: 'D LEAGUE L1 第 3 輪，雙方激戰至最後時刻，PPI TAINAN 靠著 YEHUDA 在第 39 分鐘的凌空抽射世界波，以 1:0 絕殺蒼龍 FC，驚險全取三分。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r3-m13.png', 
    timestamp: new Date('2025-11-19T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 新增：【賽後戰報】酒號矯正署 2-0 銅雀 (11月18日)
  // ===============================================
  {
    id: 'match-report-m12-20251118',
    title: '【賽後戰報】酒號矯正署 2-0 擊退銅雀，林冠亨一傳一射',
    summary: 'D LEAGUE L1 第 2 輪，酒號矯正署在下半場突破僵局。林冠亨先是騙過防守破門，隨後助攻鄭詠翰鎖定勝局，帶領球隊以 2:0 獲勝。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r3-m12.png', 
    timestamp: new Date('2025-11-18T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 新增：【賽後戰報】瘋Dog 2-2 屏東野猿 (11月17日)
  // ===============================================
  {
    id: 'match-report-m11-20251117',
    title: '【賽後戰報】瘋Dog 2-2 踢和屏東野猿，林韋堯、趙學邦各梅開二度',
    summary: 'D LEAGUE L2 第 3 輪上演進球大戰，屏東野猿林韋堯與瘋Dog趙學邦互別苗頭，各自完成梅開二度。瘋Dog兩度落後兩度扳平，最終雙方握手言和。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r3-m11.png', 
    timestamp: new Date('2025-11-17T14:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 新增：【賽後戰報】鳥仕 4-0 鹿逐 (11月17日)
  // ===============================================
  {
    id: 'match-report-m10-20251117',
    title: '【賽後戰報】鳥仕 4-0 大勝鹿逐俱樂部，快速轉換戰術奏效',
    summary: 'D LEAGUE L2 第 3 輪，鳥仕足球俱樂部靠著門將精準發動快速反擊與王竣弘的優異表現，以 4:0 大勝鹿逐俱樂部，並成功保持零封。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r3-m10.png', 
    timestamp: new Date('2025-11-17T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 之前新增：【賽程預告】11/16 比賽日 3
  // ===============================================
  {
    id: 'schedule-r3-20251116',
    title: '【賽程預告】11/16 比賽日 3 賽程公佈',
    summary: 'D LEAGUE 25/26 賽季比賽日 3 將於 11/16 進行四場焦點對決，包括 L1 組酒號矯正署對決銅雀足球俱樂部，以及 L2 組鳥仕 vs 鹿逐俱樂部。',
    category: 'Official',
    imageUrl: '/d-league/assets/news/schedule-r3.png', 
    timestamp: new Date('2025-11-12T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 之前新增：【賽程預告】11/02 比賽日 2
  // ===============================================
  {
    id: 'schedule-r2-20251102',
    title: 'Game On ⚽️ | 【11/02 賽程預告】比賽日 2',
    summary: 'D LEAGUE 25/26 賽季比賽日 2 將於 11/02 進行四場對決，包括 L2 組 PPI TAINAN 對決鹿逐俱樂部，以及 L1 組嘉義諸羅山FC vs 陳公舘。',
    category: 'Official',
    imageUrl: '/d-league/assets/news/schedule-r2.png', 
    timestamp: new Date('2025-10-29T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (贊助合作聲明)
  // ===============================================
  {
    id: 'official-statement-20251105',
    title: '💬《關於本賽季贊助合作聲明》',
    summary: 'D LEAGUE 發布贊助合作澄清聲明，指出與「天下之台所」的贊助案最終並未真正成案。聯賽現階段所有活動、宣傳皆與該餐廳無關，並強調合作提案最初由對方主動提出。',
    category: 'Official',
    imageUrl: '/d-league/assets/news/official-statement.png', 
    timestamp: new Date('2025-11-05T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (蒼龍 FC 4-3 絕殺屏東野猿)
  // ===============================================
  {
    id: 'match-report-m9-20251105',
    title: '【賽後戰報】蒼龍 FC 4-3 絕殺屏東野猿，上演三次大逆轉',
    summary: 'D LEAGUE L2 組上演進球大戰，蒼龍 FC 憑藉毛邦澤的直接角球破門和終場前王浩誠的絕殺自由球，最終以 4:3 驚險擊敗屏東野猿足球俱樂部，拿下本賽季首勝。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r2-m9.png', 
    timestamp: new Date('2025-11-05T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (瘋Dog 4-0 鳥仕)
  // ===============================================
  {
    id: 'match-report-m8-20251104',
    title: '【賽後戰報】瘋Dog 4-0 大勝鳥仕足球俱樂部，繼續領跑積分榜',
    summary: 'D LEAGUE L2 第 2 輪，瘋Dog以 4:0 完勝鳥仕足球俱樂部。文俊偉頭槌首開紀錄，隊長戴威閎梅開二度，瘋Dog繼續保持強勁火力，穩居積分榜榜首。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r2-m8.png', 
    timestamp: new Date('2025-11-04T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (PPI TAINAN 6-0 鹿逐俱樂部)
  // ===============================================
  {
    id: 'match-report-m7-20251103',
    title: '【賽後戰報】PPI TAINAN 6-0 大勝鹿逐俱樂部，優沙、YEHUDA 各梅開二度',
    summary: 'D LEAGUE L2 組第 2 輪，PPI TAINAN 以 6:0 狂勝鹿逐俱樂部。隊長優沙和 YEHUDA GAGAH WICAKSONO 各梅開二度，成為取勝關鍵人物，展現驚人火力。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r2-m7.png', 
    timestamp: new Date('2025-11-03T14:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (嘉義 0-2 陳公舘)
  // ===============================================
  {
    id: 'match-report-m6-20251103',
    title: '【賽後戰報】陳公舘 2-0 擊敗嘉義諸羅山FC，吳明威洪品宇建功',
    summary: 'D LEAGUE L1 第 2 輪，陳公舘 2:0 戰勝嘉義諸羅山FC。吳明威開場 4 分鐘即速攻破門，洪品宇在比賽末段第 37 分鐘鎖定勝局，為陳公舘穩固領先地位。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r2-m6.png', 
    timestamp: new Date('2025-11-03T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (鳥仕 1-0 PPI TAINAN)
  // ===============================================
  {
    id: 'match-report-m5-20251025',
    title: '【賽後戰報】鳥仕足球俱樂部 1-0 小勝 PPI TAINAN，王竣弘致勝一球',
    summary: 'D LEAGUE L2 組，PPI TAINAN 雖掌握多次進攻機會，但在下半場第 25 分鐘被鳥仕足球俱樂部王竣弘攻入全場唯一進球，鳥仕最終以 1:0 險勝，拿下寶貴三分。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r1-m5.png', 
    timestamp: new Date('2025-10-25T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (陳公舘 2-0 銅雀足球俱樂部)
  // ===============================================
  {
    id: 'match-report-m4-20251024',
    title: '【賽後戰報】陳公舘兩罰兩中，2-0 擊敗銅雀足球俱樂部',
    summary: 'D LEAGUE L1 組首輪，陳公舘吳明威與洪品丞先後主罰點球命中，最終以 2:0 擊敗銅雀足球俱樂部，收下寶貴的開季首勝。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r1-m4.png', 
    timestamp: new Date('2025-10-24T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (酒號矯正署 5-1 嘉義諸羅山FC)
  // ===============================================
  {
    id: 'match-report-m3-20251021',
    title: '【賽後戰報】酒號矯正署 5-1 逆轉嘉義諸羅山FC，顏廷邕、鄭詠翰領銜',
    summary: 'D LEAGUE L1 組首戰由嘉義諸羅山FC的陳官澤率先破網，但隨後酒號矯正署顏廷邕、鄭詠翰等五位球員連追五球，以 5:1 逆轉取勝，拿下 L1 開門紅。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r1-m3.png', 
    timestamp: new Date('2025-10-21T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (瘋Dog 5:0蒼龍 FC)
  // ===============================================
  {
    id: 'match-report-m2-20251020',
    title: '【賽後戰報】瘋Dog 張博宇帽子戲法，5-0 大勝蒼龍 FC',
    summary: 'D LEAGUE L2 組首輪，瘋Dog 在隊長吳亦民開場破門後，由張博宇在下半場 4 分鐘內完成帽子戲法，最終以 5:0 大勝 10 人應戰的蒼龍 FC，暫列榜首。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r1-m2.png', 
    timestamp: new Date('2025-10-20T10:30:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (鹿逐 1:2 屏東野猿)
  // ===============================================
  {
    id: 'match-report-m1-20251020',
    title: '【賽後戰報】屏東野猿 2-1 逆轉擊敗鹿逐俱樂部，吳明遠梅開二度',
    summary: 'D LEAGUE 25/26 賽季首戰，L2 組鹿逐俱樂部對上屏東野猿足球俱樂部。吳明遠在中場開球後立刻遠射扳平比分並在 32 分鐘梅開二度，助屏東野猿以 2-1 逆轉拿下賽季首勝。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r1-m1.png', 
    timestamp: new Date('2025-10-20T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (Ready To Play！首輪賽程公佈)
  // ===============================================
  {
    id: 'schedule-r1-20251019',
    title: 'Ready To Play！25/26 賽季首輪賽程公佈',
    summary: 'D LEAGUE 25/26 賽季即將於 10/19（日）在台南仁德文賢國中人工草皮正式開踢！首日將有五場 L1/L2 焦點賽事，請大家準時鎖定。',
    category: 'Official',
    imageUrl: '/d-league/assets/news/ready-to-play.png', 
    timestamp: new Date('2025-10-16T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (聯賽啟動在即)
  // ===============================================
  {
    id: 'starting-soon-20250917',
    title: '聯賽啟動在即：公佈參賽隊伍與核心精神',
    summary: 'D LEAGUE 公佈 L1 及 L2 組參賽隊伍，並重申聯賽核心理念「讓更多人願意踢、能夠踢、享受踢」。同時強調裁判培訓將是賽季重點。',
    category: 'Official',
    imageUrl: '/d-league/assets/news/start-kickoff.png', 
    timestamp: new Date('2025-09-17T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (台港合作)
  // ===============================================
  {
    id: 'cooperation-tw-hk-2025',
    title: 'D LEAGUE 達成台港交流合作：ManOn 團隊帶來新啟發',
    summary: 'D LEAGUE 宣布與來自香港的 ManOn 足球團隊達成合作，共同舉辦球員交流活動。這次交流讓 D LEAGUE 的球員們接觸到不同的足球文化與技巧理念，相信這樣的交流對環境培養是珍貴的啟發。',
    category: 'Official',
    imageUrl: '/d-league/assets/news/hk-coop.png', 
    timestamp: new Date('2025-08-25T10:00:00Z').toISOString() 
  },
  // ===============================================
  // 👇 舊文章 (報名啟動)
  // ===============================================
  {
    id: 'announcement-20250802',
    title: 'D LEAGUE 25/26 賽季報名啟動', 
    summary: 'D LEAGUE 正式開放高階組及初階組共 12 隊名額報名！賽季將於 2025 年 10 月至 2026 年 5 月在台南文賢國中人工草皮舉行，報名截止至 8/9，請球隊把握時間。',
    category: 'Official',
    imageUrl: '/d-league/assets/news/0802.png', 
    timestamp: new Date('2025-08-02T10:00:00Z').toISOString()
  },
];

export const fetchLeagueNews = async (): Promise<NewsArticle[]> => {
  const sortedNews = MOCK_NEWS.slice().sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  return sortedNews;
};