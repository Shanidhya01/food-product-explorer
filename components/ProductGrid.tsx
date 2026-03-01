import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  const gridStyle = {
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  };

  if (loading && products.length === 0) {
    return (
      <div className="grid gap-4" style={gridStyle}>
        {Array.from({ length: 20 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <div>
          <p className="text-white font-medium mb-1">No products found</p>
          <p className="text-sm text-gray-500">Try a different search term or category</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4" style={gridStyle}>
        {products.map((p) => (
          <ProductCard key={p.code} product={p} />
        ))}

        {loading &&
          Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={`skeleton-more-${i}`} />
          ))}
      </div>
    </>
  );
}
