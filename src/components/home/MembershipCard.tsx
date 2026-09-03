import { useToast } from "../../context/ToastContext";
import coolerBag from "../../assets/images/membership1.png";

const BRAND = { lightMintBg: "#EAF5E9", forestGreen: "#135029" };
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
      className="lg:col-span-3 rounded-2xl p-5 border border-[#D8EBD7] shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[300px]"
      style={{ backgroundColor: BRAND.lightMintBg }}
    >
      <div className="text-left space-y-3 z-10">
        <h3
          className="text-lg sm:text-xl font-black text-[#113B1E] leading-tight"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          VegGo Plus
          <br />
          Membership
        </h3>

        <ul className="space-y-1.5 text-xs text-[#1E5F26] font-semibold">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#135029] text-white text-[8px] font-bold flex items-center justify-center shrink-0">
                ✓
              </span>
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="z-10 mt-auto text-left">
        <button
          onClick={() =>
            showToast("🎉 VegGo Plus 30-day Free Trial Activated!")
          }
          className="px-5 py-2.5 rounded-lg text-white text-xs font-bold transition hover:brightness-110 shadow-xs text-center"
          style={{ backgroundColor: BRAND.forestGreen }}
        >
          Join Now
        </button>
      </div>

      <img
        src={coolerBag}
        alt="VegGo Cooler Bag with Veggies"
        loading="lazy"
        className="absolute bottom-22 right-0 h-60 sm:h-72 max-w-full object-contain object-right-bottom mix-blend-multiply pointer-events-none z-0"
      />
    </div>
  );
}
