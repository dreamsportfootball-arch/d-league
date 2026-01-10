// 檔案路徑：d-league web/cupData.ts

export interface CupTeam {
    id: string;
    name: string;
    group: 'A' | 'B'; // 新增分組欄位
}

export interface CupMatch {
    id: number;
    round: string;       // 例如：小組賽 R1, 盃賽準決賽
    timestamp: string;   // ISO 格式時間
    homeTeamId: string;
    awayTeamId: string;
    homeScore?: number;
    awayScore?: number;
    status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
    venue: 'A' | 'B';    // 新增場地欄位
}

// 1. 更新參賽球隊名單 (根據您提供的分組)
export const CUP_TEAMS: Record<string, CupTeam> = {
    // A 組
    'KAFC': { id: 'KAFC', name: 'KAFC', group: 'A' },
    'DONG_GAO': { id: 'DONG_GAO', name: '東高 FC', group: 'A' },
    'TN_SENIOR': { id: 'TN_SENIOR', name: '台南長青俱樂部', group: 'A' },
    'DONG_GANG': { id: 'DONG_GANG', name: '東港足球隊', group: 'A' },

    // B 組
    'LANDEN': { id: 'LANDEN', name: 'Landen United', group: 'B' },
    'HAPPY_NEW_YEAR': { id: 'HAPPY_NEW_YEAR', name: '新年快快樂樂', group: 'B' },
    'TNSCF': { id: 'TNSCF', name: 'TNSCF Eagles', group: 'B' },
    'WORKER': { id: 'WORKER', name: '歹命打工人', group: 'B' },
    
    };

// 2. 更新完整賽程表 (2026.02.01)
export const CUP_MATCHES: CupMatch[] = [
    // --- 小組賽 R1 (09:00) ---
    {
        id: 1,
        round: '小組賽 R1',
        timestamp: '2026-02-01T09:00:00',
        venue: 'A',
        homeTeamId: 'KAFC',
        awayTeamId: 'DONG_GAO',
        status: 'SCHEDULED'
    },
    {
        id: 2,
        round: '小組賽 R1',
        timestamp: '2026-02-01T09:00:00',
        venue: 'B',
        homeTeamId: 'TN_SENIOR',
        awayTeamId: 'DONG_GANG',
        status: 'SCHEDULED'
    },

    // --- 小組賽 R2 (09:30) ---
    {
        id: 3,
        round: '小組賽 R2',
        timestamp: '2026-02-01T09:30:00',
        venue: 'A',
        homeTeamId: 'LANDEN',
        awayTeamId: 'HAPPY_NEW_YEAR',
        status: 'SCHEDULED'
    },
    {
        id: 4,
        round: '小組賽 R2',
        timestamp: '2026-02-01T09:30:00',
        venue: 'B',
        homeTeamId: 'TNSCF',
        awayTeamId: 'WORKER',
        status: 'SCHEDULED'
    },

    // --- 小組賽 R3 (10:00) ---
    {
        id: 5,
        round: '小組賽 R3',
        timestamp: '2026-02-01T10:00:00',
        venue: 'A',
        homeTeamId: 'KAFC',
        awayTeamId: 'TN_SENIOR',
        status: 'SCHEDULED'
    },
    {
        id: 6,
        round: '小組賽 R3',
        timestamp: '2026-02-01T10:00:00',
        venue: 'B',
        homeTeamId: 'DONG_GAO',
        awayTeamId: 'DONG_GANG',
        status: 'SCHEDULED'
    },

    // --- 小組賽 R4 (10:30) ---
    {
        id: 7,
        round: '小組賽 R4',
        timestamp: '2026-02-01T10:30:00',
        venue: 'A',
        homeTeamId: 'LANDEN',
        awayTeamId: 'TNSCF',
        status: 'SCHEDULED'
    },
    {
        id: 8,
        round: '小組賽 R4',
        timestamp: '2026-02-01T10:30:00',
        venue: 'B',
        homeTeamId: 'HAPPY_NEW_YEAR',
        awayTeamId: 'WORKER',
        status: 'SCHEDULED'
    },

    // --- 小組賽 R5 (11:00) ---
    {
        id: 9,
        round: '小組賽 R5',
        timestamp: '2026-02-01T11:00:00',
        venue: 'A',
        homeTeamId: 'KAFC',
        awayTeamId: 'DONG_GANG',
        status: 'SCHEDULED'
    },
    {
        id: 10,
        round: '小組賽 R5',
        timestamp: '2026-02-01T11:00:00',
        venue: 'B',
        homeTeamId: 'DONG_GAO',
        awayTeamId: 'TN_SENIOR',
        status: 'SCHEDULED'
    },

    // --- 小組賽 R6 (11:30) ---
    {
        id: 11,
        round: '小組賽 R6',
        timestamp: '2026-02-01T11:30:00',
        venue: 'A',
        homeTeamId: 'LANDEN',
        awayTeamId: 'WORKER',
        status: 'SCHEDULED'
    },
    {
        id: 12,
        round: '小組賽 R6',
        timestamp: '2026-02-01T11:30:00',
        venue: 'B',
        homeTeamId: 'HAPPY_NEW_YEAR',
        awayTeamId: 'TNSCF',
        status: 'SCHEDULED'
    },

    // --- 休息時間 ---

    // --- 盤賽準決賽 (13:30) ---
    {
        id: 13,
        round: '盤賽準決賽',
        timestamp: '2026-02-01T13:30:00',
        venue: 'A',
        homeTeamId: 'A3',
        awayTeamId: 'B4',
        status: 'SCHEDULED'
    },
    {
        id: 14,
        round: '盤賽準決賽',
        timestamp: '2026-02-01T13:30:00',
        venue: 'B',
        homeTeamId: 'B3',
        awayTeamId: 'A4',
        status: 'SCHEDULED'
    },

    // --- 盃賽準決賽 (14:00) ---
    {
        id: 15,
        round: '盃賽準決賽',
        timestamp: '2026-02-01T14:00:00',
        venue: 'A',
        homeTeamId: 'A1',
        awayTeamId: 'B2',
        status: 'SCHEDULED'
    },
    {
        id: 16,
        round: '盃賽準決賽',
        timestamp: '2026-02-01T14:00:00',
        venue: 'B',
        homeTeamId: 'B1',
        awayTeamId: 'A2',
        status: 'SCHEDULED'
    },

    // --- 盤賽決賽/季軍 (14:30) ---
    {
        id: 17,
        round: '盤賽決賽',
        timestamp: '2026-02-01T14:30:00',
        venue: 'A',
        homeTeamId: 'W13',
        awayTeamId: 'W14',
        status: 'SCHEDULED'
    },
    {
        id: 18,
        round: '盤賽季軍',
        timestamp: '2026-02-01T14:30:00',
        venue: 'B',
        homeTeamId: 'L13',
        awayTeamId: 'L14',
        status: 'SCHEDULED'
    },

    // --- 盃賽季軍 (15:00) ---
    {
        id: 19,
        round: '盃賽季軍',
        timestamp: '2026-02-01T15:00:00',
        venue: 'A',
        homeTeamId: 'L15',
        awayTeamId: 'L16',
        status: 'SCHEDULED'
    },

    // --- 盃賽決賽 (15:30) ---
    {
        id: 20,
        round: '盃賽決賽',
        timestamp: '2026-02-01T15:30:00',
        venue: 'A',
        homeTeamId: 'W15',
        awayTeamId: 'W16',
        status: 'SCHEDULED'
    }
];