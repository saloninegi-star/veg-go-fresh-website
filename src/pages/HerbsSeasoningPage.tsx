import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Leaf,
  ShieldCheck,
  Truck,
  Tag,
  RotateCcw,
  Sparkles,
  Bot,
  Clock,
  Plus,
  Minus,
  Grid3x3,
  Salad,
  Check,
  Coffee,
  CreditCard,
  Phone,
  Mail,
  Smartphone,
  Award,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  ArrowRight,
  Scissors,
  Milk,
  Egg,
  Wheat,
  Cherry,
  Flower2,
  Star,
} from "lucide-react";

import VegetableCursor from "../components/VegetableCursor";

const BRAND = {
  forestGreen: "#135029",
  leafGreen: "#228B22",
  lightMintBg: "#EAF5E9",
  sidebarBg: "#F4FAF4",
  textDark: "#111827",
  textMuted: "#5F6D63",
  borderLight: "#E2EFE0",
};

export function VegGoLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center select-none cursor-pointer ${className}`}>
      <svg viewBox="0 0 180 90" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style type="text/css">
            {`
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&display=swap');
              .logo-text-veggo {
                font-family: 'Poppins', sans-serif;
                font-size: 48px;
                font-weight: 900;
                letter-spacing: -2px;
              }
              .logo-text-fresh {
                font-family: 'Poppins', sans-serif;
                font-size: 11.5px;
                font-weight: 800;
                letter-spacing: 0.28em;
              }
            `}
          </style>
        </defs>
        <g transform="translate(80, 2)">
          <path d="M17 38 C17 29 15 21 10 13" stroke="#128238" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M17 38 C18 28 22 20 30 13" stroke="#128238" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M17 34 C11 31 5 25 4 16 C4 11 5 8 6 6 C14 9 19 15 20 23 C20 28 19 32 17 34 Z" fill="#4BAF3D" />
          <path d="M17 32 C13 23 9 16 6 8.5" stroke="#E8F5E5" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
          <path d="M18 34 C21 24 28 13 41 5 C42 4 43 4 44 4 C42 16 38 27 30 32 C25 34 21 35 18 34 Z" fill="#3F9F36" />
          <path d="M20 32 C26 23 34 14 41.5 6" stroke="#E8F5E5" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
        </g>
        <text x="98" y="68" className="logo-text-veggo" textAnchor="end" fill="#128238">Veg</text>
        <text x="98" y="68" className="logo-text-veggo" textAnchor="start" fill="#F46B16">Go</text>
        <text x="98" y="81" className="logo-text-fresh" textAnchor="start" fill="#128238">FRESH</text>
      </svg>
    </div>
  );
}

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

// Unified Products Database (Common to all pages)
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
    navigate(item.route);
  };

  return (
    <div className="min-h-screen bg-[#FBFDFB] text-slate-800 flex flex-col">
      <VegetableCursor />

      {/* TOAST MESSAGE */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#135029] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in border border-emerald-400/30">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* TOP BAR */}
      <div className="bg-[#EAF6EA] text-[#1E5F26] border-b border-[#D8EBD7] px-4 lg:px-10 py-1.5 text-xs hidden md:flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-medium">
          <Leaf className="w-3.5 h-3.5 text-[#228B22]" />
          <span>Eat Fresh, Live Healthy</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:opacity-90">
          <MapPin className="w-3.5 h-3.5 text-[#228B22]" />
          <span>Delivering to: <strong className="font-semibold text-[#113B1E]">Kukatpally, Hyderabad</strong></span>
          <ChevronDown className="w-3 h-3 text-slate-500 ml-0.5" />
        </div>
        <div className="flex items-center gap-4 text-[11px] text-[#1E5F26]">
          <button onClick={() => showToast("Seller portal")} className="hover:underline">Become a Seller</button>
          <span>|</span>
          <button onClick={() => showToast("Offers active")} className="hover:underline">Offers</button>
          <span>|</span>
          <button onClick={() => showToast("Support")} className="hover:underline">Help &amp; Support</button>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#EEF4ED] shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
          <button onClick={() => setMobileNav(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-emerald-50 text-slate-700">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center cursor-pointer shrink-0" onClick={() => navigate("/")}>
            <VegGoLogo className="h-10 md:h-12 w-auto" />
          </div>

          <div className="flex-1 max-w-xl hidden sm:flex items-center border border-[#DCE8DA] rounded-lg overflow-hidden">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search herbs, ginger, garlic..."
              className="flex-1 px-4 py-2 text-xs md:text-sm outline-none"
            />
            <button onClick={() => showToast(`Searching for "${searchQuery}"`)} className="px-3.5 py-2.5 text-white bg-[#135029]">
              <Search className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div onClick={() => setAiModalOpen(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F0F8EE] border border-[#D5EAD3] cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-[#135029] flex items-center justify-center text-emerald-200">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-[#113B1E] hidden sm:inline">AI Assistant</span>
            </div>

            <div onClick={() => setCartOpen(true)} className="flex items-center gap-2.5 cursor-pointer relative">
              <ShoppingCart className="w-6 h-6 text-[#111827]" />
              <span className="absolute -top-2 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center text-white bg-[#135029] font-extrabold">
                {cartCount}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5 flex-1 w-full">
        <div className="grid lg:grid-cols-[220px_1fr] gap-5 items-start">
          
          {/* SIDEBAR */}
          <aside className="hidden lg:block w-56 shrink-0 rounded-2xl p-2.5 border border-[#E2EFE0] bg-[#F4FAF4]">
            <div className="space-y-0.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleCategoryNavigation(c)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    c.active ? "bg-[#E2F0E0] text-[#135029] font-bold shadow-xs" : "text-slate-700 hover:bg-white hover:text-[#135029]"
                  }`}
                >
                  <c.icon className={`w-4 h-4 shrink-0 ${c.active ? "text-[#135029]" : "text-[#2E7D32]"}`} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* PAGE CONTENT */}
          <div className="min-w-0 space-y-6">
            <section className="rounded-2xl p-7 sm:p-10 border border-[#DCEAD9] bg-[#FAF5EA] flex flex-col md:flex-row items-center justify-between">
              <div className="text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#135029] text-[11px] font-bold">
                  <Scissors className="w-3.5 h-3.5 text-yellow-600" />
                  Aromatics &amp; Fresh Spices
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
                  Herbs &amp; Seasonings
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                  Elevate your cooking with fresh, handpicked herbs and premium raw ginger-garlic aromatics.
                </p>
              </div>
              <div className="w-48 h-48 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&w=400&q=80" alt="Herbs" className="rounded-2xl object-cover w-full h-full" />
              </div>
            </section>

            {/* PRODUCT GRID */}
            <section className="bg-white rounded-2xl border border-[#EEF4ED] p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 text-left mb-4">Popular Herbs</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                {ALL_PRODUCTS.filter((p) => ["lemongrass", "garlic", "ginger", "curryleaves", "basil", "rosemary"].includes(p.id)).map((product) => {
                  const inCartQty = cart[product.id] || 0;
                  return (
                    <div key={product.id} className="rounded-2xl p-3 flex flex-col justify-between bg-white hover:shadow-md transition duration-200 border border-[#EEF4ED]">
                      <div className="h-32 w-full overflow-hidden rounded-xl bg-slate-50 mb-2.5">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left mb-3">
                        <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">{product.name}</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5">{product.weight}</div>
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-black text-slate-900">₹{product.price}</span>
                          <span className="text-[10px] text-slate-400 line-through">₹{product.mrp}</span>
                        </div>
                        <div>
                          {inCartQty > 0 ? (
                            <div className="flex items-center gap-1.5 bg-[#135029] text-white rounded-lg px-2 py-1 h-7">
                              <button onClick={() => removeFromCart(product.id)}><Minus className="w-2.5 h-2.5 stroke-[3]" /></button>
                              <span className="text-xs font-bold w-3 text-center">{inCartQty}</span>
                              <button onClick={() => addToCart(product.id)}><Plus className="w-2.5 h-2.5 stroke-[3]" /></button>
                            </div>
                          ) : (
                            <button onClick={() => addToCart(product.id)} className="w-7 h-7 rounded-lg bg-[#135029] text-white flex items-center justify-center">
                              <Plus className="w-4 h-4 stroke-[3]" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* CART DRAWER & OTHER MODALS (Shared across all files) */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in relative z-50">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#F4FAF4]">
              <h3 className="font-bold text-slate-900">My Cart ({cartCount} items)</h3>
              <button onClick={() => setCartOpen(false)}><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cartCount === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <ShoppingCart className="w-12 h-12 mb-2 text-slate-300" />
                  <p className="text-sm font-semibold text-slate-700">Your cart is empty</p>
                </div>
              ) : (
                Object.entries(cart).map(([id, qty]) => {
                  const p = ALL_PRODUCTS.find((prod) => prod.id === id);
                  if (!p) return null;
                  return (
                    <div key={id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50">
                      <img src={p.img} alt={p.name} className="w-14 h-14 rounded-lg object-cover bg-white" />
                      <div className="flex-1 text-left">
                        <div className="text-xs font-bold text-slate-900">{p.name}</div>
                        <div className="text-[10px] text-slate-500">{p.weight}</div>
                        <div className="text-xs font-bold text-[#135029] mt-0.5">₹{p.price}</div>
                      </div>
                      <div className="flex items-center gap-2 bg-[#135029] rounded-lg p-1 text-white">
                        <button onClick={() => removeFromCart(id)}><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-bold">{qty}</span>
                        <button onClick={() => addToCart(id)}><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            {cartCount > 0 && (
              <div className="p-5 border-t bg-slate-50 space-y-3">
                <div className="flex justify-between text-sm font-bold">
                  <span>Total Amount</span>
                  <span className="text-[#135029]">₹{cartTotal.toFixed(2)}</span>
                </div>
                <button onClick={() => { showToast("Order Placed!"); setCart({}); setCartOpen(false); }} className="w-full py-3 rounded-lg text-white font-bold bg-[#135029]">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 bg-black/40 fixed inset-0 z-40" onClick={() => setCartOpen(false)} />
        </div>
      )}

      {/* MOBILE NAV DRAWER */}
      {mobileNav && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-white h-full p-5 overflow-y-auto flex flex-col text-left relative z-50">
            <div className="flex items-center justify-between mb-4 pb-3 border-b">
              <VegGoLogo className="h-9 w-auto" />
              <button onClick={() => setMobileNav(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-1">
              {CATEGORIES.map((c) => (
                <button key={c.name} onClick={() => { setMobileNav(false); navigate(c.route); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${c.active ? "bg-[#EAF6EA] text-[#135029]" : "text-slate-700"}`}>
                  <c.icon className="w-4 h-4 text-[#2E7D32]" />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-black/40 fixed inset-0 z-40" onClick={() => setMobileNav(false)} />
        </div>
      )}

      {/* AI SMART ASSISTANT */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden flex flex-col z-50">
            <div className="p-4 bg-[#135029] text-white flex items-center justify-between">
              <span className="text-sm font-bold flex items-center gap-2"><Bot className="w-5 h-5" /> AI Assistant</span>
              <button onClick={() => setAiModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 text-left text-xs bg-[#F4FAF4]">
              How can I help you cook with these fresh spices &amp; herbs today?
            </div>
          </div>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setAiModalOpen(false)} />
        </div>
      )}
    </div>
  );
}