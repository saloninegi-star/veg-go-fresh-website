import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // सुनिश्चित करें कि आपका Navbar पाथ सही है
import {
  MapPin,
  CreditCard,
  Smartphone,
  Circle,
  CheckCircle2,
  Lock,
  Truck,
  RotateCcw,
  Sparkles,
  Droplet,
  ShieldCheck,
  Clock
} from "lucide-react";

// एड्रेस के लिए टाइप इंटरफ़ेस (Interface)
interface Address {
  name: string;
  type: string;
  flat: string;
  area: string;
  state: string;
  phone: string;
}

// ऑर्डर डिटेल्स के लिए इंटरफ़ेस
interface OrderDetails {
  itemsCount: number;
  itemsPrice: number;
  deliveryCharges: number;
  packagingCharges: number;
  savings: number;
  total: number;
}

export default function CheckoutPage() {
  const navigate = useNavigate();

  // Navbar स्टेट्स (Type-safe)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(3);
  const [cartTotal, setCartTotal] = useState<number>(95.0);

  // पेमेंट मेथड स्टेट
  const [paymentMethod, setPaymentMethod] = useState<string>("cod"); // 'upi', 'card', 'netbanking', 'cod'

  // डिलीवरी एड्रेस स्टेट
  const [address, setAddress] = useState<Address>({
    name: "Shiva Kumar",
    type: "Home",
    flat: "Flat 101, Gokul Apartments",
    area: "Kukatpally, Hyderabad - 500072",
    state: "Telangana",
    phone: "+91 98765 43210"
  });

  // आर्डर समरी डेटा
  const orderDetails: OrderDetails = {
    itemsCount: 3,
    itemsPrice: 75.0,
    deliveryCharges: 20.0,
    packagingCharges: 10.0,
    savings: 10.0,
    total: 95.0
  };

  const handlePlaceOrder = (): void => {
    alert(`ऑर्डर सफलतापूर्वक सबमिट हो गया है! भुगतान का प्रकार: ${paymentMethod.toUpperCase()}`);
  };

  // TypeScript पैरामीटर टाइपिंग के साथ showToast फ़ंक्शन
  const showToast = (msg: string): void => {
    console.log("Toast:", msg);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-800 flex flex-col font-sans">
      {/* 1. Reusable Navbar */}
      <Navbar
        setMobileNav={setMobileNav}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setAiModalOpen={setAiModalOpen}
        setCartOpen={() => navigate("/cart")}
        cartCount={cartCount}
        cartTotal={cartTotal}
        showToast={showToast}
      />

      {/* 2. मुख्य चेकआउट सेक्शन */}
      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 lg:px-8 py-8">
        <h1 className="text-2xl font-extrabold text-[#113B1E] mb-6 tracking-tight">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* बायाँ कॉलम (Steps 1, 2, 3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Delivery Address */}
            <div className="bg-white border border-[#EEF4ED] rounded-2xl p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#135029] text-white flex items-center justify-center font-bold text-sm">
                    1
                  </span>
                  <h2 className="text-base font-bold text-[#113B1E]">
                    Delivery Address
                  </h2>
                </div>
                <button 
                  onClick={() => showToast("Address change requested")}
                  className="text-xs md:text-sm font-bold text-[#135029] hover:underline"
                >
                  Change
                </button>
              </div>

              <div className="border border-[#EEF4ED] rounded-xl p-4 bg-[#FAFCFA]">
                <span className="inline-block bg-[#E8F5E5] text-[#135029] text-[10px] font-bold px-2 py-0.5 rounded-md mb-2">
                  {address.type}
                </span>
                <h3 className="font-bold text-slate-800 text-sm md:text-base">
                  {address.name}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 mt-1">
                  {address.flat}, <br />
                  {address.area}, <br />
                  {address.state}
                </p>
                <p className="text-xs md:text-sm text-slate-700 font-semibold mt-2">
                  {address.phone}
                </p>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white border border-[#EEF4ED] rounded-2xl p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#135029] text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <h2 className="text-base font-bold text-[#113B1E]">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <label className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition ${paymentMethod === "upi" ? "border-[#135029] bg-[#F4FAF4]" : "border-[#EAF0EA] hover:bg-slate-50"}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="accent-[#135029] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs md:text-sm font-semibold text-slate-700">UPI / Google Pay / PhonePe</span>
                  </div>
                </label>

                {/* Card Option */}
                <label className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition ${paymentMethod === "card" ? "border-[#135029] bg-[#F4FAF4]" : "border-[#EAF0EA] hover:bg-slate-50"}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="accent-[#135029] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs md:text-sm font-semibold text-slate-700">Credit / Debit Card</span>
                  </div>
                </label>

                {/* Net Banking Option */}
                <label className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition ${paymentMethod === "netbanking" ? "border-[#135029] bg-[#F4FAF4]" : "border-[#EAF0EA] hover:bg-slate-50"}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "netbanking"}
                      onChange={() => setPaymentMethod("netbanking")}
                      className="accent-[#135029] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs md:text-sm font-semibold text-slate-700">Net Banking</span>
                  </div>
                </label>

                {/* Cash on Delivery Option */}
                <label className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition ${paymentMethod === "cod" ? "border-[#135029] bg-[#F4FAF4]" : "border-[#EAF0EA] hover:bg-slate-50"}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-[#135029] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs md:text-sm font-semibold text-slate-700">Cash on Delivery</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 3: Order Summary */}
            <div className="bg-white border border-[#EEF4ED] rounded-2xl p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#135029] text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <h2 className="text-base font-bold text-[#113B1E]">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-3 text-xs md:text-sm">
                <div className="flex justify-between items-center text-slate-600">
                  <span>{orderDetails.itemsCount} Items</span>
                  <span className="font-semibold text-slate-800">₹{orderDetails.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-slate-800">₹{orderDetails.deliveryCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Packaging Charges</span>
                  <span className="font-semibold text-slate-800">₹{orderDetails.packagingCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[#135029] font-medium">
                  <span>You save</span>
                  <span className="font-semibold">-₹{orderDetails.savings.toFixed(2)}</span>
                </div>

                <div className="border-t border-[#EEF4ED] pt-3 mt-2 flex justify-between items-center">
                  <span className="text-sm md:text-base font-extrabold text-slate-800">Total Amount</span>
                  <span className="text-base md:text-lg font-extrabold text-[#135029]">₹{orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* दायाँ कॉलम (Delivery estimation, Illustration and Order Button) */}
          <div className="space-y-4">
            <div className="bg-white border border-[#EEF4ED] rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-center">
              
              {/* Free Delivery Banner */}
              <div className="bg-[#F0F8EE] border border-[#D5EAD3] rounded-xl py-3 px-4 flex items-center justify-center gap-2 mb-5">
                <Truck className="w-4 h-4 text-[#135029]" />
                <span className="text-[11px] md:text-xs font-bold text-[#135029] uppercase tracking-wider">
                  FREE DELIVERY on orders above ₹299
                </span>
              </div>

              {/* Delivery Estimation */}
              <div className="text-left mb-4">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Estimated Delivery
                </p>
                <p className="text-base md:text-lg font-extrabold text-[#113B1E] flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-4.5 h-4.5 text-[#135029]" />
                  Today, 6 PM - 8 PM
                </p>
              </div>

              {/* Delivery Scooter Illustration SVG */}
              <div className="py-4 flex justify-center">
                <svg viewBox="0 0 200 120" className="w-48 h-auto">
                  {/* Ground shadows */}
                  <ellipse cx="100" cy="110" rx="55" ry="5" fill="#EAF6EA" />
                  <ellipse cx="103" cy="110" rx="25" ry="3" fill="#CBE5CB" />
                  
                  {/* Scooter Body & Wheels */}
                  <g>
                    {/* Back wheel */}
                    <circle cx="65" cy="98" r="14" fill="#2E2E2E" stroke="#E2E8F0" strokeWidth="2" />
                    <circle cx="65" cy="98" r="7" fill="#94A3B8" />
                    
                    {/* Front wheel */}
                    <circle cx="138" cy="98" r="14" fill="#2E2E2E" stroke="#E2E8F0" strokeWidth="2" />
                    <circle cx="138" cy="98" r="7" fill="#94A3B8" />

                    {/* Frame connectors */}
                    <path d="M 65 98 L 100 98 L 120 70 L 138 98" stroke="#135029" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M 125 70 L 138 98" stroke="#3F9F36" strokeWidth="4" />
                    
                    {/* Scooter Guard & Seat */}
                    <path d="M 52 82 Q 70 65 95 82 Z" fill="#135029" />
                    <rect x="75" y="72" width="22" height="6" rx="3" fill="#1E293B" />
                    
                    {/* Scooter Front Panel */}
                    <path d="M 122 65 L 134 92" stroke="#3F9F36" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="121" cy="62" r="5" fill="#FACC15" /> {/* Light */}
                  </g>

                  {/* Delivery Boy */}
                  <g>
                    {/* Torso */}
                    <path d="M 94 72 L 104 52 L 118 52 L 114 72 Z" fill="#3F9F36" />
                    
                    {/* Head & Cap */}
                    <circle cx="114" cy="40" r="7" fill="#FDBA74" />
                    <path d="M 108 38 C 108 33 120 33 120 38" stroke="#135029" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <path d="M 114 34 L 122 36" stroke="#135029" strokeWidth="2" strokeLinecap="round" />
                    
                    {/* Legs */}
                    <path d="M 94 72 L 102 90 L 118 90" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    
                    {/* Arms & Handlebar */}
                    <path d="M 104 54 L 124 58" stroke="#3F9F36" strokeWidth="4.5" strokeLinecap="round" />
                  </g>

                  {/* Carrier Box */}
                  <g>
                    <rect x="44" y="50" width="26" height="22" rx="3" fill="#3F9F36" />
                    <rect x="44" y="46" width="26" height="4" rx="1" fill="#FACC15" />
                    <line x1="57" y1="50" x2="57" y2="72" stroke="#135029" strokeWidth="2" />
                  </g>
                </svg>
              </div>

              {/* Tagline */}
              <p className="text-[11px] font-bold text-[#4A7C54] mb-5 tracking-wide">
                Safe &amp; Contactless Delivery
              </p>

              {/* Action Button */}
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

      {/* 3. Footer Trust / Features Ribbon */}
      <footer className="bg-white border-t border-[#EEF4ED] py-6 mt-12">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left">
          
          {/* Farm Fresh */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Farm Fresh</h4>
              <p className="text-[10px] text-slate-500 font-medium">Handpicked Daily</p>
            </div>
          </div>

          {/* No Chemicals */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0">
              <Droplet className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">No Chemicals</h4>
              <p className="text-[10px] text-slate-500 font-medium">Pure &amp; Healthy</p>
            </div>
          </div>

          {/* Speed Delivery */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">30-45 mins Delivery</h4>
              <p className="text-[10px] text-slate-500 font-medium">Fast &amp; Reliable</p>
            </div>
          </div>

          {/* Secure Payments */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Secure Payments</h4>
              <p className="text-[10px] text-slate-500 font-medium">100% Safe</p>
            </div>
          </div>

          {/* Easy Returns */}
          <div className="flex flex-col md:flex-row items-center gap-3 col-span-2 md:col-span-1">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0 mx-auto md:mx-0">
              <RotateCcw className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Easy Returns</h4>
              <p className="text-[10px] text-slate-500 font-medium">Hassle Free</p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}