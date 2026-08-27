import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate इम्पोर्टेड है
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
  Leaf,
  Bot,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

const BRAND = {
  forestGreen: "#135029",
};

/* ---------------------------------------------------------------------- */
/*  VegGo Vector Logo Component                                           */
/* ---------------------------------------------------------------------- */
export function VegGoLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center select-none cursor-pointer ${className}`}>
      <svg viewBox="0 0 180 90" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style type="text/css">
            {`
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&display=swap');
              .logo-text-veggo {
                font-family: 'Poppins', -apple-system, sans-serif;
                font-size: 48px;
                font-weight: 900;
                letter-spacing: -2px;
              }
              .logo-text-fresh {
                font-family: 'Poppins', -apple-system, sans-serif;
                font-size: 11.5px;
                font-weight: 800;
                letter-spacing: 0.28em;
              }
            `}
          </style>
        </defs>
        {/* Leaf Sprout */}
        <g transform="translate(80, 2)">
          <path d="M17 38 C17 29 15 21 10 13" stroke="#128238" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M17 38 C18 28 22 20 30 13" stroke="#128238" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M17 34 C11 31 5 25 4 16 C4 11 5 8 6 6 C14 9 19 15 20 23 C20 28 19 32 17 34 Z" fill="#4BAF3D" />
          <path d="M17 32 C13 23 9 16 6 8.5" stroke="#E8F5E5" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
          <path d="M18 34 C21 24 28 13 41 5 C42 4 43 4 44 4 C42 16 38 27 30 32 C25 34 21 35 18 34 Z" fill="#3F9F36" />
          <path d="M20 32 C26 23 34 14 41.5 6" stroke="#E8F5E5" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
        </g>
        {/* Brand Name Text */}
        <text x="98" y="68" className="logo-text-veggo" textAnchor="end" fill="#128238">Veg</text>
        <text x="98" y="68" className="logo-text-veggo" textAnchor="start" fill="#F46B16">Go</text>
        <text x="98" y="81" className="logo-text-fresh" textAnchor="start" fill="#128238">FRESH</text>
      </svg>
    </div>
  );
}

interface NavbarProps {
  setMobileNav: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  setAiModalOpen: (val: boolean) => void;
  setCartOpen?: (val: boolean) => void; // इसे वैकल्पिक (optional) रखा गया है क्योंकि अब हम कार्ट पेज पर नेविगेट कर रहे हैं
  cartCount: number;
  cartTotal: number;
  showToast: (msg: string) => void;
}

export default function Navbar({
  setMobileNav,
  searchQuery,
  setSearchQuery,
  setAiModalOpen,
  setCartOpen,
  cartCount,
  cartTotal,
  showToast,
}: NavbarProps) {
  const navigate = useNavigate(); // navigate हुक

  return (
    <>
      {/* ================= TOP UTILITY BAR ================= */}
      <div className="bg-[#EAF6EA] text-[#1E5F26] border-b border-[#D8EBD7] px-4 lg:px-10 py-1.5 text-xs hidden md:flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-medium">
          <Leaf className="w-3.5 h-3.5 text-[#228B22]" />
          <span>Eat Fresh, Live Healthy</span>
        </div>

        <div className="flex items-center gap-1 cursor-pointer hover:opacity-90 transition">
          <MapPin className="w-3.5 h-3.5 text-[#228B22]" />
          <span>Delivering to: <strong className="font-semibold text-[#113B1E]">Kukatpally, Hyderabad</strong></span>
          <ChevronDown className="w-3 h-3 text-slate-500 ml-0.5" />
        </div>

        <div className="flex items-center gap-4 text-[11px] font-medium text-[#1E5F26]">
          <button onClick={() => showToast("Become a Seller portal")} className="hover:underline">
            Become a Seller
          </button>
          <span className="text-[#C2DEC1]">|</span>
          <button onClick={() => navigate("/offers")} className="hover:underline">
  Offers
</button>
          <span className="text-[#C2DEC1]">|</span>
          <button onClick={() => showToast("Support")} className="hover:underline">
            Help &amp; Support
          </button>
          <div className="flex items-center gap-2.5 ml-2 pl-3 border-l border-[#C2DEC1]">
            <Instagram className="w-3.5 h-3.5 cursor-pointer hover:text-black transition" />
            <Facebook className="w-3.5 h-3.5 cursor-pointer hover:text-black transition" />
            <Twitter className="w-3.5 h-3.5 cursor-pointer hover:text-black transition" />
          </div>
        </div>
      </div>

      {/* ================= MAIN HEADER NAVBAR ================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#EEF4ED] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
          <button
            onClick={() => setMobileNav(true)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-emerald-50 text-slate-700"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* लोगो पर क्लिक करने पर होम पेज (/) पर जाएँगे */}
          <div className="flex items-center cursor-pointer shrink-0" onClick={() => navigate("/")}>
            <VegGoLogo className="h-10 md:h-12 w-auto" />
          </div>

          <button
            id="header-all-categories"
            onClick={() => showToast("All categories menu clicked")}
            className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-xs font-bold tracking-wide shrink-0 transition hover:brightness-105 active:scale-98 shadow-2xs"
            style={{ backgroundColor: BRAND.forestGreen }}
          >
            <Menu className="w-4 h-4" />
            <span>All Categories</span>
          </button>

          <div className="flex-1 max-w-xl hidden sm:flex items-center border border-[#DCE8DA] rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#228B22]/30 transition">
            <input
              id="header-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for vegetables, fruits and more..."
              className="flex-1 px-4 py-2 text-xs md:text-sm outline-none text-slate-700 placeholder:text-slate-400 min-w-0"
            />
            <div className="flex items-center gap-1 px-3 border-l border-[#DCE8DA] text-xs text-slate-500 bg-slate-50/50 cursor-pointer">
              <span>All</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
            <button
              onClick={() => showToast(`Searching for "${searchQuery || "fresh produce"}"`)}
              className="px-3.5 py-2.5 text-white transition hover:brightness-105"
              style={{ backgroundColor: BRAND.forestGreen }}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div
              id="header-ai-assistant"
              onClick={() => setAiModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F0F8EE] border border-[#D5EAD3] cursor-pointer hover:bg-[#E5F3E3] transition shadow-2xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#135029] flex items-center justify-center text-emerald-200">
                <Bot className="w-4 h-4" />
              </div>
              <div className="leading-tight text-left hidden sm:block">
                <div className="text-[11px] font-bold text-[#113B1E]">VegGo</div>
                <div className="text-[9px] text-[#4A7C54] font-medium">AI Assistant</div>
              </div>
            </div>

            {/* "My Account" बटन पर क्लिक करने पर सीधे '/account' पर नेविगेट करेगा */}
            <div
              id="header-my-account"
              onClick={() => navigate("/account")}
              className="hidden md:flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
            >
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 bg-slate-50">
                <User className="w-4 h-4" />
              </div>
              <div className="leading-tight text-left">
                <div className="text-[10px] text-slate-500 font-medium">My Account</div>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-0.5">
                  <span>Hello, Shiva</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
              </div>
            </div>

            {/* कार्ट बटन पर क्लिक करने पर '/cart' पर नेविगेट करेगा */}
            <div
              id="header-cart-btn"
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition select-none"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-[#111827]" />
                <span
                  className="absolute -top-2 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center text-white font-extrabold shadow-2xs"
                  style={{ backgroundColor: BRAND.forestGreen }}
                >
                  {cartCount}
                </span>
              </div>
              <div className="leading-tight text-left hidden sm:block">
                <div className="text-[10px] text-slate-500 font-medium">Cart</div>
                <div className="text-xs font-bold text-[#111827]">₹{cartTotal.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}