import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import { isSeasonId } from '../config/seasons';
import { getTeamHistory } from '../services/entityData';
import type { SeasonTeam, TeamKitPattern } from '../types/team';

const getKitStyle = (
  primaryColor: string,
  secondaryColor?: string,
  pattern: TeamKitPattern = 'solid',
): React.CSSProperties => {
  if (pattern === 'half-and-half' && secondaryColor) {
    return {
      backgroundImage: `linear-gradient(90deg, ${primaryColor} 0 50%, ${secondaryColor} 50% 100%)`,
    };
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
}

const KitCard: React.FC<KitCardProps> = ({
  team,
  label,
  eyebrow,
  primaryColor,
  secondaryColor,
  pattern,
}) => (
  <article className="group min-w-[86%] snap-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 sm:min-w-0">
    <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-white to-neutral-50">
      <span className="absolute left-4 top-4 z-10 rounded-full border border-neutral-200 bg-white/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-brand-black shadow-sm backdrop-blur">
        {eyebrow}
      </span>

      <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12">
        <div
          role="img"
          aria-label={`${team.name} ${label}版型預覽`}
          className="relative h-[72%] w-[72%] drop-shadow-[0_22px_26px_rgba(0,0,0,0.14)] transition-transform duration-300 group-hover:scale-[1.025]"
          style={{
            ...getKitStyle(primaryColor, secondaryColor, pattern),
            clipPath:
              'polygon(20% 0, 38% 8%, 62% 8%, 80% 0, 100% 18%, 84% 34%, 76% 26%, 76% 100%, 24% 100%, 24% 26%, 16% 34%, 0 18%)',
          }}
        >
          <div className="absolute left-1/2 top-[6%] h-[12%] w-[22%] -translate-x-1/2 rounded-b-full border-b-2 border-white/60 bg-black/10" />
          <div className="absolute inset-x-[24%] bottom-[6%] h-px bg-white/30" />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-16 h-52 w-52 rounded-full opacity-[0.08] blur-3xl"
        style={{ backgroundColor: primaryColor }}
      />
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
        />
        <KitCard
          team={team}
          label="客場球衣"
          eyebrow="AWAY KIT"
          primaryColor={awayColor}
          secondaryColor={team.kits?.awaySecondary}
          pattern={team.kits?.awayPattern}
        />
      </div>

      <p className="mt-2 text-center text-[10px] font-semibold text-neutral-400 sm:hidden">左右滑動查看球衣</p>
    </section>,
    portalTarget,
  );
};

export default TeamKitPortal;
