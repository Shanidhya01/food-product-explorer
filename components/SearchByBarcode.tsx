"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchByBarcode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();

    if (!trimmed) {
      setError("Please enter a barcode number.");
      return;
    }
    if (!/^\d{8,14}$/.test(trimmed)) {
      setError("Barcode must be 8–14 digits (numbers only).");
      return;
    }

    setError("");
    setLoading(true);
    router.push(`/product/${trimmed}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const val = e.target.value.replace(/\D/g, "");
    setCode(val);
    if (error) setError("");
  };

  const handleClear = () => {
    setCode("");
    setError("");
  };

  return (
    <div className="w-full space-y-1.5">
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        {/* Barcode icon */}
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 5v14M7 5v14M11 5v14M15 5v14M19 5v14" />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          inputMode="numeric"
          value={code}
          onChange={handleChange}
          maxLength={14}
          placeholder="Enter barcode (8–14 digits)…"
          className={`
            w-full pl-10 pr-10 py-3 rounded-xl text-sm bg-white/8
            border text-white placeholder-gray-500
            focus:outline-none focus:bg-white/10 transition-all
            ${
              error
                ? "border-red-500/60 focus:border-red-400/80"
                : "border-white/12 focus:border-blue-500/60"
            }
          `}
        />

        {/* Clear button */}
        {code && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-[78px] top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
            aria-label="Clear"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`
            shrink-0 flex items-center gap-1.5 px-4 py-3 rounded-xl
            text-sm font-semibold transition-all duration-150
            ${
              loading
                ? "bg-blue-700/50 text-blue-300/60 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white active:scale-95"
            }
          `}
        >
          {loading ? (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-blue-300/30 border-t-blue-300 animate-spin" />
              Finding…
            </>
          ) : (
            <>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Find
            </>
          )}
        </button>
      </form>

      {/* Error message */}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-400 pl-1">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}

      {/* Helper hint */}
      {!error && (
        <p className="text-[11px] text-gray-600 pl-1">
          e.g. 3017620422003 (Nutella) · digits only, no spaces
        </p>
      )}
    </div>
  );
}