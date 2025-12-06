// 檔案路徑：d-league-_-台南夢達七人足球聯賽 (4)/services/geminiService.ts

import { NewsArticle } from "../types";

export const MOCK_NEWS: NewsArticle[] = [
  // 1. PPI vs 鳥仕
  {
    id: 'match-report-m5-20251025',
    title: '鳥仕足球俱樂部 1-0 險勝 PPI TAINAN', 
    summary: 'L2 組首輪最後一場比賽，鳥仕足球俱樂部憑藉球員王竣弘的致勝一球，以 1 比 0 小勝 PPI TAINAN。',    
    content: 'D LEAGUE L2 組第一輪最後一場比賽由 PPI TAINAN 對陣鳥仕足球俱樂部 上半場戰況緊湊 雙方展開激烈攻防\n\nPPI TAINAN 在上半場率先創造多次進攻機會，但在鳥仕穩固的防守下，始終未能成功將機會轉化為進球。比賽直至下半場第 25 分鐘才打破僵局。\n\n鳥仕足球俱樂部把握 PPI TAINAN 防線出現的漏洞，利用界外球直接發動攻勢。球員王竣弘在無人看管的情況下成功攻入全場唯一的進球，為鳥仕改寫比分。\n\n取得領先優勢後，鳥仕迅速調整至穩健的防守策略，成功守住了比分，最終以 1 比 0 的比數小勝 PPI TAINAN，為聯賽首輪畫下句點。', 
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r1-m5.png', 
    timestamp: new Date('2025-10-25T15:00:00Z').toISOString() 
  },

  // 2. 銅雀 vs 陳公舘
{
  id: 'match-report-m4-20251024',
  title: '陳公舘憑藉兩記點球 2-0 戰勝銅雀',
  summary: 'L1 第一輪由銅雀足球俱樂部對上陳公舘。本場比賽兩隊在前段保持僵持，陳公舘於上下半場各獲得一次點球機會並成功把握，最終取得勝利。',
  content: `
雙方在上半場前段保持平衡

第 18 分鐘，陳公舘的吳明威在前場尋得空檔，快速前插接應隊友傳球，隨後被防守球員放倒，裁判判罰點球。吳明威親自操刀主罰命中，為陳公舘取得領先。

進入下半場，陳公舘在第 34 分鐘再次於禁區內製造威脅，隊友突破時被門將拌倒，裁判再次判罰點球。洪品丞冷靜地將球射入球門，將比分擴大至 2 比 0。

銅雀足球俱樂部雖努力組織進攻，但未能成功破門得分。最終，陳公舘以 2 比 0 的比數擊敗銅雀足球俱樂部，成功拿下本賽季的開季首勝。  `,
  category: 'Match Report',
  imageUrl: '/d-league/assets/news/match-r1-m4.png',
  timestamp: new Date('2025-10-24T14:00:00Z').toISOString()
},
  // 3. 嘉義 vs 酒號
{
  id: 'match-report-m3-20251021',
  title: '酒號矯正署連追五球 5-1 逆轉嘉義諸羅山FC',
  summary: 'D LEAGUE L1 組首輪，酒號矯正署在先失一球的情況下，連追五球，最終以 5 比 1 的比數逆轉戰勝嘉義諸羅山FC。',
  content: `
嘉義諸羅山FC對陣酒號矯正署 酒號矯正署展現韌性 連追五球成功逆轉比分

嘉義諸羅山FC開賽僅第 2 分鐘即率先破門，球員陳官澤於禁區前以一記不著地射門得分，為球隊取得領先優勢。酒號矯正署隨後發動攻勢，第 14 分鐘透過小組配合撕開防線，鄭詠翰的射門雖被門將撲出，但隊友顏廷邕及時補射成功，將比分扳平。

短短不到一分鐘後，酒號矯正署再度發動有效攻勢，鄭詠翰接應隊友傳球，連過兩名防守球員後以左腳射門破網，完成反超。

下半場，酒號矯正署的火力持續延燒。林鈺閔、謝孟軒、林冠亨先後成功進球，將比分擴大至 5 比 1，最終酒號矯正署以四球優勢贏得本場比賽。
  `,
  category: 'Match Report',
  imageUrl: '/d-league/assets/news/match-r1-m3.png',
  timestamp: new Date('2025-10-21T13:00:00Z').toISOString()
},
  // 4. 瘋Dog vs 蒼龍
{
  id: 'match-report-m2-20251020',
  title: '張博宇帽子戲法，瘋Dog 5-0 擊敗蒼龍 FC',
  summary: 'L2 組首輪，瘋Dog以 5 比 0 擊敗蒼龍 FC，球員張博宇在下半場完成帽子戲法，助球隊暫居積分榜榜首。',
  content: `
D LEAGUE L2 組的首場對決由瘋Dog對陣蒼龍 FC 蒼龍在賽事中以六人應戰 瘋Dog最終以五球的優勢獲勝

開賽第 3 分鐘，瘋Dog隊長吳亦民即在角球混戰中率先破門。比賽在第 5 分鐘出現關鍵判罰，蒼龍 FC 球員潘晨維因累積黃牌被罰離場。蒼龍在隨後的上半場中堅守防線，半場比分維持在 1 比 0。

下半場瘋Dog加強了進攻力度。第 23 分鐘，張博宇接獲隊友左路傳中後，門前推射破網。第 24 分鐘，張博宇接應傳球後突入禁區，射向遠柱再下一城。隨後，張博宇透過快速反擊，於兩分鐘內完成個人帽子戲法。

第 28 分鐘，瘋Dog成功在前場壓迫，利用對手後場傳球失誤，由隊友助攻王亦瑋推射入網，將最終比分鎖定為 5 比 0。瘋Dog最終以 5 比 0 的比數贏得本場比賽，並暫時位居積分榜榜首。  `,
  category: 'Match Report',
  imageUrl: '/d-league/assets/news/match-r1-m2.png',
  timestamp: new Date('2025-10-20T11:00:00Z').toISOString()
},
  // 5. 鹿逐 vs 屏東野猿
  {
  id: 'match-report-m1-20251020',
  title: '屏東野猿 2-1 逆轉擊敗鹿逐俱樂部',
  summary: 'L2 第一輪由鹿逐俱樂部迎戰屏東野猿足球俱樂部，雙方在開賽後展現高速節奏並各自掌握進攻機會。屏東野猿最終以逆轉之姿取得本賽季首勝。',
  content: `
本場為 2025/26 賽季 L2 的首場比賽 雙方在開局階段即展現明快節奏

鹿逐俱樂部於第 25 分鐘率先取得進球。陳麒竣在對方門將出擊後接獲隊友回傳，冷靜起腳射入空門，為球隊打開比賽局面。  
然而領先僅維持數秒，屏東野猿在中圈開球後立刻發動快速反擊，吳明遠於仍未越過中線時直接起腳遠射，皮球越過門將直入球門，迅速追平比分。

比賽進入第 32 分鐘，屏東野猿再度掌握進攻機會。界外球重新投入後，吳明遠控球轉身遠射破網，完成個人本場比賽的梅開二度。這次進球也使比賽局勢明顯傾向客隊。

最終，屏東野猿足球俱樂部以 2 比 1 逆轉擊敗鹿逐俱樂部，順利取得本賽季的第一場勝利。
  `,
  category: 'Match Report',
  imageUrl: '/d-league/assets/news/match-r1-m1.png',
  timestamp: new Date('2025-10-20T10:00:00Z').toISOString()
},

// 6. Ready To Play
{
  id: 'schedule-r1-20251016',
  title: 'D LEAGUE 2025/26 賽季第一比賽日賽程公告',
  summary: '本週日將正式迎來 2025/26 賽季的首個比賽日，L1 與 L2 隊伍將於仁德文賢國中人工草皮展開新賽季第一輪賽事。聯賽以穩定賽制與在地推動為核心，期望帶來一個兼具競爭性與文化延續的賽季。',
  content: `
本週日聯賽將正式展開，各隊將以首輪賽事開啟 2025/26 賽季的第一步

10:00 鹿逐俱樂部 vs 屏東野猿足球俱樂部
11:00 瘋Dog vs 蒼龍FC
13:00 嘉義諸羅山FC vs 酒號矯正署
14:00 銅雀俱樂部 vs 陳公舘
15:00 PPI TAINAN vs 鳥仕足球俱樂部

本賽季將於台南仁德文賢國中人工草皮球場舉行，所有賽事皆依照統一賽程進行。聯賽以「Dream It Play It」為核心精神，持續推動在地足球文化的累積與延伸，使參與者能在穩定的比賽環境中持續成長。

首個比賽日的賽事將同時呈現兩個不同組別的競爭強度，期望各隊在新賽季中展現實力，也邀請球迷與關注者持續追蹤本聯賽動態。
  `,
  category: 'Official',
  imageUrl: '/d-league/assets/news/ready-to-play.png',
  timestamp: new Date('2025-10-16T10:00:00Z').toISOString()
},

// 7. 台南準備開踢
{
  id: 'starting-soon-20250917',
  title: '2025/26 賽季即將開踢',
  summary: '本賽季將由 L1 與 L2 兩個組別展開競賽，並以推動在地足球文化、強化裁判與球員雙面發展為核心。聯賽旨在建立穩定而可持續的比賽環境，為台南足球帶來新的起點。',
  content: `
新賽季即將展開，兩個組別的參賽隊伍均已完成編組，並將於十月正式投入賽程

【L1 組】  
嘉義諸羅山FC  
陳公舘  
銅雀足球俱樂部  
酒號矯正署  

【L2 組】  
屏東野猿足球俱樂部  
瘋Dog  
鳥仕足球俱樂部  
蒼龍FC  
PPI TAINAN FC  
鹿逐俱樂部  

本聯賽以「讓更多人願意踢、能夠踢、享受踢」為核心理念，不僅提供球員穩定的比賽平台，也持續培養並支持在地裁判的成長。本季將採用資深裁判帶領資淺裁判的方式，使每一場比賽都能成為實務與經驗累積的重要場域。

Dreamsport 的概念源於「夢想的港口」，期望在有限的條件下打造一個能夠承接夢想的環境。雖然不可能完美，但將持續努力提供比現狀更好的競技空間。聯賽的籌備始於四年前，如今終於逐漸成形，期望能順利推動，也期待所有參與者共同協助，讓場上的經驗與文化持續累積。

比賽將於台南仁德文賢國中人工草皮球場舉行，歡迎各界持續關注賽事進度與最新動態。
  `,
  category: 'Official',
  imageUrl: '/d-league/assets/news/start-kickoff.png',
  timestamp: new Date('2025-09-17T10:00:00Z').toISOString()
},

// 8. 台港合作
{
  id: 'cooperation-tw-hk-20250911',
  title: '台港足球交流合作啟動',
  summary: '本聯賽與香港團隊 ManOn 共同舉辦技術交流訓練，透過跨地區合作讓球員在實作與理念層面接觸多元足球文化，進一步拓展視野與經驗。',
  content: `
本聯賽與香港團隊 ManOn 展開交流訓練合作，聚焦技術細節與訓練理念的分享，為球員提供難得的跨地區學習機會

此次活動由 ManOn 主動提出與規劃，透過分組訓練與實作示範，讓 D LEAGUE 球員有機會在同一場域中共同練習、討論與調整動作細節。過程中，球員得以親身體會不同訓練文化與指導方式所帶來的節奏與要求。

在交流過程中，從技巧應用、訓練設計到比賽觀察角度，皆產生了深入的對話與回饋。透過這樣的互動，球員不僅獲得具體的技術建議，也在思考與理解比賽的方式上得到新的啟發。

本聯賽視此類交流為推動在地足球環境的重要一環。未來將持續尋求穩定而有品質的合作機會，讓更多球員能在扎實的訓練與多元的文化刺激中成長，逐步累積並強化台南地區的足球基礎。
  `,
  category: 'Official',
  imageUrl: '/d-league/assets/news/hk-coop.png',
  timestamp: new Date('2025-09-11T10:00:00Z').toISOString()
},

// 9. 報名啟動
{
  id: 'announcement-20250802',
  title: '2025/26 賽季 D LEAGUE 報名正式開放',
  summary: '台南夢達七人足球聯賽 2025/26 賽季現正開放報名。',
  content: `
本聯賽自創立以來持續推動在地草根足球發展，並致力於建立能夠長期運作的七人制賽事系統

賽季時間：2025 年 10 月至 2026 年 5 月  
比賽地點：台南市仁德區文賢國中人工草皮球場  
分組制度：高階組與初階組，各六隊，共十二隊。

報名現正開放，截止日期為 8 月 9 日。如報名隊伍超出名額，主辦單位將保留提前截止之權利；未錄取隊伍將列入備取名單。

報名表單可於官方 Instagram 限動精選取得，亦可直接聯繫主辦單位索取。

2025/08/02
  `,
  category: 'Official',
  imageUrl: '/d-league/assets/news/0802.png',
  timestamp: new Date('2025-08-02T10:00:00Z').toISOString()
},



// 10. Match Report 13
  {
    id: 'match-report-m13-20251119',
    title: '世界波絕殺 PPI TAINAN 1-0 險勝蒼龍 FC',
    summary: 'D LEAGUE L2 組第三輪，PPI TAINAN 在比賽末段憑藉 YEHUDA GAGAH WICAKSONO 的凌空抽射得分，以 1 比 0 擊敗蒼龍 FC，全取三分。',
    content: 'D LEAGUE L2 組第三輪的比賽由蒼龍 FC 對陣 PPI TAINAN 本場比賽節奏高速 雙方從開局便持續互相壓迫 但始終未能於前段時間取得突破\n\n兩隊的攻防戰持續至比賽第 39 分鐘，PPI TAINAN 在左路製造出關鍵的得分機會。2 號孺立在邊路突破過人到底線後，送出左腳傳中。儘管球的落點偏遠，但仍落在禁區範圍內，YEHUDA GAGAH WICAKSONO 精準到位，起腳凌空抽射直取死角，為球隊攻入致勝一球。\n\n蒼龍 FC 隨後嘗試扳平比分，但未能成功破門。PPI TAINAN 最終憑藉這次尾段的絕殺攻勢全取三分，以 1 比 0 的比數險勝蒼龍 FC。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r3-m13.png', 
    timestamp: new Date('2025-11-19T10:00:00Z').toISOString() 
  },
// 11. Match Report 12
  {
    id: 'match-report-m12-20251118',
    title: '酒號矯正署 2-0 擊敗銅雀俱樂部 取得三連勝',
    summary: 'D LEAGUE L1 組第三輪，酒號矯正署憑藉林冠亨的一進球一助攻，以 2 比 0 的比數擊敗銅雀足球俱樂部，成功拿下三連勝。',
    content: 'D LEAGUE L1 組第三輪賽事由酒號矯正署對陣銅雀足球俱樂部 上半場戰況膠著 雙方均未能創造明確的破門良機\n\n僵局直至下半場第 34 分鐘才被打破。酒號矯正署從邊路發動攻勢，邊路球員吸引防守後順勢送出直塞球，林冠亨在禁區內冷靜以假動作晃開防守，隨即起腳破門，為酒號矯正署取得領先。\n\n第 39 分鐘，酒號矯正署再度抓住機會 林冠亨在前場策動攻勢 送出關鍵傳球 鄭詠翰接應後完成破門 鎖定勝局。\n\n最終，酒號矯正署以 2 比 0 的比數擊敗銅雀足球俱樂部，順利拿下本賽季的三連勝。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r3-m12.png', 
    timestamp: new Date('2025-11-18T10:00:00Z').toISOString() 
  },
// 12. Match Report 11
  {
    id: 'match-report-m11-20251117',
    title: '林韋堯趙學邦各梅開二度 瘋Dog 2-2 戰平屏東野猿',
    summary: 'D LEAGUE L2 組第三輪，瘋Dog在落後兩球的情況下，憑藉趙學邦的梅開二度，最終以 2 比 2 戰平屏東野猿足球俱樂部。',
    content: 'D LEAGUE L2 組第三輪由瘋Dog對陣屏東野猿足球俱樂部 雙方在比賽中皆有球員梅開二度 最終以和局收場\n\n屏東野猿在上半場率先取得優勢 第 6 分鐘 林韋堯成功攔截後 於禁區外起腳遠射 轟出一記世界波射向左上角 為球隊打開局面。第 13 分鐘 屏東野猿在後場完成搶斷並迅速發動反擊 林韋堯把握空檔完成梅開二度 半場以兩球領先。\n\n中場換邊後 瘋Dog展開反攻 第 24 分鐘 瘋Dog利用界外球製造威脅 界外球拋入後 19 號吳亦民故意漏頂 趙學邦在門前接應射入 追回一球。第 29 分鐘 瘋Dog在禁區內製造十二碼 吳亦民於禁區內被對手絆倒 裁判判罰點球 由趙學邦主罰命中 將比分扳成 2 比 2。\n\n雙方在尾段皆無法再創造得分機會 最終握手言和 各取一分。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r3-m11.png', 
    timestamp: new Date('2025-11-17T14:00:00Z').toISOString() 
  },
// 10. Match Report 10
  {
    id: 'match-report-m10-20251117',
    title: '鳥仕足球俱樂部 4-0 完勝鹿逐 零封取勝',
    summary: 'D LEAGUE L2 組第三輪，鳥仕足球俱樂部憑藉快速攻防轉換戰術，以 4 比 0 的比數零封鹿逐俱樂部，拿下本場勝利。',
    content: 'D LEAGUE L2 組第三輪首場比賽由鳥仕足球俱樂部對陣鹿逐俱樂部 鳥仕本場比賽多次利用快速轉換機會取得進球 最終以四球優勢獲勝\n\n鳥仕在本場比賽中多次利用門將發動快速反擊。第 19 分鐘，門將接球後立即發動攻勢，一記長距離轉移找到空位的蔡軒誠，後者面對門將冷靜射入遠角，為鳥仕先開紀錄。\n\n下半場第 28 分鐘，鳥仕複製成功套路，門將手拋球直接越過半場，王竣弘前插停球後射門，將比數拉開至 2 比 0。第 33 分鐘，鳥仕由後場組織推進，王竣弘憑藉身體優勢突破到底線後橫傳門前，林耀強近距離把握機會射入。比賽至第 36 分鐘，王竣弘在前場成功攔截，一對一突破防守後射成 4 比 0。\n\n鳥仕最終保持零封直至比賽結束，以 4 比 0 完勝鹿逐俱樂部，拿下關鍵三分。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r3-m10.png', 
    timestamp: new Date('2025-11-17T10:00:00Z').toISOString() 
  },
// 新增：11/02 第二比賽日賽程表
{
  id: 'schedule-r2-20251102',
  title: 'D LEAGUE 2025/26 賽季第二比賽日賽程公告',
  summary: '2025/26 賽季第二比賽日將於 11 月 2 日舉行，四場賽事將在仁德文賢國中人工草皮進行，各隊將持續調整狀態迎接新一輪挑戰。',
  content: `
第二比賽日賽事即將展開 本週日將進行四場例行賽

【11/02 賽程表】
13:00 嘉義諸羅山FC vs 陳公舘
14:00 PPI TAINAN vs 鹿逐俱樂部
15:00 瘋Dog vs 鳥仕足球俱樂部
16:00 蒼龍FC vs 屏東野猿足球俱樂部

本賽季所有賽事皆於台南仁德文賢國中人工草皮球場舉行。各隊將在第二個比賽日持續調整節奏，並透過比賽累積更多實戰狀態。

歡迎持續關注 D LEAGUE 2025/26 賽季最新動態。
  `,
  category: 'Official',
  imageUrl: '/d-league/assets/news/schedule-r2.png',
  timestamp: new Date('2025-11-02T10:00:00Z').toISOString()
},


  // 14. Schedule R3
  {
  id: 'schedule-r3-20251116',
  title: 'D LEAGUE 2025/26 賽季第三比賽日賽程公告',
  summary: '2025/26 賽季第三比賽日將於 11 月 16 日舉行，四場賽事將在仁德文賢國中人工草皮進行，各隊將在比賽週期中持續調整狀態並尋求積分突破。',
  content: `
本週第三比賽日即將登場 本輪共有四場例行賽事

13:00 鳥仕足球俱樂部 vs 鹿逐俱樂部
14:00 瘋Dog vs 屏東野猿足球俱樂部
15:00 酒號矯正署 vs 銅雀足球俱樂部
16:00 蒼龍FC vs PPI TAINAN

本賽季所有比賽皆於台南仁德文賢國中人工草皮球場舉行。隨著賽事進入第三比賽日，各隊將持續調整節奏並透過實戰累積狀態，爭取在積分榜上取得更佳位置。

歡迎持續關注 D LEAGUE 2025/26 賽季的最新動態。
  `,
  category: 'Official',
  imageUrl: '/d-league/assets/news/schedule-r3.png',
  timestamp: new Date('2025-11-16T10:00:00Z').toISOString()
},

  // 15. Official Statement
  {
    id: 'official-statement-20251105',
    title: '關於本賽季贊助合作事宜之正式聲明',
    summary: '針對近期有關贊助合作的詢問，D LEAGUE 聯盟特此澄清，本賽季未與「天下之台所」餐廳達成任何實際的贊助合作協議。',
    content: '本賽季 D LEAGUE 聯賽未與「天下之台所」有任何實際合作 \n\n在賽季籌備初期，基於推動在地足球的共同理念雙方曾就合作方向達成共識。\n\n當時的共識是由「天下之台所」提供部分比賽贊助，我們則協助曝光與宣傳該餐廳並在聯賽宣傳中標註為合作夥伴。\n\n不過後續對方遲未依前述內容完成贊助款項安排，所以這項合作最後並沒有真正成案。\n\n近期有傳出「主辦主動向天下之台所要贊助」的說法據了解，是對方親口向他人提及，可能雙方對合作內容的理解不同，為免誤解，在此澄清：\n\n這項贊助提案最初是由「天下之台所」主動提出，我方全程秉持誠信原則處理並據實公告說明。\n\n目前本季聯賽的所有活動、宣傳與贊助內容皆天下之台所無關。\n\n我們仍感謝對方在初期階段對在地足球的關注，也期盼未來有更完善的時機與條件，能再次攜手合作共同推動台灣足球前進。\n\n感謝真正以行動支持聯賽的夥伴。',
    category: 'Official',
    imageUrl: '/d-league/assets/news/official-statement.png', 
    timestamp: new Date('2025-11-05T10:00:00Z').toISOString() 
  },

  // 16. Match Report 9
  {
    id: 'match-report-m9-20251105',
    title: '蒼龍 FC 4-3 絕殺屏東野猿 逆轉取勝',
    summary: 'D LEAGUE L2 組第二輪，蒼龍 FC 與屏東野猿足球俱樂部上演進球大戰，蒼龍 FC 憑藉毛邦澤梅開二度及終場前的自由球絕殺，最終以 4 比 3 逆轉戰勝對手。',
    content: 'D LEAGUE L2 組的蒼龍 FC 與屏東野猿足球俱樂部展開一場高比分對決 雙方在比賽中數度交換領先優勢 戰況極為戲劇化\n\n屏東野猿在開賽僅 1 分鐘即率先破門，林韋堯成功在前場壓迫造成失誤，隨後助攻隊長簡法亦推射入網。然而，蒼龍 FC 迅速在第 4 分鐘追平，毛邦澤主罰的角球直接彎入球門，攻入一記精采的直接得分。第 5 分鐘，蒼龍 FC 楊承諺在禁區外遠射得手，將比分反超。\n\n第 7 分鐘，屏東野猿由林韋堯再次助攻，邱文良插入禁區射門得分，將比分追成 2 比 2。上半場前段節奏明快，雙方在短時間內連續攻入四球，隨後進入中場休息。\n\n換邊後，比賽再度出現變化。第 24 分鐘，屏東野猿的傳中球造成蒼龍 FC 球員林湧鈞不慎碰入自家球門，形成烏龍球，屏東野猿重新取得領先。第 27 分鐘，蒼龍 FC 再次追平比分，毛邦澤接獲隊友橫傳後冷靜射入，完成個人梅開二度。\n\n第 40 分鐘，比賽進入尾聲，蒼龍 FC 獲得自由球機會。王浩誠左腳直接起腳射門，皮球雖被守門員碰到但未能控制，最終滑入球門。蒼龍 FC 在終場前完成絕殺，最終以 4 比 3 的比數逆轉取勝。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r2-m9.png', 
    timestamp: new Date('2025-11-05T10:00:00Z').toISOString() 
  },

  // 17. Match Report 8
  {
    id: 'match-report-m8-20251104',
    title: '戴威閎梅開二度 瘋Dog 4-0 完勝鳥仕俱樂部',
    summary: 'D LEAGUE L2 組第二輪，瘋Dog以 4 比 0 完勝鳥仕足球俱樂部，隊長戴威閎梅開二度，助球隊繼續領跑積分榜。',
    content: 'D LEAGUE L2 組的焦點對決由瘋Dog對陣鳥仕足球俱樂部 瘋Dog全場持續壓制對手 並憑藉隊長優異的表現鎖定勝利\n\n開賽第 4 分鐘，瘋Dog率先打開局面。右側角球開出後，文俊偉在禁區內起跳頭槌，將球頂入球門右上角，為球隊首開紀錄。\n\n瘋Dog在第 12 分鐘再度進球。王亦瑋在禁區外獲得空檔，起腳射門直飛死角入網，以一記世界波擴大領先優勢至 2 比 0。攻勢不斷的瘋Dog在第 13 分鐘再下一城，球隊轉移到左路後，王亦瑋一路推進到底線傳中，隊長戴威閎在門前把握機會破門，上半場以 3 比 0 領先。\n\n下半場第 33 分鐘，瘋Dog再度擴大領先。對方守門員開球被攔截後，瘋Dog迅速發動反擊，形成二對一的有利局面。隊友橫傳門前，戴威閎輕鬆將球送入網中，完成個人梅開二度，將最終比分鎖定為 4 比 0。瘋Dog最終以 4 比 0 完勝鳥仕足球俱樂部，繼續穩固 L2 組積分榜的領先地位。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r2-m8.png', 
    timestamp: new Date('2025-11-04T10:00:00Z').toISOString() 
  },

  // 18. Match Report 7
  {
    id: 'match-report-m7-20251103',
    title: '優沙與 YEHUDA 梅開二度 助 PPI TAINAN 6-0 大勝鹿逐',
    summary: 'D LEAGUE L2 組第二輪，PPI TAINAN 在隊長優沙和 YEHUDA GAGAH WICAKSONO 各梅開二度的帶動下，以 6 比 0 的比數擊敗鹿逐俱樂部。',
    content: 'D LEAGUE L2 組 PPI TAINAN 對陣鹿逐俱樂部的比賽 PPI TAINAN 全場火力全開 最終以六球優勢贏得比賽\n\n上半場第 9 分鐘，PPI TAINAN 在右路發動攻勢，隊長優沙成功突破越位陷阱，單刀殺入禁區射門得分，為球隊首開紀錄。\n\n下半場開始僅一分鐘，PPI TAINAN 即擴大領先優勢。高世科在前場成功攔截對手傳球，隨後推進連過兩人，起腳射向死角，將比分改寫為 2 比 0。\n\n隨後 PPI TAINAN 完全掌握場上主動權。第 30 分鐘，拉非接應中路傳球後連續起腳攻門，最終補射破網，比分來到 3 比 0。兩分鐘後，PPI TAINAN 把握對手守門員發球失誤，YEHUDA GAGAH WICAKSONO 在禁區外直接射門得手，將比分擴大至 4 比 0。\n\n第 37 分鐘，隊長優沙接應界外球後嘗試遠射，皮球彈地入網，完成個人梅開二度。一分鐘後，PPI TAINAN 再添一球，對方守門員解圍失誤，YEHUDA GAGAH WICAKSONO 帶球過門將後射入空門，將最終比分鎖定為 6 比 0。\n\n優沙與 YEHUDA GAGAH WICAKSONO 在本場比賽中各自梅開二度，是 PPI TAINAN 取得勝利的關鍵人物。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r2-m7.png', 
    timestamp: new Date('2025-11-03T14:00:00Z').toISOString() 
  },

  // 19. Match Report 6
  {
    id: 'match-report-m6-20251103',
    title: '陳公舘 2-0 擊敗嘉義諸羅山FC 取得二連勝',
    summary: 'D LEAGUE L1 組第二輪，陳公舘憑藉吳明威和洪品宇的進球，以 2 比 0 擊敗嘉義諸羅山FC，成功取得開季二連勝。',
    content: 'D LEAGUE L1 組第二輪首場比賽由嘉義諸羅山FC對陣陳公舘 陳公舘把握開場機會並於末段再次得分 以兩球優勢贏得比賽\n\n開場第 4 分鐘，陳公舘即發動快速攻勢。林家銘在右側觀察到中路防線縫隙，果斷送出直塞球。吳明威快速啟動插入禁區接應，以一記低平快射貼地穿過門將，為陳公舘首開紀錄。\n\n隨後的比賽陷入拉鋸，雙方均未能再次改寫比分。直至第 37 分鐘，陳公舘從右路持球後轉移至左側，左路球員面對出擊的守門員選擇回傳。中路隊友第一時間起腳射門，嘉義諸羅山FC後衛雖然及時解圍，但皮球落點不遠，洪品宇把握機會補射破網。\n\n陳公舘在比賽僅剩 3 分鐘時再下一城，將比分擴大至 2 比 0，最終鎖定勝局，成功取得本賽季的二連勝。',
    category: 'Match Report',
    imageUrl: '/d-league/assets/news/match-r2-m6.png', 
    timestamp: new Date('2025-11-03T13:00:00Z').toISOString() 
  },
// Schedule R4 (第四輪賽程)
  {
    id: 'schedule-r4-20251206',
    title: 'D LEAGUE 2025/26 賽季第四比賽日賽程公告',
    summary: '台南夢達七人足球聯賽（D LEAGUE）第四輪賽事將於 12 月 7 日展開。本次公告發布五場精彩對決的比賽時間。',
    content: 'D LEAGUE 2025/26 賽季即將邁入第四輪比賽日 本輪賽事共安排五場對決 各隊伍將全力爭取積分排名\n\n聯賽第四輪賽事將於 12 月 7 日星期日，在仁德文賢國中人工草皮球場舉行。比賽自上午 10 點起展開。\n\n10:00 屏東野猿足球俱樂部 vs PPI TAINAN\n11:00 瘋Dog vs 鹿逐俱樂部\n13:00 陳公舘 vs 酒號矯正署\n14:00 嘉義諸羅山FC vs 銅雀足球俱樂部\n15:00 鳥仕足球俱樂部 vs 蒼龍FC\n\n球迷朋友請持續鎖定戰況，蒞臨現場為支持的隊伍加油。',
    category: 'Official',
    imageUrl: '/d-league/assets/news/schedule-r4.png', 
    timestamp: new Date('2025-12-06T10:00:00Z').toISOString() 
  },
// Transfer Window Correction (轉會窗更正公告)
  {
    id: 'official-transfer-correction-20251207',
    title: '2025/26 賽季季中轉會窗日期更正公告',
    summary: '台南夢達七人足球聯賽（D LEAGUE）針對 2025/26 賽季季中轉會窗日期進行更正，請各參賽隊伍留意最新時程。',
    content: '台南夢達七人足球聯賽針對 2025/26 賽季季中轉會窗之日期發布更正公告 提醒各隊伍務必留意\n\n本賽季季中轉會窗日期正式更正為 2026 年 1 月 12 日至 2026 年 2 月 5 日。\n\n請所有參賽隊伍依據此更新時程進行球員調整與註冊作業，並於規定期限內完成相關程序，以確保下半賽季之參賽資格符合規範，感謝大家的配合。',
    category: 'Official',
    imageUrl: '/d-league/assets/news/official_announcement.png', 
    timestamp: new Date('2025-12-07T10:00:00Z').toISOString() 
  },
];

export const fetchLeagueNews = async (): Promise<NewsArticle[]> => {
  const sortedNews = MOCK_NEWS.slice().sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  return sortedNews;
};