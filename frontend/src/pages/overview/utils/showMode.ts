import type { ComponentType } from 'react';
import {
  TrophyIcon,
  StarIcon,
  SoloIcon,
  DuoIcon,
  TrioIcon,
  ExpIcon,
  PointsIcon,
} from '../components/icons';

export enum ShowMode {
  TROPHIES = 'TROPHIES',
  HIGHESTTROPHIES = 'HIGHESTTROPHIES',
  SOLOVICTORIES = 'SOLOVICTORIES',
  DUOVICTORIES = 'DUOVICTORIES',
  THREEVSTHREEVICTORIES = 'THREEVSTHREEVICTORIES',
  EXPLEVEL = 'EXPLEVEL',
  EXPPOINTS = 'EXPPOINTS',
}

type IconProps = { className?: string; size?: number };

export const SHOW_MODE_CONFIG: Record<
  ShowMode,
  {
    title: string;
    dataKey: string;
    valueLabel: string;
    Icon: ComponentType<IconProps>;
    color: string;
  }
> = {
  [ShowMode.TROPHIES]: {
    title: 'Trophies',
    dataKey: 'trophies',
    valueLabel: 'Trophies',
    Icon: TrophyIcon,
    color: '#1d6fea',
  },
  [ShowMode.HIGHESTTROPHIES]: {
    title: 'Highest Trophies',
    dataKey: 'highestTrophies',
    valueLabel: 'Highest Trophies',
    Icon: StarIcon,
    color: '#0ea5e9',
  },
  [ShowMode.SOLOVICTORIES]: {
    title: 'Solo Wins',
    dataKey: 'soloVictories',
    valueLabel: 'Solo Victories',
    Icon: SoloIcon,
    color: '#6366f1',
  },
  [ShowMode.DUOVICTORIES]: {
    title: 'Duo Wins',
    dataKey: 'duoVictories',
    valueLabel: 'Duo Victories',
    Icon: DuoIcon,
    color: '#0ea5e9',
  },
  [ShowMode.THREEVSTHREEVICTORIES]: {
    title: '3v3 Wins',
    dataKey: 'threeVsThreeVictories',
    valueLabel: '3v3 Victories',
    Icon: TrioIcon,
    color: '#818cf8',
  },
  [ShowMode.EXPLEVEL]: {
    title: 'EXP Level',
    dataKey: 'expLevel',
    valueLabel: 'EXP Level',
    Icon: ExpIcon,
    color: '#34d399',
  },
  [ShowMode.EXPPOINTS]: {
    title: 'EXP Points',
    dataKey: 'expPoints',
    valueLabel: 'EXP Points',
    Icon: PointsIcon,
    color: '#a78bfa',
  },
};
