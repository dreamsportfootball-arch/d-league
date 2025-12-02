import React, { useMemo } from 'react';
import { MATCHES, TEAMS } from '../constants';
import { MatchStatus, Standing } from '../types';

// 排名計算：積分 → 得失球差 → 進球
const calculateStandings = (league: 'L1' | 'L2'): Standing[] => {
  const leagueTeamIds = Object.keys(TEAMS).filter(id => {
    const playsInLeague = MATCHES.some(
      m => m.league === league && (m.homeTeamId === id || m.awayTeamId === id)
    );
    return playsInLeague;
  });

  const standingsMap: Record<string, Standing> = {};

  leagueTeamIds.forEach(teamId => {
    standingsMap[teamId] = {
      teamId,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      points: 0,
      form: [],
    };
  });

  MATCHES
    .filter(
      m =>
        m.league === league &&
        (m.status === MatchStatus.FINISHED ||
          (m.homeScore !== null && m.awayScore !== null))
    )
    .forEach(match => {
      const home = standingsMap[match.homeTeamId];
      const away = standingsMap[match.awayTeamId];
      if (!home || !away) return;

      const h = match.homeScore ?? 0;
      const a = match.awayScore ?? 0;

      home.played++;
      away.played++;
      home.gf += h;
      home.ga += a;
      away.gf += a;
      away.ga += h;

      home.gd = home.gf - home.ga;
      away.gd = away.gf - away.ga;

      if (h > a) {
        home.won++;
        home.points += 3;
        away.lost++;
        home.form.unshift('W');
        away.form.unshift('L');
      } else if (h < a) {
        away.won++;
        away.points += 3;
        home.lost++;
        away.form.unshift('W');
        home.form.unshift('L');
      } else {
        home.drawn++;
        away.drawn++;
        home.points++;
        away.points++;
        home.form.unshift('D');
        away.form.unshift('D');
      }
    });

  return Object.values(standingsMap).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });
};

// 近況小點 (優化：明確設定尺寸 w-2 h-2)
const FormBadge: React.FC<{ result: 'W' | 'D' | 'L' }> = ({ result }) => {
  let colorClass = 'bg-neutral-300';
  if (result === 'W') colorClass = 'bg-green-500';
  if (result === 'D') colorClass = 'bg-neutral-400';
  if (result === 'L') colorClass = 'bg-red-500';

  // ✅ 變更：明確設定 w-2 h-2
  return <div className={`rounded-full w-2 h-2 mx-0.5 ${colorClass}`} title={result} />;
};

// 冠軍左側藍條
const rankBar = (index: number) => (index === 0 ? 'bg-brand-blue' : 'bg-transparent');

interface StandingsProps {
  league: 'L1' | 'L2';
  variant?: 'widget' | 'page';
}

const Standings: React.FC<StandingsProps> = ({ league, variant = 'page' }) => {
  const standings = useMemo(() => calculateStandings(league), [league]);

  const isWidget = variant === 'widget';
  const limit = isWidget ? (league === 'L2' ? 6 : 5) : standings.length;
  const displayed = standings.slice(0, limit);

  // ─────────────────────────────
  // Widget 模式（首頁小榜）
  // ─────────────────────────────
  if (isWidget) {
    return (
      <div className="w-full text-xs">
        <div className="grid grid-cols-[2rem_1fr_2rem_2rem] gap-2 py-2 border-b border-neutral-100 text-neutral-500 font-bold tracking-wider text-[10px]">
          <span>#</span>
          <span>球隊</span>
          <span className="text-center">場次</span>
          <span className="text-center">積分</span>
        </div>
        {displayed.map((row, i) => {
          const team = TEAMS[row.teamId];
          return (
            <div
              key={row.teamId}
              className="grid grid-cols-[2rem_1fr_2rem_2rem] gap-2 py-3 border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors items-center"
            >
              {/* 排名指示 */}
              <div className="flex items-center relative pl-1">
                <div className={`absolute left-0 w-0.5 h-3 rounded-full ${rankBar(i)}`} />
                <span className="font-medium text-brand-black tabular-nums ml-2">{i + 1}</span>
              </div>

              <div className="flex items-center space-x-2 min-w-0">
                <img src={team.logo} className="w-5 h-5 object-contain" />
                <span className="font-bold text-brand-black truncate">{team.name}</span>
              </div>

              <span className="text-center text-brand-black tabular-nums">{row.played}</span>
              <span className="text-center font-semibold text-brand-black tabular-nums">
                {row.points}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  // ─────────────────────────────
  // Page 模式：完整表格（手機優先 名次 / 球隊 / 場次 / 勝 / 和）
  // ─────────────────────────────
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[740px] md:min-w-0 border-collapse">
        <thead className="text-[10px] md:text-[11px] font-bold tracking-widest text-neutral-500 border-b border-neutral-200">
          <tr>
            <th className="px-1 py-3 text-left w-8 md:w-10">名次</th>

            <th className="pl-2 pr-2 md:px-4 py-3 text-left w-[140px] md:w-[220px]">
              球隊
            </th>

            <th className="px-1 py-3 text-center w-10 md:w-12">場次</th>
            <th className="px-1 py-3 text-center w-10 md:w-12">勝</th>
            <th className="px-1 py-3 text-center w-10 md:w-12">和</th>

            <th className="px-1 py-3 text-center w-10 md:w-12">敗</th>
            <th className="px-1 py-3 text-center w-10 md:w-12">進球</th>
            <th className="px-1 py-3 text-center w-10 md:w-12">失球</th>

            <th className="px-1 py-3 text-center w-12 md:w-14">淨勝</th>

            <th className="px-1 py-3 text-center w-12 md:w-14 text-brand-blue">
              積分
            </th>

            <th className="px-1 py-3 text-left w-[50px] md:w-[60px]">近況</th>
          </tr>
        </thead>

        <tbody>
          {displayed.map((row, i) => {
            const team = TEAMS[row.teamId];
            const isChampion = i === 0;

            return (
              <tr
                key={row.teamId}
                className="group hover:bg-neutral-50/50 transition-colors border-b border-neutral-100 last:border-0"
              >
                {/* 名次 + 左側藍條 */}
                <td className="px-1 py-3 w-8 md:w-10">
                  <div className="flex items-center relative pl-1">
                    {/* ✅ 變更：將 w-2 縮回 w-1，維持 h-6 高度 */}
                    <div className={`absolute left-0 w-1 h-6 rounded-full ${rankBar(i)}`} />
                    <span
                      className={`font-mono text-xs md:text-sm ml-3 tabular-nums font-bold text-brand-black`}
                    >
                      {i + 1}
                    </span>
                  </div>
                </td>

                {/* 球隊 */}
                <td className="pl-2 pr-2 md:px-4 py-3 w-[140px] md:w-[220px] whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <img
                      src={team.logo}
                      className="w-7 h-7 md:w-8 md:h-8 object-contain shrink-0"
                    />
                    <span className="font-bold text-xs md:text-sm text-brand-black">
                      {team.name}
                    </span>
                  </div>
                </td>

                {/* 場次 / 勝 / 和 */}
                <td className="px-1 py-3 text-center text-xs md:text-sm text-brand-black tabular-nums w-10 md:w-12">
                  {row.played}
                </td>
                <td className="px-1 py-3 text-center text-xs md:text-sm text-brand-black tabular-nums w-10 md:w-12">
                  {row.won}
                </td>
                <td className="px-1 py-3 text-center text-xs md:text-sm text-brand-black tabular-nums w-10 md:w-12">
                  {row.drawn}
                </td>

                {/* 敗 / 進球 / 失球 */}
                <td className="px-1 py-3 text-center text-xs md:text-sm text-brand-black tabular-nums w-10 md:w-12">
                  {row.lost}
                </td>
                <td className="px-1 py-3 text-center text-xs md:text-sm text-brand-black tabular-nums w-10 md:w-12">
                  {row.gf}
                </td>
                <td className="px-1 py-3 text-center text-xs md:text-sm text-brand-black tabular-nums w-10 md:w-12">
                  {row.ga}
                </td>

                {/* 淨勝 */}
                <td className="px-1 py-3 text-center w-12 md:w-14">
                  <span className="text-xs md:text-sm text-brand-black tabular-nums">
                    {row.gd > 0 ? `+${row.gd}` : row.gd}
                  </span>
                </td>

                {/* 積分 */}
                <td className="px-1 py-3 text-center w-12 md:w-14">
                  <span className="text-xs md:text-sm font-semibold text-brand-black tabular-nums">
                    {row.points}
                  </span>
                </td>

                {/* 近況：欄寬固定 */}
                <td className="px-1 py-3 text-left w-[50px] md:w-[60px]">
                  <div className="flex items-center h-full">
                    {row.form.slice(0, 3).map((r, j) => (
                      <FormBadge key={j} result={r as any} />
                    ))}
                    {row.form.length === 0 && (
                      <span className="text-neutral-300 text-xs">-</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;