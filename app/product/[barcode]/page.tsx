import { fetchProductByBarcode } from "@/lib/api";
import Link from "next/link";
import AddToCartButton from "@/components/Addtocartbutton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ barcode: string }>;
}) {
  const { barcode } = await params;

  let data;
  try {
    data = await fetchProductByBarcode(barcode);
  } catch {
    return (
      <div className="min-h-screen bg-[#080b12] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-2">Failed</p>
          <p className="text-gray-400">Failed to fetch product</p>
          <Link href="/" className="mt-4 inline-block text-sm text-emerald-400 hover:underline">Back</Link>
        </div>
      </div>
    );
  }

  const p = data?.product;

  if (!p) {
    return (
      <div className="min-h-screen bg-[#080b12] text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-4xl">Not found</p>
          <h1 className="text-xl font-semibold">Product Not Found</h1>
          <p className="text-gray-400 text-sm">No product matched barcode {barcode}</p>
          <Link href="/" className="inline-block mt-2 text-sm text-emerald-400 hover:underline">Back to Explorer</Link>
        </div>
      </div>
    );
  }

  const name = p.product_name || p.product_name_en || "Unnamed Product";
  const brand = p.brands;
  const imageUrl = p.image_front_url || p.image_url;
  const grade = p.nutriscore_grade || p.nutrition_grades;

  const nm = p.nutriments || {};
  const nutrients = [
    { label: "Energy", value: nm["energy-kcal_100g"] ? `${Math.round(nm["energy-kcal_100g"])} kcal` : null },
    { label: "Fat", value: nm.fat_100g != null ? `${nm.fat_100g}g` : null },
    { label: "of which saturates", value: nm["saturated-fat_100g"] != null ? `${nm["saturated-fat_100g"]}g` : null, indent: true },
    { label: "Carbohydrates", value: nm.carbohydrates_100g != null ? `${nm.carbohydrates_100g}g` : null },
    { label: "of which sugars", value: nm.sugars_100g != null ? `${nm.sugars_100g}g` : null, indent: true },
    { label: "Fibre", value: nm.fiber_100g != null ? `${nm.fiber_100g}g` : null },
    { label: "Protein", value: nm.proteins_100g != null ? `${nm.proteins_100g}g` : null },
    { label: "Salt", value: nm.salt_100g != null ? `${nm.salt_100g}g` : null },
  ].filter((n) => n.value);

  const labels = p.labels_tags?.map((l: string) => l.replace(/^en:/, "").replace(/-/g, " ")) || [];

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      <header className="sticky top-0 z-20 bg-[#080b12]/90 backdrop-blur-md border-b border-white/8 px-5 py-4">
        <div className="max-w-screen-lg mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Explorer
          </Link>
        </div>
      </header>

      <main className="max-w-screen-lg mx-auto px-5 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
            <div className="aspect-square rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-contain p-6"
                />
              ) : (
                <div className="text-gray-600 flex flex-col items-center gap-2">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span className="text-sm">No image available</span>
                </div>
              )}
            </div>

            {labels.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {labels.slice(0, 8).map((label: string) => (
                  <span key={label} className="px-2.5 py-1 rounded-full text-xs bg-white/8 border border-white/10 text-gray-300 capitalize">
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {brand && (
              <p className="text-sm text-emerald-400/80 font-medium uppercase tracking-wider">{brand}</p>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold leading-snug">{name}</h1>

            <div className="flex flex-wrap items-center gap-3">
              {/* NutriScoreBadge removed */}
              {p.quantity && (
                <div className="bg-white/6 border border-white/10 px-3 py-1.5 rounded-xl text-xs text-gray-300">
                  {p.quantity}
                </div>
              )}
              {p.ecoscore_grade && (
                <div className="flex items-center gap-2 bg-white/6 border border-white/10 px-3 py-1.5 rounded-xl">
                  <span className="text-xs text-gray-400">Eco-Score</span>
                  <span className="text-xs font-bold uppercase text-emerald-300">{p.ecoscore_grade}</span>
                </div>
              )}
            </div>

            <AddToCartButton product={p} />

            {p.ingredients_text && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Ingredients</h3>
                <p className="text-sm text-gray-400 leading-relaxed bg-white/4 border border-white/8 rounded-xl p-4">
                  {p.ingredients_text}
                </p>
              </div>
            )}

            {nutrients.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Nutrition Facts <span className="text-gray-600 font-normal normal-case">(per 100g)</span>
                </h3>
                <div className="rounded-xl border border-white/10 overflow-hidden">
                  {nutrients.map((n, i) => (
                    <div
                      key={n.label}
                      className={`flex justify-between items-center px-4 py-2.5 text-sm
                        ${i % 2 === 0 ? "bg-white/4" : "bg-transparent"}
                        ${n.indent ? "pl-8 text-gray-500" : "text-gray-200"}
                      `}
                    >
                      <span className={n.indent ? "text-xs" : ""}>{n.label}</span>
                      <span className={`font-medium tabular-nums ${n.indent ? "text-gray-500 text-xs" : "text-white"}`}>
                        {n.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {p.origins && (
              <p className="text-xs text-gray-500">
                <span className="text-gray-400 font-medium">Origin:</span> {p.origins}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
