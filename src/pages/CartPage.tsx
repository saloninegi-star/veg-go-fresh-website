import { useNavigate } from "react-router-dom";
import { Trash2, ShieldCheck, Truck, RotateCcw, CreditCard, Tag, ArrowRight, Check, Leaf, ShoppingCart } from "lucide-react";
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
  const { cartEntries, cartCount, subtotal, savings, deliveryCharge, packagingCharge, totalAmount, amountToFreeDelivery } =
    useOrderSummary();

  return (
    <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 w-full">
      <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-5">
        My Cart <span className="text-slate-400 font-semibold text-sm">({cartCount} items)</span>
      </h1>

      {cartEntries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EEF4ED] p-12 flex flex-col items-center justify-center text-center gap-3">
          <ShoppingCart className="w-14 h-14 text-[#C9DCC6]" />
          <h2 className="text-sm font-bold text-slate-800">Your cart is empty</h2>
          <p className="text-xs text-slate-500 max-w-xs">Looks like you haven't added anything yet. Start shopping for fresh produce!</p>
          <button onClick={() => navigate("/")} className="mt-2 px-6 py-2.5 rounded-lg text-white text-xs font-bold" style={{ backgroundColor: BRAND.forestGreen }}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
          <div className="bg-white rounded-2xl border border-[#EEF4ED] shadow-2xs divide-y divide-slate-100">
            {cartEntries.map(([id, qty]) => {
              const p = PRODUCT_CATALOG[id];
              if (!p) return null;
              return (
                <div key={id} className="flex items-center gap-4 p-4 sm:p-5">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-50 shrink-0 cursor-pointer"
                    referrerPolicy="no-referrer"
                    onClick={() => navigate(`/product/${p.id}`)}
                  />
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => navigate(`/product/${p.id}`)}
                      className="text-sm font-bold text-slate-900 truncate text-left hover:text-[#135029] transition block"
                    >
                      {p.name}
                    </button>
                    <div className="text-[11px] text-slate-400 mt-0.5">{p.weight}</div>
                    <div className="mt-2.5">
                      <QuantityStepper value={qty} onIncrease={() => addToCart(id)} onDecrease={() => removeFromCart(id)} />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-sm font-black text-slate-900">₹{(p.price * qty).toFixed(2)}</span>
                    <button
                      onClick={() => {
                        removeItem(id);
                        showToast(`${p.name} removed from cart`);
                      }}
                      className="text-slate-300 hover:text-[#E03838] transition"
                      aria-label={`Remove ${p.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-[#EEF4ED] shadow-2xs p-5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Price Details</h3>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-slate-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  {deliveryCharge === 0 ? (
                    <span className="font-semibold text-[#228B22]">FREE</span>
                  ) : (
                    <span className="font-semibold text-slate-900">₹{deliveryCharge.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span>Packaging Charges</span>
                  <span className="font-semibold text-slate-900">₹{packagingCharge.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-[#228B22] font-semibold pt-1">
                    <span>You save</span>
                    <span>₹{savings.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-baseline pt-4 mt-4 border-t border-slate-100">
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900">Total Amount</div>
                  <div className="text-[10px] text-slate-400">(Incl. of all taxes)</div>
                </div>
                <span className="text-lg font-black text-[#135029]">₹{totalAmount.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-4 py-3 rounded-lg text-white text-xs sm:text-sm font-bold tracking-wide shadow-xs transition hover:brightness-105 flex items-center justify-center gap-2"
                style={{ backgroundColor: BRAND.forestGreen }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {amountToFreeDelivery > 0 ? (
                <div className="flex items-start gap-1.5 mt-3 text-[10px] text-[#B8860B] font-medium text-left">
                  <Tag className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>Add items worth ₹{amountToFreeDelivery.toFixed(0)} more to get FREE delivery!</span>
                </div>
              ) : (
                <div className="flex items-start gap-1.5 mt-3 text-[10px] text-[#228B22] font-medium text-left">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" strokeWidth={3} />
                  <span>You've unlocked FREE delivery on this order!</span>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-lg bg-white border border-[#D2E4D0] text-slate-800 text-xs sm:text-sm font-bold hover:bg-[#F4FAF4] transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8">
        {[
          { icon: Leaf, label: "Farm Fresh", sub: "Handpicked Daily" },
          { icon: ShieldCheck, label: "No Chemicals", sub: "Pure & Healthy" },
          { icon: Truck, label: "30–45 min Delivery", sub: "Fast & Reliable" },
          { icon: CreditCard, label: "Secure Payments", sub: "100% Safe" },
          { icon: RotateCcw, label: "Easy Returns", sub: "Hassle Free" },
        ].map((f) => (
          <div key={f.label} className="flex flex-col items-center text-center gap-1.5 bg-white rounded-2xl border border-[#EEF4ED] p-4">
            <div className="w-9 h-9 rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#135029]">
              <f.icon className="w-4 h-4 text-[#228B22]" />
            </div>
            <div className="text-[11px] font-bold text-slate-900">{f.label}</div>
            <div className="text-[10px] text-slate-400">{f.sub}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
