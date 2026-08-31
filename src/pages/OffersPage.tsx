import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { VegGoLogo } from "../components/Logo";
import { useToast } from "../context/ToastContext";
import membershipImg from "../assets/images/membership.png";

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

const OFFER_CARDS: OfferCard[] = [
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
    },
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
    },
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
    },
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
    },
  },
];

const TABS = [
  { id: "all", label: "All Offers" },
  { id: "veggoplus", label: "VegGo Plus" },
  { id: "bank", label: "Bank Offers" },
  { id: "combo", label: "Combo Offers" },
];

export default function OffersPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("all");

  const filteredOffers = activeTab === "all" ? OFFER_CARDS : OFFER_CARDS.filter((card) => card.category === activeTab);

  return (
    <main className="max-w-[1400px] mx-auto w-full px-4 lg:px-8 py-8 space-y-8">
      {/* ================= HERO PROMO BANNER ================= */}
      <section className="bg-gradient-to-r from-[#E6F3E6] to-[#F1F9F1] rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between border border-[#DCEAD9] overflow-hidden shadow-xs relative">
        <div className="space-y-4 text-center md:text-left z-10">
          <div className="flex justify-center md:justify-start">
            <VegGoLogo className="h-10 md:h-12 w-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#113B1E] leading-tight">Amazing Offers</h1>
          <p className="text-sm md:text-base text-[#4A7C54] font-semibold">On Your Favourite Products!</p>
        </div>

        <div className="mt-6 md:mt-0 w-64 md:w-80 h-auto shrink-0 flex items-center justify-center">
          <img src={membershipImg} alt="VegGo Membership Banner" className="w-full h-auto object-contain max-h-44 md:max-h-52" loading="lazy" />
        </div>
      </section>

      {/* ================= TAB FILTERS ================= */}
      <section className="flex flex-wrap items-center gap-2 pb-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wide transition ${
                isActive ? "bg-[#135029] text-white shadow-xs" : "bg-white border border-[#EAF0EA] text-slate-600 hover:bg-slate-50"
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
              <span className={`text-[10px] font-extrabold tracking-wider block mb-4 ${card.theme.headerText}`}>{card.typeLabel}</span>
              <h3 className="text-2xl font-black text-slate-800 leading-tight">{card.title}</h3>
              <p className="text-xs text-slate-500 font-semibold mt-1">{card.sub}</p>
            </div>

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

            <div className="space-y-1 pt-4 border-t border-dashed border-slate-200">
              <span className="text-[11px] font-bold text-slate-700 block">{card.minOrderLabel}</span>
              <span className="text-[10px] text-slate-400 font-semibold block">{card.validityLabel}</span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
