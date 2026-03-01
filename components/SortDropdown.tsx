"use client";

const SORT_OPTIONS = [
  { value: "unique_scans_n", label: "Most Popular" },
  { value: "created_t", label: "Newest" },
  { value: "az", label: "Name (A-Z)" },
  { value: "za", label: "Name (Z-A)" },
];

interface SortDropdownProps {
  value: string;
  onSort: (sortKey: string) => void;
}

export default function SortDropdown({ value, onSort }: SortDropdownProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-300">
      <span className="text-gray-400">Sort by</span>
      <select
        value={value}
        onChange={(e) => onSort(e.target.value)}
        className="bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value} className="text-black">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
