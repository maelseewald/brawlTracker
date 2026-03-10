import type { PlayerDTO } from '../../../../generated';
import type { ComponentType } from 'react';
import {
    TrophyIcon,
    StarIcon,
    SoloIcon,
    DuoIcon,
    TrioIcon,
    ExpIcon,
    PrestigeIcon,
    RobotIcon,
} from './icons';

type Props = {
    playerData: readonly PlayerDTO[];
};

function getLatest(playerData: readonly PlayerDTO[]): PlayerDTO | null {
    if (!playerData.length) return null;
    return playerData.reduce((a, b) =>
        new Date(a.createdAt ?? 0) > new Date(b.createdAt ?? 0) ? a : b
    );
}

type IconProps = { className?: string; size?: number };

type StatCardProps = {
    label: string;
    value: string | number;
    Icon: ComponentType<IconProps>;
    subLabel?: string;
    highlight?: boolean;
    iconColor?: string;
};

function StatCard({ label, value, Icon, subLabel, highlight, iconColor }: StatCardProps) {
    return (
        <div
            className={`
        relative flex flex-col gap-2 rounded-xl p-4 border transition-all duration-300
        hover:scale-[1.02] hover:shadow-lg 
        ${highlight
                    ? 'bg-bg-card border-border-bright'
                    : 'bg-bg-card border-border-normal'
                }
      `}
            style={highlight ? { boxShadow: '0 0 24px rgba(29,111,234,0.18)' } : undefined}
        >
            <div className="flex items-center gap-2">
                <span style={{ color: iconColor ?? (highlight ? '#1d6fea' : '#4a6b94') }}>
                    <Icon size={16} />
                </span>
                <span className="text-xs font-medium tracking-wide uppercase text-text-muted">{label}</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">
                {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            {subLabel && <div className="text-xs text-text-muted leading-tight">{subLabel}</div>}
        </div>
    );
}

function PlayerStatCards({ playerData }: Props) {
    const latest = getLatest(playerData);
    if (!latest) return null;

    const cards: StatCardProps[] = [
        {
            label: 'Trophies',
            value: latest.trophies ?? 0,
            Icon: TrophyIcon,
            highlight: true,
            iconColor: '#1d6fea',
        },
        {
            label: 'Highest Trophies',
            value: latest.highestTrophies ?? 0,
            Icon: StarIcon,
            iconColor: '#0ea5e9',
        },
        {
            label: 'Solo Victories',
            value: latest.soloVictories ?? 0,
            Icon: SoloIcon,
            iconColor: '#6366f1',
        },
        {
            label: 'Duo Victories',
            value: latest.duoVictories ?? 0,
            Icon: DuoIcon,
            iconColor: '#0ea5e9',
        },
        {
            label: '3v3 Victories',
            value: latest.threeVsThreeVictories ?? 0,
            Icon: TrioIcon,
            iconColor: '#818cf8',
        },
        {
            label: 'EXP Level',
            value: latest.expLevel ?? 0,
            Icon: ExpIcon,
            iconColor: '#34d399',
            subLabel: `${(latest.expPoints ?? 0).toLocaleString()} EXP Points`,
        },
        {
            label: 'Prestige',
            value: latest.totalPrestigeLevel ?? 0,
            Icon: PrestigeIcon,
            iconColor: '#a78bfa',
        },
        {
            label: 'Best Robo Rumble',
            value: `${latest.bestRoboRumbleTime ?? 0}s`,
            Icon: RobotIcon,
            iconColor: '#38bdf8',
        },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cards.map((card) => (
                <StatCard key={card.label} {...card} />
            ))}
        </div>
    );
}

export default PlayerStatCards;
