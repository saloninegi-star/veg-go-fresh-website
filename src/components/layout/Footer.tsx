import { useNavigate } from "react-router-dom";
import { Truck, ShieldCheck, RotateCcw, Award, Phone, Mail, MapPin, Smartphone, CreditCard } from "lucide-react";
import { VegGoLogo } from "../Logo";
import { useToast } from "../../context/ToastContext";

export default function Footer() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  return (
    <footer className="mt-16 bg-white border-t border-[#E8F2E6]">
      <div className="border-b border-slate-100 bg-[#F9FCF9] py-8 px-4 lg:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Express Delivery", sub: "Fresh at your door in 30-45 mins" },
            { icon: ShieldCheck, title: "100% Organic & Pure", sub: "Zero chemical fertilizers used" },
            { icon: RotateCcw, title: "Instant Hassle-Free Returns", sub: "No questions asked refund" },
            { icon: Award, title: "Direct From Local Farmers", sub: "Fair trade pricing guaranteed" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#135029]">
                <f.icon className="w-5 h-5 text-[#228B22]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{f.title}</h4>
                <p className="text-[11px] text-slate-500">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto py-12 px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-left">
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <VegGoLogo className="h-10 w-auto" />
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              VegGo Fresh brings you farm-harvested vegetables, seasonal fruits, organic greens, and daily dairy
              essentials harvested at dawn and delivered right to your kitchen.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#228B22]" />
                <span>
                  Helpline: <strong>+91 1800-425-8344</strong> (Toll Free)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#228B22]" />
                <span>
                  Email: <strong>support@veggofresh.com</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#228B22]" />
                <span>Hub: Road No. 12, Kukatpally, Hyderabad, TS 500072</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Popular Categories</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {["Fresh Vegetables", "Exotic & Organic Fruits", "Hydroponic Greens", "Dairy & Farm Eggs", "Millet Grains & Pulses", "Aromatic Herbs & Spices"].map(
                (item) => (
                  <li key={item}>
                    <button onClick={() => showToast(`Filtering ${item}`)} className="hover:text-[#135029] transition">
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Company</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {["About VegGo", "Partner With Us (Farmers)", "Become a Delivery Partner", "VegGo Plus Membership", "Quality Assurance Lab", "Careers & Culture"].map(
                (item) => (
                  <li key={item}>
                    <button onClick={() => showToast(item)} className="hover:text-[#135029] transition">
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Download Our App</h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Enjoy exclusive app-only coupons and live GPS order tracking.
            </p>
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
            <span>•</span>
            <button onClick={() => navigate("/")} className="hover:underline font-semibold text-[#135029]">
              Home
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
