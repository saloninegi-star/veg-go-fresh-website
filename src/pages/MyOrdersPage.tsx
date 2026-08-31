<<<<<<< HEAD
import { useState } from "react";
import { useToast } from "../context/ToastContext";
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Sparkles,
  Droplet,
  Truck,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
>>>>>>> e2c4767fb9fb72018b5e9e01b65713fd05fe3ca1

interface OrderedItem {
  name: string;
  img: string;
}

interface OrderDetail {
  id: string;
  date: string;
  status: "Delivered" | "Processing" | "Out for Delivery" | "Cancelled";
  amount: number;
  items: OrderedItem[];
  moreItemsCount: number;
}

<<<<<<< HEAD
// Demo data — no order backend exists yet, so this stays static.
const ORDERS: OrderDetail[] = [
  {
    id: "#VG12345",
    date: "25 May, 2024",
    status: "Delivered",
    amount: 95.0,
    items: [
      { name: "Tomato", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=120&auto=format&fit=crop&q=60" },
      { name: "Potato", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120&auto=format&fit=crop&q=60" },
      { name: "Onion", img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=120&auto=format&fit=crop&q=60" },
    ],
    moreItemsCount: 2,
  },
  {
    id: "#VG12340",
    date: "23 May, 2024",
    status: "Out for Delivery",
    amount: 220.0,
    items: [
      { name: "Onion", img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=120&auto=format&fit=crop&q=60" },
      { name: "Leafy Greens", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=120&auto=format&fit=crop&q=60" },
      { name: "Mixed Veg", img: "https://images.unsplash.com/photo-1514944224746-6bba5b09e5c2?w=120&auto=format&fit=crop&q=60" },
    ],
    moreItemsCount: 2,
  },
  {
    id: "#VG12330",
    date: "20 May, 2024",
    status: "Delivered",
    amount: 150.0,
    items: [
      { name: "Cucumber", img: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=120&auto=format&fit=crop&q=60" },
      { name: "Potato", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120&auto=format&fit=crop&q=60" },
      { name: "Spinach", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=120&auto=format&fit=crop&q=60" },
    ],
    moreItemsCount: 2,
  },
];

const TABS = [
  { id: "all", label: "All Orders" },
  { id: "processing", label: "Processing" },
  { id: "out for delivery", label: "Out for Delivery" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

export default function MyOrdersPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders =
    activeTab === "all" ? ORDERS : ORDERS.filter((order) => order.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <main className="max-w-[1400px] mx-auto w-full px-4 lg:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Orders</h1>

      <div className="flex items-center gap-6 border-b border-slate-200 pb-2 overflow-x-auto text-xs md:text-sm">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 font-bold whitespace-nowrap transition-all duration-200 ${
                isActive ? "border-b-2 border-[#135029] text-[#135029]" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-[#EEF4ED] rounded-2xl p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center justify-between lg:justify-start gap-4">
                  <div>
                    <h3 className="text-sm font-black text-slate-800">Order {order.id}</h3>
                    <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Placed on {order.date}</p>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                      order.status === "Delivered" ? "text-[#135029] bg-[#EAF6EA]" : "text-amber-600 bg-amber-50"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-xl border border-slate-100 bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center p-1"
                    >
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                  ))}
                  {order.moreItemsCount > 0 && (
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] md:text-xs font-bold text-slate-500 shrink-0">
                      +{order.moreItemsCount}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-6 shrink-0 lg:border-l lg:border-slate-100 lg:pl-8">
                <div className="text-left lg:text-right">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Total</span>
                  <span className="text-base md:text-lg font-black text-slate-800">₹{order.amount.toFixed(2)}</span>
                </div>

                <div className="flex flex-col gap-2 w-44">
                  <button
                    onClick={() => showToast(`Ordering items again from ${order.id}`)}
                    className="w-full py-2 border border-[#135029] text-[#135029] hover:bg-[#EAF6EA] text-xs font-extrabold rounded-lg transition"
                  >
                    Order Again
                  </button>
                  <button
                    onClick={() => showToast(`Viewing details for ${order.id}`)}
                    className="w-full py-2 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold rounded-lg transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white border border-[#EEF4ED] rounded-2xl p-12 text-center text-slate-400">No orders found.</div>
        )}
      </div>
    </main>
  );
}
=======
export default function MyOrdersPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [cartCount] = useState<number>(3);
  const [cartTotal] = useState<number>(95.0);
  const [activeTab, setActiveTab] = useState<string>("all");

  const showToast = (msg: string): void => {
    console.log("Toast:", msg);
  };

  const orders: OrderDetail[] = [
    {
      id: "#VG12345",
      date: "25 May, 2024",
      status: "Delivered",
      amount: 95.0,
      items: [
        { name: "Tomato", img: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=120&auto=format&fit=crop&q=60" },
        { name: "Potato", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120&auto=format&fit=crop&q=60" },
        { name: "Onion", img: "https://images.unsplash.com/photo-1508747703725-719777637510?w=120&auto=format&fit=crop&q=60" }
      ],
      moreItemsCount: 2
    },
    {
      id: "#VG12340",
      date: "23 May, 2024",
      status: "Out for Delivery",
      amount: 220.0,
      items: [
        { name: "Onion", img: "https://images.unsplash.com/photo-1508747703725-719777637510?w=120&auto=format&fit=crop&q=60" },
        { name: "Leafy Greens", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=120&auto=format&fit=crop&q=60" },
        { name: "Mixed Veg", img: "https://images.unsplash.com/photo-1514944224746-6bba5b09e5c2?w=120&auto=format&fit=crop&q=60" }
      ],
      moreItemsCount: 2
    },
    {
      id: "#VG12330",
      date: "20 May, 2024",
      status: "Delivered",
      amount: 150.0,
      items: [
        { name: "Cucumber", img: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=120&auto=format&fit=crop&q=60" },
        { name: "Potato", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120&auto=format&fit=crop&q=60" },
        { name: "Spinach", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=120&auto=format&fit=crop&q=60" }
      ],
      moreItemsCount: 2
    }
  ];

  const filteredOrders = activeTab === "all"
    ? orders
    : orders.filter((order) => order.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-800 flex flex-col font-sans">
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

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 lg:px-8 py-8 space-y-6">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          My Orders
        </h1>

        <div className="flex items-center gap-6 border-b border-slate-200 pb-2 overflow-x-auto text-xs md:text-sm">
          {[
            { id: "all", label: "All Orders" },
            { id: "processing", label: "Processing" },
            { id: "out for delivery", label: "Out for Delivery" },
            { id: "delivered", label: "Delivered" },
            { id: "cancelled", label: "Cancelled" }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2.5 font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "border-b-2 border-[#135029] text-[#135029]"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#EEF4ED] rounded-2xl p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center justify-between lg:justify-start gap-4">
                    <div>
                      <h3 className="text-sm font-black text-slate-800">
                        Order {order.id}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                        Placed on {order.date}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                        order.status === "Delivered"
                          ? "text-[#135029] bg-[#EAF6EA]"
                          : "text-amber-600 bg-amber-50"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="w-12 h-12 md:w-14 md:h-14 rounded-xl border border-slate-100 bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center p-1">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                    {order.moreItemsCount > 0 && (
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] md:text-xs font-bold text-slate-500 shrink-0">
                        +{order.moreItemsCount}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-6 shrink-0 lg:border-l lg:border-slate-100 lg:pl-8">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                      Total
                    </span>
                    <span className="text-base md:text-lg font-black text-slate-800">
                      ₹{order.amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 w-44">
                    <button
                      onClick={() => showToast(`Ordering items again from ${order.id}`)}
                      className="w-full py-2 border border-[#135029] text-[#135029] hover:bg-[#EAF6EA] text-xs font-extrabold rounded-lg transition"
                    >
                      Order Again
                    </button>
                    <button
                      onClick={() => showToast(`Viewing details for ${order.id}`)}
                      className="w-full py-2 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold rounded-lg transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-[#EEF4ED] rounded-2xl p-12 text-center text-slate-400">
              No orders found.
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-[#EEF4ED] py-6 mt-12">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Farm Fresh</h4>
              <p className="text-[10px] text-slate-500 font-medium">Handpicked Daily</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0">
              <Droplet className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">No Chemicals</h4>
              <p className="text-[10px] text-slate-500 font-medium">Pure &amp; Healthy</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">30-45 mins Delivery</h4>
              <p className="text-[10px] text-slate-500 font-medium">Fast &amp; Reliable</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F0F8EE] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#135029]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Secure Payments</h4>
              <p className="text-[10px] text-slate-500 font-medium">100% Safe</p>
            </div>
          </div>
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
>>>>>>> e2c4767fb9fb72018b5e9e01b65713fd05fe3ca1
