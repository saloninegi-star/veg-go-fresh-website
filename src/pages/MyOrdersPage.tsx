import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";
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

const ORDERS: OrderDetail[] = [
  {
    id: "#VG12345",
    date: "25 May, 2024",
    status: "Delivered",
    amount: 95.0,
    items: [
      {
        name: "Tomato",
        img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=120&auto=format&fit=crop&q=60",
      },
      {
        name: "Potato",
        img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120&auto=format&fit=crop&q=60",
      },
      {
        name: "Onion",
        img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=120&auto=format&fit=crop&q=60",
      },
    ],
    moreItemsCount: 2,
  },
  {
    id: "#VG12340",
    date: "23 May, 2024",
    status: "Out for Delivery",
    amount: 220.0,
    items: [
      {
        name: "Onion",
        img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=120&auto=format&fit=crop&q=60",
      },
      {
        name: "Leafy Greens",
        img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=120&auto=format&fit=crop&q=60",
      },
      {
        name: "Mixed Veg",
        img: "https://images.unsplash.com/photo-1514944224746-6bba5b09e5c2?w=120&auto=format&fit=crop&q=60",
      },
    ],
    moreItemsCount: 2,
  },
  {
    id: "#VG12330",
    date: "20 May, 2024",
    status: "Delivered",
    amount: 150.0,
    items: [
      {
        name: "Cucumber",
        img: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=120&auto=format&fit=crop&q=60",
      },
      {
        name: "Potato",
        img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120&auto=format&fit=crop&q=60",
      },
      {
        name: "Spinach",
        img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=120&auto=format&fit=crop&q=60",
      },
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

const getStatusConfig = (status: OrderDetail["status"]) => {
  switch (status) {
    case "Delivered":
      return {
        icon: CheckCircle2,
        text: "Delivered",
        badge: "bg-[#EAF6EA] text-[#135029] border-[#CFE7D0]",
        iconBg: "bg-[#EAF6EA]",
        iconColor: "text-[#135029]",
      };

    case "Processing":
      return {
        icon: Clock3,
        text: "Processing",
        badge: "bg-amber-50 text-amber-700 border-amber-100",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
      };

    case "Out for Delivery":
      return {
        icon: Truck,
        text: "Out for Delivery",
        badge: "bg-blue-50 text-blue-700 border-blue-100",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
      };

    case "Cancelled":
      return {
        icon: XCircle,
        text: "Cancelled",
        badge: "bg-red-50 text-red-600 border-red-100",
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
      };
  }
};

export default function MyOrdersPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders =
    activeTab === "all"
      ? ORDERS
      : ORDERS.filter(
          (order) =>
            order.status.toLowerCase() === activeTab.toLowerCase(),
        );

  const totalOrders = ORDERS.length;
  const deliveredOrders = ORDERS.filter(
    (order) => order.status === "Delivered",
  ).length;
  const activeOrders = ORDERS.filter(
    (order) =>
      order.status === "Processing" ||
      order.status === "Out for Delivery",
  ).length;

  return (
    <main className="min-h-screen bg-[#F8FBF7]">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10">

        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-2xl bg-[#EAF6EA] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#135029]" />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#113B1E] tracking-tight">
                My Orders
              </h1>

              <p className="text-sm text-slate-500 mt-0.5">
                Track and manage all your recent orders
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-7">
          <div className="bg-white rounded-2xl border border-[#E8F0E7] p-4 md:p-5 shadow-[0_4px_20px_rgba(17,59,30,0.04)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Orders
                </p>

                <p className="text-2xl font-black text-[#113B1E] mt-1">
                  {totalOrders}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-[#F1F8F1] flex items-center justify-center">
                <Package className="w-5 h-5 text-[#135029]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8F0E7] p-4 md:p-5 shadow-[0_4px_20px_rgba(17,59,30,0.04)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Delivered
                </p>

                <p className="text-2xl font-black text-[#113B1E] mt-1">
                  {deliveredOrders}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-[#EAF6EA] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#135029]" />
              </div>
            </div>
          </div>

          <div className="hidden lg:block bg-white rounded-2xl border border-[#E8F0E7] p-4 md:p-5 shadow-[0_4px_20px_rgba(17,59,30,0.04)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Active Orders
                </p>

                <p className="text-2xl font-black text-[#113B1E] mt-1">
                  {activeOrders}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-[#E8F0E7] rounded-2xl p-2 mb-6 shadow-[0_4px_20px_rgba(17,59,30,0.04)] overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;

              const count =
                tab.id === "all"
                  ? ORDERS.length
                  : ORDERS.filter(
                      (order) =>
                        order.status.toLowerCase() === tab.id.toLowerCase(),
                    ).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#135029] text-white shadow-[0_5px_15px_rgba(19,80,41,0.18)]"
                      : "text-slate-500 hover:text-[#135029] hover:bg-[#F1F8F1]"
                  }`}
                >
                  {tab.label}

                  <span
                    className={`min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center text-[10px] font-black ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={order.id}
                  className="group bg-white border border-[#E7EFE6] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_5px_25px_rgba(17,59,30,0.045)] hover:shadow-[0_10px_35px_rgba(17,59,30,0.08)] transition-all duration-300"
                >
                  {/* Order Top */}
                  <div className="px-4 md:px-6 py-4 border-b border-[#F0F3EF] bg-[#FCFDFC]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#EAF6EA] flex items-center justify-center shrink-0">
                          <Package className="w-4 h-4 text-[#135029]" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm md:text-base font-black text-[#113B1E]">
                              Order {order.id}
                            </h3>

                            <span className="hidden sm:block text-slate-300">
                              •
                            </span>

                            <span className="hidden sm:block text-xs font-semibold text-slate-400">
                              {order.date}
                            </span>
                          </div>

                          <p className="sm:hidden text-[11px] font-semibold text-slate-400 mt-0.5">
                            Placed on {order.date}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`inline-flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full border text-[11px] font-extrabold ${statusConfig.badge}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusConfig.text}
                      </div>
                    </div>
                  </div>

                  {/* Order Content */}
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                      {/* Products */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] uppercase tracking-widest font-semibold text-slate-400 mb-3">
                          Items in this order
                        </p>

                        <div className="flex items-center gap-3">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="relative group/item"
                            >
                              <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl bg-[#F6F9F5] border border-[#E9F0E8] p-1.5 overflow-hidden">
                                <img
                                  src={item.img}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover/item:scale-105"
                                />
                              </div>

                              {index === 0 && (
                                <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#135029] text-white flex items-center justify-center text-[9px] font-black">
                                  1
                                </span>
                              )}
                            </div>
                          ))}

                          {order.moreItemsCount > 0 && (
                            <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl bg-[#F1F8F1] border border-[#DCEBDC] flex flex-col items-center justify-center shrink-0">
                              <span className="text-sm font-black text-[#135029]">
                                +{order.moreItemsCount}
                              </span>
                              <span className="text-[9px] font-bold text-[#4A7C54] mt-0.5">
                                more
                              </span>
                            </div>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-400 font-medium mt-3">
                          {order.items.map((item) => item.name).join(" • ")}
                          {order.moreItemsCount > 0 &&
                            ` • +${order.moreItemsCount} more`}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="hidden lg:block w-px h-20 bg-[#EDF1EC]" />

                      {/* Amount */}
                      <div className="lg:w-36">
                        <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">
                          Order Total
                        </p>

                        <p className="text-2xl font-black text-[#113B1E] mt-1">
                          ₹{order.amount.toFixed(2)}
                        </p>

                        <p className="text-[10px] font-semibold text-slate-400 mt-1">
                          Inclusive of all taxes
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-40 shrink-0">
                        <button
                          onClick={() =>
                            showToast(
                              `Ordering items again from ${order.id}`,
                            )
                          }
                          className="w-full h-10 px-4 rounded-xl bg-[#135029] hover:bg-[#0F421F] text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_5px_15px_rgba(19,80,41,0.14)]"
                        >
                          Order Again
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() =>
                            showToast(`Viewing details for ${order.id}`)
                          }
                          className="w-full h-10 px-4 rounded-xl border border-[#DCE7DB] hover:border-[#135029] hover:bg-[#F1F8F1] text-[#135029] text-xs font-bold transition-all duration-200"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white border border-[#E7EFE6] rounded-3xl px-6 py-16 text-center shadow-[0_5px_25px_rgba(17,59,30,0.04)]">
              <div className="w-16 h-16 rounded-2xl bg-[#EAF6EA] mx-auto flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-[#135029]" />
              </div>

              <h3 className="text-lg font-black text-[#113B1E]">
                No orders found
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                You don't have any {activeTab !== "all" ? activeTab : ""}{" "}
                orders yet.
              </p>

              <button
                onClick={() => setActiveTab("all")}
                className="mt-5 px-5 py-2.5 rounded-xl bg-[#135029] text-white text-xs font-bold hover:bg-[#0F421F] transition"
              >
                View All Orders
              </button>
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <div className="mt-8 bg-gradient-to-r from-[#F0F8EF] to-[#F8FBF7] border border-[#DCEBDC] rounded-2xl p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black text-[#113B1E]">
                Need help with an order?
              </p>

              <p className="text-xs text-[#4A7C54] mt-1">
                Our support team is here to help you with your orders.
              </p>
            </div>

            <button
              onClick={() => showToast("Opening support")}
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-white border border-[#CFE2CF] text-[#135029] text-xs font-extrabold hover:bg-[#EAF6EA] transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}