"use client";

import { useCart } from "@/components/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.code}
              className="flex justify-between items-center border p-4 rounded"
            >
              <div>
                <h2 className="font-semibold">{item.product_name}</h2>
                <p>Quantity: {item.quantity}</p>
              </div>

              <button
                onClick={() => removeFromCart(item.code)}
                className="bg-red-600 px-4 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <Link href="/" className="inline-block mt-6 text-blue-400">
        ← Continue Shopping
      </Link>
    </main>
  );
}