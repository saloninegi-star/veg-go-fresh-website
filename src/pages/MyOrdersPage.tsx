import { useState } from "react";
import { useToast } from "../context/ToastContext";

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
