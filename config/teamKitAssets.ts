import type { SeasonId } from '../types/season';

export interface TeamKitAssetPair {
  home?: string;
  away?: string;
}

const TEAM_KIT_ASSETS: Partial<Record<SeasonId, Record<string, TeamKitAssetPair>>> = {
  '2026-27': {
    t_tainan_evergreen_2026: {
      home: 'assets/seasons/2026-27/kits/tainan-evergreen-home.png',
      away: 'assets/seasons/2026-27/kits/tainan-evergreen-away.png',
    },
    t_black_wolf_2026: {
      home: 'assets/seasons/2026-27/kits/black-wolf-fc-home.png',
      away: 'assets/seasons/2026-27/kits/black-wolf-fc-away.png',
    },
    t_alian_2026: {
      home: 'assets/seasons/2026-27/kits/alian-fc-home.png',
      away: 'assets/seasons/2026-27/kits/alian-fc-away.png',
    },
    t_kaohsiung_hk_2026: {
      home: 'assets/seasons/2026-27/kits/kaohsiung-hongkongers-fc-home.png',
      away: 'assets/seasons/2026-27/kits/kaohsiung-hongkongers-fc-away.png',
    },
    t_luzhu_2026: {
      home: 'assets/seasons/2026-27/kits/luzhu-club-home.png',
      away: 'assets/seasons/2026-27/kits/luzhu-club-away.png',
    },
    t_chen_2026: {
      home: 'assets/seasons/2026-27/kits/nanzhou-chen-home.png',
      away: 'assets/seasons/2026-27/kits/nanzhou-chen-away.png',
    },
    t_pingtung_wolves_2026: {
      home: 'assets/seasons/2026-27/kits/pingtung-wolves-fc-home.png',
      away: 'assets/seasons/2026-27/kits/pingtung-wolves-fc-away.png',
    },
    t_niaoshi_2026: {
      home: 'assets/seasons/2026-27/kits/tainan-niaoshi-home.png',
      away: 'assets/seasons/2026-27/kits/tainan-niaoshi-away.png',
    },
  },
};

export const getTeamKitAssets = (
  seasonId: SeasonId,
  teamId: string,
): TeamKitAssetPair | undefined => TEAM_KIT_ASSETS[seasonId]?.[teamId];
