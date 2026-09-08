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

interface KitPanelProps {
  team: SeasonTeam;
  index: '01' | '02';
  label: string;
  eyebrow: 'HOME KIT' | 'AWAY KIT';
  primaryColor: string;
  secondaryColor?: string;
  pattern?: TeamKitPattern;
  atlasRow?: number;
  atlasCol?: number;
}

const KitPanel: React.FC<KitPanelProps> = ({
  team,
  index,
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
    <article className="min-w-0">
      <div className="relative aspect-square overflow-hidden border border-neutral-200 bg-neutral-50">
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500 sm:left-5 sm:top-5">
          <span className="text-brand-blue">{index}</span>
          <span aria-hidden="true" className="h-px w-5 bg-neutral-300" />
          <span>{eyebrow}</span>
        </div>

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
          <div className="absolute inset-0 flex items-center justify-center p-9 sm:p-14">
            <div
              role="img"
              aria-label={`${team.name} ${label}版型預覽`}
              className="relative h-[72%] w-[72%] drop-shadow-[0_18px_22px_rgba(0,0,0,0.12)]"
              style={{
                ...getKitStyle(primaryColor, secondaryColor, pattern),
                clipPath:
                  'polygon(20% 0, 38% 8%, 62% 8%, 80% 0, 100% 18%, 84% 34%, 76% 26%, 76% 100%, 24% 100%, 24% 26%, 16% 34%, 0 18%)',
              }}
            >
              <div className="absolute left-1/2 top-[6%] h-[12%] w-[22%] -translate-x-1/2 rounded-b-full border-b-2 border-white/60 bg-black/10" />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 border-b border-neutral-200 py-4 sm:py-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">{eyebrow}</p>
          <h3 className="mt-1 font-display text-xl font-extrabold text-brand-black sm:text-2xl">{label}</h3>
        </div>

        <div className="mt-1 flex shrink-0 overflow-hidden border border-neutral-200" aria-label={`${label}代表色`}>
          <span className="h-7 w-7" style={{ backgroundColor: primaryColor }} />
          {secondaryColor && <span className="h-7 w-7 border-l border-white/70" style={{ backgroundColor: secondaryColor }} />}
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
    <section id="kits" className="border-t border-neutral-200 pt-1">
      <div className="mb-6 flex items-end justify-between border-b border-neutral-200 py-4 sm:mb-8 sm:py-5">
        <div>
          <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-brand-blue">
            TEAM KIT · {season.shortName}
          </p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-black">球衣</h2>
        </div>
        <p className="hidden max-w-xs text-right text-xs font-semibold leading-5 text-neutral-400 sm:block">
          {team.name} · 官方比賽球衣
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 lg:gap-8">
        <KitPanel
          team={team}
          index="01"
          label="主場球衣"
          eyebrow="HOME KIT"
          primaryColor={homeColor}
          secondaryColor={team.kits?.homeSecondary}
          pattern={team.kits?.homePattern}
          atlasRow={atlas?.row}
          atlasCol={atlas?.homeCol}
        />
        <KitPanel
          team={team}
          index="02"
          label="客場球衣"
          eyebrow="AWAY KIT"
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
