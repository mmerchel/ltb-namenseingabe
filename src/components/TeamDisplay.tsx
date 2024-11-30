interface TeamDisplayProps {
  teams: { [key: string]: string[] };
  onRemovePlayer: (name: string) => void;
  colorScheme: string;
}

const colorSchemes = {
  'Classic': {
    'Team Red': { bg: 'bg-red-900/20', border: 'border-red-800/30', text: 'text-red-200' },
    'Team Blue': { bg: 'bg-blue-900/20', border: 'border-blue-800/30', text: 'text-blue-200' },
    'Team Ocean': { bg: 'bg-cyan-900/20', border: 'border-cyan-800/30', text: 'text-cyan-200' },
    'Team Pink': { bg: 'bg-pink-900/20', border: 'border-pink-800/30', text: 'text-pink-200' },
    'Team Yellow': { bg: 'bg-yellow-900/20', border: 'border-yellow-800/30', text: 'text-yellow-200' }
  },
  'Ocean': {
    'Team Red': { bg: 'bg-cyan-900/20', border: 'border-cyan-800/30', text: 'text-cyan-200' },
    'Team Blue': { bg: 'bg-teal-900/20', border: 'border-teal-800/30', text: 'text-teal-200' },
    'Team Ocean': { bg: 'bg-blue-900/20', border: 'border-blue-800/30', text: 'text-blue-200' },
    'Team Pink': { bg: 'bg-indigo-900/20', border: 'border-indigo-800/30', text: 'text-indigo-200' },
    'Team Yellow': { bg: 'bg-violet-900/20', border: 'border-violet-800/30', text: 'text-violet-200' }
  },
  'Forest': {
    'Team Red': { bg: 'bg-green-900/20', border: 'border-green-800/30', text: 'text-green-200' },
    'Team Blue': { bg: 'bg-emerald-900/20', border: 'border-emerald-800/30', text: 'text-emerald-200' },
    'Team Ocean': { bg: 'bg-lime-900/20', border: 'border-lime-800/30', text: 'text-lime-200' },
    'Team Pink': { bg: 'bg-teal-900/20', border: 'border-teal-800/30', text: 'text-teal-200' },
    'Team Yellow': { bg: 'bg-cyan-900/20', border: 'border-cyan-800/30', text: 'text-cyan-200' }
  },
  'Sunset': {
    'Team Red': { bg: 'bg-orange-900/20', border: 'border-orange-800/30', text: 'text-orange-200' },
    'Team Blue': { bg: 'bg-red-900/20', border: 'border-red-800/30', text: 'text-red-200' },
    'Team Ocean': { bg: 'bg-rose-900/20', border: 'border-rose-800/30', text: 'text-rose-200' },
    'Team Pink': { bg: 'bg-pink-900/20', border: 'border-pink-800/30', text: 'text-pink-200' },
    'Team Yellow': { bg: 'bg-purple-900/20', border: 'border-purple-800/30', text: 'text-purple-200' }
  },
  'Earth': {
    'Team Red': { bg: 'bg-amber-900/20', border: 'border-amber-800/30', text: 'text-amber-200' },
    'Team Blue': { bg: 'bg-yellow-900/20', border: 'border-yellow-800/30', text: 'text-yellow-200' },
    'Team Ocean': { bg: 'bg-orange-900/20', border: 'border-orange-800/30', text: 'text-orange-200' },
    'Team Pink': { bg: 'bg-emerald-900/20', border: 'border-emerald-800/30', text: 'text-emerald-200' },
    'Team Yellow': { bg: 'bg-lime-900/20', border: 'border-lime-800/30', text: 'text-lime-200' }
  }
};

export default function TeamDisplay({ teams, onRemovePlayer, colorScheme }: TeamDisplayProps) {
  const activeScheme = colorSchemes[colorScheme as keyof typeof colorSchemes];

  return (
    <div className="space-y-4">
      {Object.entries(teams).map(([teamName, players]) => (
        players.length > 0 && (
          <div
            key={teamName}
            className={`${activeScheme[teamName as keyof typeof activeScheme].bg} 
                       rounded-md overflow-hidden
                       border ${activeScheme[teamName as keyof typeof activeScheme].border}`}
          >
            <div className="p-4">
              <h3 className={`${activeScheme[teamName as keyof typeof activeScheme].text} 
                             font-bold mb-3`}>
                {teamName}
              </h3>
              <ul className="space-y-2">
                {players.map((player) => (
                  <li key={player} className="flex justify-between items-center bg-[#2C2E33] rounded px-3 py-2">
                    <span className="text-gray-200">{player}</span>
                    <button
                      onClick={() => onRemovePlayer(player)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                      aria-label={`Remove ${player}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      ))}
    </div>
  );
}
