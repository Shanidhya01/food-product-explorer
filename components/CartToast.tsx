"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

export default function CartToast() {
  const { toastMessage } = useCart();
  const [visible, setVisible] = useState(false);
  const [displayMsg, setDisplayMsg] = useState("");

  useEffect(() => {
    if (toastMessage) {
      setDisplayMsg(toastMessage);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [toastMessage]);

  if (!displayMsg) return null;

  return (
    <div
      className={`
        fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 z-50 flex items-center gap-3
        bg-[#1a1a2e] border border-emerald-500/40 text-white
        px-5 py-3 rounded-xl shadow-2xl shadow-black/40
        transition-all duration-300 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      {/* Icon */}
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>

      {/* Message */}
      <p className="text-sm font-medium text-gray-100 max-w-[220px] truncate">
        {displayMsg}
      </p>
    </div>
  );
}
