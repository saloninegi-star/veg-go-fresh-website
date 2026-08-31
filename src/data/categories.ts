import {
  Salad,
  Cherry,
  Leaf,
  Scissors,
  Sparkles,
  Milk,
  Egg,
  Wheat,
  Grid3x3,
  Coffee,
  Flower2,
  type LucideIcon,
} from "lucide-react";

export interface Category {
  name: string;
  icon: LucideIcon;
  route: string;
  /** whether a page actually exists for this route yet */
  implemented: boolean;
}

export const CATEGORIES: Category[] = [
  { name: "Vegetables", icon: Salad, route: "/", implemented: true },
  { name: "Fruits", icon: Cherry, route: "/fruits", implemented: true },
  { name: "Leafy Greens", icon: Leaf, route: "/leafy-greens", implemented: true },
  { name: "Herbs & Seasoning", icon: Scissors, route: "/herbs-seasoning", implemented: true },
  { name: "Exotic Vegetables", icon: Sparkles, route: "/exotic-vegetables", implemented: false },
  { name: "Dairy Products", icon: Milk, route: "/dairy-products", implemented: false },
  { name: "Eggs", icon: Egg, route: "/eggs", implemented: false },
  { name: "Pulses & Grains", icon: Wheat, route: "/pulses-grains", implemented: false },
  { name: "Rice & Millets", icon: Grid3x3, route: "/rice-millets", implemented: false },
  { name: "Beverages", icon: Coffee, route: "/beverages", implemented: false },
  { name: "Plants & Pots", icon: Flower2, route: "/plants-pots", implemented: false },
];
