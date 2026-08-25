import React, { useState, useMemo } from "react";
import { Plus, Minus, Star, SlidersHorizontal, ArrowUpDown, ShieldCheck, Leaf } from "lucide-react";

interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  mrp: number;
  img: string;
  category: "all" | "essentials" | "exotic" | "roots" | "herbs";
  isOrganic: boolean;
  rating: number;
}

const VEG_PRODUCTS: Product[] = [
  {
    id: "tomato",
    name: "Fresh Hybrid Tomato",
    weight: "1 kg",
    price: 25.0,
    mrp: 35.0,
    img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80",
    category: "essentials",
    isOrganic: true,
    rating: 4.8
  },
  {
    id: "onion",
    name: "Nashik Red Onion",
    weight: "1 kg",
    price: 28.0,
    mrp: 40.0,
    img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80",
    category: "essentials",
    isOrganic: false,
    rating: 4.6
  },
  {
    id: "potato",
    name: "Indore Jyoti Potato",
    weight: "1 kg",
    price: 22.0,
    mrp: 30.0,
    img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80",
    category: "roots",
    isOrganic: false,
    rating: 4.7
  },
  {
    id: "carrot",
    name: "Organic Red Carrot",
    weight: "500 g",
    price: 35.0,
    mrp: 45.0,
    img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80",
    category: "roots",
    isOrganic: true,
    rating: 4.9
  },
  {
    id: "broccoli",
    name: "Green Premium Broccoli",
    weight: "1 pc (approx 350g)",
    price: 65.0,
    mrp: 85.0,
    img: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80",
    category: "exotic",
    isOrganic: true,
    rating: 4.5
  },
  {
    id: "capsicum",
    name: "Green Capsicum (Shimla Mirch)",
    weight: "500 g",
    price: 40.0,
    mrp: 55.0,
    img: "https://images.unsplash.com/photo-1563565080-7cb3b7d8413a?auto=format&fit=crop&w=400&q=80",
    category: "essentials",
    isOrganic: false,
    rating: 4.4
  },
  {
    id: "coriander",
    name: "Fresh Green Coriander (Dhaniya)",
    weight: "1 bunch (100 g)",
    price: 15.0,
    mrp: 20.0,
    img: "https://images.unsplash.com/photo-1514944224746-6bba5b09e5c2?auto=format&fit=crop&w=400&q=80",
    category: "herbs",
    isOrganic: true,
    rating: 4.8
  },
  {
    id: "mint",
    name: "Aromatic Mint Leaves (Pudina)",
    weight: "1 bunch (100 g)",
    price: 12.0,
    mrp: 18.0,
    img: "https://images.unsplash.com/photo-1534080564883-114af07b6c5a?auto=format&fit=crop&w=400&q=80",
    category: "herbs",
    isOrganic: true,
    rating: 4.7
  }
];

interface VegetablesPageProps {
  cart: Record<string, number>;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}

export default function VegetablesPage({ cart, addToCart, removeFromCart }: VegetablesPageProps) {
  const [activeSubFilter, setActiveSubFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  const fontHead = { fontFamily: "'Poppins', sans-serif" };
  const fontBody = { fontFamily: "'Inter', sans-serif" };

  // Filtering & Sorting logic combined
  const processedProducts = useMemo(() => {
    let list = [...VEG_PRODUCTS];
    
    if (activeSubFilter !== "all") {
      list = list.filter((p) => p.category === activeSubFilter);
    }

    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeSubFilter, sortBy]);

  return (
    <div className="space-y-6 text-left animate-fade-in" style={fontBody}>
      {/* Page Title & Promo */}
      <div className="bg-[#EAF5E9] p-6 sm:p-8 rounded-2xl border border-[#DCEAD9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#CDE5CC] text-[10px] font-bold text-[#1E5F26] mb-2.5">
            <Leaf className="w-3 h-3 text-[#228B22]" />
            <span>DIRECT FROM SOIL TO KITCHEN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900" style={fontHead}>
            Fresh Vegetables
          </h2>
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

      {/* Filter and Sorting Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
        {/* Sub-category Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { id: "all", label: "All Vegetables" },
            { id: "essentials", label: "Daily Essentials" },
            { id: "roots", label: "Root Veggies" },
            { id: "exotic", label: "Exotic & Organic" },
            { id: "herbs", label: "Fresh Herbs" },
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

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#228B22] cursor-pointer"
          >
            <option value="default">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Customer Ratings</option>
          </select>
        </div>
      </div>

      {/* Vegetables Grid */}
      {processedProducts.length === 0 ? (
        <div className="py-12 text-center text-slate-400">
          No vegetables found under this category.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {processedProducts.map((p) => {
            const inCartQty = cart[p.id] || 0;
            const discountPercentage = Math.round(((p.mrp - p.price) / p.mrp) * 100);

            return (
              <div
                key={p.id}
                className="group relative rounded-2xl border border-[#EEF4ED] bg-white p-3.5 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
              >
                {/* badges absolute */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
                  {p.isOrganic && (
                    <span className="bg-[#EAF6EA] border border-emerald-200 text-[#135029] text-[9px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      <Leaf className="w-2.5 h-2.5 text-emerald-600" />
                      <span>Organic</span>
                    </span>
                  )}
                  {discountPercentage > 0 && (
                    <span className="bg-[#E03838] text-white text-[9px] font-black px-2 py-0.5 rounded-md">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Image Container */}
                <div className="h-32 sm:h-40 w-full overflow-hidden rounded-xl bg-slate-50 mb-3 relative">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300 select-none"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 backdrop-blur-xs">
                    <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                    <span>{p.rating}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="text-left mb-3">
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#135029] transition leading-tight line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">{p.weight}</p>
                </div>

                {/* Price and Cart Controller */}
                <div className="flex items-center justify-between gap-1 pt-1.5 border-t border-slate-50">
                  <div className="flex items-baseline gap-1.5 min-w-0">
                    <span className="text-base font-black text-[#135029]">
                      ₹{p.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{p.mrp.toFixed(2)}
                    </span>
                  </div>

                  <div className="shrink-0">
                    {inCartQty > 0 ? (
                      <div className="flex items-center gap-2.5 bg-[#135029] text-white rounded-lg px-2.5 py-1 shadow-md h-8">
                        <button
                          onClick={() => removeFromCart(p.id)}
                          className="w-4 h-4 flex items-center justify-center hover:opacity-80 active:scale-90"
                        >
                          <Minus className="w-3 h-3 text-white stroke-[3px]" />
                        </button>
                        <span className="text-xs font-bold w-3.5 text-center leading-none">{inCartQty}</span>
                        <button
                          onClick={() => addToCart(p.id)}
                          className="w-4 h-4 flex items-center justify-center hover:opacity-80 active:scale-90"
                        >
                          <Plus className="w-3 h-3 text-white stroke-[3px]" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(p.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#135029] hover:bg-[#1A5E33] text-white text-xs font-bold shadow-md transition active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 text-white stroke-[3.5px]" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}