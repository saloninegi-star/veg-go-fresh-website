import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Leaf,
  Sparkles,
  Bot,
  Plus,
  Minus,
  Grid3x3,
  Salad,
  Check,
  Coffee,
  ArrowRight,
  Scissors,
  Milk,
  Egg,
  Wheat,
  Cherry,
  Flower2,
  Star,
  ShoppingCart,
} from "lucide-react";

// Reusable Navbar और VegGoLogo को इम्पोर्ट करें
import Navbar, { VegGoLogo } from "../components/Navbar";

import leafyGreens from "../assets/images/leafy-greens.jpg";

/* ---------------------------------------------------------------------- */
/*  Figma Brand Color Palette                                             */
/* ---------------------------------------------------------------------- */
const BRAND = {
  forestGreen: "#135029", // Primary CTA button & dark green
  leafGreen: "#228B22",   // Fresh accent green
  lightMintBg: "#EAF5E9", // Background
  sidebarBg: "#F4FAF4",   
  textDark: "#111827",    
  textMuted: "#5F6D63",   
  borderLight: "#E2EFE0", 
};

/* ---------------------------------------------------------------------- */
/*  Categories List                                                       */
/* ---------------------------------------------------------------------- */
const CATEGORIES = [
  { name: "Vegetables", icon: Salad },
  { name: "Fruits", icon: Cherry },
  { name: "Leafy Greens", icon: Leaf, active: true },
  { name: "Herbs & Seasoning", icon: Scissors },
  { name: "Exotic Vegetables", icon: Sparkles },
  { name: "Dairy Products", icon: Milk },
  { name: "Eggs", icon: Egg },
  { name: "Pulses & Grains", icon: Wheat },
  { name: "Rice & Millets", icon: Grid3x3 },
  { name: "Beverages", icon: Coffee },
  { name: "Plants & Pots", icon: Flower2 },
];

/* ---------------------------------------------------------------------- */
/*  Products Catalog (Leafy Greens + Common Items for Unified Cart)       */
/* ---------------------------------------------------------------------- */
const ALL_PRODUCTS = [
  // Leafy Greens Collection
  {
    id: "spinach",
    name: "Fresh Spinach",
    weight: "250 g",
    price: 30.0,
    mrp: 40.0,
    img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "coriander",
    name: "Fresh Coriander",
    weight: "100 g",
    price: 20.0,
    mrp: 30.0,
    img: "https://images.unsplash.com/photo-1588879460618-9244e6d2e6f1?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "mint",
    name: "Fresh Mint",
    weight: "100 g",
    price: 25.0,
    mrp: 35.0,
    img: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "methi",
    name: "Methi Leaves",
    weight: "250 g",
    price: 35.0,
    mrp: 45.0,
    img: "https://images.unsplash.com/photo-1628773822503-930a7eaecf80?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "amaranth",
    name: "Amaranth Leaves",
    weight: "250 g",
    price: 40.0,
    mrp: 55.0,
    img: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "kale",
    name: "Kale Leaves",
    weight: "200 g",
    price: 70.0,
    mrp: 90.0,
    img: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=500&q=80", 
  },
  // Main Catalog Products (For cart reference consistency)
  {
    id: "tomato",
    name: "Tomato",
    weight: "1 kg",
    price: 25.0,
    mrp: 35.0,
    img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "banana",
    name: "Banana",
    weight: "1 dozen",
    price: 40.0,
    mrp: 60.0,
    img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "apple",
    name: "Apple",
    weight: "4 pcs",
    price: 120.0,
    mrp: 160.0,
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80",
  },
];

export default function LeafyGreensPage() {
  const navigate = useNavigate();

  // State Management
  const [cart, setCart] = useState<Record<string, number>>({
    spinach: 1,
    mint: 1,
  });
  const [mobileNav, setMobileNav] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fontHead = { fontFamily: "'Poppins', sans-serif" };
  const fontBody = { fontFamily: "'Inter', sans-serif" };

  // Toast Functionality
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  // Cart Operations
  const addToCart = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      const item = ALL_PRODUCTS.find((p) => p.id === id);
      showToast(`Added ${item?.name || "item"} to cart`);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  }, []);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = ALL_PRODUCTS.find((prod) => prod.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  // Category navigation click handler
  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === "Vegetables") {
      navigate("/");
    } else if (categoryName === "Fruits") {
      navigate("/fruits");
    } else if (categoryName === "Leafy Greens") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      showToast(`Filtered by ${categoryName}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFDFB] text-slate-800 flex flex-col" style={fontBody}>
      
      {/* ================= REUSABLE NAVBAR ================= */}
      <Navbar
        setMobileNav={setMobileNav}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setAiModalOpen={setAiModalOpen}
        setCartOpen={setCartOpen}
        cartCount={cartCount}
        cartTotal={cartTotal}
        showToast={showToast}
      />

      {/* ================= TOAST ================= */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#135029] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in border border-emerald-400/30">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ================= MAIN CONTENT BODY ================= */}
      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5 flex-1 w-full">
        {/* Back to Home Button - Top Left */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-xs font-bold text-[#135029] hover:text-[#0d3a1e] transition mb-4"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>Back to Home</span>
        </button>
        <div className="grid lg:grid-cols-[220px_1fr] gap-5 items-start">
          
          {/* LEFT SIDEBAR - CATEGORIES */}
          <aside className="hidden lg:block w-56 shrink-0 rounded-2xl p-2.5 border border-[#E2EFE0] bg-[#F4FAF4] shadow-xs lg:sticky lg:top-24">
            <div className="px-3 py-2 mb-2">
              <h3 className="text-sm font-black text-slate-900">Categories</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Shop by category</p>
            </div>

            <div className="space-y-0.5">
              {CATEGORIES.map((c) => {
                const isSelected = c.active;
                return (
                  <button
                    key={c.name}
                    onClick={() => handleCategoryClick(c.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                      isSelected
                        ? "bg-[#E2F0E0] text-[#135029] shadow-2xs font-bold"
                        : "text-slate-700 hover:bg-white hover:text-[#135029]"
                    }`}
                  >
                    <c.icon
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? "text-[#135029]" : "text-[#2E7D32]"
                      }`}
                    />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* RIGHT PANELS */}
          <div className="min-w-0 space-y-6">
            
            {/* HERO BANNER SECTION */}
            <section className="rounded-2xl overflow-hidden border border-[#DCEAD9] bg-[#EAF5E9]">
              <div className="grid lg:grid-cols-2 items-center min-h-[350px]">
                <div className="p-7 sm:p-10 lg:p-14 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#CDE5CC] text-[#135029] text-[11px] font-bold shadow-2xs">
                    <Leaf className="w-3.5 h-3.5 text-[#228B22]" />
                    Fresh Leafy Collection
                  </div>

                  <h1 className="mt-5 text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.12] text-[#111827]" style={fontHead}>
                    Fresh &amp; Healthy
                    <br />
                    <span className="text-[#228B22]">Leafy Greens For You</span>
                  </h1>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                    Freshly picked leafy greens packed with natural goodness and delivered straight to your doorstep.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-6">
                    <button
                      onClick={() =>
                        document.getElementById("leafy-products")?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
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
                    src={leafyGreens}
                    alt="Fresh Leafy Greens"
                    className="w-full h-full object-contain select-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80";
                    }}
                  />
                </div>
              </div>
            </section>

            {/* LEAFY PRODUCTS LIST */}
            <section
              id="leafy-products"
              className="bg-white rounded-2xl border border-[#EEF4ED] p-4 sm:p-5 shadow-xs"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="text-left">
                  <div className="text-[11px] font-bold text-[#228B22] uppercase tracking-wider">
                    Fresh Arrivals
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1" style={fontHead}>
                    Leafy Greens
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Fresh, nutritious and carefully selected
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#135029]">
                  <Star className="w-4 h-4 fill-current" />
                  Farm Fresh Guarantee
                </div>
              </div>

              {/* Grid Layout of Products */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                {ALL_PRODUCTS.filter((p) =>
                  ["spinach", "coriander", "mint", "methi", "amaranth", "kale"].includes(p.id)
                ).map((product) => {
                  const inCartQty = cart[product.id] || 0;

                  return (
                    <div
                      key={product.id}
                      className="rounded-2xl p-3 flex flex-col justify-between bg-white hover:shadow-md transition-all duration-200 group border border-[#EEF4ED]"
                    >
                      <div className="h-32 sm:h-36 w-full overflow-hidden rounded-xl bg-slate-50 mb-2.5">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="text-left mb-3 px-0.5">
                        <div className="text-sm font-extrabold text-slate-900 truncate">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                          {product.weight}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-1 px-0.5">
                        <div className="flex items-baseline gap-1 min-w-0">
                          <span className="text-sm font-black text-slate-900 whitespace-nowrap">
                            ₹{product.price.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-slate-400 line-through whitespace-nowrap">
                            ₹{product.mrp.toFixed(2)}
                          </span>
                        </div>

                        {/* Interactive Plus / Minus Quantity Adjuster */}
                        <div className="flex items-center shrink-0">
                          {inCartQty > 0 ? (
                            <div className="flex items-center gap-1.5 bg-[#135029] text-white rounded-lg px-2 py-1 shadow-md h-7">
                              <button
                                onClick={() => removeFromCart(product.id)}
                                className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-80 active:scale-90"
                              >
                                <Minus className="w-2.5 h-2.5 text-white stroke-[3px]" />
                              </button>
                              <span className="text-xs font-bold w-3 text-center leading-none">
                                {inCartQty}
                              </span>
                              <button
                                onClick={() => addToCart(product.id)}
                                className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-80 active:scale-90"
                              >
                                <Plus className="w-2.5 h-2.5 text-white stroke-[3px]" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(product.id)}
                              className="w-7 h-7 rounded-lg bg-[#135029] text-white flex items-center justify-center hover:bg-[#1E7D32] transition active:scale-95 shadow-md"
                              aria-label={`Add ${product.name}`}
                            >
                              <Plus className="w-4 h-4 text-white stroke-[3px]" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* TRUST & PROPOSITION GRID */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-[#EAF5E9] border border-[#D8EBD7] p-5 text-left">
                <div className="text-[#135029] font-black text-lg">100% Fresh</div>
                <p className="text-xs text-[#5F6D63] mt-1">
                  Freshly picked organic leafy greens every single day.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FAF5EA] border border-[#F2E8D5] p-5 text-left">
                <div className="text-[#135029] font-black text-lg">Healthy Choice</div>
                <p className="text-xs text-[#5F6D63] mt-1">
                  Naturally nutritious, chemical-free and healthy.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F4FAF4] border border-[#DCEAD9] p-5 text-left">
                <div className="text-[#135029] font-black text-lg">Express Delivery</div>
                <p className="text-xs text-[#5F6D63] mt-1">
                  Safely delivered fresh to your door in 30–45 minutes.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ================= SLIDE-OVER CART DRAWER ================= */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in relative z-50">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#F4FAF4]">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#135029]" />
                <h3 className="font-bold text-base text-slate-900" style={fontHead}>
                  My Cart ({cartCount} items)
                </h3>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cartCount === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                  <ShoppingCart className="w-12 h-12 mb-3 text-slate-300" />
                  <p className="text-sm font-semibold text-slate-700">Your basket is empty</p>
                  <p className="text-xs text-slate-400 mt-1">Add fresh items from our catalog</p>
                </div>
              ) : (
                Object.entries(cart).map(([id, qty]) => {
                  const p = ALL_PRODUCTS.find((prod) => prod.id === id);
                  if (!p) return null;
                  return (
                    <div key={id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <img src={p.img} alt={p.name} className="w-14 h-14 rounded-lg object-cover bg-white" />
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                        <div className="text-[10px] text-slate-500">{p.weight}</div>
                        <div className="text-xs font-bold text-[#135029] mt-0.5">₹{p.price.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center gap-2 bg-[#135029] rounded-lg p-1 text-white">
                        <button
                          onClick={() => removeFromCart(id)}
                          className="w-5 h-5 flex items-center justify-center hover:opacity-80"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-3 text-center">{qty}</span>
                        <button
                          onClick={() => addToCart(id)}
                          className="w-5 h-5 flex items-center justify-center hover:opacity-80"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cartCount > 0 && (
              <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#135029] font-medium">
                    <span>Delivery (30-45 mins)</span>
                    <span className="uppercase font-bold">Free</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="text-[#135029]">₹{cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    showToast("🎉 Order placed! Fast delivery dispatched.");
                    setCart({});
                    setCartOpen(false);
                  }}
                  className="w-full py-3 rounded-lg text-white font-bold text-xs tracking-wide shadow-md transition hover:brightness-110 flex items-center justify-center gap-2"
                  style={{ backgroundColor: BRAND.forestGreen }}
                >
                  <span>Proceed to Checkout (₹{cartTotal.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xs fixed inset-0 z-40" onClick={() => setCartOpen(false)} />
        </div>
      )}

      {/* ================= AI RECIPE MODAL ================= */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#D5EAD3] overflow-hidden flex flex-col animate-fade-in z-50">
            <div className="p-4 bg-[#135029] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-300" />
                <h3 className="text-sm font-bold">VegGo Smart Assistant</h3>
              </div>
              <button onClick={() => setAiModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-left text-xs bg-[#F4FAF4]">
              <div className="p-3 bg-white rounded-xl border border-[#D5EAD3] text-slate-700 shadow-2xs">
                👋 Hello Shiva! What would you like to cook today with our fresh leafy farm arrivals?
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Palak Paneer Special Recipe", "How to keep Mint fresh for long", "Healthy Green Juices"].map((q) => (
                  <button
                    key={q}
                    onClick={() => showToast(`AI Tip loaded for: ${q}`)}
                    className="px-2.5 py-1 rounded-full bg-white border border-[#C2DEC1] text-[#135029] font-medium hover:bg-[#EAF6EA] transition text-[11px]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setAiModalOpen(false)} />
        </div>
      )}

      {/* ================= MOBILE NAVIGATION DRAWER ================= */}
      {mobileNav && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col text-left relative z-50">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <VegGoLogo className="h-9 w-auto" />
              <button onClick={() => setMobileNav(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 flex-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setMobileNav(false);
                    handleCategoryClick(c.name);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    c.active ? "bg-[#EAF6EA] text-[#135029]" : "text-slate-700"
                  }`}
                >
                  <c.icon className="w-4 h-4 text-[#2E7D32]" />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-black/40 fixed inset-0 z-40" onClick={() => setMobileNav(false)} />
        </div>
      )}

      {/* ================= SIMPLE FOOTER ================= */}
      <footer className="mt-8 bg-white border-t border-[#E8F2E6] py-6 px-4 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <span>
            © {new Date().getFullYear()} VegGo Fresh Technologies Pvt. Ltd.
          </span>

          <button
            onClick={() => navigate("/")}
            className="text-[#135029] font-bold hover:underline"
          >
            Back to Home
          </button>
        </div>
      </footer>

      {/* Global CSS keyframes inline embedding */}
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-slide-in {
            animation: slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-fade-in {
            animation: fadeIn 0.25s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}