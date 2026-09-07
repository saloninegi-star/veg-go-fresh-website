import { useNavigate } from "react-router-dom";
import {
  Trash2,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Tag,
  ArrowRight,
  Check,
  Leaf,
  ShoppingCart,
  PackageCheck,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useOrderSummary } from "../hooks/useOrderSummary";
import { PRODUCT_CATALOG } from "../data/products";
import QuantityStepper from "../components/shared/QuantityStepper";

const BRAND = { forestGreen: "#135029" };

export default function CartPage() {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, removeItem } = useCart();
  const { showToast } = useToast();

  const {
    cartEntries,
    cartCount,
    subtotal,
    savings,
    deliveryCharge,
    packagingCharge,
    totalAmount,
    amountToFreeDelivery,
  } = useOrderSummary();

  return (
    <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-lg bg-[#EAF6EA] flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-[#135029]" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#228B22]">
              Shopping Bag
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            My Cart
            <span className="ml-2 text-sm sm:text-base text-slate-400 font-semibold">
              ({cartCount} {cartCount === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>

        {cartEntries.length > 0 && (
          <button
            onClick={() => navigate("/")}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#135029] hover:text-[#228B22] transition"
          >
            Continue Shopping
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {cartEntries.length === 0 ? (
        /* Empty Cart */
        <div className="min-h-[420px] bg-white rounded-3xl border border-[#EEF4ED] shadow-2xs flex flex-col items-center justify-center text-center px-5">
          <div className="w-20 h-20 rounded-full bg-[#EAF6EA] flex items-center justify-center mb-5">
            <ShoppingCart className="w-9 h-9 text-[#135029]" />
          </div>

          <h2 className="text-lg font-extrabold text-slate-900">
            Your cart is empty
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1.5 leading-relaxed">
            Looks like you haven't added anything yet. Explore our fresh
            products and start shopping.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 px-7 py-3 rounded-xl text-white text-xs sm:text-sm font-bold shadow-sm transition hover:brightness-105"
            style={{ backgroundColor: BRAND.forestGreen }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[minmax(0,1fr)_350px] gap-6 lg:gap-8 items-start">
          {/* LEFT — CART ITEMS */}
          <div className="space-y-4">
            {/* Items Header */}
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Your Items</h2>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Review your selected products
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#228B22]">
                <PackageCheck className="w-3.5 h-3.5" />
                Freshly packed
              </div>
            </div>

            {/* Cart List */}
            <div className="bg-white rounded-2xl border border-[#EEF4ED] shadow-2xs overflow-hidden">
              {cartEntries.map(([id, qty], index) => {
                const p = PRODUCT_CATALOG[id];

                if (!p) return null;

                return (
                  <div
                    key={id}
                    className={`p-4 sm:p-5 ${
                      index !== cartEntries.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-5">
                      {/* Product Image */}
                      <button
                        onClick={() => navigate(`/product/${p.id}`)}
                        className="w-[76px] h-[76px] sm:w-[96px] sm:h-[96px] rounded-2xl bg-[#F8FBF7] border border-[#EEF4ED] flex items-center justify-center overflow-hidden shrink-0 hover:border-[#C9DEC6] transition"
                      >
                        <img
                          src={p.img}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>

                      {/* Product Information */}
                      <div className="flex-1 min-w-0">
                        <button
                          onClick={() => navigate(`/product/${p.id}`)}
                          className="text-sm sm:text-[15px] font-bold text-slate-900 text-left hover:text-[#135029] transition line-clamp-2"
                        >
                          {p.name}
                        </button>

                        <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                          {p.weight}
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm sm:text-base font-black text-slate-900">
                            ₹{p.price.toFixed(2)}
                          </span>

                          {p.mrp > p.price && (
                            <span className="text-[10px] sm:text-[11px] text-slate-400 line-through">
                              ₹{p.mrp.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Quantity */}
                        <div className="mt-3">
                          <QuantityStepper
                            value={qty}
                            onIncrease={() => addToCart(id)}
                            onDecrease={() => removeFromCart(id)}
                          />
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                        <button
                          onClick={() => {
                            removeItem(id);
                            showToast(`${p.name} removed from cart`);
                          }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-[#E03838] transition"
                          aria-label={`Remove ${p.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="text-right">
                          <div className="text-base sm:text-lg font-black text-[#135029]">
                            ₹{(p.price * qty).toFixed(2)}
                          </div>

                          {qty > 1 && (
                            <div className="text-[9px] text-slate-400 mt-0.5">
                              {qty} × ₹{p.price.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Savings Banner */}
            {savings > 0 && (
              <div className="rounded-2xl border border-[#DCEBD9] bg-[#F4FAF3] px-4 py-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EAF6EA] flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4 text-[#228B22]" />
                </div>

                <div>
                  <div className="text-xs font-bold text-[#135029]">
                    Nice! You're saving ₹{savings.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Great choice — you're getting these products at a better
                    price.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — PRICE SUMMARY */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-[#EEF4ED] shadow-2xs overflow-hidden">
              {/* Summary Header */}
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Price Details
                </h3>

                <p className="text-[10px] text-slate-400 mt-0.5">
                  Final amount for your order
                </p>
              </div>

              <div className="p-5">
                {/* Price Rows */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">
                      Subtotal ({cartCount} items)
                    </span>

                    <span className="font-semibold text-slate-900">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Delivery Charges</span>

                    {deliveryCharge === 0 ? (
                      <span className="font-bold text-[#228B22]">FREE</span>
                    ) : (
                      <span className="font-semibold text-slate-900">
                        ₹{deliveryCharge.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Packaging Charges</span>

                    <span className="font-semibold text-slate-900">
                      ₹{packagingCharge.toFixed(2)}
                    </span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[#228B22] font-semibold">
                        Total Savings
                      </span>

                      <span className="text-[#228B22] font-bold">
                        - ₹{savings.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="border-t border-dashed border-slate-200 mt-5 pt-4 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">
                      Total Amount
                    </div>

                    <div className="text-[9px] text-slate-400 mt-0.5">
                      Inclusive of all applicable taxes
                    </div>
                  </div>

                  <span className="text-xl font-black text-[#135029]">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => {
                    window.open(
                      "https://play.google.com",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="w-full mt-5 py-3.5 rounded-xl text-white text-xs sm:text-sm font-bold tracking-wide shadow-sm transition hover:brightness-105 active:scale-[0.99] flex items-center justify-center gap-2"
                  style={{ backgroundColor: BRAND.forestGreen }}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {/* Free Delivery */}
                {amountToFreeDelivery > 0 ? (
                  <div className="mt-4 rounded-xl bg-[#FFF9E9] border border-[#F3E5B7] px-3.5 py-3">
                    <div className="flex items-start gap-2">
                      <Truck className="w-3.5 h-3.5 text-[#B8860B] shrink-0 mt-0.5" />

                      <div>
                        <div className="text-[10px] font-bold text-[#8C6B13]">
                          You're almost there!
                        </div>

                        <div className="text-[10px] text-[#9A8244] mt-0.5 leading-relaxed">
                          Add ₹{amountToFreeDelivery.toFixed(0)} more to unlock
                          FREE delivery.
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-2.5 h-1.5 bg-[#F0E7C8] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#B8860B]"
                        style={{
                          width: `${Math.min(
                            100,
                            (subtotal / (subtotal + amountToFreeDelivery)) *
                              100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl bg-[#F0F9EF] border border-[#DCEBD9] px-3.5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#DDF0DA] flex items-center justify-center">
                        <Check
                          className="w-3 h-3 text-[#228B22]"
                          strokeWidth={3}
                        />
                      </div>

                      <span className="text-[10px] text-[#228B22] font-bold">
                        FREE delivery unlocked!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Continue Shopping */}
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-xl bg-white border border-[#D2E4D0] text-[#135029] text-xs sm:text-sm font-bold hover:bg-[#F4FAF4] transition flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Trust Card */}
            <div className="bg-[#F8FBF7] rounded-2xl border border-[#EEF4ED] p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-[#135029]" />
                <span className="text-[11px] font-bold text-slate-800">
                  Safe & Secure Shopping
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#228B22]" />
                  <span className="text-[9px] text-slate-500">
                    Fast Delivery
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-[#228B22]" />
                  <span className="text-[9px] text-slate-500">
                    Secure Payment
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Leaf className="w-3.5 h-3.5 text-[#228B22]" />
                  <span className="text-[9px] text-slate-500">
                    Fresh Products
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-[#228B22]" />
                  <span className="text-[9px] text-slate-500">
                    Easy Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Benefits */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-8">
        {[
          {
            icon: Leaf,
            label: "Farm Fresh",
            sub: "Handpicked Daily",
          },
          {
            icon: ShieldCheck,
            label: "No Chemicals",
            sub: "Pure & Healthy",
          },
          {
            icon: Truck,
            label: "30–45 min Delivery",
            sub: "Fast & Reliable",
          },
          {
            icon: CreditCard,
            label: "Secure Payments",
            sub: "100% Safe",
          },
          {
            icon: RotateCcw,
            label: "Easy Returns",
            sub: "Hassle Free",
          },
        ].map((f) => (
          <div
            key={f.label}
            className="bg-white rounded-2xl border border-[#EEF4ED] p-4 flex flex-col items-center text-center hover:border-[#D2E4D0] transition"
          >
            <div className="w-10 h-10 rounded-full bg-[#EAF6EA] flex items-center justify-center mb-2">
              <f.icon className="w-4 h-4 text-[#228B22]" />
            </div>

            <div className="text-[11px] font-bold text-slate-900">
              {f.label}
            </div>

            <div className="text-[10px] text-slate-400 mt-0.5">{f.sub}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
