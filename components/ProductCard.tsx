"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/components/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);

  const name = product.product_name || product.product_name_en || "Unnamed Product";
  const brand = product.brands?.split(",")[0]?.trim();
  const imageUrl = product.image_front_small_url || product.image_small_url;
  const hasImage = !!imageUrl && !imgError;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group relative flex flex-col bg-[#111827] border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 hover:shadow-xl hover:shadow-black/40 transition-all duration-200">
      
      {/* Image Area */}
      <Link href={`/product/${product.code}`} className="block relative">
        <div className="h-44 bg-white/5 flex items-center justify-center overflow-hidden">
          {hasImage ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-600">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-xs">No image</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3.5">
        <Link href={`/product/${product.code}`} className="flex-1 min-w-0">
          {brand && (
            <p className="text-[11px] text-emerald-400/80 font-medium uppercase tracking-wider truncate mb-0.5">
              {brand}
            </p>
          )}
          <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-emerald-100 transition-colors">
            {name}
          </h3>
          {product.quantity && (
            <p className="text-xs text-gray-500 mt-1 truncate">{product.quantity}</p>
          )}
        </Link>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="
            mt-3 w-full flex items-center justify-center gap-1.5
            py-2 px-3 rounded-xl text-xs font-semibold
            bg-emerald-700/30 border border-emerald-600/30 text-emerald-300
            hover:bg-emerald-600 hover:border-emerald-500 hover:text-white
            active:scale-95 transition-all duration-150
          "
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}