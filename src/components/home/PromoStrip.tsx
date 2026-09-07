import { useToast } from "../../context/ToastContext";
import { useUi } from "../../context/UiContext";
import icon1 from "../../assets/images/icon1.png";
import icon2 from "../../assets/images/icon2.png";
import icon3 from "../../assets/images/icon3.png";
import icon4 from "../../assets/images/icon4.png";

function AssistantAvatar() {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-12 sm:h-12">
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
      <path
        d="M 44 57 Q 50 62 56 57"
        stroke="#0f172a"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

const PROMOS = [
  {
    title: "Spin & Win",
    sub: "Win exciting rewards everyday",
    cta: "Spin Now",
    image: icon1,
    toast: "Spinning wheel...",
  },
  {
    title: "Buy Again",
    sub: "Reorder your favourite items",
    cta: "Buy Again",
    image: icon2,
    toast: "Reordering last basket",
  },
  {
    title: "Smart Recommendations",
    sub: "Handpicked for you based on your choice",
    cta: "Explore",
    image: icon3,
    toast: "Loaded AI recommendations",
  },
  {
    title: "Today's Offers",
    sub: "Grab the best deals of the day!",
    cta: "View Offers",
    image: icon4,
    toast: "Offers highlighted",
  },
];

export default function PromoStrip() {
  const { showToast } = useToast();
  const { openAiModal } = useUi();

  return (
    <section
      className="
        relative
        w-full
        mt-6 sm:mt-8 lg:mt-10
        p-4 sm:p-5 lg:p-6
        pr-4 sm:pr-5 lg:pr-6
        rounded-2xl
        text-white
        shadow-md
        overflow-visible
        bg-[#0E4823]
      "
    >
      <div
        className="
          w-full
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-0
        "
      >
        {PROMOS.map((promo, i) => (
          <div
            key={promo.title}
            className={`
              min-w-0
              flex
              items-center
              gap-3
              py-4
              sm:px-3
              lg:px-4
              ${i === 0 ? "lg:pl-0" : ""}
              ${i === PROMOS.length - 1 ? "lg:pr-16" : ""}
              ${
                i > 0
                  ? "border-t sm:border-t-0 sm:border-l border-white/10"
                  : ""
              }
              ${
                i === 2
                  ? "lg:border-l"
                  : ""
              }
            `}
          >
            {/* Icon */}
            <div className="shrink-0">
              <img
                src={promo.image}
                alt=""
                className="
                  w-14 h-14
                  sm:w-16 sm:h-16
                  lg:w-[68px] lg:h-[68px]
                  object-contain
                "
              />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm sm:text-[15px] leading-tight text-white">
                {promo.title}
              </div>

              <div className="mt-1 text-[10px] sm:text-[11px] leading-relaxed text-white/70 line-clamp-2">
                {promo.sub}
              </div>

              <button
                onClick={() => showToast(promo.toast)}
                className="
                  mt-2
                  px-3 sm:px-4
                  py-1.5
                  rounded-lg
                  bg-white
                  text-[#135029]
                  text-[10px] sm:text-[11px]
                  font-bold
                  hover:bg-slate-100
                  transition
                  shadow-sm
                  whitespace-nowrap
                "
              >
                {promo.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating AI Assistant */}
      <div
        className="
          absolute
          right-2 bottom-2
          sm:right-3 sm:bottom-3
          lg:-right-5 lg:-bottom-5
          z-30
          flex
          flex-col
          items-center
        "
      >
        <div
          onClick={openAiModal}
          className="
            w-14 h-14
            sm:w-16 sm:h-16
            lg:w-20 lg:h-20
            bg-white
            rounded-full
            border-[3px] sm:border-[3.5px]
            border-[#135029]
            shadow-xl
            flex
            items-center
            justify-center
            cursor-pointer
            hover:scale-105
            transition
            duration-300
            select-none
            relative
          "
        >
          <AssistantAvatar />
        </div>

        <div
          className="
            mt-1.5 sm:mt-2
            text-[8px] sm:text-[10px]
            font-black
            text-slate-900
            bg-white
            px-2 sm:px-3
            py-1
            rounded-full
            shadow-lg
            border border-slate-100
            leading-tight
            whitespace-nowrap
          "
        >
          <div className="text-[#135029] text-center font-black">
            VegGo
          </div>

          <div className="text-slate-500 text-[7px] sm:text-[8px] font-bold text-center">
            AI Assistant
          </div>
        </div>
      </div>
    </section>
  );
}