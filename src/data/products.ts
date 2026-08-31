import type { ProductDetail } from "../types/product";

/**
 * Single source of truth for every product in the store.
 * Previously this data was copy-pasted (with different ids/prices/images)
 * across App.tsx, FruitsPage.tsx, HerbsSeasoningPage.tsx, LeafyGreensPage.tsx
 * and ProductDetailPage.tsx. Now every page just filters/reads from here.
 */
export const PRODUCT_CATALOG: Record<string, ProductDetail> = {
  // ---------------- Vegetables ----------------
  tomato: {
    id: "tomato", name: "Fresh Tomato", category: "Vegetables", weight: "1 kg",
    price: 25, mrp: 35, rating: 4.7, reviews: 128,
    img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80"],
    description: "Juicy, naturally ripened tomatoes — perfect for salads, gravies and everyday cooking.",
    highlights: ["Farm Fresh", "No Chemicals", "Hygienically Packed", "Hand Sorted"],
  },
  onion: {
    id: "onion", name: "Fresh Onion", category: "Vegetables", weight: "1 kg",
    price: 28, mrp: 40, rating: 4.5, reviews: 96,
    img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80"],
    description: "Farm-fresh onions with a strong flavour, essential for everyday Indian cooking.",
    highlights: ["Farm Fresh", "Long Shelf Life", "Hygienically Packed", "Hand Sorted"],
  },
  potato: {
    id: "potato", name: "Fresh Potato", category: "Vegetables", weight: "1 kg",
    price: 22, mrp: 30, rating: 4.6, reviews: 154,
    img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80"],
    description: "Versatile, farm-fresh potatoes for curries, fries and everyday meals.",
    highlights: ["Farm Fresh", "No Chemicals", "Hygienically Packed", "Hand Sorted"],
  },
  capsicum: {
    id: "capsicum", name: "Capsicum", category: "Vegetables", weight: "250 g",
    price: 25, mrp: 35, rating: 4.5, reviews: 74,
    img: "https://images.unsplash.com/photo-1563565080-8a4115b37f34?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1563565080-8a4115b37f34?auto=format&fit=crop&w=500&q=80"],
    description: "Crisp green bell peppers, essential for curries, stir-fries and Chinese dishes.",
    highlights: ["Rich in Vitamin C", "Farm Fresh", "No Chemicals", "Crunchy Texture"],
  },

  // ---------------- Fruits ----------------
  banana: {
    id: "banana", name: "Fresh Banana", category: "Fruits", weight: "1 dozen",
    price: 40, mrp: 60, rating: 4.8, reviews: 210,
    img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80"],
    description: "Naturally ripened bananas, sweet and packed with instant energy and potassium.",
    highlights: ["Naturally Ripened", "Rich in Potassium", "No Preservatives", "Hygienically Packed"],
  },
  apple: {
    id: "apple", name: "Fresh Apple", category: "Fruits", weight: "4 pcs",
    price: 120, mrp: 160, rating: 4.7, reviews: 183,
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80"],
    description: "Crisp, sweet apples sourced directly from Himachal orchards.",
    highlights: ["Rich in Fibre", "Farm Fresh", "No Preservatives", "Hygienically Packed"],
  },
  strawberry: {
    id: "strawberry", name: "Fresh Strawberries", category: "Fruits", weight: "250 g",
    price: 90, mrp: 120, rating: 4.6, reviews: 72,
    img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80"],
    description: "Sweet, juicy strawberries handpicked at peak ripeness.",
    highlights: ["Rich in Vitamin C", "Farm Fresh", "No Preservatives", "Hygienically Packed"],
  },
  dragonfruit: {
    id: "dragonfruit", name: "Dragon Fruit", category: "Fruits", weight: "2 pcs",
    price: 140, mrp: 180, rating: 4.5, reviews: 34,
    img: "https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=500&q=80"],
    description: "Exotic dragon fruit, mildly sweet and packed with antioxidants.",
    highlights: ["Rich in Antioxidants", "Exotic Pick", "No Preservatives", "Hygienically Packed"],
  },
  kiwi: {
    id: "kiwi", name: "Fresh Kiwi", category: "Fruits", weight: "4 pcs",
    price: 110, mrp: 150, rating: 4.6, reviews: 48,
    img: "https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=500&q=80"],
    description: "Tangy-sweet kiwis, a great source of Vitamin C.",
    highlights: ["Rich in Vitamin C", "Farm Fresh", "No Preservatives", "Hygienically Packed"],
  },
  orange: {
    id: "orange", name: "Fresh Oranges", category: "Fruits", weight: "1 kg",
    price: 80, mrp: 110, rating: 4.5, reviews: 65,
    img: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=500&q=80"],
    description: "Juicy, tangy oranges, perfect for fresh juice or snacking.",
    highlights: ["Rich in Vitamin C", "Farm Fresh", "No Preservatives", "Hygienically Packed"],
  },
  pomegranate: {
    id: "pomegranate", name: "Pomegranate", category: "Fruits", weight: "1 kg",
    price: 160, mrp: 210, rating: 4.6, reviews: 41,
    // TODO: swap for a dedicated pomegranate photo — placeholder reused from the old codebase
    img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80"],
    description: "Antioxidant-rich pomegranate with juicy, ruby-red seeds.",
    highlights: ["Rich in Antioxidants", "Farm Fresh", "No Preservatives", "Hygienically Packed"],
  },

  // ---------------- Leafy Greens ----------------
  spinach: {
    id: "spinach", name: "Fresh Spinach", category: "Leafy Greens", weight: "250 g",
    price: 30, mrp: 40, rating: 4.6, reviews: 87,
    img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80"],
    description: "Tender, iron-rich spinach leaves, freshly harvested every morning.",
    highlights: ["Rich in Iron", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  coriander: {
    id: "coriander", name: "Fresh Coriander", category: "Leafy Greens", weight: "100 g",
    price: 20, mrp: 30, rating: 4.5, reviews: 64,
    img: "https://images.unsplash.com/photo-1588879460618-9244e6d2e6f1?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1588879460618-9244e6d2e6f1?auto=format&fit=crop&w=500&q=80"],
    description: "Aromatic fresh coriander leaves, perfect for garnish and chutneys.",
    highlights: ["Freshly Cut", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  mint: {
    id: "mint", name: "Fresh Mint", category: "Leafy Greens", weight: "100 g",
    price: 25, mrp: 35, rating: 4.6, reviews: 58,
    img: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&w=500&q=80"],
    description: "Fragrant mint leaves, great for chutneys, teas and cooling drinks.",
    highlights: ["Aromatic", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  methi: {
    id: "methi", name: "Methi Leaves", category: "Leafy Greens", weight: "250 g",
    price: 35, mrp: 45, rating: 4.4, reviews: 41,
    img: "https://images.unsplash.com/photo-1628773822503-930a7eaecf80?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1628773822503-930a7eaecf80?auto=format&fit=crop&w=500&q=80"],
    description: "Fresh, slightly bitter methi leaves, packed with nutrition.",
    highlights: ["Rich in Nutrients", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  amaranth: {
    id: "amaranth", name: "Amaranth Leaves", category: "Leafy Greens", weight: "250 g",
    price: 40, mrp: 55, rating: 4.5, reviews: 37,
    img: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=500&q=80"],
    description: "Nutritious amaranth greens, a household favourite for sabzi.",
    highlights: ["Rich in Iron", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  kale: {
    id: "kale", name: "Kale Leaves", category: "Leafy Greens", weight: "200 g",
    price: 70, mrp: 90, rating: 4.6, reviews: 29,
    img: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=500&q=80"],
    description: "Superfood kale, packed with antioxidants — great for salads and smoothies.",
    highlights: ["Superfood", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },

  // ---------------- Herbs & Seasoning ----------------
  lemongrass: {
    id: "lemongrass", name: "Lemongrass", category: "Herbs & Seasoning", weight: "100 g",
    price: 15, mrp: 25, rating: 4.4, reviews: 22,
    img: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&w=500&q=80"],
    description: "Citrusy, aromatic lemongrass stalks — great for teas, soups and curries.",
    highlights: ["Aromatic", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  garlic: {
    id: "garlic", name: "Fresh Garlic", category: "Herbs & Seasoning", weight: "250 g",
    price: 40, mrp: 60, rating: 4.6, reviews: 58,
    img: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=500&q=80"],
    description: "Pungent, flavourful garlic bulbs — a base ingredient for almost every dish.",
    highlights: ["Aromatic", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  ginger: {
    id: "ginger", name: "Fresh Ginger", category: "Herbs & Seasoning", weight: "250 g",
    price: 30, mrp: 45, rating: 4.5, reviews: 44,
    // TODO: swap for a dedicated ginger photo — placeholder reused from the old codebase
    img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80"],
    description: "Fresh, fibrous ginger root — essential for chai, curries and ginger-garlic paste.",
    highlights: ["Aromatic", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  curryleaves: {
    id: "curryleaves", name: "Curry Leaves", category: "Herbs & Seasoning", weight: "50 g",
    price: 10, mrp: 15, rating: 4.5, reviews: 30,
    img: "https://images.unsplash.com/photo-1614741315629-9e20db4efb34?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1614741315629-9e20db4efb34?auto=format&fit=crop&w=500&q=80"],
    description: "Fragrant curry leaves for tempering dals, sambar and chutneys.",
    highlights: ["Aromatic", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  basil: {
    id: "basil", name: "Thai Basil", category: "Herbs & Seasoning", weight: "100 g",
    price: 35, mrp: 50, rating: 4.5, reviews: 19,
    img: "https://images.unsplash.com/photo-1553830591-2f39e38a013c?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1553830591-2f39e38a013c?auto=format&fit=crop&w=500&q=80"],
    description: "Peppery-sweet Thai basil, perfect for stir-fries and Asian cuisine.",
    highlights: ["Aromatic", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  rosemary: {
    id: "rosemary", name: "Rosemary", category: "Herbs & Seasoning", weight: "50 g",
    price: 50, mrp: 75, rating: 4.6, reviews: 16,
    img: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=500&q=80"],
    description: "Fragrant rosemary sprigs, ideal for roasts, breads and infused oils.",
    highlights: ["Aromatic", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },

  // ---------------- Exotic Vegetables ----------------
  broccoli: {
    id: "broccoli", name: "Broccoli", category: "Exotic Vegetables", weight: "1 pc",
    price: 80, mrp: 110, rating: 4.5, reviews: 27,
    img: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=500&q=80"],
    description: "Fresh, crisp broccoli florets — great steamed, stir-fried or in soups.",
    highlights: ["Premium Pick", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  zucchini: {
    id: "zucchini", name: "Zucchini Yellow", category: "Exotic Vegetables", weight: "1 pc",
    price: 60, mrp: 90, rating: 4.4, reviews: 18,
    img: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=500&q=80"],
    description: "Tender yellow zucchini, mild in flavour and perfect for grilling.",
    highlights: ["Premium Pick", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  bellpeppers: {
    id: "bellpeppers", name: "Colored Bell Peppers", category: "Exotic Vegetables", weight: "2 pcs",
    price: 120, mrp: 170, rating: 4.6, reviews: 33,
    img: "https://images.unsplash.com/photo-1563565080-1cd101b462f4?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1563565080-1cd101b462f4?auto=format&fit=crop&w=500&q=80"],
    description: "Sweet, crunchy red, yellow and orange bell peppers.",
    highlights: ["Premium Pick", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },

  // ---------------- Dairy Products ----------------
  milk: {
    id: "milk", name: "Fresh Cow Milk", category: "Dairy Products", weight: "1 L",
    price: 66, mrp: 70, rating: 4.7, reviews: 210,
    img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80"],
    description: "Fresh, pasteurised cow milk delivered daily from trusted local dairies.",
    highlights: ["Fresh Daily", "Rich & Creamy", "Hygienically Packed", "Quality Checked"],
  },
  paneer: {
    id: "paneer", name: "Organic Paneer", category: "Dairy Products", weight: "200 g",
    price: 90, mrp: 110, rating: 4.6, reviews: 88,
    img: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=500&q=80"],
    description: "Soft, organic paneer made fresh — perfect for curries and grilling.",
    highlights: ["Rich & Creamy", "Fresh Daily", "Hygienically Packed", "Quality Checked"],
  },
  butter: {
    id: "butter", name: "Salted Butter", category: "Dairy Products", weight: "100 g",
    price: 55, mrp: 60, rating: 4.6, reviews: 59,
    img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80"],
    description: "Creamy, lightly salted butter made from farm-fresh milk.",
    highlights: ["Rich & Creamy", "Fresh Daily", "Hygienically Packed", "Quality Checked"],
  },

  // ---------------- Eggs ----------------
  eggs6: {
    id: "eggs6", name: "Farm Fresh Eggs", category: "Eggs", weight: "6 pcs",
    price: 45, mrp: 55, rating: 4.6, reviews: 102,
    img: "https://images.unsplash.com/photo-1516448424440-9dbca97779c1?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1516448424440-9dbca97779c1?auto=format&fit=crop&w=500&q=80"],
    description: "Farm fresh eggs, rich in protein — a breakfast staple.",
    highlights: ["Rich in Protein", "Farm Fresh", "Hygienically Packed", "Quality Checked"],
  },
  eggs12: {
    id: "eggs12", name: "Farm Fresh Eggs", category: "Eggs", weight: "12 pcs",
    price: 85, mrp: 100, rating: 4.6, reviews: 76,
    img: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=500&q=80"],
    description: "A full tray of farm fresh eggs, rich in protein.",
    highlights: ["Rich in Protein", "Farm Fresh", "Hygienically Packed", "Quality Checked"],
  },
  browneggs: {
    id: "browneggs", name: "Organic Brown Eggs", category: "Eggs", weight: "6 pcs",
    price: 75, mrp: 90, rating: 4.7, reviews: 54,
    img: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=500&q=80"],
    description: "Organic, free-range brown eggs from pasture-raised hens.",
    highlights: ["Free Range", "Rich in Protein", "Hygienically Packed", "Quality Checked"],
  },

  // ---------------- Pulses & Grains ----------------
  toordal: {
    id: "toordal", name: "Toor Dal", category: "Pulses & Grains", weight: "1 kg",
    price: 160, mrp: 190, rating: 4.6, reviews: 91,
    img: "https://images.unsplash.com/photo-1585994187746-e4a775515715?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1585994187746-e4a775515715?auto=format&fit=crop&w=500&q=80"],
    description: "Premium, stone-cleaned toor dal — a kitchen staple.",
    highlights: ["High Protein", "Stone Cleaned", "No Additives", "Long Shelf Life"],
  },
  moongdal: {
    id: "moongdal", name: "Moong Dal", category: "Pulses & Grains", weight: "1 kg",
    price: 130, mrp: 150, rating: 4.5, reviews: 67,
    img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=500&q=80"],
    description: "Light, easy-to-digest moong dal, stone cleaned and sorted.",
    highlights: ["High Protein", "Stone Cleaned", "No Additives", "Long Shelf Life"],
  },

  // ---------------- Rice & Millets ----------------
  basmati: {
    id: "basmati", name: "Basmati Rice", category: "Rice & Millets", weight: "1 kg",
    price: 140, mrp: 180, rating: 4.7, reviews: 133,
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80"],
    description: "Long-grained, aromatic basmati rice — perfect for biryani and pulao.",
    highlights: ["Premium Grade", "Aromatic", "No Additives", "Long Shelf Life"],
  },
  kolam: {
    id: "kolam", name: "Kolam Rice", category: "Rice & Millets", weight: "5 kg",
    price: 340, mrp: 400, rating: 4.5, reviews: 61,
    img: "https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&w=500&q=80"],
    description: "Everyday kolam rice, soft-cooking and lightly aromatic.",
    highlights: ["Everyday Grade", "No Additives", "Long Shelf Life", "Bulk Pack"],
  },

  // ---------------- Beverages ----------------
  coffee: {
    id: "coffee", name: "Filter Coffee", category: "Beverages", weight: "250 g",
    price: 120, mrp: 150, rating: 4.6, reviews: 78,
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80"],
    description: "Freshly roasted and ground filter coffee for your daily brew.",
    highlights: ["Rich Aroma", "Freshly Packed", "No Additives", "Quality Checked"],
  },
  tea: {
    id: "tea", name: "Assam Tea Gold", category: "Beverages", weight: "500 g",
    price: 180, mrp: 220, rating: 4.6, reviews: 84,
    img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80"],
    description: "Strong, malty Assam tea leaves for the perfect cup of chai.",
    highlights: ["Rich Aroma", "Freshly Packed", "No Additives", "Quality Checked"],
  },

  // ---------------- Plants & Pots ----------------
  tulsi: {
    id: "tulsi", name: "Tulsi Plant", category: "Plants & Pots", weight: "1 pc",
    price: 80, mrp: 120, rating: 4.7, reviews: 39,
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=500&q=80"],
    description: "A healthy, potted tulsi plant — sacred, fragrant and easy to grow.",
    highlights: ["Nursery Fresh", "Easy to Maintain", "Air Purifying", "Handled with Care"],
  },
  aloe: {
    id: "aloe", name: "Aloe Vera Plant", category: "Plants & Pots", weight: "1 pc",
    price: 120, mrp: 180, rating: 4.6, reviews: 25,
    img: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=500&q=80",
    gallery: ["https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=500&q=80"],
    description: "Low-maintenance aloe vera plant, great for skin care and home décor.",
    highlights: ["Nursery Fresh", "Easy to Maintain", "Air Purifying", "Handled with Care"],
  },
};

export const ALL_PRODUCTS: ProductDetail[] = Object.values(PRODUCT_CATALOG);

export function getProductsByCategory(category: string): ProductDetail[] {
  return ALL_PRODUCTS.filter((p) => p.category === category);
}

export function getRelatedProducts(product: ProductDetail, limit = 3): ProductDetail[] {
  const sameCategory = ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const backup = ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category !== product.category
  ).slice(0, limit - sameCategory.length);

  return [...sameCategory, ...backup];
}
