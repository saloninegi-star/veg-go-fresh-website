import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  MapPin,
  Heart,
  Award,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useToast } from "../context/ToastContext";

interface SidebarTab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface Order {
  id: string;
  status: "Delivered" | "Out for Delivery" | "Cancelled";
  date: string;
  amount: number;
}

const SIDEBAR_TABS: SidebarTab[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "addresses", label: "My Addresses", icon: MapPin },
  { id: "wishlist", label: "My Wishlist", icon: Heart },
  { id: "vegGoplus", label: "VegGo Plus", icon: Award },
  { id: "wallet", label: "My Wallet", icon: Wallet },
  { id: "settings", label: "Profile Settings", icon: Settings },
  { id: "help", label: "Help & Support", icon: HelpCircle },
  { id: "logout", label: "Logout", icon: LogOut },
];

// Demo data — no order backend exists yet, so this stays static.
// Swap for a real API call once orders are persisted somewhere.
const RECENT_ORDERS: Order[] = [
  { id: "#VG12345", status: "Delivered", date: "25 May, 2024", amount: 95.0 },
  { id: "#VG12340", status: "Out for Delivery", date: "23 May, 2024", amount: 220.0 },
  { id: "#VG12330", status: "Delivered", date: "20 May, 2024", amount: 150.0 },
];

export default function AccountPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tabId: string) => {
    if (tabId === "logout") {
      showToast("Logged out");
      navigate("/");
      return;
    }
    if (tabId === "orders") {
      navigate("/orders");
      return;
    }
    setActiveTab(tabId);
  };

  return (
    <main className="max-w-[1400px] mx-auto w-full px-4 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
        <aside className="bg-white border border-[#EEF4ED] rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
          <h2 className="text-lg font-extrabold text-slate-850 px-2 mb-4">My Account</h2>
          <nav className="space-y-1">
            {SIDEBAR_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                    isActive ? "bg-[#EAF6EA] text-[#135029] font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#135029]" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="space-y-6">
          {activeTab === "dashboard" ? (
            <>
              <h2 className="text-xl font-extrabold text-[#113B1E] tracking-tight">Account Dashboard</h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#EEF4ED] p-4 rounded-2xl flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
                  </div>
                  <span className="text-xl md:text-2xl font-extrabold text-slate-800">24</span>
                </div>

                <div className="bg-white border border-[#EEF4ED] p-4 rounded-2xl flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">VegGo Plus</span>
                  </div>
                  <span className="text-lg md:text-xl font-bold text-[#135029]">Active</span>
                </div>

                <div className="bg-white border border-[#EEF4ED] p-4 rounded-2xl flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Wallet Balance</span>
                  </div>
                  <span className="text-lg md:text-xl font-extrabold text-slate-800">₹120.00</span>
                </div>

                <div className="bg-white border border-[#EEF4ED] p-4 rounded-2xl flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-lime-50 flex items-center justify-center text-lime-600">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Saved Addresses</span>
                  </div>
                  <span className="text-xl md:text-2xl font-extrabold text-slate-800">3</span>
                </div>
              </div>

              <div className="bg-white border border-[#EEF4ED] rounded-2xl p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                <h3 className="text-base font-bold text-[#113B1E] mb-4">Recent Orders</h3>

                <div className="divide-y divide-slate-100 overflow-x-auto">
                  {RECENT_ORDERS.map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs md:text-sm font-bold text-slate-800 block">Order {order.id}</span>
                          <span className="text-[10px] md:text-xs text-slate-400 font-medium">{order.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            order.status === "Delivered" ? "text-[#135029] bg-[#EAF6EA]" : "text-amber-600 bg-amber-50"
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="text-sm md:text-base font-black text-slate-800">₹{order.amount.toFixed(2)}</span>
                        <button
                          onClick={() => navigate("/orders")}
                          className="text-xs font-bold text-[#135029] hover:bg-[#EAF6EA] border border-[#135029] px-4 py-1.5 rounded-lg transition"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => navigate("/orders")}
                    className="text-xs font-bold text-[#135029] hover:bg-[#EAF6EA] border border-[#135029] px-5 py-2 rounded-xl transition"
                  >
                    View All Orders
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white border border-[#EEF4ED] rounded-2xl p-8 text-center min-h-[350px] flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#EAF6EA] flex items-center justify-center text-[#135029] mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#113B1E] capitalize">{activeTab.replace(/([A-Z])/g, " $1")} Section</h3>
              <p className="text-xs md:text-sm text-slate-400 max-w-xs">
                This section is currently under development. Detailed account integrations will appear here.
              </p>
              <button onClick={() => setActiveTab("dashboard")} className="mt-3 text-xs font-bold text-[#135029] hover:underline">
                Back to Dashboard
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
