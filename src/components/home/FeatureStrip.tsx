import { Leaf, ShieldCheck, Truck, CreditCard, Tag, RotateCcw } from "lucide-react";

const FEATURES = [
  { icon: Leaf, title: "Farm Fresh", sub: "Handpicked Daily" },
  { icon: ShieldCheck, title: "No Chemicals", sub: "Pure & Healthy" },
  { icon: Truck, title: "30–45 mins Delivery", sub: "Fast & Reliable" },
  { icon: CreditCard, title: "Secure Payments", sub: "100% Safe" },
  { icon: Tag, title: "Best Prices", sub: "On All Products" },
  { icon: RotateCcw, title: "Easy Returns", sub: "Hassle Free" },
];

export default function FeatureStrip() {
  return (
    <section className="bg-white rounded-2xl border border-[#EEF4ED] px-4 sm:px-8 py-5 shadow-xs">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
        {FEATURES.map((f, i) => (
          <div key={f.title} className={`flex items-center gap-3 ${i > 0 ? "lg:pl-5 pt-3 sm:pt-0" : ""}`}>
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
  );
}
