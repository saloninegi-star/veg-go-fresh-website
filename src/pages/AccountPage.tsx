import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
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
  Droplet,
  Truck,
  ShieldCheck,
  RotateCcw,
  Bot
} from "lucide-react";

interface SidebarTab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface Order {
  id: string;
  status: "Delivered" | "Out for Delivery" | "Cancelled";
  date: string;
  amount: number;
}

export default function AccountPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [cartCount] = useState<number>(3);
  const [cartTotal] = useState<number>(95.0);

  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const sidebarTabs: SidebarTab[] = [
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

  const recentOrders: Order[] = [
    { id: "#VG12345", status: "Delivered", date: "25 May, 2024", amount: 95.0 },
    { id: "#VG12340", status: "Out for Delivery", date: "23 May, 2024", amount: 220.0 },
    { id: "#VG12330", status: "Delivered", date: "20 May, 2024", amount: 150.0 },
  ];

  const handleTabClick = (tabId: string): void => {
    if (tabId === "logout") {
      alert("Logging out...");
      navigate("/");
    } else if (tabId === "orders") {
      navigate("/orders"); 
    } else {
      setActiveTab(tabId);
    }
  };

  const showToast = (msg: string): void => {
    console.log("Toast:", msg);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-800 flex flex-col font-sans relative">
      
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

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          
          <aside className="bg-white border border-[#EEF4ED] rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
            <h2 className="text-lg font-extrabold text-slate-850 px-2 mb-4">
              My Account
            </h2>
            <nav className="space-y-1">
              {sidebarTabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#EAF6EA] text-[#135029] font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? "text-[#135029]" : "text-slate-400"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <section className="space-y-6">
            
            {activeTab === "dashboard" ? (
              <>
                <h2 className="text-xl font-extrabold text-[#113B1E] tracking-tight">
                  Account Dashboard
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white border border-[#EEF4ED] p-4 rounded-2xl flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Total Orders
                      </span>
                    </div>
                    <span className="text-xl md:text-2xl font-extrabold text-slate-800">
                      24
                    </span>
                  </div>

                  <div className="bg-white border border-[#EEF4ED] p-4 rounded-2xl flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                        VegGo Plus
                      </span>
                    </div>
                    <span className="text-lg md:text-xl font-bold text-[#135029]">
                      Active
                    </span>
                  </div>

                  <div className="bg-white border border-[#EEF4ED] p-4 rounded-2xl flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Wallet Balance
                      </span>
                    </div>
                    <span className="text-lg md:text-xl font-extrabold text-slate-800">
                      ₹120.00
                    </span>
                  </div>

                  <div className="bg-white border border-[#EEF4ED] p-4 rounded-2xl flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-lime-50 flex items-center justify-center text-lime-600">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Saved Addresses
                      </span>
                    </div>
                    <span className="text-xl md:text-2xl font-extrabold text-slate-800">
                      3
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-[#EEF4ED] rounded-2xl p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                  <h3 className="text-base font-bold text-[#113B1E] mb-4">
                    Recent Orders
                  </h3>

                  <div className="divide-y divide-slate-100 overflow-x-auto">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                            <ShoppingBag className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs md:text-sm font-bold text-slate-800 block">
                              Order {order.id}
                            </span>
                            <span className="text-[10px] md:text-xs text-slate-400 font-medium">
                              {order.date}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                          <span
                            className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                              order.status === "Delivered"
                                ? "text-[#135029] bg-[#EAF6EA]"
                                : "text-amber-600 bg-amber-50"
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="text-sm md:text-base font-black text-slate-800">
                            ₹{order.amount.toFixed(2)}
                          </span>
                          <button
                            onClick={() => showToast(`Viewing details for ${order.id}`)}
                            className="text-xs font-bold text-[#135029] hover:bg-[#EAF6EA] border border-[#135029] px-4 py-1.5 rounded-lg transition"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-2 border-t border-slate-100">
                    {/* कमेंट को यहाँ बाहर लाया गया है ताकि कोई सिंटैक्स एरर न हो */}
                    {/* "View All Orders" पर क्लिक करने पर सीधे /orders पेज पर नेविगेट होगा */}
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
                <h3 className="text-base font-bold text-[#113B1E] capitalize">
                  {activeTab.replace(/([A-Z])/g, " $1")} Section
                </h3>
                <p className="text-xs md:text-sm text-slate-400 max-w-xs">
                  This section is currently under development. Detailed account integrations will appear here.
                </p>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="mt-3 text-xs font-bold text-[#135029] hover:underline"
                >
                  Back to Dashboard
                </button>
              </div>
            )}

          </section>
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

      <div className="fixed bottom-6 right-6 z-40 group cursor-pointer" onClick={() => setAiModalOpen(true)}>
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white border border-[#135029]/20 shadow-[0_4px_24px_rgba(0,0,0,0.15)] transition-all hover:scale-105 active:scale-95 duration-200">
          <div className="w-11 h-11 rounded-full bg-[#135029] flex flex-col items-center justify-center text-emerald-200">
            <Bot className="w-5 h-5" />
            <span className="text-[7px] font-extrabold text-white uppercase tracking-wider mt-0.5">VegGo</span>
          </div>
          <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
        </div>
      </div>

    </div>
  );
}