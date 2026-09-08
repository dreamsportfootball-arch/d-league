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

interface KitCardProps {
  team: SeasonTeam;
  label: string;
  eyebrow: string;
  primaryColor: string;
  secondaryColor?: string;
  pattern?: TeamKitPattern;
  atlasRow?: number;
  atlasCol?: number;
}

const KitCard: React.FC<KitCardProps> = ({
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
    <article className="group min-w-[86%] snap-center overflow-hidden rounded-2xl border border-neutral-200 bg-white sm:min-w-0">
      <div className="relative aspect-square overflow-hidden bg-neutral-50">
        <span className="absolute left-4 top-4 z-10 rounded-full border border-neutral-200 bg-white/95 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-brand-black shadow-sm backdrop-blur">
          {eyebrow}
        </span>

        {hasRealKit ? (
          <div
            role="img"
            aria-label={`${team.name} ${label}`}
            className="absolute inset-0 bg-white bg-no-repeat transition-transform duration-300 group-hover:scale-[1.015]"
            style={{
              backgroundImage: `url(${KIT_ATLAS_URL})`,
              backgroundSize: '600% 600%',
              backgroundPosition: `${atlasCol * 20}% ${atlasRow * 20}%`,
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12">
            <div
              role="img"
              aria-label={`${team.name} ${label}版型預覽`}
              className="relative h-[72%] w-[72%] drop-shadow-[0_22px_26px_rgba(0,0,0,0.14)]"
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

      <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-4 sm:px-5">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.16em] text-neutral-400">{eyebrow}</p>
          <h3 className="mt-1 text-sm font-bold text-brand-black sm:text-base">{label}</h3>
        </div>
        <span
          aria-hidden="true"
          className="h-8 w-8 rounded-full border border-neutral-200 shadow-inner"
          style={{ backgroundColor: primaryColor }}
        />
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
      <div className="mb-5 flex items-end justify-between border-b border-neutral-200 pb-3">
        <div>
          <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue">
            KIT · {season.shortName}
          </p>
          <h2 className="font-display text-2xl font-extrabold text-brand-black">球衣</h2>
        </div>
        <span className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400 sm:block">
          HOME / AWAY
        </span>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0">
        <KitCard
          team={team}
          label="主場球衣"
          eyebrow="HOME KIT"
          primaryColor={homeColor}
          secondaryColor={team.kits?.homeSecondary}
          pattern={team.kits?.homePattern}
          atlasRow={atlas?.row}
          atlasCol={atlas?.homeCol}
        />
        <KitCard
          team={team}
          label="客場球衣"
          eyebrow="AWAY KIT"
          primaryColor={awayColor}
          secondaryColor={team.kits?.awaySecondary}
          pattern={team.kits?.awayPattern}
          atlasRow={atlas?.row}
          atlasCol={atlas?.awayCol}
        />
      </div>

      <p className="mt-2 text-center text-[10px] font-semibold text-neutral-400 sm:hidden">
        左右滑動查看球衣
      </p>
    </section>,
    portalTarget,
  );
};

export default TeamKitPortal;
