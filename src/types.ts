export type TeamId = 'red' | 'ocean' | 'green' | 'yellow' | 'pink' | 'blue';

export interface Team {
  id: TeamId;
  name: string;
  players: string[];
}

export interface DraggedPlayer {
  name: string;
  source: 'team' | 'unassigned';
  teamId?: string;
}
