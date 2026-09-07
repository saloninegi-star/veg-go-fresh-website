import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "./Footer";
import AiAssistantModal from "./AiAssistantModal";
import MobileNavDrawer from "./MobileNavDrawer";
import Toast from "./Toast";
import { useUi } from "../../context/UiContext";

export default function Layout() {
  const {
    mobileNavOpen,
    aiModalOpen,
    closeMobileNav,
    closeAiModal,
  } = useUi();

  return (
    <div className="bg-[#FBFDFB] text-slate-800 flex flex-col min-h-screen overflow-x-hidden">

      <Toast />

      <Navbar />

      <main className="flex-1 w-full min-w-0">
        <Outlet />
      </main>

      <Footer />

      <AiAssistantModal
        open={aiModalOpen}
        onClose={closeAiModal}
      />

      <MobileNavDrawer
        open={mobileNavOpen}
        onClose={closeMobileNav}
      />

    </div>
  );
}