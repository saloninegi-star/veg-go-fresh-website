import { useCountdown } from "../../hooks/useCountdown";
import { useToast } from "../../context/ToastContext";
import flashsale from "../../assets/images/flashsale1.png";

const BRAND = {
  forestGreen: "#135029",
};

const SALE_DURATION_SECONDS = 2 * 3600 + 45 * 60 + 5;

export default function FlashSaleCard() {
  const { h, m, s } = useCountdown(SALE_DURATION_SECONDS);
  const { showToast } = useToast();

  return (
    <div
      className="
        relative
        w-full
        h-full
        bg-gradient-to-br
        from-[#FEFBE8]
        via-[#FCFDF8]
        to-[#F3F9EE]
        rounded-2xl
        p-3.5
        sm:p-4
        border
        border-[#EBF3E7]
        shadow-sm
        overflow-hidden
        flex
        flex-col
        justify-between
      "
    >
      {/* 1. DISCOUNT BADGE (Top-Right) */}
      <div
        className="
          absolute
          top-2.5
          right-3
          sm:top-3
          sm:right-3.5
          w-7
          h-7
          sm:w-8
          sm:h-8
          bg-gradient-to-br
          from-[#FF5252]
          via-[#E03838]
          to-[#A31616]
          rounded-xl
          flex
          items-center
          justify-center
          -rotate-12
          z-30
          shadow-md
          border border-white/40
        "
      >
        <span className="text-white text-base sm:text-lg font-black">
          %
        </span>
      </div>

      {/* 2. LEFT CONTENT (Locked safely in left 46% - Never Covered) */}
      <div className="relative z-20 w-[46%] sm:w-[48%] flex flex-col justify-between h-full text-left min-w-0 pointer-events-auto">
        {/* Titles */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] sm:text-[12px] md:text-[13px] font-black tracking-wider text-[#5F6D63]">
              FLASH
            </span>
            <span className="text-[10px] sm:text-[12px] md:text-[13px] font-black tracking-wider text-[#E03838]">
              SALE
            </span>
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 fill-[#F46B16] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>

          <h3
            className="
              text-sm
              sm:text-base
              md:text-lg
              font-black
              text-slate-900
              mt-0.5
              leading-tight
            "
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Up to{" "}
            <span className="text-[#135029] text-lg sm:text-xl md:text-2xl">
              50%
            </span>{" "}
            OFF
          </h3>

          <p className="text-[9px] sm:text-[10px] md:text-[11px] text-slate-500 font-medium mt-0.5 whitespace-nowrap">
            On Selected Products
          </p>
        </div>

        {/* Countdown Timer (Compact & 100% Clear) */}
        <div className="flex gap-1 sm:gap-1.5 my-2">
          {[
            ["Hours", h],
            ["Mins", m],
            ["Secs", s],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <div
                className="
                  w-6
                  h-6
                  sm:w-7
                  sm:h-7
                  bg-[#EAF6EA]
                  border
                  border-[#CFE6CC]
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-[#135029]
                  text-[11px]
                  sm:text-xs
                  font-bold
                  shadow-2xs
                "
              >
                {value}
              </div>
              <span className="text-[7px] sm:text-[8px] text-[#5F6D63] font-semibold mt-0.5">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Shop Now Button (In front) */}
        <div className="relative z-20">
          <button
            onClick={() => showToast("Loading Flash Sale deals...")}
            className="
              px-3.5
              sm:px-4
              py-1.5
              sm:py-2
              rounded-xl
              text-white
              text-[10px]
              sm:text-xs
              font-bold
              transition-all
              hover:brightness-110
              active:scale-95
              shadow-sm
              cursor-pointer
              whitespace-nowrap
            "
            style={{ backgroundColor: BRAND.forestGreen }}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* 3. BIG VEGETABLES IMAGE (Badi height, fills the right area like VegGo Plus) */}
      <div
        className="
          absolute
          bottom-[-4px]
          right-[-8px]
          sm:right-[-12px]
          w-[60%]
          sm:w-[62%]
          h-[84%]
          sm:h-[90%]
          flex
          items-end
          justify-end
          pointer-events-none
          z-10
        "
      >
        <img
          src={flashsale}
          alt="Fresh Farm Vegetables"
          loading="lazy"
          className="
            w-full
            h-full
            max-h-[175px]
            sm:max-h-[205px]
            md:max-h-[225px]
            object-contain
            object-bottom-right
            drop-shadow-[0_10px_20px_rgba(0,0,0,0.14)]
            scale-110
            sm:scale-115
            origin-bottom-right
          "
        />
      </div>
    </div>
  );
}