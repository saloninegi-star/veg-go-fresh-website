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

/* ---------------------------------------------------------------------- */
/*  Brand Colors                                                          */
/* ---------------------------------------------------------------------- */
const BRAND = {
  forestGreen: "#135029",
  leafGreen: "#228B22",
  lightMintBg: "#EAF5E9",
  sidebarBg: "#F4FAF4",
  textDark: "#111827",
  textMuted: "#5F6D63",
  borderLight: "#E2EFE0",
};

/* ---------------------------------------------------------------------- */
/*  Categories List                                                       */
/* ---------------------------------------------------------------------- */
const CATEGORIES = [
  { name: "Vegetables", icon: Salad, route: "/" },
  { name: "Fruits", icon: Cherry, route: "/fruits" },
  { name: "Leafy Greens", icon: Leaf, route: "/leafy-greens" },
  { name: "Herbs & Seasoning", icon: Scissors, route: "/herbs-seasoning", active: true },
  { name: "Exotic Vegetables", icon: Sparkles, route: "/exotic-vegetables" },
  { name: "Dairy Products", icon: Milk, route: "/dairy-products" },
  { name: "Eggs", icon: Egg, route: "/eggs" },
  { name: "Pulses & Grains", icon: Wheat, route: "/pulses-grains" },
  { name: "Rice & Millets", icon: Grid3x3, route: "/rice-millets" },
  { name: "Beverages", icon: Coffee, route: "/beverages" },
  { name: "Plants & Pots", icon: Flower2, route: "/plants-pots" },
];

/* ---------------------------------------------------------------------- */
/*  Unified Products Database                                             */
/* ---------------------------------------------------------------------- */
const ALL_PRODUCTS = [
  // Vegetables
  { id: "tomato", name: "Tomato", weight: "1 kg", price: 25.0, mrp: 35.0, img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80" },
  { id: "onion", name: "Onion", weight: "1 kg", price: 28.0, mrp: 40.0, img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80" },
  { id: "potato", name: "Potato", weight: "1 kg", price: 22.0, mrp: 30.0, img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80" },
  // Leafy Greens
  { id: "spinach", name: "Fresh Spinach", weight: "250 g", price: 30.0, mrp: 40.0, img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80" },
  { id: "coriander", name: "Fresh Coriander", weight: "100 g", price: 20.0, mrp: 30.0, img: "https://images.unsplash.com/photo-1588879460618-9244e6d2e6f1?auto=format&fit=crop&w=500&q=80" },
  // Herbs & Seasoning
  { id: "lemongrass", name: "Lemongrass", weight: "100 g", price: 15.0, mrp: 25.0, img: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&w=400&q=80" },
  { id: "garlic", name: "Fresh Garlic", weight: "250 g", price: 40.0, mrp: 60.0, img: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=400&q=80" },
  { id: "ginger", name: "Fresh Ginger", weight: "250 g", price: 30.0, mrp: 45.0, img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80" },
  { id: "curryleaves", name: "Curry Leaves", weight: "50 g", price: 10.0, mrp: 15.0, img: "https://images.unsplash.com/photo-1614741315629-9e20db4efb34?auto=format&fit=crop&w=400&q=80" },
  { id: "basil", name: "Thai Basil", weight: "100 g", price: 35.0, mrp: 50.0, img: "https://images.unsplash.com/photo-1553830591-2f39e38a013c?auto=format&fit=crop&w=400&q=80" },
  { id: "rosemary", name: "Rosemary", weight: "50 g", price: 50.0, mrp: 75.0, img: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=400&q=80" },
  // Exotic Vegetables
  { id: "broccoli", name: "Broccoli", weight: "1 pc", price: 80.0, mrp: 110.0, img: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80" },
  { id: "zucchini", name: "Zucchini Yellow", weight: "1 pc", price: 60.0, mrp: 90.0, img: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=400&q=80" },
  { id: "bellpeppers", name: "Colored Bell Peppers", weight: "2 pcs", price: 120.0, mrp: 170.0, img: "https://images.unsplash.com/photo-1563565080-1cd101b462f4?auto=format&fit=crop&w=400&q=80" },
  // Dairy
  { id: "milk", name: "Fresh Cow Milk", weight: "1 L", price: 66.0, mrp: 70.0, img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80" },
  { id: "paneer", name: "Organic Paneer", weight: "200 g", price: 90.0, mrp: 110.0, img: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=400&q=80" },
  { id: "butter", name: "Salted Butter", weight: "100 g", price: 55.0, mrp: 60.0, img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80" },
  // Eggs
  { id: "eggs6", name: "Farm Fresh Eggs", weight: "6 pcs", price: 45.0, mrp: 55.0, img: "https://images.unsplash.com/photo-1516448424440-9dbca97779c1?auto=format&fit=crop&w=400&q=80" },
  { id: "eggs12", name: "Farm Fresh Eggs", weight: "12 pcs", price: 85.0, mrp: 100.0, img: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=400&q=80" },
  { id: "browneggs", name: "Organic Brown Eggs", weight: "6 pcs", price: 75.0, mrp: 90.0, img: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=400&q=80" },
  // Pulses & Grains
  { id: "toordal", name: "Toor Dal", weight: "1 kg", price: 160.0, mrp: 190.0, img: "https://images.unsplash.com/photo-1585994187746-e4a775515715?auto=format&fit=crop&w=400&q=80" },
  { id: "moongdal", name: "Moong Dal", weight: "1 kg", price: 130.0, mrp: 150.0, img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80" },
  // Rice & Millets
  { id: "basmati", name: "Basmati Rice", weight: "1 kg", price: 140.0, mrp: 180.0, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80" },
  { id: "kolam", name: "Kolam Rice", weight: "5 kg", price: 340.0, mrp: 400.0, img: "https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&w=400&q=80" },
  // Beverages
  { id: "coffee", name: "Filter Coffee", weight: "250 g", price: 120.0, mrp: 150.0, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80" },
  { id: "tea", name: "Assam Tea Gold", weight: "500 g", price: 180.0, mrp: 220.0, img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80" },
  // Plants & Pots
  { id: "tulsi", name: "Tulsi Plant", weight: "1 pc", price: 80.0, mrp: 120.0, img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80" },
  { id: "aloe", name: "Aloe Vera Plant", weight: "1 pc", price: 120.0, mrp: 180.0, img: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=400&q=80" },
  // Fruits
  { id: "apples", name: "Premium Apples", weight: "4 pcs", price: 120.0, mrp: 160.0, img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80" },
  { id: "banana", name: "Fresh Banana", weight: "1 dozen", price: 40.0, mrp: 60.0, img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80" },
  { id: "pomegranate", name: "Pomegranate", weight: "1 kg", price: 160.0, mrp: 210.0, img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80" },
];

export default function HerbsSeasoningPage() {
  const navigate = useNavigate();

  // Load common cart from localStorage on component mount
  const [cart, setCart] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("veggo_cart");
    return saved ? JSON.parse(saved) : {};
  });

  const [mobileNav, setMobileNav] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fontHead = { fontFamily: "'Poppins', sans-serif" };
  const fontBody = { fontFamily: "'Inter', sans-serif" };

  // Sync cart state with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("veggo_cart", JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

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

  const handleCategoryNavigation = (item: typeof CATEGORIES[0]) => {
    if (item.name === "Herbs & Seasoning") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(item.route);
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
              {CATEGORIES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleCategoryNavigation(c)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    c.active
                      ? "bg-[#E2F0E0] text-[#135029] shadow-2xs font-bold"
                      : "text-slate-700 hover:bg-white hover:text-[#135029]"
                  }`}
                >
                  <c.icon className={`w-4 h-4 shrink-0 ${c.active ? "text-[#135029]" : "text-[#2E7D32]"}`} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* RIGHT PANELS */}
          <div className="min-w-0 space-y-6">

            {/* HERO BANNER SECTION */}
            <section className="rounded-2xl overflow-hidden border border-[#DCEAD9] bg-[#FAF5EA]">
              <div className="grid lg:grid-cols-2 items-center min-h-[300px]">
                <div className="p-7 sm:p-10 lg:p-14 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#EADFC2] text-[#135029] text-[11px] font-bold shadow-2xs">
                    <Scissors className="w-3.5 h-3.5 text-yellow-600" />
                    Aromatics &amp; Fresh Spices
                  </div>

                  <h1 className="mt-5 text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.12] text-[#111827]" style={fontHead}>
                    Fresh &amp; Fragrant
                    <br />
                    <span className="text-[#228B22]">Herbs &amp; Seasonings</span>
                  </h1>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                    Elevate your cooking with fresh, handpicked herbs and premium raw ginger-garlic aromatics.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-6">
                    <button
                      onClick={() =>
                        document.getElementById("herbs-products")?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
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
                    src="https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&w=500&q=80"
                    alt="Herbs"
                    className="w-full h-full object-cover rounded-2xl select-none"
                  />
                </div>
              </div>
            </section>

            {/* PRODUCT GRID */}
            <section
              id="herbs-products"
              className="bg-white rounded-2xl border border-[#EEF4ED] p-4 sm:p-5 shadow-xs"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="text-left">
                  <div className="text-[11px] font-bold text-[#228B22] uppercase tracking-wider">
                    Fresh Arrivals
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1" style={fontHead}>
                    Popular Herbs
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Fresh, aromatic and carefully selected
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#135029]">
                  <Star className="w-4 h-4 fill-current" />
                  Farm Fresh Guarantee
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                {ALL_PRODUCTS.filter((p) =>
                  ["lemongrass", "garlic", "ginger", "curryleaves", "basil", "rosemary"].includes(p.id)
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
                        <div className="text-sm font-extrabold text-slate-900 truncate">{product.name}</div>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">{product.weight}</div>
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
                        <div className="flex items-center shrink-0">
                          {inCartQty > 0 ? (
                            <div className="flex items-center gap-1.5 bg-[#135029] text-white rounded-lg px-2 py-1 shadow-md h-7">
                              <button
                                onClick={() => removeFromCart(product.id)}
                                className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-80 active:scale-90"
                              >
                                <Minus className="w-2.5 h-2.5 text-white stroke-[3px]" />
                              </button>
                              <span className="text-xs font-bold w-3 text-center leading-none">{inCartQty}</span>
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
                  Freshly handpicked herbs and aromatics every single day.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FAF5EA] border border-[#F2E8D5] p-5 text-left">
                <div className="text-[#135029] font-black text-lg">Rich Aroma</div>
                <p className="text-xs text-[#5F6D63] mt-1">
                  Naturally fragrant, chemical-free and full of flavour.
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
              <button onClick={() => setCartOpen(false)} className="p-1 rounded-lg hover:bg-slate-200 text-slate-500">
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
                        <button onClick={() => removeFromCart(id)} className="w-5 h-5 flex items-center justify-center hover:opacity-80">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-3 text-center">{qty}</span>
                        <button onClick={() => addToCart(id)} className="w-5 h-5 flex items-center justify-center hover:opacity-80">
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

      {/* ================= AI SMART ASSISTANT ================= */}
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
                👋 Hello Shiva! How can I help you cook with these fresh spices &amp; herbs today?
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Ginger-Garlic Paste Tips", "How to store fresh herbs", "Aromatic curry blends"].map((q) => (
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

      {/* ================= MOBILE NAV DRAWER ================= */}
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
                    handleCategoryNavigation(c);
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
          <span>© {new Date().getFullYear()} VegGo Fresh Technologies Pvt. Ltd.</span>
          <button onClick={() => navigate("/")} className="text-[#135029] font-bold hover:underline">
            Back to Home
          </button>
        </div>
      </footer>

      {/* Global CSS keyframes inline embedding */}
      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(100%); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
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