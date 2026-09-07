import { useToast } from "../../context/ToastContext";
import coolerBag from "../../assets/images/membership1.png";

const BRAND = {
  forestGreen: "#135029",
};

const PERKS = [
  "Free Delivery",
  "Exclusive Offers",
  "Extra Discounts",
  "Priority Support",
];

export default function MembershipCard() {
  const { showToast } = useToast();

  return (
    <div
      className="
        relative
        w-full
        h-full
        min-h-[260px]
        sm:min-h-[280px]
        bg-gradient-to-br
        from-green-100
        via-white
        to-green-100
        rounded-2xl
        p-3
        sm:p-4
        md:p-5
        border
        border-[#D8EBD7]
        shadow-sm
        overflow-hidden
        flex
        flex-col
      "
    >
      {/* Content */}
      <div
        className="
          relative
          z-10
          text-left
          space-y-2.5
          max-w-[60%]
          sm:max-w-[58%]
          md:max-w-[55%]
        "
      >
        <h3
          className="
            text-base
            sm:text-lg
            md:text-lg
            lg:text-xl
            font-bold
            text-[#113B1E]
            leading-tight
          "
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          VegGo Plus
          <br />
          Membership
        </h3>

        <ul className="space-y-1.5 text-[9px] sm:text-[10px] md:text-[10px] lg:text-[11px] text-[#1E5F26] font-semibold">
          {PERKS.map((perk) => (
            <li
              key={perk}
              className="flex items-center gap-1.5 min-w-0"
            >
              <span
                className="
                  w-3
                  h-3
                  sm:w-3.5
                  sm:h-3.5
                  rounded-full
                  bg-[#135029]
                  text-white
                  text-[7px]
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                ✓
              </span>

              <span className="truncate">{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <div className="relative z-10 mt-auto pt-3">
        <button
          onClick={() =>
            showToast("🎉 VegGo Plus 30-day Free Trial Activated!")
          }
          className="
            px-3
            sm:px-4
            py-1.5
            sm:py-2
            rounded-lg
            text-white
            text-[9px]
            sm:text-[10px]
            md:text-[11px]
            font-bold
            shadow-sm
            whitespace-nowrap
            hover:brightness-110
            transition
          "
          style={{ backgroundColor: BRAND.forestGreen }}
        >
          Join Now
        </button>
      </div>

      {/* Image */}
      <img
        src={coolerBag}
        alt="VegGo Cooler Bag with Veggies"
        loading="lazy"
        className="
          absolute
          z-0
          pointer-events-none
          object-contain
          object-right-bottom
          mix-blend-multiply

          bottom-0
          -right-6
          h-[145px]

          sm:-right-7
          sm:h-[175px]

          md:-right-8
          md:h-[190px]

          lg:-right-10
          lg:h-[220px]
        "
      />
    </div>
  );
}