import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { VegGoLogo } from "../Logo";
import { CATEGORIES } from "../../data/categories";
import { useToast } from "../../context/ToastContext";

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  if (!open) return null;

  const handleClick = (category: (typeof CATEGORIES)[number]) => {
    onClose();
    if (!category.implemented) {
      showToast(`${category.name} is coming soon`);
      return;
    }
    navigate(category.route);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-72 bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col text-left relative z-50">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <VegGoLogo className="h-9 w-auto" />
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1 flex-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.name}
              onClick={() => handleClick(c)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                c.route === pathname ? "bg-[#EAF6EA] text-[#135029]" : "text-slate-700"
              }`}
            >
              <c.icon className="w-4 h-4 text-[#2E7D32]" />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-black/40 fixed inset-0 z-40" onClick={onClose} />
    </div>
  );
}
