import { useToast } from "../../context/ToastContext";
import { useUi } from "../../context/UiContext";

function SpinWheelIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12 transform rotate-12 drop-shadow-sm">
      <path d="M 50 50 L 35 90 L 65 90 Z" fill="#78350f" />
      <rect x="25" y="86" width="50" height="6" rx="2" fill="#451a03" />
      <circle cx="50" cy="50" r="38" fill="#14532d" stroke="#facc15" strokeWidth="1.5" />
      <path d="M 50 50 L 50 14 A 36 36 0 0 1 75.5 24.5 Z" fill="#22c55e" />
      <path d="M 50 50 L 75.5 24.5 A 36 36 0 0 1 86 50 Z" fill="#166534" />
      <path d="M 50 50 L 86 50 A 36 36 0 0 1 75.5 75.5 Z" fill="#22c55e" />
      <path d="M 50 50 L 75.5 75.5 A 36 36 0 0 1 50 86 Z" fill="#166534" />
      <path d="M 50 50 L 50 86 A 36 36 0 0 1 24.5 75.5 Z" fill="#22c55e" />
      <path d="M 50 50 L 24.5 75.5 A 36 36 0 0 1 14 50 Z" fill="#166534" />
      <path d="M 50 50 L 14 50 A 36 36 0 0 1 24.5 24.5 Z" fill="#22c55e" />
      <path d="M 50 50 L 24.5 24.5 A 36 36 0 0 1 50 14 Z" fill="#166534" />
      <circle cx="50" cy="50" r="6" fill="#facc15" stroke="#ffffff" strokeWidth="1" />
      <circle cx="50" cy="14" r="1.5" fill="#facc15" />
      <circle cx="75.5" cy="24.5" r="1.5" fill="#facc15" />
      <circle cx="86" cy="50" r="1.5" fill="#facc15" />
      <circle cx="75.5" cy="75.5" r="1.5" fill="#facc15" />
      <circle cx="50" cy="86" r="1.5" fill="#facc15" />
      <circle cx="24.5" cy="75.5" r="1.5" fill="#facc15" />
      <circle cx="14" cy="50" r="1.5" fill="#facc15" />
      <circle cx="24.5" cy="24.5" r="1.5" fill="#facc15" />
      <polygon points="50,11 46,3 54,3" fill="#ef4444" />
    </svg>
  );
}

function BuyAgainIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-sm">
      <path d="M30 45 C30 30 35 25 35 20 C38 25 38 35 38 45 Z" fill="#15803d" />
      <path d="M42 45 C42 25 48 20 50 15 C52 20 52 30 48 45 Z" fill="#22c55e" />
      <path d="M60 45 C60 28 65 24 70 20 C70 26 68 35 65 45 Z" fill="#166534" />
      <path d="M25 45 C25 15 75 15 75 45" stroke="#4ade80" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M20 45 L25 80 C26 84 30 86 34 86 L66 86 C70 86 74 84 75 80 L80 45 Z" fill="#86efac" />
      <rect x="16" y="42" width="68" height="6" rx="3" fill="#4ade80" />
      <rect x="32" y="54" width="6" height="22" rx="3" fill="#22c55e" opacity="0.8" />
      <rect x="47" y="54" width="6" height="22" rx="3" fill="#22c55e" opacity="0.8" />
      <rect x="62" y="54" width="6" height="22" rx="3" fill="#22c55e" opacity="0.8" />
    </svg>
  );
}

function SmartRecommendIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-sm">
      <defs>
        <linearGradient id="star-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
      </defs>
      <path d="M 50 15 L 59 35 L 81 37 L 64 51 L 69 73 L 50 61 L 31 73 L 36 51 L 19 37 L 41 35 Z" fill="url(#star-green)" />
      <path d="M 22 25 L 26 35 L 37 36 L 29 43 L 31 53 L 22 47 L 13 53 L 15 43 L 7 36 L 18 35 Z" fill="#86efac" transform="scale(0.7)" />
      <path d="M 25 65 L 29 74 L 40 75 L 30 82 L 32 92 L 25 87 L 18 92 L 20 82 L 10 75 L 21 74 Z" fill="#22c55e" transform="translate(-4, -4) scale(0.85)" />
    </svg>
  );
}

function TodaysOfferIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-sm">
      <path d="M25 25 L75 75" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
      <path d="M75 25 L25 75" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
      <g transform="rotate(-15 50 50)">
        <rect x="25" y="30" width="50" height="40" rx="8" fill="#facc15" stroke="#ffffff" strokeWidth="2.5" />
        <circle cx="25" cy="50" r="5" fill="#0E4823" />
        <circle cx="75" cy="50" r="5" fill="#0E4823" />
        <text x="50" y="56" fontFamily="sans-serif" fontSize="19" fontWeight="900" fill="#135029" textAnchor="middle">%</text>
      </g>
    </svg>
  );
}

function AssistantAvatar() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
      <circle cx="50" cy="50" r="38" fill="#ffffff" />
      <rect x="24" y="34" width="52" height="32" rx="16" fill="#e2e8f0" />
      <circle cx="38" cy="50" r="8" fill="#0f172a" />
      <circle cx="38" cy="47" r="2" fill="#ffffff" />
      <circle cx="62" cy="50" r="8" fill="#0f172a" />
      <circle cx="62" cy="47" r="2" fill="#ffffff" />
      <rect x="48" y="16" width="4" height="12" fill="#135029" rx="2" />
      <circle cx="50" cy="15" r="4" fill="#22c55e" />
      <rect x="18" y="42" width="6" height="16" rx="3" fill="#135029" />
      <rect x="76" y="42" width="6" height="16" rx="3" fill="#135029" />
      <path d="M 44 57 Q 50 62 56 57" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const PROMOS = [
  { title: "Spin & Win", sub: "Win exciting rewards everyday", cta: "Spin Now", icon: SpinWheelIcon, toast: "Spinning wheel..." },
  { title: "Buy Again", sub: "Reorder your favourite items", cta: "Buy Again", icon: BuyAgainIcon, toast: "Reordering last basket" },
  { title: "Smart Recommendations", sub: "Handpicked for you based on your choice", cta: "Explore", icon: SmartRecommendIcon, toast: "Loaded AI recommendations" },
  { title: "Today's Offers", sub: "Grab the best deals of the day!", cta: "View Offers", icon: TodaysOfferIcon, toast: "Offers highlighted" },
];

export default function PromoStrip() {
  const { showToast } = useToast();
  const { openAiModal } = useUi();

  return (
    <section className="rounded-2xl p-5 sm:p-6 text-white relative shadow-md overflow-visible bg-[#0E4823]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center divide-y sm:divide-y-0 lg:divide-x divide-white/10">
        {PROMOS.map((promo, i) => (
          <div key={promo.title} className={`flex items-center gap-4 text-left ${i > 0 ? "lg:pl-5" : ""}`}>
            <div className="relative w-14 h-14 shrink-0 bg-white/10 rounded-full border border-white/20 flex items-center justify-center overflow-hidden">
              <promo.icon />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-white">{promo.title}</div>
              <div className="text-[10px] text-white/70">{promo.sub}</div>
              <button
                onClick={() => showToast(promo.toast)}
                className="px-4 py-1.5 rounded-lg bg-white text-[#135029] text-[11px] font-bold hover:bg-slate-100 transition mt-1.5 shadow-2xs"
              >
                {promo.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating AI Assistant widget */}
      <div className="absolute -right-3 -bottom-3 sm:-right-4 sm:-bottom-4 lg:-right-5 lg:-bottom-5 z-30 flex flex-col items-center">
        <div
          onClick={openAiModal}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full border-[3.5px] border-[#135029] shadow-xl flex items-center justify-center cursor-pointer hover:scale-105 transition duration-300 select-none relative"
        >
          <AssistantAvatar />
        </div>
        <div className="text-[10px] font-black text-slate-900 mt-2 bg-white px-3 py-1 rounded-full shadow-lg border border-slate-100 leading-tight">
          <div className="text-[#135029] text-center font-black">VegGo</div>
          <div className="text-slate-500 text-[8px] font-bold">AI Assistant</div>
        </div>
      </div>
    </section>
  );
}
