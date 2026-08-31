import { ArrowRight, ChevronRight } from "lucide-react";
import { PRODUCT_CATALOG } from "../../data/products";
import { useToast } from "../../context/ToastContext";
import ProductCard from "../shared/ProductCard";

// A curated set for the home "Best Selling" row — kept deliberately small
// since this is a highlight rail, not the full catalog.
const BEST_SELLER_IDS = ["tomato", "onion", "potato", "banana", "apple"];

export default function BestSellers() {
  const { showToast } = useToast();
  const products = BEST_SELLER_IDS.map((id) => PRODUCT_CATALOG[id]).filter(Boolean);

  return (
    <div className="lg:col-span-6 bg-white rounded-2xl border border-[#EEF4ED] p-4 sm:p-5 flex flex-col justify-between shadow-xs relative">
      <div className="flex items-center justify-between mb-4">
        <div className="text-left">
          <h3 id="best-sellers-heading" className="text-base sm:text-lg font-bold text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Best Selling Products
          </h3>
          <p className="text-[11px] text-slate-400">Most popular organic arrivals today</p>
        </div>
        <button
          onClick={() => showToast("Showing all best-sellers")}
          className="text-xs font-bold text-[#228B22] flex items-center gap-1 hover:underline shrink-0"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="relative">
        <div id="best-sellers-scroll" className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-1">
          {products.map((p) => (
            <div key={p.id} className="shrink-0 w-[150px] sm:w-[170px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <button
          onClick={() => document.getElementById("best-sellers-scroll")?.scrollBy({ left: 200, behavior: "smooth" })}
          className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-3 w-8 h-8 rounded-full bg-white border border-[#EEF4ED] shadow-md items-center justify-center hover:bg-slate-50 transition"
          aria-label="Scroll products right"
        >
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </div>
  );
}
