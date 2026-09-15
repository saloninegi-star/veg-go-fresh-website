import { Leaf, Heart, ShieldCheck, Truck, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero */}
      <div className="bg-[#EAF6EA] border border-[#D5EAD3] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#135029] text-xs font-semibold shadow-xs mb-4">
          <Leaf className="w-3.5 h-3.5 text-[#228B22]" /> Farm-to-Kitchen Mission
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#113B1E] max-w-2xl mx-auto leading-tight">
          Bringing Daily Fresh Harvests Directly to Your Family
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          VegGo Fresh eliminates middlemen, cold chain delays, and artificial ripening to bring nature’s purest greens from the soil to your table in under 12 hours.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Partner Farmers", val: "2,500+" },
          { label: "Happy Households", val: "150,000+" },
          { label: "Pesticide Residue Free", val: "100%" },
          { label: "Average Delivery Time", val: "35 Mins" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#EEF4ED] rounded-2xl p-6 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#135029]">{s.val}</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#EEF4ED] p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF6EA] flex items-center justify-center text-[#228B22]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Uncompromised Quality</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every vegetable goes through 3-tier optical and chemical sorting at our sorting hubs.
            </p>
          </div>
          <div className="bg-white border border-[#EEF4ED] p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF6EA] flex items-center justify-center text-[#228B22]">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Farmer Prosperity</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We ensure 35% higher direct payouts to local farmers with guaranteed 48-hour settlements.
            </p>
          </div>
          <div className="bg-white border border-[#EEF4ED] p-6 rounded-2xl shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF6EA] flex items-center justify-center text-[#228B22]">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Zero Emission Delivery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our micro-delivery fleet in Hyderabad is 100% electric, reducing our ecological footprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}