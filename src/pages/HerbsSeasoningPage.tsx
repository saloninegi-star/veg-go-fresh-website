import { useNavigate } from "react-router-dom";
import { Scissors, Star } from "lucide-react";
import CategorySidebar from "../components/shared/CategorySidebar";
import ProductCard from "../components/shared/ProductCard";
import { getProductsByCategory } from "../data/products";

const herbProducts = getProductsByCategory("Herbs & Seasoning");

export default function HerbsSeasoningPage() {
  const navigate = useNavigate();

  return (
    <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5">
      <div className="grid lg:grid-cols-[220px_1fr] gap-5 items-start">
        <CategorySidebar variant="page" />

        <div className="min-w-0 space-y-6">
          <section className="rounded-2xl overflow-hidden border border-[#DCEAD9] bg-[#FAF5EA]">
            <div className="grid lg:grid-cols-2 items-center min-h-[300px]">
              <div className="p-7 sm:p-10 lg:p-14 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#EADFC2] text-[#135029] text-[11px] font-bold shadow-2xs">
                  <Scissors className="w-3.5 h-3.5 text-yellow-600" />
                  Aromatics &amp; Fresh Spices
                </div>

                <h1 className="mt-5 text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.12] text-[#111827]">
                  Fresh &amp; Fragrant
                  <br />
                  <span className="text-[#228B22]">Herbs &amp; Seasonings</span>
                </h1>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                  Elevate your cooking with fresh, handpicked herbs and premium raw ginger-garlic aromatics.
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <button
                    onClick={() => document.getElementById("herbs-products")?.scrollIntoView({ behavior: "smooth" })}
                    className="px-6 py-3 rounded-lg bg-[#135029] text-white text-xs sm:text-sm font-bold hover:brightness-110 transition shadow-xs"
                  >
                    Shop Herbs
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="px-5 py-3 rounded-lg bg-white border border-[#E5D9BB] text-slate-800 text-xs sm:text-sm font-bold hover:bg-[#F9F4E8] transition shadow-2xs"
                  >
                    Explore Vegetables
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-5 text-xs text-slate-600 font-medium">
                  <Star className="w-3.5 h-3.5 text-[#228B22] fill-[#228B22]" />
                  <span>Farm Fresh • 30–45 mins Delivery</span>
                </div>
              </div>

              <div className="h-[240px] sm:h-[280px] lg:h-[300px] flex items-center justify-center p-5 lg:p-8">
                <img
                  src="https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&w=600&q=80"
                  alt="Herbs"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-2xl select-none"
                />
              </div>
            </div>
          </section>

          <section id="herbs-products" className="bg-white rounded-2xl border border-[#EEF4ED] p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="text-left">
                <div className="text-[11px] font-bold text-[#228B22] uppercase tracking-wider">Fresh Arrivals</div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">Popular Herbs</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Fresh, aromatic and carefully selected</p>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#135029]">
                <Star className="w-4 h-4 fill-current" />
                Farm Fresh Guarantee
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
              {herbProducts.map((product) => (
                <ProductCard key={product.id} product={product} imageHeightClassName="h-32 sm:h-36" />
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[#EAF5E9] border border-[#D8EBD7] p-5 text-left">
              <div className="text-[#135029] font-black text-lg">100% Fresh</div>
              <p className="text-xs text-[#5F6D63] mt-1">Freshly handpicked herbs and aromatics every single day.</p>
            </div>
            <div className="rounded-2xl bg-[#FAF5EA] border border-[#F2E8D5] p-5 text-left">
              <div className="text-[#135029] font-black text-lg">Rich Aroma</div>
              <p className="text-xs text-[#5F6D63] mt-1">Naturally fragrant, chemical-free and full of flavour.</p>
            </div>
            <div className="rounded-2xl bg-[#F4FAF4] border border-[#DCEAD9] p-5 text-left">
              <div className="text-[#135029] font-black text-lg">Express Delivery</div>
              <p className="text-xs text-[#5F6D63] mt-1">Safely delivered fresh to your door in 30–45 minutes.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
