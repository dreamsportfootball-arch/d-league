// 檔案路徑：d-league web/cupData.ts

import { Match, Team } from './types';

// 1. 定義賀歲盃的 8 支球隊
export const CUP_TEAMS: Record<string, Team> = {
  't_workers': { id: 't_workers', name: '歹命打工人', shortName: '歹命打工人', logo: '', primaryColor: '#000000' },
  't_donggao': { id: 't_donggao', name: '東高 FC', shortName: '東高FC', logo: '', primaryColor: '#000000' },
  't_senior': { id: 't_senior', name: '台南長青俱樂部', shortName: '台南長青', logo: '', primaryColor: '#000000' },
  't_eagles': { id: 't_eagles', name: 'TNSCF Eagles', shortName: 'Eagles', logo: '', primaryColor: '#000000' },
  't_landen': { id: 't_landen', name: 'Landen United', shortName: 'Landen', logo: '', primaryColor: '#000000' },
  't_kafc': { id: 't_kafc', name: 'KAFC', shortName: 'KAFC', logo: '', primaryColor: '#000000' },
  't_happy': { id: 't_happy', name: '新年快快樂樂', shortName: '新年快樂', logo: '', primaryColor: '#000000' },
  't_donggang': { id: 't_donggang', name: '東港足球隊', shortName: '東港', logo: '', primaryColor: '#000000' },
};

// 2. 賽程目前留空，等待後續安排
export const CUP_MATCHES: Match[] = [];