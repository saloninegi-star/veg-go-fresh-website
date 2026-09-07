import { Grid3x3 } from "lucide-react";
import { CATEGORIES } from "../../data/categories";

interface CategorySidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategorySidebar({
  selectedCategory,
  onCategoryChange,
}: CategorySidebarProps) {

  return (
    <aside className="hidden lg:flex lg:flex-col w-56 shrink-0 rounded-2xl p-2.5 border border-[#E2EFE0] bg-[#F4FAF4] shadow-xs">

      <div className="px-3 py-2 mb-2">
        <h3 className="text-sm font-black text-slate-900">
          Categories
        </h3>

        <p className="text-[10px] text-slate-400 mt-0.5">
          Shop by category
        </p>
      </div>

      <div className="space-y-0.5">
        {CATEGORIES.map((category) => {

          const isSelected =
            category.name === selectedCategory;

          return (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                isSelected
                  ? "bg-[#E2F0E0] text-[#135029] shadow-2xs"
                  : "text-slate-700 hover:bg-white hover:text-[#135029]"
              }`}
            >
              <category.icon
                className={`w-4 h-4 shrink-0 ${
                  isSelected
                    ? "text-[#135029]"
                    : "text-[#2E7D32]"
                }`}
              />

              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onCategoryChange("all")}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#135029] hover:bg-white transition mt-2 pt-2 border-t border-[#E2EFE0]"
      >
        <Grid3x3 className="w-4 h-4 text-[#2E7D32]" />

        <span>View All Categories</span>
      </button>

    </aside>
  );
}