"use client";

import { useCart } from "./CartContext";
import Image from "next/image";

interface CartSummaryProps {
  onClose: () => void;
}

export default function CartSummary({ onClose }: CartSummaryProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed top-0 right-0 z-50 h-full w-full max-w-[420px] bg-[#0f0f1a] border-l border-white/10 flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </span>
            <h2 className="text-lg font-semibold text-white">
              Your Cart
              {totalItems > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Cart is empty</p>
                <p className="text-sm text-gray-500">Add some products to get started</p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.code}
                className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/8 group"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-lg bg-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                  {item.image_front_small_url ? (
                    <img
                      src={item.image_front_small_url}
                      alt={item.product_name || "Product"}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate leading-snug">
                    {item.product_name || "Unnamed Product"}
                  </p>
                  {item.brands && (
                    <p className="text-xs text-gray-500 truncate mt-0.5">{item.brands}</p>
                  )}

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.code, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium text-white w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.code, item.quantity + 1)}
                      className="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.code)}
                  className="self-start opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-400 p-1 rounded"
                  aria-label="Remove item"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5 space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Total items</span>
              <span className="text-white font-semibold">{totalItems}</span>
            </div>
            <button
              onClick={clearCart}
              className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}