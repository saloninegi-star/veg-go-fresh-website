import { useState, useMemo } from "react";
import { Star, ArrowUpDown, ShieldCheck, Leaf } from "lucide-react";
import AddToCartControl from "../components/shared/AddToCartControl";
import { getProductsByCategory } from "../data/products";
import type { ProductDetail } from "../types/product";

// This page shows a richer, filterable view of the Vegetables category
// (sub-filters + sorting) as an alternative to the plain grid on HomePage.
// It isn't wired to a route yet — add `<Route path="/vegetables" element={<VegetablesPage />} />`
// in appRoute.jsx if/when you want to expose it.

type SubFilter = "all" | "essentials" | "roots" | "exotic" | "herbs";

const SUB_FILTER_MAP: Record<Exclude<SubFilter, "all">, string[]> = {
  essentials: ["tomato", "onion", "capsicum"],
  roots: ["potato"],
  exotic: ["broccoli", "zucchini", "bellpeppers"],
  herbs: ["coriander", "mint"],
};

export default function VegetablesPage() {
  const [activeSubFilter, setActiveSubFilter] = useState<SubFilter>("all");
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high" | "rating">("default");

  const baseProducts = useMemo(
    () => [...getProductsByCategory("Vegetables"), ...getProductsByCategory("Exotic Vegetables"), ...getProductsByCategory("Leafy Greens")],
    []
  );

  const processedProducts = useMemo(() => {
    let list: ProductDetail[] = baseProducts;

    if (activeSubFilter !== "all") {
      const allowedIds = SUB_FILTER_MAP[activeSubFilter];
      list = list.filter((p) => allowedIds.includes(p.id));
    }

    list = [...list];
    if (sortBy === "price-low") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [baseProducts, activeSubFilter, sortBy]);

  return (
    <div className="space-y-6 text-left animate-fade-in">
      <div className="bg-[#EAF5E9] p-6 sm:p-8 rounded-2xl border border-[#DCEAD9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#CDE5CC] text-[10px] font-bold text-[#1E5F26] mb-2.5">
            <Leaf className="w-3 h-3 text-[#228B22]" />
            <span>DIRECT FROM SOIL TO KITCHEN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Fresh Vegetables</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg">
            Sourced daily at 4 AM from local farmers. Thoroughly ozone-washed and packed hygienically for zero contact.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/90 border border-[#D0E5CE] px-4 py-3 rounded-xl shrink-0">
          <ShieldCheck className="w-8 h-8 text-[#135029]" />
          <div>
            <div className="text-xs font-bold text-slate-800">100% Quality Certified</div>
            <div className="text-[10px] text-slate-500">Residue-free vegetables</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { id: "all" as const, label: "All Vegetables" },
            { id: "essentials" as const, label: "Daily Essentials" },
            { id: "roots" as const, label: "Root Veggies" },
            { id: "exotic" as const, label: "Exotic & Organic" },
            { id: "herbs" as const, label: "Fresh Herbs" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSubFilter(item.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                activeSubFilter === item.id
                  ? "bg-[#135029] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#228B22] cursor-pointer"
          >
            <option value="default">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Customer Ratings</option>
          </select>
        </div>
      </div>

      {processedProducts.length === 0 ? (
        <div className="py-12 text-center text-slate-400">No vegetables found under this category.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {processedProducts.map((p) => {
            const discountPercentage = Math.round(((p.mrp - p.price) / p.mrp) * 100);
            return (
              <div key={p.id} className="group relative rounded-2xl border border-[#EEF4ED] bg-white p-3.5 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
                  {discountPercentage > 0 && (
                    <span className="bg-[#E03838] text-white text-[9px] font-black px-2 py-0.5 rounded-md">{discountPercentage}% OFF</span>
                  )}
                </div>

                <div className="h-32 sm:h-40 w-full overflow-hidden rounded-xl bg-slate-50 mb-3 relative">
                  <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-300 select-none" />
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 backdrop-blur-xs">
                    <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                    <span>{p.rating}</span>
                  </div>
                </div>

                <div className="text-left mb-3">
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#135029] transition leading-tight line-clamp-1">{p.name}</h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">{p.weight}</p>
                </div>

                <div className="flex items-center justify-between gap-1 pt-1.5 border-t border-slate-50">
                  <div className="flex items-baseline gap-1.5 min-w-0">
                    <span className="text-base font-black text-[#135029]">₹{p.price.toFixed(2)}</span>
                    <span className="text-xs text-slate-400 line-through">₹{p.mrp.toFixed(2)}</span>
                  </div>
                  <AddToCartControl productId={p.id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
