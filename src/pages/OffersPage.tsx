import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar, { VegGoLogo } from "../components/Navbar"; // 1. VegGoLogo इम्पोर्ट किया गया है
import {
  Tag,
  Sparkles,
  Droplet,
  Truck,
  ShieldCheck,
  RotateCcw,
  Clock,
  ArrowRight
} from "lucide-react";

// 2. assets फ़ोल्डर से membership.png इमेज को इम्पोर्ट किया गया है
import membershipImg from "../assets/images/membership.png";

// कूपन कार्ड के लिए डेटा टाइप
interface OfferCard {
  id: string;
  category: "veggoplus" | "bank" | "combo";
  typeLabel: string;
  title: string;
  sub: string;
  code?: string;
  buttonText?: string;
  minOrderLabel: string;
  validityLabel: string;
  theme: {
    bg: string;
    border: string;
    headerText: string;
    badgeBg?: string;
    badgeBorder?: string;
    badgeText?: string;
  };
}

export default function OffersPage() {
  const navigate = useNavigate();

  // Navbar के स्टेट्स
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [cartCount] = useState<number>(3);
  const [cartTotal, setCartTotal] = useState<number>(95.0);

  // एक्टिव टैब स्टेट (all, veggoplus, bank, combo)
  const [activeTab, setActiveTab] = useState<string>("all");

  const showToast = (msg: string): void => {
    console.log("Toast:", msg);
  };

  // कूपन कार्ड्स का डेटा
  const offerCards: OfferCard[] = [
    {
      id: "first-order",
      category: "veggoplus",
      typeLabel: "FIRST ORDER OFFER",
      title: "Flat 20% OFF",
      sub: "on your first order",
      code: "FIRST20",
      minOrderLabel: "Min order ₹299",
      validityLabel: "Valid till 31 Dec 2026",
      theme: {
        bg: "bg-[#FFF9F6]",
        border: "border-[#FFDDD1]",
        headerText: "text-[#E0533C]",
        badgeBg: "bg-[#FFF0EB]",
        badgeBorder: "border-[#FFC7B5]",
        badgeText: "text-[#D1452F]",
      }
    },
    {
      id: "veggo-plus",
      category: "veggoplus",
      typeLabel: "VEGGO PLUS",
      title: "Extra 10% OFF",
      sub: "for VegGo Plus Members",
      code: "PLUS10",
      minOrderLabel: "Min order ₹499",
      validityLabel: "Valid till 31 Dec 2026",
      theme: {
        bg: "bg-[#F7FCF7]",
        border: "border-[#DCEAD9]",
        headerText: "text-[#1E5F26]",
        badgeBg: "bg-[#EEF7EE]",
        badgeBorder: "border-[#C9DEC6]",
        badgeText: "text-[#135029]",
      }
    },
    {
      id: "bank-offer",
      category: "bank",
      typeLabel: "BANK OFFER",
      title: "Flat ₹100 OFF",
      sub: "on orders above ₹999",
      code: "BANK100",
      minOrderLabel: "Valid on select cards",
      validityLabel: "Valid till 31 Dec 2026",
      theme: {
        bg: "bg-[#FAF7FD]",
        border: "border-[#ECE3F9]",
        headerText: "text-[#7C3AED]",
        badgeBg: "bg-[#F5F0FF]",
        badgeBorder: "border-[#E1D4FA]",
        badgeText: "text-[#6D28D9]",
      }
    },
    {
      id: "combo-offer",
      category: "combo",
      typeLabel: "COMBO OFFER",
      title: "Combo Savings",
      sub: "Save more with combos",
      buttonText: "EXPLORE NOW",
      minOrderLabel: "Great deals on combos",
      validityLabel: "Valid till 31 Dec 2026",
      theme: {
        bg: "bg-[#F4FAF9]",
        border: "border-[#D8EFEB]",
        headerText: "text-[#0D9488]",
      }
    }
  ];

  // सिलेक्टेड टैब के आधार पर ऑफर्स फ़िल्टर करें
  const filteredOffers = activeTab === "all" 
    ? offerCards 
    : offerCards.filter(card => card.category === activeTab);

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-800 flex flex-col font-sans">
      
      {/* Navbar */}
      <Navbar
        setMobileNav={setMobileNav}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setAiModalOpen={setAiModalOpen}
        setCartOpen={() => navigate("/cart")}
        cartCount={cartCount}
        cartTotal={cartTotal}
        showToast={showToast}
      />

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 lg:px-8 py-8 space-y-8">
        
        {/* ================= HERO PROMO BANNER ================= */}
        <section className="bg-gradient-to-r from-[#E6F3E6] to-[#F1F9F1] rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between border border-[#DCEAD9] overflow-hidden shadow-xs relative">
          <div className="space-y-4 text-center md:text-left z-10">
            {/* हेडिंग के ठीक ऊपर इम्पोर्टेड VegGoLogo लगाया गया है */}
            <div className="flex justify-center md:justify-start">
              <VegGoLogo className="h-10 md:h-12 w-auto" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-[#113B1E] leading-tight">
              Amazing Offers
            </h1>
            <p className="text-sm md:text-base text-[#4A7C54] font-semibold">
              On Your Favourite Products!
            </p>
          </div>

          {/* नए membership.png इमेज का रिस्पॉन्सिव बॉक्स */}
          <div className="mt-6 md:mt-0 w-64 md:w-80 h-auto shrink-0 flex items-center justify-center">
            <img
              src={membershipImg}
              alt="VegGo Membership Banner"
              className="w-full h-auto object-contain max-h-44 md:max-h-52"
            />
          </div>
        </section>

        {/* ================= TAB FILTERS ================= */}
        <section className="flex flex-wrap items-center gap-2 pb-2">
          {[
            { id: "all", label: "All Offers" },
            { id: "veggoplus", label: "VegGo Plus" },
            { id: "bank", label: "Bank Offers" },
            { id: "combo", label: "Combo Offers" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wide transition ${
                  isActive
                    ? "bg-[#135029] text-white shadow-xs"
                    : "bg-white border border-[#EAF0EA] text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </section>

        {/* ================= OFFERS GRID ================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOffers.map((card) => (
            <div
              key={card.id}
              className={`border rounded-3xl p-6 flex flex-col justify-between text-center transition shadow-[0_2px_14px_rgba(0,0,0,0.01)] ${card.theme.bg} ${card.theme.border}`}
            >
              <div>
                {/* Header Tag */}
                <span className={`text-[10px] font-extrabold tracking-wider block mb-4 ${card.theme.headerText}`}>
                  {card.typeLabel}
                </span>

                {/* Offer Title */}
                <h3 className="text-2xl font-black text-slate-800 leading-tight">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  {card.sub}
                </p>
              </div>

              {/* Diagonal Stamp Sticker or Button */}
              <div className="my-6 flex justify-center">
                {card.code ? (
                  <div
                    className={`transform -rotate-6 border-2 border-dashed px-5 py-2 rounded-xl font-black text-sm uppercase tracking-widest flex flex-col items-center justify-center ${card.theme.badgeBg} ${card.theme.badgeBorder} ${card.theme.badgeText}`}
                  >
                    <span className="text-[7px] font-extrabold text-slate-400 tracking-wider mb-0.5">USE CODE</span>
                    <span>{card.code}</span>
                  </div>
                ) : (
                  card.buttonText && (
                    <button
                      onClick={() => showToast("Redirecting to Combo collection")}
                      className="border-2 border-[#135029] text-[#135029] font-black text-xs px-5 py-2.5 rounded-xl bg-white hover:bg-[#F0F8EE] transition flex items-center gap-1.5"
                    >
                      <span>{card.buttonText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )
                )}
              </div>

              {/* Footer Details */}
              <div className="space-y-1 pt-4 border-t border-dashed border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 block">
                  {card.minOrderLabel}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold block">
                  {card.validityLabel}
                </span>
              </div>
            </div>
          ))}
        </section>

      </main>

      {/* ================= TRUST BADGES ================= */}
      <footer className="bg-white border-t border-[#EEF4ED] py-6 mt-12">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left">
          
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Farm Fresh</h4>
              <p className="text-[10px] text-slate-500 font-medium">Handpicked Daily</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0">
              <Droplet className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">No Chemicals</h4>
              <p className="text-[10px] text-slate-500 font-medium">Pure &amp; Healthy</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">30-45 mins Delivery</h4>
              <p className="text-[10px] text-slate-500 font-medium">Fast &amp; Reliable</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Secure Payments</h4>
              <p className="text-[10px] text-slate-500 font-medium">100% Safe</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 col-span-2 md:col-span-1">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0 mx-auto md:mx-0">
              <RotateCcw className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Easy Returns</h4>
              <p className="text-[10px] text-slate-500 font-medium">Hassle Free</p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}