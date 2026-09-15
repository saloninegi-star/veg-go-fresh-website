import { Bike, DollarSign, Clock, ShieldCheck } from "lucide-react";

export default function DeliveryPartnerPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-[#EAF6EA] border border-[#D5EAD3] rounded-3xl p-8 sm:p-12 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#135029] text-xs font-semibold shadow-xs mb-3">
          <Bike className="w-3.5 h-3.5 text-[#228B22]" /> VegGo Fleet
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#113B1E]">
          Deliver Freshness & Earn Up to ₹35,000/mo
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Join our delivery rider fleet in Hyderabad. Enjoy flexible shifts, medical insurance, and weekly payouts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-[#EEF4ED] rounded-2xl p-6 text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#228B22]">
            <DollarSign className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900">Weekly Payouts</h3>
          <p className="text-xs text-slate-500">Every Tuesday directly to your bank account with bonus incentives.</p>
        </div>
        <div className="bg-white border border-[#EEF4ED] rounded-2xl p-6 text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#228B22]">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900">Flexible Shifts</h3>
          <p className="text-xs text-slate-500">Morning 5:30 AM - 10:30 AM or Evening slots. Work part-time or full-time.</p>
        </div>
        <div className="bg-white border border-[#EEF4ED] rounded-2xl p-6 text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#228B22]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900">Insurance Cover</h3>
          <p className="text-xs text-slate-500">₹3 Lakh health and accident insurance provided for all active riders.</p>
        </div>
      </div>
    </div>
  );
}