'use client';

import { TeamId } from '@/types';
import { teamOrder, teamStyles, teamData } from '@/config/teams';

interface TeamSelectorProps {
  selectedTeams: TeamId[];
  onTeamToggle: (teamId: TeamId) => void;
}

export default function TeamSelector({ selectedTeams, onTeamToggle }: TeamSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {teamOrder.map(id => {
        const name = teamData[id];
        const styles = teamStyles[id];
        const isSelected = selectedTeams.includes(id);
        
        return (
          <button
            key={id}
            onClick={() => onTeamToggle(id)}
            className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2
              border-2 bg-[#2C2E33]
              ${isSelected 
                ? `${styles.borderSelected} ${styles.textSelected} ${styles.bgSelected} opacity-100` 
                : `${styles.border} ${styles.text} ${styles.hover} opacity-60`
              }
              hover:opacity-90
              hover:scale-105 active:scale-95`}
            title={`${styles.iconLabel}-type Team`}
          >
            <span className="text-lg" aria-label={styles.iconLabel}>{styles.icon}</span>
            <span className="font-medium">{name}</span>
          </button>
        );
      })}
    </div>
  );
}
