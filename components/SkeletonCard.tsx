export default function SkeletonCard() {
  return (
    <div className="flex flex-col bg-[#111827] border border-white/8 rounded-2xl overflow-hidden animate-pulse">
      {/* Image area */}
      <div className="h-44 bg-white/8" />

      {/* Content */}
      <div className="p-3.5 space-y-2.5">
        <div className="h-2.5 bg-white/10 rounded-full w-1/3" />
        <div className="h-3.5 bg-white/10 rounded-full w-5/6" />
        <div className="h-3 bg-white/10 rounded-full w-2/3" />
        <div className="h-8 bg-white/8 rounded-xl mt-3" />
      </div>
    </div>
  );
}