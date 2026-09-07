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
  key: string;
  route: string;
}

export const CATEGORIES: Category[] = [
  {
    name: "Vegetables",
    icon: Salad,
    key: "vegetables",
    route: "/vegetables",
  },
  {
    name: "Fruits",
    icon: Cherry,
    key: "fruits",
    route: "/fruits",
  },
  {
    name: "Leafy Greens",
    icon: Leaf,
    key: "leafy-greens",
    route: "/leafy-greens",
  },
  {
    name: "Herbs & Seasoning",
    icon: Scissors,
    key: "herbs-seasoning",
    route: "/herbs-seasoning",
  },
  {
    name: "Exotic Vegetables",
    icon: Sparkles,
    key: "exotic-vegetables",
    route: "/exotic-vegetables",
  },
  {
    name: "Dairy Products",
    icon: Milk,
    key: "dairy-products",
    route: "/dairy-products",
  },
  {
    name: "Eggs",
    icon: Egg,
    key: "eggs",
    route: "/eggs",
  },
  {
    name: "Pulses & Grains",
    icon: Wheat,
    key: "pulses-grains",
    route: "/pulses-grains",
  },
  {
    name: "Rice & Millets",
    icon: Grid3x3,
    key: "rice-millets",
    route: "/rice-millets",
  },
  {
    name: "Beverages",
    icon: Coffee,
    key: "beverages",
    route: "/beverages",
  },
  {
    name: "Plants & Pots",
    icon: Flower2,
    key: "plants-pots",
    route: "/plants-pots",
  },
];