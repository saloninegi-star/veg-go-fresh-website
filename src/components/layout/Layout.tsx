import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "./Footer";
import AiAssistantModal from "./AiAssistantModal";
import MobileNavDrawer from "./MobileNavDrawer";
import Toast from "./Toast";
import { useUi } from "../../context/UiContext";

export default function Layout() {
  const { mobileNavOpen, aiModalOpen, closeMobileNav, closeAiModal } = useUi();

  return (
    <div className="min-h-screen bg-[#FBFDFB] text-slate-800 flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Toast />
      <Navbar />

      <div className="flex-1 w-full">
        <Outlet />
      </div>

      <Footer />

      <AiAssistantModal open={aiModalOpen} onClose={closeAiModal} />
      <MobileNavDrawer open={mobileNavOpen} onClose={closeMobileNav} />

      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
        `}
      </style>
    </div>
  );
}
