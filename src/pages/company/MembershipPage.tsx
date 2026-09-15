import { Check, Sparkles } from "lucide-react";

export default function MembershipPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-center">
      <div className="space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF6EA] text-[#135029] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#228B22]" /> Exclusive Privilege Club
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          VegGo Plus Membership
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Save more than ₹6,500 every year with free deliveries, exclusive discounts, and farm-fresh guarantees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
        <div className="bg-white border border-[#EEF4ED] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Quarterly Plan</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">₹199 <span className="text-sm font-normal text-slate-500">/ 3 months</span></div>
          </div>
          <ul className="space-y-3 text-xs text-slate-600">
            {["Unlimited Free Deliveries on ₹149+", "5% Extra Cashback in VegGo Wallet", "Priority 25-Min Slot Booking"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#228B22]" /> {t}
              </li>
            ))}
          </ul>
          <button className="w-full py-2.5 rounded-xl border border-[#135029] text-[#135029] font-bold text-xs hover:bg-[#EAF6EA] transition">
            Choose 3 Months
          </button>
        </div>

        <div className="bg-[#135029] text-white rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-lg">
          <div className="absolute top-4 right-4 bg-[#228B22] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Most Popular
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">Annual VIP Pass</span>
            <div className="text-3xl font-extrabold mt-1">₹499 <span className="text-sm font-normal text-emerald-200">/ 1 year</span></div>
          </div>
          <ul className="space-y-3 text-xs text-emerald-100">
            {["Zero Minimum Order Value Free Delivery", "10% Extra Discount on Fresh Organic Range", "Dedicated VIP WhatsApp Concierge", "Free Surprise Exotic Fruit Box Every Month"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-300" /> {t}
              </li>
            ))}
          </ul>
          <button className="w-full py-2.5 rounded-xl bg-white text-[#135029] font-bold text-xs hover:bg-slate-100 transition shadow-sm">
            Join VegGo Plus (1 Year)
          </button>
        </div>
      </div>
    </div>
  );
}