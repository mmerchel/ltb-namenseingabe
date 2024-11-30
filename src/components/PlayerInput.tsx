import { useState } from 'react';

interface PlayerInputProps {
  onAddPlayer: (name: string) => void;
}

export default function PlayerInput({ onAddPlayer }: PlayerInputProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPlayer(name.trim());
      setName('');
    }
  };

  return (
    <div className="gradient-border p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="playerName" className="block mb-2 text-sm font-medium">
            Player Name
          </label>
          <input
            id="playerName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter player name"
            className="w-full px-4 py-2 bg-[#2C2E33] border border-[#373A40] rounded-md focus:outline-none focus:border-[#228be6] text-white placeholder-gray-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-2.5 bg-[#228be6] text-white rounded-md hover:bg-[#1c7ed6] transition-colors duration-200 font-medium"
        >
          Add Player
        </button>
      </form>
    </div>
  );
}
