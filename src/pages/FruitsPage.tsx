import {
  ArrowLeft,
  ArrowRight,
  Cherry,
  Plus,
  ShoppingCart,
  Star,
  Salad,
  Leaf,
  Scissors,
  Sparkles,
  Milk,
  Egg,
  Wheat,
  Grid3x3,
  Coffee,
  Flower2,
  Minus,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fruits from "../assets/images/fruits.png";

// पहले बनाए गए Navbar और VegGoLogo को इम्पोर्ट करें
import Navbar, { VegGoLogo } from "../components/Navbar"; 

const CATEGORIES = [
  { name: "Vegetables", icon: Salad },
  { name: "Fruits", icon: Cherry, active: true },
  { name: "Leafy Greens", icon: Leaf },
  { name: "Herbs & Seasoning", icon: Scissors },
  { name: "Exotic Vegetables", icon: Sparkles },
  { name: "Dairy Products", icon: Milk },
  { name: "Eggs", icon: Egg },
  { name: "Pulses & Grains", icon: Wheat },
  { name: "Rice & Millets", icon: Grid3x3 },
  { name: "Beverages", icon: Coffee },
  { name: "Plants & Pots", icon: Flower2 },
];

/* ---------------------------------------------------------------------- */
/*  `slug` maps each fruit to its id inside ProductDetailPage.tsx's       */
/*  PRODUCT_CATALOG, so clicking a card opens the matching detail page.   */
/* ---------------------------------------------------------------------- */
const fruitProducts = [
  {
    id: 1,
    slug: "apple",
    name: "Fresh Apples",
    weight: "1 kg",
    price: 120,
    mrp: 160,
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    slug: "banana",
    name: "Fresh Bananas",
    weight: "1 dozen",
    price: 40,
    mrp: 60,
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    slug: "strawberry",
    name: "Fresh Strawberries",
    weight: "250 g",
    price: 90,
    mrp: 120,
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    slug: "dragonfruit",
    name: "Dragon Fruit",
    weight: "2 pcs",
    price: 140,
    mrp: 180,
    image:
      "https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    slug: "kiwi",
    name: "Fresh Kiwi",
    weight: "4 pcs",
    price: 110,
    mrp: 150,
    image:
      "https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    slug: "orange",
    name: "Fresh Oranges",
    weight: "1 kg",
    price: 80,
    mrp: 110,
    image:
      "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=500&q=80",
  },
];

type CartItem = {
  id: number;
  quantity: number;
};

export default function FruitsPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [popup, setPopup] = useState("");
  const [showCart, setShowCart] = useState(false);

  // Navbar से जुड़े स्टेट्स
  const [mobileNav, setMobileNav] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const showToast = (msg: string) => {
    setPopup(msg);
    setTimeout(() => {
      setPopup("");
    }, 2000);
  };

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === "Vegetables") {
      navigate("/");
    }

    if (categoryName === "Fruits") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (categoryName === "Leafy Greens") {
      navigate("/leafy-greens");
    }

    if (categoryName === "Herbs & Seasoning") {
      navigate("/herbs-seasoning");
    }
  };

  const addToCart = (fruit: (typeof fruitProducts)[number]) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === fruit.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === fruit.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { id: fruit.id, quantity: 1 }];
    });

    showToast(`${fruit.name} added to cart`);
  };

  const increaseQuantity = (id: number) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getQuantity = (id: number) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const totalCartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalCartPrice = cart.reduce((total, item) => {
    const product = fruitProducts.find((fruit) => fruit.id === item.id);

    if (!product) return total;

    return total + product.price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-[#FBFDFB] text-slate-800">
      
      {/* ================= REUSABLE NAVBAR ================= */}
      <Navbar
        setMobileNav={setMobileNav}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setAiModalOpen={setAiModalOpen}
        setCartOpen={setShowCart}
        cartCount={totalCartItems}
        cartTotal={totalCartPrice}
        showToast={showToast}
      />

      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5">
        <div className="grid lg:grid-cols-[230px_1fr] gap-5 items-start">
          <aside className="bg-[#F4FAF4] rounded-[24px] border border-[#E5ECE2] p-3 shadow-sm lg:sticky lg:top-24">
            <div className="space-y-0.5">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;

                return (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`w-full flex items-center gap-3.5 px-4 py-1.5 rounded-xl text-left transition-all duration-200 ${
                      category.active
                        ? "bg-[#E2EEE0] text-[#135029] font-bold"
                        : "text-[#2C3E50] hover:bg-[#E2EEE0]/40"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0 text-[#135029]" />

                    <span
                      className={`text-[13px] ${
                        category.active ? "font-bold" : "font-semibold"
                      }`}
                    >
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-1.5 mt-1.5 border-t border-[#E5ECE2]">
              <button
                onClick={() => navigate("/categories")}
                className="w-full flex items-center gap-3.5 px-4 py-1.5 rounded-xl text-left text-[#135029] hover:bg-[#E2EEE0]/40 transition-all duration-200"
              >
                <Grid3x3 className="w-5 h-5 shrink-0 text-[#135029]" />

                <span className="text-[13px] font-bold">
                  View All Categories
                </span>
              </button>
            </div>
          </aside>

          <div className="min-w-0 space-y-6">
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
                    <span className="text-[#228B22]">
                      Fruits For You
                    </span>
                  </h1>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                    Handpicked seasonal fruits delivered fresh from trusted
                    farms straight to your doorstep.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-6">
                    <button
                      onClick={() =>
                        document
                          .getElementById("fruit-products")
                          ?.scrollIntoView({
                            behavior: "smooth",
                          })
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

              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                {fruitProducts.map((fruit) => {
                  const quantity = getQuantity(fruit.id);

                  return (
                    <div
                      key={fruit.id}
                      onClick={() => navigate(`/product/${fruit.slug}`)}
                      className="rounded-2xl p-3 flex flex-col justify-between bg-white hover:shadow-md transition-all duration-200 group border border-[#EEF4ED] cursor-pointer"
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

                        {quantity === 0 ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(fruit);
                            }}
                            className="w-7 h-7 rounded-lg bg-[#135029] text-white flex items-center justify-center hover:bg-[#1E7D32] transition active:scale-95"
                            aria-label={`Add ${fruit.name}`}
                          >
                            <Plus className="w-4 h-4 stroke-[3]" />
                          </button>
                        ) : (
                          <div className="flex items-center gap-1 bg-[#EAF5E9] rounded-lg p-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                decreaseQuantity(fruit.id);
                              }}
                              className="w-6 h-6 rounded-md bg-white text-[#135029] flex items-center justify-center hover:bg-[#DCEAD9] transition"
                            >
                              <Minus className="w-3.5 h-3.5 stroke-[3]" />
                            </button>

                            <span className="min-w-[18px] text-center text-xs font-black text-[#135029]">
                              {quantity}
                            </span>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                increaseQuantity(fruit.id);
                                showToast(`${fruit.name} added to cart`);
                              }}
                              className="w-6 h-6 rounded-md bg-[#135029] text-white flex items-center justify-center hover:bg-[#1E7D32] transition"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[3]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-[#EAF5E9] border border-[#D8EBD7] p-5 text-left">
                <div className="text-[#135029] font-black text-lg">
                  100% Fresh
                </div>

                <p className="text-xs text-[#5F6D63] mt-1">
                  Carefully selected fruits every day
                </p>
              </div>

              <div className="rounded-2xl bg-[#FAF5EA] border border-[#F2E8D5] p-5 text-left">
                <div className="text-[#135029] font-black text-lg">
                  Best Prices
                </div>

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
          </div>
        </div>
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

      {popup && (
        <div className="fixed bottom-5 right-5 z-[100] animate-[slideIn_0.3s_ease-out]">
          <div className="flex items-center gap-3 bg-white border border-[#DCEAD9] shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-xl px-4 py-3 min-w-[260px]">
            <div className="w-9 h-9 rounded-full bg-[#EAF5E9] flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-[#135029]" />
            </div>

            <div className="flex-1 text-left">
              <div className="text-xs font-extrabold text-slate-900">
                Notification
              </div>

              <div className="text-[11px] text-slate-500 mt-0.5">
                {popup}
              </div>
            </div>

            <button
              onClick={() => setPopup("")}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {showCart && (
        <div
          className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[2px]"
          onClick={() => setShowCart(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#EEF4ED] pb-4">
              <div className="text-left">
                <h2 className="text-lg font-black text-[#135029]">
                  Your Cart
                </h2>

                <p className="text-[11px] text-slate-400 mt-1">
                  {totalCartItems} item
                  {totalCartItems !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                onClick={() => setShowCart(false)}
                className="w-8 h-8 rounded-lg bg-[#F4FAF4] flex items-center justify-center text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="h-[70%] flex flex-col items-center justify-center text-center">
                <ShoppingCart className="w-12 h-12 text-[#C9DCC6]" />

                <h3 className="mt-4 text-sm font-bold text-slate-800">
                  Your cart is empty
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  Add some fresh fruits to your cart.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-5 space-y-3 overflow-y-auto max-h-[65vh]">
                  {cart.map((item) => {
                    const fruit = fruitProducts.find(
                      (product) => product.id === item.id
                    );

                    if (!fruit) return null;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 border border-[#EEF4ED] rounded-xl p-3"
                      >
                        <img
                          src={fruit.image}
                          alt={fruit.name}
                          className="w-14 h-14 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 min-w-0 text-left">
                          <div className="text-sm font-bold text-slate-900 truncate">
                            {fruit.name}
                          </div>

                          <div className="text-xs text-slate-400">
                            ₹{fruit.price} × {item.quantity}
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-6 h-6 rounded-md bg-[#F4FAF4] flex items-center justify-center text-[#135029]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>

                            <span className="text-xs font-bold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="w-6 h-6 rounded-md bg-[#135029] text-white flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="text-sm font-black text-[#135029]">
                          ₹{fruit.price * item.quantity}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#EEF4ED] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-slate-600">
                      Total
                    </span>

                    <span className="text-xl font-black text-[#135029]">
                      ₹{totalCartPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => alert("Proceeding to checkout")}
                    className="w-full py-3 rounded-xl bg-[#135029] text-white text-sm font-bold hover:bg-[#1E7D32] transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= AI ASSISTANT MODAL ================= */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#D5EAD3] overflow-hidden flex flex-col">
            <div className="p-4 bg-[#135029] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-300" />
                <h3 className="text-sm font-bold">VegGo Smart Assistant</h3>
              </div>
              <button
                onClick={() => setAiModalOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-left text-xs bg-[#F4FAF4]">
              <div className="p-3 bg-white rounded-xl border border-[#D5EAD3] text-slate-700 shadow-2xs">
                👋 Hello Shiva! What fruit-based recipe or tip do you need today?
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Fresh Fruit Salad Ideas", "How to ripen fruits faster", "Best fruits for smoothies"].map(
                  (q) => (
                    <button
                      key={q}
                      onClick={() => showToast(`AI Tip loaded for: ${q}`)}
                      className="px-2.5 py-1 rounded-full bg-white border border-[#C2DEC1] text-[#135029] font-medium hover:bg-[#EAF6EA] transition text-[11px]"
                    >
                      {q}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
          <div
            className="fixed inset-0 bg-black/40 -z-10"
            onClick={() => setAiModalOpen(false)}
          />
        </div>
      )}

      {/* ================= MOBILE NAVIGATION DRAWER ================= */}
      {mobileNav && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col text-left relative z-50">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <VegGoLogo className="h-9 w-auto" />
              <button
                onClick={() => setMobileNav(false)}
                className="p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 flex-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setMobileNav(false);
                    handleCategoryClick(c.name);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    c.active ? "bg-[#EAF6EA] text-[#135029]" : "text-slate-700"
                  }`}
                >
                  <c.icon className="w-4 h-4 text-[#2E7D32]" />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div
            className="flex-1 bg-black/40 fixed inset-0 z-40"
            onClick={() => setMobileNav(false)}
          />
        </div>
      )}
    </div>
  );
}