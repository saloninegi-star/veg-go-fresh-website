import { useState, useEffect } from "react";
import { Leaf, ArrowRight, Clock } from "lucide-react";
import heroBasket from "../../assets/images/hero-basket-removebg-preview.png";
import slideshow from "../../assets/images/image.png";
import fruits from "../../assets/images/fruits.png";

const SLIDES = [
  {
    id: 0,
    tagline: "100% FARM FRESH",
    title: "Fresh Vegetables & Fruits",
    accentTitle: "Delivered To Your Home",
    subtext: "Handpicked • Hygienically Packed • On-time Delivery",
    bg: "#EAF5E9",
    image: heroBasket,
  },
  {
    id: 1,
    tagline: "ORGANIC SPECIAL",
    title: "Fresh Leafy Greens & Herbs",
    accentTitle: "Harvested Fresh Daily",
    subtext: "Chemical Free • Nutrient Rich • Direct From Local Farms",
    bg: "#E2EFE0",
    image: slideshow,
  },
  {
    id: 2,
    tagline: "LIMITED STOCK DEALS",
    title: "Premium Exotic Fruits",
    accentTitle: "Save Up To 30% Today",
    subtext: "Kiwi • Strawberries • Dragon Fruit • Avocado",
    bg: "#FAF5EA",
    image: fruits,
  },
];

const AUTO_ADVANCE_MS = 5000;

function FreshnessSeal() {
  return (
    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-10 w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full p-0.5 shadow-lg flex items-center justify-center select-none hover:scale-105 transition duration-300 z-20">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <style type="text/css">
            {`
              .seal-text-top { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 8.5px; fill: #135029; letter-spacing: 0.08em; }
              .seal-text-bottom { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 7.8px; fill: #135029; letter-spacing: 0.16em; }
            `}
          </style>
          <path id="curve-freshness" d="M 15 50 A 35 35 0 0 1 85 50" fill="none" />
          <path id="curve-guarantee" d="M 15 50 A 35 35 0 0 0 85 50" fill="none" />
        </defs>
        <circle cx="50" cy="50" r="47" fill="white" stroke="#135029" strokeWidth="1.8" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="#135029" strokeWidth="1.2" />
        <circle cx="15" cy="50" r="1.5" fill="#135029" />
        <circle cx="85" cy="50" r="1.5" fill="#135029" />
        <text className="seal-text-top" textAnchor="middle">
          <textPath href="#curve-freshness" startOffset="50%">Freshness</textPath>
        </text>
        <text className="seal-text-bottom" textAnchor="middle">
          <textPath href="#curve-guarantee" startOffset="50%">GUARANTEE</textPath>
        </text>
        <g transform="translate(0, -2)">
          <path d="M50 64 C44 56, 35 49, 36 38 C43 38, 49 46, 50 64 Z" fill="#135029" />
          <path d="M50 64 Q43 51 36 38" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M50 64 C56 56, 65 49, 64 38 C57 38, 51 46, 50 64 Z" fill="#135029" />
          <path d="M50 64 Q57 51 64 38" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 rounded-2xl overflow-hidden relative border border-[#DCEAD9] shadow-xs">
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide) => (
          <div
            key={slide.id}
            className="w-full shrink-0 p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between transition-colors duration-300"
            style={{ backgroundColor: slide.bg }}
          >
            <div className="relative z-10 flex-1 max-w-xl text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#CDE5CC] text-[11px] font-bold text-[#1E5F26] mb-4 shadow-2xs">
                <Leaf className="w-3.5 h-3.5 text-[#228B22]" />
                <span>{slide.tagline}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.12] text-[#111827]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {slide.title}
                <br />
                <span className="text-[#228B22]">{slide.accentTitle}</span>
              </h1>

              <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">{slide.subtext}</p>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  onClick={() => document.getElementById("best-sellers-heading")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg text-white text-xs sm:text-sm font-bold tracking-wide transition hover:brightness-110 active:scale-95 shadow-xs"
                  style={{ backgroundColor: "#135029" }}
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => document.getElementById("best-sellers-heading")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-5 py-3 rounded-lg text-xs sm:text-sm font-bold text-slate-800 bg-white border border-[#D2E4D0] hover:bg-[#F4FAF4] transition active:scale-95 shadow-2xs"
                >
                  Explore Offers
                </button>
              </div>

              <div className="flex items-center gap-2 mt-5 text-xs text-slate-600 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#228B22]" />
                <span>Delivery in 30–45 mins</span>
              </div>
            </div>

            <div className="relative z-10 w-full lg:w-[460px] h-64 sm:h-72 lg:h-84 shrink-0 flex items-center justify-center mt-6 lg:mt-0">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-contain rounded-xl select-none" referrerPolicy="no-referrer" />
              <FreshnessSeal />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === idx ? "bg-[#135029] w-4" : "bg-[#C2DEC1] hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
