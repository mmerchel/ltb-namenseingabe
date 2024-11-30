'use client';

import { useRef, useState, useEffect } from 'react';

interface RegistrationPanelProps {
  players: string[];
  onAddPlayer: (name: string) => boolean;
  onRemovePlayer: (name: string) => void;
  onDragStart: (player: string) => void;
}

const MAX_NAME_LENGTH = 12;
const ERROR_DISPLAY_TIME = 5000; // 5 seconds

export default function RegistrationPanel({ 
  players, 
  onAddPlayer, 
  onRemovePlayer,
  onDragStart
}: RegistrationPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errorTimer, setErrorTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (errorTimer) clearTimeout(errorTimer);
    };
  }, [errorTimer]);

  const showError = (message: string) => {
    if (errorTimer) clearTimeout(errorTimer);
    setError(message);
    const timer = setTimeout(() => {
      setError(null);
    }, ERROR_DISPLAY_TIME);
    setErrorTimer(timer);
  };

  const convertSpecialChars = (input: string): string => {
    return input
      .replace(/ß/g, 'ss')
      .replace(/ä/g, 'ae')
      .replace(/ü/g, 'ue')
      .replace(/ö/g, 'oe');
  };

  const validateAndConvertName = (name: string): string => {
    let convertedName = convertSpecialChars(name);
    
    if (name !== convertedName) {
      showError('Special characters (ä, ö, ü, ß) will be automatically converted');
    }
    
    const invalidChars = name.match(/[^a-zA-Z0-9 äöüß]/g);
    if (invalidChars) {
      showError('Only letters, numbers, and spaces are allowed');
    }
    
    convertedName = convertedName.replace(/[^a-zA-Z0-9 ]/g, '');
    return convertedName;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    const convertedInput = validateAndConvertName(rawInput);
    
    if (rawInput.length > MAX_NAME_LENGTH) {
      showError(`Maximum ${MAX_NAME_LENGTH} characters allowed`);
    }

    setInputValue(convertedInput.slice(0, MAX_NAME_LENGTH));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = inputValue.trim();
    
    if (name.length === 0) {
      showError('Player name cannot be empty');
      return;
    }

    const wasAdded = onAddPlayer(name);
    if (wasAdded) {
      setInputValue('');
      setError(null);
      if (errorTimer) clearTimeout(errorTimer);
      inputRef.current?.focus();
    } else if (!players.includes(name)) {
      showError('Maximum number of active players reached');
    } else {
      showError('This player name already exists');
    }
  };

  const progress = (inputValue.length / MAX_NAME_LENGTH) * 100;
  const progressColor = progress <= 50 
    ? 'bg-green-500' 
    : progress <= 75 
      ? 'bg-yellow-500' 
      : 'bg-red-500';

  return (
    <div className="panel rounded-lg p-4 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-white">Unassigned Players</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter player name"
                className={`w-full px-3 py-2 bg-[#2C2E33] border border-[#373A40] rounded-md 
                  text-white placeholder-gray-500 focus:outline-none focus:border-[#228be6]
                  ${error ? 'border-red-500/50' : ''}`}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#228be6] text-white rounded-md hover:bg-[#1c7ed6] transition-colors"
            >
              Add
            </button>
          </div>

          <div className="h-1 bg-[#2C2E33] rounded-full overflow-hidden">
            <div
              className={`h-full ${progressColor} transition-all duration-300 ease-out`}
              style={{ 
                width: `${progress}%`,
                transition: 'width 0.3s ease-out, background-color 0.3s ease-out'
              }}
            />
          </div>

          <div className="min-h-[2rem] flex items-start justify-between text-sm">
            <span className="text-gray-400">
              {inputValue.length}/{MAX_NAME_LENGTH} characters
            </span>
            {error && (
              <div className="flex-1 ml-4 text-red-400 font-medium animate-fadeIn bg-red-500/10 px-3 py-1 rounded-md">
                {error}
              </div>
            )}
          </div>
        </div>
      </form>

      <div className="flex-1 overflow-y-auto scrollbar-dark">
        <div className="space-y-2">
          {players.map((player) => (
            <div
              key={player}
              draggable
              onDragStart={() => onDragStart(player)}
              className="flex items-center justify-between bg-[#2C2E33] p-2 rounded-md cursor-move hover:bg-[#373A40] transition-colors group"
            >
              <span className="text-gray-200 group-hover:text-white">
                {player}
                <span className="ml-2 text-xs text-gray-500">Drag to assign</span>
              </span>
              <button
                onClick={() => onRemovePlayer(player)}
                className="text-gray-400 hover:text-red-400 p-1 rounded-full hover:bg-red-900/20 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-400">
        Unassigned Players: {players.length}
      </div>
    </div>
  );
}
