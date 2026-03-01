"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { fetchProducts, searchProducts, fetchByCategory } from "@/lib/api";
import { Product } from "@/types/product";

import ProductGrid from "@/components/ProductGrid";
import SearchByName from "@/components/SearchByName";
import SearchByBarcode from "@/components/SearchByBarcode";
import CategoryFilter from "@/components/CategoryFilter";
import SortDropdown from "@/components/SortDropdown";
import LoadMoreButton from "@/components/LoadMoreButton";
import CartSummary from "@/components/CartSummary";
import CartToast from "@/components/CartToast";
import { useCart } from "@/components/CartContext";

type Mode = "default" | "search" | "category";

const PAGE_SIZE = 15;

// Client-side sort (for name/grade) and server-side sort key
const CLIENT_SORT_KEYS = ["az", "za", "grade"];

function sortProducts(products: Product[], sortKey: string): Product[] {
  const copy = [...products];
  if (sortKey === "az")
    return copy.sort((a, b) =>
      (a.product_name || "").localeCompare(b.product_name || "")
    );
  if (sortKey === "za")
    return copy.sort((a, b) =>
      (b.product_name || "").localeCompare(a.product_name || "")
    );
  if (sortKey === "grade")
    return copy.sort((a, b) =>
      (a.nutriscore_grade || a.nutrition_grades || "z").localeCompare(
        b.nutriscore_grade || b.nutrition_grades || "z"
      )
    );
  return copy;
}

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayed, setDisplayed] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sortKey, setSortKey] = useState("unique_scans_n");
  const [hasMore, setHasMore] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [categoryAllProducts, setCategoryAllProducts] = useState<Product[]>([]);

  const { totalItems } = useCart();

  // ─── Fetch helpers ─────────────────────────────────────────────────────────

  const loadDefault = useCallback(
    async (pageNum: number, append: boolean) => {
      try {
        const data = await fetchProducts(pageNum);
        const products: Product[] = data.products || [];
        setTotalCount(data.count || 0);
        setAllProducts((prev) => (append ? [...prev, ...products] : products));
        setHasMore(products.length === PAGE_SIZE);
      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  const loadSearch = useCallback(async (query: string) => {
    try {
      const data = await searchProducts(query);
      const products: Product[] = data.products || [];
      setTotalCount(data.count || 0);
      setAllProducts(products);
      setHasMore(false); // search results are single-page
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadCategory = useCallback(async (cat: string) => {
    try {
      const data = await fetchByCategory(cat);
      const products: Product[] = data.products || [];
      setCategoryAllProducts(products);
      setTotalCount(products.length);
      // Set initial displayed products
      const initialProducts = products.slice(0, PAGE_SIZE);
      setAllProducts(initialProducts);
      setHasMore(products.length > PAGE_SIZE);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // ─── Effect: initial + page changes ───────────────────────────────────────

  useEffect(() => {
    const run = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      if (mode === "default") {
        await loadDefault(page, page > 1);
      }

      setLoading(false);
      setLoadingMore(false);
    };
    run();
  }, [page, mode, loadDefault]);

  // ─── Effect: search ────────────────────────────────────────────────────────

  useEffect(() => {
    if (mode !== "search" || !searchQuery) return;
    const run = async () => {
      setLoading(true);
      await loadSearch(searchQuery);
      setLoading(false);
    };
    run();
  }, [mode, searchQuery, loadSearch]);

  // ─── Effect: category ─────────────────────────────────────────────────────

  useEffect(() => {
    if (mode !== "category" || !category) return;
    const run = async () => {
      setLoading(true);
      await loadCategory(category);
      setLoading(false);
    };
    run();
  }, [mode, category, loadCategory]);

  // ─── Effect: category pagination ──────────────────────────────────────

  useEffect(() => {
    if (mode !== "category" || categoryAllProducts.length === 0) return;
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const paginatedProducts = categoryAllProducts.slice(start, end);
    setAllProducts(paginatedProducts);
    setHasMore(end < categoryAllProducts.length);
  }, [mode, page, categoryAllProducts]);

  // ─── Effect: apply sort to displayed ──────────────────────────────────────

  useEffect(() => {
    const isClientSort = CLIENT_SORT_KEYS.includes(sortKey);
    setDisplayed(isClientSort ? sortProducts(allProducts, sortKey) : allProducts);
  }, [allProducts, sortKey]);

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleSearch = (query: string) => {
    if (!query) {
      handleReset();
      return;
    }
    setSearchQuery(query);
    setMode("search");
    setAllProducts([]);
    setPage(1);
  };

  const handleCategory = (cat: string) => {
    setCategory(cat);
    if (!cat) {
      handleReset();
      return;
    }
    setMode("category");
    setAllProducts([]);
    setPage(1);
  };

  const handleSort = (key: string) => {
    setSortKey(key);
    // If it's a server-side sort key and we're in default mode, reload
    if (!CLIENT_SORT_KEYS.includes(key) && mode === "default") {
      setAllProducts([]);
      setPage(1);
    }
  };

  const handleLoadMore = () => {
    setPage((p) => p + 1);
  };

  const handleReset = () => {
    setMode("default");
    setSearchQuery("");
    setCategory("");
    setAllProducts([]);
    setPage(1);
    setHasMore(true);
  };

  const isFiltered = mode !== "default";

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-[#080b12]/90 backdrop-blur-md border-b border-white/8">
        <div className="max-w-screen-xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-2xl">🥗</span>
            <div>
              <h1 className="text-base font-bold text-white leading-none">FoodExplorer</h1>
              <p className="text-[10px] text-gray-500 leading-none mt-0.5">Powered by Open Food Facts</p>
            </div>
          </div>

          <div className="flex-1 max-w-lg hidden sm:block">
            <SearchByName onSearch={handleSearch} initialValue={searchQuery} />
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-white/8 border border-white/12 hover:bg-white/12 transition-colors shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="text-sm font-medium hidden sm:block">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-5 pb-4">
          <SearchByName onSearch={handleSearch} initialValue={searchQuery} />
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-5 py-6 space-y-5">

        {/* ── Barcode search ─────────────────────────────────────────────── */}
        <section>
          <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Barcode Lookup</p>
          <SearchByBarcode />
        </section>

        {/* ── Filter & Sort Bar ─────────────────────────────────────────── */}
        <section className="flex flex-col gap-3 p-4 rounded-2xl bg-white/4 border border-white/8">
          <CategoryFilter selected={category} onSelect={handleCategory} />
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/8">
            <SortDropdown value={sortKey} onSort={handleSort} />

            <div className="flex items-center gap-2">
              {totalCount > 0 && (
                <span className="text-xs text-gray-500">
                  {displayed.length} of {totalCount.toLocaleString()} products
                </span>
              )}
              {isFiltered && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-white/12 hover:border-white/25 px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 .49-3.1" />
                  </svg>
                  Reset filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── Product Grid ──────────────────────────────────────────────── */}
        <ProductGrid products={displayed} loading={loading} />

        {/* ── Load More ─────────────────────────────────────────────────── */}
        {(mode === "default" || mode === "category") && !loading && (
          <LoadMoreButton
            onClick={handleLoadMore}
            loading={loadingMore}
            hasMore={hasMore}
          />
        )}
      </main>

      {/* ── Cart Drawer ───────────────────────────────────────────────────── */}
      {cartOpen && <CartSummary onClose={() => setCartOpen(false)} />}

      {/* ── Toast ─────────────────────────────────────────────────────────── */}
      <CartToast />
    </div>
  );
}
