import { useNavigate } from "react-router-dom";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Award,
  Phone,
  Mail,
  MapPin,
  Smartphone,
  CreditCard,
} from "lucide-react";
import { VegGoLogo } from "../Logo";
import { useToast } from "../../context/ToastContext";

export default function Footer() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const features = [
    {
      icon: Truck,
      title: "Express Delivery",
      sub: "Fresh at your door in 30-45 mins",
    },
    {
      icon: ShieldCheck,
      title: "100% Organic & Pure",
      sub: "Zero chemical fertilizers used",
    },
    {
      icon: RotateCcw,
      title: "Instant Hassle-Free Returns",
      sub: "No questions asked refund",
    },
    {
      icon: Award,
      title: "Direct From Local Farmers",
      sub: "Fair trade pricing guaranteed",
    },
  ];

  // Company links configured with their respective routes
  const companyLinks = [
    { title: "About VegGo", path: "/about" },
    { title: "Partner With Us (Farmers)", path: "/partner-with-us" },
    { title: "Become a Delivery Partner", path: "/delivery-partner" },
    { title: "VegGo Plus Membership", path: "/veggo-plus" },
    { title: "Quality Assurance Lab", path: "/quality-assurance" },
    { title: "Careers & Culture", path: "/careers" },
  ];

  return (
    <footer className="mt-10 sm:mt-12 lg:mt-16 bg-white border-t border-[#E8F2E6] overflow-hidden">
      {/* Features */}
      <div className="border-b border-slate-100 bg-[#F9FCF9] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-3 sm:gap-3.5 text-left min-w-0"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-[#EAF6EA] flex items-center justify-center">
                <f.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#228B22]" />
              </div>

              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900 leading-tight">
                  {f.title}
                </h4>

                <p className="mt-1 text-[10px] sm:text-[11px] text-slate-500 leading-relaxed">
                  {f.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 text-left">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4 lg:pr-6">
            <div
              className="cursor-pointer inline-block"
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <VegGoLogo className="h-9 sm:h-10 w-auto" />
            </div>

            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed max-w-sm">
              VegGo Fresh brings you farm-harvested vegetables, seasonal fruits,
              organic greens, and daily dairy essentials harvested at dawn and
              delivered right to your kitchen.
            </p>

            <div className="space-y-3 pt-1 text-[11px] sm:text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 shrink-0 mt-0.5 text-[#228B22]" />
                <span>
                  Helpline: <strong>+91 1800-425-8344</strong> (Toll Free)
                </span>
              </div>

              <div className="flex items-start gap-2.5 min-w-0">
                <Mail className="w-4 h-4 shrink-0 mt-0.5 text-[#228B22]" />
                <span className="break-all">
                  Email: <strong>support@veggofresh.com</strong>
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#228B22]" />
                <span>Hub: Road No. 12, Kukatpally, Hyderabad, TS 500072</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
              Popular Categories
            </h4>

            <ul className="space-y-2.5 text-[11px] sm:text-xs text-slate-600">
              {[
                "Fresh Vegetables",
                "Exotic & Organic Fruits",
                "Hydroponic Greens",
                "Dairy & Farm Eggs",
                "Millet Grains & Pulses",
                "Aromatic Herbs & Spices",
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => showToast(`Filtering ${item}`)}
                    className="hover:text-[#135029] transition text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links (Updated with Route Navigation) */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
              Company
            </h4>

            <ul className="space-y-2.5 text-[11px] sm:text-xs text-slate-600">
              {companyLinks.map((item) => (
                <li key={item.title}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-[#135029] hover:underline transition text-left cursor-pointer font-medium"
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* App */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
              Download Our App
            </h4>

            <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed">
              Enjoy exclusive app-only coupons and live GPS order tracking.
            </p>

            <button
              onClick={() => {
                window.open(
                  "https://play.google.com",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="
                w-full
                flex
                items-center
                gap-2.5
                px-3
                py-2.5 sm:py-3
                rounded-xl
                bg-slate-900
                text-white
                text-xs
                hover:bg-slate-800
                transition
                cursor-pointer
              "
            >
              <Smartphone className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 text-emerald-400" />

              <div className="text-left min-w-0">
                <div className="text-[10px] sm:text-[12px] text-slate-400 leading-tight">
                  GET IT ON
                </div>

                <div className="text-sm sm:text-[16px] font-medium leading-tight truncate">
                  Google Play &amp; iOS
                </div>
              </div>
            </button>

            {/* Payments */}
            <div className="pt-3">
              <h5 className="text-[10px] sm:text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                100% Secure Payments
              </h5>

              <div className="flex items-start gap-2 text-slate-400 text-xs">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-slate-600" />

                <span className="text-[10px] sm:text-[12px] text-slate-500 font-medium leading-relaxed">
                  UPI • Cards • Net Banking • COD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-100 py-5 sm:py-6 px-4 sm:px-6 lg:px-8 bg-slate-50 text-[10px] sm:text-[11px] text-slate-500">
        <div
          className="
            max-w-[1400px]
            mx-auto
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
            text-center
            sm:text-left
          "
        >
          <div className="leading-relaxed">
            © {new Date().getFullYear()}{" "}
            <strong>VegGo Fresh Technologies Pvt. Ltd.</strong> All rights
            reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <button
              onClick={() => showToast("Privacy Policy")}
              className="hover:underline"
            >
              Privacy Policy
            </button>

            <span className="hidden sm:inline">•</span>

            <button
              onClick={() => showToast("Terms of Use")}
              className="hover:underline"
            >
              Terms of Use
            </button>

            <span className="hidden sm:inline">•</span>

            <button
              onClick={() => showToast("Security & FSSAI Certified")}
              className="hover:underline"
            >
              FSSAI Certified
            </button>

            <span className="hidden sm:inline">•</span>

            <button
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:underline font-semibold text-[#135029]"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}