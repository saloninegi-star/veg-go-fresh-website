import { Sprout, CheckCircle2, ArrowRight } from "lucide-react";

export default function FarmerPartnerPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-[#EAF6EA] border border-[#D5EAD3] rounded-3xl p-8 sm:p-12 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#135029] text-xs font-semibold shadow-xs mb-3">
          <Sprout className="w-3.5 h-3.5 text-[#228B22]" /> Kisan Samriddhi Initiative
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#113B1E]">
          Partner With VegGo Fresh As A Grower
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Sell directly at fair mandi prices without middlemen cuts. Get digital spot weighments and 48-hour direct bank payouts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Why Farmers Trust VegGo?</h2>
          <div className="space-y-4">
            {[
              "Zero Commission: 100% transparent weighing and grading at collection centers.",
              "Guaranteed Buyback: Advance seasonal procurement agreements for organic produce.",
              "Agri-Tech Guidance: Soil health diagnostics and pesticide-free advisory support.",
              "Prompt Payouts: UPI / Direct Bank Transfer within 48 hours of lot collection.",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#228B22] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#EEF4ED] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Farmer Registration Form</h3>
          <p className="text-xs text-slate-500 mb-5">Our local procurement officer will visit your farm within 24 hours.</p>
          <form className="space-y-3.5" onSubmit={(e) => { e.preventDefault(); alert("Application submitted! Our team will contact you."); }}>
            <input type="text" required placeholder="Full Name (किसान का नाम)" className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#228B22]" />
            <input type="tel" required placeholder="Mobile Number" className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#228B22]" />
            <input type="text" required placeholder="Village / District / Mandi Location" className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#228B22]" />
            <select className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#228B22] text-slate-600">
              <option>Vegetables (Leafy & Gourds)</option>
              <option>Fruits & Orchards</option>
              <option>Hydroponics / Greenhouse</option>
              <option>Dairy & Poultry</option>
            </select>
            <button type="submit" className="w-full bg-[#135029] text-white py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#0e3b1e] transition">
              Submit Farmer Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}