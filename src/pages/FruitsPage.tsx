import { ArrowLeft, Cherry, Plus, ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import fruits from "../assets/images/fruits.png";
import VegetableCursor from "../components/VegetableCursor";

const fruitProducts = [
  {
    id: 1,
    name: "Fresh Apples",
    weight: "1 kg",
    price: 120,
    mrp: 160,
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Fresh Bananas",
    weight: "1 dozen",
    price: 40,
    mrp: 60,
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Fresh Strawberries",
    weight: "250 g",
    price: 90,
    mrp: 120,
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Dragon Fruit",
    weight: "2 pcs",
    price: 140,
    mrp: 180,
    image:
      "https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Fresh Kiwi",
    weight: "4 pcs",
    price: 110,
    mrp: 150,
    image:
      "https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Fresh Oranges",
    weight: "1 kg",
    price: 80,
    mrp: 110,
    image:
      "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=500&q=80",
  },
];

export default function FruitsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FBFDFB] text-slate-800">
      <VegetableCursor />

      <header className="sticky top-0 z-40 bg-white border-b border-[#EEF4ED] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#135029] text-xs font-bold hover:bg-[#F4FAF4] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="text-center">
            <div className="text-2xl font-black leading-none">
              <span className="text-[#128238]">Veg</span>
              <span className="text-[#F46B16]">Go</span>
            </div>
            <div className="text-[9px] font-extrabold tracking-[0.28em] text-[#128238] mt-1">
              FRESH
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#135029]">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:block text-xs font-bold">
              Fresh Fruits
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5 space-y-6">
        <section className="rounded-2xl overflow-hidden border border-[#DCEAD9] bg-[#EAF5E9]">
          <div className="grid lg:grid-cols-2 items-center min-h-[350px]">
            <div className="p-7 sm:p-10 lg:p-14 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#CDE5CC] text-[#135029] text-[11px] font-bold">
                <Cherry className="w-3.5 h-3.5" />
                Fresh Fruit Collection
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.12] text-[#111827]">
                Fresh & Juicy
                <br />
                <span className="text-[#228B22]">Fruits For You</span>
              </h1>

              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                Handpicked seasonal fruits delivered fresh from trusted farms
                straight to your doorstep.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  onClick={() =>
                    document
                      .getElementById("fruit-products")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-6 py-3 rounded-lg bg-[#135029] text-white text-xs sm:text-sm font-bold hover:brightness-110 transition"
                >
                  Shop Fruits
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="px-5 py-3 rounded-lg bg-white border border-[#D2E4D0] text-slate-800 text-xs sm:text-sm font-bold hover:bg-[#F4FAF4] transition"
                >
                  Explore Vegetables
                </button>
              </div>

              <div className="flex items-center gap-2 mt-5 text-xs text-slate-600 font-medium">
                <Star className="w-3.5 h-3.5 text-[#228B22] fill-[#228B22]" />
                Farm Fresh • 30–45 mins Delivery
              </div>
            </div>

            <div className="h-[280px] sm:h-[330px] lg:h-[380px] flex items-center justify-center p-5 lg:p-8">
              <img
                src={fruits}
                alt="Fresh Fruits"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </section>

        <section
          id="fruit-products"
          className="bg-white rounded-2xl border border-[#EEF4ED] p-4 sm:p-5 shadow-xs"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="text-left">
              <div className="text-[11px] font-bold text-[#228B22] uppercase tracking-wider">
                Fresh Arrivals
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                Fresh Fruits
              </h2>

              <p className="text-[11px] text-slate-400 mt-0.5">
                Naturally fresh, delicious and carefully selected
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#135029]">
              <Star className="w-4 h-4 fill-current" />
              Farm Fresh
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {fruitProducts.map((fruit) => (
              <div
                key={fruit.id}
                className="rounded-2xl p-3 flex flex-col justify-between bg-white hover:shadow-md transition-all duration-200 group border border-[#EEF4ED]"
              >
                <div className="h-32 sm:h-36 w-full overflow-hidden rounded-xl bg-slate-50 mb-2.5">
                  <img
                    src={fruit.image}
                    alt={fruit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-left mb-3 px-0.5">
                  <div className="text-sm font-extrabold text-slate-900 truncate">
                    {fruit.name}
                  </div>

                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {fruit.weight}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-1 px-0.5">
                  <div className="flex items-baseline gap-1 min-w-0">
                    <span className="text-sm font-black text-slate-900 whitespace-nowrap">
                      ₹{fruit.price.toFixed(2)}
                    </span>

                    <span className="text-[10px] text-slate-400 line-through whitespace-nowrap">
                      ₹{fruit.mrp.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => alert(`${fruit.name} added to cart`)}
                    className="w-7 h-7 rounded-lg bg-[#135029] text-white flex items-center justify-center hover:bg-[#1E7D32] transition active:scale-95"
                    aria-label={`Add ${fruit.name}`}
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-[#EAF5E9] border border-[#D8EBD7] p-5 text-left">
            <div className="text-[#135029] font-black text-lg">100% Fresh</div>
            <p className="text-xs text-[#5F6D63] mt-1">
              Carefully selected fruits every day
            </p>
          </div>

          <div className="rounded-2xl bg-[#FAF5EA] border border-[#F2E8D5] p-5 text-left">
            <div className="text-[#135029] font-black text-lg">Best Prices</div>
            <p className="text-xs text-[#5F6D63] mt-1">
              Fresh fruits at affordable prices
            </p>
          </div>

          <div className="rounded-2xl bg-[#F4FAF4] border border-[#DCEAD9] p-5 text-left">
            <div className="text-[#135029] font-black text-lg">
              Fast Delivery
            </div>
            <p className="text-xs text-[#5F6D63] mt-1">
              Delivered fresh in 30–45 minutes
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-8 bg-white border-t border-[#E8F2E6] py-6 px-4 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <span>
            © {new Date().getFullYear()} VegGo Fresh Technologies Pvt. Ltd.
          </span>

          <button
            onClick={() => navigate("/")}
            className="text-[#135029] font-bold hover:underline"
          >
            Back to Home
          </button>
        </div>
      </footer>
    </div>
  );
}