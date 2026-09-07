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
        from-yellow-100
        via-white
        to-yellow-100
        rounded-2xl
        p-3
        sm:p-4
        border
        border-[#F2E8D5]
        shadow-sm
        overflow-hidden
      "
    >
      <div className="grid grid-cols-12 gap-1.5 sm:gap-2 items-center h-full w-full">

        {/* LEFT CONTENT */}
        <div className="col-span-7 flex flex-col h-full justify-between text-left z-10 min-w-0">

          {/* Heading */}
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[11px] sm:text-[13px] md:text-[14px] font-black tracking-wider text-[#5F6D63]">
                FLASH
              </span>

              <span className="text-[11px] sm:text-[13px] md:text-[14px] font-black tracking-wider text-[#E03838]">
                SALE
              </span>

              <svg
                viewBox="0 0 24 24"
                className="w-3 h-3 fill-[#F46B16] shrink-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>

            <h3
              className="
                text-base
                sm:text-lg
                md:text-xl
                font-black
                text-slate-900
                mt-1
                leading-tight
              "
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Up to{" "}
              <span className="text-[#135029] text-xl sm:text-2xl md:text-[25px]">
                50%
              </span>{" "}
              OFF
            </h3>

            <p className="text-[9px] sm:text-[11px] md:text-[12px] text-[#5F6D63] font-medium mt-1">
              On Selected Products
            </p>
          </div>

          {/* TIMER */}
          <div className="flex gap-1 sm:gap-1.5 mt-2">
            {[
              ["Hours", h],
              ["Mins", m],
              ["Secs", s],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex flex-col items-center"
              >
                <div
                  className="
                    w-7
                    h-7
                    sm:w-8
                    sm:h-8
                    md:w-9
                    md:h-9
                    bg-gradient-to-br
                    from-green-400
                    to-yellow-100
                    rounded-md
                    flex
                    items-center
                    justify-center
                    text-[#135029]
                    text-xs
                    sm:text-sm
                    md:text-lg
                    font-bold
                  "
                >
                  {value}
                </div>

                <span className="text-[7px] sm:text-[9px] md:text-[10px] text-[#5F6D63] font-semibold mt-0.5">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={() => showToast("Loading Flash Sale deals...")}
            className="
              w-[82px]
              sm:w-[100px]
              md:w-28
              py-1.5
              sm:py-2
              rounded-lg
              text-white
              text-[9px]
              sm:text-[11px]
              md:text-[12px]
              font-semibold
              transition
              hover:brightness-110
              shrink-0
            "
            style={{ backgroundColor: BRAND.forestGreen }}
          >
            Shop Now
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-span-5 relative h-full flex items-center justify-center min-h-0">

          {/* DISCOUNT BADGE */}
          <div
            className="
              absolute
              top-1
              right-0
              sm:top-0
              sm:right-1
              w-7
              h-7
              sm:w-8
              sm:h-8
              md:w-9
              md:h-9
              bg-gradient-to-br
              from-[#FF4C4C]
              via-[#E03838]
              to-[#9B1C1C]
              rounded-lg
              flex
              items-center
              justify-center
              -rotate-12
              z-10
              border-t
              border-white/30
              border-l
              border-white/30
            "
          >
            <span className="text-white text-lg sm:text-xl md:text-[23px] font-bold">
              %
            </span>
          </div>

          {/* IMAGE */}
          <img
            src={flashsale}
            alt="Vibrant Fresh Vegetables"
            loading="lazy"
            className="
              relative
              w-auto
              object-contain
              mix-blend-multiply
              rounded-xl

              h-[105px]
              -right-2
              -top-2

              sm:h-[125px]
              sm:-right-3
              sm:-top-3

              md:h-[145px]
              md:-right-4
              md:-top-4

              lg:h-[155px]
            "
          />
        </div>
      </div>
    </div>
  );
}