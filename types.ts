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
  timestamp: string; // ISO string
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
  summary: string;
  category: 'Official' | 'Match Report' | 'Interview' | 'Feature';
  imageUrl: string;
  timestamp: string;
}

// 👇 修改這裡：把 views 換成 date
export interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  date: string; 
}