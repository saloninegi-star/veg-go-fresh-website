import React, { useState } from "react";
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
  Bot,
  Plus,
  Minus,
  Trash2,
  Check,
  Instagram,
  Facebook,
  Twitter,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Tag,
  ArrowRight,
} from "lucide-react";
import { PRODUCT_CATALOG } from "./ProductDetailPage";

/* ---------------------------------------------------------------------- */
/*  Brand palette tokens (same as rest of the app)                        */
/* ---------------------------------------------------------------------- */
const BRAND = {
  forestGreen: "#135029",
  leafGreen: "#228B22",
};

/* ---------------------------------------------------------------------- */
/*  VegGo Logo (identical everywhere)                                     */
/* ---------------------------------------------------------------------- */
export function VegGoLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center select-none cursor-pointer ${className}`}>
      <svg viewBox="0 0 180 90" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style type="text/css">
            {`
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&display=swap');
              .logo-text-veggo { font-family: 'Poppins', -apple-system, sans-serif; font-size: 48px; font-weight: 900; letter-spacing: -2px; }
              .logo-text-fresh { font-family: 'Poppins', -apple-system, sans-serif; font-size: 11.5px; font-weight: 800; letter-spacing: 0.28em; }
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

/* ---------------------------------------------------------------------- */
/*  Demo cart contents — replace with real shared cart state / context    */
/*  when you wire this up to the rest of the app.                        */
/* ---------------------------------------------------------------------- */
const DEFAULT_CART: Record<string, number> = {
  tomato: 1,
  potato: 1,
  onion: 1,
};

const DELIVERY_CHARGE = 20.0;
const PACKAGING_CHARGE = 10.0;
const FREE_DELIVERY_THRESHOLD = 299;

export default function CartPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState<Record<string, number>>(DEFAULT_CART);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fontHead = { fontFamily: "'Poppins', sans-serif" };
  const fontBody = { fontFamily: "'Inter', sans-serif" };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const cartEntries = Object.entries(cart).filter(([id]) => PRODUCT_CATALOG[id]);
  const cartCount = cartEntries.reduce((a, [, q]) => a + q, 0);

  const subtotal = cartEntries.reduce((sum, [id, q]) => {
    const p = PRODUCT_CATALOG[id];
    return sum + (p ? p.price * q : 0);
  }, 0);
  const mrpTotal = cartEntries.reduce((sum, [id, q]) => {
    const p = PRODUCT_CATALOG[id];
    return sum + (p ? p.mrp * q : 0);
  }, 0);
  const savings = Math.max(0, mrpTotal - subtotal);
  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_CHARGE;
  const packagingCharge = cartEntries.length > 0 ? PACKAGING_CHARGE : 0;
  const totalAmount = subtotal + deliveryCharge + packagingCharge;
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const increaseQty = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decreaseQty = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  };

  const removeItem = (id: string) => {
    const name = PRODUCT_CATALOG[id]?.name || "Item";
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    showToast(`${name} removed from cart`);
  };

  return (
    <div className="min-h-screen bg-[#FBFDFB] text-slate-800 flex flex-col" style={fontBody}>
      {/* ================= TOAST ================= */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#135029] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-emerald-400/30 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

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
          <button onClick={() => showToast("Seller portal")} className="hover:underline">Become a Seller</button>
          <span className="text-[#C2DEC1]">|</span>
          <button onClick={() => showToast("Offers active")} className="hover:underline">Offers</button>
          <span className="text-[#C2DEC1]">|</span>
          <button onClick={() => showToast("Support")} className="hover:underline">Help &amp; Support</button>
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
          <button onClick={() => setMobileNav(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-emerald-50 text-slate-700" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center cursor-pointer shrink-0" onClick={() => navigate("/")}>
            <VegGoLogo className="h-10 md:h-12 w-auto" />
          </div>

          <button
            onClick={() => showToast("All categories menu clicked")}
            className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-xs font-bold tracking-wide shrink-0 transition hover:brightness-105"
            style={{ backgroundColor: BRAND.forestGreen }}
          >
            <Menu className="w-4 h-4" />
            <span>All Categories</span>
          </button>

          <div className="flex-1 max-w-xl hidden sm:flex items-center border border-[#DCE8DA] rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#228B22]/30 transition">
            <input
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
              onClick={() => setAiModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F0F8EE] border border-[#D5EAD3] cursor-pointer hover:bg-[#E5F3E3] transition"
            >
              <div className="w-7 h-7 rounded-full bg-[#135029] flex items-center justify-center text-emerald-200">
                <Bot className="w-4 h-4" />
              </div>
              <div className="leading-tight text-left hidden sm:block">
                <div className="text-[11px] font-bold text-[#113B1E]">VegGo</div>
                <div className="text-[9px] text-[#4A7C54] font-medium">AI Assistant</div>
              </div>
            </div>

            <div onClick={() => showToast("Account: Shiva")} className="hidden md:flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
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

            <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition select-none">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-[#135029]" />
                <span
                  className="absolute -top-2 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center text-white font-extrabold shadow-2xs"
                  style={{ backgroundColor: BRAND.forestGreen }}
                >
                  {cartCount}
                </span>
              </div>
              <div className="leading-tight text-left hidden sm:block">
                <div className="text-[10px] text-slate-500 font-medium">Cart</div>
                <div className="text-xs font-bold text-[#111827]">₹{totalAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 flex-1 w-full">
        <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-5" style={fontHead}>
          My Cart <span className="text-slate-400 font-semibold text-sm">({cartCount} items)</span>
        </h1>

        {cartEntries.length === 0 ? (
          /* ===== EMPTY CART STATE ===== */
          <div className="bg-white rounded-2xl border border-[#EEF4ED] p-12 flex flex-col items-center justify-center text-center gap-3">
            <ShoppingCart className="w-14 h-14 text-[#C9DCC6]" />
            <h2 className="text-sm font-bold text-slate-800">Your cart is empty</h2>
            <p className="text-xs text-slate-500 max-w-xs">Looks like you haven't added anything yet. Start shopping for fresh produce!</p>
            <button
              onClick={() => navigate("/")}
              className="mt-2 px-6 py-2.5 rounded-lg text-white text-xs font-bold"
              style={{ backgroundColor: BRAND.forestGreen }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
            {/* ===== LEFT: CART ITEMS LIST ===== */}
            <div className="bg-white rounded-2xl border border-[#EEF4ED] shadow-2xs divide-y divide-slate-100">
              {cartEntries.map(([id, qty]) => {
                const p = PRODUCT_CATALOG[id];
                if (!p) return null;
                return (
                  <div key={id} className="flex items-center gap-4 p-4 sm:p-5">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-50 shrink-0"
                      referrerPolicy="no-referrer"
                      onClick={() => navigate(`/product/${p.id}`)}
                    />

                    <div className="flex-1 min-w-0">
                      <button
                        onClick={() => navigate(`/product/${p.id}`)}
                        className="text-sm font-bold text-slate-900 truncate text-left hover:text-[#135029] transition block"
                      >
                        {p.name}
                      </button>
                      <div className="text-[11px] text-slate-400 mt-0.5">{p.weight}</div>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-3 mt-2.5 bg-[#F4FAF4] border border-[#DCEAD9] rounded-lg px-2.5 py-1.5 w-fit">
                        <button onClick={() => decreaseQty(id)} className="hover:opacity-70" aria-label="Decrease quantity">
                          <Minus className="w-3.5 h-3.5 text-[#135029]" strokeWidth={3} />
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-slate-900">{qty}</span>
                        <button onClick={() => increaseQty(id)} className="hover:opacity-70" aria-label="Increase quantity">
                          <Plus className="w-3.5 h-3.5 text-[#135029]" strokeWidth={3} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-sm font-black text-slate-900">₹{(p.price * qty).toFixed(2)}</span>
                      <button
                        onClick={() => removeItem(id)}
                        className="text-slate-300 hover:text-[#E03838] transition"
                        aria-label={`Remove ${p.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ===== RIGHT: PRICE DETAILS + CONTINUE SHOPPING ===== */}
            <div className="space-y-4 lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border border-[#EEF4ED] shadow-2xs p-5">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4" style={fontHead}>
                  Price Details
                </h3>

                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-semibold text-slate-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    {deliveryCharge === 0 ? (
                      <span className="font-semibold text-[#228B22]">FREE</span>
                    ) : (
                      <span className="font-semibold text-slate-900">₹{deliveryCharge.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span>Packaging Charges</span>
                    <span className="font-semibold text-slate-900">₹{packagingCharge.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-[#228B22] font-semibold pt-1">
                      <span>You save</span>
                      <span>₹{savings.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-baseline pt-4 mt-4 border-t border-slate-100">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Total Amount</div>
                    <div className="text-[10px] text-slate-400">(Incl. of all taxes)</div>
                  </div>
                  <span className="text-lg font-black text-[#135029]">₹{totalAmount.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => showToast("🎉 Order placed! Fast delivery dispatched.")}
                  className="w-full mt-4 py-3 rounded-lg text-white text-xs sm:text-sm font-bold tracking-wide shadow-xs transition hover:brightness-105 flex items-center justify-center gap-2"
                  style={{ backgroundColor: BRAND.forestGreen }}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {amountToFreeDelivery > 0 ? (
                  <div className="flex items-start gap-1.5 mt-3 text-[10px] text-[#B8860B] font-medium">
                    <Tag className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Add items worth ₹{amountToFreeDelivery.toFixed(0)} more to get FREE delivery!</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-1.5 mt-3 text-[10px] text-[#228B22] font-medium">
                    <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" strokeWidth={3} />
                    <span>You've unlocked FREE delivery on this order!</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate("/")}
                className="w-full py-3 rounded-lg bg-white border border-[#D2E4D0] text-slate-800 text-xs sm:text-sm font-bold hover:bg-[#F4FAF4] transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {/* ===== TRUST BADGES ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8">
          {[
            { icon: Leaf, label: "Farm Fresh", sub: "Handpicked Daily" },
            { icon: ShieldCheck, label: "No Chemicals", sub: "Pure & Healthy" },
            { icon: Truck, label: "30–45 min Delivery", sub: "Fast & Reliable" },
            { icon: CreditCard, label: "Secure Payments", sub: "100% Safe" },
            { icon: RotateCcw, label: "Easy Returns", sub: "Hassle Free" },
          ].map((f) => (
            <div key={f.label} className="flex flex-col items-center text-center gap-1.5 bg-white rounded-2xl border border-[#EEF4ED] p-4">
              <div className="w-9 h-9 rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#135029]">
                <f.icon className="w-4 h-4 text-[#228B22]" />
              </div>
              <div className="text-[11px] font-bold text-slate-900">{f.label}</div>
              <div className="text-[10px] text-slate-400">{f.sub}</div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= AI MODAL ================= */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#D5EAD3] overflow-hidden flex flex-col z-50">
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
                👋 Hello Shiva! Need help picking a recipe for what's in your cart?
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setAiModalOpen(false)} />
        </div>
      )}

      {/* ================= MOBILE NAV ================= */}
      {mobileNav && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col text-left relative z-50">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <VegGoLogo className="h-9 w-auto" />
              <button onClick={() => setMobileNav(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <button onClick={() => { setMobileNav(false); navigate("/"); }} className="text-xs font-bold text-[#135029] text-left py-2">
              Back to Home
            </button>
          </div>
          <div className="flex-1 bg-black/40 fixed inset-0 z-40" onClick={() => setMobileNav(false)} />
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
        `}
      </style>
    </div>
  );
}
