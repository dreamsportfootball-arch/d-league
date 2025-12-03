import { Team, Match, MatchStatus, Standing, Video, MatchEvent } from './types';

// Real D LEAGUE Teams Data
export const TEAMS: Record<string, Team> = {
  // L1 Teams (4 teams)
  't_chiayi': { id: 't_chiayi', name: '嘉義諸羅山FC', shortName: '嘉義諸羅山FC', logo: '/d-league/assets/teams/chiayi.png', primaryColor: '#90d1d2', secondaryColor: '#0e3679' },
  't_jiuhao': { id: 't_jiuhao', name: '酒號矯正署', shortName: '酒號矯正署', logo: '/d-league/assets/teams/jiuhao.png', primaryColor: '#000000', secondaryColor: '#ffffff' },
  't_tongque': { id: 't_tongque', name: '銅雀足球俱樂部', shortName: '銅雀足球俱樂部',logo: '/d-league/assets/teams/tongque.png', primaryColor: '#2a2b30', secondaryColor: '#ffffff' },
  't_chen': { id: 't_chen', name: '陳公舘', shortName: '陳公舘', logo: '/d-league/assets/teams/chen.png', primaryColor: '#000000', secondaryColor: '#8ac4e1' },
  
  // L2 Teams (6 teams)
  't_luzhu': { id: 't_luzhu', name: '鹿逐俱樂部', shortName: '鹿逐俱樂部', logo: '/d-league/assets/teams/luzhu.png', primaryColor: '#385984', secondaryColor: '#ffffff' },
  't_pingtung': { id: 't_pingtung', name: '屏東野猿足球俱樂部', shortName: '屏東野猿足球俱樂部', logo: '/d-league/assets/teams/pingtung.png', primaryColor: '#563e92', secondaryColor: '#ffffff' },
  't_crazydog': { id: 't_crazydog', name: '瘋Dog', shortName: '瘋Dog', logo: '/d-league/assets/teams/crazydog.png', primaryColor: '#ed8992', secondaryColor: '#000000' },
  't_canglong': { id: 't_canglong', name: '蒼龍FC', shortName: '蒼龍FC', logo: '/d-league/assets/teams/canglong.png', primaryColor: '#0c2450', secondaryColor: '#ffffff' },
  't_ppi': { id: 't_ppi', name: 'PPI TAINAN', shortName: 'PPI TAINAN', logo: '/d-league/assets/teams/ppi.png', primaryColor: '#004026', secondaryColor: '#ffffff' },
  't_niaoshi': { id: 't_niaoshi', name: '鳥仕足球俱樂部', shortName: '鳥仕足球俱樂部', logo: '/d-league/assets/teams/niaoshi.png', primaryColor: '#2f4d4f' },
};

const VENUE = '台南仁德文賢國中人工草';

// Helper to create date objects easily
const createDate = (dateStr: string, timeStr: string) => {
  const [year, month, day] = dateStr.split('/').map(Number);
  const [hour, minute] = timeStr.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute).toISOString();
};

export const MATCHES: Match[] = [
  // Round 1 - 2025/10/19 (COMPLETED)
  { id: 'm1', round: 1, homeTeamId: 't_luzhu', awayTeamId: 't_pingtung', homeScore: 1, awayScore: 2, status: MatchStatus.FINISHED, timestamp: createDate('2025/10/19', '10:00'), venue: VENUE, league: 'L2' },
  { id: 'm2', round: 1, homeTeamId: 't_crazydog', awayTeamId: 't_canglong', homeScore: 5, awayScore: 0, status: MatchStatus.FINISHED, timestamp: createDate('2025/10/19', '11:00'), venue: VENUE, league: 'L2' },
  { id: 'm3', round: 1, homeTeamId: 't_chiayi', awayTeamId: 't_jiuhao', homeScore: 1, awayScore: 5, status: MatchStatus.FINISHED, timestamp: createDate('2025/10/19', '13:00'), venue: VENUE, league: 'L1' },
  { id: 'm4', round: 1, homeTeamId: 't_tongque', awayTeamId: 't_chen', homeScore: 0, awayScore: 2, status: MatchStatus.FINISHED, timestamp: createDate('2025/10/19', '14:00'), venue: VENUE, league: 'L1' },
  { id: 'm5', round: 1, homeTeamId: 't_ppi', awayTeamId: 't_niaoshi', homeScore: 0, awayScore: 1, status: MatchStatus.FINISHED, timestamp: createDate('2025/10/19', '15:00'), venue: VENUE, league: 'L2' },

  // Round 2 - 2025/11/02 (COMPLETED)
  { id: 'm6', round: 2, homeTeamId: 't_chiayi', awayTeamId: 't_chen', homeScore: 0, awayScore: 2, status: MatchStatus.FINISHED, timestamp: createDate('2025/11/02', '13:00'), venue: VENUE, league: 'L1' },
  { id: 'm7', round: 2, homeTeamId: 't_ppi', awayTeamId: 't_luzhu', homeScore: 6, awayScore: 0, status: MatchStatus.FINISHED, timestamp: createDate('2025/11/02', '14:00'), venue: VENUE, league: 'L2' },
  { id: 'm8', round: 2, homeTeamId: 't_crazydog', awayTeamId: 't_niaoshi', homeScore: 4, awayScore: 0, status: MatchStatus.FINISHED, timestamp: createDate('2025/11/02', '15:00'), venue: VENUE, league: 'L2' },
  { id: 'm9', round: 2, homeTeamId: 't_canglong', awayTeamId: 't_pingtung', homeScore: 4, awayScore: 3, status: MatchStatus.FINISHED, timestamp: createDate('2025/11/02', '16:00'), venue: VENUE, league: 'L2' },

  // Round 3 - 2025/11/16 (COMPLETED)
  { id: 'm10', round: 3, homeTeamId: 't_niaoshi', awayTeamId: 't_luzhu', homeScore: 4, awayScore: 0, status: MatchStatus.FINISHED, timestamp: createDate('2025/11/16', '13:00'), venue: VENUE, league: 'L2' },
  { id: 'm11', round: 3, homeTeamId: 't_crazydog', awayTeamId: 't_pingtung', homeScore: 2, awayScore: 2, status: MatchStatus.FINISHED, timestamp: createDate('2025/11/16', '14:00'), venue: VENUE, league: 'L2' },
  { id: 'm12', round: 2, homeTeamId: 't_jiuhao', awayTeamId: 't_tongque', homeScore: 2, awayScore: 0, status: MatchStatus.FINISHED, timestamp: createDate('2025/11/16', '15:00'), venue: VENUE, league: 'L1' },
  { id: 'm13', round: 3, homeTeamId: 't_canglong', awayTeamId: 't_ppi', homeScore: 0, awayScore: 1, status: MatchStatus.FINISHED, timestamp: createDate('2025/11/16', '16:00'), venue: VENUE, league: 'L2' },

  // Round 4 - 2025/12/07
  { id: 'm14', round: 4, homeTeamId: 't_pingtung', awayTeamId: 't_ppi', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2025/12/07', '10:00'), venue: VENUE, league: 'L2' },
  { id: 'm15', round: 4, homeTeamId: 't_crazydog', awayTeamId: 't_luzhu', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2025/12/07', '11:00'), venue: VENUE, league: 'L2' },
  { id: 'm16', round: 3, homeTeamId: 't_chen', awayTeamId: 't_jiuhao', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2025/12/07', '13:00'), venue: VENUE, league: 'L1' },
  { id: 'm17', round: 3, homeTeamId: 't_chiayi', awayTeamId: 't_tongque', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2025/12/07', '14:00'), venue: VENUE, league: 'L1' },
  { id: 'm18', round: 4, homeTeamId: 't_niaoshi', awayTeamId: 't_canglong', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2025/12/07', '15:00'), venue: VENUE, league: 'L2' },

  // Round 5 - 2026/01/11
  { id: 'm19', round: 4, homeTeamId: 't_jiuhao', awayTeamId: 't_chiayi', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/01/11', '10:00'), venue: VENUE, league: 'L1' },
  { id: 'm20', round: 4, homeTeamId: 't_chen', awayTeamId: 't_tongque', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/01/11', '11:00'), venue: VENUE, league: 'L1' },
  { id: 'm21', round: 5, homeTeamId: 't_crazydog', awayTeamId: 't_ppi', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/01/11', '13:00'), venue: VENUE, league: 'L2' },
  { id: 'm22', round: 5, homeTeamId: 't_pingtung', awayTeamId: 't_niaoshi', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/01/11', '14:00'), venue: VENUE, league: 'L2' },
  { id: 'm23', round: 5, homeTeamId: 't_luzhu', awayTeamId: 't_canglong', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/01/11', '15:00'), venue: VENUE, league: 'L2' },

  // Round 6 - 2026/02/08 (Post Transfer Window)
  { id: 'm24', round: 6, homeTeamId: 't_niaoshi', awayTeamId: 't_ppi', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/02/08', '10:00'), venue: VENUE, league: 'L2' },
  { id: 'm25', round: 6, homeTeamId: 't_canglong', awayTeamId: 't_crazydog', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/02/08', '11:00'), venue: VENUE, league: 'L2' },
  { id: 'm26', round: 6, homeTeamId: 't_pingtung', awayTeamId: 't_luzhu', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/02/08', '13:00'), venue: VENUE, league: 'L2' },
  { id: 'm27', round: 5, homeTeamId: 't_chen', awayTeamId: 't_chiayi', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/02/08', '14:00'), venue: VENUE, league: 'L1' },
  { id: 'm28', round: 5, homeTeamId: 't_tongque', awayTeamId: 't_jiuhao', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/02/08', '15:00'), venue: VENUE, league: 'L1' },

  // Round 7 - 2026/03/08
  { id: 'm29', round: 6, homeTeamId: 't_jiuhao', awayTeamId: 't_chen', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/03/08', '10:00'), venue: VENUE, league: 'L1' },
  { id: 'm30', round: 6, homeTeamId: 't_tongque', awayTeamId: 't_chiayi', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/03/08', '11:00'), venue: VENUE, league: 'L1' },
  { id: 'm31', round: 7, homeTeamId: 't_niaoshi', awayTeamId: 't_crazydog', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/03/08', '13:00'), venue: VENUE, league: 'L2' },
  { id: 'm32', round: 7, homeTeamId: 't_luzhu', awayTeamId: 't_ppi', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/03/08', '14:00'), venue: VENUE, league: 'L2' },
  { id: 'm33', round: 7, homeTeamId: 't_pingtung', awayTeamId: 't_canglong', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/03/08', '15:00'), venue: VENUE, league: 'L2' },

  // Round 8 - 2026/03/22
  { id: 'm34', round: 8, homeTeamId: 't_luzhu', awayTeamId: 't_niaoshi', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/03/22', '10:00'), venue: VENUE, league: 'L2' },
  { id: 'm35', round: 8, homeTeamId: 't_ppi', awayTeamId: 't_canglong', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/03/22', '11:00'), venue: VENUE, league: 'L2' },
  { id: 'm36', round: 7, homeTeamId: 't_tongque', awayTeamId: 't_chen', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/03/22', '13:00'), venue: VENUE, league: 'L1' },
  { id: 'm37', round: 7, homeTeamId: 't_chiayi', awayTeamId: 't_jiuhao', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/03/22', '14:00'), venue: VENUE, league: 'L1' },
  { id: 'm38', round: 8, homeTeamId: 't_pingtung', awayTeamId: 't_crazydog', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/03/22', '15:00'), venue: VENUE, league: 'L2' },

  // Round 9 - 2026/04/12
  { id: 'm39', round: 9, homeTeamId: 't_luzhu', awayTeamId: 't_crazydog', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/04/12', '10:00'), venue: VENUE, league: 'L2' },
  { id: 'm40', round: 8, homeTeamId: 't_jiuhao', awayTeamId: 't_tongque', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/04/12', '11:00'), venue: VENUE, league: 'L1' },
  { id: 'm41', round: 8, homeTeamId: 't_chiayi', awayTeamId: 't_chen', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/04/12', '13:00'), venue: VENUE, league: 'L1' },
  { id: 'm42', round: 9, homeTeamId: 't_ppi', awayTeamId: 't_pingtung', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/04/12', '14:00'), venue: VENUE, league: 'L2' },
  { id: 'm43', round: 9, homeTeamId: 't_canglong', awayTeamId: 't_niaoshi', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/04/12', '15:00'), venue: VENUE, league: 'L2' },

  // Round 10 - 2026/04/26
  { id: 'm44', round: 10, homeTeamId: 't_ppi', awayTeamId: 't_crazydog', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/04/26', '10:00'), venue: VENUE, league: 'L2' },
  { id: 'm45', round: 10, homeTeamId: 't_canglong', awayTeamId: 't_luzhu', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/04/26', '11:00'), venue: VENUE, league: 'L2' },
  { id: 'm46', round: 9, homeTeamId: 't_chiayi', awayTeamId: 't_tongque', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/04/26', '13:00'), venue: VENUE, league: 'L1' },
  { id: 'm47', round: 10, homeTeamId: 't_niaoshi', awayTeamId: 't_pingtung', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/04/26', '14:00'), venue: VENUE, league: 'L2' },
  { id: 'm48', round: 9, homeTeamId: 't_chen', awayTeamId: 't_jiuhao', homeScore: null, awayScore: null, status: MatchStatus.SCHEDULED, timestamp: createDate('2026/04/26', '15:00'), venue: VENUE, league: 'L1' }
];

export const MOCK_VIDEOS: Video[] = [
  { 
    id: 'v1', 
    title: '11.16⚽️進球合輯', 
    duration: '1:23', 
    thumbnail: 'https://cdn.store-assets.com/s/783745/f/16298287.png', 
    date: '2025.10.21'
  },
  { 
    id: 'v2', 
    title: '精彩進球：林韋堯 6’⚽️11.16', 
    duration: '0:30', 
    thumbnail: "https://cdn.store-assets.com/s/783745/f/16298218.png", 
    date: '2025.11.18'
  },
  { 
    id: 'v3', 
    title: '精彩進球：YEHUDA GAGAH WICAKSONO 39‘⚽️',
    duration: '0:45', 
    thumbnail: 'https://cdn.store-assets.com/s/783745/f/16294195.png', 
    date: '2025.11.18'
  },
];

export const PLAYER_IMAGES: Record<string, string> = {
  // L1 - 嘉義諸羅山FC [cite: 1]
  '陳日揚': '/d-league/assets/players/嘉義諸羅山FC/陳日揚.png',
  '陳官澤': '/d-league/assets/players/嘉義諸羅山FC/陳官澤.png',
  '陳柏翰': '/d-league/assets/players/嘉義諸羅山FC/陳柏翰.png',
  '蔡孟勲': '/d-league/assets/players/嘉義諸羅山FC/蔡孟勲.png',
  'Jason Chan': '/d-league/assets/players/嘉義諸羅山FC/Jason Chan.png',
  '黃子睿': '/d-league/assets/players/嘉義諸羅山FC/黃子睿.png',
  '黃偉倫': '/d-league/assets/players/嘉義諸羅山FC/黃偉倫.png',
  '王至皓': '/d-league/assets/players/嘉義諸羅山FC/王至皓.png',
  '唐毓翔': '/d-league/assets/players/嘉義諸羅山FC/唐毓翔.png',
  '林柏辰': '/d-league/assets/players/嘉義諸羅山FC/林柏辰.png',
  '李裕玄': '/d-league/assets/players/嘉義諸羅山FC/李裕玄.png',
  '鄭州偉': '/d-league/assets/players/嘉義諸羅山FC/鄭州偉.png',
  '蔡吉雄': '/d-league/assets/players/嘉義諸羅山FC/蔡吉雄.png',
  '郭政達': '/d-league/assets/players/嘉義諸羅山FC/郭政達.png',
  '王建翔': '/d-league/assets/players/嘉義諸羅山FC/王建翔.png',
  '黃楷堯': '/d-league/assets/players/嘉義諸羅山FC/黃楷堯.png',
  '李俊逵': '/d-league/assets/players/嘉義諸羅山FC/李俊逵.png',
  
  // L1 - 陳公舘 [cite: 2]
  '李秉錦': '/d-league/assets/players/陳公舘/李秉錦.png',
  '林家銘': '/d-league/assets/players/陳公舘/林家銘.png',
  '倪柏瑄': '/d-league/assets/players/陳公舘/倪柏瑄.png',
  '孫裕程': '/d-league/assets/players/陳公舘/孫裕程.png',
  '洪品丞': '/d-league/assets/players/陳公舘/洪品丞.png',
  '陳立鑫': '/d-league/assets/players/陳公舘/陳立鑫.png',
  '潘志豪': '/d-league/assets/players/陳公舘/潘志豪.png',
  '倪天銘': '/d-league/assets/players/陳公舘/倪天銘.png',
  '楊俊雄': '/d-league/assets/players/陳公舘/楊俊雄.png',
  '劉振仕': '/d-league/assets/players/陳公舘/劉振仕.png',
  '曾龍盛': '/d-league/assets/players/陳公舘/曾龍盛.png',
  '洪品宇': '/d-league/assets/players/陳公舘/洪品宇.png',
  '陳品憲': '/d-league/assets/players/陳公舘/陳品憲.png',
  '林紀廷': '/d-league/assets/players/陳公舘/林紀廷.png',
  '張誌文': '/d-league/assets/players/陳公舘/張誌文.png',
  '吳明威': '/d-league/assets/players/陳公舘/吳明威.png',
  '洪彥翔': '/d-league/assets/players/陳公舘/洪彥翔.png',
  '王靖堯': '/d-league/assets/players/陳公舘/王靖堯.png',
  '李家勳': '/d-league/assets/players/陳公舘/李家勳.png',
  '陳俊介': '/d-league/assets/players/陳公舘/陳俊介.png',
  
  // L1 - 銅雀足球俱樂部 [cite: 3]
  '李相慶': '/d-league/assets/players/銅雀足球俱樂部/李相慶.png',
  '李偉豪': '/d-league/assets/players/銅雀足球俱樂部/李偉豪.png',
  '趙南聰': '/d-league/assets/players/銅雀足球俱樂部/趙南聰.png',
  '陳揚': '/d-league/assets/players/銅雀足球俱樂部/陳揚.png',
  '翁才竣': '/d-league/assets/players/銅雀足球俱樂部/翁才竣.png',
  '蘇智龍': '/d-league/assets/players/銅雀足球俱樂部/蘇智龍.png',
  '鄭孟育': '/d-league/assets/players/銅雀足球俱樂部/鄭孟育.png',
  '郭博彥': '/d-league/assets/players/銅雀足球俱樂部/郭博彥.png',
  '施博允': '/d-league/assets/players/銅雀足球俱樂部/施博允.png',
  '徐鈺凱': '/d-league/assets/players/銅雀足球俱樂部/徐鈺凱.png',
  '劉允閎': '/d-league/assets/players/銅雀足球俱樂部/劉允閎.png',
  '杜安': '/d-league/assets/players/銅雀足球俱樂部/杜安.png',
  '魏士閔': '/d-league/assets/players/銅雀足球俱樂部/魏士閔.png',
  '巫嘉德': '/d-league/assets/players/銅雀足球俱樂部/巫嘉德.png',
  '林宴丞': '/d-league/assets/players/銅雀足球俱樂部/林宴丞.png',
  '謝侑霖': '/d-league/assets/players/銅雀足球俱樂部/謝侑霖.png',
  '張斳恩': '/d-league/assets/players/銅雀足球俱樂部/張斳恩.png',
  '黃少威': '/d-league/assets/players/銅雀足球俱樂部/黃少威.png',
  '林晉威': '/d-league/assets/players/銅雀足球俱樂部/林晉威.png',
  '克魯茲': '/d-league/assets/players/銅雀足球俱樂部/克魯茲.jpg',
  
  // L1 - 酒號矯正署 [cite: 4]
  '林淮哲': '/d-league/assets/players/酒號矯正署/林淮哲.png',
  '何柏緯': '/d-league/assets/players/酒號矯正署/何柏緯.png',
  '李宗翰': '/d-league/assets/players/酒號矯正署/李宗翰.png',
  '黃有全': '/d-league/assets/players/酒號矯正署/黃有全.png',
  '顏廷邕': '/d-league/assets/players/酒號矯正署/顏廷邕.png',
  '陳吉龍': '/d-league/assets/players/酒號矯正署/陳吉龍.png',
  '謝孟軒': '/d-league/assets/players/酒號矯正署/謝孟軒.png',
  '曾健康': '/d-league/assets/players/酒號矯正署/曾健康.png',
  '許恩豪': '/d-league/assets/players/酒號矯正署/許恩豪.png',
  '李彼得': '/d-league/assets/players/酒號矯正署/李彼得.png',
  '林鈺閔': '/d-league/assets/players/酒號矯正署/林鈺閔.png',
  '林思維': '/d-league/assets/players/酒號矯正署/林思維.png',
  '林冠亨': '/d-league/assets/players/酒號矯正署/林冠亨.png',
  '鄭詠翰': '/d-league/assets/players/酒號矯正署/鄭詠翰.png',
  '陳揚青澔': '/d-league/assets/players/酒號矯正署/陳揚青澔.png',
  '吳啓明': '/d-league/assets/players/酒號矯正署/吳啓明.png',
  '施聖章': '/d-league/assets/players/酒號矯正署/施聖章.png',
  '劉庭嘉': '/d-league/assets/players/酒號矯正署/劉庭嘉.png',
  '何政緯': '/d-league/assets/players/酒號矯正署/何政緯.png',
  '洪毅瑋': '/d-league/assets/players/酒號矯正署/洪毅瑋.png',

  // L2 - 鹿逐俱樂部 [cite: 5]
  '陳麒竣': '/d-league/assets/players/鹿逐俱樂部/陳麒竣.png',
  '宋映德': '/d-league/assets/players/鹿逐俱樂部/宋映德.png',
  '謝詒婷': '/d-league/assets/players/鹿逐俱樂部/謝詒婷.png',
  '林伯仲': '/d-league/assets/players/鹿逐俱樂部/林伯仲.png',
  '李修沛': '/d-league/assets/players/鹿逐俱樂部/李修沛.png',
  '梶原航': '/d-league/assets/players/鹿逐俱樂部/梶原航.png',
  '鐘佳勳': '/d-league/assets/players/鹿逐俱樂部/鐘佳勳.png',
  '王子豪': '/d-league/assets/players/鹿逐俱樂部/王子豪.png',
  '陳泰盛': '/d-league/assets/players/鹿逐俱樂部/陳泰盛.png',
  '林敬祐': '/d-league/assets/players/鹿逐俱樂部/林敬祐.png',
  '陳穧元': '/d-league/assets/players/鹿逐俱樂部/陳穧元.png',
  '李祐任': '/d-league/assets/players/鹿逐俱樂部/李祐任.png',
  '蔡昀晏': '/d-league/assets/players/鹿逐俱樂部/蔡昀晏.png',
  '方韻雅': '/d-league/assets/players/鹿逐俱樂部/方韻雅.png',

  // L2 - 屏東野猿足球俱樂部 [cite: 6]
  '邱文良': '/d-league/assets/players/屏東野猿足球俱樂部/邱文良.png',
  '周宗德': '/d-league/assets/players/屏東野猿足球俱樂部/周宗德.png',
  '尤尚佑': '/d-league/assets/players/屏東野猿足球俱樂部/尤尚佑.png',
  '林彥文': '/d-league/assets/players/屏東野猿足球俱樂部/林彥文.png',
  '林大雄': '/d-league/assets/players/屏東野猿足球俱樂部/林大雄.png',
  '林聿堂': '/d-league/assets/players/屏東野猿足球俱樂部/林聿堂.png',
  '張春生': '/d-league/assets/players/屏東野猿足球俱樂部/張春生.png',
  '周承政': '/d-league/assets/players/屏東野猿足球俱樂部/周承政.png',
  '簡法亦': '/d-league/assets/players/屏東野猿足球俱樂部/簡法亦.png',
  '謝晉元': '/d-league/assets/players/屏東野猿足球俱樂部/謝晉元.png',
  '陳奕盛': '/d-league/assets/players/屏東野猿足球俱樂部/陳奕盛.png',
  '鄧進成': '/d-league/assets/players/屏東野猿足球俱樂部/鄧進成.png',
  '黃旭盛': '/d-league/assets/players/屏東野猿足球俱樂部/黃旭盛.png',
  '張富勝': '/d-league/assets/players/屏東野猿足球俱樂部/張富勝.png',
  '簡罡正': '/d-league/assets/players/屏東野猿足球俱樂部/簡罡正.png',
  '吳明遠': '/d-league/assets/players/屏東野猿足球俱樂部/吳明遠.png',
  '連哲緯': '/d-league/assets/players/屏東野猿足球俱樂部/連哲緯.png',
  '林韋堯': '/d-league/assets/players/屏東野猿足球俱樂部/林韋堯.png',
  '李偲瑋': '/d-league/assets/players/屏東野猿足球俱樂部/李偲瑋.png',
  '蘇靖堂': '/d-league/assets/players/屏東野猿足球俱樂部/蘇靖堂.png',

  // L2 - 瘋Dog [cite: 7]
  '黃震浩': '/d-league/assets/players/瘋Dog/黃震浩.png',
  '吳亦民': '/d-league/assets/players/瘋Dog/吳亦民.png',
  '林柏佑': '/d-league/assets/players/瘋Dog/林柏佑.png',
  '翁吉韡': '/d-league/assets/players/瘋Dog/翁吉韡.png',
  '王柏元': '/d-league/assets/players/瘋Dog/王柏元.png',
  '劉佳興': '/d-league/assets/players/瘋Dog/劉佳興.png',
  '文俊偉': '/d-league/assets/players/瘋Dog/文俊偉.png',
  '張博宇': '/d-league/assets/players/瘋Dog/張博宇.png',
  '徐鐸': '/d-league/assets/players/瘋Dog/徐鐸.png',
  '陳建宏': '/d-league/assets/players/瘋Dog/陳建宏.png',
  '趙學克': '/d-league/assets/players/瘋Dog/趙學克.png',
  '趙學邦': '/d-league/assets/players/瘋Dog/趙學邦.png',
  '江展宇': '/d-league/assets/players/瘋Dog/江展宇.png',
  '王亦瑋': '/d-league/assets/players/瘋Dog/王亦瑋.png',
  '戴威閎': '/d-league/assets/players/瘋Dog/戴威閎.png',
  '陳柏諧': '/d-league/assets/players/瘋Dog/陳柏諧.png',
  '蔡穎杰': '/d-league/assets/players/瘋Dog/蔡穎杰.png',

  // L2 - 鳥仕足球俱樂部 [cite: 8]
  '許御力': '/d-league/assets/players/鳥仕足球俱樂部/許御力.png',
  '王志誠': '/d-league/assets/players/鳥仕足球俱樂部/王志誠.png',
  '蔡軒誠': '/d-league/assets/players/鳥仕足球俱樂部/蔡軒誠.png',
  '于克元': '/d-league/assets/players/鳥仕足球俱樂部/于克元.png',
  '于克偉': '/d-league/assets/players/鳥仕足球俱樂部/于克偉.png',
  '蘇敦祺': '/d-league/assets/players/鳥仕足球俱樂部/蘇敦祺.png',
  '林欣楷': '/d-league/assets/players/鳥仕足球俱樂部/林欣楷.png',
  '邱睦容': '/d-league/assets/players/鳥仕足球俱樂部/邱睦容.png',
  '吳昱陞': '/d-league/assets/players/鳥仕足球俱樂部/吳昱陞.png',
  '鄭祖鏗': '/d-league/assets/players/鳥仕足球俱樂部/鄭祖鏗.png',
  '魏以恆': '/d-league/assets/players/鳥仕足球俱樂部/魏以恆.png',
  '李家諾': '/d-league/assets/players/鳥仕足球俱樂部/李家諾.png',
  '陳嫈文': '/d-league/assets/players/鳥仕足球俱樂部/陳嫈文.png',
  '陳光禪': '/d-league/assets/players/鳥仕足球俱樂部/陳光禪.png',
  '邱俊融': '/d-league/assets/players/鳥仕足球俱樂部/邱俊融.png',
  '莫嘉瑋': '/d-league/assets/players/鳥仕足球俱樂部/莫嘉瑋.png',
  '王竣弘': '/d-league/assets/players/鳥仕足球俱樂部/王竣弘.png',
  '林耀強': '/d-league/assets/players/鳥仕足球俱樂部/林耀強.png',
  '謝俊杰': '/d-league/assets/players/鳥仕足球俱樂部/謝俊杰.png',
  '劉偉洋': '/d-league/assets/players/鳥仕足球俱樂部/劉偉洋.png',

  // L2 - PPI TAINAN FC [cite: 9]
  '杰菲': '/d-league/assets/players/PPI TAINAN FC/杰菲.png',
  '木哈馬': '/d-league/assets/players/PPI TAINAN FC/木哈馬.png',
  'Iradaf Mandaya G.A Bahrun': '/d-league/assets/players/PPI TAINAN FC/Iradaf Mandaya G.A Bahrun.png',
  '萬地': '/d-league/assets/players/PPI TAINAN FC/萬地.png',
  '伊拉曼': '/d-league/assets/players/PPI TAINAN FC/伊拉曼.png',
  '伊而凡': '/d-league/assets/players/PPI TAINAN FC/伊而凡.png',
  '麥羅': '/d-league/assets/players/PPI TAINAN FC/麥羅.png',
  '泰普曼': '/d-league/assets/players/PPI TAINAN FC/泰普曼.png',
  '拉非': '/d-league/assets/players/PPI TAINAN FC/拉非.png',
  '孺立': '/d-league/assets/players/PPI TAINAN FC/孺立.png',
  '布丹': '/d-league/assets/players/PPI TAINAN FC/布丹.png',
  '高世科': '/d-league/assets/players/PPI TAINAN FC/高世科.png',
  'YEHUDA GAGAH WICAKSONO': '/d-league/assets/players/PPI TAINAN FC/YEHUDA GAGAH WICAKSONO.png',
  '優沙': '/d-league/assets/players/PPI TAINAN FC/優沙.png',
  '拉拉': '/d-league/assets/players/PPI TAINAN FC/拉拉.png',
  '阿麥德': '/d-league/assets/players/PPI TAINAN FC/阿麥德.png',
  '牙提': '/d-league/assets/players/PPI TAINAN FC/牙提.png',
  '蘇凡迪': '/d-league/assets/players/PPI TAINAN FC/蘇凡迪.png',
  
  // L2 - 蒼龍FC [cite: 10]
  '盧冠宇': '/d-league/assets/players/蒼龍FC/盧冠宇.png',
  '沈家弘': '/d-league/assets/players/蒼龍FC/沈家弘.png',
  '王浩誠': '/d-league/assets/players/蒼龍FC/王浩誠.png',
  '毛邦澤': '/d-league/assets/players/蒼龍FC/毛邦澤.png',
  '葉晉嘉': '/d-league/assets/players/蒼龍FC/葉晉嘉.png',
  '張丞均': '/d-league/assets/players/蒼龍FC/張丞均.png',
  '林聖恩': '/d-league/assets/players/蒼龍FC/林聖恩.png',
  '潘星宇': '/d-league/assets/players/蒼龍FC/潘星宇.png',
  '楊承諺': '/d-league/assets/players/蒼龍FC/楊承諺.png',
  '洪子程': '/d-league/assets/players/蒼龍FC/洪子程.png',
  '潘晨維': '/d-league/assets/players/蒼龍FC/潘晨維.png',
  '郭彥廷': '/d-league/assets/players/蒼龍FC/郭彥廷.png',
  '鄧子博': '/d-league/assets/players/蒼龍FC/鄧子博.png',
  '丁誌暉': '/d-league/assets/players/蒼龍FC/丁誌暉.png',
  '林湧鈞': '/d-league/assets/players/蒼龍FC/林湧鈞.png',
  '黃歷迦': '/d-league/assets/players/蒼龍FC/黃歷迦.png',
  '吳嘉華': '/d-league/assets/players/蒼龍FC/吳嘉華.png',
};

// 👇 新增：比賽事件數據庫 (從 MatchEvents 搬過來的)
export type EventType = 'GOAL' | 'YELLOW_CARD' | 'RED_CARD';

export interface MatchEvent {
    id: string;
    minute: number;
    player: string;
    type: EventType;
    team: 'HOME' | 'AWAY';
}

export const MATCH_EVENTS: Record<string, MatchEvent[]> = {
    // M1: 鹿逐 (1) vs 屏東野猿 (2)
    'm1': [
        { id: 'm1-1', minute: 25, player: '陳麒竣', type: 'GOAL', team: 'HOME' },
        { id: 'm1-2', minute: 25, player: '吳明遠', type: 'GOAL', team: 'AWAY' },
        { id: 'm1-3', minute: 32, player: '吳明遠', type: 'GOAL', team: 'AWAY' },
    ],
    // M2: 瘋Dog (5) vs 蒼龍FC (0)
    'm2': [
        { id: 'm2-1', minute: 3, player: '吳亦民', type: 'GOAL', team: 'HOME' },
        { id: 'm2-2', minute: 5, player: '潘晨維', type: 'YELLOW_CARD', team: 'AWAY' },
        { id: 'm2-3', minute: 5, player: '潘晨維', type: 'RED_CARD', team: 'AWAY' },
        { id: 'm2-4', minute: 23, player: '張博宇', type: 'GOAL', team: 'HOME' },
        { id: 'm2-5', minute: 24, player: '張博宇', type: 'GOAL', team: 'HOME' },
        { id: 'm2-6', minute: 26, player: '張博宇', type: 'GOAL', team: 'HOME' },
        { id: 'm2-7', minute: 28, player: '王亦瑋', type: 'GOAL', team: 'HOME' },
    ],
    // M3: 嘉義諸羅山FC (1) vs 酒號矯正署 (5)
    'm3': [
        { id: 'm3-1', minute: 2, player: '陳官澤', type: 'GOAL', team: 'HOME' },
        { id: 'm3-2', minute: 14, player: '顏廷邕', type: 'GOAL', team: 'AWAY' },
        { id: 'm3-3', minute: 15, player: '鄭詠翰', type: 'GOAL', team: 'AWAY' },
        { id: 'm3-4', minute: 31, player: '林鈺閔', type: 'GOAL', team: 'AWAY' },
        { id: 'm3-5', minute: 33, player: '謝孟軒', type: 'GOAL', team: 'AWAY' },
        { id: 'm3-6', minute: 38, player: '林冠亨', type: 'GOAL', team: 'AWAY' },
    ],
    // M4: 銅雀足球俱樂部 (0) vs 陳公舘 (2)
    'm4': [
        { id: 'm4-1', minute: 18, player: '吳明威', type: 'GOAL', team: 'AWAY' },
        { id: 'm4-2', minute: 34, player: '洪品丞', type: 'GOAL', team: 'AWAY' },
    ],
    // M5: PPI TAINAN (0) vs 鳥仕足球俱樂部 (1)
    'm5': [
        { id: 'm5-1', minute: 25, player: '王竣弘', type: 'GOAL', team: 'AWAY' },
    ],
    // M6: 嘉義諸羅山FC (0) vs 陳公舘 (2)
    'm6': [
        { id: 'm6-1', minute: 4, player: '吳明威', type: 'GOAL', team: 'AWAY' },
        { id: 'm6-2', minute: 37, player: '洪品宇', type: 'GOAL', team: 'AWAY' },
    ],
    // M7: PPI TAINAN (6) vs 鹿逐俱樂部 (0)
    'm7': [
        { id: 'm7-1', minute: 9, player: '優沙', type: 'GOAL', team: 'HOME' },
        { id: 'm7-2', minute: 21, player: '高世科', type: 'GOAL', team: 'HOME' },
        { id: 'm7-3', minute: 30, player: '拉非', type: 'GOAL', team: 'HOME' },
        { id: 'm7-4', minute: 32, player: 'YEHUDA GAGAH WICAKSONO', type: 'GOAL', team: 'HOME' },
        { id: 'm7-5', minute: 37, player: '優沙', type: 'GOAL', team: 'HOME' },
        { id: 'm7-6', minute: 38, player: 'YEHUDA GAGAH WICAKSONO', type: 'GOAL', team: 'HOME' },
    ],
    // M8: 瘋Dog (4) vs 鳥仕足球俱樂部 (0)
    'm8': [
        { id: 'm8-1', minute: 4, player: '文俊偉', type: 'GOAL', team: 'HOME' },
        { id: 'm8-2', minute: 12, player: '王亦瑋', type: 'GOAL', team: 'HOME' },
        { id: 'm8-3', minute: 13, player: '戴威閎', type: 'GOAL', team: 'HOME' },
        { id: 'm8-4', minute: 33, player: '戴威閎', type: 'GOAL', team: 'HOME' },
    ],
    // M9: 蒼龍FC (4) vs 屏東野猿足球俱樂部 (3)
    'm9': [
        { id: 'm9-1', minute: 1, player: '簡法亦', type: 'GOAL', team: 'AWAY' },
        { id: 'm9-2', minute: 4, player: '毛邦澤', type: 'GOAL', team: 'HOME' },
        { id: 'm9-3', minute: 5, player: '楊承諺', type: 'GOAL', team: 'HOME' },
        { id: 'm9-4', minute: 7, player: '邱文良', type: 'GOAL', team: 'AWAY' },
        { id: 'm9-5', minute: 24, player: '林湧鈞 (烏龍球)', type: 'GOAL', team: 'AWAY' },
        { id: 'm9-6', minute: 27, player: '毛邦澤', type: 'GOAL', team: 'HOME' },
        { id: 'm9-7', minute: 32, player: '李偲瑋', type: 'YELLOW_CARD', team: 'AWAY' },
        { id: 'm9-8', minute: 40, player: '王浩誠', type: 'GOAL', team: 'HOME' },
    ],
    // M10: 鳥仕足球俱樂部 (4) vs 鹿逐俱樂部 (0)
    'm10': [
        { id: 'm10-1', minute: 19, player: '蔡軒誠', type: 'GOAL', team: 'HOME' },
        { id: 'm10-2', minute: 28, player: '王竣弘', type: 'GOAL', team: 'HOME' },
        { id: 'm10-3', minute: 33, player: '林耀強', type: 'GOAL', team: 'HOME' },
        { id: 'm10-4', minute: 36, player: '王竣弘', type: 'GOAL', team: 'HOME' },
    ],
    // M11: 瘋Dog (2) vs 屏東野猿足球俱樂部 (2)
    'm11': [
        { id: 'm11-1', minute: 6, player: '林韋堯', type: 'GOAL', team: 'AWAY' },
        { id: 'm11-2', minute: 13, player: '林韋堯', type: 'GOAL', team: 'AWAY' },
        { id: 'm11-3', minute: 24, player: '趙學邦', type: 'GOAL', team: 'HOME' },
        { id: 'm11-4', minute: 29, player: '趙學邦', type: 'GOAL', team: 'HOME' },
        { id: 'm11-5', minute: 40, player: '李偲瑋', type: 'YELLOW_CARD', team: 'AWAY' },
    ],
    // M12: 酒號矯正署 (2) vs 銅雀足球俱樂部 (0)
    'm12': [
        { id: 'm12-1', minute: 34, player: '林冠亨', type: 'GOAL', team: 'HOME' },
        { id: 'm12-2', minute: 39, player: '鄭詠翰', type: 'GOAL', team: 'HOME' },
    ],
    // M13: 蒼龍FC (0) vs PPI TAINAN (1)
    'm13': [
        { id: 'm13-1', minute: 39, player: 'YEHUDA GAGAH WICAKSONO', type: 'GOAL', team: 'AWAY' },
    ],
};