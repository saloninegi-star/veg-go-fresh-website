import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LeafyGreensPage from "./pages/LeafyGreensPage";
import Navbar, { VegGoLogo } from "./components/Navbar"; 
import {
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
  Salad,       // सुनिश्चित करें कि यह यहाँ मौजूद है
  Check,
  Coffee,
  CreditCard,
  Phone,
  Mail,
  Smartphone,
  Award,
  ChevronRight,
  ArrowRight,
  Scissors,
  Milk,
  Egg,
  Wheat,
  Cherry,
  Flower2,
  MapPin,      // फ़ुटर में उपयोग के लिए
  ShoppingCart // कार्ट ड्रॉअर में उपयोग के लिए
} from "lucide-react";

// Import custom vegetable cursor


// Real uploaded brand assets
import heroBasket from "./assets/images/hero-basket-removebg-preview.png";
import coolerBag from "./assets/images/membership.png";
import flashsale from "./assets/images/flashsale.png";
import slideshow from "./assets/images/image.png"
import fruits from "./assets/images/fruits.png"
/* ---------------------------------------------------------------------- */
/*  Figma Brand Color Palette                                             */
/* ---------------------------------------------------------------------- */
const BRAND = {
  forestGreen: "#135029", // Primary CTA button & dark green
  leafGreen: "#228B22",   // Fresh accent green
  lightMintBg: "#EAF5E9", // Hero & membership container background
  sidebarBg: "#F4FAF4",   // Category sidebar background
  bannerDark: "#0E4823",  // Bottom promo bar background
  creamSale: "#FAF5EA",   // Flash sale container background
  textDark: "#111827",    // Main headings
  textMuted: "#5F6D63",   // Body/descriptions
  borderLight: "#E2EFE0", // Subtle card borders
  badgeRed: "#E03838",
  badgeGold: "#EAA023",
};



/* ---------------------------------------------------------------------- */
/*  Category items                                                        */
/* ---------------------------------------------------------------------- */
const CATEGORIES = [
  { name: "Vegetables", icon: Salad, active: true },
  { name: "Fruits", icon: Cherry },
  { name: "Leafy Greens", icon: Leaf },
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
/*  6 Trust / Value propositions                                          */
/* ---------------------------------------------------------------------- */
const FEATURES = [
  { icon: Leaf, title: "Farm Fresh", sub: "Handpicked Daily" },
  { icon: ShieldCheck, title: "No Chemicals", sub: "Pure & Healthy" },
  { icon: Truck, title: "30–45 mins Delivery", sub: "Fast & Reliable" },
  { icon: CreditCard, title: "Secure Payments", sub: "100% Safe" },
  { icon: Tag, title: "Best Prices", sub: "On All Products" },
  { icon: RotateCcw, title: "Easy Returns", sub: "Hassle Free" },
];

/* ---------------------------------------------------------------------- */
/*  Best Selling Products                                                 */
/* ---------------------------------------------------------------------- */
interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  mrp: number;
  img: string;
}

const PRODUCTS: Product[] = [
  {
    id: "tomato",
    name: "Tomato",
    weight: "1 kg",
    price: 25.0,
    mrp: 35.0,
    img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "onion",
    name: "Onion",
    weight: "1 kg",
    price: 28.0,
    mrp: 40.0,
    img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "potato",
    name: "Potato",
    weight: "1 kg",
    price: 22.0,
    mrp: 30.0,
    img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80",
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

/* ---------------------------------------------------------------------- */
/*  Countdown Hook                                                        */
/* ---------------------------------------------------------------------- */
function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : initialSeconds));
    }, 1000);
    return () => clearInterval(id);
  }, [initialSeconds]);
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return { h, m, s };
}

export default function App() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Record<string, number>>({
    tomato: 1,
    banana: 1,
    apple: 1,
  });
  const [mobileNav, setMobileNav] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Vegetables");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  const { h, m, s } = useCountdown(2 * 3600 + 45 * 60 + 5);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const addToCart = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      const item = PRODUCTS.find((p) => p.id === id);
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

  const cartCount = (Object.values(cart) as number[]).reduce((a, b) => a + b, 0);
  const cartTotal = (Object.entries(cart) as [string, number][]).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find((prod) => prod.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const fontHead = { fontFamily: "'Poppins', sans-serif" };
  const fontBody = { fontFamily: "'Inter', sans-serif" };

  // Carousel Slides configuration
  const SLIDES = [
    {
      id: 0,
      tagline: "100% FARM FRESH",
      title: "Fresh Vegetables & Fruits",
      accentTitle: "Delivered To Your Home",
      subtext: "Handpicked • Hygienically Packed • On-time Delivery",
      bg: "#EAF5E9",
      image: heroBasket,
      showSeal: true,
    },
    {
      id: 1,
      tagline: "ORGANIC SPECIAL",
      title: "Fresh Leafy Greens & Herbs",
      accentTitle: "Harvested Fresh Daily",
      subtext: "Chemical Free • Nutrient Rich • Direct From Local Farms",
      bg: "#E2EFE0",
      image: slideshow,
      showSeal: true,
    },
    {
      id: 2,
      tagline: "LIMITED STOCK DEALS",
      title: "Premium Exotic Fruits",
      accentTitle: "Save Up To 30% Today",
      subtext: "Kiwi • Strawberries • Dragon Fruit • Avocado",
      bg: "#FAF5EA",
      image: fruits,
      showSeal: true,
    }
  ];

  // Auto transition effect for carousel
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000); // changes slide every 5 seconds
    return () => clearInterval(slideTimer);
  }, [SLIDES.length]);

  return (
    <div className="min-h-screen bg-[#FBFDFB] text-slate-800 flex flex-col" style={fontBody}>
    

      {/* ================= TOAST ================= */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#135029] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in border border-emerald-400/30">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ================= NEW NAVBAR COMPONENT ================= */}
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

    {/* ================= MAIN CONTENT BODY ================= */}
    <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5 space-y-6 flex-1 w-full">
        {/* ================= HERO SECTION & CATEGORY SIDEBAR ================= */}
        <section className="flex flex-col lg:flex-row gap-5 items-stretch relative">
          <aside className="hidden lg:block w-56 shrink-0 rounded-2xl p-2.5 border border-[#E2EFE0] bg-[#F4FAF4] shadow-xs self-stretch flex flex-col justify-between">
            <div className="space-y-0.5">
              {CATEGORIES.map((c) => {
                const isSelected = selectedCategory === c.name;
                return (
                  <button
                    key={c.name}
                  onClick={() => {
  if (c.name === "Fruits") {
    navigate("/fruits");
    return;
  }

  if (c.name === "Leafy Greens") {
    navigate("/leafy-greens");
    return;
  }

  if (c.name === "Herbs & Seasoning") {
    navigate("/herbs-seasoning");
    return;
  }
  if (c.name === "Exotic Vegeables") {
    navigate("/herbs-seasoning");
    return;
  }
  setSelectedCategory(c.name);
  showToast(`Filtered by ${c.name}`);
}}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                      isSelected
                        ? "bg-[#E2F0E0] text-[#135029] shadow-2xs"
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

            <button
              onClick={() => showToast("Viewing full catalog")}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#135029] hover:bg-white transition mt-2 pt-2 border-t border-[#E2EFE0]"
            >
              <Grid3x3 className="w-4 h-4 text-[#2E7D32]" />
              <span>View All Categories</span>
            </button>
          </aside>

          {/* Carousel Slider Container */}
          <div className="flex-1 rounded-2xl overflow-hidden relative border border-[#DCEAD9] shadow-xs">
            <div 
              className="flex transition-transform duration-500 ease-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {SLIDES.map((slide) => (
                <div
                  key={slide.id}
                  className="w-full shrink-0 p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between transition-colors duration-300"
                  style={{ backgroundColor: slide.bg }}
                >
                  <div className="relative z-10 flex-1 max-w-xl text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#CDE5CC] text-[11px] font-bold text-[#1E5F26] mb-4 shadow-2xs">
                      <Leaf className="w-3.5 h-3.5 text-[#228B22]" />
                      <span>{slide.tagline}</span>
                    </div>

                    <h1
                      className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.12] text-[#111827]"
                      style={fontHead}
                    >
                      {slide.title}
                      <br />
                      <span className="text-[#228B22]">{slide.accentTitle}</span>
                    </h1>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      {slide.subtext}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-6">
                      <button
                        id={`hero-shop-now-btn-${slide.id}`}
                        onClick={() => {
                          const el = document.getElementById("best-sellers-heading");
                          el?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg text-white text-xs sm:text-sm font-bold tracking-wide transition hover:brightness-110 active:scale-95 shadow-xs"
                        style={{ backgroundColor: BRAND.forestGreen }}
                      >
                        <span>Shop Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        id={`hero-explore-offers-btn-${slide.id}`}
                        onClick={() => showToast("50% OFF Flash Sale active below!")}
                        className="px-5 py-3 rounded-lg text-xs sm:text-sm font-bold text-slate-800 bg-white border border-[#D2E4D0] hover:bg-[#F4FAF4] transition active:scale-95 shadow-2xs"
                      >
                        Explore Offers
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-5 text-xs text-slate-600 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#228B22]" />
                      <span>Delivery in 30–45 mins</span>
                    </div>
                  </div>

                  <div className="relative z-10 w-full lg:w-[460px] h-64 sm:h-72 lg:h-84 shrink-0 flex items-center justify-center mt-6 lg:mt-0">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-contain rounded-xl select-none"
                      referrerPolicy="no-referrer"
                    />
                    
                    {slide.showSeal && (
                      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-10 w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full p-0.5 shadow-lg flex items-center justify-center select-none hover:scale-105 transition duration-300 z-20">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <defs>
                            <style type="text/css">
                              {`
                                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap');
                                
                                .seal-text-top {
                                  font-family: 'Poppins', sans-serif;
                                  font-weight: 700;
                                  font-size: 8.5px;
                                  fill: #135029;
                                  letter-spacing: 0.08em;
                                }
                                
                                .seal-text-bottom {
                                  font-family: 'Poppins', sans-serif;
                                  font-weight: 800;
                                  font-size: 7.8px;
                                  fill: #135029;
                                  letter-spacing: 0.16em;
                                }
                              `}
                            </style>
                            <path id="curve-freshness" d="M 15 50 A 35 35 0 0 1 85 50" fill="none" />
                            <path id="curve-guarantee" d="M 15 50 A 35 35 0 0 0 85 50" fill="none" />
                          </defs>

                          <circle cx="50" cy="50" r="47" fill="white" stroke="#135029" strokeWidth="1.8" />
                          <circle cx="50" cy="50" r="28" fill="none" stroke="#135029" strokeWidth="1.2" />
                          
                          <circle cx="15" cy="50" r="1.5" fill="#135029" />
                          <circle cx="85" cy="50" r="1.5" fill="#135029" />

                          <text className="seal-text-top" textAnchor="middle">
                            <textPath href="#curve-freshness" startOffset="50%">
                              Freshness
                            </textPath>
                          </text>

                          <text className="seal-text-bottom" textAnchor="middle">
                            <textPath href="#curve-guarantee" startOffset="50%">
                              GUARANTEE
                            </textPath>
                          </text>

                          <g transform="translate(0, -2)">
                            <path 
                              d="M50 64 C44 56, 35 49, 36 38 C43 38, 49 46, 50 64 Z" 
                              fill="#135029" 
                            />
                            <path 
                              d="M50 64 Q43 51 36 38" 
                              stroke="white" 
                              strokeWidth="1.2" 
                              strokeLinecap="round" 
                            />
                            <path 
                              d="M50 64 C56 56, 65 49, 64 38 C57 38, 51 46, 50 64 Z" 
                              fill="#135029" 
                            />
                            <path 
                              d="M50 64 Q57 51 64 38" 
                              stroke="white" 
                              strokeWidth="1.2" 
                              strokeLinecap="round" 
                            />
                          </g>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "bg-[#135029] w-4" : "bg-[#C2DEC1] hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ================= 6 FEATURE VALUE PROPOSITIONS ================= */}
        <section className="bg-white rounded-2xl border border-[#EEF4ED] px-4 sm:px-8 py-5 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`flex items-center gap-3 ${i > 0 ? "lg:pl-5 pt-3 sm:pt-0" : ""}`}
              >
                <div className="w-9 h-9 rounded-full bg-[#EAF6EA] flex items-center justify-center shrink-0 text-[#135029]">
                  <f.icon className="w-4 h-4 text-[#228B22]" />
                </div>
                <div className="leading-tight text-left min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{f.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 3-COLUMN SECTION ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Column 1: FLASH SALE */}
          <div
            className="lg:col-span-3 rounded-2xl p-4 sm:p-5 border border-[#F2E8D5] shadow-xs relative overflow-hidden"
            style={{ backgroundColor: BRAND.creamSale }}
          >
            <div className="grid grid-cols-12 gap-2 items-center h-full w-full">
              <div className="col-span-7 flex flex-col justify-between h-full space-y-4 text-left z-10">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-black tracking-wider text-[#5F6D63]">FLASH</span>
                    <span className="text-[11px] font-black tracking-wider text-[#E03838]">SALE</span>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#F46B16]" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 leading-tight" style={fontHead}>
                    Up to <span className="text-[#135029]">50% OFF</span>
                  </h3>
                  <p className="text-[11px] text-[#5F6D63] font-medium mt-0.5">On Selected Products</p>
                </div>

                <div className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 bg-[#dbecd8] rounded-lg flex items-center justify-center text-[#135029] text-base font-extrabold shadow-2xs">
                      {h}
                    </div>
                    <span className="text-[10px] text-[#5F6D63] font-semibold mt-1">Hours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 bg-[#dbecd8] rounded-lg flex items-center justify-center text-[#135029] text-base font-extrabold shadow-2xs">
                      {m}
                    </div>
                    <span className="text-[10px] text-[#5F6D63] font-semibold mt-1">Mins</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 bg-[#dbecd8] rounded-lg flex items-center justify-center text-[#135029] text-base font-extrabold shadow-2xs">
                      {s}
                    </div>
                    <span className="text-[10px] text-[#5F6D63] font-semibold mt-1">Secs</span>
                  </div>
                </div>

                <button
                  onClick={() => showToast("Loading Flash Sale deals...")}
                  className="w-32 py-2.5 rounded-lg text-white text-xs font-bold transition hover:brightness-110 shadow-xs text-center shrink-0"
                  style={{ backgroundColor: BRAND.forestGreen }}
                >
                  Shop Now
                </button>
              </div>

              <div className="col-span-5 relative h-full flex items-center justify-center min-h-[145px]">
                <div 
                  className="absolute -top-3 -right-2 w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FF4C4C] via-[#E03838] to-[#9B1C1C] rounded-xl flex items-center justify-center transform -rotate-12 select-none z-10 border-t border-white/30 border-l border-white/30"
                  style={{
                    boxShadow: "0 8px 18px rgba(224, 56, 56, 0.45), inset 0 -4px 0 rgba(0,0,0,0.25), inset 0 3px 0 rgba(255,255,255,0.4)"
                  }}
                >
                  <span className="text-white text-lg font-black tracking-tighter" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>%</span>
                </div>
                <img 
                  src={flashsale} 
                  alt="Vibrant Fresh Vegetables" 
                  className="max-h-[200px] w-auto object-contain mix-blend-multiply rounded-xl transform scale-250 -translate-x-15 origin-center transition duration-300"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Best Selling Products */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#EEF4ED] p-4 sm:p-5 flex flex-col justify-between shadow-xs relative">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <h3 id="best-sellers-heading" className="text-base sm:text-lg font-bold text-slate-900" style={fontHead}>
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

            {/* Product Row (horizontal scroll) */}
            <div className="relative">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-1">
                {PRODUCTS.map((p) => {
                  const inCartQty = cart[p.id] || 0;
                  return (
                    <div
                      key={p.id}
                        onClick={() => navigate(`/product/${p.id}`)}
                      className="rounded-2xl p-3 flex flex-col justify-between bg-white hover:shadow-md transition-all duration-200 group border border-[#EEF4ED] shrink-0 w-[150px] sm:w-[170px]"
                    >
                      {/* Product Image Container */}
                      <div className="h-28 w-full overflow-hidden rounded-xl bg-slate-50 mb-2.5">
                        <img
                          src={p.img}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="text-left mb-3 px-0.5">
                        <div className="text-sm font-extrabold text-slate-900 truncate">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">{p.weight}</div>
                      </div>

                      {/* Bottom Row: Prices + Button, one line, all visible */}
                      <div className="flex items-center justify-between gap-1 px-0.5">
                        <div className="flex items-baseline gap-1 min-w-0">
                          <span className="text-sm font-black text-slate-900 leading-none whitespace-nowrap">
                            ₹{p.price.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-slate-400 line-through leading-none whitespace-nowrap">
                            ₹{p.mrp.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center shrink-0">
                          {inCartQty > 0 ? (
                            <div className="flex items-center gap-1.5 bg-[#135029] text-white rounded-lg px-2 py-1 shadow-md h-7">
                              <button
                                onClick={(e) => { e.stopPropagation(); removeFromCart(p.id); }}
                                className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-80 active:scale-90"
                              >
                                <Minus className="w-2.5 h-2.5 text-white stroke-[3px]" />
                              </button>
                              <span className="text-xs font-bold w-3 text-center leading-none">{inCartQty}</span>
                              <button
                                  onClick={(e) => { e.stopPropagation(); addToCart(p.id); }}
                                className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-80 active:scale-90"
                              >
                                <Plus className="w-2.5 h-2.5 text-white stroke-[3px]" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(p.id)}
                              className="w-7 h-7 rounded-lg bg-[#135029] text-white flex items-center justify-center hover:bg-[#1E7D32] transition active:scale-95 shadow-md"
                              aria-label={`Add ${p.name}`}
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

              {/* Right edge scroll arrow */}
              <button
                onClick={(e) => {
                  const scrollContainer = e.currentTarget.previousSibling as HTMLDivElement;
                  scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
                }}
                className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-3 w-8 h-8 rounded-full bg-white border border-[#EEF4ED] shadow-md items-center justify-center hover:bg-slate-50 transition"
                aria-label="Scroll products right"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Column 3: VegGo Plus Membership */}
          <div
            className="lg:col-span-3 rounded-2xl p-5 border border-[#D8EBD7] shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[300px]"
            style={{ backgroundColor: BRAND.lightMintBg }}
          >
            {/* Top Info & Benefits list */}
            <div className="text-left space-y-3 z-10">
              <h3 className="text-lg sm:text-xl font-black text-[#113B1E] leading-tight" style={fontHead}>
                VegGo Plus
                <br />
                Membership
              </h3>

              <ul className="space-y-1.5 text-xs text-[#1E5F26] font-semibold">
                {["Free Delivery", "Exclusive Offers", "Extra Discounts", "Priority Support"].map((perk) => (
                  <li key={perk} className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#135029] text-white text-[8px] font-bold flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Join CTA positioned on the bottom left */}
            <div className="z-10 mt-auto text-left">
              <button
                onClick={() => showToast("🎉 VegGo Plus 30-day Free Trial Activated!")}
                className="px-5 py-2.5 rounded-lg text-white text-xs font-bold transition hover:brightness-110 shadow-xs text-center"
                style={{ backgroundColor: BRAND.forestGreen }}
              >
                Join Now
              </button>
            </div>

            {/* Cooler Bag Image absolute-positioned in the bottom-right corner */}
            <img 
              src={coolerBag} 
              alt="VegGo Cooler Bag with Veggies" 
              className="absolute bottom-22 right-0 h-60 sm:h-72 max-w-full object-contain object-right-bottom mix-blend-multiply pointer-events-none z-0" 
            />
          </div>
        </section>

        {/* ================= BOTTOM PROMO STRIP ================= */}
        <section
          className="rounded-2xl p-5 sm:p-6 text-white relative shadow-md overflow-visible bg-[#0E4823]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center divide-y sm:divide-y-0 lg:divide-x divide-white/10">
            
            {/* Promo 1: Spin & Win */}
            <div className="flex items-center gap-4 text-left">
              <div className="relative w-14 h-14 shrink-0 bg-white/10 rounded-full border border-white/20 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-12 h-12 transform rotate-12 drop-shadow-sm">
                  <path d="M 50 50 L 35 90 L 65 90 Z" fill="#78350f" />
                  <rect x="25" y="86" width="50" height="6" rx="2" fill="#451a03" />
                  
                  <circle cx="50" cy="50" r="38" fill="#14532d" stroke="#facc15" strokeWidth="1.5" />
                  
                  <path d="M 50 50 L 50 14 A 36 36 0 0 1 75.5 24.5 Z" fill="#22c55e" />
                  <path d="M 50 50 L 75.5 24.5 A 36 36 0 0 1 86 50 Z" fill="#166534" />
                  <path d="M 50 50 L 86 50 A 36 36 0 0 1 75.5 75.5 Z" fill="#22c55e" />
                  <path d="M 50 50 L 75.5 75.5 A 36 36 0 0 1 50 86 Z" fill="#166534" />
                  <path d="M 50 50 L 50 86 A 36 36 0 0 1 24.5 75.5 Z" fill="#22c55e" />
                  <path d="M 50 50 L 24.5 75.5 A 36 36 0 0 1 14 50 Z" fill="#166534" />
                  <path d="M 50 50 L 14 50 A 36 36 0 0 1 24.5 24.5 Z" fill="#22c55e" />
                  <path d="M 50 50 L 24.5 24.5 A 36 36 0 0 1 50 14 Z" fill="#166534" />

                  <circle cx="50" cy="50" r="6" fill="#facc15" stroke="#ffffff" strokeWidth="1" />
                  
                  <circle cx="50" cy="14" r="1.5" fill="#facc15" />
                  <circle cx="75.5" cy="24.5" r="1.5" fill="#facc15" />
                  <circle cx="86" cy="50" r="1.5" fill="#facc15" />
                  <circle cx="75.5" cy="75.5" r="1.5" fill="#facc15" />
                  <circle cx="50" cy="86" r="1.5" fill="#facc15" />
                  <circle cx="24.5" cy="75.5" r="1.5" fill="#facc15" />
                  <circle cx="14" cy="50" r="1.5" fill="#facc15" />
                  <circle cx="24.5" cy="24.5" r="1.5" fill="#facc15" />

                  <polygon points="50,11 46,3 54,3" fill="#ef4444" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-white">Spin &amp; Win</div>
                <div className="text-[10px] text-white/70">Win exciting rewards everyday</div>
                <button
                  onClick={() => showToast("Spinning wheel...")}
                  className="px-4 py-1.5 rounded-lg bg-white text-[#135029] text-[11px] font-bold hover:bg-slate-100 transition mt-1.5 shadow-2xs"
                >
                  Spin Now
                </button>
              </div>
            </div>

            {/* Promo 2: Buy Again */}
            <div className="flex items-center gap-4 text-left lg:pl-5">
              <div className="relative w-14 h-14 shrink-0 bg-white/10 rounded-full border border-white/20 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-sm">
                  <path d="M30 45 C30 30 35 25 35 20 C38 25 38 35 38 45 Z" fill="#15803d" />
                  <path d="M42 45 C42 25 48 20 50 15 C52 20 52 30 48 45 Z" fill="#22c55e" />
                  <path d="M60 45 C60 28 65 24 70 20 C70 26 68 35 65 45 Z" fill="#166534" />
                  
                  <path d="M25 45 C25 15 75 15 75 45" stroke="#4ade80" strokeWidth="4" fill="none" strokeLinecap="round" />
                  
                  <path d="M20 45 L25 80 C26 84 30 86 34 86 L66 86 C70 86 74 84 75 80 L80 45 Z" fill="#86efac" />
                  <rect x="16" y="42" width="68" height="6" rx="3" fill="#4ade80" />
                  
                  <rect x="32" y="54" width="6" height="22" rx="3" fill="#22c55e" opacity="0.8" />
                  <rect x="47" y="54" width="6" height="22" rx="3" fill="#22c55e" opacity="0.8" />
                  <rect x="62" y="54" width="6" height="22" rx="3" fill="#22c55e" opacity="0.8" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-white">Buy Again</div>
                <div className="text-[10px] text-white/70">Reorder your favourite items</div>
                <button
                  onClick={() => showToast("Reordering last basket")}
                  className="px-4 py-1.5 rounded-lg bg-white text-[#135029] text-[11px] font-bold hover:bg-slate-100 transition mt-1.5 shadow-2xs"
                >
                  Buy Again
                </button>
              </div>
            </div>

            {/* Promo 3: Smart Recommendations */}
            <div className="flex items-center gap-4 text-left lg:pl-5">
              <div className="relative w-14 h-14 shrink-0 bg-white/10 rounded-full border border-white/20 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-sm">
                  <defs>
                    <linearGradient id="star-green" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#86efac" />
                      <stop offset="100%" stopColor="#166534" />
                    </linearGradient>
                  </defs>
                  <path d="M 50 15 L 59 35 L 81 37 L 64 51 L 69 73 L 50 61 L 31 73 L 36 51 L 19 37 L 41 35 Z" fill="url(#star-green)" />
                  <path d="M 22 25 L 26 35 L 37 36 L 29 43 L 31 53 L 22 47 L 13 53 L 15 43 L 7 36 L 18 35 Z" fill="#86efac" transform="translate(0, 0) scale(0.7)" />
                  <path d="M 25 65 L 29 74 L 40 75 L 30 82 L 32 92 L 25 87 L 18 92 L 20 82 L 10 75 L 21 74 Z" fill="#22c55e" transform="translate(-4, -4) scale(0.85)" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-white">Smart Recommendations</div>
                <div className="text-[10px] text-white/70">Handpicked for you based on your choice</div>
                <button
                  onClick={() => showToast("Loaded AI recommendations")}
                  className="px-4 py-1.5 rounded-lg bg-white text-[#135029] text-[11px] font-bold hover:bg-slate-100 transition mt-1.5 shadow-2xs"
                >
                  Explore
                </button>
              </div>
            </div>

            {/* Promo 4: Today's Offers */}
            <div className="flex items-center gap-4 text-left lg:pl-5">
              <div className="relative w-14 h-14 shrink-0 bg-white/10 rounded-full border border-white/20 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-sm">
                  <path d="M25 25 L75 75" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                  <path d="M75 25 L25 75" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                  
                  <g transform="rotate(-15 50 50)">
                    <rect x="25" y="30" width="50" height="40" rx="8" fill="#facc15" stroke="#ffffff" strokeWidth="2.5" />
                    <circle cx="25" cy="50" r="5" fill="#0E4823" />
                    <circle cx="75" cy="50" r="5" fill="#0E4823" />
                    <text x="50" y="56" fontFamily="sans-serif" fontSize="19" fontWeight="900" fill="#135029" textAnchor="middle">%</text>
                  </g>
                </svg>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-white">Today's Offers</div>
                <div className="text-[10px] text-white/70">Grab the best deals of the day!</div>
                <button
                  onClick={() => showToast("Offers highlighted")}
                  className="px-4 py-1.5 rounded-lg bg-white text-[#135029] text-[11px] font-bold hover:bg-slate-100 transition mt-1.5 shadow-2xs"
                >
                  View Offers
                </button>
              </div>
            </div>
          </div>

          {/* Floating AI Assistant circular widget */}
          <div className="absolute -right-3 -bottom-3 sm:-right-4 sm:-bottom-4 lg:-right-5 lg:-bottom-5 z-30 flex flex-col items-center">
            <div
              onClick={() => setAiModalOpen(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full border-[3.5px] border-[#135029] shadow-xl flex items-center justify-center cursor-pointer hover:scale-105 transition duration-300 select-none relative"
            >
              <svg viewBox="0 0 100 100" className="w-12 h-12">
                <circle cx="50" cy="50" r="38" fill="#ffffff" />
                <rect x="24" y="34" width="52" height="32" rx="16" fill="#e2e8f0" />
                <circle cx="38" cy="50" r="8" fill="#0f172a" />
                <circle cx="38" cy="47" r="2" fill="#ffffff" />
                <circle cx="62" cy="50" r="8" fill="#0f172a" />
                <circle cx="62" cy="47" r="2" fill="#ffffff" />
                <rect x="48" y="16" width="4" height="12" fill="#135029" rx="2" />
                <circle cx="50" cy="15" r="4" fill="#22c55e" />
                <rect x="18" y="42" width="6" height="16" rx="3" fill="#135029" />
                <rect x="76" y="42" width="6" height="16" rx="3" fill="#135029" />
                <path d="M 44 57 Q 50 62 56 57" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <div className="text-[10px] font-black text-slate-900 mt-2 bg-white px-3 py-1 rounded-full shadow-lg border border-slate-100 leading-tight">
              <div className="text-[#135029] text-center font-black">VegGo</div>
              <div className="text-slate-500 text-[8px] font-bold">AI Assistant</div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= COMPREHENSIVE RICH FOOTER ================= */}
      <footer className="mt-16 bg-white border-t border-[#E8F2E6]">
        <div className="border-b border-slate-100 bg-[#F9FCF9] py-8 px-4 lg:px-8">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#135029]">
                <Truck className="w-5 h-5 text-[#228B22]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Express Delivery</h4>
                <p className="text-[11px] text-slate-500">Fresh at your door in 30-45 mins</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#135029]">
                <ShieldCheck className="w-5 h-5 text-[#228B22]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">100% Organic &amp; Pure</h4>
                <p className="text-[11px] text-slate-500">Zero chemical fertilizers used</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#135029]">
                <RotateCcw className="w-5 h-5 text-[#228B22]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Instant Hassle-Free Returns</h4>
                <p className="text-[11px] text-slate-500">No questions asked refund</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#135029]">
                <Award className="w-5 h-5 text-[#228B22]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Direct From Local Farmers</h4>
                <p className="text-[11px] text-slate-500">Fair trade pricing guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto py-12 px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-left">
            <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
              <VegGoLogo className="h-10 w-auto" />
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
                VegGo Fresh brings you farm-harvested vegetables, seasonal fruits, organic greens, and daily dairy essentials harvested at dawn and delivered right to your kitchen.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#228B22]" />
                  <span>Helpline: <strong>+91 1800-425-8344</strong> (Toll Free)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#228B22]" />
                  <span>Email: <strong>support@veggofresh.com</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#228B22]" />
                  <span>Hub: Road No. 12, Kukatpally, Hyderabad, TS 500072</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900" style={fontHead}>
                Popular Categories
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {["Fresh Vegetables", "Exotic & Organic Fruits", "Hydroponic Greens", "Dairy & Farm Eggs", "Millet Grains & Pulses", "Aromatic Herbs & Spices"].map((item) => (
                  <li key={item}>
                    <button onClick={() => showToast(`Filtering ${item}`)} className="hover:text-[#135029] transition">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900" style={fontHead}>
                Company
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {["About VegGo", "Partner With Us (Farmers)", "Become a Delivery Partner", "VegGo Plus Membership", "Quality Assurance Lab", "Careers & Culture"].map((item) => (
                  <li key={item}>
                    <button onClick={() => showToast(item)} className="hover:text-[#135029] transition">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900" style={fontHead}>
                Download Our App
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Enjoy exclusive app-only coupons and live GPS order tracking.
              </p>
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => showToast("Opening App Store link")}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs hover:bg-slate-800 transition"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <div className="text-left">
                    <div className="text-[8px] text-slate-400 leading-tight">GET IT ON</div>
                    <div className="text-[11px] font-bold leading-tight">Google Play &amp; iOS</div>
                  </div>
                </button>
              </div>

              <div className="pt-3">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  100% Secure Payments
                </h5>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <CreditCard className="w-4 h-4 text-slate-600" />
                  <span className="text-[10px] text-slate-500 font-medium">UPI • Cards • NetBanking • COD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 py-6 px-4 lg:px-8 bg-slate-50 text-[11px] text-slate-500">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © {new Date().getFullYear()} <strong>VegGo Fresh Technologies Pvt. Ltd.</strong> All rights reserved.
            </div>
            <div className="flex items-center gap-5">
              <button onClick={() => showToast("Privacy Policy")} className="hover:underline">
                Privacy Policy
              </button>
              <span>•</span>
              <button onClick={() => showToast("Terms of Use")} className="hover:underline">
                Terms of Use
              </button>
              <span>•</span>
              <button onClick={() => showToast("Security & FSSAI Certified")} className="hover:underline">
                FSSAI Certified
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= SLIDE-OVER CART DRAWER ================= */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
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
                  const p = PRODUCTS.find((prod) => prod.id === id);
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
          <div className="flex-1 bg-black/40 backdrop-blur-xs" onClick={() => setCartOpen(false)} />
        </div>
      )}

      {/* ================= AI RECIPE MODAL ================= */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#D5EAD3] overflow-hidden flex flex-col animate-fade-in">
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
                👋 Hello Shiva! What would you like to cook today with our fresh farm arrivals?
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Fresh Tomato Soup Recipe", "How to keep Greens fresh", "Healthy 15-min Salads"].map((q) => (
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
          <div className="fixed inset-0 bg-black/40 -z-10" onClick={() => setAiModalOpen(false)} />
        </div>
      )}

      {/* ================= MOBILE NAVIGATION DRAWER ================= */}
      {mobileNav && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col text-left">
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
  if (c.name === "Fruits") {
    setMobileNav(false);
    navigate("/fruits");
    return;
  }

  if (c.name === "Leafy Greens") {
    setMobileNav(false);
    navigate("/leafy-greens");
    return;
  }
 if (c.name === "Herbs & Seasoning") { 
    setMobileNav(false); 
    navigate("/herbs-seasoning"); 
    return; 
  } 
  setSelectedCategory(c.name);
  setMobileNav(false);
  showToast(`Selected ${c.name}`);
}}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    selectedCategory === c.name ? "bg-[#EAF6EA] text-[#135029]" : "text-slate-700"
                  }`}
                >
                  <c.icon className="w-4 h-4 text-[#2E7D32]" />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileNav(false)} />
        </div>
      )}
    </div>
  );
}