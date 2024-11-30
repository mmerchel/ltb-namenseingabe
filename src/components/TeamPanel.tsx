'use client';

import { useState, useEffect, useRef } from 'react';
import { Team, TeamId } from '@/types';
import { teamStyles } from '@/config/teams';

interface TeamPanelProps {
  teams: Team[];
  onRemovePlayer: (name: string) => void;
  onMovePlayer: (playerId: string, targetTeamId: TeamId) => void;
  onDragStart: (player: string, teamId: string) => void;
  draggedPlayer: { name: string; source: 'team' | 'unassigned'; teamId?: string } | null;
  unassignedPlayers: string[];
  onMoveTeam: (sourceTeamId: TeamId, targetTeamId: TeamId) => void;
  onAddUnassignedToTeam: (teamId: TeamId) => void;
}

function TeamMoveMenu({ 
  team, 
  teams, 
  onMoveTeam, 
  onAddUnassigned, 
  unassignedCount 
}: { 
  team: Team; 
  teams: Team[]; 
  onMoveTeam: (sourceTeamId: TeamId, targetTeamId: TeamId) => void;
  onAddUnassigned: (teamId: TeamId) => void;
  unassignedCount: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="text-gray-400 hover:text-gray-200 p-1 rounded-md hover:bg-[#373A40] transition-colors"
        title="Team operations"
      >
        •••
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-[#2C2E33] border border-[#373A40] rounded-md shadow-lg z-20 min-w-[160px]">
          {unassignedCount > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddUnassigned(team.id);
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-[#373A40] transition-colors flex items-center justify-between"
            >
              <span>Add unassigned players</span>
              <span className="text-xs text-gray-500">({unassignedCount})</span>
            </button>
          )}
          <div className="px-3 py-2 text-xs text-gray-500">Move entire team to:</div>
          {teams.map(targetTeam => (
            targetTeam.id !== team.id && (
              <button
                key={targetTeam.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveTeam(team.id, targetTeam.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm ${teamStyles[targetTeam.id].text} hover:bg-[#373A40]`}
              >
                {targetTeam.name}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default function TeamPanel({ 
  teams, 
  onRemovePlayer, 
  onMovePlayer, 
  onDragStart, 
  draggedPlayer,
  unassignedPlayers,
  onMoveTeam,
  onAddUnassignedToTeam
}: TeamPanelProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="panel rounded-lg p-4 h-full overflow-y-auto scrollbar-dark">
      <h2 className="text-xl font-semibold mb-4 text-white">Teams</h2>
      
      <div className="space-y-4">
        {teams.map((team) => {
          const colors = teamStyles[team.id];
          const isDragTarget = draggedPlayer && (!draggedPlayer.teamId || draggedPlayer.teamId !== team.id);
          
          return (
            <div
              key={team.id}
              className={`team-container ${colors.bg} rounded-md p-4 border ${colors.border}
                ${isDragTarget ? 'ring-2 ring-offset-2 ring-offset-[#1a1b1e] ring-' + colors.text : ''}
                transition-all duration-200`}
              onDragOver={handleDragOver}
              onDrop={() => {
                if (draggedPlayer) {
                  onMovePlayer(draggedPlayer.name, team.id);
                }
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className={`text-lg font-medium ${colors.header}`}>
                  {team.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`${colors.text} text-sm font-medium`}>
                    {team.players.length} players
                  </span>
                  <TeamMoveMenu
                    team={team}
                    teams={teams}
                    onMoveTeam={onMoveTeam}
                    onAddUnassigned={onAddUnassignedToTeam}
                    unassignedCount={unassignedPlayers.length}
                  />
                </div>
              </div>
              <div className="space-y-2">
                {team.players.map((player) => (
                  <div
                    key={player}
                    draggable
                    onDragStart={() => onDragStart(player, team.id)}
                    className="flex justify-between items-center bg-[#2C2E33] px-3 py-2 rounded-md text-gray-200 cursor-move"
                  >
                    <span>{player}</span>
                    <button
                      onClick={() => onRemovePlayer(player)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                      aria-label={`Remove ${player}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {team.players.length === 0 && (
                <div className="text-gray-500 text-sm">No players assigned</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
