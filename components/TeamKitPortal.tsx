import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import { isSeasonId } from '../config/seasons';
import { getTeamHistory } from '../services/entityData';
import type { SeasonTeam, TeamKitPattern } from '../types/team';

const KIT_ATLAS_URL = `${import.meta.env.BASE_URL}assets/seasons/2026-27/kits/team-kits-atlas.webp`;

interface AtlasEntry {
  row: number;
  homeCol: number;
  awayCol: number;
}

const KIT_ATLAS_MAP: Record<string, AtlasEntry> = {
  '陳公舘': { row: 0, homeCol: 0, awayCol: 1 },
  '嘉義 235 FC': { row: 0, homeCol: 2, awayCol: 3 },
  '高雄黑騎士足球隊': { row: 0, homeCol: 4, awayCol: 5 },
  '台南長青足球俱樂部': { row: 1, homeCol: 0, awayCol: 1 },
  '阿蓮FC': { row: 1, homeCol: 2, awayCol: 3 },
  '銅雀': { row: 1, homeCol: 4, awayCol: 5 },
  '黑狼FC': { row: 2, homeCol: 0, awayCol: 1 },
  '高雄業餘足球俱樂部': { row: 2, homeCol: 2, awayCol: 3 },
  '屏東野猿足球俱樂部': { row: 2, homeCol: 4, awayCol: 5 },
  '高雄香港人足球俱樂部': { row: 3, homeCol: 0, awayCol: 1 },
  'SOUTHBOYS FC': { row: 3, homeCol: 2, awayCol: 3 },
  'WANDERERS': { row: 3, homeCol: 4, awayCol: 5 },
  '聖騎士足球俱樂部': { row: 4, homeCol: 0, awayCol: 1 },
  '鹿逐俱樂部': { row: 4, homeCol: 2, awayCol: 3 },
  'SF足球俱樂部': { row: 4, homeCol: 4, awayCol: 5 },
  '屏東野狼足球俱樂部': { row: 5, homeCol: 0, awayCol: 1 },
  'KUROMI': { row: 5, homeCol: 2, awayCol: 3 },
  '台南鳥仕足球俱樂部': { row: 5, homeCol: 4, awayCol: 5 },
};

const getKitStyle = (
  primaryColor: string,
  secondaryColor?: string,
  pattern: TeamKitPattern = 'solid',
): React.CSSProperties => {
  if (pattern === 'half-and-half' && secondaryColor) {
    return { backgroundImage: `linear-gradient(90deg, ${primaryColor} 0 50%, ${secondaryColor} 50% 100%)` };
  }

  if (pattern === 'vertical-stripes' && secondaryColor) {
    return {
      backgroundImage: `linear-gradient(90deg, ${primaryColor} 0 25%, ${secondaryColor} 25% 50%, ${primaryColor} 50% 75%, ${secondaryColor} 75% 100%)`,
    };
  }

  if (pattern === 'vertical-pinstripes' && secondaryColor) {
    return {
      backgroundImage: `repeating-linear-gradient(90deg, ${primaryColor} 0, ${primaryColor} 14px, ${secondaryColor} 14px, ${secondaryColor} 17px)`,
    };
  }

  if (pattern === 'contrast-sleeves' && secondaryColor) {
    return {
      backgroundImage: `linear-gradient(90deg, ${secondaryColor} 0 19%, ${primaryColor} 19% 81%, ${secondaryColor} 81% 100%)`,
    };
  }

  return { backgroundColor: primaryColor };
};

interface CompactKitProps {
  team: SeasonTeam;
  label: string;
  eyebrow: 'HOME' | 'AWAY';
  primaryColor: string;
  secondaryColor?: string;
  pattern?: TeamKitPattern;
  atlasRow?: number;
  atlasCol?: number;
}

const CompactKit: React.FC<CompactKitProps> = ({
  team,
  label,
  eyebrow,
  primaryColor,
  secondaryColor,
  pattern,
  atlasRow,
  atlasCol,
}) => {
  const hasRealKit = typeof atlasRow === 'number' && typeof atlasCol === 'number';

  return (
    <article className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-neutral-200 bg-neutral-50 sm:h-20 sm:w-20">
        {hasRealKit ? (
          <div
            role="img"
            aria-label={`${team.name} ${label}`}
            className="absolute inset-0 bg-white bg-no-repeat"
            style={{
              backgroundImage: `url(${KIT_ATLAS_URL})`,
              backgroundSize: '600% 600%',
              backgroundPosition: `${atlasCol * 20}% ${atlasRow * 20}%`,
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
            <div
              role="img"
              aria-label={`${team.name} ${label}版型預覽`}
              className="relative h-full w-full drop-shadow-[0_6px_8px_rgba(0,0,0,0.12)]"
              style={{
                ...getKitStyle(primaryColor, secondaryColor, pattern),
                clipPath:
                  'polygon(20% 0, 38% 8%, 62% 8%, 80% 0, 100% 18%, 84% 34%, 76% 26%, 76% 100%, 24% 100%, 24% 26%, 16% 34%, 0 18%)',
              }}
            />
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-brand-blue">{eyebrow}</p>
        <h3 className="mt-0.5 text-xs font-bold leading-tight text-brand-black sm:text-sm">{label}</h3>
        <div className="mt-2 flex items-center gap-1" aria-label={`${label}代表色`}>
          <span className="h-2.5 w-2.5 border border-black/10" style={{ backgroundColor: primaryColor }} />
          {secondaryColor && (
            <span className="h-2.5 w-2.5 border border-black/10" style={{ backgroundColor: secondaryColor }} />
          )}
        </div>
      </div>
    </article>
  );
};

const TeamKitPortal: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const requestedSeason = searchParams.get('season');
  const history = useMemo(() => getTeamHistory(id), [id]);
  const selectedRecord =
    (isSeasonId(requestedSeason)
      ? history.find((record) => record.seasonId === requestedSeason)
      : undefined) ?? history[0];
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!selectedRecord || selectedRecord.seasonId !== '2026-27') {
      setPortalTarget(null);
      return undefined;
    }

    const scheduleHeading = Array.from(document.querySelectorAll<HTMLHeadingElement>('h2')).find(
      (heading) => heading.textContent?.trim() === '賽程與賽果',
    );
    const scheduleSection = scheduleHeading?.closest('section');
    if (!scheduleSection?.parentElement) return undefined;

    const existing = scheduleSection.parentElement.querySelector<HTMLElement>('[data-team-kit-showcase-host]');
    if (existing) existing.remove();

    const host = document.createElement('div');
    host.dataset.teamKitShowcaseHost = 'true';
    scheduleSection.insertAdjacentElement('afterend', host);
    setPortalTarget(host);

    return () => {
      host.remove();
      setPortalTarget((current) => (current === host ? null : current));
    };
  }, [id, selectedRecord?.seasonId]);

  if (!selectedRecord || selectedRecord.seasonId !== '2026-27' || !portalTarget) return null;

  const { team, season } = selectedRecord;
  const homeColor = team.kits?.home ?? team.primaryColor;
  const awayColor = team.kits?.away ?? team.secondaryColor ?? '#ffffff';
  const atlas = KIT_ATLAS_MAP[team.name];

  return createPortal(
    <section id="kits">
      <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-3">
        <h2 className="font-display text-2xl font-extrabold text-brand-black">球衣</h2>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
          {season.shortName}
        </span>
      </div>

      <div className="grid max-w-md grid-cols-2 gap-3 sm:max-w-none sm:flex sm:gap-8">
        <CompactKit
          team={team}
          label="主場球衣"
          eyebrow="HOME"
          primaryColor={homeColor}
          secondaryColor={team.kits?.homeSecondary}
          pattern={team.kits?.homePattern}
          atlasRow={atlas?.row}
          atlasCol={atlas?.homeCol}
        />
        <CompactKit
          team={team}
          label="客場球衣"
          eyebrow="AWAY"
          primaryColor={awayColor}
          secondaryColor={team.kits?.awaySecondary}
          pattern={team.kits?.awayPattern}
          atlasRow={atlas?.row}
          atlasCol={atlas?.awayCol}
        />
      </div>
    </section>,
    portalTarget,
  );
};

export default TeamKitPortal;
