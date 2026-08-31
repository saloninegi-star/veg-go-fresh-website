import { useLocation, useNavigate } from "react-router-dom";
import { Grid3x3 } from "lucide-react";
import { CATEGORIES } from "../../data/categories";
import { useToast } from "../../context/ToastContext";

interface CategorySidebarProps {
  /** show the "Categories" header + sticky positioning used on inner pages (Fruits/Leafy/Herbs) */
  variant?: "home" | "page";
}

export default function CategorySidebar({ variant = "home" }: CategorySidebarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleClick = (category: (typeof CATEGORIES)[number]) => {
    if (category.route === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!category.implemented) {
      showToast(`${category.name} is coming soon`);
      return;
    }
    navigate(category.route);
  };

  return (
    <aside
      className={`hidden lg:flex lg:flex-col w-56 shrink-0 rounded-2xl p-2.5 border border-[#E2EFE0] bg-[#F4FAF4] shadow-xs ${
        variant === "home" ? "self-stretch justify-between" : "lg:sticky lg:top-24"
      }`}
    >
      {variant === "page" && (
        <div className="px-3 py-2 mb-2">
          <h3 className="text-sm font-black text-slate-900">Categories</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Shop by category</p>
        </div>
      )}

      <div className="space-y-0.5">
        {CATEGORIES.map((c) => {
          const isSelected = c.route === pathname;
          return (
            <button
              key={c.name}
              onClick={() => handleClick(c)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                isSelected
                  ? "bg-[#E2F0E0] text-[#135029] shadow-2xs"
                  : "text-slate-700 hover:bg-white hover:text-[#135029]"
              }`}
            >
              <c.icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#135029]" : "text-[#2E7D32]"}`} />
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {variant === "home" && (
        <button
          onClick={() => showToast("Viewing full catalog")}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#135029] hover:bg-white transition mt-2 pt-2 border-t border-[#E2EFE0]"
        >
          <Grid3x3 className="w-4 h-4 text-[#2E7D32]" />
          <span>View All Categories</span>
        </button>
      )}
    </aside>
  );
}
