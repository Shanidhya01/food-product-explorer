"use client";

import { useState, useRef, useCallback } from "react";

interface SearchByNameProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchByName({ onSearch, initialValue = "" }: SearchByNameProps) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(value.trim());
    },
    [value, onSearch]
  );

  const handleClear = () => {
    setValue("");
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      {/* Search Icon */}
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products by name (e.g. 'nutella', 'chips')..."
        className="
          w-full pl-10 pr-20 py-3 rounded-xl
          bg-white/8 border border-white/12 text-white placeholder-gray-500
          focus:outline-none focus:border-emerald-500/60 focus:bg-white/10
          transition-all text-sm
        "
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-[72px] top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="
          absolute right-1.5 top-1/2 -translate-y-1/2
          px-3.5 py-1.5 rounded-lg text-xs font-semibold
          bg-emerald-600 hover:bg-emerald-500 text-white
          transition-colors
        "
      >
        Search
      </button>
    </form>
  );
}