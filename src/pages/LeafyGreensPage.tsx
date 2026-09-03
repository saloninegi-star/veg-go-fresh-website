import { useNavigate } from "react-router-dom";
import { Leaf, Star } from "lucide-react";
import CategorySidebar from "../components/shared/CategorySidebar";
import ProductCard from "../components/shared/ProductCard";
import { getProductsByCategory } from "../data/products";
import leafyGreensHeroImg from "../assets/images/leafy-greens.jpg";

const leafyProducts = getProductsByCategory("Leafy Greens");
const FALLBACK_HERO_IMG =
  "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80";

export default function LeafyGreensPage() {
  const navigate = useNavigate();

  return (
    <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5">
      <div>
        {/* <CategorySidebar variant="page" /> */}

        <div className="min-w-0 space-y-6">
          <section className="rounded-2xl overflow-hidden border border-[#DCEAD9] bg-[#EAF5E9]">
            <div className="grid lg:grid-cols-2 items-center min-h-[350px]">
              <div className="p-7 sm:p-10 lg:p-14 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#CDE5CC] text-[#135029] text-[11px] font-bold shadow-2xs">
                  <Leaf className="w-3.5 h-3.5 text-[#228B22]" />
                  Fresh Leafy Collection
                </div>

                <h1 className="mt-5 text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.12] text-[#111827]">
                  Fresh & Healthy
                  <br />
                  <span className="text-[#228B22]">Leafy Greens For You</span>
                </h1>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                  Freshly picked leafy greens packed with natural goodness and delivered straight to your doorstep.
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <button
                    onClick={() => document.getElementById("leafy-products")?.scrollIntoView({ behavior: "smooth" })}
                    className="px-6 py-3 rounded-lg bg-[#135029] text-white text-xs sm:text-sm font-bold hover:brightness-110 transition shadow-xs"
                  >
                    Shop Leafy Greens
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="px-5 py-3 rounded-lg bg-white border border-[#D2E4D0] text-slate-800 text-xs sm:text-sm font-bold hover:bg-[#F4FAF4] transition shadow-2xs"
                  >
                    Explore Vegetables
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-5 text-xs text-slate-600 font-medium">
                  <Star className="w-3.5 h-3.5 text-[#228B22] fill-[#228B22]" />
                  <span>Farm Fresh • 30–45 mins Delivery</span>
                </div>
              </div>

              <div className="h-[280px] sm:h-[330px] lg:h-[380px] flex items-center justify-center p-5 lg:p-8">
                <img
                  src={leafyGreensHeroImg}
                  alt="Fresh Leafy Greens"
                  loading="lazy"
                  className="w-full h-full object-contain select-none"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_HERO_IMG;
                  }}
                />
              </div>
            </div>
          </section>

          <section id="leafy-products" className="bg-white rounded-2xl border border-[#EEF4ED] p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="text-left">
                <div className="text-[11px] font-bold text-[#228B22] uppercase tracking-wider">Fresh Arrivals</div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">Leafy Greens</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Fresh, nutritious and carefully selected</p>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#135029]">
                <Star className="w-4 h-4 fill-current" />
                Farm Fresh Guarantee
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
              {leafyProducts.map((product) => (
                <ProductCard key={product.id} product={product} imageHeightClassName="h-32 sm:h-36" />
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[#EAF5E9] border border-[#D8EBD7] p-5 text-left">
              <div className="text-[#135029] font-black text-lg">100% Fresh</div>
              <p className="text-xs text-[#5F6D63] mt-1">Freshly picked organic leafy greens every single day.</p>
            </div>
            <div className="rounded-2xl bg-[#FAF5EA] border border-[#F2E8D5] p-5 text-left">
              <div className="text-[#135029] font-black text-lg">Healthy Choice</div>
              <p className="text-xs text-[#5F6D63] mt-1">Naturally nutritious, chemical-free and healthy.</p>
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
