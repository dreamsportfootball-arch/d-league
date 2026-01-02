// 檔案路徑：d-league web/types.ts

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
  secondaryColor?: string;
}

export enum MatchStatus {
  SCHEDULED = 'SCHEDULED',
  LIVE = 'LIVE',
  FINISHED = 'FINISHED'
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  timestamp: string;
  venue: string;
  // 👇 修改這裡：增加了 'CUP'
  league: 'L1' | 'L2' | 'CUP'; 
  round: number | string; // 👇 修改這裡：允許 round 是文字 (例如 "決賽")
}

export interface Standing {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Official' | 'Match Report';
  imageUrl: string;
  timestamp: string;
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  date: string; 
}