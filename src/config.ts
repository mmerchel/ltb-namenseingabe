import { TeamId } from './types';

export const teamData: Record<TeamId, string> = {
  'red': 'Red Team',
  'ocean': 'Ocean Team',
  'green': 'Green Team',
  'yellow': 'Yellow Team',
  'pink': 'Pink Team',
  'blue': 'Blue Team'
};

export const teamOrder: TeamId[] = ['red', 'ocean', 'green', 'yellow', 'pink', 'blue'];

export const teamStyles = {
  'red': {
    border: 'border-red-500/30',
    borderSelected: 'border-red-400',
    text: 'text-red-500/40',
    textSelected: 'text-red-400',
    bgSelected: 'bg-red-900/20',
    hover: 'hover:border-red-400/70 hover:text-red-400/70 hover:bg-red-900/10',
    icon: '🔥',
    iconLabel: 'Fire'
  },
  'ocean': {
    border: 'border-cyan-500/30',
    borderSelected: 'border-cyan-400',
    text: 'text-cyan-500/40',
    textSelected: 'text-cyan-400',
    bgSelected: 'bg-cyan-900/20',
    hover: 'hover:border-cyan-400/70 hover:text-cyan-400/70 hover:bg-cyan-900/10',
    icon: '❄️',
    iconLabel: 'Ice'
  },
  'green': {
    border: 'border-green-500/30',
    borderSelected: 'border-green-400',
    text: 'text-green-500/40',
    textSelected: 'text-green-400',
    bgSelected: 'bg-green-900/20',
    hover: 'hover:border-green-400/70 hover:text-green-400/70 hover:bg-green-900/10',
    icon: '🌱',
    iconLabel: 'Grass'
  },
  'yellow': {
    border: 'border-yellow-500/30',
    borderSelected: 'border-yellow-400',
    text: 'text-yellow-500/40',
    textSelected: 'text-yellow-400',
    bgSelected: 'bg-yellow-900/20',
    hover: 'hover:border-yellow-400/70 hover:text-yellow-400/70 hover:bg-yellow-900/10',
    icon: '⚡',
    iconLabel: 'Electric'
  },
  'pink': {
    border: 'border-pink-500/30',
    borderSelected: 'border-pink-400',
    text: 'text-pink-500/40',
    textSelected: 'text-pink-400',
    bgSelected: 'bg-pink-900/20',
    hover: 'hover:border-pink-400/70 hover:text-pink-400/70 hover:bg-pink-900/10',
    icon: '✨',
    iconLabel: 'Fairy'
  },
  'blue': {
    border: 'border-blue-500/30',
    borderSelected: 'border-blue-400',
    text: 'text-blue-500/40',
    textSelected: 'text-blue-400',
    bgSelected: 'bg-blue-900/20',
    hover: 'hover:border-blue-400/70 hover:text-blue-400/70 hover:bg-blue-900/10',
    icon: '💧',
    iconLabel: 'Water'
  }
} as const;

export const appConfig = {
  projectName: 'LaserTag.Berlin',
  playgroundName: 'Großes Spielfeld',
  maxPlayers: 17,
  activePlayers: 16,
  maxTeams: 6
};
