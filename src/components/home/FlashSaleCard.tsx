import { useCountdown } from "../../hooks/useCountdown";
import { useToast } from "../../context/ToastContext";
import flashsale from "../../assets/images/flashsale.png";

const BRAND = { creamSale: "#FAF5EA", forestGreen: "#135029" };
const SALE_DURATION_SECONDS = 2 * 3600 + 45 * 60 + 5;

export default function FlashSaleCard() {
  const { h, m, s } = useCountdown(SALE_DURATION_SECONDS);
  const { showToast } = useToast();

  return (
    <div
      className="lg:col-span-3 rounded-2xl p-4 sm:p-5 border border-[#F2E8D5] shadow-xs relative overflow-hidden"
      style={{ backgroundColor: BRAND.creamSale }}
    >
      <div className="grid grid-cols-12 gap-2 items-center h-full w-full">
        <div className="col-span-7 flex flex-col justify-between h-full space-y-4 text-left z-10">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-black tracking-wider text-[#5F6D63]">FLASH</span>
              <span className="text-[11px] font-black tracking-wider text-[#E03838]">SALE</span>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#F46B16]" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Up to <span className="text-[#135029]">50% OFF</span>
            </h3>
            <p className="text-[11px] text-[#5F6D63] font-medium mt-0.5">On Selected Products</p>
          </div>

          <div className="flex gap-2">
            {[["Hours", h], ["Mins", m], ["Secs", s]].map(([label, value]) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-11 h-11 bg-[#dbecd8] rounded-lg flex items-center justify-center text-[#135029] text-base font-extrabold shadow-2xs">
                  {value}
                </div>
                <span className="text-[10px] text-[#5F6D63] font-semibold mt-1">{label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => showToast("Loading Flash Sale deals...")}
            className="w-32 py-2.5 rounded-lg text-white text-xs font-bold transition hover:brightness-110 shadow-xs text-center shrink-0"
            style={{ backgroundColor: BRAND.forestGreen }}
          >
            Shop Now
          </button>
        </div>

        <div className="col-span-5 relative h-full flex items-center justify-center min-h-[145px]">
          <div
            className="absolute -top-3 -right-2 w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FF4C4C] via-[#E03838] to-[#9B1C1C] rounded-xl flex items-center justify-center transform -rotate-12 select-none z-10 border-t border-white/30 border-l border-white/30"
            style={{ boxShadow: "0 8px 18px rgba(224, 56, 56, 0.45), inset 0 -4px 0 rgba(0,0,0,0.25), inset 0 3px 0 rgba(255,255,255,0.4)" }}
          >
            <span className="text-white text-lg font-black tracking-tighter" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>%</span>
          </div>
          <img
            src={flashsale}
            alt="Vibrant Fresh Vegetables"
            loading="lazy"
            className="max-h-[200px] w-auto object-contain mix-blend-multiply rounded-xl transform scale-250 -translate-x-15 origin-center transition duration-300"
          />
        </div>
      </div>
    </div>
  );
}
