import type { SeasonId } from '../types/season';

export interface TeamKitAssetPair {
  home?: string;
  away?: string;
}

const TEAM_KIT_ASSETS: Partial<Record<SeasonId, Record<string, TeamKitAssetPair>>> = {
  '2026-27': {
    t_tainan_evergreen_2026: {
      home: 'assets/seasons/2026-27/kits/tainan-evergreen-home.webp',
      away: 'assets/seasons/2026-27/kits/tainan-evergreen-away.webp',
    },
  },
};

export const getTeamKitAssets = (
  seasonId: SeasonId,
  teamId: string,
): TeamKitAssetPair | undefined => TEAM_KIT_ASSETS[seasonId]?.[teamId];
