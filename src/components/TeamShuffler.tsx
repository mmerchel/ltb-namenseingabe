'use client';

import { useState } from 'react';
import { TeamId, Team } from '@/types';
import { teamData, appConfig } from '@/config/teams';
import TeamSelector from './TeamSelector';
import TeamPanel from './TeamPanel';
import RegistrationPanel from './RegistrationPanel';
import ConfirmDialog from './ConfirmDialog';

export default function TeamShuffler() {
  const [unassignedPlayers, setUnassignedPlayers] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<TeamId[]>(['red', 'ocean']);
  const [teams, setTeams] = useState<Team[]>(
    ['red', 'ocean'].map(id => ({
      id: id as TeamId,
      name: teamData[id as TeamId],
      players: []
    }))
  );
  const [draggedPlayer, setDraggedPlayer] = useState<{ name: string; source: 'team' | 'unassigned'; teamId?: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleTeamToggle = (teamId: TeamId) => {
    setSelectedTeams(current => {
      if (current.includes(teamId)) {
        // Move players from removed team to unassigned
        const teamToRemove = teams.find(team => team.id === teamId);
        if (teamToRemove) {
          setUnassignedPlayers(prev => [...prev, ...teamToRemove.players]);
        }
        return current.filter(id => id !== teamId);
      }
      return [...current, teamId];
    });
  };

  const handleAddPlayer = (name: string): boolean => {
    const totalPlayers = unassignedPlayers.length + 
      teams.reduce((sum, team) => sum + team.players.length, 0);

    if (totalPlayers >= appConfig.activePlayers) {
      return false;
    }

    if (!unassignedPlayers.includes(name)) {
      setUnassignedPlayers(prev => [...prev, name]);
      return true;
    }
    return false;
  };

  const handleRemovePlayer = (name: string) => {
    setUnassignedPlayers(prev => prev.filter(player => player !== name));
  };

  const handleRemoveFromTeam = (name: string) => {
    setTeams(prev => prev.map(team => ({
      ...team,
      players: team.players.filter(player => player !== name)
    })));
    setUnassignedPlayers(prev => [...prev, name]);
  };

  const handleMovePlayer = (playerId: string, targetTeamId: TeamId) => {
    if (draggedPlayer?.source === 'unassigned') {
      setUnassignedPlayers(prev => prev.filter(p => p !== playerId));
      setTeams(prev => prev.map(team => ({
        ...team,
        players: team.id === targetTeamId ? [...team.players, playerId] : team.players
      })));
    } else {
      setTeams(prev => prev.map(team => ({
        ...team,
        players: team.id === targetTeamId 
          ? [...team.players, playerId]
          : team.players.filter(p => p !== playerId)
      })));
    }
    setDraggedPlayer(null);
  };

  const handleMoveTeam = (sourceTeamId: TeamId, targetTeamId: TeamId) => {
    const sourceTeam = teams.find(team => team.id === sourceTeamId);
    if (!sourceTeam) return;

    setTeams(prev => prev.map(team => {
      if (team.id === targetTeamId) {
        return {
          ...team,
          players: [...team.players, ...sourceTeam.players]
        };
      }
      if (team.id === sourceTeamId) {
        return {
          ...team,
          players: []
        };
      }
      return team;
    }));
  };

  const handleAddUnassignedToTeam = (teamId: TeamId) => {
    if (unassignedPlayers.length === 0) return;

    setTeams(prev => prev.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          players: [...team.players, ...unassignedPlayers]
        };
      }
      return team;
    }));
    setUnassignedPlayers([]);
  };

  const shuffleTeams = () => {
    if (selectedTeams.length === 0) return;

    const allPlayers = [
      ...unassignedPlayers,
      ...teams.flatMap(team => team.players)
    ];

    if (allPlayers.length === 0) return;

    const shuffled = [...allPlayers].sort(() => Math.random() - 0.5);
    const playersPerTeam = Math.ceil(shuffled.length / selectedTeams.length);
    
    const newTeams = selectedTeams.map((id, index) => ({
      id,
      name: teamData[id],
      players: shuffled.slice(index * playersPerTeam, (index + 1) * playersPerTeam)
    }));

    setTeams(newTeams);
    setUnassignedPlayers([]);
  };

  const handleReset = () => {
    setUnassignedPlayers([]);
    setTeams(selectedTeams.map(id => ({
      id,
      name: teamData[id],
      players: []
    })));
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen p-8 bg-[#1a1b1e] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{appConfig.projectName}</h1>
              <p className="text-gray-400 text-sm">{appConfig.playgroundName}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-gray-400 bg-[#2C2E33] px-4 py-2 rounded-md">
                Total Players: <span className="text-white font-medium">
                  {unassignedPlayers.length + teams.reduce((sum, team) => sum + team.players.length, 0)}
                </span>
                <span className="text-gray-500 text-sm ml-2">
                  / {appConfig.activePlayers}
                </span>
              </div>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 bg-red-600/20 text-red-400 rounded-md 
                  hover:bg-red-600/30 transition-colors border border-red-600/30"
              >
                Reset All
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <TeamSelector 
              selectedTeams={selectedTeams}
              onTeamToggle={handleTeamToggle}
            />
            {selectedTeams.length > 0 && (
              <button
                onClick={shuffleTeams}
                disabled={unassignedPlayers.length === 0 && teams.every(team => team.players.length === 0)}
                className="px-6 py-2 bg-[#228be6] text-white rounded-md hover:bg-[#1c7ed6] 
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Shuffle Teams
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 h-[calc(100vh-16rem)]">
          <RegistrationPanel
            players={unassignedPlayers}
            onAddPlayer={handleAddPlayer}
            onRemovePlayer={handleRemovePlayer}
            onDragStart={(player) => setDraggedPlayer({ name: player, source: 'unassigned' })}
          />
          {selectedTeams.length === 0 ? (
            <div className="panel rounded-lg p-4 flex items-center justify-center text-gray-400 text-center">
              <div>
                <p className="mb-2">No Teams Selected</p>
                <p className="text-sm">Select teams to start organizing players</p>
                {unassignedPlayers.length > 0 && (
                  <p className="mt-4 text-yellow-500/80">
                    {unassignedPlayers.length} unassigned player{unassignedPlayers.length !== 1 ? 's' : ''} available
                  </p>
                )}
              </div>
            </div>
          ) : (
            <TeamPanel 
              teams={teams}
              onRemovePlayer={handleRemoveFromTeam}
              onMovePlayer={handleMovePlayer}
              onDragStart={(player, teamId) => setDraggedPlayer({ name: player, source: 'team', teamId })}
              draggedPlayer={draggedPlayer}
              unassignedPlayers={unassignedPlayers}
              onMoveTeam={handleMoveTeam}
              onAddUnassignedToTeam={handleAddUnassignedToTeam}
            />
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onConfirm={handleReset}
        onCancel={() => setShowResetConfirm(false)}
        title="Reset Team Shuffler"
        message="Are you sure you want to reset? This will remove all players and clear all team assignments."
      />
    </div>
  );
}
