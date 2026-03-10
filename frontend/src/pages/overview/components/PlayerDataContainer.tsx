import type { PlayerDTO } from '../../../../generated';
import { useMemo, useState } from 'react';
import { SHOW_MODE_CONFIG, ShowMode } from '../utils/showMode';
import PlayerStatsView from './PlayerStatsView.tsx';
import PlayerStatCards from './PlayerStatCards.tsx';
import VictoryPieChart from './VictoryPieChart.tsx';

type Props = {
  readonly playerData: readonly PlayerDTO[];
};

export type StatItem = {
  tag: string;
  name: string;
  value: number;
  createdAt: string;
};

const getValueByMode = (p: PlayerDTO, mode: ShowMode): number => {
  switch (mode) {
    case ShowMode.TROPHIES: return p.trophies ?? 0;
    case ShowMode.HIGHESTTROPHIES: return p.highestTrophies ?? 0;
    case ShowMode.SOLOVICTORIES: return p.soloVictories ?? 0;
    case ShowMode.DUOVICTORIES: return p.duoVictories ?? 0;
    case ShowMode.THREEVSTHREEVICTORIES: return p.threeVsThreeVictories ?? 0;
    case ShowMode.EXPLEVEL: return p.expLevel ?? 0;
    case ShowMode.EXPPOINTS: return p.expPoints ?? 0;
    default: return 0;
  }
};

function PlayerDataContainer({ playerData }: Props) {
  const [showMode, setShowMode] = useState<ShowMode>(ShowMode.TROPHIES);

  const statItems: StatItem[] = useMemo(() => {
    return playerData.map((p) => ({
      tag: p.tag ?? '',
      name: p.name ?? '',
      createdAt: p.createdAt ?? '',
      value: getValueByMode(p, showMode),
    }));
  }, [playerData, showMode]);

  const cfg = SHOW_MODE_CONFIG[showMode];
  const latest = playerData.length
    ? playerData.reduce((a, b) =>
      new Date(a.createdAt ?? 0) > new Date(b.createdAt ?? 0) ? a : b
    )
    : null;

  const modes = Object.values(ShowMode) as ShowMode[];

  return (
    <div className="flex flex-col gap-6">

      {/* Player identity banner */}
      {latest && (
        <div className="flex items-center gap-4 px-1">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">{latest.name}</h2>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <span className="text-sm text-text-muted font-mono">#{latest.tag}</span>
              {latest.clubName && (
                <>
                  <span className="text-border-normal">·</span>
                  <span className="text-sm text-blue-bright">{latest.clubName}</span>
                </>
              )}
              {latest.isQualifiedFromChampionshipChallenge && (
                <span className="text-xs bg-blue-muted/30 text-blue-bright border border-blue-muted/50 rounded-full px-2 py-0.5 font-medium">
                  Championship Qualified
                </span>
              )}
            </div>
          </div>
          <div className="ml-auto text-right shrink-0">
            <div className="text-xs text-text-muted">Snapshots</div>
            <div className="text-lg font-bold text-text-primary">{playerData.length}</div>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <PlayerStatCards playerData={playerData} />

      {/* Charts row */}
      <div className="flex flex-col lg:flex-row gap-4">

        {/* Metric chart */}
        <div
          className="flex-1 bg-bg-card border border-border-normal rounded-2xl p-5 flex flex-col gap-4"
          style={{ minHeight: 360 }}
        >
          {/* Mode tabs */}
          <div className="flex flex-wrap gap-2">
            {modes.map((mode) => {
              const c = SHOW_MODE_CONFIG[mode];
              const active = mode === showMode;
              return (
                <button
                  key={mode}
                  id={`mode-${mode.toLowerCase()}`}
                  onClick={() => setShowMode(mode)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                    transition-all duration-200 border cursor-pointer
                    ${active
                      ? 'text-white border-transparent'
                      : 'bg-bg-base border-border-dim text-text-muted hover:border-border-normal hover:text-text-secondary'
                    }
                  `}
                  style={active ? { background: c.color, boxShadow: `0 2px 14px ${c.color}60` } : undefined}
                >
                  <c.Icon size={13} />
                  <span>{c.title}</span>
                </button>
              );
            })}
          </div>

          <div className="flex-1 min-h-0">
            <PlayerStatsView
              items={statItems}
              lineLabel={cfg.valueLabel}
              color={cfg.color}
            />
          </div>
        </div>

        {/* Pie chart */}
        <div
          className="lg:w-72 xl:w-80 bg-bg-card border border-border-normal rounded-2xl p-5 flex flex-col"
          style={{ minHeight: 320 }}
        >
          <VictoryPieChart playerData={playerData} />
        </div>

      </div>
    </div>
  );
}

export default PlayerDataContainer;
