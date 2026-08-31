import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, Clock } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useOrderSummary } from "../hooks/useOrderSummary";

interface Address {
  name: string;
  type: string;
  flat: string;
  area: string;
  state: string;
  phone: string;
}

type PaymentMethod = "upi" | "card" | "netbanking" | "cod";

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string }[] = [
  { id: "upi", label: "UPI / Google Pay / PhonePe" },
  { id: "card", label: "Credit / Debit Card" },
  { id: "netbanking", label: "Net Banking" },
  { id: "cod", label: "Cash on Delivery" },
];

// Demo address — no saved-addresses backend exists yet.
const DEFAULT_ADDRESS: Address = {
  name: "Shiva Kumar",
  type: "Home",
  flat: "Flat 101, Gokul Apartments",
  area: "Kukatpally, Hyderabad - 500072",
  state: "Telangana",
  phone: "+91 98765 43210",
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { showToast } = useToast();
  const { cartCount, subtotal, deliveryCharge, packagingCharge, savings, totalAmount } = useOrderSummary();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [address] = useState<Address>(DEFAULT_ADDRESS);

  const handlePlaceOrder = () => {
    if (cartCount === 0) {
      showToast("Your cart is empty");
      return;
    }
    showToast(`🎉 Order placed via ${paymentMethod.toUpperCase()}!`);
    clearCart();
    navigate("/orders");
  };

  return (
    <main className="max-w-[1400px] mx-auto w-full px-4 lg:px-8 py-8">
      <h1 className="text-2xl font-extrabold text-[#113B1E] mb-6 tracking-tight">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Delivery Address */}
          <div className="bg-white border border-[#EEF4ED] rounded-2xl p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#135029] text-white flex items-center justify-center font-bold text-sm">1</span>
                <h2 className="text-base font-bold text-[#113B1E]">Delivery Address</h2>
              </div>
              <button onClick={() => showToast("Address change requested")} className="text-xs md:text-sm font-bold text-[#135029] hover:underline">
                Change
              </button>
            </div>

            <div className="border border-[#EEF4ED] rounded-xl p-4 bg-[#FAFCFA]">
              <span className="inline-block bg-[#E8F5E5] text-[#135029] text-[10px] font-bold px-2 py-0.5 rounded-md mb-2">{address.type}</span>
              <h3 className="font-bold text-slate-800 text-sm md:text-base">{address.name}</h3>
              <p className="text-xs md:text-sm text-slate-600 mt-1">
                {address.flat}, <br />
                {address.area}, <br />
                {address.state}
              </p>
              <p className="text-xs md:text-sm text-slate-700 font-semibold mt-2">{address.phone}</p>
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-white border border-[#EEF4ED] rounded-2xl p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#135029] text-white flex items-center justify-center font-bold text-sm">2</span>
              <h2 className="text-base font-bold text-[#113B1E]">Payment Method</h2>
            </div>

            <div className="space-y-3">
              {PAYMENT_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition ${
                    paymentMethod === opt.id ? "border-[#135029] bg-[#F4FAF4]" : "border-[#EAF0EA] hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === opt.id}
                      onChange={() => setPaymentMethod(opt.id)}
                      className="accent-[#135029] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs md:text-sm font-semibold text-slate-700">{opt.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 3: Order Summary — pulled live from the cart, not mocked */}
          <div className="bg-white border border-[#EEF4ED] rounded-2xl p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#135029] text-white flex items-center justify-center font-bold text-sm">3</span>
              <h2 className="text-base font-bold text-[#113B1E]">Order Summary</h2>
            </div>

            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex justify-between items-center text-slate-600">
                <span>{cartCount} Items</span>
                <span className="font-semibold text-slate-800">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Delivery Charges</span>
                <span className="font-semibold text-slate-800">
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Packaging Charges</span>
                <span className="font-semibold text-slate-800">₹{packagingCharge.toFixed(2)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between items-center text-[#135029] font-medium">
                  <span>You save</span>
                  <span className="font-semibold">-₹{savings.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-[#EEF4ED] pt-3 mt-2 flex justify-between items-center">
                <span className="text-sm md:text-base font-extrabold text-slate-800">Total Amount</span>
                <span className="text-base md:text-lg font-extrabold text-[#135029]">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: delivery estimate + place order */}
        <div className="space-y-4">
          <div className="bg-white border border-[#EEF4ED] rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-center">
            <div className="bg-[#F0F8EE] border border-[#D5EAD3] rounded-xl py-3 px-4 flex items-center justify-center gap-2 mb-5">
              <Truck className="w-4 h-4 text-[#135029]" />
              <span className="text-[11px] md:text-xs font-bold text-[#135029] uppercase tracking-wider">
                FREE DELIVERY on orders above ₹299
              </span>
            </div>

            <div className="text-left mb-4">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Estimated Delivery</p>
              <p className="text-base md:text-lg font-extrabold text-[#113B1E] flex items-center gap-1.5 mt-0.5">
                <Clock className="w-4 h-4 text-[#135029]" />
                Today, 6 PM - 8 PM
              </p>
            </div>

            <div className="py-4 flex justify-center">
              <svg viewBox="0 0 200 120" className="w-48 h-auto">
                <ellipse cx="100" cy="110" rx="55" ry="5" fill="#EAF6EA" />
                <ellipse cx="103" cy="110" rx="25" ry="3" fill="#CBE5CB" />
                <g>
                  <circle cx="65" cy="98" r="14" fill="#2E2E2E" stroke="#E2E8F0" strokeWidth="2" />
                  <circle cx="65" cy="98" r="7" fill="#94A3B8" />
                  <circle cx="138" cy="98" r="14" fill="#2E2E2E" stroke="#E2E8F0" strokeWidth="2" />
                  <circle cx="138" cy="98" r="7" fill="#94A3B8" />
                  <path d="M 65 98 L 100 98 L 120 70 L 138 98" stroke="#135029" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M 125 70 L 138 98" stroke="#3F9F36" strokeWidth="4" />
                  <path d="M 52 82 Q 70 65 95 82 Z" fill="#135029" />
                  <rect x="75" y="72" width="22" height="6" rx="3" fill="#1E293B" />
                  <path d="M 122 65 L 134 92" stroke="#3F9F36" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="121" cy="62" r="5" fill="#FACC15" />
                </g>
                <g>
                  <path d="M 94 72 L 104 52 L 118 52 L 114 72 Z" fill="#3F9F36" />
                  <circle cx="114" cy="40" r="7" fill="#FDBA74" />
                  <path d="M 108 38 C 108 33 120 33 120 38" stroke="#135029" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M 114 34 L 122 36" stroke="#135029" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 94 72 L 102 90 L 118 90" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M 104 54 L 124 58" stroke="#3F9F36" strokeWidth="4.5" strokeLinecap="round" />
                </g>
                <g>
                  <rect x="44" y="50" width="26" height="22" rx="3" fill="#3F9F36" />
                  <rect x="44" y="46" width="26" height="4" rx="1" fill="#FACC15" />
                  <line x1="57" y1="50" x2="57" y2="72" stroke="#135029" strokeWidth="2" />
                </g>
              </svg>
            </div>

            <p className="text-[11px] font-bold text-[#4A7C54] mb-5 tracking-wide">Safe &amp; Contactless Delivery</p>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3.5 bg-[#135029] hover:bg-[#0f4020] text-white text-sm font-extrabold rounded-xl shadow-md transition-all active:scale-[0.99]"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
