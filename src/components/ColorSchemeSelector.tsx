interface ColorSchemeProps {
  onSelect: (scheme: string) => void;
  activeScheme: string;
}

export default function ColorSchemeSelector({ onSelect, activeScheme }: ColorSchemeProps) {
  const schemes = {
    'Classic': ['red', 'blue', 'cyan', 'pink', 'yellow'],
    'Ocean': ['cyan', 'teal', 'blue', 'indigo', 'violet'],
    'Forest': ['green', 'emerald', 'lime', 'teal', 'cyan'],
    'Sunset': ['orange', 'red', 'rose', 'pink', 'purple'],
    'Earth': ['amber', 'brown', 'orange', 'yellow', 'emerald']
  };

  return (
    <div className="relative group">
      <button className="px-4 py-2 bg-[#2C2E33] border border-[#373A40] rounded-md hover:bg-[#373A40] transition-colors text-gray-200">
        Team Colors
      </button>
      <div className="absolute left-0 mt-2 w-48 bg-[#2C2E33] border border-[#373A40] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        {Object.keys(schemes).map((scheme) => (
          <button
            key={scheme}
            onClick={() => onSelect(scheme)}
            className={`w-full text-left px-4 py-2 hover:bg-[#373A40] transition-colors ${
              activeScheme === scheme ? 'text-[#228be6]' : 'text-gray-200'
            }`}
          >
            {scheme}
          </button>
        ))}
      </div>
    </div>
  );
}
