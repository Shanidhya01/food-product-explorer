interface LoadMoreButtonProps {
  onClick: () => void;
  loading?: boolean;
  hasMore?: boolean;
}

export default function LoadMoreButton({
  onClick,
  loading = false,
  hasMore = true,
}: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center py-10">
      <button
        onClick={onClick}
        disabled={loading}
        className={`
          relative flex items-center gap-2.5 px-8 py-3 rounded-xl
          border border-white/15 text-sm font-medium
          transition-all duration-200
          ${
            loading
              ? "text-gray-500 cursor-not-allowed bg-white/3"
              : "text-white bg-white/8 hover:bg-white/15 hover:border-white/30 active:scale-95"
          }
        `}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-emerald-400 animate-spin" />
            Loading more...
          </>
        ) : (
          <>
            Load More Products
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}