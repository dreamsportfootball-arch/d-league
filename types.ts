// 檔案路徑：d-league-_-台南夢達七人足球聯賽 (4)/types.ts

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
  league: 'L1' | 'L2';
  round: number;
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
  summary: string;   // 列表用的短摘要
  content: string;   // 👇 內頁用的完整文章 (含排版)
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